// src/app/products/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Map, Star } from "lucide-react";
import Button from "@/components/ui/Button";

const products = [
  {
    id: "where-we-met",
    title: "Where We Met",
    subtitle: "Custom Map Print",
    description:
      "Create a beautiful, detailed map print of any location in Australia or New Zealand. Choose from minimal, night, or satellite styles.",
    features: [
      "Any location worldwide",
      "Multiple map styles",
      "Custom zoom levels",
      "Precise coordinates",
    ],
    href: "/create",
    icon: MapPin,
    image: null,
    previewType: "map",
    gradient: "from-brand-100 to-brand-200",
  },
  {
    id: "australia-map",
    title: "Australia Map",
    subtitle: "Watercolour Print",
    description:
      "Mark your special place on a stunning watercolour map of Australia. Choose from 12 beautiful colour options.",
    features: [
      "12 watercolour colours",
      "Artistic design",
      "Pin drop location",
      "Premium quality",
    ],
    href: "/create-australia",
    icon: Map,
    image: "/australia_pastel_blue.png",
    previewType: "watercolor",
    gradient: "from-blue-50 to-blue-100",
  },
  {
    id: "newzealand-map",
    title: "New Zealand Map",
    subtitle: "Watercolour Print",
    description:
      "Mark your special place on a beautiful watercolour map of New Zealand. Choose from 12 stunning colour options.",
    features: [
      "12 watercolour colours",
      "Artistic design",
      "Pin drop location",
      "Premium quality",
    ],
    href: "/create-newzealand",
    icon: Map,
    image: "/new_zealand_pastel_blue.png",
    previewType: "watercolor",
    gradient: "from-emerald-50 to-emerald-100",
  },
  {
    id: "star-map",
    title: "Star Map",
    subtitle: "Night Sky Print",
    description:
      "Capture the exact night sky from any date and location. Perfect for birthdays, anniversaries, or that unforgettable night.",
    features: [
      "Any date since 1900",
      "Accurate star positions",
      "Constellation lines",
      "Multiple colour styles",
    ],
    href: "/create-starmap",
    icon: Star,
    image: null,
    previewType: "starmap",
    gradient: "from-indigo-900 to-purple-900",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="text-3xl lg:text-5xl font-serif font-semibold text-charcoal">
            Choose Your Print Style
          </h1>
          <p className="mt-4 text-lg text-brand-600 max-w-2xl mx-auto">
            Select the perfect way to capture and display your special moment.
            All prints are made on premium archival paper.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={product.href} className="block group h-full">
                <div className="h-full bg-white rounded-3xl overflow-hidden border border-brand-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 flex flex-col">
                  {/* Image Section */}
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br ${product.gradient} overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      {product.image ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Animated pin */}
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              delay: 0.5 + index * 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="absolute"
                            style={{
                              left: product.id === "australia-map" ? "70%" : "55%",
                              top: product.id === "australia-map" ? "35%" : "25%",
                            }}
                          >
                            <MapPin
                              size={24}
                              className="drop-shadow-lg"
                              style={{
                                color: product.id === "australia-map" ? "#0369A1" : "#047857",
                                fill: product.id === "australia-map" ? "#0369A1" : "#047857",
                              }}
                            />
                          </motion.div>
                        </div>
                      ) : product.previewType === "starmap" ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Star Map Preview */}
                          <div className="relative w-48 h-48 rounded-full overflow-hidden">
                            {/* Dark sky background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950" />
                            {/* Stars */}
                            <div className="absolute inset-0">
                              {[...Array(50)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                  }}
                                  className="absolute rounded-full bg-white"
                                  style={{
                                    width: `${1 + Math.random() * 2}px`,
                                    height: `${1 + Math.random() * 2}px`,
                                    left: `${5 + Math.random() * 90}%`,
                                    top: `${5 + Math.random() * 90}%`,
                                    boxShadow: "0 0 4px rgba(255,255,255,0.8)",
                                  }}
                                />
                              ))}
                            </div>
                            {/* Constellation lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-40">
                              <line x1="30%" y1="25%" x2="45%" y2="35%" stroke="white" strokeWidth="1" />
                              <line x1="45%" y1="35%" x2="55%" y2="30%" stroke="white" strokeWidth="1" />
                              <line x1="55%" y1="30%" x2="70%" y2="40%" stroke="white" strokeWidth="1" />
                              <line x1="45%" y1="35%" x2="50%" y2="55%" stroke="white" strokeWidth="1" />
                              <line x1="50%" y1="55%" x2="40%" y2="70%" stroke="white" strokeWidth="1" />
                              <line x1="50%" y1="55%" x2="60%" y2="70%" stroke="white" strokeWidth="1" />
                            </svg>
                            {/* Circular border */}
                            <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                          </div>
                          {/* Frame effect */}
                          <div className="absolute inset-8 border-4 border-white/10 rounded-lg pointer-events-none" />
                        </div>
                      ) : (
                        <div className="relative w-full h-full bg-white rounded-xl shadow-lg p-4">
                          {/* Placeholder for map preview */}
                          <div className="w-full h-full bg-brand-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <product.icon
                                size={48}
                                className="mx-auto text-brand-400 mb-2"
                              />
                              <p className="text-xs text-brand-500 uppercase tracking-wide">
                                Map Preview
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 lg:p-8 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-brand-500 uppercase tracking-wide">
                          {product.subtitle}
                        </p>
                        <h2 className="text-xl lg:text-2xl font-serif font-semibold text-charcoal mt-1">
                          {product.title}
                        </h2>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center group-hover:bg-charcoal transition-colors flex-shrink-0">
                        <product.icon
                          size={20}
                          className="text-brand-600 group-hover:text-white transition-colors"
                        />
                      </div>
                    </div>

                    <p className="text-brand-600 mb-6 text-sm">{product.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-grow">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-brand-700"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button fullWidth className="group/btn">
                      Create {product.title}
                      <ArrowRight
                        size={18}
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-brand-500 mt-12"
        >
          All prints start from $59 AUD and include free delivery in Australia & New Zealand.
        </motion.p>
      </div>
    </div>
  );
}