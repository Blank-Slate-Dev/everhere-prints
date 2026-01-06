// src/types/seo.ts

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: ReadonlyArray<string>;
  canonical?: string;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterConfig;
  robots?: RobotsConfig;
}

export interface OpenGraphConfig {
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  images?: OpenGraphImage[];
  locale?: string;
  type?: 'website' | 'article' | 'product';
}

export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface TwitterConfig {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  images?: string[];
}

export interface RobotsConfig {
  index?: boolean;
  follow?: boolean;
  nocache?: boolean;
  googleBot?: {
    index?: boolean;
    follow?: boolean;
    noimageindex?: boolean;
    'max-video-preview'?: number | string;
    'max-image-preview'?: 'none' | 'standard' | 'large';
    'max-snippet'?: number;
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface ProductSchemaData {
  name: string;
  description: string;
  image: string[];
  sku: string;
  brand: string;
  offers: {
    priceCurrency: string;
    lowPrice: number;
    highPrice: number;
    offerCount: number;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
    priceValidUntil?: string;
    shippingDetails?: {
      shippingRate: number;
      shippingDestination: string;
      deliveryTime: string;
    };
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  review?: ReviewData[];
}

export interface ReviewData {
  author: string;
  datePublished: string;
  reviewBody: string;
  reviewRating: {
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleSchemaData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
}

export interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  email?: string;
  priceRange: string;
  openingHours?: string[];
  sameAs?: string[];
  paymentAccepted?: string[];
  currenciesAccepted?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  image: string;
  imageAlt: string;
  category: string;
  tags: string[];
  readingTime: number;
}

export interface GiftGuideProduct {
  name: string;
  slug: string;
  description: string;
  priceFrom: number;
  image: string;
  features: string[];
  occasions: string[];
  bestFor: string;
}
