// src/components/seo/JsonLd.tsx

import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Component to render JSON-LD structured data
 * Can accept a single schema object or an array of schemas
 */
export function JsonLd({ data }: JsonLdProps) {
  // Handle array of schemas by wrapping in @graph
  const structuredData = Array.isArray(data)
    ? {
        '@context': 'https://schema.org',
        '@graph': data.map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { '@context': _, ...rest } = item;
          return rest;
        }),
      }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 0),
      }}
    />
  );
}

/**
 * Wrapper for multiple JSON-LD scripts (legacy support)
 */
export function MultipleJsonLd({
  schemas,
}: {
  schemas: Record<string, unknown>[];
}) {
  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
    </>
  );
}

export default JsonLd;
