import { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/app/lib/siteConfig";

export const metadata: Metadata = {
  title: "TRFSK - Financial Awareness, Business Education & Investment Platform",
  description: "TRFSK is Pune's leading financial awareness platform offering business education, professional networking, and structured investment opportunities with monthly returns.",
  keywords: "TRFSK, financial awareness, business education, investment platform, monthly returns, business networking, Pune, financial literacy, entrepreneurship, investment guidance, partner portal",
  authors: [{ name: "TRFSK" }],
  creator: "TRFSK",
  publisher: "TRFSK",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "TRFSK - Financial Awareness & Investment Platform",
    description: "Leading financial awareness, business education, and professional networking platform in Pune. Join TRFSK for structured investment opportunities with monthly returns.",
    url: absoluteUrl("/"),
    siteName: "TRFSK",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-home.png"),
        width: 1200,
        height: 630,
        alt: "TRFSK - Financial Awareness & Investment Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRFSK - Financial Awareness & Investment Platform",
    description: "Leading financial awareness, business education, and professional networking platform in Pune.",
    images: [absoluteUrl("/og-home.png")],
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

// All home components are inside app/components/home/
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Services from "./components/home/Services";
import WhyChoose from "./components/home/WhyChoose";
import Stats from "./components/home/Stats";
import Testimonials from "./components/home/Testimonials";
import FAQ from "./components/home/FAQ";

// Contact is directly inside app/components/
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <Stats />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
