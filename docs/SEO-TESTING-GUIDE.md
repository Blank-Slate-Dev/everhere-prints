# SEO Testing & Validation Guide

This document provides instructions for testing and validating the SEO implementation.

## Schema Markup Testing

### Google Rich Results Test
Test your structured data using Google's official tool:
https://search.google.com/test/rich-results

Test these pages:
- Homepage: Check Organization, WebSite schemas
- Product pages: Check Product schema with AggregateOffer
- Gift guide pages: Check CollectionPage, ItemList schemas
- Blog posts: Check Article schema
- FAQ page: Check FAQPage schema

### Schema.org Validator
For detailed schema validation:
https://validator.schema.org/

## Core Web Vitals Testing

### Google PageSpeed Insights
https://pagespeed.web.dev/

Target metrics:
- LCP (Largest Contentful Paint): < 2.5s
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1

### Chrome DevTools Lighthouse
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Run audit for Performance, SEO, Accessibility

## Mobile-Friendliness

### Google Mobile-Friendly Test
https://search.google.com/test/mobile-friendly

Test all key pages to ensure proper mobile rendering.

## Search Console Setup

1. Add property in Google Search Console
2. Verify ownership via DNS, HTML tag, or file upload
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`
4. Monitor for errors and coverage issues

### Key Reports to Monitor
- **Coverage**: Ensure pages are being indexed
- **Enhancements**: Check rich results status
- **Core Web Vitals**: Monitor performance metrics
- **Mobile Usability**: Check for mobile issues

## SEO Checklist

### Technical SEO
- [ ] Sitemap submitted to Search Console
- [ ] Robots.txt allows crawling of important pages
- [ ] All pages have unique meta titles (50-60 chars)
- [ ] All pages have unique meta descriptions (150-160 chars)
- [ ] Canonical URLs set correctly
- [ ] No duplicate content issues
- [ ] SSL certificate active (HTTPS)
- [ ] XML sitemap accessible at /sitemap.xml

### Structured Data
- [ ] Organization schema on homepage
- [ ] WebSite schema with SearchAction
- [ ] Product schema on all product pages
- [ ] FAQ schema on FAQ sections
- [ ] Article schema on blog posts
- [ ] BreadcrumbList on all pages
- [ ] LocalBusiness schema for local SEO

### Content SEO
- [ ] H1 tag on every page (only one per page)
- [ ] Proper heading hierarchy (H1 > H2 > H3)
- [ ] Alt text on all images
- [ ] Internal linking between related pages
- [ ] Keywords in titles, headings, and content
- [ ] Australian spelling throughout (personalised, colour)

### Performance
- [ ] Images optimised (WebP format, proper sizing)
- [ ] Lazy loading for below-fold images
- [ ] Preconnect to external domains
- [ ] Minimal JavaScript blocking
- [ ] CSS above-the-fold content prioritised

## Keyword Tracking

Track rankings for these priority keywords:

### Product Keywords
- "custom star map australia"
- "personalised star map"
- "where we met map"
- "moon phase print"
- "soundwave art australia"

### Gift Keywords
- "anniversary gifts australia"
- "unique wedding gift"
- "first anniversary gift"
- "personalised gifts australia"

### Long-tail Keywords
- "stars on the night we met"
- "paper anniversary gift ideas"
- "unique gift for couple who has everything"

## Recommended Tools

### Free Tools
- Google Search Console
- Google Analytics 4
- Google PageSpeed Insights
- Google Rich Results Test
- Bing Webmaster Tools

### Paid Tools (Optional)
- Ahrefs - Keyword tracking, backlink analysis
- SEMrush - Competitor analysis, keyword research
- Screaming Frog - Technical SEO audits
- Moz Pro - Domain authority tracking

## Monthly SEO Tasks

1. **Week 1**: Review Search Console for errors
2. **Week 2**: Check Core Web Vitals, fix any issues
3. **Week 3**: Review keyword rankings, identify opportunities
4. **Week 4**: Publish new content (blog post, guide update)

## Quarterly SEO Tasks

1. Comprehensive technical audit
2. Competitor analysis update
3. Content audit and refresh
4. Backlink profile review
5. Keyword strategy review
