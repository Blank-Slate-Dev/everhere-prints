// src/app/gifts/anniversary-gifts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Star, MapPin, Moon, Music, Gift, Clock, Sparkles, Check } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Anniversary Gifts Australia | Personalised Prints for Every Year',
  description:
    'Find the perfect anniversary gift. Custom star maps, location prints & more. Capture your special moments in a beautiful personalised print. Free Australian shipping.',
  keywords: [
    'anniversary gifts',
    'anniversary gifts australia',
    'personalised anniversary gift',
    'first anniversary gift',
    'paper anniversary gift',
    'wedding anniversary gift',
    'anniversary gift for wife',
    'anniversary gift for husband',
    'unique anniversary gift',
    'romantic anniversary gift',
  ],
  path: '/gifts/anniversary-gifts',
  image: '/images/og/anniversary-gifts.jpg',
});

const products = [
  {
    name: 'Star Map',
    slug: '/star-map',
    icon: Star,
    price: 'From $59',
    image: '/images/products/star-map-anniversary.jpg',
    description: 'The exact night sky from your wedding day or any meaningful date',
    perfectFor: ['Paper anniversary (1st)', 'Any milestone year', 'Couples who love stargazing'],
    personalisation: 'Date, location, custom message, names',
  },
  {
    name: 'Where We Met Map',
    slug: '/where-we-met',
    icon: MapPin,
    price: 'From $59',
    image: '/images/products/where-we-met-anniversary.jpg',
    description: 'A beautiful map marking the location where your story began',
    perfectFor: ['Couples with a special place', 'Long-distance relationships', 'Destination wedding couples'],
    personalisation: 'Location, custom message, coordinates, names',
  },
  {
    name: 'Moon Phase Print',
    slug: '/moon-phase',
    icon: Moon,
    price: 'From $59',
    image: '/images/products/moon-phase-anniversary.jpg',
    description: 'The exact phase of the moon from your wedding night',
    perfectFor: ['Nature lovers', 'Minimalist style', 'Astronomy enthusiasts'],
    personalisation: 'Date, location, custom message',
  },
  {
    name: 'Sound Wave Art',
    slug: '/sound-wave',
    icon: Music,
    price: 'From $69',
    image: '/images/products/sound-wave-anniversary.jpg',
    description: 'Your wedding song or vows transformed into visual art',
    perfectFor: ['Music lovers', 'Couples with "a song"', 'Modern aesthetic'],
    personalisation: 'Audio clip, custom colours, message',
  },
];

const anniversaryYears = [
  { year: 1, name: 'Paper', gift: 'Star Map Print', why: 'A print is the perfect paper gift—and captures your first year beautifully.' },
  { year: 5, name: 'Wood', gift: 'Wooden Framed Print', why: 'Choose our oak frame option to honour the wood anniversary tradition.' },
  { year: 10, name: 'Tin/Aluminium', gift: 'Metal or Framed Print', why: 'A decade of love deserves a lasting keepsake.' },
  { year: 15, name: 'Crystal', gift: 'Premium Framed Print', why: 'Crystal-clear memories in a premium frame.' },
  { year: 25, name: 'Silver', gift: 'Silver Framed Print', why: 'The silver anniversary calls for something precious.' },
  { year: 50, name: 'Gold', gift: 'Gold Anniversary Print', why: 'Half a century of love—a truly golden milestone.' },
];

const faqs: FAQItem[] = [
  {
    question: 'What is a good anniversary gift in Australia?',
    answer: 'The best anniversary gifts are personal and meaningful. Personalised prints like star maps (showing your wedding night sky) or location maps (marking where you met) are increasingly popular because they\'re unique to your relationship. They work for any anniversary year and can be customised with your names, dates, and a special message. Plus, they\'re a lasting keepsake that can be displayed in your home.',
  },
  {
    question: 'What is the traditional 1st anniversary gift?',
    answer: 'The traditional first anniversary gift is paper, symbolising the blank page of your new life together. A personalised print is the perfect modern take on this tradition—it\'s literally printed on premium paper, but captures something meaningful like the night sky from your wedding day or the place where you first met.',
  },
  {
    question: 'How much should you spend on an anniversary gift?',
    answer: 'There\'s no set rule, but most Australians spend between $50-200 on anniversary gifts. The thought and personalisation matter more than the price tag. Our prints start from $59 for an unframed A4 print, with framed options from $99—making them accessible while still feeling special and premium.',
  },
  {
    question: 'What do you get someone who has everything for their anniversary?',
    answer: 'Personalised gifts are ideal for people who have everything because they\'re completely unique. No one else has a star map showing the exact sky from their wedding night, or a map of the precise location they got engaged. It\'s something they literally cannot buy themselves because it requires their specific details.',
  },
  {
    question: 'How long does delivery take in Australia?',
    answer: 'We offer free standard shipping Australia-wide, which takes 3-7 business days after production. Production typically takes 2-3 business days. For last-minute gifts, we offer express shipping (1-3 business days) for $12.95. We recommend ordering at least 2 weeks before your anniversary date.',
  },
  {
    question: 'Can I see a preview before ordering?',
    answer: 'Yes! Our design tool shows you a live preview of your print as you customise it. You\'ll see exactly how your finished product will look—including your chosen colours, text, and layout—before you add it to cart. No surprises.',
  },
];

export default function AnniversaryGiftsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Anniversary Gifts',
    description: 'Personalised anniversary gift ideas including custom star maps, location prints, moon phases, and soundwave art.',
    url: `${SITE_CONFIG.url}/gifts/anniversary-gifts`,
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
              { name: 'Anniversary Gifts', href: '/gifts/anniversary-gifts' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm mb-6">
                <Heart className="w-4 h-4" />
                Australia's Favourite Anniversary Gifts
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Anniversary Gifts That Capture Your Love Story
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-6">
                Forget generic flowers and chocolates. Give them something as unique 
                as your relationship—a personalised print that captures your special 
                moments forever.
              </p>
              <p className="text-stone-600 mb-8">
                Whether it's your first anniversary or your fiftieth, our custom 
                prints make meaningful gifts that'll be treasured for years to come.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Free AU shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Premium quality
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Made in 2-3 days
                </div>
              </div>

              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Browse Anniversary Gifts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/anniversary/hero-couple.jpg"
                  alt="Couple holding personalised star map anniversary gift"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-medium text-stone-900">4.9/5</span>
                </div>
                <p className="text-sm text-stone-600">From 1,200+ happy customers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Personalised Gifts Section */}
        <section className="bg-stone-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                Why Personalised Anniversary Gifts Work
              </h2>
              <p className="text-lg text-stone-600">
                After years together, finding a gift that feels special gets harder. 
                Here's why personalised prints have become Australia's go-to anniversary gift.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">Truly One-of-a-Kind</h3>
                <p className="text-stone-600">
                  No one else in the world has a star map showing your wedding night, 
                  or a map of the exact spot you got engaged. It's impossible to find 
                  in any shop because it's created just for you.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">Emotionally Meaningful</h3>
                <p className="text-stone-600">
                  These aren't just pretty pictures—they represent real moments from 
                  your relationship. Every time they look at it, they'll remember 
                  that night, that place, that feeling.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-3">Lasts Forever</h3>
                <p className="text-stone-600">
                  Unlike flowers that wilt or chocolates that get eaten, a framed 
                  print becomes part of your home. It's a daily reminder of your 
                  love that'll last as long as your relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Choose Your Perfect Anniversary Gift
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Each of our prints captures a different aspect of your love story. 
              Pick the one that resonates most with your relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <article key={product.slug} className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Anniversary gift`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                        <product.icon className="w-5 h-5 text-stone-700" />
                      </div>
                      <h3 className="font-serif text-2xl text-stone-900">{product.name}</h3>
                    </div>
                    <span className="text-lg font-medium text-stone-900">{product.price}</span>
                  </div>
                  
                  <p className="text-stone-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-stone-700 mb-2">Perfect for:</p>
                    <ul className="space-y-1">
                      {product.perfectFor.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-stone-600">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-stone-500">
                      <span className="font-medium">Personalise with:</span> {product.personalisation}
                    </p>
                  </div>
                  
                  <Link
                    href={product.slug}
                    className="inline-flex items-center justify-center gap-2 w-full bg-stone-900 text-white py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
                  >
                    Create Your {product.name}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Anniversary Year Guide */}
        <section className="bg-gradient-to-b from-rose-50 to-amber-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                Gifts by Anniversary Year
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Looking for a gift that honours traditional anniversary themes? 
                Our prints work beautifully with the classic gift traditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {anniversaryYears.map((item) => (
                <div key={item.year} className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-serif text-rose-600">{item.year}</span>
                    <div>
                      <p className="text-sm text-stone-500">Year</p>
                      <p className="font-medium text-stone-900">{item.name} Anniversary</p>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 mb-3">{item.why}</p>
                  <p className="text-sm font-medium text-rose-700">Our pick: {item.gift}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/guides/anniversary-gifts-by-year"
                className="inline-flex items-center gap-2 text-rose-700 font-medium hover:text-rose-800"
              >
                View complete guide for all 60 years
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-stone-600">
              Creating your personalised anniversary gift takes just a few minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Choose Your Print', desc: 'Pick from star maps, location maps, moon phases, or soundwave art' },
              { step: 2, title: 'Enter Your Details', desc: 'Add your special date, location, names, and personal message' },
              { step: 3, title: 'Preview & Customise', desc: 'See your design come to life and adjust colours and layout' },
              { step: 4, title: 'We Print & Ship', desc: 'Premium printing in 2-3 days, then free delivery across Australia' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center mx-auto mb-4 text-xl font-serif">
                  {item.step}
                </div>
                <h3 className="font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-stone-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Loved by Australian Couples
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-stone-300">4.9/5 from 1,200+ reviews</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Got this for our first wedding anniversary and my husband was speechless. The quality is amazing and seeing the exact stars from our wedding night made it so special.",
                  author: "Sarah M.",
                  location: "Melbourne, VIC",
                  product: "Star Map",
                },
                {
                  quote: "We met in a tiny coffee shop in Surry Hills 8 years ago. Having that exact location captured in such a beautiful print means everything to us. It now hangs in our bedroom.",
                  author: "James & Lisa",
                  location: "Sydney, NSW",
                  product: "Where We Met Map",
                },
                {
                  quote: "Ordered the soundwave of our wedding song for our 5th anniversary. The look on her face when she realised what it was—priceless. Best gift I've ever given.",
                  author: "Michael T.",
                  location: "Brisbane, QLD",
                  product: "Sound Wave Art",
                },
              ].map((review, index) => (
                <blockquote key={index} className="bg-stone-800 rounded-2xl p-6 md:p-8">
                  <p className="text-stone-200 mb-6 italic">"{review.quote}"</p>
                  <footer>
                    <p className="font-medium text-white">{review.author}</p>
                    <p className="text-sm text-stone-400">{review.location}</p>
                    <p className="text-sm text-rose-400 mt-1">Purchased: {review.product}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Ideas Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <article className="prose-custom">
            <h2 className="font-serif text-3xl text-stone-900 mb-6">
              Finding the Perfect Anniversary Gift
            </h2>
            
            <p>
              Anniversary gifts are tricky. After years together, you've probably given 
              all the obvious presents—jewellery, watches, perfume, gadgets. And while 
              experiences like dinner or a weekend away are lovely, sometimes you want 
              something physical. Something they can unwrap. Something that stays.
            </p>

            <p>
              That's where personalised prints come in. They're not just another "thing" 
              to add to the house. They're a representation of your specific love story, 
              created just for you. No two are alike because no two relationships are alike.
            </p>

            <h3 className="font-serif text-2xl text-stone-900 mt-8 mb-4">
              What Makes a Great Anniversary Gift?
            </h3>

            <p>
              The best anniversary gifts share three qualities: they're personal, they're 
              lasting, and they show thought. A gift card might be practical, but it 
              doesn't say "I was thinking specifically about you and us." A personalised 
              print does.
            </p>

            <p>
              When you give someone a star map of your wedding night, you're not just 
              giving them a pretty picture. You're saying "I remember that night. I 
              remember how the sky looked. I remember how I felt." That's what turns 
              a gift into a keepsake.
            </p>

            <h3 className="font-serif text-2xl text-stone-900 mt-8 mb-4">
              Anniversary Gift Ideas by Relationship
            </h3>

            <p>
              <strong>For the romantic:</strong> A star map showing the night sky from 
              your wedding, first date, or the night you got engaged. Add a line from 
              your vows or a meaningful quote.
            </p>

            <p>
              <strong>For the sentimental:</strong> A "Where We Met" map marking the 
              exact location your story began. Whether it was a crowded bar, a friend's 
              party, or a dating app first meet-up at a café, that place matters.
            </p>

            <p>
              <strong>For the music lover:</strong> Sound wave art of your first dance 
              song, the song that was playing when you met, or even a recording of 
              "I love you" in their voice.
            </p>

            <p>
              <strong>For the minimalist:</strong> A moon phase print is subtle and 
              elegant. It doesn't scream "personalised gift" but carries deep meaning 
              for those who know what it represents.
            </p>

            <h3 className="font-serif text-2xl text-stone-900 mt-8 mb-4">
              Last-Minute Anniversary Gift?
            </h3>

            <p>
              We get it—life gets busy and anniversaries can sneak up on you. Our 
              express shipping option gets your gift there in 1-3 business days after 
              production. Order by Wednesday for weekend delivery in most Australian 
              metro areas.
            </p>

            <p>
              Need it even faster? We also offer digital downloads for some products, 
              so you can print locally or present the design digitally while the 
              physical print is on its way.
            </p>
          </article>
        </section>

        {/* FAQ Section */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSchema faqs={faqs} showUI={true} title="Anniversary Gift Questions" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-gradient-to-r from-rose-600 to-amber-600 rounded-3xl p-8 md:p-12 text-center">
            <Gift className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Ready to Create Something Special?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Design your personalised anniversary gift in minutes. 
              Free shipping across Australia on all orders.
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
