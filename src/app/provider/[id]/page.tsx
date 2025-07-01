"use client";
import React from "react";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { StarIcon, ChatBubbleLeftRightIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { PhoneIcon, EnvelopeIcon, ShareIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';

interface Provider {
  id: string
  name: string
  description: string
  category: string
  address: string
  latitude: number
  longitude: number
  phone: string
  whatsapp: string
  email: string
  rating: number
  reviews: Review[]
  photos: string[]
  services: string[]
  prices: string[]
  operatingHours: string
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
}

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  createdAt: string
}

export default function ProviderPage({
  params,
}: {
  params: { id: string }
}) {
  const [provider, setProvider] = useState<Provider | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showShareLinks, setShowShareLinks] = useState(false);

  useEffect(() => {
    fetchProviderData(params.id)
    // Check if provider is in favorites
    const favs = JSON.parse(localStorage.getItem('favoriteProviders') || '[]')
    setIsFavorite(favs.includes(params.id))
    // Track recently viewed providers
    const recent = JSON.parse(localStorage.getItem('recentProviders') || '[]')
    const updated = [params.id, ...recent.filter((id: string) => id !== params.id)]
    localStorage.setItem('recentProviders', JSON.stringify(updated.slice(0, 10)))
  }, [params.id])

  const fetchProviderData = async (id: string) => {
    try {
      const response = await fetch(`/api/providers/${id}`)
      const data = await response.json()
      setProvider(data.provider)
    } catch (error) {
      console.error('Error fetching provider data:', error)
    }
  }

  const handleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favoriteProviders') || '[]')
    let updated
    if (isFavorite) {
      updated = favs.filter((id: string) => id !== params.id)
    } else {
      updated = [params.id, ...favs]
    }
    localStorage.setItem('favoriteProviders', JSON.stringify(updated))
    setIsFavorite(!isFavorite)
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Replace with real API call
    const newReview = {
      id: Date.now().toString(),
      author: 'Anonymous',
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      createdAt: new Date().toISOString(),
    };
    setProvider(prev => prev && {
      ...prev,
      reviews: [newReview, ...prev.reviews],
      rating: (prev.reviews.reduce((sum, r) => sum + r.rating, reviewForm.rating) / (prev.reviews.length + 1)),
    });
    setReviewForm({ rating: 0, comment: '' });
    setSubmitting(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: provider?.name,
        text: `Check out ${provider?.name} on Links Local Search!`,
        url: window.location.href,
      });
    } else {
      setShowShareLinks(true);
    }
  };

  if (!provider) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        {provider.photos.length > 0 && (
          <Image
            src={provider.photos[0]}
            alt={provider.name}
            fill
            className="w-full h-full object-cover"
            sizes="100vw"
            priority
            onError={(e) => { e.currentTarget.src = '/fallback.jpg'; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-bold text-white">
              {provider.name}
            </h1>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(provider.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-white">
                {provider.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={handleFavorite}
              className={`
                p-2 rounded-full
                ${
                  isFavorite
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <svg
                className="h-5 w-5"
                fill={isFavorite ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">About {provider.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {provider.description}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <PhoneIcon className="h-5 w-5 text-primary-600" />
                <h3 className="text-lg font-medium">Phone</h3>
              </div>
              <div className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                <a
                  href={`tel:${provider.phone}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {provider.phone}
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(provider.phone)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1500)
                  }}
                  className="ml-1 px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 hover:bg-primary-600 hover:text-white transition-colors"
                  title="Copy phone number"
                  type="button"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            {provider.whatsapp && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 mb-4">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium">WhatsApp</h3>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <a
                    href={`https://wa.me/${provider.whatsapp}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Send Message
                  </a>
                </div>
              </div>
            )}
            {provider.email && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="flex items-center space-x-2 mb-4">
                  <EnvelopeIcon className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-medium">Email</h3>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <a
                    href={`mailto:${provider.email}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {provider.email}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Location</h2>
          <div className="flex items-center space-x-2 mb-4">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-gray-600 dark:text-gray-400">
              {provider.address}
            </span>
          </div>
          <div className="h-[300px] rounded-lg overflow-hidden">
            <div id="provider-map" className="h-full" />
          </div>
        </div>

        {/* Services & Prices */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Services & Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Services</h3>
              <div className="space-y-2">
                {provider.services.map((service) => (
                  <span
                    key={service}
                    className={`
                      px-3 py-1 text-sm rounded-full
                      ${
                        theme === 'light'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-gray-700 text-gray-300'
                      }
                    `}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Prices</h3>
              <div className="space-y-2">
                {provider.prices.map((price) => (
                  <div
                    key={price}
                    className="flex items-center justify-between text-gray-600 dark:text-gray-400"
                  >
                    <span>{price}</span>
                    <span className="text-primary-600">₦</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Operating Hours</h2>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {Object.entries(provider.openingHours).map(([day, hours]) => (
              <div
                key={day}
                className="flex items-center justify-between text-gray-600 dark:text-gray-400"
              >
                <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                <span>{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                  className={star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}
                >
                  <StarIcon className="h-6 w-6" />
                </button>
              ))}
              <span className="ml-2">{reviewForm.rating} / 5</span>
            </div>
            <textarea
              value={reviewForm.comment}
              onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
              placeholder="Write your review..."
              className="w-full p-2 border rounded"
              rows={3}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              disabled={submitting || reviewForm.rating === 0}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
          <div className="space-y-4">
            {provider.reviews.length === 0 && <div className="text-gray-500">No reviews yet.</div>}
            {provider.reviews.map((review) => (
              <div key={review.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
                <div className="flex items-center space-x-2 mb-1">
                  {[1,2,3,4,5].map(star => (
                    <StarIcon
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-200">{review.comment}</div>
                <div className="text-xs text-gray-500 mt-1">By {review.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showShareLinks && (
        <div className="absolute mt-2 bg-white dark:bg-gray-800 rounded shadow-lg p-4 z-50">
          <div className="mb-2 font-semibold">Share this provider:</div>
          <div className="flex space-x-4">
            <a href={`https://wa.me/?text=${encodeURIComponent(`Check out ${provider?.name} on Links Local Search! ${window.location.href}`)}`} target="_blank" rel="noopener noreferrer" className="text-green-600">WhatsApp</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">Facebook</a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${provider?.name} on Links Local Search!`)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400">Twitter</a>
          </div>
          <button onClick={() => setShowShareLinks(false)} className="mt-2 text-xs text-gray-500 underline">Close</button>
        </div>
      )}
    </div>
  )
}
