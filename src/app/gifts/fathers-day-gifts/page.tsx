// src/app/gifts/fathers-day-gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, MapPin, Moon, Music, Check, Info } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG, PAGE_META } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: PAGE_META.fathersDayGifts.title,
  description: PAGE_META.fathersDayGifts.description,
  keywords: PAGE_META.X.keywords,
  path: '/gifts/fathers-day-gifts',
  image: '/images/og/fathers-day-gifts.jpg',
});

const products = [
  {
    name: 'The Day I Was Born Star Map',
    slug: '/star-map',
    description: 'The night sky from when you arrived in his life. Show Dad the stars that were shining when he became a father.',
    image: '/images/products/star-map-fathers-day.jpg',
    priceFrom: 59,
    appeal: 'For sentimental Dads',
    icon: Star,
  },
  {
    name: 'His Favourite Place Map',
    slug: '/where-we-met',
    description: 'The footy ground, fishing spot, family home, or anywhere that holds special meaning. A place he can point to with pride.',
    image: '/images/products/where-we-met-fathers-day.jpg',
    priceFrom: 59,
    appeal: 'For location-loving Dads',
    icon: MapPin,
  },
  {
    name: 'Birth Moon Phase',
    slug: '/moon-phase',
    description: 'The moon from the day you were born or another significant date. Clean, minimal design that suits any style.',
    image: '/images/products/moon-phase-fathers-day.jpg',
    priceFrom: 49,
    appeal: 'For minimalist Dads',
    icon: Moon,
  },
  {
    name: 'His Song Soundwave',
    slug: '/sound-wave',
    description: 'Transform his favourite song, the song at his wedding, or your kids saying "I love you Dad" into wall art.',
    image: '/images/products/sound-wave-fathers-day.jpg',
    priceFrom: 59,
    appeal: 'For music-loving Dads',
    icon: Music,
  },
];

const faqs: FAQItem[] = [
  {
    question: "When is Father's Day in Australia?",
    answer: "Father's Day in Australia is celebrated on the first Sunday of September—different from the US and UK which celebrate in June. We recommend ordering at least 2 weeks before to ensure delivery in time.",
  },
  {
    question: "What's a good Father's Day gift for a dad who has everything?",
    answer: "Personalised prints work perfectly because they're not something he can buy himself. A star map from a meaningful date, a map of his favourite place, or soundwave art of a special song creates a unique gift with emotional significance.",
  },
  {
    question: 'Is this too sentimental for my Dad?',
    answer: "Our designs are clean and sophisticated, not overly sentimental. Many customers tell us their 'tough' dads were surprisingly moved by receiving a print that marked a special moment in their lives. The quality and design appeal to all tastes.",
  },
  {
    question: 'What date should I use for a star map for Dad?',
    answer: "Popular choices include: the day you were born (when he became a Dad), his wedding day, or a significant shared memory like a holiday or achievement. You know your relationship best—choose a date that will resonate with him.",
  },
  {
    question: 'Can I send the gift directly to my Dad?',
    answer: "Absolutely! Enter his address at checkout and we'll ship directly to him. Add gift wrapping and a personal message to make it extra special. Perfect if you live interstate or overseas.",
  },
];

export default function FathersDayGiftsPage() {
  const collectionSchema = generateCollectionPageSchema({
    name: "Father's Day Gift Ideas Australia",
    description: PAGE_META.fathersDayGifts.description,
    url: `${SITE_CONFIG.url}/gifts/fathers-day-gifts`,
    image: `${SITE_CONFIG.url}/images/og/fathers-day-gifts.jpg`,
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
              { name: "Father's Day Gifts", href: '/gifts/fathers-day-gifts' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
                <Info className="w-4 h-4" />
                Australian Father's Day: First Sunday of September
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Father's Day Gift Ideas
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8">
                Give Dad something meaningful this Father's Day. Personalised prints
                that capture special moments, favourite places, and the dates that
                matter most.
              </p>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Shop Father's Day Gifts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/images/gifts/fathers-day-hero.jpg"
                alt="Personalised Father's Day gift - custom map print for Dad"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Australian Context Banner */}
        <section className="bg-blue-600 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white font-medium">
              🇦🇺 Australian Father's Day is in September, not June! Order now for the first Sunday of September.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Gifts Dad Will Actually Love
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Skip the socks this year. These personalised prints create lasting
              memories and look great in his office, shed, or man cave.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <article
                key={product.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
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
                  <div className="flex items-center gap-2 mb-2">
                    <product.icon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-stone-500">{product.appeal}</span>
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 mb-2">
                    <Link href={product.slug} className="hover:text-stone-600 transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-stone-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <span className="text-stone-900">
                      From <strong>${product.priceFrom}</strong>
                    </span>
                    <Link
                      href={product.slug}
                      className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Create Gift
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Why It Works for Dads */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">
              Why Dads Love These Gifts
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Not Generic</h3>
                <p className="text-stone-600">
                  Unlike ties or tools, these gifts are made specifically for him
                  and his story.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Display-Worthy</h3>
                <p className="text-stone-600">
                  Clean, sophisticated designs that look great in any space—office,
                  garage, or living room.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Conversation Starter</h3>
                <p className="text-stone-600">
                  Every visitor will ask about the print, giving Dad a chance to
                  share his story.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FAQSchema
            faqs={faqs}
            showUI={true}
            title="Father's Day Gift Questions"
          />
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Make This Father's Day Count
            </h2>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Create a personalised gift in minutes. Free shipping across Australia.
            </p>
            <Link
              href="/star-map"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors"
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
