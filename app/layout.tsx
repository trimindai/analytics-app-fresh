import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trimind Analytics - AI-Powered Business Intelligence",
  description: "Transform your data into actionable insights with Trimind Analytics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
