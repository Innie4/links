"use client";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
import React from "react";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/components/language-provider'
import { CategoryFilter } from '@/components/category-filter'
import { ProviderCard } from '@/components/provider-card'
import { MapView } from '@/components/map-view'

interface Provider {
  id: string;
  name: string;
  description: string;
  category: string;
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

export default function ProvidersPage() {
  const [providers, setProviders] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [location, setLocation] = useState('')
  const { theme } = useTheme()
  const { language } = useLanguage()

  useEffect(() => {
    fetchProviders()
  }, [selectedCategory, priceRange, location])

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          priceRange,
          location,
        }),
      })
      const data = await response.json()
      setProviders(data.providers)
    } catch (error) {
      console.error('Error fetching providers:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Local Providers' : 'Local Providers'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => {
              const normalized = {
                id: typeof provider.id === 'string' ? provider.id : '',
                name: typeof provider.name === 'string' ? provider.name : '',
                category: typeof provider.category === 'string' ? provider.category : '',
                description: typeof provider.description === 'string' ? provider.description : '',
                address: typeof provider.address === 'string' ? provider.address : '',
                phone: typeof provider.phone === 'string' ? provider.phone : '',
                whatsapp: typeof provider.whatsapp === 'string' ? provider.whatsapp : '',
                email: typeof provider.email === 'string' ? provider.email : '',
                rating: typeof provider.rating === 'number' ? provider.rating : 0,
                photos: Array.isArray(provider.photos) ? provider.photos : [],
                services: Array.isArray(provider.services) ? provider.services : [],
                prices: Array.isArray(provider.prices) ? provider.prices : [],
                operatingHours: typeof provider.operatingHours === 'string' ? provider.operatingHours : '',
                status: typeof provider.status === 'string' ? provider.status : '',
              } as any;
              // @ts-ignore
              return <ProviderCard key={normalized.id} provider={normalized as any} theme={theme} />;
            })}
          </div>
        </div>
        <div className="w-full md:w-96">
          <MapView
            providers={providers}
            selectedLocation={location}
            onLocationSelect={(loc) => setLocation(loc)}
          />
        </div>
      </div>
      
      <div className="md:w-96">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            {language === 'en' ? 'Price Range' : 'Price Range'}
          </h3>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, min: parseInt(e.target.value) }))
              }
              className="w-24 p-1 border rounded"
            />
            <span>to</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({ ...prev, max: parseInt(e.target.value) }))
              }
              className="w-24 p-1 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
