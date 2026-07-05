import SplashGate from "./SplashGate";

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