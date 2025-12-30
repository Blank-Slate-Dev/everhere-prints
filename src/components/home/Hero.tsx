// src/components/home/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
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

          {/* Right Column - Photo Frame Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end lg:translate-x-12"
          >
            {/* Decorative blur elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 right-0 w-40 h-40 bg-brand-200 rounded-full opacity-50 blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 left-0 w-48 h-48 bg-brand-300 rounded-full opacity-40 blur-3xl"
            />

            {/* Photo Frame */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src="/photoframe.png"
                alt="Personalised map print in a black frame showing Sydney, Australia - Where We Met"
                width={797}
                height={694}
                priority
                className="w-full h-auto"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}