import React, { useState } from 'react';
import { StarIcon, MapPinIcon, PhoneIcon, HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

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

interface ProviderCardProps {
  provider: Provider;
  theme: string;
}

export function ProviderCard({ provider, theme }: ProviderCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('favoriteProviders') || '[]');
    let updated;
    if (isFavorite) {
      updated = favs.filter((id: string) => id !== provider.id);
    } else {
      updated = [provider.id, ...favs];
    }
    localStorage.setItem('favoriteProviders', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    // Track recently viewed providers
    const recent = JSON.parse(localStorage.getItem('recentProviders') || '[]');
    const updated = [provider.id, ...recent.filter((id: string) => id !== provider.id)];
    localStorage.setItem('recentProviders', JSON.stringify(updated.slice(0, 10)));
    
    // Navigate to provider detail page
    window.location.href = `/provider/${provider.id}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Food & Dining': 'from-orange-500 to-red-500',
      'Transportation': 'from-blue-500 to-cyan-500',
      'Repair Services': 'from-yellow-500 to-orange-500',
      'Education': 'from-purple-500 to-pink-500',
      'Healthcare': 'from-green-500 to-emerald-500',
      'Real Estate': 'from-indigo-500 to-purple-500',
      'Technology': 'from-blue-500 to-indigo-500',
      'Communications': 'from-pink-500 to-rose-500',
      'Photography': 'from-purple-500 to-violet-500',
      'Entertainment': 'from-red-500 to-pink-500',
      'Automotive': 'from-gray-500 to-slate-500',
      'Professional Services': 'from-blue-500 to-cyan-500',
      'Retail & Shopping': 'from-green-500 to-teal-500',
      'Science & Research': 'from-purple-500 to-indigo-500',
      'Beauty & Wellness': 'from-pink-500 to-rose-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-slate-500';
  };

  return (
    <div
      className="group cursor-pointer animate-scale-in w-full max-w-xs mx-auto sm:max-w-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="card-glass h-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl relative flex flex-col">
        {/* Gradient Background Overlay */}
        <div 
          className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${getCategoryColor(provider.category)}`}
        ></div>

        {/* Image Section */}
        <div className="relative h-40 xs:h-48 overflow-hidden">
          {provider.photos && provider.photos.length > 0 ? (
            <img
              src={provider.photos[0]}
              alt={provider.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/400x300/667eea/ffffff?text=${encodeURIComponent(provider.name.charAt(0))}`;
              }}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(provider.category)} flex items-center justify-center`}>
              <span className="text-4xl font-bold text-white">{provider.name.charAt(0)}</span>
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 group/fav"
          >
            {isFavorite ? (
              <HeartIconSolid className="h-5 w-5 text-red-500 group-hover/fav:scale-110 transition-transform" />
            ) : (
              <HeartIcon className="h-5 w-5 text-white group-hover/fav:scale-110 transition-transform" />
            )}
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(provider.category)} backdrop-blur-sm`}>
              {provider.category}
            </span>
          </div>

          {/* Status Badge */}
          {provider.status === 'featured' && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 backdrop-blur-sm">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 xs:p-6 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-2 xs:mb-3">
            <h3 className="text-lg xs:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {provider.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2 xs:mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(provider.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {provider.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              ({Math.floor(Math.random() * 100) + 20} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-xs xs:text-sm mb-3 xs:mb-4 line-clamp-2">
            {provider.description || 'No description available'}
          </p>

          {/* Location */}
          <div className="flex items-center space-x-2 mb-3 xs:mb-4 text-xs xs:text-sm text-gray-500 dark:text-gray-400">
            <MapPinIcon className="h-4 w-4" />
            <span className="line-clamp-1">{provider.address || 'Address not available'}</span>
          </div>

          {/* Services Preview */}
          {provider.services && provider.services.length > 0 && (
            <div className="mb-3 xs:mb-4">
              <div className="flex flex-wrap gap-1">
                {provider.services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  >
                    {service}
                  </span>
                ))}
                {provider.services.length > 3 && (
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    +{provider.services.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <EyeIcon className="h-4 w-4" />
              <span>{Math.floor(Math.random() * 500) + 100} views</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {provider.phone && (
                <a
                  href={`tel:${provider.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                >
                  <PhoneIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                </a>
              )}
              
              <button className="btn btn-primary text-sm px-4 py-2">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>
    </div>
  );
}
