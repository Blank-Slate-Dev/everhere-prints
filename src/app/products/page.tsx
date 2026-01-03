// src/app/products/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Map, Star, Moon, Music } from "lucide-react";
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
  {
    id: "moon-phase",
    title: "Moon Phase",
    subtitle: "Lunar Print",
    description:
      "Capture the exact moon phase from any date. A beautiful, minimalist way to commemorate births, weddings, and special nights.",
    features: [
      "Accurate moon phase",
      "Any date in history",
      "6 elegant styles",
      "Phase name included",
    ],
    href: "/create-moonphase",
    icon: Moon,
    image: null,
    previewType: "moonphase",
    gradient: "from-slate-800 to-slate-900",
  },
  {
    id: "sound-wave",
    title: "Sound Wave",
    subtitle: "Audio Print",
    description:
      "Transform your favourite song into stunning wall art. Features the full waveform, album art, and your chosen lyrics.",
    features: [
      "Full song waveform",
      "Album artwork",
      "Custom lyrics",
      "Multiple styles",
    ],
    href: "/create-soundwave",
    icon: Music,
    image: null,
    previewType: "soundwave",
    gradient: "from-purple-900 to-pink-900",
  },
];

// Moon phase with two shadows that hand off at full moon
function AnimatedMoonPhase() {
  const duration = 8;
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Glow effect */}
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -inset-8 rounded-full bg-white/20 blur-2xl" 
        />
        
        {/* Moon */}
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="moonSurface" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#fffffb" />
                <stop offset="50%" stopColor="#f5f5ef" />
                <stop offset="100%" stopColor="#e8e8e0" />
              </radialGradient>
              <clipPath id="moonClip">
                <circle cx="50" cy="50" r="45" />
              </clipPath>
            </defs>
            
            {/* Lit moon surface */}
            <circle cx="50" cy="50" r="45" fill="url(#moonSurface)" />
            
            {/* Crater details */}
            <g opacity="0.5">
              <circle cx="32" cy="35" r="6" fill="rgba(0,0,0,0.06)" />
              <circle cx="60" cy="55" r="8" fill="rgba(0,0,0,0.05)" />
              <circle cx="40" cy="70" r="5" fill="rgba(0,0,0,0.04)" />
              <circle cx="68" cy="32" r="4" fill="rgba(0,0,0,0.05)" />
              <circle cx="28" cy="58" r="3" fill="rgba(0,0,0,0.04)" />
            </g>
            
            <g clipPath="url(#moonClip)">
              {/* 
                Shadow 1: WAXING phase (0% → 50%)
                Covers LEFT side, shrinks from full to nothing
                Shadow sweeps from left to right, revealing the moon
              */}
              <motion.path
                fill="#0f172a"
                animate={{
                  d: [
                    // 0% - New Moon: full shadow (covers entire moon)
                    "M 50 5 A 45 45 0 1 0 50 95 A 45 45 0 0 1 50 5",
                    // 12.5% - Waxing Crescent: large shadow, terminator curves right
                    "M 50 5 A 45 45 0 1 0 50 95 A 30 45 0 0 1 50 5",
                    // 25% - First Quarter: exactly half shadow on left
                    "M 50 5 A 45 45 0 1 0 50 95 L 50 5",
                    // 37.5% - Waxing Gibbous: small shadow, terminator curves left
                    "M 50 5 A 45 45 0 1 0 50 95 A 30 45 0 0 0 50 5",
                    // 50% - Full Moon: shadow gone
                    "M 5 50 A 45 45 0 1 0 5 50 A 45 45 0 0 0 5 50",
                    // Stay invisible for second half
                    "M 5 50 A 45 45 0 1 0 5 50 A 45 45 0 0 0 5 50",
                    "M 5 50 A 45 45 0 1 0 5 50 A 45 45 0 0 0 5 50",
                    "M 5 50 A 45 45 0 1 0 5 50 A 45 45 0 0 0 5 50",
                    // 100% - Back to new moon
                    "M 50 5 A 45 45 0 1 0 50 95 A 45 45 0 0 1 50 5",
                  ],
                  opacity: [1, 1, 1, 1, 0, 0, 0, 0, 1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                }}
              />
              
              {/* 
                Shadow 2: WANING phase (50% → 100%)
                Covers RIGHT side, grows from nothing to full
                Shadow sweeps from right to left, covering the moon
              */}
              <motion.path
                fill="#0f172a"
                animate={{
                  d: [
                    // 0% - Hidden at start
                    "M 95 50 A 45 45 0 1 1 95 50 A 45 45 0 0 1 95 50",
                    "M 95 50 A 45 45 0 1 1 95 50 A 45 45 0 0 1 95 50",
                    "M 95 50 A 45 45 0 1 1 95 50 A 45 45 0 0 1 95 50",
                    "M 95 50 A 45 45 0 1 1 95 50 A 45 45 0 0 1 95 50",
                    // 50% - Full Moon: shadow starts (nothing visible)
                    "M 95 50 A 45 45 0 1 1 95 50 A 45 45 0 0 1 95 50",
                    // 62.5% - Waning Gibbous: small shadow on right, terminator curves right
                    "M 50 5 A 45 45 0 1 1 50 95 A 30 45 0 0 1 50 5",
                    // 75% - Last Quarter: exactly half shadow on right
                    "M 50 5 A 45 45 0 1 1 50 95 L 50 5",
                    // 87.5% - Waning Crescent: large shadow, terminator curves left
                    "M 50 5 A 45 45 0 1 1 50 95 A 30 45 0 0 0 50 5",
                    // 100% - New Moon: full shadow
                    "M 50 5 A 45 45 0 1 1 50 95 A 45 45 0 0 0 50 5",
                  ],
                  opacity: [0, 0, 0, 0, 0, 1, 1, 1, 1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                }}
              />
            </g>
            
            {/* Subtle edge */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="1"
            />
          </svg>
        </div>
        
        {/* Stars around moon */}
        <div className="absolute -inset-8">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: "0 0 4px rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
                        <motion.div
                          initial={{ scale: 0.9 }}
                          whileHover={{ scale: 0.95 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain drop-shadow-lg"
                          />
                          {/* Animated Pin */}
                          <motion.div
                            initial={{ y: -5 }}
                            animate={{ y: 0 }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 1.5,
                            }}
                            className="absolute"
                            style={{
                              top: product.id === "australia-map" ? "45%" : "35%",
                              left: product.id === "australia-map" ? "65%" : "55%",
                            }}
                          >
                            <MapPin
                              size={32}
                              className="drop-shadow-md"
                              style={{
                                color:
                                  product.id === "australia-map"
                                    ? "#0369A1"
                                    : "#047857",
                                fill:
                                  product.id === "australia-map"
                                    ? "#0369A1"
                                    : "#047857",
                              }}
                            />
                          </motion.div>
                        </motion.div>
                      ) : product.previewType === "starmap" ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Star Map Preview */}
                          <div className="relative w-48 h-48 rounded-full overflow-hidden">
                            {/* Dark sky background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950" />
                            {/* Twinkling Stars */}
                            <div className="absolute inset-0">
                              {[...Array(60)].map((_, i) => {
                                const size = 1 + Math.random() * 2.5;
                                const delay = Math.random() * 3;
                                const dur = 1.5 + Math.random() * 2;
                                const left = 5 + Math.random() * 90;
                                const top = 5 + Math.random() * 90;
                                const isBright = Math.random() > 0.7;
                                
                                return (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ 
                                      opacity: [0, isBright ? 1 : 0.6, 0],
                                      scale: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                      duration: dur,
                                      repeat: Infinity,
                                      delay: delay,
                                      ease: "easeInOut",
                                    }}
                                    className="absolute rounded-full"
                                    style={{
                                      width: `${size}px`,
                                      height: `${size}px`,
                                      left: `${left}%`,
                                      top: `${top}%`,
                                      backgroundColor: isBright ? "#fff" : "rgba(200,220,255,0.8)",
                                      boxShadow: isBright 
                                        ? `0 0 ${size * 3}px rgba(255,255,255,0.8), 0 0 ${size * 6}px rgba(150,180,255,0.4)`
                                        : `0 0 ${size * 2}px rgba(255,255,255,0.3)`,
                                    }}
                                  />
                                );
                              })}
                            </div>
                            {/* Constellation lines */}
                            <svg className="absolute inset-0 w-full h-full">
                              <motion.line
                                x1="30%" y1="25%" x2="45%" y2="35%"
                                stroke="rgba(100,149,237,0.4)" strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 0.4, 0.4, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                              />
                              <motion.line
                                x1="45%" y1="35%" x2="60%" y2="30%"
                                stroke="rgba(100,149,237,0.4)" strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 0.4, 0.4, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
                              />
                              <motion.line
                                x1="60%" y1="30%" x2="70%" y2="45%"
                                stroke="rgba(100,149,237,0.4)" strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 0.4, 0.4, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.6 }}
                              />
                              <motion.line
                                x1="20%" y1="60%" x2="35%" y2="70%"
                                stroke="rgba(100,149,237,0.3)" strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 0.3, 0.3, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                              />
                              <motion.line
                                x1="35%" y1="70%" x2="50%" y2="65%"
                                stroke="rgba(100,149,237,0.3)" strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 0.3, 0.3, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 2.3 }}
                              />
                            </svg>
                          </div>
                        </div>
                      ) : product.previewType === "moonphase" ? (
                        <AnimatedMoonPhase />
                      ) : product.previewType === "soundwave" ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Sound Wave Preview */}
                          <div className="relative w-48 h-32 flex items-center justify-center gap-[2px]">
                            {[...Array(40)].map((_, i) => {
                              const baseHeight = Math.sin((i / 40) * Math.PI) * 0.8 + 0.2;
                              return (
                                <motion.div
                                  key={i}
                                  className="w-1 rounded-full bg-gradient-to-t from-purple-400 to-pink-400"
                                  initial={{ height: "20%" }}
                                  animate={{ 
                                    height: [`${baseHeight * 30}%`, `${baseHeight * 100}%`, `${baseHeight * 30}%`],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.05,
                                    ease: "easeInOut",
                                  }}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-brand-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <product.icon size={48} className="mx-auto text-brand-400 mb-2" />
                            <p className="text-xs text-brand-500 uppercase tracking-wide">Map Preview</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 lg:p-8 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-brand-500 uppercase tracking-wide">{product.subtitle}</p>
                        <h2 className="text-xl lg:text-2xl font-serif font-semibold text-charcoal mt-1">{product.title}</h2>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center group-hover:bg-charcoal transition-colors flex-shrink-0">
                        <product.icon size={20} className="text-brand-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    <p className="text-brand-600 mb-6 flex-grow">{product.description}</p>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-brand-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-brand-100">
                      <span className="text-charcoal font-semibold">From $59</span>
                      <span className="flex items-center gap-1 text-brand-600 group-hover:text-charcoal transition-colors">
                        Create Now
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-brand-600 mb-4">Not sure which to choose? Start with our most popular option.</p>
          <Link href="/create">
            <Button size="lg">
              Create Where We Met Print
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
