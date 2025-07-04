

import React from "react";

export function ClientRoot({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Suppress browser extension hydration warnings immediately
      const originalError = console.error;
      const originalWarn = console.warn;
      
      console.error = (...args) => {
        if (args[0] && typeof args[0] === 'string') {
          const warningText = args[0];
          // Suppress common browser extension attributes
          if (warningText.includes('bis_skin_checked') || 
              warningText.includes('data-new-gr-c-s-check-loaded') ||
              warningText.includes('data-gr-ext-installed') ||
              warningText.includes('bis_register') ||
              warningText.includes('Extra attributes from the server')) {
            return; // Suppress these specific warnings
          }
        }
        originalError.apply(console, args);
      };

      console.warn = (...args) => {
        if (args[0] && typeof args[0] === 'string') {
          const warningText = args[0];
          // Suppress PWA service worker warnings
          if (warningText.includes('GenerateSW has been called multiple times') ||
              warningText.includes('precache manifest generated after the first call may be inaccurate')) {
            return; // Suppress these specific warnings
          }
        }
        originalWarn.apply(console, args);
      };

      import('mixpanel-browser').then((mixpanel) => {
        mixpanel.default.init('MIXPANEL_TOKEN_PLACEHOLDER');
        mixpanel.default.track('Page View');
      });
    }
  }, []);
  
  return <>{children}</>;
} 