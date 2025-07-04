import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, MicrophoneIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface SearchSuggestion {
  id: string;
  term: string;
  category: string;
  type: 'search' | 'provider' | 'category';
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions data
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', term: 'Food delivery services', category: 'Food & Dining', type: 'search' },
    { id: '2', term: 'Mobile phone repair', category: 'Repair Services', type: 'search' },
    { id: '3', term: 'Pizza Palace', category: 'Food & Dining', type: 'provider' },
    { id: '4', term: 'Tech Fix Pro', category: 'Repair Services', type: 'provider' },
    { id: '5', term: 'Food & Dining', category: 'Categories', type: 'category' },
    { id: '6', term: 'Transportation', category: 'Categories', type: 'category' },
    { id: '7', term: 'Beauty salon services', category: 'Beauty & Wellness', type: 'search' },
    { id: '8', term: 'Car maintenance', category: 'Automotive', type: 'search' },
  ];

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);

    // Handle clicks outside search bar
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.term.toLowerCase().includes(query.toLowerCase()) ||
        suggestion.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      // Add to search history
      const updatedHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 10);
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

      // Navigate to search results
      window.location.href = `/providers?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSearch(suggestions[selectedIndex].term);
      } else {
        handleSearch(query);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'provider':
        return '🏢';
      case 'category':
        return '📂';
      default:
        return '🔍';
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'provider':
        return 'text-blue-600 dark:text-blue-400';
      case 'category':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-0 xs:px-2" ref={searchRef}>
      {/* Main Search Input */}
      <div className="relative group">
        <div className="glass p-2 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:shadow-2xl focus-within:border-blue-500/50">
          <div className="flex flex-col xs:flex-row items-center space-y-2 xs:space-y-0 xs:space-x-3">
            {/* Search Icon */}
            <div className="flex-shrink-0">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search for services, providers, or categories..."
              className="flex-1 bg-transparent border-none outline-none text-base xs:text-lg placeholder-gray-400 dark:placeholder-gray-500 py-2 xs:py-0"
            />

            {/* Voice Search Button */}
            <button
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group/voice mt-0 xs:mt-0"
              title="Voice search"
            >
              <MicrophoneIcon className="h-5 w-5 text-gray-500 group-hover/voice:text-blue-500 transition-colors duration-300" />
            </button>

            {/* Filters Button */}
            <button
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group/filter mt-0 xs:mt-0"
              title="Search filters"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500 group-hover/filter:text-blue-500 transition-colors duration-300" />
            </button>

            {/* Clear Button */}
            {query && (
              <button
                onClick={clearSearch}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group/clear mt-0 xs:mt-0"
                title="Clear search"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500 group-hover/clear:text-red-500 transition-colors duration-300" />
              </button>
            )}

            {/* Search Button */}
            <button
              onClick={() => handleSearch(query)}
              className="flex-shrink-0 w-full xs:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-2 xs:mt-0"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-32 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 animate-fade-in">
          <div className="glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Suggestions List */}
            {suggestions.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSearch(suggestion.term)}
                    className={`w-full flex items-center space-x-4 p-4 hover:bg-white/10 transition-colors duration-200 ${
                      index === selectedIndex ? 'bg-white/10' : ''
                    }`}
                  >
                    <span className="text-xl">{getSuggestionIcon(suggestion.type)}</span>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${getSuggestionColor(suggestion.type)}`}>
                        {suggestion.term}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {suggestion.category}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                      {suggestion.type}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Search History */}
            {suggestions.length === 0 && searchHistory.length > 0 && (
              <div className="p-4">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  Recent Searches
                </div>
                <div className="space-y-2">
                  {searchHistory.slice(0, 5).map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(term)}
                      className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-left"
                    >
                      <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {suggestions.length === 0 && searchHistory.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No suggestions found. Try searching for something else.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
