// src/components/seo/LocalBusinessSchema.tsx

import React from 'react';
import { JsonLd } from './JsonLd';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateLocalBusinessSchema,
} from '@/lib/seo/schemas';

/**
 * Combined Organization, Website, and LocalBusiness schemas
 * Include this in the root layout for site-wide structured data
 */
export function SiteSchemas() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <JsonLd
      data={[organizationSchema, websiteSchema, localBusinessSchema]}
    />
  );
}

/**
 * Individual LocalBusiness schema component
 */
export function LocalBusinessSchema() {
  const schema = generateLocalBusinessSchema();
  return <JsonLd data={schema} />;
}

/**
 * Individual Organization schema component
 */
export function OrganizationSchema() {
  const schema = generateOrganizationSchema();
  return <JsonLd data={schema} />;
}

/**
 * Individual Website schema component
 */
export function WebsiteSchema() {
  const schema = generateWebsiteSchema();
  return <JsonLd data={schema} />;
}

export default SiteSchemas;
