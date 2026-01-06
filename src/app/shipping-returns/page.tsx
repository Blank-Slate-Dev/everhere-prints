// src/app/shipping-returns/page.tsx

import { Metadata } from 'next';
import { Truck, RotateCcw, Clock, Globe, Package, Shield } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Shipping & Returns | EverHere Prints',
  description:
    'Free Australian shipping on all orders. Learn about our delivery times, international shipping options, and satisfaction guarantee.',
  keywords: [
    'shipping australia',
    'free shipping',
    'returns policy',
    'delivery times',
    'international shipping',
  ],
  path: '/shipping-returns',
});

const shippingOptions = [
  {
    region: 'Australia',
    method: 'Standard Shipping',
    time: '3-7 business days',
    cost: 'FREE',
    icon: Truck,
  },
  {
    region: 'Australia',
    method: 'Express Shipping',
    time: '1-3 business days',
    cost: '$12.95',
    icon: Clock,
  },
  {
    region: 'New Zealand',
    method: 'International Standard',
    time: '7-14 business days',
    cost: '$15.00',
    icon: Globe,
  },
  {
    region: 'International',
    method: 'Rest of World',
    time: '14-21 business days',
    cost: '$25.00',
    icon: Globe,
  },
];

const faqs: FAQItem[] = [
  {
    question: 'How long does shipping take within Australia?',
    answer: 'Standard shipping within Australia takes 3-7 business days after your order has been printed and dispatched. Production typically takes 2-3 business days. Express shipping (1-3 business days) is available for an additional $12.95.',
  },
  {
    question: 'Is shipping really free in Australia?',
    answer: 'Yes! We offer free standard shipping on all orders within Australia, with no minimum order value. This applies to prints, framed items, and all our products.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to New Zealand ($15), United Kingdom, United States, Canada, and most European countries ($25). International orders typically take 14-21 business days for delivery.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can use this to track your package on the Australia Post website (for domestic orders) or the relevant carrier for international shipments.',
  },
  {
    question: 'What is your returns policy?',
    answer: 'Because each print is custom-made to your specifications, we cannot accept returns for change of mind. However, if there\'s an error in printing, damage during shipping, or any quality issue, we\'ll happily reprint or refund your order.',
  },
  {
    question: 'What if my order arrives damaged?',
    answer: 'We package all orders carefully, but if your item arrives damaged, please contact us within 7 days with photos of the damage. We\'ll arrange a replacement or full refund at no cost to you.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer: 'If your order hasn\'t entered production yet (usually within 24 hours of ordering), contact us immediately and we\'ll do our best to make changes or cancel. Once production has started, we cannot make changes.',
  },
  {
    question: 'Do you offer express production?',
    answer: 'Yes! For urgent orders, we offer rush production for an additional fee. This prioritises your order in our print queue. Contact us before ordering if you have a tight deadline.',
  },
];

export default function ShippingReturnsPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Shipping & Returns Policy',
    description: 'Free Australian shipping. Learn about delivery times and our satisfaction guarantee.',
    url: `${SITE_CONFIG.url}/shipping-returns`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'AUD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'AU',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'd' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 7, unitCode: 'd' },
        },
      },
    },
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      <main id="main-content" className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'Shipping & Returns', href: '/shipping-returns' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Shipping & Returns
            </h1>
            <p className="text-xl text-stone-600">
              Free shipping on all Australian orders. Plus our satisfaction
              guarantee ensures you'll love your print.
            </p>
          </div>
        </section>

        {/* Free Shipping Banner */}
        <section className="bg-emerald-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <Truck className="w-8 h-8 text-emerald-600" />
              <div className="text-center">
                <p className="text-2xl font-serif text-emerald-900">
                  Free Shipping Australia-Wide
                </p>
                <p className="text-emerald-700">No minimum order • All products</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Options */}
        <section id="shipping" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-serif text-3xl text-stone-900 mb-8">
            Shipping Options
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => (
              <div key={index} className="bg-white border border-stone-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                  <option.icon className="w-5 h-5 text-stone-700" />
                </div>
                <p className="text-sm text-stone-500 mb-1">{option.region}</p>
                <h3 className="font-medium text-stone-900 mb-2">{option.method}</h3>
                <p className="text-stone-600 text-sm mb-3">{option.time}</p>
                <p className={`text-lg font-medium ${option.cost === 'FREE' ? 'text-emerald-600' : 'text-stone-900'}`}>
                  {option.cost}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500 mt-6">
            *Delivery times are estimates after dispatch. Production typically takes 2-3 business days.
          </p>
        </section>

        {/* Returns Policy */}
        <section id="returns" className="bg-stone-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-stone-900 mb-8">
              Returns & Satisfaction Guarantee
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6">
                <Package className="w-8 h-8 text-stone-700 mb-4" />
                <h3 className="font-medium text-stone-900 mb-2">Custom Products</h3>
                <p className="text-stone-600 text-sm">
                  Because each print is made to your specifications, we cannot accept returns for change of mind.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <Shield className="w-8 h-8 text-stone-700 mb-4" />
                <h3 className="font-medium text-stone-900 mb-2">Quality Guarantee</h3>
                <p className="text-stone-600 text-sm">
                  If there's any printing error, damage, or quality issue, we'll reprint or refund—no questions asked.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <RotateCcw className="w-8 h-8 text-stone-700 mb-4" />
                <h3 className="font-medium text-stone-900 mb-2">Damaged Items</h3>
                <p className="text-stone-600 text-sm">
                  Report any shipping damage within 7 days with photos. We'll send a free replacement immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* International Shipping */}
        <section id="international" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-serif text-3xl text-stone-900 mb-8">
            International Shipping
          </h2>
          <div className="prose-custom max-w-3xl">
            <p>
              We ship to most countries worldwide. International shipping rates are calculated
              at checkout based on your destination. Standard international delivery takes
              14-21 business days.
            </p>
            <p>
              Please note that international customers may be responsible for customs duties
              and import taxes. These charges are determined by your country's customs
              authorities and are not included in our shipping fees.
            </p>
            <h3>Countries We Ship To</h3>
            <p>
              We currently ship to: New Zealand, United Kingdom, United States, Canada,
              Germany, France, Netherlands, Ireland, Singapore, Hong Kong, and most
              other countries. If your country isn't available at checkout, please
              contact us.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-stone-50 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSchema faqs={faqs} showUI={true} title="Shipping & Returns FAQ" />
          </div>
        </section>
      </main>
    </>
  );
}
