// src/app/about/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Star, Check, MapPin } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG, PAGE_META } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: PAGE_META.about.title,
  description: PAGE_META.about.description,
  keywords: PAGE_META.about.keywords,
  path: '/about',
  image: '/images/og/about.jpg',
});

const values = [
  {
    title: 'Meaningful Design',
    description:
      'Every print we create captures a moment that matters. We believe in design that tells your story.',
    icon: Heart,
  },
  {
    title: 'Scientific Accuracy',
    description:
      'Our star maps and moon phases use precise astronomical data. Your print is as accurate as a planetarium.',
    icon: Star,
  },
  {
    title: 'Premium Quality',
    description:
      '250gsm archival paper, museum-grade framing, and attention to every detail. Built to last a lifetime.',
    icon: Check,
  },
  {
    title: 'Australian Made',
    description:
      'Proudly designed and printed in Australia. Supporting local while delivering worldwide.',
    icon: MapPin,
  },
];

const faqs: FAQItem[] = [
  {
    question: 'Where is EverHere Prints based?',
    answer:
      'EverHere Prints is proudly based in Sydney, Australia. We design and print all our products locally, supporting Australian businesses and ensuring the highest quality control.',
  },
  {
    question: 'How did EverHere Prints start?',
    answer:
      "EverHere Prints was born from a simple idea: that the most meaningful gifts are those that capture our unique stories. We wanted to create beautiful, personalised artwork that celebrates life's special moments—from the night sky on your wedding day to the place where you first met.",
  },
  {
    question: 'What makes your prints different?',
    answer:
      'Three things set us apart: scientific accuracy (our star maps and moon phases use real astronomical data), premium quality (250gsm archival paper and museum-grade framing), and genuine personalisation (each print is custom-made for your specific moment and place).',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes! While we are based in Australia, we ship worldwide. We offer free shipping within Australia, and competitive international rates to New Zealand, UK, USA, Canada, and most European countries.',
  },
];

export default function AboutPage() {
  // About page schema
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About EverHere Prints',
    description: PAGE_META.about.description,
    url: `${SITE_CONFIG.url}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}${SITE_CONFIG.images.logo}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
      sameAs: [
        SITE_CONFIG.social.instagram,
        SITE_CONFIG.social.facebook,
        SITE_CONFIG.social.pinterest,
      ],
    },
  };

  return (
    <>
      <JsonLd data={aboutSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'About', href: '/about' }]} />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Prints That Capture Your Moments
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8">
                EverHere Prints creates meaningful personalised artwork that
                celebrates your special moments. From the stars above on your
                wedding night to the streets where you first met, we help you
                preserve what matters most.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Based in Sydney, Australia, we combine scientific accuracy with
                beautiful design to create prints that tell your unique story.
                Every piece is custom-made with premium materials and shipped
                free across Australia.
              </p>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/images/about/hero.jpg"
                alt="EverHere Prints workshop - creating personalised prints"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-stone-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Our values guide everything we do, from design to delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-white p-6 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-stone-700" />
                  </div>
                  <h3 className="font-medium text-stone-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-stone-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] lg:order-2">
              <Image
                src="/images/about/story.jpg"
                alt="The EverHere Prints story"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="lg:order-1">
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-stone-600">
                <p>
                  EverHere Prints began with a simple question: how do you give
                  someone a gift that truly captures a moment that matters?
                </p>
                <p>
                  We realised that the most meaningful gifts aren't things you
                  can buy off a shelf. They're reminders of the moments that
                  shaped us—the night sky when you said "I do", the street corner
                  where you first met, the moon phase on the day your child was
                  born.
                </p>
                <p>
                  So we set out to create beautiful, scientifically accurate,
                  premium-quality prints that capture these moments forever.
                  Every print is made with care in Australia, using the finest
                  materials and attention to detail.
                </p>
                <p>
                  Today, we've helped thousands of Australians (and customers
                  worldwide) celebrate their special moments with personalised
                  artwork they'll treasure for a lifetime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-stone-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-serif text-white mb-2">
                  10,000+
                </div>
                <p className="text-stone-400">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-serif text-white mb-2">
                  4.9/5
                </div>
                <p className="text-stone-400">Average Rating</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-serif text-white mb-2">
                  100%
                </div>
                <p className="text-stone-400">Australian Made</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-serif text-white mb-2">
                  Free
                </div>
                <p className="text-stone-400">AU Shipping</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <FAQSchema faqs={faqs} showUI={true} title="About EverHere Prints" />
        </section>

        {/* CTA Section */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Ready to Capture Your Moment?
            </h2>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Create a personalised print that tells your story. Free shipping
              across Australia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/star-map"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Start Creating
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/gifts"
                className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-8 py-4 rounded-full font-medium hover:bg-white transition-colors"
              >
                Browse Gift Ideas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
