import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import JsonLd from "./components/JsonLd";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { getOrganizationSchema, getServiceSchema } from "./lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trfskomkar.com"),
  title: "TRFSK - Financial Awareness & Business Education",
  description: "TRFSK is committed to promoting financial awareness, entrepreneurship, business education and meaningful professional networking.",
  keywords: "financial awareness, entrepreneurship, business education, professional networking, TRFSK, financial literacy, investment guidance",
  authors: [{ name: "TRFSK" }],
  creator: "TRFSK",
  publisher: "TRFSK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TRFSK - Financial Awareness & Business Education",
    description: "TRFSK is committed to promoting financial awareness, entrepreneurship, business education and meaningful professional networking.",
    url: "https://trfskomkar.com",
    siteName: "TRFSK",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRFSK - Financial Awareness & Business Education",
    description: "TRFSK is committed to promoting financial awareness, entrepreneurship, business education and meaningful professional networking.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="canonical" href="https://trfskomkar.com" />
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getServiceSchema()} />
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-white">
        <Navbar />
        <main className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
