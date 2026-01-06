// src/app/robots.ts

import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo/constants';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/checkout/',
          '/order-confirmation/',
          '/admin/',
          '/_next/',
          '/static/',
          '/*.json$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/order-confirmation/', '/admin/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/products/'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
