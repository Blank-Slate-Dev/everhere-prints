// src/components/seo/Breadcrumbs.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import type { BreadcrumbItem } from '@/types/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  homeLabel?: string;
}

export function Breadcrumbs({
  items,
  className = '',
  showHome = true,
  homeLabel = 'Home',
}: BreadcrumbsProps) {
  // Build full items list including home
  const fullItems: BreadcrumbItem[] = showHome
    ? [{ name: homeLabel, href: '/' }, ...items]
    : items;

  // Generate schema data
  const schemaData = generateBreadcrumbSchema(fullItems);

  return (
    <>
      {/* JSON-LD Schema */}
      <JsonLd data={schemaData} />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-sm ${className}`}
      >
        <ol
          className="flex items-center space-x-1 md:space-x-2"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            const isFirst = index === 0;

            return (
              <li
                key={item.href}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator */}
                {!isFirst && (
                  <ChevronRight
                    className="h-4 w-4 text-stone-400 mx-1 md:mx-2 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}

                {/* Link or current page */}
                {isLast ? (
                  <span
                    className="text-stone-600 font-medium truncate max-w-[200px] md:max-w-none"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-stone-500 hover:text-stone-900 transition-colors flex items-center truncate max-w-[150px] md:max-w-none"
                    itemProp="item"
                  >
                    {isFirst && showHome ? (
                      <>
                        <Home className="h-4 w-4 flex-shrink-0" />
                        <span className="sr-only" itemProp="name">
                          {item.name}
                        </span>
                      </>
                    ) : (
                      <span itemProp="name">{item.name}</span>
                    )}
                  </Link>
                )}

                {/* Position meta */}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/**
 * Simple breadcrumb generator for common patterns
 */
export function generateBreadcrumbItems(
  path: string,
  labels?: Record<string, string>
): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];
  let currentPath = '';

  const defaultLabels: Record<string, string> = {
    gifts: 'Gifts',
    blog: 'Blog',
    guides: 'Guides',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    'star-map': 'Star Maps',
    'where-we-met': 'Where We Met Maps',
    'moon-phase': 'Moon Phase Prints',
    'sound-wave': 'Sound Wave Art',
    'australia-map': 'Australia Maps',
    'anniversary-gifts': 'Anniversary Gifts',
    'wedding-gifts': 'Wedding Gifts',
    'valentines-day-gifts': "Valentine's Day Gifts",
    'christmas-gifts': 'Christmas Gifts',
    'mothers-day-gifts': "Mother's Day Gifts",
    'fathers-day-gifts': "Father's Day Gifts",
    'baby-gifts': 'Baby Gifts',
    ...labels,
  };

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label =
      defaultLabels[segment] ||
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    items.push({
      name: label,
      href: currentPath,
    });
  });

  return items;
}

export default Breadcrumbs;
