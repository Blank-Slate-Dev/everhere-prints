// src/components/home/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Sliders, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Place",
    description:
      "Search for any location — the place you met, got married, or made a special memory.",
  },
  {
    icon: Sliders,
    title: "Customise Your Print",
    description:
      "Choose your style, add names, a date, and personalise the title.",
  },
  {
    icon: ShoppingBag,
    title: "Order & Enjoy",
    description:
      "Select size and frame. We'll print and ship your artwork with care.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal">
            How it works
          </h2>
          <p className="mt-4 text-lg text-brand-600 max-w-2xl mx-auto">
            Create your personalised map print in just a few simple steps.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Photo Frame Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-start"
          >
            {/* Decorative blur elements */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 left-0 w-40 h-40 bg-brand-200 rounded-full opacity-40 blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 right-0 w-48 h-48 bg-brand-300 rounded-full opacity-30 blur-3xl"
            />

            {/* Photo Frame */}
            <div className="relative w-full max-w-sm lg:max-w-md">
              <Image
                src="/photoframe2.png"
                alt="Beautiful personalised map print in a frame"
                width={797}
                height={694}
                className="w-full h-auto"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.2))",
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - Steps */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
                className="flex gap-5"
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-charcoal text-white text-xs font-semibold rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-brand-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Connector Line (visible on larger screens) */}
            <div className="hidden lg:block absolute left-7 top-14 bottom-14 w-px bg-brand-200" style={{ marginLeft: '0' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
