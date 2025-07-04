import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/theme-provider';
import { 
  ArrowTrendingUpIcon,
  FireIcon,
  StarIcon,
  EyeIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SparklesIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface TrendingSearch {
  id: string;
  term: string;
  count: number;
  change: number;
  category: string;
}

interface PopularProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  views: number;
  change: number;
  image: string;
}

interface ActivityItem {
  id: string;
  type: 'search' | 'view' | 'review' | 'favorite';
  description: string;
  timestamp: string;
  user: string;
}

const trendingSearches: TrendingSearch[] = [
  { id: '1', term: 'Food delivery services', count: 125, change: 15, category: 'Food & Dining' },
  { id: '2', term: 'Mobile phone repair', count: 98, change: -5, category: 'Tech Repair' },
  { id: '3', term: 'Stationery supplies', count: 75, change: 10, category: 'Stationery' },
  { id: '4', term: 'Housing rentals', count: 65, change: 20, category: 'Real Estate' },
  { id: '5', term: 'Beauty salon services', count: 89, change: 8, category: 'Beauty & Wellness' },
  { id: '6', term: 'Car maintenance', count: 112, change: 12, category: 'Automotive' },
  { id: '7', term: 'Photography services', count: 45, change: 25, category: 'Photography' },
  { id: '8', term: 'Legal consultation', count: 34, change: -2, category: 'Professional Services' }
];

const popularProviders: PopularProvider[] = [
  { id: '1', name: 'Pizza Palace', category: 'Food & Dining', rating: 4.8, views: 1250, change: 12, image: '/api/placeholder/100/100' },
  { id: '2', name: 'Tech Fix Pro', category: 'Repair Services', rating: 4.9, views: 980, change: 8, image: '/api/placeholder/100/100' },
  { id: '3', name: 'Beauty Salon Elite', category: 'Beauty & Wellness', rating: 4.7, views: 890, change: 15, image: '/api/placeholder/100/100' },
  { id: '4', name: 'Quick Taxi Service', category: 'Transportation', rating: 4.6, views: 756, change: -3, image: '/api/placeholder/100/100' },
  { id: '5', name: 'Dream Homes Realty', category: 'Real Estate', rating: 4.8, views: 654, change: 20, image: '/api/placeholder/100/100' },
  { id: '6', name: 'Learning Center Pro', category: 'Education', rating: 4.9, views: 543, change: 18, image: '/api/placeholder/100/100' }
];

const recentActivity: ActivityItem[] = [
  { id: '1', type: 'search', description: 'Searched for "food delivery"', timestamp: '2 minutes ago', user: 'Anonymous' },
  { id: '2', type: 'view', description: 'Viewed Pizza Palace profile', timestamp: '5 minutes ago', user: 'Anonymous' },
  { id: '3', type: 'review', description: 'Left a 5-star review for Tech Fix Pro', timestamp: '12 minutes ago', user: 'Anonymous' },
  { id: '4', type: 'favorite', description: 'Added Beauty Salon Elite to favorites', timestamp: '18 minutes ago', user: 'Anonymous' },
  { id: '5', type: 'search', description: 'Searched for "car repair"', timestamp: '25 minutes ago', user: 'Anonymous' },
  { id: '6', type: 'view', description: 'Viewed Dream Homes Realty', timestamp: '32 minutes ago', user: 'Anonymous' }
];

export default function TrendingPage() {
  const [stats, setStats] = useState({
    totalSearches: 0,
    totalViews: 0,
    totalReviews: 0,
    activeUsers: 0
  });
  const [animatedStats, setAnimatedStats] = useState({
    totalSearches: 0,
    totalViews: 0,
    totalReviews: 0,
    activeUsers: 0
  });
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate loading stats
    const targetStats = {
      totalSearches: 15420,
      totalViews: 89250,
      totalReviews: 3240,
      activeUsers: 1250
    };
    setStats(targetStats);

    // Animate counters
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

    animateCounter(targetStats.totalSearches, (value) => setAnimatedStats(prev => ({ ...prev, totalSearches: value })));
    animateCounter(targetStats.totalViews, (value) => setAnimatedStats(prev => ({ ...prev, totalViews: value })));
    animateCounter(targetStats.totalReviews, (value) => setAnimatedStats(prev => ({ ...prev, totalReviews: value })));
    animateCounter(targetStats.activeUsers, (value) => setAnimatedStats(prev => ({ ...prev, activeUsers: value })));
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'search': return <MagnifyingGlassIcon className="h-4 w-4" />;
      case 'view': return <EyeIcon className="h-4 w-4" />;
      case 'review': return <StarIcon className="h-4 w-4" />;
      case 'favorite': return <HeartIcon className="h-4 w-4" />;
      default: return <SparklesIcon className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'search': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'view': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'review': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'favorite': return 'text-red-500 bg-red-100 dark:bg-red-900';
      default: return 'text-purple-500 bg-purple-100 dark:bg-purple-900';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-lg overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container relative z-10 px-0 sm:px-4">
          <div className="text-center animate-fade-in">
            <div className="flex flex-col xs:flex-row items-center justify-center mb-6 gap-2 xs:gap-4">
              <FireIcon className="h-10 w-10 xs:h-12 xs:w-12 text-orange-500 mr-0 xs:mr-4 animate-pulse" />
              <h1 className="gradient-text text-shadow text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-tight">
                Trending Now
              </h1>
            </div>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover what's hot in your area. See the most popular searches, trending providers, and real-time activity.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="section-sm px-2 sm:px-0">
        <div className="container">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="card-glass p-6 text-center animate-slide-left">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {animatedStats.totalSearches.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total Searches</p>
            </div>

            <div className="card-glass p-6 text-center animate-fade-in">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {animatedStats.totalViews.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total Views</p>
            </div>

            <div className="card-glass p-6 text-center animate-fade-in">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <StarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {animatedStats.totalReviews.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total Reviews</p>
            </div>

            <div className="card-glass p-6 text-center animate-slide-right">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {animatedStats.activeUsers.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section px-2 sm:px-0">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Trending Searches */}
            <div className="lg:col-span-2">
              <div className="card-glass p-6 animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <ArrowTrendingUpIcon className="h-6 w-6 text-orange-500 mr-2" />
                    Trending Searches
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last 24 hours
                  </span>
                </div>
                
                <div className="space-y-4">
                  {trendingSearches.map((search, index) => (
                    <div
                      key={search.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {search.term}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {search.category}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {search.count.toLocaleString()}
                        </div>
                        <div className={`flex items-center text-sm ${
                          search.change > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {search.change > 0 ? (
                            <ArrowUpIcon className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(search.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="card-glass p-6 animate-scale-in">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <ClockIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Recent Activity
                </h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.timestamp} • {activity.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Providers */}
      <section className="section">
        <div className="container">
          <div className="card-glass p-6 animate-scale-in">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <StarIcon className="h-6 w-6 text-yellow-500 mr-2" />
              Popular Providers
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularProviders.map((provider, index) => (
                <div
                  key={provider.id}
                  className="group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.location.href = `/provider/${provider.id}`}
                >
                  <div className="card p-4 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                        {provider.name.charAt(0)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {provider.category}
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{provider.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {provider.views} views
                          </span>
                        </div>
                      </div>
                      
                      <div className={`text-right ${
                        provider.change > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {provider.change > 0 ? (
                          <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4" />
                        )}
                        <div className="text-xs font-medium">
                          {Math.abs(provider.change)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Trends */}
      <section className="section-sm">
        <div className="container">
          <div className="card-glass p-6 animate-scale-in">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <MapPinIcon className="h-6 w-6 text-green-500 mr-2" />
              Geographic Trends
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                <h3 className="font-semibold mb-2">Most Active Area</h3>
                <p className="text-2xl font-bold gradient-text">Downtown</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">1,234 searches today</p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-teal-500/10">
                <h3 className="font-semibold mb-2">Fastest Growing</h3>
                <p className="text-2xl font-bold gradient-text">West District</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+45% this week</p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <h3 className="font-semibold mb-2">Top Category</h3>
                <p className="text-2xl font-bold gradient-text">Food & Dining</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">2,567 searches</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 