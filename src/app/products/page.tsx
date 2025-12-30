// src/app/products/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Map } from "lucide-react";
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
    image: "/products/map-preview.jpg",
    gradient: "from-brand-100 to-brand-200",
  },
  {
    id: "australia-map",
    title: "Australia Map",
    subtitle: "Watercolour Print",
    description:
      "Mark your special place on a stunning watercolour map of Australia. Choose from 11 beautiful colour options.",
    features: [
      "11 watercolour colours",
      "Artistic design",
      "Pin drop location",
      "Premium quality",
    ],
    href: "/create-australia",
    icon: Map,
    image: "/australia/australia_pastel_blue.png",
    gradient: "from-blue-50 to-blue-100",
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
            Select the perfect way to capture and display your special location.
            Both options are printed on premium archival paper.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Link href={product.href} className="block group">
                <div className="bg-white rounded-3xl overflow-hidden border border-brand-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  {/* Image Section */}
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br ${product.gradient} overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      {product.id === "australia-map" ? (
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
                              delay: 0.5,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="absolute"
                            style={{ left: "70%", top: "35%" }}
                          >
                            <MapPin
                              size={24}
                              className="text-blue-600 fill-blue-600 drop-shadow-lg"
                            />
                          </motion.div>
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
                  <div className="p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-brand-500 uppercase tracking-wide">
                          {product.subtitle}
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-charcoal mt-1">
                          {product.title}
                        </h2>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center group-hover:bg-charcoal transition-colors">
                        <product.icon
                          size={24}
                          className="text-brand-600 group-hover:text-white transition-colors"
                        />
                      </div>
                    </div>

                    <p className="text-brand-600 mb-6">{product.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
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
          All prints start from $59 AUD and include free delivery in Australia.
        </motion.p>
      </div>
    </div>
  );
}