import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

interface Provider {
  id: string
  name: string
  description: string
  category: string
  address: string
  phone: string
  whatsapp: string
  email: string
  rating: number
  photos: string[]
  services: string[]
  prices: string[]
  operatingHours: string
}

export function ProviderCard({
  provider,
  theme,
}: {
  provider: Provider
  theme: string
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    // TODO: Implement favorite functionality
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(provider.phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const formatRating = (rating: number) => {
    return rating.toFixed(1)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {provider.photos.length > 0 && (
          <Image
            src={provider.photos[0]}
            alt={provider.name}
            fill
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            onError={(e) => { e.currentTarget.src = '/fallback.jpg'; }}
          />
        )}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleFavorite}
            className={`
              p-2 rounded-full
              ${
                isFavorite
                  ? 'bg-primary-600 text-white dark:bg-primary-400'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">
            {provider.name}
          </h3>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(provider.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatRating(provider.rating)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {provider.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPinIcon className="h-4 w-4" />
            <span>{provider.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <PhoneIcon className="h-4 w-4" />
            <a
              href={`tel:${provider.phone}`}
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              {provider.phone}
            </a>
            <button
              onClick={handleCopyPhone}
              className="ml-1 px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 hover:bg-primary-600 hover:text-white transition-colors"
              title="Copy phone number"
              type="button"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          {provider.whatsapp && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                className="h-4 w-4"
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
              <a
                href={`https://wa.me/${provider.whatsapp}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                WhatsApp
              </a>
            </div>
          )}
          {provider.email && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <EnvelopeIcon className="h-4 w-4" />
              <a
                href={`mailto:${provider.email}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {provider.email}
              </a>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">
            Services
          </h4>
          <div className="flex flex-wrap gap-2">
            {provider.services.map((service) => (
              <span
                key={service}
                className={`
                  px-2 py-1 text-xs rounded-full
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
      </div>
    </div>
  )
}
