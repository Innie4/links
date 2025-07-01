"use client";

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

interface SearchSuggestion {
  id: string
  name: string
  category: string
  address: string
}

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    // Load recent searches from localStorage
    const stored = localStorage.getItem('recentSearches')
    if (stored) setRecentSearches(JSON.parse(stored))
  }, [])

  const saveSearchTerm = (term: string) => {
    let updated = [term, ...recentSearches.filter(t => t !== term)]
    if (updated.length > 5) updated = updated.slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Simulate API call for suggestions
    if (value.length > 2) {
      fetchSuggestions(value)
    } else {
      setSuggestions([])
    }
  }

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await fetch(`/api/search/suggestions?q=${query}`)
      const data = await response.json()
      setSuggestions(data.suggestions)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchTerm(suggestion.name)
    setShowSuggestions(false)
    saveSearchTerm(suggestion.name)
    window.location.href = `/provider/${suggestion.id}`
  }

  const handleRecentClick = (term: string) => {
    setSearchTerm(term)
    setShowSuggestions(false)
    saveSearchTerm(term)
    // Optionally trigger a search or suggestions fetch
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search for providers, services, or categories..."
          className={`
            w-full
            pl-10
            pr-4
            py-2
            rounded-lg
            focus:outline-none
            focus:ring-2
            transition-colors
            duration-200
            ${
              theme === 'dark'
                ? 'bg-gray-800 text-white focus:ring-primary-500'
                : 'bg-white text-gray-900 focus:ring-primary-400'
            }
          `}
        />
        {showSuggestions && searchTerm.length <= 2 && recentSearches.length > 0 && (
          <div className={`
            absolute
            w-full
            bg-white
            rounded-lg
            shadow-lg
            mt-1
            max-h-60
            overflow-auto
            z-50
            ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
          `}>
            <div className="px-4 py-2 text-xs text-gray-400">Recent Searches</div>
            {recentSearches.map((term) => (
              <div
                key={term}
                className="px-4 py-3 cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900"
                onClick={() => handleRecentClick(term)}
              >
                <div className="font-medium">{term}</div>
              </div>
            ))}
          </div>
        )}
        {showSuggestions && suggestions.length > 0 && (
          <div className={`
            absolute
            w-full
            bg-white
            rounded-lg
            shadow-lg
            mt-1
            max-h-60
            overflow-auto
            z-50
            ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
          `}>
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`
                  px-4
                  py-3
                  cursor-pointer
                  hover:bg-primary-50
                  ${
                    theme === 'dark'
                      ? 'hover:bg-primary-900'
                      : 'hover:bg-primary-50'
                  }
                `}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="font-medium">{suggestion.name}</div>
                <div className="text-sm text-gray-500">
                  {suggestion.category} • {suggestion.address}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
