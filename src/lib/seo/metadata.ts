// src/lib/seo/metadata.ts

import { Metadata } from 'next';
import { SITE_CONFIG, PAGE_META } from './constants';

interface GenerateMetadataOptions {
  title: string;
  description: string;
  keywords?: ReadonlyArray<string>;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Generate comprehensive Next.js Metadata for any page
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image = SITE_CONFIG.images.ogDefault,
  imageAlt = SITE_CONFIG.name,
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: GenerateMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    
    // Canonical URL
    alternates: {
      canonical: url,
    },
    
    // Robots
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: type === 'article' ? 'article' : type === 'product' ? 'website' : 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
      }),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@everhereprints',
      site: '@everhereprints',
    },
    
    // Additional meta tags
    other: {
      'geo.region': 'AU-NSW',
      'geo.placename': 'Sydney',
      'geo.position': '-33.8688;151.2093',
      'ICBM': '-33.8688, 151.2093',
      'format-detection': 'telephone=no',
    },
  };

  return metadata;
}

/**
 * Generate metadata for product pages
 */
export function generateProductMetadata({
  name,
  description,
  path,
  image,
  priceMin,
  priceMax,
  keywords = [],
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  priceMin: number;
  priceMax: number;
  keywords?: ReadonlyArray<string>;
}): Metadata {
  const baseMetadata = generateMetadata({
    title: name,
    description,
    path,
    image,
    imageAlt: name,
    type: 'product',
    keywords,
  });

  // Create a clean other object without undefined values
  const otherMeta: Record<string, string> = {
    'product:price:amount': String(priceMin),
    'product:price:currency': SITE_CONFIG.currency,
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:brand': SITE_CONFIG.name,
  };

  // Merge with existing other meta if present
  if (baseMetadata.other && typeof baseMetadata.other === 'object') {
    Object.entries(baseMetadata.other).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        otherMeta[key] = String(value);
      }
    });
  }

  return {
    ...baseMetadata,
    other: otherMeta,
  };
}

/**
 * Generate metadata for blog/article pages
 */
export function generateArticleMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  section = 'Gift Ideas',
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt?: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
  section?: string;
}): Metadata {
  return generateMetadata({
    title,
    description,
    path,
    image,
    imageAlt: imageAlt || title,
    type: 'article',
    publishedTime,
    modifiedTime: modifiedTime || publishedTime,
    authors: [author],
    section,
    tags,
  });
}

/**
 * Generate metadata for gift guide landing pages
 */
export function generateGiftGuideMetadata(
  occasion: keyof typeof PAGE_META
): Metadata {
  const pageMeta = PAGE_META[occasion];
  
  if (!pageMeta) {
    return generateMetadata({
      title: 'Gift Ideas',
      description: 'Find the perfect personalised gift for any occasion.',
      path: '/gifts',
    });
  }

  return generateMetadata({
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: Array.isArray(pageMeta.keywords) ? pageMeta.keywords : [],
    path: `/gifts/${occasion.replace('Gifts', '-gifts').toLowerCase()}`,
    image: `/images/og/${occasion}.jpg`,
  });
}

/**
 * Get default site metadata for root layout
 */
export function getDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: PAGE_META.home.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: PAGE_META.home.description,
    keywords: PAGE_META.home.keywords.join(', '),
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    
    // Favicon and icons
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
    
    // Manifest
    manifest: '/manifest.webmanifest',
    
    // Verification (add your verification codes)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
    
    // Category
    category: 'shopping',
    
    // Open Graph defaults
    openGraph: {
      type: 'website',
      locale: SITE_CONFIG.locale,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: PAGE_META.home.title,
      description: PAGE_META.home.description,
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.images.ogDefault}`,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    
    // Twitter defaults
    twitter: {
      card: 'summary_large_image',
      site: '@everhereprints',
      creator: '@everhereprints',
    },
    
    // Robots defaults
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // App-specific
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: SITE_CONFIG.name,
    },
    
    // Format detection
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

/**
 * Generate JSON-LD script content for any schema
 */
export function generateJsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data, null, 0);
}
