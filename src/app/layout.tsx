import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/fragments/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Find You - Self-Discovery Journal",
    template: "%s | Find You",
  },
  description:
    "Discover your authentic self through guided journaling. Private, encrypted reflections with AI-powered insights to track your personal growth journey.",
  keywords: [
    "journaling",
    "self-discovery",
    "personal growth",
    "mental health",
    "reflective writing",
    "emotional tracking",
    "private journal",
  ],
  authors: [
    { name: "Falih Dzakwan Zuhdi", url: "https://github.com/falihdzakwanz" },
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName: "Find You",
    title: "Find You - Self-Discovery Journal",
    description: "Discover your authentic self through guided journaling",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Find You Journal App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find You - Self-Discovery Journal",
    description: "Discover your authentic self through guided journaling",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icons/favicon/magnifying-glass-16px.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/icons/favicon/magnifying-glass-32px.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/favicon/magnifying-glass-64px.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
    // Apple Touch icons
    apple: [
      {
        url: "/icons/favicon/magnifying-glass-128px.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/icons/favicon/magnifying-glass-256px.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
    // PWA app icon (different from favicon)
    other: [
      {
        rel: "apple-touch-startup-image",
        url: "/icons/find_you_app_icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        rel: "mask-icon",
        url: "/icons/find_you_app_icon.png",
        color: "#ED9455",
      },
    ],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon fallbacks for older browsers */}
        <link
          rel="shortcut icon"
          href="/icons/favicon/magnifying-glass-64px.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon/magnifying-glass-16px.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon/magnifying-glass-32px.png"
        />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/find_you_app_icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="128x128"
          href="/icons/favicon/magnifying-glass-128px.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="256x256"
          href="/icons/favicon/magnifying-glass-256px.png"
        />

        {/* PWA Configuration */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Find You" />
        <meta name="apple-mobile-web-app-title" content="Find You" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#ED9455" />
        <meta name="msapplication-TileColor" content="#ED9455" />
        <meta
          name="msapplication-TileImage"
          content="/icons/find_you_app_icon.png"
        />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ED9455" />
      </head>
      <body className={`antialiased bg-neutral`}>
        <Toaster />
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
