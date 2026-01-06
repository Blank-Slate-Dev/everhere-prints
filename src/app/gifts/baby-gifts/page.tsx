// src/app/gifts/baby-gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Moon, Heart, Music, Check, Baby } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG, PAGE_META } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: PAGE_META.babyGifts.title,
  description: PAGE_META.babyGifts.description,
  keywords: PAGE_META.X.keywords,
  path: '/gifts/baby-gifts',
  image: '/images/og/baby-gifts.jpg',
});

const products = [
  {
    name: 'On The Night You Were Born',
    slug: '/star-map',
    description: 'A stunning star map showing the exact night sky when baby arrived. The perfect nursery centrepiece that they\'ll treasure for years.',
    image: '/images/products/star-map-baby.jpg',
    priceFrom: 59,
    occasions: ['Baby shower', 'Birth gift', 'First birthday'],
    icon: Star,
    featured: true,
  },
  {
    name: 'Birth Moon Phase',
    slug: '/moon-phase',
    description: 'The exact moon phase on the day baby was born. A celestial tribute to their arrival that makes beautiful nursery art.',
    image: '/images/products/moon-phase-baby.jpg',
    priceFrom: 49,
    occasions: ['Newborn gift', 'Nursery decor', 'Christening'],
    icon: Moon,
  },
  {
    name: 'First Heartbeat Soundwave',
    slug: '/sound-wave',
    description: 'Transform the ultrasound heartbeat recording into stunning visual art. An incredibly meaningful keepsake for new parents.',
    image: '/images/products/sound-wave-baby.jpg',
    priceFrom: 59,
    occasions: ['Baby shower', 'Birth announcement', 'Parents gift'],
    icon: Heart,
  },
  {
    name: 'Baby\'s First Word Art',
    slug: '/sound-wave',
    description: 'Record and visualise baby\'s first word, giggle, or "mama/dada". A milestone moment preserved forever in art.',
    image: '/images/products/sound-wave-first-word.jpg',
    priceFrom: 59,
    occasions: ['First birthday', 'Milestone gift', 'Grandparent gift'],
    icon: Music,
  },
];

const occasions = [
  {
    name: 'Baby Shower',
    description: 'Stand out from registry gifts with something the parents will cherish forever.',
  },
  {
    name: 'Birth Gift',
    description: 'Celebrate the new arrival with a print capturing their exact moment of birth.',
  },
  {
    name: 'Christening/Naming Day',
    description: 'A meaningful gift to mark this special ceremony.',
  },
  {
    name: 'First Birthday',
    description: 'A keepsake gift that grows with them and tells their story.',
  },
];

const faqs: FAQItem[] = [
  {
    question: "What's a unique baby gift that isn't clothes or toys?",
    answer: "Personalised prints make exceptional baby gifts because they capture a specific moment in time—the stars when baby was born, the moon phase on their birth date, or even their ultrasound heartbeat as visual art. These gifts become treasured keepsakes that parents display in the nursery and keep forever.",
  },
  {
    question: 'Can I create a gift before the baby is born?',
    answer: "Absolutely! You can purchase a gift voucher for a baby shower, allowing the parents to create their print once baby arrives with the exact birth date. Alternatively, you can create a soundwave print of the ultrasound heartbeat as a pre-birth gift.",
  },
  {
    question: 'What information do I need to create a birth star map?',
    answer: "You'll need the baby's birth date, time (optional but adds accuracy), and location (city is sufficient). If you're giving this as a shower gift before birth, consider our gift voucher option so parents can enter the exact details.",
  },
  {
    question: "Are these prints safe for a baby's nursery?",
    answer: "Yes! All our prints use archival inks on acid-free paper, meeting the highest quality and safety standards. Our frames include shatterproof acrylic glazing rather than glass, making them nursery-safe.",
  },
  {
    question: 'What colours work best for nursery prints?',
    answer: "We offer designs in soft neutrals, pastels, and bolder colours to suit any nursery theme. Our most popular nursery choices are soft navy, sage green, blush pink, and classic black and white. You can preview all colour options before ordering.",
  },
];

export default function BabyGiftsPage() {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Baby Gift Ideas',
    description: PAGE_META.babyGifts.description,
    url: `${SITE_CONFIG.url}/gifts/baby-gifts`,
    image: `${SITE_CONFIG.url}/images/og/baby-gifts.jpg`,
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
              { name: 'Baby Gifts', href: '/gifts/baby-gifts' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-2 rounded-full text-sm mb-6">
                <Baby className="w-4 h-4" />
                Welcome to the World
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Baby Gift Ideas
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8">
                Welcome new arrivals with personalised gifts that capture their
                special moment. From the stars above when they were born to their
                first heartbeat—keepsakes the whole family will treasure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#products"
                  className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
                >
                  Shop Baby Gifts
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
                src="/images/gifts/baby-hero.jpg"
                alt="Personalised baby gift - birth star map in nursery"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Occasions */}
        <section className="bg-sky-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-medium text-stone-900 text-center mb-8">
              Perfect For Every Baby Occasion
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {occasions.map((occasion) => (
                <div key={occasion.name} className="bg-white p-6 rounded-xl">
                  <h3 className="font-medium text-stone-900 mb-2">{occasion.name}</h3>
                  <p className="text-sm text-stone-600">{occasion.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Product */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-stone-900 rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-square lg:aspect-auto">
                <Image
                  src="/images/products/star-map-baby-featured.jpg"
                  alt="On The Night You Were Born - personalised star map"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-sky-400 text-sm mb-4">
                  <Star className="w-4 h-4" />
                  Most Popular Baby Gift
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                  "On The Night You Were Born"
                </h2>
                <p className="text-stone-300 mb-6 leading-relaxed">
                  Our most beloved baby gift captures the exact arrangement of stars
                  from the moment a new life entered the world. Parents display these
                  in nurseries and keep them forever as their child grows.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-stone-300">
                    <Check className="w-5 h-5 text-sky-400" />
                    Exact star positions for birth date & time
                  </li>
                  <li className="flex items-center gap-2 text-stone-300">
                    <Check className="w-5 h-5 text-sky-400" />
                    Include baby's name and birth details
                  </li>
                  <li className="flex items-center gap-2 text-stone-300">
                    <Check className="w-5 h-5 text-sky-400" />
                    Nursery-safe framing available
                  </li>
                </ul>
                <Link
                  href="/star-map"
                  className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-full font-medium hover:bg-stone-100 transition-colors self-start"
                >
                  Create Birth Star Map
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              All Baby Gift Options
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Each gift captures a unique moment in baby's story. Choose the perfect
              keepsake for the nursery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <article
                key={product.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <Link href={product.slug} className="block relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.featured && (
                    <span className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <product.icon className="w-5 h-5 text-sky-600" />
                    <span className="text-sm text-stone-500">
                      {product.occasions.join(' • ')}
                    </span>
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
                      className="inline-flex items-center gap-1 text-sky-600 font-medium hover:text-sky-700 transition-colors"
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

        {/* Social Proof */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-stone-900 mb-4">
                Parents Love These Gifts
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <blockquote className="bg-white p-6 rounded-xl">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 mb-4">
                  "This was THE gift at the baby shower. The mum-to-be was in tears.
                  I gave them a voucher so they could enter the exact birth details
                  once baby arrived."
                </p>
                <footer className="text-sm text-stone-500">
                  — Jessica, Melbourne
                </footer>
              </blockquote>
              <blockquote className="bg-white p-6 rounded-xl">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 mb-4">
                  "Our daughter's birth star map has been on her nursery wall since
                  she was born. She's now 3 and asks about 'her stars' constantly.
                  It will stay with her forever."
                </p>
                <footer className="text-sm text-stone-500">
                  — Daniel & Kate, Sydney
                </footer>
              </blockquote>
              <blockquote className="bg-white p-6 rounded-xl">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 mb-4">
                  "I gave my daughter a soundwave of her baby's ultrasound heartbeat.
                  She hung it next to the crib and it's the most meaningful piece
                  in the whole nursery."
                </p>
                <footer className="text-sm text-stone-500">
                  — Margaret, Brisbane
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FAQSchema
            faqs={faqs}
            showUI={true}
            title="Baby Gift Questions"
          />
        </section>

        {/* CTA Section */}
        <section className="bg-sky-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Welcome a New Life with Something Special
            </h2>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Create a personalised baby gift in minutes. Free shipping across Australia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/star-map"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Create Birth Star Map
                <Star className="w-5 h-5" />
              </Link>
              <Link
                href="/gift-voucher"
                className="inline-flex items-center gap-2 border-2 border-stone-900 text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-900 hover:text-white transition-colors"
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
