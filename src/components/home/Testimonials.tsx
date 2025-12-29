// src/components/home/Testimonials.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  // Australia - 10 testimonials
  {
    name: "Emily R.",
    location: "Sydney, NSW",
    rating: 5,
    text: "Absolutely beautiful print! I surprised my partner with this for our anniversary and he loved it. The quality is stunning and it arrived quicker than expected.",
    occasion: "Anniversary Gift",
  },
  {
    name: "Liam H.",
    location: "Melbourne, VIC",
    rating: 5,
    text: "Such a meaningful way to remember where we got engaged. The night style looks incredible in our living room. Couldn't be happier with it.",
    occasion: "Engagement Gift",
  },
  {
    name: "Sophie & Tom",
    location: "Brisbane, QLD",
    rating: 5,
    text: "We ordered a print of our wedding venue and it turned out even better than we imagined. It's now one of our favourite pieces in our home.",
    occasion: "Wedding Gift",
  },
  {
    name: "James M.",
    location: "Perth, WA",
    rating: 5,
    text: "Got this for my parents' 30th anniversary — the place they first met. Mum was in tears. Beautifully made and the packaging was perfect.",
    occasion: "Anniversary Gift",
  },
  {
    name: "Olivia K.",
    location: "Adelaide, SA",
    rating: 5,
    text: "I've bought three of these now as gifts and every single person has loved them. The satellite style is my favourite — so detailed and unique.",
    occasion: "Birthday Gift",
  },
  {
    name: "Noah & Mia",
    location: "Gold Coast, QLD",
    rating: 5,
    text: "We created a print of the beach where Noah proposed. It's hanging in our hallway and we get compliments on it all the time. Highly recommend!",
    occasion: "Engagement Gift",
  },
  {
    name: "Charlotte W.",
    location: "Hobart, TAS",
    rating: 5,
    text: "The minimal style is absolutely gorgeous. I ordered one for our first home and it captures the area perfectly. Will definitely order again.",
    occasion: "First Home",
  },
  {
    name: "Jack T.",
    location: "Canberra, ACT",
    rating: 5,
    text: "Gave this to my girlfriend for Valentine's Day — the spot where we had our first date. She absolutely loved it. Great quality print.",
    occasion: "Valentine's Gift",
  },
  {
    name: "Ava & Ben",
    location: "Darwin, NT",
    rating: 5,
    text: "We wanted something special to remember our road trip proposal at Uluru. This print is perfect — the colours and detail are amazing.",
    occasion: "Engagement Gift",
  },
  {
    name: "Isabella J.",
    location: "Newcastle, NSW",
    rating: 5,
    text: "Ordered the night style for our apartment and it looks so elegant. The frame quality exceeded my expectations. Fast shipping too!",
    occasion: "Home Decor",
  },
  // New Zealand - 2 testimonials
  {
    name: "Hannah & Luke",
    location: "Auckland, NZ",
    rating: 5,
    text: "We created a print of Waiheke Island where we got married. It's absolutely stunning and brings back all the memories every time we look at it.",
    occasion: "Wedding Gift",
  },
  {
    name: "Sam P.",
    location: "Wellington, NZ",
    rating: 5,
    text: "Bought this for my wife's birthday — the café where we first met years ago. She was so touched. The print quality is exceptional.",
    occasion: "Birthday Gift",
  },
];

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const getCurrentTestimonials = () => {
    const start = currentPage * testimonialsPerPage;
    return testimonials.slice(start, start + testimonialsPerPage);
  };

  const nextPage = useCallback(() => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  };

  // Auto-scroll every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextPage();
    }, 8000);

    return () => clearInterval(interval);
  }, [nextPage]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal">
            Loved by thousands
          </h2>
          <p className="mt-4 text-lg text-brand-600 max-w-2xl mx-auto">
            Join over 8,000 happy customers across Australia and New Zealand
            who have captured their special places with EverHere Prints.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-charcoal hover:bg-brand-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-charcoal hover:bg-brand-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} />
          </button>

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="grid md:grid-cols-3 gap-6 lg:gap-8"
              >
                {getCurrentTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={`${currentPage}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm"
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-charcoal mb-6 leading-relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-charcoal">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-brand-600">
                          {testimonial.location}
                        </p>
                      </div>
                      <span className="text-xs px-3 py-1 bg-brand-100 text-brand-700 rounded-full whitespace-nowrap">
                        {testimonial.occasion}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentPage === index
                    ? "w-8 h-2 bg-charcoal"
                    : "w-2 h-2 bg-brand-300 hover:bg-brand-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}