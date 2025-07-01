import React from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { SearchBar } from '@/components/search-bar'
import { Header } from '@/components/header'
import { ClientRoot } from '@/components/client-root'

export const metadata: Metadata = {
  title: 'Links Local Search - Find Local Providers in Anyigba',
  description: 'Discover local providers and services in Anyigba. Find food, housing, stationery, fashion, tech repair and more.',
}

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Suppress browser extension hydration warnings immediately */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const originalError = console.error;
              const originalWarn = console.warn;
              
              console.error = function(...args) {
                if (args[0] && typeof args[0] === 'string') {
                  const warningText = args[0];
                  if (warningText.includes('bis_skin_checked') || 
                      warningText.includes('data-new-gr-c-s-check-loaded') ||
                      warningText.includes('data-gr-ext-installed') ||
                      warningText.includes('bis_register') ||
                      warningText.includes('Extra attributes from the server')) {
                    return;
                  }
                }
                originalError.apply(console, args);
              };

              console.warn = function(...args) {
                if (args[0] && typeof args[0] === 'string') {
                  const warningText = args[0];
                  if (warningText.includes('GenerateSW has been called multiple times') ||
                      warningText.includes('precache manifest generated after the first call may be inaccurate')) {
                    return;
                  }
                }
                originalWarn.apply(console, args);
              };
            })();
          `,
        }} />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID_PLACEHOLDER"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID_PLACEHOLDER');
          `,
        }} />
      </head>
      <body className={inter.className}>
        <ClientRoot>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LanguageProvider>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container mx-auto px-4 py-8">
                  <SearchBar />
                  {children}
                </main>
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </ClientRoot>
      </body>
    </html>
  )
}
