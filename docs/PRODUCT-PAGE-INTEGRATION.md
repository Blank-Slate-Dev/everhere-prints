# Product Page SEO Integration Guide

This guide shows you exactly how to add SEO components to your existing product pages.

---

## Quick Start (2 minutes per page)

For each product page, you need to add **3 things**:

1. **Metadata** (for search results & social sharing)
2. **Product Schema** (for rich snippets)
3. **Breadcrumbs** (for navigation & SEO)

---

## Star Map Page (`/star-map`)

Open your `src/app/star-map/page.tsx` and add:

### Step 1: Add imports at the top

```tsx
import { Metadata } from 'next';
import { StarMapSchema, Breadcrumbs } from '@/components/seo';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
```

### Step 2: Add metadata export (outside the component)

```tsx
export const metadata: Metadata = genMeta({
  title: 'Custom Star Map | Create Your Night Sky Print | EverHere Prints',
  description: 'Create a stunning personalised star map showing the exact night sky from any date and location. Perfect for anniversaries, weddings, and special moments. Free AU shipping.',
  keywords: ['star map', 'custom star map', 'personalised star map', 'night sky print', 'wedding gift australia'],
  path: '/star-map',
  image: '/images/og/star-map.jpg',
});
```

### Step 3: Add schema and breadcrumbs to your component

```tsx
export default function StarMapPage() {
  return (
    <>
      {/* ADD THIS - Product schema for rich snippets */}
      <StarMapSchema />
      
      <main>
        {/* ADD THIS - Breadcrumbs at the top of your page */}
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={[{ name: 'Star Map', href: '/star-map' }]} />
        </div>
        
        {/* Your existing page content */}
      </main>
    </>
  );
}
```

---

## Where We Met Page (`/where-we-met`)

### Add to your `src/app/where-we-met/page.tsx`:

```tsx
import { Metadata } from 'next';
import { WhereWeMetSchema, Breadcrumbs } from '@/components/seo';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: 'Where We Met Map | Custom Location Print | EverHere Prints',
  description: 'Create a beautiful personalised map of your special place. Mark where you met, got engaged, or fell in love. Free Australian shipping.',
  keywords: ['where we met map', 'custom location map', 'personalised map print', 'couples gift', 'location print'],
  path: '/where-we-met',
  image: '/images/og/where-we-met.jpg',
});

export default function WhereWeMetPage() {
  return (
    <>
      <WhereWeMetSchema />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={[{ name: 'Where We Met', href: '/where-we-met' }]} />
        </div>
        
        {/* Your existing page content */}
      </main>
    </>
  );
}
```

---

## Moon Phase Page (`/moon-phase`)

### Add to your `src/app/moon-phase/page.tsx`:

```tsx
import { Metadata } from 'next';
import { MoonPhaseSchema, Breadcrumbs } from '@/components/seo';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: 'Moon Phase Print | Custom Lunar Art | EverHere Prints',
  description: 'Capture the exact moon phase from any special date. Perfect for weddings, births, and anniversaries. Beautiful minimalist lunar prints with free AU shipping.',
  keywords: ['moon phase print', 'lunar phase art', 'moon print', 'custom moon phase', 'birth moon'],
  path: '/moon-phase',
  image: '/images/og/moon-phase.jpg',
});

export default function MoonPhasePage() {
  return (
    <>
      <MoonPhaseSchema />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={[{ name: 'Moon Phase', href: '/moon-phase' }]} />
        </div>
        
        {/* Your existing page content */}
      </main>
    </>
  );
}
```

---

## Sound Wave Page (`/sound-wave`)

### Add to your `src/app/sound-wave/page.tsx`:

```tsx
import { Metadata } from 'next';
import { SoundWaveSchema, Breadcrumbs } from '@/components/seo';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: 'Sound Wave Art | Custom Audio Print | EverHere Prints',
  description: 'Transform your favourite song or voice into stunning soundwave art. Perfect for music lovers, weddings, and meaningful moments. Free Australian shipping.',
  keywords: ['sound wave art', 'soundwave print', 'audio art', 'song art', 'voice wave print'],
  path: '/sound-wave',
  image: '/images/og/sound-wave.jpg',
});

export default function SoundWavePage() {
  return (
    <>
      <SoundWaveSchema />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={[{ name: 'Sound Wave Art', href: '/sound-wave' }]} />
        </div>
        
        {/* Your existing page content */}
      </main>
    </>
  );
}
```

---

## Australia Map Page (`/australia-map`)

### Add to your `src/app/australia-map/page.tsx`:

```tsx
import { Metadata } from 'next';
import { AustraliaMapSchema, Breadcrumbs } from '@/components/seo';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: 'Australia Map Print | Custom Watercolour Map | EverHere Prints',
  description: 'Beautiful watercolour maps of Australia. Personalise with your locations, travels, and memories. Premium Australian-made prints with free shipping.',
  keywords: ['australia map print', 'watercolour map', 'custom australia map', 'travel map', 'personalised map australia'],
  path: '/australia-map',
  image: '/images/og/australia-map.jpg',
});

export default function AustraliaMapPage() {
  return (
    <>
      <AustraliaMapSchema />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={[{ name: 'Australia Map', href: '/australia-map' }]} />
        </div>
        
        {/* Your existing page content */}
      </main>
    </>
  );
}
```

---

## What You Get

After adding these components, Google will see:

### Rich Product Snippets
- ⭐ Star ratings (4.9/5)
- 💰 Price range ($59 - $199)
- ✅ In stock status
- 📦 Free shipping info
- 📝 Customer reviews

### Better Search Results
- Optimized title tags
- Compelling descriptions
- Proper Open Graph images

### Navigation
- Breadcrumb trail in search results
- Better site structure signals

---

## Testing Your Implementation

After adding the components:

1. **Build your site**: `npm run build`
2. **Check for errors**: Ensure no TypeScript errors
3. **Test locally**: `npm run start`
4. **Validate schema**: Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
5. **Enter your URL** and verify Product schema is detected

---

## Optional: Override Default Values

Each schema component has sensible defaults, but you can override them:

```tsx
// Use custom rating/review count (e.g., from your actual review system)
<StarMapSchema 
  rating={4.8}
  reviewCount={2500}
/>

// Or provide your own reviews
<StarMapSchema 
  reviews={[
    {
      author: 'Customer Name',
      datePublished: '2026-01-05',
      reviewBody: 'Amazing product!',
      reviewRating: { ratingValue: 5 },
    },
  ]}
/>
```

---

## Checklist

| Page | Metadata | Schema | Breadcrumbs |
|------|----------|--------|-------------|
| `/star-map` | ☐ | ☐ | ☐ |
| `/where-we-met` | ☐ | ☐ | ☐ |
| `/moon-phase` | ☐ | ☐ | ☐ |
| `/sound-wave` | ☐ | ☐ | ☐ |
| `/australia-map` | ☐ | ☐ | ☐ |

---

## Need Help?

If you run into TypeScript errors, make sure:

1. The `@/components/seo` folder is properly set up
2. The `@/lib/seo` folder contains `metadata.ts` and `constants.ts`
3. Your `tsconfig.json` has the `@/*` path alias configured

All required files are in the SEO package provided.
