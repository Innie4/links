import { useState } from 'react'
import { useTheme } from 'next-themes'

interface Category {
  id: string
  name: string
  icon: string
  subcategories?: string[]
}

const categories: Category[] = [
  {
    id: 'food',
    name: 'Food & Dining',
    icon: '🍽️',
    subcategories: ['Restaurants', 'Cafes', 'Bakeries'],
  },
  {
    id: 'housing',
    name: 'Housing',
    icon: '🏠',
    subcategories: ['Rentals', 'Real Estate', 'Home Services'],
  },
  {
    id: 'stationery',
    name: 'Stationery',
    icon: '📝',
    subcategories: ['School Supplies', 'Office Supplies', 'Printing'],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '🛍️',
    subcategories: ['Clothing', 'Accessories', 'Shoes'],
  },
  {
    id: 'tech-repair',
    name: 'Tech Repair',
    icon: '🔧',
    subcategories: ['Mobile Repair', 'Computer Repair', 'Electronics'],
  },
]

export function CategoryFilter({
  selectedCategory,
  onCategorySelect,
}: {
  selectedCategory: string
  onCategorySelect: (category: string) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme } = useTheme()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'Categories'}
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <span className="text-xl">{category.icon}</span>
              <button
                onClick={() => onCategorySelect(category.id)}
                className={`
                  px-3 py-1 rounded-lg text-sm
                  ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white dark:bg-primary-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
