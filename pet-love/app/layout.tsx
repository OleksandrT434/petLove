'use client'

import { useState, useEffect } from 'react';
import Splash from './splash';
import Header from '@/components/Header/Header';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(()=>  {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('splashShown');
    }
    return false;
  }
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('splashShown', 'true');
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