'use client'

import { useState, useEffect } from 'react';
import Splash from './splash';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        {showSplash ? <Splash /> : children}
      </body>
    </html>
  );
}