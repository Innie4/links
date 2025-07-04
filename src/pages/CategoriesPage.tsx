import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/theme-provider';
import { 
  MagnifyingGlassIcon, 
  BuildingStorefrontIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  HeartIcon,
  HomeIcon,
  ComputerDesktopIcon,
  PhoneIcon,
  CameraIcon,
  MusicalNoteIcon,
  CogIcon,
  BriefcaseIcon,
  ShoppingBagIcon,
  BeakerIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  providerCount: number;
  gradient: string;
  featuredProviders: string[];
}

const categories: Category[] = [
  {
    id: 'food-dining',
    name: 'Food & Dining',
    description: 'Restaurants, cafes, and food delivery services',
    icon: BuildingStorefrontIcon,
    providerCount: 45,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    featuredProviders: ['Pizza Palace', 'Cafe Delight', 'Burger House']
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Taxis, buses, and delivery services',
    icon: TruckIcon,
    providerCount: 23,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    featuredProviders: ['Quick Taxi', 'Express Delivery', 'City Bus']
  },
  {
    id: 'repair-services',
    name: 'Repair Services',
    description: 'Electronics, appliances, and general repairs',
    icon: WrenchScrewdriverIcon,
    providerCount: 34,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    featuredProviders: ['Tech Fix Pro', 'Appliance Care', 'Quick Repair']
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Schools, tutors, and training centers',
    icon: AcademicCapIcon,
    providerCount: 28,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featuredProviders: ['Learning Center', 'Tutor Pro', 'Skill Academy']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Hospitals, clinics, and pharmacies',
    icon: HeartIcon,
    providerCount: 19,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    featuredProviders: ['City Hospital', 'Quick Care Clinic', 'Pharma Plus']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property agents and housing services',
    icon: HomeIcon,
    providerCount: 31,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    featuredProviders: ['Dream Homes', 'Property Pro', 'Rent Easy']
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'IT services, software, and digital solutions',
    icon: ComputerDesktopIcon,
    providerCount: 42,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featuredProviders: ['Tech Solutions', 'Digital Pro', 'Code Masters']
  },
  {
    id: 'communications',
    name: 'Communications',
    description: 'Phone services, internet, and connectivity',
    icon: PhoneIcon,
    providerCount: 15,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    featuredProviders: ['Connect Pro', 'Net Speed', 'Phone Plus']
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Photographers and video services',
    icon: CameraIcon,
    providerCount: 26,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    featuredProviders: ['Photo Studio', 'Capture Pro', 'Video Masters']
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Music, events, and entertainment services',
    icon: MusicalNoteIcon,
    providerCount: 33,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    featuredProviders: ['Music Studio', 'Event Pro', 'Party Masters']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car services, mechanics, and auto parts',
    icon: CogIcon,
    providerCount: 29,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    featuredProviders: ['Auto Care', 'Car Fix Pro', 'Parts Plus']
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    description: 'Legal, accounting, and consulting services',
    icon: BriefcaseIcon,
    providerCount: 37,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featuredProviders: ['Legal Pro', 'Account Plus', 'Consult Masters']
  },
  {
    id: 'retail',
    name: 'Retail & Shopping',
    description: 'Stores, markets, and shopping centers',
    icon: ShoppingBagIcon,
    providerCount: 51,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    featuredProviders: ['Mega Store', 'Fashion Hub', 'Market Place']
  },
  {
    id: 'science-research',
    name: 'Science & Research',
    description: 'Laboratories, research centers, and scientific services',
    icon: BeakerIcon,
    providerCount: 12,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    featuredProviders: ['Lab Pro', 'Research Center', 'Science Hub']
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    description: 'Salons, spas, and wellness centers',
    icon: SparklesIcon,
    providerCount: 38,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    featuredProviders: ['Beauty Salon', 'Wellness Spa', 'Glow Pro']
  }
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Navigate to providers page with category filter
    window.location.href = `/providers?category=${categoryId}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-lg overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container relative z-10 px-0 sm:px-4">
          <div className="text-center animate-fade-in">
            <h1 className="gradient-text text-shadow mb-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-tight">
              Explore Categories
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Discover amazing local services across various categories. Find exactly what you need with our comprehensive directory.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-full sm:max-w-md mx-auto mb-12 px-0 sm:px-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-glass w-full pl-12 pr-4 py-4 text-base sm:text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section px-2 sm:px-0">
        <div className="container">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="group cursor-pointer animate-scale-in w-full max-w-xs mx-auto sm:max-w-none"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="card-glass h-full p-6 hover:scale-105 transition-all duration-300 relative overflow-hidden flex flex-col items-center">
                    {/* Gradient Background */}
                    <div 
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: category.gradient }}
                    ></div>
                    
                    {/* Icon */}
                    <div className="relative z-10 mb-4">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: category.gradient }}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        {category.description}
                      </p>
                      
                      {/* Provider Count */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {category.providerCount} providers
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                i < Math.min(3, Math.floor(category.providerCount / 10))
                                  ? 'bg-green-400'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Featured Providers */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Featured Providers
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {category.featuredProviders.slice(0, 2).map((provider, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                            >
                              {provider}
                            </span>
                          ))}
                          {category.featuredProviders.length > 2 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                              +{category.featuredProviders.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No categories found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or browse all categories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-sm">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-left">
              <div className="text-3xl font-bold gradient-text mb-2">
                {categories.length}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Categories Available</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-3xl font-bold gradient-text mb-2">
                {categories.reduce((sum, cat) => sum + cat.providerCount, 0)}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total Providers</p>
            </div>
            <div className="text-center animate-slide-right">
              <div className="text-3xl font-bold gradient-text mb-2">
                {Math.round(categories.reduce((sum, cat) => sum + cat.providerCount, 0) / categories.length)}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Average per Category</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 