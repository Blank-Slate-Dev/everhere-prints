// src/app/gifts/mothers-day-gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Star, MapPin, Moon, Music, Check } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG, PAGE_META } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: PAGE_META.mothersDayGifts.title,
  description: PAGE_META.mothersDayGifts.description,
  keywords: PAGE_META.X.keywords,
  path: '/gifts/mothers-day-gifts',
  image: '/images/og/mothers-day-gifts.jpg',
});

const products = [
  {
    name: 'The Night I Was Born Star Map',
    slug: '/star-map',
    description: 'Show Mum the exact night sky from when you came into her life. A celestial tribute to the day she became a mother.',
    image: '/images/products/star-map-mothers-day.jpg',
    priceFrom: 59,
    tagline: 'For the day her world changed',
    icon: Star,
  },
  {
    name: 'Our Special Place Map',
    slug: '/where-we-met',
    description: 'A map of the family home, her hometown, or a place you\'ve shared special memories together.',
    image: '/images/products/where-we-met-mothers-day.jpg',
    priceFrom: 59,
    tagline: 'Capture somewhere meaningful',
    icon: MapPin,
  },
  {
    name: 'Birth Moon Phase',
    slug: '/moon-phase',
    description: 'The moon phase from the day you were born, your wedding day, or another date that connects you.',
    image: '/images/products/moon-phase-mothers-day.jpg',
    priceFrom: 49,
    tagline: 'A celestial connection',
    icon: Moon,
  },
  {
    name: 'Voice Message Art',
    slug: '/sound-wave',
    description: 'Transform a voice message from you or the grandkids into beautiful art. "I love you, Mum" visualised forever.',
    image: '/images/products/sound-wave-mothers-day.jpg',
    priceFrom: 59,
    tagline: 'Your voice, immortalised',
    icon: Music,
  },
];

const giftIdeas = [
  {
    title: 'From Adult Children',
    description: 'The night sky when you were born—a gift that celebrates the day she became "Mum".',
  },
  {
    title: 'From Grandchildren',
    description: 'A soundwave of "I love you Grandma" that she can display proudly.',
  },
  {
    title: 'For New Mums',
    description: 'The moon phase from baby\'s birth date—her first Mother\'s Day keepsake.',
  },
  {
    title: 'For Your Partner',
    description: 'Celebrate her as a mother with the stars from your child\'s birthday.',
  },
];

const faqs: FAQItem[] = [
  {
    question: "When is Mother's Day in Australia?",
    answer: "Mother's Day in Australia falls on the second Sunday of May each year, the same as in the United States. We recommend ordering at least 2 weeks before to ensure delivery in time.",
  },
  {
    question: "What's the best Mother's Day gift for someone who has everything?",
    answer: "Personalised prints are perfect because they capture something unique to your relationship. A star map from when you were born, a map of her hometown, or soundwave art of a voice message—these gifts have emotional value that material items can't match.",
  },
  {
    question: 'Can I include a message with my gift?',
    answer: "Yes! Every print can include custom text with your personal message. You can also add a separate gift card with a longer message when you choose gift wrapping at checkout.",
  },
  {
    question: "What if my mum lives interstate?",
    answer: "We ship Australia-wide with free standard shipping. You can enter her address at checkout and we'll send it directly to her, complete with gift wrapping and your personal message if desired.",
  },
];

export default function MothersDayGiftsPage() {
  const collectionSchema = generateCollectionPageSchema({
    name: "Mother's Day Gift Ideas Australia",
    description: PAGE_META.mothersDayGifts.description,
    url: `${SITE_CONFIG.url}/gifts/mothers-day-gifts`,
    image: `${SITE_CONFIG.url}/images/og/mothers-day-gifts.jpg`,
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
              { name: "Mother's Day Gifts", href: '/gifts/mothers-day-gifts' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm mb-6">
                <Heart className="w-4 h-4" />
                For the Best Mum Ever
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Mother's Day Gift Ideas
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8">
                Give Mum something that shows just how much she means to you.
                Personalised prints capturing your special bond—gifts she'll
                treasure forever.
              </p>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Shop Mother's Day Gifts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/images/gifts/mothers-day-hero.jpg"
                alt="Personalised Mother's Day gift - custom star map for Mum"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Gift Ideas by Situation */}
        <section className="bg-purple-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-stone-900 text-center mb-8">
              Perfect For Every Mum
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {giftIdeas.map((idea) => (
                <div key={idea.title} className="bg-white p-6 rounded-xl">
                  <h3 className="font-medium text-stone-900 mb-2">{idea.title}</h3>
                  <p className="text-sm text-stone-600">{idea.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Personalised Gifts for Mum
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Each gift is custom-made to celebrate your unique relationship.
              Show her the thought and love behind your present.
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
                    <product.icon className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-stone-500">{product.tagline}</span>
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
                      className="inline-flex items-center gap-1 text-purple-600 font-medium hover:text-purple-700 transition-colors"
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

        {/* Emotional Appeal */}
        <section className="bg-stone-900 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              "She Kept a Photo of the Day I Was Born.<br />
              Now I've Given Her the Stars."
            </h2>
            <p className="text-lg text-stone-300 mb-8">
              A star map showing the night sky when you were born is more than a gift.
              It's a way to say: "Thank you for giving me life, and for everything since."
            </p>
            <Link
              href="/star-map"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-colors"
            >
              Create Her Star Map
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FAQSchema
            faqs={faqs}
            showUI={true}
            title="Mother's Day Gift Questions"
          />
        </section>

        {/* CTA Section */}
        <section className="bg-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Make Her Feel Special This Mother's Day
            </h2>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Create a personalised gift in minutes. Free shipping across Australia.
            </p>
            <Link
              href="/star-map"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors"
            >
              Start Creating
              <Heart className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
