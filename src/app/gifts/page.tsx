// src/app/gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gift, Heart, Star, Moon, MapPin, Music } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/seo';
import { JsonLd } from '@/components/seo';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG } from '@/lib/seo/constants';

export const metadata: Metadata = genMeta({
  title: 'Gift Ideas | Personalised Gifts for Every Occasion',
  description:
    'Find the perfect personalised gift for any occasion. Custom star maps, location prints, moon phases & soundwave art. Meaningful presents that celebrate special moments.',
  keywords: [
    'personalised gifts',
    'custom prints',
    'unique gifts',
    'meaningful presents',
    'gift ideas australia',
    'anniversary gifts',
    'wedding gifts',
    'birthday gifts',
  ],
  path: '/gifts',
});

const giftCategories = [
  {
    name: 'Anniversary Gifts',
    slug: 'anniversary-gifts',
    description:
      'Celebrate your love story with a personalised anniversary gift. From first date memories to yearly milestones.',
    image: '/images/gifts/anniversary.jpg',
    icon: Heart,
    color: 'bg-rose-50 text-rose-600',
  },
  {
    name: 'Wedding Gifts',
    slug: 'wedding-gifts',
    description:
      'Unique wedding gifts the happy couple will treasure forever. Capture their special day in beautiful artwork.',
    image: '/images/gifts/wedding.jpg',
    icon: Star,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    name: "Valentine's Day Gifts",
    slug: 'valentines-day-gifts',
    description:
      'Show your love with a meaningful Valentine\'s Day gift. Personalised prints that say more than flowers.',
    image: '/images/gifts/valentines.jpg',
    icon: Heart,
    color: 'bg-pink-50 text-pink-600',
  },
  {
    name: 'Christmas Gifts',
    slug: 'christmas-gifts',
    description:
      'Thoughtful Christmas presents for everyone on your list. Gifts that create lasting memories.',
    image: '/images/gifts/christmas.jpg',
    icon: Gift,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    name: "Mother's Day Gifts",
    slug: 'mothers-day-gifts',
    description:
      'Perfect gifts for Mum that show how much you care. Personalised prints celebrating your special bond.',
    image: '/images/gifts/mothers-day.jpg',
    icon: Heart,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    name: "Father's Day Gifts",
    slug: 'fathers-day-gifts',
    description:
      'Unique Father\'s Day gifts Dad will actually love. September celebrations sorted (Australia).',
    image: '/images/gifts/fathers-day.jpg',
    icon: Star,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'Baby Gifts',
    slug: 'baby-gifts',
    description:
      'Welcome new arrivals with personalised baby gifts. Night sky prints, birth moon phases & more.',
    image: '/images/gifts/baby.jpg',
    icon: Moon,
    color: 'bg-sky-50 text-sky-600',
  },
];

const productHighlights = [
  {
    name: 'Star Maps',
    description: 'The night sky from any date',
    href: '/star-map',
    icon: Star,
  },
  {
    name: 'Where We Met Maps',
    description: 'Your special location',
    href: '/where-we-met',
    icon: MapPin,
  },
  {
    name: 'Moon Phase Prints',
    description: 'The moon from any moment',
    href: '/moon-phase',
    icon: Moon,
  },
  {
    name: 'Sound Wave Art',
    description: 'Your song visualised',
    href: '/sound-wave',
    icon: Music,
  },
];

export default function GiftsPage() {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Gift Ideas | Personalised Gifts for Every Occasion',
    description:
      'Find the perfect personalised gift for any occasion. Custom star maps, location prints, moon phases & soundwave art.',
    url: `${SITE_CONFIG.url}/gifts`,
    image: `${SITE_CONFIG.url}/images/og/gifts.jpg`,
  });

  return (
    <>
      <JsonLd data={collectionSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'Gifts', href: '/gifts' }]} />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
              Gifts That Mean Something
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
              Discover personalised prints that capture your most cherished
              moments. From the night sky on your wedding day to the place where
              you first met, create meaningful gifts that tell your unique story.
            </p>
          </div>
        </section>

        {/* Product Highlights */}
        <section className="bg-white py-12 border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {productHighlights.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="group flex flex-col items-center text-center p-6 rounded-xl hover:bg-stone-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4 group-hover:bg-stone-200 transition-colors">
                    <product.icon className="w-6 h-6 text-stone-700" />
                  </div>
                  <h3 className="font-medium text-stone-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-500">{product.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Categories Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 text-center mb-12">
            Shop by Occasion
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {giftCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/gifts/${category.slug}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${category.color} mb-3`}
                  >
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-stone-900" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-serif text-stone-900 mb-2">
                  10,000+
                </div>
                <p className="text-stone-600">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl font-serif text-stone-900 mb-2">
                  4.9/5
                </div>
                <p className="text-stone-600">Average Rating</p>
              </div>
              <div>
                <div className="text-4xl font-serif text-stone-900 mb-2">
                  Free
                </div>
                <p className="text-stone-600">Australian Shipping</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pillar Content CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-stone-900 rounded-3xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Not Sure What to Get?
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Our comprehensive anniversary gift guide covers traditional and
              modern gifts for every year, from paper to platinum.
            </p>
            <Link
              href="/guides/anniversary-gifts-by-year"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-colors"
            >
              Anniversary Gifts by Year Guide
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
