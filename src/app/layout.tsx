import React from "react";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  title: {
    default: "MediConnect",
    template: "%s | MediConnect",
  },
  description: "A healthcare platform connecting patients with doctors and medicines",
  applicationName: "MediConnect",
  keywords: ["healthcare", "doctors", "medicines", "appointments", "prescriptions", "medical"],
  authors: [{ name: "MediConnect Team" }],
  creator: "MediConnect Team",
  publisher: "MediConnect Team",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MediConnect",
  },
  formatDetection: {
    telephone: true,
  },
};

// Add error handling for the root layout
export function generateStaticParams(): [] {
  return [];
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
