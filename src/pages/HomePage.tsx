import React, { useEffect, useState } from 'react';
import { SearchBar } from '../components/search-bar';
import { CategoryFilter } from '../components/category-filter';
import { ProviderCard } from '../components/provider-card';
import { Footer } from '../components/footer';
import { 
  HeartIcon, 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  GlobeAltIcon,
  SparklesIcon,
  UsersIcon,
  TrophyIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

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
  const [stats, setStats] = useState({
    providers: 0,
    users: 0,
    searches: 0,
    reviews: 0
  });

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

    // Animate stats
    const targetStats = { providers: 500, users: 15000, searches: 50000, reviews: 2500 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(Math.floor(current));
      }, stepDuration);
    };

    setTimeout(() => {
      animateCounter(targetStats.providers, (value) => setStats(prev => ({ ...prev, providers: value })));
      animateCounter(targetStats.users, (value) => setStats(prev => ({ ...prev, users: value })));
      animateCounter(targetStats.searches, (value) => setStats(prev => ({ ...prev, searches: value })));
      animateCounter(targetStats.reviews, (value) => setStats(prev => ({ ...prev, reviews: value })));
    }, 1000);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with real newsletter service
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-0">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 mt-12">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-float"></div>
          <div className="absolute top-32 right-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-24 left-8 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="container relative z-10 text-center px-0 sm:px-4">
            <div className="animate-fade-in">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold mb-6 gradient-text text-shadow leading-tight">
                Find Local
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Excellence
                </span>
              </h1>
              <p className="text-base xs:text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover the best local providers and services in Anyigba. 
                From restaurants to repair services, we connect you with trusted businesses in your community.
              </p>
              
              {/* Enhanced Search Bar */}
              <div className="max-w-full sm:max-w-2xl mx-auto mt-12 mb-12 px-0 sm:px-2">
                <div className="glass p-2 rounded-2xl">
                  <SearchBar />
                </div>
              </div>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 w-full">
                <button className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group w-full sm:w-auto">
                  Explore Categories
                  <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 group w-full sm:w-auto">
                  <PlayIcon className="h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                  <span>500+ Verified Providers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <span>4.8/5 Average Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UsersIcon className="h-5 w-5 text-blue-500" />
                  <span>15,000+ Happy Users</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        {showBanner && (
          <section className="section-sm">
            <div className="container">
              <div className="card-glass p-6 animate-slide-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <SparklesIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">🎉 New Features Available!</h3>
                      <p className="text-gray-600 dark:text-gray-400">Discover trending providers and get exclusive updates.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowBanner(false)} 
                    className="btn btn-ghost hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="section-sm">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-glass p-6 text-center animate-slide-left">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stats.providers}+
                </div>
                <p className="text-gray-600 dark:text-gray-400">Local Providers</p>
              </div>

              <div className="card-glass p-6 text-center animate-fade-in">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <HeartIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stats.users.toLocaleString()}+
                </div>
                <p className="text-gray-600 dark:text-gray-400">Happy Users</p>
              </div>

              <div className="card-glass p-6 text-center animate-fade-in">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                  <StarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stats.searches.toLocaleString()}+
                </div>
                <p className="text-gray-600 dark:text-gray-400">Successful Searches</p>
              </div>

              <div className="card-glass p-6 text-center animate-slide-right">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <TrophyIcon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stats.reviews.toLocaleString()}+
                </div>
                <p className="text-gray-600 dark:text-gray-400">Verified Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter Section */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Browse by Category
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Find exactly what you're looking for with our comprehensive category system
              </p>
            </div>
            <CategoryFilter selectedCategory={''} onCategorySelect={() => {}} />
          </div>
        </section>

        {/* Featured Providers */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Featured Providers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Top-rated local businesses recommended by our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for featured providers */}
              <div className="card-glass p-8 text-center animate-scale-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're working on bringing you the best featured providers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Viewed Providers */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Recently Viewed
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Continue exploring providers you've shown interest in
              </p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="card p-6 animate-pulse">
                    <div className="skeleton h-32 mb-4"></div>
                    <div className="skeleton h-4 mb-2"></div>
                    <div className="skeleton h-4 w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : recentProviders.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <HeartIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Exploring</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You haven't viewed any providers yet. Start your journey by searching for services you need.
                </p>
              </div>
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
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="card-glass p-8 text-center animate-scale-in">
                <SparklesIcon className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  Stay Updated!
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Get the latest updates on new providers, exclusive offers, and community news.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={e => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="input-glass flex-1"
                    />
                    <button type="submit" className="btn btn-primary whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                </form>
                
                {newsletterSuccess && (
                  <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg animate-fade-in">
                    Thank you for subscribing! 🎉
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
} 