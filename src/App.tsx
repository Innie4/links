import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { LanguageProvider } from './components/language-provider';
import { SearchBar } from './components/search-bar';
import { Header } from './components/header';
import { ClientRoot } from './components/client-root';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import DashboardPage from './pages/DashboardPage';
import ProvidersPage from './pages/ProvidersPage';
import ProviderDetailPage from './pages/ProviderDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import TrendingPage from './pages/TrendingPage';
import AboutPage from './pages/AboutPage';
import { Footer } from './components/footer';

function App() {
  return (
    <Router>
      <ClientRoot>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Header />
              <main className="container mx-auto px-4 py-8 flex-1">
                <SearchBar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/providers" element={<ProvidersPage />} />
                  <Route path="/provider/:id" element={<ProviderDetailPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/trending" element={<TrendingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </ClientRoot>
    </Router>
  );
}

export default App; 