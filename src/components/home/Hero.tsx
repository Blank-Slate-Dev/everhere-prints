// src/components/home/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #d5c8bf 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream" />

      {/* Use same container as Header for alignment */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-charcoal leading-tight">
              Mark the moments
              <br />
              <span className="text-brand-500">that matter</span>
            </h1>

            <p className="mt-6 text-lg text-brand-700 max-w-lg">
              Create a beautiful, personalised map print of the place where your
              story began. Perfect for anniversaries, weddings, and the memories
              you never want to forget.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/create">
                <Button size="lg" className="group">
                  Create Your Map
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="text-center">
                <p className="text-2xl font-semibold text-charcoal">8,000+</p>
                <p className="text-sm text-brand-600">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-brand-200" />
              <div className="text-center">
                <p className="text-2xl font-semibold text-charcoal">4.6★</p>
                <p className="text-sm text-brand-600">Average Rating</p>
              </div>
              <div className="w-px h-10 bg-brand-200" />
              <div className="text-center">
                <p className="text-2xl font-semibold text-charcoal">Australia Made</p>
                <p className="text-sm text-brand-600">Premium Quality</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Preview Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Frame */}
              <div className="absolute inset-0 bg-white rounded-lg print-frame-shadow p-4">
                {/* Map Preview Placeholder */}
                <div className="w-full h-full bg-brand-100 rounded overflow-hidden relative">
                  {/* Stylized Map Pattern */}
                  <div className="absolute inset-0 opacity-50">
                    <svg viewBox="0 0 400 500" className="w-full h-full" fill="none">
                      <path
                        d="M50 100 Q 150 50, 200 150 T 350 200"
                        stroke="#d5c8bf"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M80 250 Q 180 200, 230 300 T 380 350"
                        stroke="#d5c8bf"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="200" cy="250" r="8" fill="#9a8070" />
                      <circle
                        cx="200"
                        cy="250"
                        r="20"
                        stroke="#9a8070"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                      />
                    </svg>
                  </div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-500 mb-2">
                      Where We Met
                    </p>
                    <p className="font-serif text-xl text-charcoal">
                      Newcastle, Australia
                    </p>
                    <p className="text-sm text-brand-600 mt-1">
                      Emma & Oakley • 18.03.2020
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-brand-200 rounded-full opacity-60 blur-2xl"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-300 rounded-full opacity-40 blur-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}