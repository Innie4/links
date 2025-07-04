import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/theme-provider';
import { StarIcon, ChatBubbleLeftRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { PhoneIcon, EnvelopeIcon, ShareIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router-dom';
import { ProviderCard } from '../components/provider-card';

interface Provider {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  whatsapp: string;
  email: string;
  rating: number;
  reviews: Review[];
  photos: string[];
  services: string[];
  prices: string[];
  operatingHours: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProviderDetailPage() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showShareLinks, setShowShareLinks] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchProviderData(params.id as string);
      // Check if provider is in favorites
      const favs = JSON.parse(localStorage.getItem('favoriteProviders') || '[]');
      setIsFavorite(favs.includes(params.id));
      // Track recently viewed providers
      const recent = JSON.parse(localStorage.getItem('recentProviders') || '[]');
      const updated = [params.id, ...recent.filter((id: string) => id !== params.id)];
      localStorage.setItem('recentProviders', JSON.stringify(updated.slice(0, 10)));
    }
  }, [params.id]);

  const fetchProviderData = async (id: string) => {
    try {
      const response = await fetch(`/api/providers/${id}`);
      const data = await response.json();
      setProvider(data.provider);
    } catch (error) {
      console.error('Error fetching provider data:', error);
    }
  };

  const handleFavorite = () => {
    if (!params.id) return;
    const favs = JSON.parse(localStorage.getItem('favoriteProviders') || '[]');
    let updated;
    if (isFavorite) {
      updated = favs.filter((id: string) => id !== params.id);
    } else {
      updated = [params.id, ...favs];
    }
    localStorage.setItem('favoriteProviders', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

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
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        {provider.photos.length > 0 && (
          <img
            src={provider.photos[0]}
            alt={provider.name}
            className="w-full h-full object-cover"
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

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5 text-primary-600" />
              <span>{provider.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-primary-600" />
              <span>{provider.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span>{provider.address}</span>
            </div>
          </div>
        </div>

        {/* Services and Prices */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Services & Prices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Services</h4>
              <ul className="space-y-1">
                {provider.services.map((service, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    • {service}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Pricing</h4>
              <ul className="space-y-1">
                {provider.prices.map((price, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    • {price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Operating Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(provider.openingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="capitalize">{day}</span>
                <span className="text-gray-600 dark:text-gray-400">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Reviews</h3>
            <button
              onClick={() => setShowShareLinks(!showShareLinks)}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <span>Write a Review</span>
            </button>
          </div>

          {showShareLinks && (
            <form onSubmit={handleReviewSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                      className={`h-6 w-6 ${
                        star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting || reviewForm.rating === 0}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}

          <div className="space-y-4">
            {provider.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.author}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 