// src/lib/seo/schemas.ts

import { SITE_CONFIG, SHIPPING_INFO } from './constants';
import type {
  ProductSchemaData,
  FAQItem,
  ArticleSchemaData,
  LocalBusinessData,
  BreadcrumbItem,
  ReviewData,
} from '@/types/seo';

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
      width: 512,
      height: 512,
    },
    image: `${SITE_CONFIG.url}${SITE_CONFIG.images.ogDefault}`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.business.address.addressLocality,
      addressRegion: SITE_CONFIG.business.address.addressRegion,
      addressCountry: SITE_CONFIG.business.address.addressCountry,
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.pinterest,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: SITE_CONFIG.business.email,
      availableLanguage: ['English'],
    },
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: 'en-AU',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Product schema for individual products
 */
export function generateProductSchema({
  name,
  description,
  image,
  sku,
  brand,
  offers,
  aggregateRating,
  review,
}: ProductSchemaData) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: offers.priceCurrency,
      lowPrice: offers.lowPrice,
      highPrice: offers.highPrice,
      offerCount: offers.offerCount,
      availability: `https://schema.org/${offers.availability}`,
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: SHIPPING_INFO.australia.cost,
          currency: SITE_CONFIG.currency,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AU',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 3,
            unitCode: 'd',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'd',
          },
        },
      },
    },
  };

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating || 5,
      worstRating: aggregateRating.worstRating || 1,
    };
  }

  if (review && review.length > 0) {
    schema.review = review.map((r: ReviewData) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      datePublished: r.datePublished,
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.reviewRating.ratingValue,
        bestRating: r.reviewRating.bestRating || 5,
        worstRating: r.reviewRating.worstRating || 1,
      },
    }));
  }

  return schema;
}

/**
 * Generate ProductGroup schema for product variants
 */
export function generateProductGroupSchema({
  name,
  description,
  image,
  baseUrl,
  variants,
}: {
  name: string;
  description: string;
  image: string[];
  baseUrl: string;
  variants: Array<{
    name: string;
    sku: string;
    price: number;
    size?: string;
    frame?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    name,
    description,
    image,
    url: baseUrl,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    productGroupID: name.toLowerCase().replace(/\s+/g, '-'),
    hasVariant: variants.map((variant) => ({
      '@type': 'Product',
      name: variant.name,
      sku: variant.sku,
      offers: {
        '@type': 'Offer',
        price: variant.price,
        priceCurrency: SITE_CONFIG.currency,
        availability: 'https://schema.org/InStock',
      },
      ...(variant.size && {
        size: variant.size,
        additionalProperty: {
          '@type': 'PropertyValue',
          propertyID: 'size',
          value: variant.size,
        },
      }),
      ...(variant.frame && {
        additionalProperty: {
          '@type': 'PropertyValue',
          propertyID: 'frame',
          value: variant.frame,
        },
      }),
    })),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
}: ArticleSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog`,
    },
  };
}

/**
 * Generate HowTo schema for guides
 */
export function generateHowToSchema({
  name,
  description,
  image,
  totalTime,
  steps,
}: {
  name: string;
  description: string;
  image: string;
  totalTime: string; // ISO 8601 duration format, e.g., 'PT5M'
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    image,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(data?: Partial<LocalBusinessData>) {
  const defaultData: LocalBusinessData = {
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.images.ogDefault}`,
    address: {
      addressLocality: SITE_CONFIG.business.address.addressLocality,
      addressRegion: SITE_CONFIG.business.address.addressRegion,
      addressCountry: SITE_CONFIG.business.address.addressCountry,
    },
    email: SITE_CONFIG.business.email,
    priceRange: SITE_CONFIG.business.priceRange,
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.pinterest,
    ],
    paymentAccepted: ['Credit Card', 'Debit Card', 'Apple Pay', 'Google Pay'],
    currenciesAccepted: SITE_CONFIG.currency,
  };

  const mergedData = { ...defaultData, ...data };

  return {
    '@context': 'https://schema.org',
    '@type': 'OnlineBusiness',
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: mergedData.name,
    description: mergedData.description,
    url: mergedData.url,
    logo: mergedData.logo,
    image: mergedData.image,
    address: {
      '@type': 'PostalAddress',
      ...mergedData.address,
    },
    ...(mergedData.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: mergedData.geo.latitude,
        longitude: mergedData.geo.longitude,
      },
    }),
    ...(mergedData.telephone && { telephone: mergedData.telephone }),
    ...(mergedData.email && { email: mergedData.email }),
    priceRange: mergedData.priceRange,
    sameAs: mergedData.sameAs,
    paymentAccepted: mergedData.paymentAccepted,
    currenciesAccepted: mergedData.currenciesAccepted,
  };
}

/**
 * Generate ItemList schema for collection/category pages
 */
export function generateItemListSchema({
  name,
  description,
  items,
}: {
  name: string;
  description: string;
  items: Array<{
    name: string;
    url: string;
    image: string;
    price: number;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        url: item.url,
        image: item.image,
        offers: {
          '@type': 'Offer',
          price: item.price,
          priceCurrency: SITE_CONFIG.currency,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}

/**
 * Generate CollectionPage schema for gift guides
 */
export function generateCollectionPageSchema({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    image,
    isPartOf: {
      '@id': `${SITE_CONFIG.url}/#website`,
    },
    about: {
      '@type': 'Thing',
      name: 'Personalised Gifts',
    },
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
  };
}

/**
 * Generate Review snippet schema
 */
export function generateReviewSchema(reviews: ReviewData[]) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.reviewRating.ratingValue,
      bestRating: review.reviewRating.bestRating || 5,
      worstRating: review.reviewRating.worstRating || 1,
    },
    itemReviewed: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  }));
}
