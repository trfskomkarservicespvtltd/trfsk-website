import type { Metadata } from 'next';

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
      url: 'https://trfsk.com',
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
    url: 'https://trfsk.com',
    logo: 'https://trfsk.com/logo.png',
    description:
      'Financial awareness, entrepreneurship, business education, and professional networking.',
    sameAs: [
      'https://www.facebook.com/trfsk',
      'https://www.twitter.com/trfsk',
      'https://www.linkedin.com/company/trfsk',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'contact@trfsk.com',
      telephone: '+1-XXX-XXX-XXXX',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: 'ZIP Code',
      addressCountry: 'US',
    },
  };
};

export const getLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'TRFSK',
    image: 'https://trfsk.com/logo.png',
    description:
      'Leading provider of financial education, entrepreneurship training, and business guidance.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: 'ZIP Code',
      addressCountry: 'US',
    },
    telephone: '+1-XXX-XXX-XXXX',
    email: 'contact@trfsk.com',
    url: 'https://trfsk.com',
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
