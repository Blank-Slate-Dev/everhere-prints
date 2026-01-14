// src/components/seo/FAQSchema.tsx

'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { JsonLd } from './JsonLd';
import { generateFAQSchema } from '@/lib/seo/schemas';
import type { FAQItem } from '@/types/seo';

interface FAQSchemaProps {
  faqs: FAQItem[];
  showUI?: boolean;
  className?: string;
  title?: string;
}

/**
 * FAQ Schema component with optional interactive UI
 * Renders both JSON-LD schema and an accessible FAQ accordion
 */
export function FAQSchema({
  faqs,
  showUI = true,
  className = '',
  title = 'Frequently Asked Questions',
}: FAQSchemaProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter out undefined/null items from faqs array
  const validFaqs = (faqs ?? []).filter((faq): faq is FAQItem => faq != null);

  const schema = generateFAQSchema(validFaqs);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Don't render anything if no valid FAQs
  if (validFaqs.length === 0) {
    return null;
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <JsonLd data={schema} />

      {/* Interactive FAQ UI */}
      {showUI && (
        <section className={`${className}`} aria-labelledby="faq-title">
          <h2
            id="faq-title"
            className="text-2xl md:text-3xl font-light text-stone-900 mb-8"
          >
            {title}
          </h2>

          <div className="space-y-4">
            {validFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-stone-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-stone-50 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-medium text-stone-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-stone-500" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-stone-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/**
 * Pre-defined FAQs for product pages
 */
export const PRODUCT_FAQS: Record<string, FAQItem[]> = {
  general: [
    {
      question: 'How long does shipping take within Australia?',
      answer:
        'We offer free standard shipping Australia-wide. Orders are processed within 2-3 business days, and delivery typically takes 3-7 business days depending on your location. Express shipping options are available at checkout for faster delivery.',
    },
    {
      question: 'What paper quality do you use?',
      answer:
        'We use premium 250gsm matte art paper for all our prints. This archival-quality paper ensures vibrant colours that last a lifetime and provides a luxurious feel perfect for framing.',
    },
    {
      question: 'Do you offer framing options?',
      answer:
        'Yes! We offer a range of premium frame options including solid oak, black, and white frames. All frames come with museum-quality glass and acid-free mounting to protect your print.',
    },
    {
      question: 'Can I make changes after ordering?',
      answer:
        "We understand that sometimes you need to make changes. If your order hasn't entered production yet (usually within 24 hours), please contact us immediately and we'll do our best to accommodate your request.",
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to New Zealand, the United Kingdom, United States, Canada, and most European countries. International shipping rates and delivery times vary by destination.',
    },
  ],
  starMap: [
    {
      question: 'Are your star maps scientifically accurate?',
      answer:
        'Absolutely. Our star maps are generated using precise astronomical data that shows the exact position of stars, constellations, and celestial bodies from any date and location on Earth. Each map is as accurate as a professional planetarium projection.',
    },
    {
      question: 'How far back in time can I create a star map?',
      answer:
        'Our astronomical database allows you to create star maps for dates as far back as 1900 and forward to 2100. This covers all major life events including births, weddings, anniversaries, and historical dates.',
    },
    {
      question: 'Can I include multiple dates on one star map?',
      answer:
        "Our star maps focus on a single moment in time to ensure accuracy. However, we offer multi-panel designs where you can display multiple significant dates side by side, such as 'the night we met' and 'the night we married'.",
    },
  ],
  whereWeMet: [
    {
      question: 'What level of detail does the map show?',
      answer:
        'Our maps display detailed street-level information including roads, parks, water features, and building outlines. You can zoom in to show a specific neighbourhood or zoom out to capture an entire city.',
    },
    {
      question: 'Can I customise the map style?',
      answer:
        'Yes! We offer multiple map styles including modern minimal, classic vintage, and watercolour artistic styles. Each style can be customised with your choice of colours to match your décor.',
    },
    {
      question: 'Can I add a pin or marker to show the exact location?',
      answer:
        'Absolutely. You can add a heart marker, pin, or custom icon to highlight your special spot. The marker can be positioned anywhere on the map with precision.',
    },
  ],
  moonPhase: [
    {
      question: 'How accurate are the moon phase calculations?',
      answer:
        'Our moon phases are calculated using precise astronomical algorithms that account for your exact date and location. The phase shown represents the actual appearance of the moon as it would have been seen from your chosen location.',
    },
    {
      question: 'Can I create a moon phase print for any date?',
      answer:
        'Yes, you can create moon phase prints for any date from 1900 to 2100. This includes historical dates, future events, and any special moment you want to commemorate.',
    },
  ],
  soundWave: [
    {
      question: 'What audio files can I upload?',
      answer:
        'We accept MP3, WAV, and M4A audio files up to 30MB. This includes songs, voice messages, wedding vows, first words, heartbeats, and any audio that holds special meaning to you.',
    },
    {
      question: 'How long can the audio clip be?',
      answer:
        'For the best visual result, we recommend audio clips between 5 seconds and 5 minutes. Longer clips can be used but may result in a more compressed waveform. We can help you identify the perfect section to feature.',
    },
    {
      question: 'Can I include a QR code to play the audio?',
      answer:
        "Yes! We can add a scannable QR code to your print that links to your audio file. This creates an interactive experience where viewers can scan and hear the sound that's visualised in the art.",
    },
  ],
};

/**
 * General website FAQs
 */
export const WEBSITE_FAQS: FAQItem[] = [
  {
    question: 'What makes EverHere Prints different from other custom print services?',
    answer:
      'EverHere Prints is Australian-owned and operated, focusing on meaningful personalised artwork that captures your special moments. We use premium materials, offer precise scientific accuracy for our star maps and moon phases, and provide free shipping across Australia.',
  },
  {
    question: 'How do I design my personalised print?',
    answer:
      'Simply choose your product, enter your details (date, location, names), customise the design to your preferences, and preview your creation in real-time. Our intuitive designer makes it easy to create the perfect print in minutes.',
  },
  {
    question: 'What is your returns policy?',
    answer:
      'Because each print is custom-made to your specifications, we cannot accept returns for change of mind. However, if there is any error in printing or your item arrives damaged, we will happily reprint or refund your order.',
  },
  {
    question: 'Do you offer gift wrapping?',
    answer:
      'Yes! We offer elegant gift wrapping for an additional fee. Your print will arrive beautifully wrapped and ready to give, complete with a gift message if desired.',
  },
  {
    question: 'Can I get a digital version of my print?',
    answer:
      'We offer digital download options for all our products at a reduced price. Digital files are delivered as high-resolution PDFs suitable for professional printing.',
  },
];

export default FAQSchema;
