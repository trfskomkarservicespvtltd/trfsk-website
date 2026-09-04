import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/app/lib/siteConfig';

export const generateMetadata = (): Metadata => {
  return {
    title: 'TRFSK - Financial Awareness & Business Education',
    description: 'TRFSK is committed to promoting financial awareness, entrepreneurship, business education and meaningful professional networking.',
    keywords: 'financial awareness, entrepreneurship, business education, professional networking, TRFSK',
    authors: [{ name: 'TRFSK' }],
    creator: 'TRFSK',
    publisher: 'TRFSK',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: 'TRFSK - Financial Awareness & Business Education',
      description: 'TRFSK is committed to promoting financial awareness, entrepreneurship, business education and meaningful professional networking.',
      url: siteConfig.url,
      siteName: 'TRFSK',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'TRFSK - Financial Awareness & Business Education',
      description: 'TRFSK is committed to promoting financial awareness, entrepreneurship, business education and meaningful professional networking.',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};

export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TRFSK',
    url: siteConfig.url,
    logo: absoluteUrl('/logo.png'),
    description:
      'Financial awareness, entrepreneurship, business education, and professional networking.',
    sameAs: [
      'https://www.facebook.com/trfskomkar',
      'https://www.instagram.com/trfskomkar/',
      'https://www.linkedin.com/in/santosh-maruti-shendkar-501355345',
      'https://youtube.com/@omkarservice-s',
      'https://x.com/omkarenter66396',
      'https://pin.it/2TC8lYiZ8',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: "care@trfskomkar.com",
      telephone: '+91-81693-02861',
      areaServed: 'IN',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DNK Business Bay, 101, Katraj - Kondhwa Rd, Rajas Society, Katraj',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411046',
      addressCountry: 'IN',
    },
  };
};

export const getLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'TRFSK',
    image: absoluteUrl('/logo.png'),
    description:
      'Leading provider of financial education, entrepreneurship training, and business guidance.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DNK Business Bay, 101, Katraj - Kondhwa Rd, Rajas Society, Katraj',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411046',
      addressCountry: 'IN',
    },
    telephone: '+91-81693-02861',
    email: "care@trfskomkar.com",
    url: siteConfig.url,
  };
};

export const getServiceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Service',
        name: 'Financial Education',
        description:
          'Helping individuals and businesses improve financial literacy through practical knowledge, strategic planning, and long-term wealth-building principles.',
        provider: {
          '@type': 'Organization',
          name: 'TRFSK',
        },
      },
      {
        '@type': 'Service',
        name: 'Business Partnerships',
        description:
          'Connecting entrepreneurs, professionals, and organizations to create meaningful collaborations that drive sustainable growth.',
        provider: {
          '@type': 'Organization',
          name: 'TRFSK',
        },
      },
      {
        '@type': 'Service',
        name: 'Investment Guidance',
        description:
          'Providing market insights, investment strategies, and growth opportunities that support informed financial decisions.',
        provider: {
          '@type': 'Organization',
          name: 'TRFSK',
        },
      },
    ],
  };
};

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};