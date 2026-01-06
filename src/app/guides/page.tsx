// src/app/guides/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Gift, Heart, Calendar, Star } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, JsonLd } from '@/components/seo';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG } from '@/lib/seo/constants';

export const metadata: Metadata = genMeta({
  title: 'Gift Guides & Inspiration | EverHere Prints',
  description:
    'Explore our collection of gift guides and inspiration. From anniversary gifts by year to personalised gift ideas for every occasion.',
  keywords: ['gift guides', 'gift ideas', 'personalised gift guide', 'gift inspiration'],
  path: '/guides',
});

const guides = [
  {
    title: 'Anniversary Gifts by Year',
    description: 'The complete guide to traditional and modern anniversary themes from 1st to 60th year.',
    href: '/guides/anniversary-gifts-by-year',
    image: '/images/guides/anniversary-by-year.jpg',
    icon: Calendar,
    featured: true,
  },
  {
    title: 'Personalised Gifts Australia',
    description: 'Discover the best personalised gift options available in Australia with free shipping.',
    href: '/guides/personalised-gifts-australia',
    image: '/images/guides/personalised-australia.jpg',
    icon: Gift,
    featured: true,
  },
  {
    title: 'How to Read a Star Map',
    description: 'Learn to identify constellations, stars, and celestial features on your custom star map.',
    href: '/blog/how-to-read-a-star-map',
    image: '/images/guides/read-star-map.jpg',
    icon: Star,
    featured: false,
  },
  {
    title: 'Moon Phase Meanings',
    description: 'Explore the symbolism behind each lunar phase and what they represent.',
    href: '/blog/moon-phase-meanings',
    image: '/images/guides/moon-meanings.jpg',
    icon: BookOpen,
    featured: false,
  },
  {
    title: 'What to Write on a Star Map',
    description: '50+ quote ideas and message inspiration for your custom star map print.',
    href: '/blog/what-to-write-on-a-star-map',
    image: '/images/guides/star-map-quotes.jpg',
    icon: Heart,
    featured: false,
  },
];

const giftGuideLinks = [
  { name: 'Anniversary Gifts', href: '/gifts/anniversary-gifts' },
  { name: 'Wedding Gifts', href: '/gifts/wedding-gifts' },
  { name: 'Valentine\'s Day', href: '/gifts/valentines-day-gifts' },
  { name: 'Mother\'s Day', href: '/gifts/mothers-day-gifts' },
  { name: 'Father\'s Day', href: '/gifts/fathers-day-gifts' },
  { name: 'Christmas', href: '/gifts/christmas-gifts' },
  { name: 'Baby Gifts', href: '/gifts/baby-gifts' },
  { name: 'Memorial Gifts', href: '/gifts/memorial-gifts' },
];

export default function GuidesPage() {
  const collectionSchema = generateCollectionPageSchema({
    name: 'Gift Guides & Inspiration',
    description: 'Explore our collection of gift guides and inspiration for personalised prints.',
    url: `${SITE_CONFIG.url}/guides`,
    image: `${SITE_CONFIG.url}/images/og/guides.jpg`,
  });

  return (
    <>
      <JsonLd data={collectionSchema} />

      <main id="main-content" className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'Guides', href: '/guides' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Gift Guides & Inspiration
            </h1>
            <p className="text-xl text-stone-600">
              Everything you need to find the perfect personalised gift.
              From occasion guides to product tutorials.
            </p>
          </div>
        </section>

        {/* Featured Guides */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="font-serif text-2xl text-stone-900 mb-6">Featured Guides</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {guides
              .filter((g) => g.featured)
              .map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[16/9]">
                    <Image src={guide.image} alt={guide.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <guide.icon className="w-5 h-5 text-amber-600" />
                      <h3 className="font-serif text-xl text-stone-900">{guide.title}</h3>
                    </div>
                    <p className="text-stone-600 mb-4">{guide.description}</p>
                    <span className="text-amber-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* All Guides */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-serif text-2xl text-stone-900 mb-6">All Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {guides
              .filter((g) => !g.featured)
              .map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white rounded-xl p-6 border border-stone-200 hover:border-stone-300 transition-colors"
                >
                  <guide.icon className="w-8 h-8 text-stone-400 mb-4" />
                  <h3 className="font-medium text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-stone-600">{guide.description}</p>
                </Link>
              ))}
          </div>
        </section>

        {/* Gift Guide Links */}
        <section className="bg-stone-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl text-stone-900 mb-6">Gift Ideas by Occasion</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {giftGuideLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-stone-900">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
