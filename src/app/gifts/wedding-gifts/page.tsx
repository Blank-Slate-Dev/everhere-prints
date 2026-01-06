// src/app/gifts/wedding-gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Star, MapPin, Moon, Music, Gift, Check, Users, Calendar } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Wedding Gifts Australia | Unique Personalised Gifts for the Couple',
  description:
    'Stuck on what to buy the couple who has everything? Our personalised prints make unique, meaningful wedding gifts they\'ll treasure forever. Free Australian shipping.',
  keywords: [
    'wedding gift',
    'wedding gift australia',
    'unique wedding gift',
    'personalised wedding gift',
    'wedding gift for couple',
    'wedding present ideas',
    'meaningful wedding gift',
    'custom wedding gift',
    'wedding gift not on registry',
    'thoughtful wedding gift',
  ],
  path: '/gifts/wedding-gifts',
  image: '/images/og/wedding-gifts.jpg',
});

const products = [
  {
    name: 'Star Map',
    slug: '/star-map',
    icon: Star,
    price: 'From $59',
    image: '/images/products/star-map-wedding.jpg',
    description: 'The exact night sky from their wedding date',
    bestFor: 'The couple who loves astronomy or had an outdoor/evening wedding',
    suggestion: 'Use their wedding date and venue location. Add their names and a line like "The night we said I do"',
  },
  {
    name: 'Where We Met Map',
    slug: '/where-we-met',
    icon: MapPin,
    price: 'From $59',
    image: '/images/products/where-we-met-wedding.jpg',
    description: 'A beautiful map of their meaningful location',
    bestFor: 'Couples with a great "how we met" story, or who are sentimental about places',
    suggestion: 'Map where they first met, had their first date, or got engaged. Include coordinates and a custom message.',
  },
  {
    name: 'Moon Phase Print',
    slug: '/moon-phase',
    icon: Moon,
    price: 'From $59',
    image: '/images/products/moon-phase-wedding.jpg',
    description: 'The exact moon from their wedding night',
    bestFor: 'Minimalist couples, nature lovers, or those with a subtle aesthetic',
    suggestion: 'Use their wedding date. Works beautifully as a more understated personalised gift.',
  },
  {
    name: 'Sound Wave Art',
    slug: '/sound-wave',
    icon: Music,
    price: 'From $69',
    image: '/images/products/sound-wave-wedding.jpg',
    description: 'Their first dance song visualised',
    bestFor: 'Music-loving couples or those with "a song"',
    suggestion: 'Use a snippet of their first dance song, or go creative with a recording of their vows.',
  },
];

const faqs: FAQItem[] = [
  {
    question: 'What do you buy a couple who has everything?',
    answer: 'Personalised gifts are the answer. A custom star map or location print is something they literally cannot buy themselves—it requires their specific details (wedding date, location, names) to create. It\'s unique, meaningful, and doesn\'t add to a pile of generic housewares.',
  },
  {
    question: 'How much should I spend on a wedding gift in Australia?',
    answer: 'Australian wedding gift etiquette suggests spending $100-200 if you\'re a close friend or family member, $75-150 for a colleague or acquaintance. Our framed prints start at $99, putting them right in the sweet spot for a thoughtful gift that doesn\'t break the bank.',
  },
  {
    question: 'Is it okay to give a gift not on the registry?',
    answer: 'Absolutely. Many couples appreciate a thoughtful gift that shows you put extra thought in. A personalised print is perfect because it\'s something they\'d never think to register for, but will treasure far more than another kitchen gadget. Just make sure to acknowledge the registry too if it\'s a close friend.',
  },
  {
    question: 'Can I order if I don\'t know the exact wedding date yet?',
    answer: 'For star maps and moon phases, you\'ll need the date to generate the design. If you\'re ordering before knowing the wedding date, consider a "Where We Met" map using where they got engaged or first met—you can order that without knowing the wedding date.',
  },
  {
    question: 'Will it arrive in time for the wedding?',
    answer: 'We offer free standard shipping (3-7 business days after production) and express shipping (1-3 days) for $12.95. Production takes 2-3 business days. We recommend ordering at least 2 weeks before you need it, but can accommodate tighter timelines with express shipping.',
  },
  {
    question: 'What if I\'m attending a wedding interstate?',
    answer: 'No problem! We can ship directly to your address so you can bring it to the wedding, or ship to the couple\'s address as a gift. Just add a gift message at checkout and we\'ll include a printed card.',
  },
];

export default function WeddingGiftsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wedding Gifts',
    description: 'Unique personalised wedding gift ideas including custom star maps, location prints, moon phases, and soundwave art.',
    url: `${SITE_CONFIG.url}/gifts/wedding-gifts`,
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
              { name: 'Wedding Gifts', href: '/gifts/wedding-gifts' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm mb-6">
                <Gift className="w-4 h-4" />
                Beyond the Registry
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Wedding Gifts They'll Actually Remember
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-6">
                Skip the registry. Give them something as unique as their love 
                story—a personalised print that captures their special day forever.
              </p>
              <p className="text-stone-600 mb-8">
                Because no couple ever looked back and said "remember that really 
                nice salad bowl we got?" But they will remember the gift that 
                made them cry happy tears.
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
                  Personalised message
                </div>
              </div>

              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Browse Wedding Gifts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/wedding/hero-gift.jpg"
                  alt="Couple opening personalised star map wedding gift"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="bg-stone-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                The Wedding Gift Dilemma
              </h2>
              <p className="text-lg text-stone-600">
                Let's be honest: modern wedding registries are frustrating.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8">
                <div className="text-4xl mb-4">🤷</div>
                <h3 className="font-medium text-stone-900 mb-2">The "Already Got It" Problem</h3>
                <p className="text-stone-600 text-sm">
                  Most couples living together already have everything on their registry. 
                  You're essentially buying them a duplicate toaster.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <div className="text-4xl mb-4">💸</div>
                <h3 className="font-medium text-stone-900 mb-2">The Price Tag Issue</h3>
                <p className="text-stone-600 text-sm">
                  All the "good" items are $400+ and already claimed. You're left choosing 
                  between wine glasses and napkin rings.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <div className="text-4xl mb-4">😴</div>
                <h3 className="font-medium text-stone-900 mb-2">The Boring Factor</h3>
                <p className="text-stone-600 text-sm">
                  A vacuum cleaner might be practical, but is "practical" really the 
                  vibe you want for a wedding gift?
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-stone-700 font-medium">
                That's why more Australians are choosing personalised gifts—something 
                thoughtful, unique, and actually memorable.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Choose Your Gift Style
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Not sure which to choose? Think about the couple. What's their story? 
              What do they love? Match the gift to their personality.
            </p>
          </div>

          <div className="space-y-12">
            {products.map((product) => (
              <article key={product.slug} className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Wedding gift`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                      <product.icon className="w-5 h-5 text-stone-700" />
                    </div>
                    <h3 className="font-serif text-2xl text-stone-900">{product.name}</h3>
                    <span className="text-stone-600">{product.price}</span>
                  </div>
                  
                  <p className="text-lg text-stone-700 mb-4">{product.description}</p>
                  
                  <div className="bg-stone-100 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-stone-700 mb-1">Best for:</p>
                    <p className="text-sm text-stone-600">{product.bestFor}</p>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-amber-800 mb-1">💡 Gift tip:</p>
                    <p className="text-sm text-amber-700">{product.suggestion}</p>
                  </div>
                  
                  <Link
                    href={product.slug}
                    className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
                  >
                    Create This Gift
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* When To Order */}
        <section className="bg-amber-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-amber-700" />
                <h2 className="font-serif text-2xl text-stone-900">When to Order</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-medium text-stone-900">2+ weeks</div>
                  <div className="text-stone-600">Ideal timing. Standard free shipping, no stress.</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-medium text-stone-900">1 week</div>
                  <div className="text-stone-600">Use express shipping ($12.95) to guarantee arrival.</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-medium text-stone-900">Last minute</div>
                  <div className="text-stone-600">
                    Contact us! We can sometimes accommodate rush orders, or provide 
                    a digital preview card to give while the print ships.
                  </div>
                </div>
              </div>

              <p className="text-sm text-stone-500 mt-6">
                Pro tip: If you're ordering before knowing the wedding date (gift-in-advance), 
                choose a "Where We Met" map—you don't need the wedding date for that one.
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-stone-900 mb-4">
              What Wedding Guests Are Saying
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
              ))}
            </div>
            <p className="text-stone-500">The most-complimented gift at the wedding</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I gave this to my best friend for her wedding and she burst into tears (the good kind). The bride's mum asked where I got it because she wants one for her anniversary.",
                author: "Rachel T.",
                relationship: "Best friend of the bride",
              },
              {
                quote: "Every other gift was kitchen stuff or cash. Ours was the only one they opened at the reception and showed everyone. Definitely the most memorable gift we've ever given.",
                author: "David & Emma K.",
                relationship: "Couple friends",
              },
              {
                quote: "I was so stressed about what to get my brother and his partner. This was perfect—personal, beautiful, and actually something they'll display. They've already hung it in their living room.",
                author: "Michelle L.",
                relationship: "Sister of the groom",
              },
            ].map((review, index) => (
              <blockquote key={index} className="bg-stone-100 rounded-2xl p-6 md:p-8">
                <p className="text-stone-700 mb-4">"{review.quote}"</p>
                <footer>
                  <p className="font-medium text-stone-900">{review.author}</p>
                  <p className="text-sm text-stone-500">{review.relationship}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Gift Guide Content */}
        <section className="bg-stone-900 text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose-invert">
              <h2 className="font-serif text-3xl text-white mb-6">
                The Complete Guide to Choosing a Wedding Gift
              </h2>
              
              <p className="text-stone-300">
                Finding a wedding gift used to be simple: check the registry, pick 
                something in your budget, done. But these days, with couples living 
                together for years before marriage, registries are either empty, 
                full of things they clearly don't need, or replaced entirely by 
                "wishing wells" (polite code for "give us cash").
              </p>

              <p className="text-stone-300">
                Don't get me wrong—there's nothing wrong with cash. But if you're 
                the type who wants to give something with more meaning, something 
                that shows you actually put thought into it, you need a different 
                approach.
              </p>

              <h3 className="font-serif text-2xl text-white mt-8 mb-4">
                Why Personalised Gifts Hit Different
              </h3>

              <p className="text-stone-300">
                Here's the thing about personalised gifts: they can't be bought in 
                a shop. They can't be returned. They require knowledge of the couple 
                that only someone who knows them would have. When you give a star map 
                of their wedding night, you're showing that you paid attention—to 
                when their wedding was, to what might be meaningful to them.
              </p>

              <p className="text-stone-300">
                That's why these gifts consistently get the biggest reactions at 
                weddings. While other guests give generic kitchen appliances, you 
                give something that makes them emotional. That's not a gift—that's 
                a memory.
              </p>

              <h3 className="font-serif text-2xl text-white mt-8 mb-4">
                Matching the Gift to the Couple
              </h3>

              <p className="text-stone-300">
                <strong className="text-white">The outdoor/nature couple:</strong> A star map works beautifully, 
                especially if they had an outdoor or evening wedding. It connects their 
                big day to the natural world they love.
              </p>

              <p className="text-stone-300">
                <strong className="text-white">The sentimental couple:</strong> The "Where We Met" map is perfect 
                here. These are the couples who tell their meet-cute story at every 
                opportunity. Give them a beautiful representation of it.
              </p>

              <p className="text-stone-300">
                <strong className="text-white">The music lovers:</strong> If they've ever said "this is our song" 
                about anything, soundwave art is the move. First dance song, proposal 
                song, or the song that was playing when they met.
              </p>

              <p className="text-stone-300">
                <strong className="text-white">The minimalists:</strong> Moon phase prints are subtle and elegant. 
                They don't scream "personalised gift" but carry deep meaning for those 
                in the know.
              </p>

              <h3 className="font-serif text-2xl text-white mt-8 mb-4">
                A Note on Group Gifts
              </h3>

              <p className="text-stone-300">
                If you're pooling money with others, consider getting a larger framed 
                print. Our A2 and A1 sizes with premium framing make stunning statement 
                pieces that become the centrepiece of a room. At $150-250 for a large 
                framed print, split between 3-4 people, it's a meaningful group gift 
                that doesn't feel cheap.
              </p>
            </article>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSchema faqs={faqs} showUI={true} title="Wedding Gift Questions" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl p-8 md:p-12 text-center">
            <Users className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Be the Guest Who Gave *That* Gift
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Create a personalised wedding gift in minutes. Free shipping across 
              Australia, and gift wrapping available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/star-map"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-colors"
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
          </div>
        </section>
      </main>
    </>
  );
}
