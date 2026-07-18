import "./globals.css";
import SplashGate from "./SplashGate";
import type { Viewport } from "next";

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
        <SplashGate>{children}</SplashGate>
      </body>
    </html>
  );
}