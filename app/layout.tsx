'use client'

import { useState, useEffect } from 'react';
import Splash from './splash';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("splashShown");
    }
    return false;
  });

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("splashShown", "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, [showSplash]);

  return (
    <html lang="en">
      <body>
        {showSplash ? <Splash /> : children}
      </body>
    </html>
  );
}