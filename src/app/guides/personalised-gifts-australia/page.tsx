// src/app/guides/personalised-gifts-australia/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gift, Star, MapPin, Moon, Music, Heart, Check, Award } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Personalised Gifts Australia: Unique Custom Gift Ideas | EverHere Prints',
  description:
    'Discover the best personalised gifts in Australia. Custom star maps, location prints, moon phases & more. Free AU shipping. Australian made. Unique gifts for any occasion.',
  keywords: [
    'personalised gifts australia',
    'custom gifts australia',
    'unique gifts australia',
    'personalised presents',
    'customised gifts',
    'australian made gifts',
    'meaningful gifts australia',
    'bespoke gifts',
    'custom prints australia',
    'personalised gift ideas',
  ],
  path: '/guides/personalised-gifts-australia',
  image: '/images/og/personalised-gifts-australia.jpg',
});

const giftCategories = [
  {
    name: 'Star Maps',
    description: 'Capture the exact night sky from any date and location. Perfect for birthdays, anniversaries, and special moments.',
    slug: '/star-map',
    image: '/images/guides/star-map-gift.jpg',
    priceFrom: 59,
    icon: Star,
    occasions: ['Birthdays', 'Anniversaries', 'Weddings', 'New Baby'],
  },
  {
    name: 'Location Maps',
    description: 'Beautiful custom maps showing meaningful places—where you met, got engaged, or call home.',
    slug: '/where-we-met',
    image: '/images/guides/location-map-gift.jpg',
    priceFrom: 59,
    icon: MapPin,
    occasions: ['Couples', 'Housewarming', 'Farewell', 'Memory'],
  },
  {
    name: 'Moon Phase Prints',
    description: 'The exact moon from any date in history. A subtle, beautiful way to mark special moments.',
    slug: '/moon-phase',
    image: '/images/guides/moon-phase-gift.jpg',
    priceFrom: 49,
    icon: Moon,
    occasions: ['Births', 'Weddings', 'Memorials', 'Milestones'],
  },
  {
    name: 'Sound Wave Art',
    description: 'Transform audio into visual art—wedding songs, baby\'s first words, or a loved one\'s voice.',
    slug: '/sound-wave',
    image: '/images/guides/soundwave-gift.jpg',
    priceFrom: 59,
    icon: Music,
    occasions: ['Music Lovers', 'Parents', 'Couples', 'Memorial'],
  },
];

const occasions = [
  { name: 'Anniversary Gifts', href: '/gifts/anniversary-gifts', count: '15+ ideas' },
  { name: 'Wedding Gifts', href: '/gifts/wedding-gifts', count: '12+ ideas' },
  { name: 'Birthday Gifts', href: '/star-map', count: '10+ ideas' },
  { name: 'Valentine\'s Day', href: '/gifts/valentines-day-gifts', count: '8+ ideas' },
  { name: 'Mother\'s Day', href: '/gifts/mothers-day-gifts', count: '8+ ideas' },
  { name: 'Father\'s Day', href: '/gifts/fathers-day-gifts', count: '8+ ideas' },
  { name: 'Christmas', href: '/gifts/christmas-gifts', count: '12+ ideas' },
  { name: 'Baby Gifts', href: '/gifts/baby-gifts', count: '6+ ideas' },
];

const whyPersonalised = [
  { title: 'Completely Unique', description: 'No two prints are alike—each is made specifically for the recipient.' },
  { title: 'Shows Thoughtfulness', description: '80% of people say personalised gifts feel more thoughtful than store-bought.' },
  { title: 'Lasts Forever', description: 'Unlike flowers or consumables, a quality print becomes a treasured keepsake.' },
  { title: 'Perfect for "Has Everything"', description: 'Ideal for people who are hard to buy for—they can\'t already own it!' },
];

const faqs: FAQItem[] = [
  {
    question: 'What are the best personalised gifts in Australia?',
    answer: 'The most popular personalised gifts in Australia include custom star maps, location prints (like "Where We Met" maps), moon phase prints, and soundwave art. These gifts combine beautiful design with personal meaning, making them perfect for any occasion.',
  },
  {
    question: 'Where can I get personalised gifts made in Australia?',
    answer: 'EverHere Prints creates all personalised prints in Sydney, Australia. We offer free shipping nationwide and support local Australian production. This means faster delivery (3-7 days) compared to international alternatives.',
  },
  {
    question: 'How long does it take to receive a personalised gift in Australia?',
    answer: 'Our production takes 2-3 business days, then shipping within Australia is 3-7 business days (free) or 1-3 business days for express ($12.95). Total time is typically 5-10 business days for standard shipping.',
  },
  {
    question: 'Are personalised gifts more expensive than regular gifts?',
    answer: 'Not necessarily! Our personalised prints start from $49, which is comparable to or less than many generic gifts. The perceived value is often higher because of the personal meaning and thought behind them.',
  },
  {
    question: 'What makes a good personalised gift?',
    answer: 'The best personalised gifts connect to a specific memory, date, or place that\'s meaningful to the recipient. Think about significant moments in their life—where they got married, when their child was born, their favourite song, or a place they love.',
  },
];

export default function PersonalisedGiftsAustraliaPage() {
  const guideSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Personalised Gifts Australia: Complete Guide to Unique Custom Gifts',
    description: 'Discover the best personalised gift ideas available in Australia. From star maps to soundwave art.',
    author: { '@type': 'Organization', name: SITE_CONFIG.name },
    publisher: { '@type': 'Organization', name: SITE_CONFIG.name, logo: { '@type': 'ImageObject', url: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}` } },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_CONFIG.url}/guides/personalised-gifts-australia` },
  };

  return (
    <>
      <JsonLd data={guideSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Guides', href: '/guides' },
              { name: 'Personalised Gifts Australia', href: '/guides/personalised-gifts-australia' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm mb-6">
              <Gift className="w-4 h-4" />
              Gift Guide
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
              Personalised Gifts Australia
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed mb-8">
              Discover unique, meaningful gift ideas that go beyond the ordinary.
              Custom prints made in Australia, capturing the moments and places
              that matter most. Free shipping nationwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/star-map"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Browse All Gifts <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-6 py-3 rounded-full font-medium hover:bg-stone-50 transition-colors"
              >
                See Gift Ideas
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-stone-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span className="text-stone-700 font-medium">Australian Made</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-stone-700 font-medium">Free AU Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-current" />
                <span className="text-stone-700 font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <span className="text-stone-700 font-medium">10,000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Categories */}
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Types of Personalised Gifts
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Each gift is custom-made with meaningful details—dates, locations,
              and messages that make it uniquely theirs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {giftCategories.map((category) => (
              <article key={category.slug} className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow">
                <Link href={category.slug} className="block relative aspect-[16/9]">
                  <Image src={category.image} alt={category.name} fill className="object-cover" />
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <category.icon className="w-5 h-5 text-amber-600" />
                    <h3 className="font-serif text-xl text-stone-900">{category.name}</h3>
                  </div>
                  <p className="text-stone-600 mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.occasions.map((occasion) => (
                      <span key={occasion} className="px-2 py-1 bg-stone-100 rounded text-xs text-stone-600">
                        {occasion}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <span>From <strong>${category.priceFrom}</strong></span>
                    <Link href={category.slug} className="text-amber-600 font-medium hover:text-amber-700 flex items-center gap-1">
                      Create Gift <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Shop by Occasion */}
        <section className="bg-amber-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-stone-900 text-center mb-8">
              Shop by Occasion
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {occasions.map((occasion) => (
                <Link
                  key={occasion.name}
                  href={occasion.href}
                  className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-stone-900 mb-1">{occasion.name}</h3>
                  <p className="text-sm text-stone-500">{occasion.count}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Personalised */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">
            Why Choose Personalised Gifts?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyPersonalised.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-stone-50 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSchema faqs={faqs} showUI={true} title="Personalised Gifts FAQ" />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-stone-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Create Something Meaningful Today
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Australian made, free shipping, 100% satisfaction guarantee.
            </p>
            <Link
              href="/star-map"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-full font-medium hover:bg-amber-500 transition-colors"
            >
              Start Creating <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
