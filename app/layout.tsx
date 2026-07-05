'use client'

import { useState, useEffect } from 'react';
import Splash from './splash';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setIsChecking] = useState(true);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("splashShown");
    }
    return false;
  });

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("splashShown", "true");
      setShowSplash(false);
      setIsChecking(false);
    }, 2000);
    return () => clearTimeout(timer);
    
  }, []);
console.log("render", showSplash);
  return (
    <html lang="en">
      <body>
        {showSplash ? <Splash /> : children}
      </body>
    </html>
  );
}