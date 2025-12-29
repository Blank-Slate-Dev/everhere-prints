// src/components/home/Features.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Palette, Frame, Truck, Heart, Shield } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Any Location",
    description:
      "Search any address, landmark, or coordinates. From city streets to mountain peaks.",
  },
  {
    icon: Palette,
    title: "Multiple Styles",
    description:
      "Choose from minimal, night, or satellite views to match your aesthetic.",
  },
  {
    icon: Frame,
    title: "Premium Frames",
    description:
      "Optional handcrafted frames in black, white, or natural oak.",
  },
  {
    icon: Truck,
    title: "Free Delivery over $149",
    description:
      "Carefully packaged and delivered to your door within 3 - 5 days.",
  },
  {
    icon: Heart,
    title: "Made With Love",
    description:
      "Each print is created with care using premium archival paper.",
  },
  {
    icon: Shield,
    title: "Satisfaction Guaranteed",
    description:
      "Not happy? We'll make it right or give you a full refund.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal">
            Why choose EverHere Prints?
          </h2>
          <p className="mt-4 text-lg text-brand-600 max-w-2xl mx-auto">
            We combine beautiful design with premium quality to create prints
            you&apos;ll treasure forever.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-cream hover:bg-brand-50 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                <feature.icon className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">
                {feature.title}
              </h3>
              <p className="text-brand-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}