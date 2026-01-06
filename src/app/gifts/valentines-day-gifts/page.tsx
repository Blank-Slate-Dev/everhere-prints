// src/app/gifts/valentines-day-gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Star, MapPin, Moon, Music, Gift, Check, Clock, AlertCircle } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Valentine\'s Day Gifts Australia 2026 | Unique Personalised Gifts',
  description:
    'Skip the clichés this Valentine\'s Day. Our personalised star maps and prints make unique, romantic gifts they\'ll treasure forever. Free Australian shipping.',
  keywords: [
    'valentines day gifts',
    'valentines day gifts australia',
    'valentines gift for her',
    'valentines gift for him',
    'romantic gift',
    'personalised valentines gift',
    'unique valentines gift',
    'valentines day 2026',
    'star map valentines',
    'custom valentines gift',
  ],
  path: '/gifts/valentines-day-gifts',
  image: '/images/og/valentines-gifts.jpg',
});

const products = [
  {
    name: 'Star Map',
    slug: '/star-map',
    icon: Star,
    price: 'From $59',
    image: '/images/products/star-map-valentines.jpg',
    tagline: 'The night sky from when you met',
    description: 'Create a star map showing the exact night sky from your first date, first kiss, or the moment you knew.',
    romanticIdea: 'Use the date of your first date with a message like "The night everything changed"',
  },
  {
    name: 'Where We Met',
    slug: '/where-we-met',
    icon: MapPin,
    price: 'From $59',
    image: '/images/products/where-we-met-valentines.jpg',
    tagline: 'The place your story began',
    description: 'A beautiful map marking the exact location where you first met, had your first date, or fell in love.',
    romanticIdea: 'Map the coffee shop, bar, or park where you first locked eyes',
  },
  {
    name: 'Moon Phase',
    slug: '/moon-phase',
    icon: Moon,
    price: 'From $59',
    image: '/images/products/moon-phase-valentines.jpg',
    tagline: 'The moon from your special night',
    description: 'Capture the exact phase of the moon from any meaningful date in your relationship.',
    romanticIdea: 'Subtle and elegant—perfect if they prefer minimalist décor',
  },
  {
    name: 'Sound Wave Art',
    slug: '/sound-wave',
    icon: Music,
    price: 'From $69',
    image: '/images/products/sound-wave-valentines.jpg',
    tagline: 'Your song, visualised',
    description: 'Turn your song—the one that makes you think of them—into stunning visual art.',
    romanticIdea: 'Use your first dance song or the song that was playing when you met',
  },
];

const deadlines = [
  { date: 'Feb 7', shipping: 'Standard (Free)', guarantee: 'Arrives by Feb 13-14' },
  { date: 'Feb 10', shipping: 'Express ($12.95)', guarantee: 'Arrives by Feb 13-14' },
  { date: 'Feb 12', shipping: 'Express ($12.95)', guarantee: 'Cutting it close! Contact us first' },
];

const faqs: FAQItem[] = [
  {
    question: 'Will it arrive in time for Valentine\'s Day?',
    answer: 'If you order by February 7th with free standard shipping, or by February 10th with express shipping, we guarantee delivery by February 14th for Australian metro areas. For regional areas or last-minute orders, contact us and we\'ll do everything we can.',
  },
  {
    question: 'What if I\'m not sure about the exact date we met?',
    answer: 'That\'s okay! Choose a date that feels right—your first official date, the day you became exclusive, or even just "February 2020" if that\'s all you remember. The sentiment matters more than astronomical precision.',
  },
  {
    question: 'Is this a good Valentine\'s gift for a new relationship?',
    answer: 'Absolutely! A star map of your first date is perfect for newer couples—it\'s romantic without being over-the-top. For very new relationships (under 3 months), maybe stick to unframed to keep it lighter.',
  },
  {
    question: 'What about for a long-term relationship?',
    answer: 'Even better! After years together, finding a gift that feels fresh is hard. A star map of the night you met—especially if it was years ago—shows you still remember and cherish those early moments.',
  },
  {
    question: 'Can I get it gift-wrapped?',
    answer: 'Yes! Select gift wrapping at checkout and we\'ll package it beautifully. You can also add a printed gift message to include with the print.',
  },
  {
    question: 'What if they don\'t like it?',
    answer: 'We\'ve shipped thousands of these as Valentine\'s gifts and the response is overwhelmingly positive. But if there\'s a printing error or quality issue, we\'ll make it right. Note: because prints are custom-made, we can\'t accept returns for change of mind.',
  },
];

export default function ValentinesDayGiftsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Valentine\'s Day Gifts',
    description: 'Unique personalised Valentine\'s Day gift ideas including custom star maps, location prints, and soundwave art.',
    url: `${SITE_CONFIG.url}/gifts/valentines-day-gifts`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_CONFIG.url}${product.slug}`,
        name: product.name,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Gifts', href: '/gifts' },
              { name: 'Valentine\'s Day Gifts', href: '/gifts/valentines-day-gifts' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm mb-6">
                <Heart className="w-4 h-4 fill-current" />
                Valentine's Day 2026
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Valentine's Gifts That Actually Mean Something
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-6">
                Flowers die. Chocolate gets eaten. But a star map of the night 
                you met? That's forever. Give them something as unique as your 
                love story.
              </p>
              <p className="text-stone-600 mb-8">
                Not another generic gift. A personalised print capturing your 
                specific moment—the first date, first kiss, or the night 
                everything changed.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Free AU shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Gift wrapping available
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Order by Feb 7 for V-Day
                </div>
              </div>

              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-rose-600 text-white px-8 py-4 rounded-full font-medium hover:bg-rose-700 transition-colors"
              >
                Find Your Gift
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/valentines/hero.jpg"
                  alt="Couple with personalised star map Valentine's gift"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-rose-600 text-white rounded-xl p-4 shadow-lg">
                <p className="text-2xl font-serif">❤️</p>
                <p className="text-sm">Most romantic gift of 2025</p>
              </div>
            </div>
          </div>
        </section>

        {/* Order Deadline Banner */}
        <section className="bg-amber-50 border-y border-amber-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <p className="text-amber-900 font-medium">
                Order by February 7th for guaranteed Valentine's Day delivery with free shipping
              </p>
            </div>
          </div>
        </section>

        {/* The Problem with Valentine's Gifts */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Let's Be Honest About Valentine's Gifts
            </h2>
            <p className="text-lg text-stone-600">
              Most Valentine's gifts are... fine. Expected. Forgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-stone-100 rounded-2xl p-8">
              <h3 className="font-medium text-stone-900 mb-4 text-lg">The Usual Suspects:</h3>
              <ul className="space-y-3 text-stone-600">
                <li className="flex items-start gap-3">
                  <span className="text-stone-400">🌹</span>
                  <span><strong>Flowers</strong> — Beautiful for a week, then bin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stone-400">🍫</span>
                  <span><strong>Chocolate</strong> — Gone by Feb 16</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stone-400">🧸</span>
                  <span><strong>Teddy bear</strong> — Are we 12?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stone-400">💳</span>
                  <span><strong>Gift card</strong> — "I gave up trying"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stone-400">💍</span>
                  <span><strong>Generic jewellery</strong> — Not their style anyway</span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-50 rounded-2xl p-8 border-2 border-rose-200">
              <h3 className="font-medium text-rose-900 mb-4 text-lg">What Actually Works:</h3>
              <ul className="space-y-3 text-stone-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Personal</strong> — Specific to YOUR relationship</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Lasting</strong> — Still there next Valentine's Day</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Thoughtful</strong> — Shows you actually tried</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Display-worthy</strong> — They'll actually use/show it</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Unique</strong> — Can't buy this at Westfield</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="bg-stone-100 py-16 md:py-24 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                Choose Your Valentine's Gift
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Each captures a different aspect of your love story. 
                Pick the one that feels most "you".
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product) => (
                <article key={product.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={product.image}
                      alt={`${product.name} - Valentine's Day gift`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-stone-900">
                      {product.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <product.icon className="w-5 h-5 text-rose-600" />
                      <h3 className="font-serif text-xl text-stone-900">{product.name}</h3>
                    </div>
                    <p className="text-rose-600 font-medium text-sm mb-2">{product.tagline}</p>
                    <p className="text-stone-600 mb-4">{product.description}</p>
                    
                    <div className="bg-rose-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-rose-800">
                        <span className="font-medium">💡 Romantic idea:</span> {product.romanticIdea}
                      </p>
                    </div>
                    
                    <Link
                      href={product.slug}
                      className="inline-flex items-center justify-center gap-2 w-full bg-stone-900 text-white py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
                    >
                      Create This Gift
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Deadlines */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <h2 className="font-serif text-2xl text-stone-900">Valentine's Day Shipping Deadlines</h2>
            </div>
            
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-stone-700">Order By</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-stone-700">Shipping</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-stone-700">Arrival</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {deadlines.map((deadline, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 font-medium text-stone-900">{deadline.date}</td>
                      <td className="px-4 py-3 text-stone-600">{deadline.shipping}</td>
                      <td className="px-4 py-3 text-stone-600">{deadline.guarantee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-stone-500 mt-4">
              * Delivery estimates for Australian metro areas. Regional areas may require earlier ordering.
              Production takes 2-3 business days before shipping.
            </p>
          </div>
        </section>

        {/* Gift Guide Content */}
        <section className="bg-rose-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose-invert">
              <h2 className="font-serif text-3xl text-white mb-6">
                Valentine's Day Gift Ideas That Stand Out
              </h2>
              
              <p className="text-rose-100">
                Here's the thing about Valentine's Day: the pressure to find something 
                "perfect" makes everyone default to safe, boring choices. Flowers are 
                safe. Chocolate is safe. Dinner reservations are safe.
              </p>

              <p className="text-rose-100">
                But safe is also forgettable. Can you remember what you got for 
                Valentine's Day three years ago? Probably not—because it was 
                probably safe.
              </p>

              <h3 className="font-serif text-2xl text-white mt-8 mb-4">
                For Her
              </h3>

              <p className="text-rose-100">
                A star map showing the night sky from your first date hits different. 
                It says "I remember exactly when my life changed." It's romantic without 
                being cheesy, personal without being over-the-top.
              </p>

              <p className="text-rose-100">
                Add a message like "The night I found you" or the coordinates of where 
                you met, and you've got something she'll tear up over. Then it goes on 
                the wall, and every time she sees it, she remembers that night.
              </p>

              <h3 className="font-serif text-2xl text-white mt-8 mb-4">
                For Him
              </h3>

              <p className="text-rose-100">
                Guys are notoriously hard to buy for. A location map of where you met 
                (especially if it's a bar, stadium, or somewhere unexpected) appeals to 
                their practical side while still being romantic. It's art, but it's 
                meaningful art.
              </p>

              <p className="text-rose-100">
                Sound wave art of "your song" is another winner—especially if he's into 
                music. It's the kind of thing he'd never buy himself but will genuinely 
                appreciate.
              </p>

              <h3 className="font-serif text-2xl text-white mt-8 mb-4">
                For New Couples
              </h3>

              <p className="text-rose-100">
                Early relationship Valentine's Days are tricky. You don't want to go 
                overboard, but you don't want to under-deliver either. A star map or 
                location print in a smaller size (A4 unframed) is perfect—romantic 
                enough to show you care, not so intense it freaks them out.
              </p>

              <h3 className="font-serif text-2xl text-white mt-8 mb-4">
                For Long-Term Partners
              </h3>

              <p className="text-rose-100">
                After years together, you've done flowers. You've done dinner. A 
                personalised print of the night you met—especially if it was a decade 
                ago—shows you still cherish those early moments. It's nostalgia in the 
                best way.
              </p>
            </article>
          </div>
        </section>

        {/* Reviews */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-stone-900 mb-4">
              Valentine's Day Success Stories
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
              ))}
            </div>
            <p className="text-stone-500">From customers who nailed Valentine's Day</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "She literally cried when she opened it. Best Valentine's reaction I've ever gotten. It's now hanging above our bed.",
                author: "Marcus P.",
                gift: "Star Map of first date",
              },
              {
                quote: "We've been together 8 years and it's getting harder to surprise him. When he realised it was a map of the pub where we met, he got so nostalgic. Perfect gift.",
                author: "Emma S.",
                gift: "Where We Met Map",
              },
              {
                quote: "New relationship, didn't want to overdo it. The star map was perfect—romantic but not over the top. She loved it. We're still together 2 years later!",
                author: "Jake T.",
                gift: "Star Map, A4 unframed",
              },
            ].map((review, index) => (
              <blockquote key={index} className="bg-stone-100 rounded-2xl p-6 md:p-8">
                <p className="text-stone-700 mb-4">"{review.quote}"</p>
                <footer>
                  <p className="font-medium text-stone-900">{review.author}</p>
                  <p className="text-sm text-rose-600">{review.gift}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSchema faqs={faqs} showUI={true} title="Valentine's Day Gift Questions" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center">
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-6 fill-current" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Make This Valentine's Day Count
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Create a personalised gift in minutes. Free shipping Australia-wide,
              gift wrapping available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/star-map"
                className="inline-flex items-center gap-2 bg-white text-rose-600 px-8 py-4 rounded-full font-medium hover:bg-rose-50 transition-colors"
              >
                Create Star Map
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/where-we-met"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Create Location Map
              </Link>
            </div>
            <p className="text-rose-200 text-sm mt-6">
              Order by Feb 7 with free shipping for Valentine's Day delivery
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
