// src/app/compare/star-map-companies/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, X, Star, Shield, Truck, Palette } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Star Map Comparison: EverHere vs Under Lucky Stars vs The Night Sky',
  description:
    'Compare the top star map companies. See how EverHere Prints stacks up against Under Lucky Stars, The Night Sky, and GreaterSkies on price, quality, features, and shipping.',
  keywords: [
    'star map comparison',
    'under lucky stars review',
    'the night sky review',
    'best star map company',
    'star map australia',
    'greaterskies comparison',
    'custom star map review',
    'star map quality comparison',
  ],
  path: '/compare/star-map-companies',
  image: '/images/og/compare-star-maps.jpg',
});

const companies = [
  {
    name: 'EverHere Prints',
    highlight: true,
    location: 'Australia',
    priceFrom: 59,
    currency: 'AUD',
    freeShippingAU: true,
    shippingTime: '3-7 days',
    accuracy: 'Astronomical database',
    styles: 8,
    customText: true,
    locationMaps: true,
    moonPhase: true,
    soundWave: true,
    frameOptions: true,
    digitalDownload: true,
    reviews: '4.9/5',
    support: 'Email + Chat',
  },
  {
    name: 'Under Lucky Stars',
    highlight: false,
    location: 'Hungary',
    priceFrom: 79,
    currency: 'USD',
    freeShippingAU: false,
    shippingTime: '10-20 days',
    accuracy: 'NASA verified',
    styles: 12,
    customText: true,
    locationMaps: false,
    moonPhase: false,
    soundWave: false,
    frameOptions: true,
    digitalDownload: true,
    reviews: '4.8/5',
    support: 'Email',
  },
  {
    name: 'The Night Sky',
    highlight: false,
    location: 'USA',
    priceFrom: 89,
    currency: 'USD',
    freeShippingAU: false,
    shippingTime: '14-21 days',
    accuracy: 'Astronomical database',
    styles: 10,
    customText: true,
    locationMaps: false,
    moonPhase: true,
    soundWave: false,
    frameOptions: true,
    digitalDownload: true,
    reviews: '4.9/5',
    support: 'Email',
  },
  {
    name: 'GreaterSkies',
    highlight: false,
    location: 'UK',
    priceFrom: 65,
    currency: 'GBP',
    freeShippingAU: false,
    shippingTime: '10-14 days',
    accuracy: 'Astronomical database',
    styles: 6,
    customText: true,
    locationMaps: false,
    moonPhase: false,
    soundWave: false,
    frameOptions: true,
    digitalDownload: true,
    reviews: '4.7/5',
    support: 'Email',
  },
];

const reasons = [
  {
    title: 'Australian-Based',
    description: 'We\'re based in Sydney, meaning faster shipping times and local customer support. No waiting weeks for international delivery.',
    icon: Truck,
  },
  {
    title: 'More Product Options',
    description: 'Unlike competitors who only offer star maps, we also create location maps, moon phase prints, and sound wave art—all from one place.',
    icon: Palette,
  },
  {
    title: 'Free Australian Shipping',
    description: 'Free standard shipping on all orders within Australia. International competitors charge $20-40+ for shipping to AU.',
    icon: Star,
  },
  {
    title: 'Same Accuracy, Better Value',
    description: 'Our star maps use the same astronomical data as premium international competitors, at Australian-friendly prices.',
    icon: Shield,
  },
];

const faqs: FAQItem[] = [
  {
    question: 'Are all star map companies equally accurate?',
    answer: 'Most reputable star map companies use the same underlying astronomical databases (like the Yale Bright Star Catalog or Hipparcos). The differences come down to design quality, customisation options, shipping times, and customer service. Our prints are as astronomically accurate as any premium competitor.',
  },
  {
    question: 'Why should I choose an Australian star map company?',
    answer: 'Choosing an Australian company like EverHere Prints means faster delivery (3-7 days vs 2-3 weeks), free shipping, local customer support, and prices in AUD without currency conversion surprises. You also support Australian small business.',
  },
  {
    question: 'How do prices compare when you factor in shipping?',
    answer: 'While some international competitors advertise lower base prices, they typically charge $20-40+ for shipping to Australia, plus potential customs fees. When you factor in total delivered cost, EverHere Prints often works out cheaper—with faster delivery.',
  },
  {
    question: 'Do you offer the same quality as international companies?',
    answer: 'Yes. We use premium 250gsm archival paper and high-quality framing options comparable to any international competitor. Our print quality meets museum archival standards.',
  },
  {
    question: 'What if I want more than just a star map?',
    answer: 'That\'s where we really stand out. Most star map companies only offer star maps. We also create Where We Met location maps, moon phase prints, and sound wave art—giving you more ways to capture your special moments.',
  },
];

export default function StarMapComparisonPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Star Map Company Comparison',
    description: 'Compare the top star map companies including EverHere Prints, Under Lucky Stars, The Night Sky, and GreaterSkies.',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Star Map Companies Compared',
      numberOfItems: companies.length,
      itemListElement: companies.map((company, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Organization',
          name: company.name,
          description: `Star map company based in ${company.location}`,
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={comparisonSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Compare', href: '/compare' },
              { name: 'Star Map Companies', href: '/compare/star-map-companies' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Star Map Company Comparison
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Thinking about ordering a custom star map? We've compared the top
              star map companies so you can make an informed decision. See how
              EverHere Prints compares on price, quality, shipping, and features.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-4 pr-4 font-medium text-stone-900">Feature</th>
                  {companies.map((company) => (
                    <th
                      key={company.name}
                      className={`text-center py-4 px-4 font-medium ${
                        company.highlight
                          ? 'bg-amber-50 text-amber-900'
                          : 'text-stone-900'
                      }`}
                    >
                      {company.name}
                      {company.highlight && (
                        <span className="block text-xs font-normal text-amber-600 mt-1">
                          Our Pick
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Based In</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.location}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Price From</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 font-medium ${c.highlight ? 'bg-amber-50' : ''}`}>
                      ${c.priceFrom} {c.currency}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Free AU Shipping</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.freeShippingAU ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-stone-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Shipping to Australia</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.shippingTime}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Design Styles</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.styles}+
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Location Maps</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.locationMaps ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-stone-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Moon Phase Prints</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.moonPhase ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-stone-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Sound Wave Art</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.soundWave ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-stone-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Frame Options</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.frameOptions ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-stone-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Digital Download</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      {c.digitalDownload ? (
                        <Check className="w-5 h-5 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-stone-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-4 pr-4 text-stone-600">Customer Rating</td>
                  {companies.map((c) => (
                    <td key={c.name} className={`text-center py-4 px-4 ${c.highlight ? 'bg-amber-50' : ''}`}>
                      <span className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        {c.reviews}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-500 mt-4">
            *Pricing and features accurate as of January 2026. International prices shown in original currency.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="bg-amber-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">
              Why Australian Customers Choose EverHere Prints
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {reasons.map((reason) => (
                <div key={reason.title} className="bg-white rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <reason.icon className="w-6 h-6 text-amber-700" />
                  </div>
                  <h3 className="font-medium text-stone-900 mb-2">{reason.title}</h3>
                  <p className="text-sm text-stone-600">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FAQSchema faqs={faqs} showUI={true} title="Comparison Questions" />
        </section>

        {/* CTA */}
        <section className="bg-stone-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Ready to Create Your Star Map?
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Australian quality, Australian shipping, Australian support.
              Design your custom star map in minutes.
            </p>
            <Link
              href="/star-map"
              className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-colors"
            >
              Create Your Star Map
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
