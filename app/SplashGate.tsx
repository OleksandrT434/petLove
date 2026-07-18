"use client";

import { useEffect, useState } from "react";
import Splash from "./splash";

type Props = {
  children: React.ReactNode;
};

export default function SplashGate({ children }: Props) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return <>{children}</>;
}