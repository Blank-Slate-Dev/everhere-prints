// src/app/journey-map/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Route, MapPin, Plane, Heart, Check, Car } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd, ProductSchema } from '@/components/seo';
import { SITE_CONFIG } from '@/lib/seo/constants';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Journey Map Print | Custom Route & Travel Map | EverHere Prints',
  description:
    'Create a beautiful custom journey map showing your travels, road trips, or the path that brought you together. Trace your adventures on a stunning personalised print.',
  keywords: [
    'journey map',
    'custom route map',
    'travel map print',
    'road trip map',
    'adventure map personalised',
    'custom travel poster',
    'route map gift',
    'trip map print',
    'honeymoon route map',
    'travel memories print',
  ],
  path: '/journey-map',
  image: '/images/og/journey-map.jpg',
});

const features = [
  {
    title: 'Multiple Stops',
    description: 'Add as many locations as you need—from weekend trips to year-long adventures.',
    icon: MapPin,
  },
  {
    title: 'Custom Routes',
    description: 'Show the exact path you took, whether by road, air, or sea.',
    icon: Route,
  },
  {
    title: 'Travel Icons',
    description: 'Add planes, cars, boats, or custom markers for each leg of your journey.',
    icon: Plane,
  },
  {
    title: 'Date Labels',
    description: 'Mark each stop with dates to create a visual timeline of your travels.',
    icon: Heart,
  },
];

const useCases = [
  {
    title: 'Road Trip Memories',
    description: 'Capture your epic road trip from start to finish. Every stop, every detour, every adventure.',
    image: '/images/journey-map/road-trip.jpg',
  },
  {
    title: 'Honeymoon Journey',
    description: 'Trace your honeymoon route across countries or continents. A beautiful keepsake of your first adventure as a married couple.',
    image: '/images/journey-map/honeymoon.jpg',
  },
  {
    title: 'Gap Year Adventures',
    description: 'Document your gap year travels across multiple countries. Show everywhere you explored.',
    image: '/images/journey-map/gap-year.jpg',
  },
  {
    title: 'How We Met Journey',
    description: 'Show the path that brought you together—from different cities, countries, or even continents.',
    image: '/images/journey-map/how-we-met.jpg',
  },
  {
    title: 'Family History',
    description: 'Map your family\'s migration story across generations. A meaningful tribute to your heritage.',
    image: '/images/journey-map/family-history.jpg',
  },
  {
    title: 'Annual Travel Summary',
    description: 'Celebrate a year of adventures by mapping everywhere you travelled together.',
    image: '/images/journey-map/annual-travel.jpg',
  },
];

const faqs: FAQItem[] = [
  {
    question: 'How many stops can I add to my journey map?',
    answer: 'You can add as many stops as you need! Whether it\'s a simple A-to-B route or a complex multi-country journey with 20+ stops, we can accommodate your adventure. For very complex routes, we\'ll work with you to ensure the design remains clear and beautiful.',
  },
  {
    question: 'Can I show different types of travel on the same map?',
    answer: 'Absolutely! You can combine flights, road trips, train journeys, and sea voyages on a single map. We use different line styles and icons to distinguish between travel modes—dashed lines for flights, solid for roads, etc.',
  },
  {
    question: 'What if my journey covers multiple countries or continents?',
    answer: 'Our journey maps can span any geographic area—from a single city to a round-the-world trip. We\'ll automatically adjust the map scale and style to best display your complete journey while keeping important details visible.',
  },
  {
    question: 'Can I add photos or notes to specific stops?',
    answer: 'The print version focuses on the map and route for clarity, but you can add custom labels and dates to each stop. For a more detailed scrapbook-style layout with photos, contact us about our custom design service.',
  },
  {
    question: 'How accurate are the routes shown?',
    answer: 'We use real geographic data to plot accurate routes between your stops. For road trips, we can show the actual roads taken. For flights, we show great circle routes (the curved paths planes actually fly).',
  },
];

export default function JourneyMapPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Custom Journey Map Print',
    description: 'Create a beautiful custom journey map showing your travels, road trips, or the path that brought you together. Personalised print capturing your adventures.',
    image: [
      `${SITE_CONFIG.url}/images/products/journey-map-1.jpg`,
      `${SITE_CONFIG.url}/images/products/journey-map-2.jpg`,
    ],
    brand: { '@type': 'Brand', name: 'EverHere Prints' },
    sku: 'JOURNEY-MAP-001',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: 69,
      highPrice: 229,
      offerCount: 12,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <JsonLd data={productSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'Journey Map', href: '/journey-map' }]} />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
                <Route className="w-4 h-4" />
                New Product
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                Journey Map Print
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-6">
                Trace your adventures on a stunning custom map. From road trips
                to round-the-world journeys, capture every stop along the way
                in a beautiful personalised print.
              </p>
              <p className="text-stone-600 mb-8">
                Perfect for honeymoons, gap years, family trips, or mapping the
                path that brought you together.
              </p>
              
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <span className="text-3xl font-serif text-stone-900">From $69</span>
                  <span className="text-stone-500 ml-2">AUD</span>
                </div>
                <div className="text-sm text-stone-500">
                  Free AU shipping • Premium quality
                </div>
              </div>

              <Link
                href="#create"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors"
              >
                Create Your Journey Map
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative aspect-square">
              <Image
                src="/images/products/journey-map-hero.jpg"
                alt="Custom journey map print showing travel route"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">
              Map Your Adventure, Your Way
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-stone-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-stone-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
              Perfect for Every Adventure
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Whether it's a weekend getaway or the trip of a lifetime, 
              a journey map captures your travels beautifully.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="group">
                <div className="relative aspect-[4/3] mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2">{useCase.title}</h3>
                <p className="text-stone-600 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-stone-900 text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: 1, title: 'Add Your Stops', desc: 'Enter each location from your journey' },
                { step: 2, title: 'Customise Route', desc: 'Choose travel modes and route style' },
                { step: 3, title: 'Personalise Design', desc: 'Add dates, labels, and choose colours' },
                { step: 4, title: 'Order Print', desc: 'Select size, frame, and checkout' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-serif">
                    {item.step}
                  </div>
                  <h3 className="font-medium text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FAQSchema faqs={faqs} showUI={true} title="Journey Map Questions" />
        </section>

        {/* CTA Section */}
        <section id="create" className="bg-stone-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Car className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Ready to Map Your Journey?
            </h2>
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Create a beautiful print that captures every stop along the way.
              Free Australian shipping on all orders.
            </p>
            <Link
              href="/journey-map/create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-500 transition-colors"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
