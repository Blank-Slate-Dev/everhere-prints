// src/components/home/LifestyleShowcase.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function LifestyleShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal">
            Art that tells your story
          </h2>
          <p className="mt-4 text-lg text-brand-600 max-w-2xl mx-auto">
            Our watercolour map prints transform your special places into stunning wall art 
            that sparks conversation and brings warmth to any room.
          </p>
        </motion.div>

        {/* Lifestyle Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Background gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-transparent to-brand-50/30 rounded-3xl" />
          
          {/* Image Container */}
          <div className="relative mx-auto max-w-5xl">
            <Image
              src="/lounge_room2_nz_map.png"
              alt="New Zealand watercolour map prints displayed in a modern living room with oak frames"
              width={1536}
              height={1024}
              className="w-full h-auto"
              priority={false}
            />
          </div>

          {/* Floating Product Cards - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block absolute left-4 xl:left-8 top-1/3 -translate-y-1/2"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-brand-100 max-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <div className="w-5 h-5 rounded-full bg-blue-500" />
              </div>
              <p className="font-semibold text-charcoal text-sm">Ocean Blue</p>
              <p className="text-xs text-brand-500 mt-1">Most popular choice</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden lg:block absolute right-4 xl:right-8 top-1/3 -translate-y-1/2"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-brand-100 max-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-3">
                <div className="w-5 h-5 rounded-full bg-red-500" />
              </div>
              <p className="font-semibold text-charcoal text-sm">Coral Red</p>
              <p className="text-xs text-brand-500 mt-1">Bold & vibrant</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 lg:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: "12 Colours", sublabel: "To match any décor" },
            { label: "Oak Frames", sublabel: "Handcrafted quality" },
            { label: "Premium Paper", sublabel: "Archival quality" },
            { label: "Free Shipping", sublabel: "AU & NZ wide" },
          ].map((item, index) => (
            <div key={item.label} className="text-center">
              <p className="font-semibold text-charcoal">{item.label}</p>
              <p className="text-sm text-brand-500 mt-0.5">{item.sublabel}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 lg:mt-12 text-center"
        >
          <Link href="/create-newzealand">
            <Button size="lg" className="group">
              Create Your New Zealand Map
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}