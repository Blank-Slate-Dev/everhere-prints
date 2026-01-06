// src/app/gifts/christmas-gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gift, Star, MapPin, Moon, Music, Check, Clock } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG, PAGE_META } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: PAGE_META.christmasGifts.title,
  description: PAGE_META.christmasGifts.description,
  keywords: PAGE_META.christmasGifts.keywords,
  path: '/gifts/christmas-gifts',
  image: '/images/og/christmas-gifts.jpg',
});

const products = [
  {
    name: 'Family Star Map',
    slug: '/star-map',
    description: 'The night sky from a meaningful family date—a child\'s birth, wedding day, or the night you all came together.',
    image: '/images/products/star-map-christmas.jpg',
    priceFrom: 59,
    bestFor: 'Parents, grandparents, newlyweds',
    icon: Star,
  },
  {
    name: 'Home Location Map',
    slug: '/where-we-met',
    description: 'A beautiful map of the family home, hometown, or a place that holds special meaning for your loved ones.',
    image: '/images/products/where-we-met-christmas.jpg',
    priceFrom: 59,
    bestFor: 'Anyone who loves their hometown',
    icon: MapPin,
  },
  {
    name: 'Birth Moon Phase',
    slug: '/moon-phase',
    description: 'The exact moon phase from someone\'s birthday. A celestial way to celebrate the day they entered the world.',
    image: '/images/products/moon-phase-christmas.jpg',
    priceFrom: 49,
    bestFor: 'New parents, milestone birthdays',
    icon: Moon,
  },
  {
    name: 'Favourite Song Art',
    slug: '/sound-wave',
    description: 'Transform their favourite song into stunning wall art. Perfect for music lovers of any age.',
    image: '/images/products/sound-wave-christmas.jpg',
    priceFrom: 59,
    bestFor: 'Music lovers, teenagers, couples',
    icon: Music,
  },
];

const giftByRecipient = [
  { recipient: 'For Mum', suggestion: 'Star map from when you were born' },
  { recipient: 'For Dad', suggestion: 'Map of his favourite place' },
  { recipient: 'For Partner', suggestion: 'Where you met or first date' },
  { recipient: 'For Grandparents', suggestion: 'Map of the family home' },
  { recipient: 'For New Parents', suggestion: 'Baby\'s birth moon phase' },
  { recipient: 'For Music Lover', suggestion: 'Their favourite song soundwave' },
];

const faqs: FAQItem[] = [
  {
    question: 'What is the Christmas shipping deadline for Australia?',
    answer: 'For guaranteed Christmas delivery within Australia, we recommend ordering by December 5th for standard shipping, or December 15th for express shipping. Orders placed after these dates may not arrive in time, but digital downloads are available instantly.',
  },
  {
    question: 'What\'s a thoughtful Christmas gift for someone who has everything?',
    answer: 'Personalised prints are perfect for people who "have everything" because they capture something unique to their life—a meaningful date, special place, or favourite song. These gifts show thoughtfulness that generic presents simply can\'t match.',
  },
  {
    question: 'Can I order multiple prints with a discount?',
    answer: 'Yes! We offer bundle discounts when you order multiple prints. This is perfect for Christmas when you\'re buying for several family members. Add multiple items to your cart to see the discount applied automatically.',
  },
  {
    question: 'Do you offer gift cards if I\'m not sure what to get?',
    answer: 'Absolutely! Our gift vouchers let your recipient design their own perfect print. They can choose the product, date, location, and style that means most to them. Gift vouchers are delivered instantly via email.',
  },
  {
    question: 'Is gift wrapping available for Christmas?',
    answer: 'Yes! We offer elegant gift wrapping with festive touches during the holiday season. Your print will arrive beautifully presented and ready to place under the tree.',
  },
];

export default function ChristmasGiftsPage() {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Christmas Gift Ideas',
    description: PAGE_META.christmasGifts.description,
    url: `${SITE_CONFIG.url}/gifts/christmas-gifts`,
    image: `${SITE_CONFIG.url}/images/og/christmas-gifts.jpg`,
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
              { name: 'Christmas Gifts', href: '/gifts/christmas-gifts' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm mb-6">
                <Gift className="w-4 h-4" />
                Meaningful Christmas Presents
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Christmas Gift Ideas
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8">
                Give gifts that truly matter this Christmas. Personalised prints
                capturing special moments, places, and memories for everyone on
                your list.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#products"
                  className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
                >
                  Shop Christmas Gifts
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/gift-voucher"
                  className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-6 py-3 rounded-full font-medium hover:bg-stone-50 transition-colors"
                >
                  Buy Gift Voucher
                </Link>
              </div>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/images/gifts/christmas-hero.jpg"
                alt="Personalised Christmas gifts - custom prints under the tree"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Shipping Deadline Banner */}
        <section className="bg-emerald-600 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 text-white">
              <Clock className="w-5 h-5" />
              <p className="font-medium">
                🎄 Order by December 5th for guaranteed Christmas delivery
              </p>
            </div>
          </div>
        </section>

        {/* Gift by Recipient */}
        <section className="bg-stone-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-stone-900 text-center mb-8">
              Quick Gift Ideas by Recipient
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {giftByRecipient.map((item) => (
                <div
                  key={item.recipient}
                  className="bg-white p-4 rounded-lg text-center"
                >
                  <div className="font-medium text-stone-900 mb-1">
                    {item.recipient}
                  </div>
                  <div className="text-sm text-stone-500">{item.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Personalised Christmas Gifts
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Create custom prints that capture what matters most to your loved
              ones. Each gift is made-to-order with their special details.
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
                    <product.icon className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-stone-500">Best for: {product.bestFor}</span>
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
                      className="inline-flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
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

        {/* Why Personalised */}
        <section className="bg-emerald-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">
              Why Personalised Gifts Win Christmas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Always the Right Size</h3>
                <p className="text-stone-600">
                  No worries about fit or colour preferences. Art looks perfect
                  in any home.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Never Duplicated</h3>
                <p className="text-stone-600">
                  Impossible to receive the same gift from someone else. Truly
                  unique presents.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-medium text-stone-900 mb-2">Emotional Impact</h3>
                <p className="text-stone-600">
                  Shows you put thought into their gift. Guaranteed to create a
                  special moment.
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
            title="Christmas Gift Questions"
          />
        </section>

        {/* CTA Section */}
        <section className="bg-stone-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Make Christmas Morning Special
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Create personalised gifts in minutes. Free shipping across Australia
              and gift wrapping available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/star-map"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-500 transition-colors"
              >
                Start Creating
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/gift-voucher"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-stone-900 transition-colors"
              >
                Buy Gift Voucher
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
