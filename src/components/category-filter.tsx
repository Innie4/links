import React, { useState } from 'react';
import { 
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
  SparklesIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  count: number;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories: Category[] = [
  {
    id: 'food-dining',
    name: 'Food & Dining',
    icon: BuildingStorefrontIcon,
    color: 'text-orange-500',
    gradient: 'from-orange-500 to-red-500',
    count: 45
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: TruckIcon,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    count: 23
  },
  {
    id: 'repair-services',
    name: 'Repair Services',
    icon: WrenchScrewdriverIcon,
    color: 'text-yellow-500',
    gradient: 'from-yellow-500 to-orange-500',
    count: 34
  },
  {
    id: 'education',
    name: 'Education',
    icon: AcademicCapIcon,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-pink-500',
    count: 28
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: HeartIcon,
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-500',
    count: 19
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: HomeIcon,
    color: 'text-indigo-500',
    gradient: 'from-indigo-500 to-purple-500',
    count: 31
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: ComputerDesktopIcon,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-indigo-500',
    count: 42
  },
  {
    id: 'communications',
    name: 'Communications',
    icon: PhoneIcon,
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-rose-500',
    count: 15
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: CameraIcon,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-violet-500',
    count: 26
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: MusicalNoteIcon,
    color: 'text-red-500',
    gradient: 'from-red-500 to-pink-500',
    count: 33
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: CogIcon,
    color: 'text-gray-500',
    gradient: 'from-gray-500 to-slate-500',
    count: 29
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: BriefcaseIcon,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    count: 37
  },
  {
    id: 'retail',
    name: 'Retail & Shopping',
    icon: ShoppingBagIcon,
    color: 'text-green-500',
    gradient: 'from-green-500 to-teal-500',
    count: 51
  },
  {
    id: 'science-research',
    name: 'Science & Research',
    icon: BeakerIcon,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-indigo-500',
    count: 12
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    icon: SparklesIcon,
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-rose-500',
    count: 38
  }
];

export function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCategories = showAll ? filteredCategories : filteredCategories.slice(0, 8);

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onCategorySelect('');
    } else {
      onCategorySelect(categoryId);
    }
  };

  const clearSelection = () => {
    onCategorySelect('');
  };

  return (
    <div className="space-y-6 px-2 xs:px-0">
      {/* Search and Clear */}
      <div className="flex flex-col xs:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-glass w-full pl-10 pr-4 py-3 xs:py-4 text-base xs:text-lg"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        {selectedCategory && (
          <button
            onClick={clearSelection}
            className="btn btn-secondary flex items-center space-x-2 text-xs xs:text-sm px-3 xs:px-4 py-2 xs:py-2"
          >
            <XMarkIcon className="h-4 w-4" />
            <span>Clear Selection</span>
          </button>
        )}
      </div>

      {/* Categories List */}
      <div className="flex flex-wrap gap-2 xs:gap-3">
        {displayedCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex items-center space-x-2 px-3 xs:px-4 py-2 xs:py-2 rounded-full bg-gradient-to-r ${category.gradient} text-white font-medium shadow-sm hover:scale-105 transition-transform duration-200 text-xs xs:text-sm ${selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              {/* Icon */}
              <IconComponent className="h-4 w-4" />
              {/* Name */}
              <span>{category.name}</span>
              {/* Count */}
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{category.count}</span>
            </button>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {filteredCategories.length > 8 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-ghost text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            {showAll ? 'Show Less' : `Show ${filteredCategories.length - 8} More Categories`}
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <BuildingStorefrontIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No categories found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or browse all categories.
          </p>
        </div>
      )}

      {/* Selected Category Info */}
      {selectedCategory && (
        <div className="card-glass p-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {(() => {
                const category = categories.find(c => c.id === selectedCategory);
                if (!category) return null;
                const IconComponent = category.icon;
                return (
                  <>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.count} providers available
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
            <button
              onClick={clearSelection}
              className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
