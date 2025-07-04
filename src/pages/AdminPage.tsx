import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/theme-provider';
import { ChartBarIcon, UserGroupIcon, DocumentTextIcon, CogIcon } from '@heroicons/react/24/outline';
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Providers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalProviders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Providers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.activeProviders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Searches</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalSearches}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <CogIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">User Feedback</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.userFeedback}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Providers */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Providers</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {providers.map((provider) => (
                <tr key={provider.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{provider.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{provider.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      provider.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {provider.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditProvider(provider);
                        setForm(provider);
                        setShowEditModal(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProvider(provider.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
        <div className="space-y-4">
          {searches.map((search) => (
            <div key={search.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{search.query}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{search.timestamp}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{search.resultsCount} results</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          {feedback.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-900 dark:text-white mb-2">{item.feedbackText}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{item.timestamp}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'resolved' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Provider</h3>
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
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 