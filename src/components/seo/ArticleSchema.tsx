// src/components/seo/ArticleSchema.tsx

import React from 'react';
import { JsonLd } from './JsonLd';
import { generateArticleSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG } from '@/lib/seo/constants';

interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  authorUrl?: string;
}

/**
 * Article Schema component for blog posts and guides
 */
export function ArticleSchema({
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  author = 'EverHere Prints',
  authorUrl,
}: ArticleSchemaProps) {
  const schema = generateArticleSchema({
    headline: title,
    description,
    image: image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      name: author,
      url: authorUrl,
    },
    publisher: {
      name: SITE_CONFIG.name,
      logo: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
    },
  });

  return <JsonLd data={schema} />;
}

export default ArticleSchema;
