// src/components/home/FeaturedStory.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, Music, Heart } from "lucide-react";

export default function FeaturedStory() {
  return (
    <section className="py-24 lg:py-32 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-500 text-sm font-medium tracking-wider uppercase">
            Turn Sound Into Art
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-charcoal">
            Every song tells a story
          </h2>
          <p className="mt-4 text-lg text-brand-700 max-w-2xl mx-auto">
            From wedding first dances to baby's first words — transform the sounds 
            that matter most into stunning wall art.
          </p>
        </motion.div>

        {/* Featured Example */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Container with curved edges and gradient fade overlay */}
            <div className="relative rounded-[60px] overflow-hidden">
              <Image
                src="/apartment_Taylor_Swift_Preview.png"
                alt="Sound Wave Art print example - Shake It Off by Taylor Swift with Melbourne skyline view"
                width={1536}
                height={1024}
                className="w-full h-auto"
                style={{
                  filter: "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.1))",
                }}
                priority
              />
              
              {/* Gradient overlay to fade edges into background */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse 90% 85% at 50% 50%, 
                      transparent 50%, 
                      rgba(250, 250, 249, 0.4) 70%,
                      rgba(250, 250, 249, 0.8) 85%,
                      rgb(250, 250, 249) 100%
                    )
                  `,
                }}
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:pl-8"
          >
            {/* Song badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-brand-100 mb-6">
              <Music size={16} className="text-brand-500" />
              <span className="text-sm font-medium text-charcoal">
                Melbourne, Australia
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-charcoal mb-4">
              The song that makes you smile
            </h3>

            <p className="text-brand-700 leading-relaxed mb-6">
              Some songs transport you instantly — to your wedding day, the road trip 
              that changed everything, or that moment you knew. Sound Wave Art captures 
              the invisible music that shapes our lives and turns it into something beautiful.
            </p>

            <p className="text-brand-700 leading-relaxed mb-8">
              Our <span className="font-medium text-charcoal">Sound Wave</span> prints 
              visualise your favourite audio as stunning waveform art. Upload any song, 
              voice message, or recording — we'll transform it into a unique piece 
              that's as personal as the memory itself.
            </p>

            {/* Features list */}
            <div className="space-y-3 mb-8">
              {[
                "Upload any audio — songs, voice notes, or recordings",
                "Six beautiful colour styles to match your space",
                "Add custom lyrics, titles, and dates",
                "Premium 250gsm archival paper",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center mt-0.5">
                    <Heart size={12} className="text-brand-500" fill="currentColor" />
                  </div>
                  <span className="text-brand-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/create-soundwave">
              <Button size="lg" className="group">
                Create Your Sound Wave
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Additional Examples Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-brand-600 mb-6">
            Popular sounds our customers have printed
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Wedding First Dance",
              "Baby's Heartbeat",
              "Voice Message",
              "Favourite Song",
              "Wedding Vows",
              "First Words",
            ].map((sound) => (
              <span
                key={sound}
                className="px-4 py-2 bg-white rounded-full text-sm text-brand-700 border border-brand-100 shadow-sm"
              >
                {sound}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}