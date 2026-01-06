// src/app/gifts/memorial-gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Star, Moon, Music, Feather } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Memorial Gifts & Remembrance Prints | EverHere Prints',
  description:
    'Honour loved ones with a meaningful memorial print. Star maps, moon phases, and custom artwork to celebrate their life and keep their memory close.',
  keywords: [
    'memorial gifts',
    'remembrance gifts',
    'sympathy gifts',
    'in memory of gifts',
    'bereavement gifts',
    'memorial star map',
    'remembrance print',
    'loss of loved one gift',
    'memorial artwork',
    'tribute print',
  ],
  path: '/gifts/memorial-gifts',
  image: '/images/og/memorial-gifts.jpg',
});

const products = [
  {
    name: 'Memorial Star Map',
    slug: '/star-map',
    description: 'Capture the night sky from a meaningful date—their birthday, wedding day, or the night they passed. A beautiful celestial tribute.',
    image: '/images/products/star-map-memorial.jpg',
    priceFrom: 59,
    icon: Star,
    suggestion: 'Their birthday or a special shared memory',
  },
  {
    name: 'Special Place Map',
    slug: '/where-we-met',
    description: 'A map of a place that held meaning—their hometown, family home, favourite holiday spot, or where you shared special moments.',
    image: '/images/products/where-we-met-memorial.jpg',
    priceFrom: 59,
    icon: Feather,
    suggestion: 'Their childhood home or favourite place',
  },
  {
    name: 'Memorial Moon Phase',
    slug: '/moon-phase',
    description: 'The exact moon from a significant date. Many find comfort in knowing the same moon shines on, connecting past and present.',
    image: '/images/products/moon-phase-memorial.jpg',
    priceFrom: 49,
    icon: Moon,
    suggestion: 'Their birthday or anniversary',
  },
  {
    name: 'Voice Keepsake',
    slug: '/sound-wave',
    description: 'Transform a saved voicemail, voice message, or recording into beautiful visual art. Hear their voice, see their love.',
    image: '/images/products/sound-wave-memorial.jpg',
    priceFrom: 59,
    icon: Music,
    suggestion: 'A voicemail or video message',
  },
];

const meaningfulDates = [
  'Their birthday',
  'Your wedding anniversary',
  'The day you met',
  'A special holiday you shared',
  'Their graduation day',
  'The birth of a child or grandchild',
];

const faqs: FAQItem[] = [
  {
    question: 'What date should I choose for a memorial star map?',
    answer: 'There\'s no right or wrong answer—choose a date that feels meaningful to you. Many people choose the person\'s birthday, wedding anniversary, or a date when you shared a special moment together. Some choose the date of passing as a way to honour that transition.',
  },
  {
    question: 'Can I add a custom message or quote?',
    answer: 'Absolutely. Each print can include custom text—a name, dates, a favourite quote, song lyric, or personal message. Many people include phrases like "Forever in our hearts" or a line from a poem that held meaning.',
  },
  {
    question: 'Is this appropriate as a sympathy gift?',
    answer: 'Yes, our memorial prints are often given as sympathy gifts. They offer a thoughtful alternative to flowers—something lasting that honours the person who has passed. Many recipients tell us these prints become treasured keepsakes.',
  },
  {
    question: 'How do I create a soundwave from a voicemail?',
    answer: 'You can upload any audio file—a saved voicemail, a video\'s audio track, or a voice recording. We\'ll transform the sound waves into beautiful visual art. The process preserves the unique pattern of their voice.',
  },
  {
    question: 'Can I order multiple prints for family members?',
    answer: 'Yes, many families order the same design for multiple family members so everyone has a matching tribute. We can ship to different addresses, and bulk orders receive a discount.',
  },
];

export default function MemorialGiftsPage() {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Memorial & Remembrance Gifts',
    description: 'Meaningful memorial prints to honour loved ones and keep their memory close.',
    url: `${SITE_CONFIG.url}/gifts/memorial-gifts`,
    image: `${SITE_CONFIG.url}/images/og/memorial-gifts.jpg`,
  });

  return (
    <>
      <JsonLd data={collectionSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Gifts', href: '/gifts' },
              { name: 'Memorial Gifts', href: '/gifts/memorial-gifts' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-stone-400 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Memorial & Remembrance Gifts
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Honour the ones we've lost with meaningful artwork that celebrates
              their life. Each print captures a moment, a place, or a piece of
              them to keep close forever.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <article
                key={product.slug}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow"
              >
                <Link href={product.slug} className="block relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <product.icon className="w-5 h-5 text-stone-500" />
                    <h2 className="font-serif text-xl text-stone-900">{product.name}</h2>
                  </div>
                  <p className="text-stone-600 mb-4">{product.description}</p>
                  <p className="text-sm text-stone-500 mb-4">
                    <span className="font-medium">Suggestion:</span> {product.suggestion}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <span className="text-stone-900">From <strong>${product.priceFrom}</strong></span>
                    <Link
                      href={product.slug}
                      className="inline-flex items-center gap-1 text-stone-700 font-medium hover:text-stone-900 transition-colors"
                    >
                      Create Tribute <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Meaningful Dates */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl text-stone-900 mb-6">
              Dates That Hold Meaning
            </h2>
            <p className="text-stone-600 mb-8">
              Not sure which date to choose? Here are some ideas:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {meaningfulDates.map((date) => (
                <span
                  key={date}
                  className="px-4 py-2 bg-white rounded-full text-sm text-stone-700"
                >
                  {date}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Gentle Note */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-stone-50 rounded-2xl p-8 text-center">
            <p className="text-stone-600 italic">
              "Grief is the price we pay for love. These prints don't take away
              the pain, but they offer a beautiful way to honour someone who
              meant everything—and to keep their memory close."
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FAQSchema faqs={faqs} showUI={true} title="Memorial Gift Questions" />
        </section>

        {/* CTA */}
        <section className="bg-stone-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl text-white mb-4">
              Create a Lasting Tribute
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Honour their memory with a print that celebrates their life.
            </p>
            <Link
              href="/star-map"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-colors"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
