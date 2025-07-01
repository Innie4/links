"use client";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
import React, { useEffect, useState } from 'react';
import { SearchBar } from '@/components/search-bar';
import { CategoryFilter } from '@/components/category-filter';
import { ProviderCard } from '@/components/provider-card';

interface Provider {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  rating: number;
  photos: string[];
  services: string[];
  prices: string[];
  operatingHours: string;
  status: string;
}

export default function HomePage() {
  const [recentProviders, setRecentProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    // Get recently viewed provider IDs from localStorage
    const ids = JSON.parse(localStorage.getItem('recentProviders') || '[]');
    if (ids.length === 0) {
      setLoading(false);
      return;
    }
    // Fetch provider details for each ID
    Promise.all(
      ids.map((id: string) =>
        fetch(`/api/providers/${id}`)
          .then(res => res.json())
          .then(data => data.provider)
          .catch(() => null)
      )
    ).then(providers => {
      setRecentProviders(providers.filter(Boolean));
      setLoading(false);
    });
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with real newsletter service
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Promotional Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-primary-600 to-blue-500 text-white p-4 flex items-center justify-between rounded shadow">
          <span className="font-semibold">🎉 New! Discover featured providers and get exclusive updates.</span>
          <button onClick={() => setShowBanner(false)} className="ml-4 px-2 py-1 bg-white text-primary-600 rounded hover:bg-gray-100">Dismiss</button>
        </div>
      )}
      <section className="py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Links Local Search</h1>
        <p className="text-lg text-gray-600">Find the best local providers and services in Anyigba.</p>
      </section>
      <section>
        <SearchBar />
      </section>
      <section>
        <CategoryFilter selectedCategory={''} onCategorySelect={() => {}} />
      </section>
      {/* Featured Providers (placeholder) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TODO: Replace with real featured providers */}
          <div className="col-span-full text-gray-400">No featured providers yet.</div>
        </div>
      </section>
      {/* Recently Viewed Providers */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recently Viewed Providers</h2>
        {loading ? (
          <div>Loading...</div>
        ) : recentProviders.length === 0 ? (
          <div className="text-gray-500">You haven't viewed any providers yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProviders.map(provider => {
              const normalized = {
                id: provider.id,
                name: provider.name,
                category: provider.category,
                description: provider.description || '',
                address: provider.address || '',
                phone: provider.phone || '',
                whatsapp: provider.whatsapp || '',
                email: provider.email || '',
                rating: provider.rating || 0,
                photos: provider.photos || [],
                services: provider.services || [],
                prices: provider.prices || [],
                operatingHours: provider.operatingHours || '',
                status: provider.status || '',
              };
              return <ProviderCard key={normalized.id} provider={normalized} theme="light" />;
            })}
          </div>
        )}
      </section>
      {/* Newsletter Signup */}
      <section className="py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Stay Updated!</h2>
        <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col md:flex-row gap-2 items-center justify-center">
          <input
            type="email"
            value={newsletterEmail}
            onChange={e => setNewsletterEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-2 rounded border w-full md:w-auto"
          />
          <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Subscribe</button>
        </form>
        {newsletterSuccess && <div className="mt-2 text-green-600">Thank you for subscribing!</div>}
      </section>
    </div>
  );
} 