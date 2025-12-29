// src/components/home/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import { Search, Sliders, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Place",
    description:
      "Search for any location in the world. The place you met, got married, or made a special memory.",
  },
  {
    icon: Sliders,
    title: "Customise Your Print",
    description:
      "Choose your map style, add your names, a special date, and personalise the title.",
  },
  {
    icon: ShoppingBag,
    title: "Order & Enjoy",
    description:
      "Select your size and frame option. We'll print and ship your artwork with care.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal">
            How it works
          </h2>
          <p className="mt-4 text-lg text-brand-600 max-w-2xl mx-auto">
            Create your personalised map print in just a few simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-brand-200" />
              )}

              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <div className="relative w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-brand-600" />
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-brand-600 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
