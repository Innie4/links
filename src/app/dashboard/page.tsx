"use client";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
import React from "react";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ChartBarIcon, ClockIcon, ArrowTrendingUpIcon, StarIcon } from '@heroicons/react/24/outline'

const trendingSearches = [
  {
    term: 'Food delivery services',
    count: 125,
    change: 15,
    category: 'Food & Dining',
  },
  {
    term: 'Mobile phone repair',
    count: 98,
    change: -5,
    category: 'Tech Repair',
  },
  {
    term: 'Stationery supplies',
    count: 75,
    change: 10,
    category: 'Stationery',
  },
  {
    term: 'Housing rentals',
    count: 65,
    change: 20,
    category: 'Housing',
  },
]

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProviders: 0,
    totalSearches: 0,
    activeProviders: 0,
    featuredProviders: 0,
  })
  const { theme } = useTheme()

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className={`
              bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md
              ${
                theme === 'dark'
                  ? 'border border-gray-700'
                  : 'border border-gray-200'
              }
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h3>
              <div className="flex-shrink-0">
                {key === 'totalProviders' && <ChartBarIcon className="h-6 w-6 text-primary-600" />}
                {key === 'totalSearches' && <ClockIcon className="h-6 w-6 text-primary-600" />}
                {key === 'activeProviders' && <ArrowTrendingUpIcon className="h-6 w-6 text-primary-600" />}
                {key === 'featuredProviders' && <StarIcon className="h-6 w-6 text-primary-600" />}
              </div>
            </div>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Trending Searches</h2>
          <div className="space-y-4">
            {trendingSearches.map((search, index) => (
              <div
                key={search.term}
                className={`
                  flex items-center justify-between p-4 rounded-lg
                  ${
                    index === 0
                      ? 'bg-primary-50 dark:bg-primary-900'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }
                `}
              >
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {search.term}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {search.category}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {search.count}
                  </span>
                  <span
                    className={`
                      px-2 py-1 text-xs rounded-full
                      ${
                        search.change > 0
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }
                    `}
                  >
                    {search.change > 0 ? '+' : ''}{search.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
