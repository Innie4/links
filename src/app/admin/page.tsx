"use client";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
import React from "react";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ChartBarIcon, UserGroupIcon, DocumentTextIcon, CogIcon } from '@heroicons/react/24/outline'
import Papa from 'papaparse';

interface AdminStats {
  totalProviders: number
  activeProviders: number
  pendingProviders: number
  totalSearches: number
  failedSearches: number
  userFeedback: number
  newProviders: number
}

interface Provider {
  id: string;
  name: string;
  category: string;
  status: string;
}

interface Search {
  id: string;
  query: string;
  timestamp: string;
  resultsCount: number;
}

interface Feedback {
  id: string;
  feedbackText: string;
  timestamp: string;
  status: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [providers, setProviders] = useState<Provider[]>([])
  const [searches, setSearches] = useState<Search[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const { theme } = useTheme()
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProvider, setEditProvider] = useState<Provider | null>(null);
  const [form, setForm] = useState({ name: '', category: '', status: 'active' });

  useEffect(() => {
    fetchAdminStats()
    fetchRecentProviders()
    fetchRecentSearches()
    fetchRecentFeedback()
  }, [])

  const fetchAdminStats = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/admin/stats`)
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    }
  }

  const fetchRecentProviders = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/admin/providers/recent`)
      const data = await response.json()
      setProviders(data.providers)
    } catch (error) {
      console.error('Error fetching recent providers:', error)
    }
  }

  const fetchRecentSearches = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/admin/searches/recent`)
      const data = await response.json()
      setSearches(data.searches)
    } catch (error) {
      console.error('Error fetching recent searches:', error)
    }
  }

  const fetchRecentFeedback = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/admin/feedback/recent`)
      const data = await response.json()
      setFeedback(data.feedback)
    } catch (error) {
      console.error('Error fetching recent feedback:', error)
    }
  }

  // Add Provider
  const handleAddProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    // await fetch(`${API_URL}/admin/providers`, { method: 'POST', body: JSON.stringify(form) })
    setProviders([{ id: Date.now().toString(), ...form }, ...providers]);
    setForm({ name: '', category: '', status: 'active' });
    setShowAddForm(false);
  };

  // Edit Provider
  const handleEditProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call
    setProviders(providers.map(p => p.id === editProvider?.id ? { ...editProvider, ...form } : p));
    setShowEditModal(false);
    setEditProvider(null);
    setForm({ name: '', category: '', status: 'active' });
  };

  // Delete Provider
  const handleDeleteProvider = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this provider?')) return;
    // TODO: Replace with real API call
    setProviders(providers.filter(p => p.id !== id));
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (results: { data: any[] }) => {
        const newProviders = (results.data as any[]).map(row => ({
          id: Date.now().toString() + Math.random(),
          name: row.name || '',
          category: row.category || '',
          status: row.status || 'active',
        }));
        setProviders(prev => [...newProviders, ...prev]);
      },
    });
  };

  if (!stats) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Bulk Import CSV */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <label className="block mb-2 font-semibold">Bulk Import Providers (CSV)</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="mb-4"
        />
        <p className="text-xs text-gray-500">CSV columns: name, category, status</p>
      </div>
      {/* Add Provider Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mb-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          {showAddForm ? 'Cancel' : 'Add Provider'}
        </button>
        {showAddForm && (
          <form onSubmit={handleAddProvider} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
          </form>
        )}
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
                {key === 'activeProviders' && <UserGroupIcon className="h-6 w-6 text-primary-600" />}
                {key === 'pendingProviders' && <DocumentTextIcon className="h-6 w-6 text-primary-600" />}
                {key === 'totalSearches' && <ChartBarIcon className="h-6 w-6 text-primary-600" />}
                {key === 'failedSearches' && <DocumentTextIcon className="h-6 w-6 text-primary-600" />}
                {key === 'userFeedback' && <CogIcon className="h-6 w-6 text-primary-600" />}
              </div>
            </div>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
              {value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Providers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Providers</h2>
            <div className="space-y-4">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {provider.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full 
                      ${provider.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                      ${provider.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                      ${provider.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                    `}>
                      {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                    </span>
                    {provider.status === 'pending' && (
                      <>
                        <button
                          onClick={() => setProviders(providers.map(p => p.id === provider.id ? { ...p, status: 'active' } : p))}
                          className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setProviders(providers.map(p => p.id === provider.id ? { ...p, status: 'rejected' } : p))}
                          className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setEditProvider(provider);
                        setForm({ name: provider.name, category: provider.category, status: provider.status });
                        setShowEditModal(true);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProvider(provider.id)}
                      className="text-sm text-red-600 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Searches */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
            <div className="space-y-4">
              {searches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {search.query}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(search.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {search.resultsCount} results
                    </span>
                    <button
                      onClick={() => {
                        // TODO: Implement search analytics
                      }}
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md col-span-full">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent User Feedback</h2>
            <div className="space-y-4">
              {feedback.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.feedbackText}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {item.status}
                    </span>
                    <button
                      onClick={() => {
                        // TODO: Implement feedback management
                      }}
                      className="text-sm text-primary-600 hover:text-primary-500"
                    >
                      Respond
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Edit Provider Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Provider</h2>
            <form onSubmit={handleEditProvider} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full p-2 border rounded"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
