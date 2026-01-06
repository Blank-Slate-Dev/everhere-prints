// src/app/faq/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import { PRODUCT_FAQS, WEBSITE_FAQS } from '@/components/seo/FAQSchema';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Frequently Asked Questions | EverHere Prints',
  description:
    'Find answers to common questions about our personalised prints, ordering, shipping, and more. Get help with star maps, location prints, and custom artwork.',
  keywords: [
    'faq',
    'frequently asked questions',
    'help',
    'star map questions',
    'custom print help',
    'shipping questions',
  ],
  path: '/faq',
});

// Organize FAQs by category
const faqCategories = [
  {
    id: 'ordering',
    title: 'Ordering & Payment',
    faqs: [
      {
        question: 'How do I place an order?',
        answer: 'Simply choose your product (star map, location map, moon phase, or soundwave), use our online designer to customise it with your details, preview your design, select your size and frame options, then proceed to checkout. The whole process takes just a few minutes.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Afterpay for buy-now-pay-later. All payments are processed securely through Stripe.',
      },
      {
        question: 'Can I change my order after placing it?',
        answer: 'If your order hasn\'t entered production (usually within 24 hours), contact us immediately and we\'ll try to accommodate changes. Once production has started, we cannot make modifications as each print is custom-made.',
      },
      {
        question: 'Do you offer gift vouchers?',
        answer: 'Yes! Gift vouchers are perfect when you want to give a personalised print but let the recipient choose their own design. Vouchers are delivered instantly via email and never expire.',
      },
    ],
  },
  {
    id: 'products',
    title: 'Our Products',
    faqs: PRODUCT_FAQS.general,
  },
  {
    id: 'star-maps',
    title: 'Star Maps',
    faqs: PRODUCT_FAQS.starMap,
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    faqs: [
      {
        question: 'How long does shipping take?',
        answer: 'Production takes 2-3 business days. Standard Australian shipping then takes 3-7 business days (free). Express shipping (1-3 days) is available for $12.95. International orders take 14-21 business days.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship to New Zealand ($15), UK, USA, Canada, and most European countries ($25). International delivery typically takes 14-21 business days.',
      },
      {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive an email with a tracking number. Use this on the Australia Post website (domestic) or the relevant carrier for international shipments.',
      },
      {
        question: 'Is shipping really free in Australia?',
        answer: 'Yes! We offer free standard shipping on all orders within Australia with no minimum order value. This applies to all products including framed items.',
      },
    ],
  },
  {
    id: 'quality',
    title: 'Quality & Materials',
    faqs: [
      {
        question: 'What paper do you use?',
        answer: 'We use premium 250gsm archival matte paper for all prints. This museum-quality paper is acid-free and designed to last 100+ years without fading or yellowing.',
      },
      {
        question: 'What frame options are available?',
        answer: 'We offer solid wood frames in Black, White, and Natural Oak. Frames include a perspex front (safer than glass for shipping) and come ready to hang with mounting hardware included.',
      },
      {
        question: 'What sizes are available?',
        answer: 'Our standard sizes are A4 (21×30cm), A3 (30×42cm), and A2 (42×59cm). We can also accommodate custom sizes for bulk or special orders—contact us for details.',
      },
      {
        question: 'How do I care for my print?',
        answer: 'Display your print away from direct sunlight to prevent fading. For framed prints, simply dust occasionally with a soft cloth. Unframed prints should be handled by the edges and stored flat.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Issues',
    faqs: [
      {
        question: 'What is your returns policy?',
        answer: 'Because each print is custom-made to your specifications, we cannot accept returns for change of mind. However, if there\'s any printing error, damage, or quality issue, we\'ll reprint or refund—no questions asked.',
      },
      {
        question: 'What if my order arrives damaged?',
        answer: 'Contact us within 7 days with photos of the damage. We\'ll arrange a free replacement immediately. We package carefully, but transit damage occasionally happens.',
      },
      {
        question: 'What if there\'s an error on my print?',
        answer: 'If we made an error (wrong date, spelling mistake we introduced), we\'ll reprint for free. If the error was in the information you provided, we\'ll offer a discounted reprint.',
      },
    ],
  },
];

export default function FAQPage() {
  // Combine all FAQs for schema
  const allFaqs: FAQItem[] = faqCategories.flatMap((cat) => cat.faqs);

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'EverHere Prints FAQ',
    description: 'Frequently asked questions about personalised prints, ordering, and shipping.',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqPageSchema} />

      <main id="main-content" className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'FAQ', href: '/faq' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-stone-600">
              Find answers to common questions about our personalised prints,
              ordering process, shipping, and more.
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="border-y border-stone-200 bg-stone-50 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap gap-4">
              {faqCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-4 py-2 bg-white rounded-full text-sm text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {faqCategories.map((category) => (
            <div key={category.id} id={category.id} className="mb-16 scroll-mt-24">
              <h2 className="font-serif text-2xl text-stone-900 mb-6 pb-4 border-b border-stone-200">
                {category.title}
              </h2>
              <FAQSchema faqs={category.faqs} showUI={true} showSchema={false} />
            </div>
          ))}
        </section>

        {/* Contact CTA */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl text-stone-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-stone-600 mb-6">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
