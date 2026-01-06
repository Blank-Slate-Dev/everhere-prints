// src/app/contact/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, JsonLd } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';

export const metadata: Metadata = genMeta({
  title: 'Contact Us | EverHere Prints',
  description:
    'Get in touch with EverHere Prints. Questions about your order, custom requests, or just want to say hello? We\'re here to help.',
  keywords: ['contact everhere prints', 'customer support', 'help', 'questions'],
  path: '/contact',
});

const contactMethods = [
  {
    title: 'Email Us',
    description: 'For general enquiries and support',
    value: 'hello@everhereprints.com.au',
    href: 'mailto:hello@everhereprints.com.au',
    icon: Mail,
    response: 'We typically respond within 24 hours',
  },
  {
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    value: 'Available 9am-5pm AEST',
    href: '#chat',
    icon: MessageCircle,
    response: 'Instant responses during business hours',
  },
];

const faqs = [
  { question: 'Where is my order?', link: '/order-tracking' },
  { question: 'Can I change my order?', link: '/faq#changes' },
  { question: 'What\'s your returns policy?', link: '/shipping-returns' },
  { question: 'Do you ship internationally?', link: '/shipping-returns#international' },
];

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact EverHere Prints',
    description: 'Get in touch with EverHere Prints for questions, support, or custom requests.',
    url: `${SITE_CONFIG.url}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.business.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: SITE_CONFIG.business.email,
        availableLanguage: 'English',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      },
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />

      <main id="main-content" className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-stone-600">
              Have a question about your order, need help with a custom request,
              or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                className="bg-white border border-stone-200 rounded-2xl p-8 hover:border-stone-300 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-stone-700" />
                </div>
                <h2 className="font-medium text-xl text-stone-900 mb-2">
                  {method.title}
                </h2>
                <p className="text-stone-500 text-sm mb-4">{method.description}</p>
                <p className="text-stone-900 font-medium mb-2">{method.value}</p>
                <p className="text-sm text-stone-500">{method.response}</p>
              </a>
            ))}
          </div>

          {/* Business Hours */}
          <div className="max-w-xl mx-auto bg-stone-100 rounded-2xl p-8 mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-stone-600" />
              <h2 className="font-medium text-stone-900">Business Hours</h2>
            </div>
            <div className="space-y-2 text-stone-600">
              <p>Monday - Friday: 9:00am - 5:00pm AEST</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-stone-200">
              <MapPin className="w-5 h-5 text-stone-600" />
              <p className="text-stone-600">Sydney, NSW, Australia</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="max-w-xl mx-auto">
            <h2 className="font-medium text-stone-900 mb-4">
              Looking for quick answers?
            </h2>
            <div className="space-y-2">
              {faqs.map((faq) => (
                <Link
                  key={faq.question}
                  href={faq.link}
                  className="block py-3 px-4 bg-white border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  {faq.question}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
