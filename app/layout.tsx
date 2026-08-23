import "./globals.css";
import SplashGate from "./SplashGate";
import type { Viewport } from "next";
import { AuthProvider } from "@/components/AuthContext/AuthContext";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <SplashGate>{children}</SplashGate>
        </AuthProvider>
      </body>
    </html>
  );
}