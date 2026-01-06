// src/app/gift-voucher/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Gift, Mail, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Gift Vouchers | EverHere Prints',
  description:
    'Give the gift of choice with an EverHere Prints gift voucher. Perfect for any occasion—let them create their own personalised star map, location print, or soundwave art.',
  keywords: [
    'gift voucher',
    'gift card',
    'personalised gift voucher',
    'star map gift voucher',
    'digital gift card',
    'last minute gift',
  ],
  path: '/gift-voucher',
});

const voucherAmounts = [50, 75, 100, 150, 200, 250];

const benefits = [
  { title: 'Instant Delivery', description: 'Delivered by email within minutes', icon: Mail },
  { title: 'Never Expires', description: 'Use anytime, no expiry date', icon: Clock },
  { title: 'Any Product', description: 'Valid for all prints and frames', icon: Sparkles },
];

const faqs: FAQItem[] = [
  {
    question: 'How are gift vouchers delivered?',
    answer: 'Gift vouchers are delivered instantly by email to either yourself or directly to the recipient. You can add a personal message and choose to send it on a specific date for birthdays or special occasions.',
  },
  {
    question: 'Do gift vouchers expire?',
    answer: 'No, our gift vouchers never expire. The recipient can use them whenever they\'re ready to create their personalised print.',
  },
  {
    question: 'Can gift vouchers be used on any product?',
    answer: 'Yes, gift vouchers can be used on any product in our store including star maps, where we met maps, moon phase prints, soundwave art, and all framing options.',
  },
  {
    question: 'What if the order costs more than the voucher amount?',
    answer: 'The recipient can pay the difference with any accepted payment method. If the order costs less, the remaining balance stays on the voucher for future use.',
  },
  {
    question: 'Can I get a refund on a gift voucher?',
    answer: 'Unused gift vouchers can be refunded within 30 days of purchase. Once a voucher has been partially or fully redeemed, it cannot be refunded.',
  },
];

export default function GiftVoucherPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'EverHere Prints Gift Voucher',
    description: 'Digital gift voucher for personalised prints. Instant email delivery, never expires.',
    image: `${SITE_CONFIG.url}/images/gift-voucher.jpg`,
    brand: { '@type': 'Brand', name: 'EverHere Prints' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: 50,
      highPrice: 250,
      offerCount: voucherAmounts.length,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <JsonLd data={productSchema} />

      <main id="main-content" className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'Gift Voucher', href: '/gift-voucher' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm mb-6">
                <Gift className="w-4 h-4" />
                Perfect Last-Minute Gift
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Gift Vouchers
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8">
                Give the gift of choice. Let them create their own personalised
                star map, location print, moon phase, or soundwave art. Delivered
                instantly by email.
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap gap-6 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <benefit.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-900 text-sm">{benefit.title}</p>
                      <p className="text-xs text-stone-500">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-rose-100 rounded-2xl flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-xs">
                <Gift className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <p className="text-sm text-stone-500 mb-2">Gift Voucher</p>
                <p className="text-4xl font-serif text-stone-900 mb-2">$100</p>
                <p className="text-sm text-stone-600">EverHere Prints</p>
              </div>
            </div>
          </div>
        </section>

        {/* Select Amount */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-stone-900 text-center mb-8">
              Select Amount
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {voucherAmounts.map((amount) => (
                <button
                  key={amount}
                  className="py-4 px-2 bg-white border-2 border-stone-200 rounded-xl text-center hover:border-purple-500 focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <span className="text-2xl font-serif text-stone-900">${amount}</span>
                </button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-stone-600 mb-6">
                Or enter a custom amount between $25 and $500
              </p>
              <Link
                href="/gift-voucher/checkout"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">
            How Gift Vouchers Work
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Choose Amount', desc: 'Select from preset amounts or enter a custom value' },
              { step: 2, title: 'Add Message', desc: 'Write a personal message for the recipient' },
              { step: 3, title: 'Instant Delivery', desc: 'Voucher is emailed instantly or on your chosen date' },
              { step: 4, title: 'They Create', desc: 'Recipient designs their perfect personalised print' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-serif">
                  {item.step}
                </div>
                <h3 className="font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-stone-50 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSchema faqs={faqs} showUI={true} title="Gift Voucher FAQ" />
          </div>
        </section>
      </main>
    </>
  );
}
