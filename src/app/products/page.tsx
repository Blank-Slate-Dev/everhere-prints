// src/app/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const products = [
  {
    id: "where-we-met",
    title: "Where We Met",
    subtitle: "Custom Map Print",
    href: "/create",
    previewType: "map",
    bgColor: "#F5F0E8",
  },
  {
    id: "australia-map",
    title: "Australia",
    subtitle: "Watercolour Print",
    href: "/create-australia",
    image: "/australia_pastel_blue.png",
    previewType: "watercolor",
    bgColor: "#F0F7FF",
    accentColor: "#0369A1",
  },
  {
    id: "newzealand-map",
    title: "New Zealand",
    subtitle: "Watercolour Print",
    href: "/create-newzealand",
    image: "/new_zealand_pastel_blue.png",
    previewType: "watercolor",
    bgColor: "#F0FDF4",
    accentColor: "#047857",
  },
  {
    id: "star-map",
    title: "Star Map",
    subtitle: "Night Sky Print",
    href: "/create-starmap",
    previewType: "starmap",
    bgColor: "#0f172a",
  },
  {
    id: "moon-phase",
    title: "Moon Phase",
    subtitle: "Lunar Print",
    href: "/create-moonphase",
    previewType: "moonphase",
    bgColor: "#1e293b",
  },
  {
    id: "sound-wave",
    title: "Sound Wave",
    subtitle: "Audio Print",
    href: "/create-soundwave",
    previewType: "soundwave",
    bgColor: "#1a1625",
  },
];

const A4_ASPECT = 1 / Math.sqrt(2);

// ============ STATIC PREVIEWS (for non-center cards) ============

function StaticMapPreview() {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex-grow relative overflow-hidden rounded-sm mx-2 mt-2 bg-[#e8e4dc]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="mapGridStatic" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(200,195,185,0.5)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#mapGridStatic)" />
          <path d="M 20 80 Q 40 60 60 65 T 85 40" stroke="rgba(180,175,165,0.8)" strokeWidth="1.5" fill="none" />
          <path d="M 10 50 Q 30 45 50 50 T 90 55" stroke="rgba(180,175,165,0.8)" strokeWidth="1" fill="none" />
        </svg>
        <div className="absolute top-[42%] left-[48%]">
          <div className="w-2 h-2 rounded-full bg-[#8B7355]" />
        </div>
      </div>
      <div className="flex-shrink-0 text-center py-2 px-2">
        <p className="text-[6px] uppercase tracking-[0.15em] text-[#9a958a] mb-0.5">Where We Met</p>
        <p className="font-serif text-[10px] text-[#3d3d3d] font-medium">Sydney, Australia</p>
      </div>
    </div>
  );
}

function StaticStarMap() {
  const stars = [
    { x: 15, y: 20, size: 2, bright: true },
    { x: 82, y: 35, size: 1.5, bright: false },
    { x: 45, y: 12, size: 1.5, bright: false },
    { x: 68, y: 78, size: 2, bright: true },
    { x: 25, y: 65, size: 1.5, bright: false },
    { x: 90, y: 55, size: 1.5, bright: false },
    { x: 38, y: 42, size: 2, bright: true },
    { x: 72, y: 18, size: 1.5, bright: false },
    { x: 55, y: 88, size: 1.5, bright: false },
    { x: 12, y: 45, size: 2, bright: true },
  ];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-20 h-20 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950" />
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.x}%`,
                top: `${star.y}%`,
                backgroundColor: star.bright ? "#fff" : "rgba(200,220,255,0.8)",
                boxShadow: star.bright ? `0 0 ${star.size * 2}px rgba(255,255,255,0.8)` : "none",
              }}
            />
          ))}
        </div>
        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full">
          <line x1="15%" y1="20%" x2="38%" y2="42%" stroke="rgba(100,149,237,0.3)" strokeWidth="0.5" />
          <line x1="38%" y1="42%" x2="68%" y2="78%" stroke="rgba(100,149,237,0.3)" strokeWidth="0.5" />
          <line x1="12%" y1="45%" x2="25%" y2="65%" stroke="rgba(100,149,237,0.3)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}

function StaticMoonPhase() {
  const R = 30;
  
  // Stars - mostly tiny, scattered randomly, a few slightly larger
  const stars = [
    { x: 5, y: 10, size: 0.6 }, { x: 92, y: 8, size: 0.5 }, { x: 12, y: 88, size: 0.7 },
    { x: 88, y: 92, size: 0.5 }, { x: 3, y: 42, size: 0.6 }, { x: 96, y: 58, size: 0.5 },
    { x: 48, y: 4, size: 0.6 }, { x: 55, y: 95, size: 0.5 }, { x: 8, y: 22, size: 1.1 },
    { x: 90, y: 35, size: 0.5 }, { x: 6, y: 68, size: 0.6 }, { x: 94, y: 75, size: 1.2 },
  ];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Glow */}
        <div className="absolute -inset-3 rounded-full bg-white/20 blur-lg" />
        
        {/* Stars */}
        <div className="absolute -inset-4">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{ 
                left: `${star.x}%`, 
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.size > 1 ? 0.7 : 0.4,
                boxShadow: star.size > 1 ? "0 0 2px rgba(255,255,255,0.4)" : "none"
              }}
            />
          ))}
        </div>
        
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="moonTextureStatic" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#fffffb" />
                <stop offset="100%" stopColor="#e8e8e0" />
              </radialGradient>
              <pattern id="craterPatternStatic" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="25" r="4" fill="rgba(0,0,0,0.06)" />
                <circle cx="60" cy="35" r="6" fill="rgba(0,0,0,0.05)" />
                <circle cx="45" cy="55" r="3" fill="rgba(0,0,0,0.07)" />
                <circle cx="70" cy="60" r="5" fill="rgba(0,0,0,0.04)" />
                <circle cx="35" cy="70" r="4" fill="rgba(0,0,0,0.06)" />
              </pattern>
            </defs>
            <circle cx="50" cy="50" r={R} fill="#0f172a" />
            <path d={`M 50 ${50-R} A ${R} ${R} 0 0 1 50 ${50+R} L 50 ${50-R} Z`} fill="url(#moonTextureStatic)" />
            <path d={`M 50 ${50-R} A ${R} ${R} 0 0 1 50 ${50+R} L 50 ${50-R} Z`} fill="url(#craterPatternStatic)" />
            <ellipse cx="50" cy="50" rx={R * 0.3} ry={R} fill="#F4F6F0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StaticSoundWave() {
  const heights = [20, 35, 50, 65, 78, 88, 95, 98, 95, 88, 78, 65, 50, 35, 20];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-24 h-14 flex items-center justify-center gap-[2px]">
        {heights.map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-purple-500 to-pink-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// ============ ANIMATED PREVIEWS (for center card only) ============

function AnimatedMapPreview() {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex-grow relative overflow-hidden rounded-sm mx-2 mt-2 bg-[#e8e4dc]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="mapGridAnimated" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(200,195,185,0.5)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#mapGridAnimated)" />
          <motion.path 
            d="M 20 80 Q 40 60 60 65 T 85 40" 
            stroke="rgba(180,175,165,0.8)" 
            strokeWidth="1.5" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.path 
            d="M 10 50 Q 30 45 50 50 T 90 55" 
            stroke="rgba(180,175,165,0.8)" 
            strokeWidth="1" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 text-[6px] text-[#9a958a] font-light">
          <span className="absolute top-[20%] left-[20%]">North Sydney</span>
          <span className="absolute top-[45%] left-[42%] text-[8px] text-[#6b6560] font-medium">Sydney</span>
          <span className="absolute top-[65%] left-[55%]">Surry Hills</span>
        </div>
        <motion.div 
          initial={{ y: -10, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }} 
          className="absolute top-[42%] left-[48%]"
        >
          <div className="w-2 h-2 rounded-full bg-[#8B7355] shadow-sm" />
        </motion.div>
      </div>
      <div className="flex-shrink-0 text-center py-2 px-2">
        <p className="text-[6px] uppercase tracking-[0.15em] text-[#9a958a] mb-0.5">Where We Met</p>
        <p className="font-serif text-[10px] text-[#3d3d3d] font-medium">Sydney, Australia</p>
        <p className="text-[6px] text-[#8a8580] mt-0.5">Emma & Oakley • 18.03.2020</p>
      </div>
    </div>
  );
}

function AnimatedStarMap() {
  const stars = [
    { x: 15, y: 20, size: 2.5, bright: true },
    { x: 82, y: 35, size: 1.5, bright: false },
    { x: 45, y: 12, size: 1.5, bright: false },
    { x: 68, y: 78, size: 2.5, bright: true },
    { x: 25, y: 65, size: 2, bright: true },
    { x: 90, y: 55, size: 1.5, bright: false },
    { x: 38, y: 42, size: 2.5, bright: true },
    { x: 72, y: 18, size: 1.5, bright: false },
    { x: 55, y: 88, size: 1.5, bright: false },
    { x: 12, y: 45, size: 2, bright: true },
    { x: 78, y: 62, size: 1.5, bright: false },
    { x: 32, y: 85, size: 1.5, bright: false },
    { x: 88, y: 28, size: 2, bright: true },
    { x: 48, y: 52, size: 1.5, bright: false },
    { x: 65, y: 38, size: 1.5, bright: false },
    { x: 20, y: 32, size: 1.5, bright: false },
    { x: 75, y: 85, size: 1.5, bright: false },
    { x: 58, y: 25, size: 2, bright: true },
  ];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-24 h-24 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950" />
        <div className="absolute inset-0">
          {stars.map((star, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: star.bright ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4], scale: 1 }}
              transition={{ 
                opacity: { duration: 2, repeat: Infinity, delay: i * 0.12 },
                scale: { duration: 0.4, delay: i * 0.03 }
              }}
              className="absolute rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.x}%`,
                top: `${star.y}%`,
                backgroundColor: star.bright ? "#fff" : "rgba(200,220,255,0.9)",
                boxShadow: star.bright ? `0 0 ${star.size * 3}px rgba(255,255,255,0.9)` : `0 0 ${star.size}px rgba(200,220,255,0.4)`,
              }}
            />
          ))}
        </div>
        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.line 
            x1="15%" y1="20%" x2="38%" y2="42%" 
            stroke="rgba(100,149,237,0.5)" 
            strokeWidth="0.75"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.line 
            x1="38%" y1="42%" x2="68%" y2="78%" 
            stroke="rgba(100,149,237,0.5)" 
            strokeWidth="0.75"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.line 
            x1="38%" y1="42%" x2="58%" y2="25%" 
            stroke="rgba(100,149,237,0.5)" 
            strokeWidth="0.75"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
          <motion.line 
            x1="12%" y1="45%" x2="25%" y2="65%" 
            stroke="rgba(100,149,237,0.5)" 
            strokeWidth="0.75"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.line 
            x1="88%" y1="28%" x2="72%" y2="18%" 
            stroke="rgba(100,149,237,0.5)" 
            strokeWidth="0.75"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          />
        </svg>
      </div>
    </div>
  );
}

function AnimatedMoonPhase() {
  const R = 32;
  const duration = 8;
  const litColor = "#F4F6F0";
  const darkColor = "#0f172a";
  
  // Stars - mostly tiny, a few slightly larger, random positions
  const stars = [
    { x: 3, y: 8, size: 0.8 }, { x: 95, y: 12, size: 0.6 }, { x: 8, y: 92, size: 0.7 },
    { x: 91, y: 88, size: 0.6 }, { x: 2, y: 38, size: 0.5 }, { x: 97, y: 55, size: 0.7 },
    { x: 42, y: 2, size: 0.6 }, { x: 58, y: 97, size: 0.5 }, { x: 15, y: 5, size: 1.2 },
    { x: 88, y: 22, size: 0.6 }, { x: 6, y: 72, size: 0.5 }, { x: 93, y: 68, size: 0.7 },
    { x: 28, y: 95, size: 0.6 }, { x: 75, y: 4, size: 0.5 }, { x: 4, y: 25, size: 0.7 },
    { x: 96, y: 42, size: 0.5 }, { x: 85, y: 95, size: 1.3 }, { x: 12, y: 58, size: 0.6 },
    { x: 68, y: 96, size: 0.5 }, { x: 35, y: 3, size: 0.7 }, { x: 5, y: 82, size: 1.1 },
  ];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Dynamic glow - grows with illumination */}
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.25, 0.4, 0.5, 0.5, 0.5, 0.4, 0.25, 0.15, 0.15],
            scale: [0.9, 1, 1.1, 1.15, 1.15, 1.15, 1.1, 1, 0.9, 0.9],
          }}
          transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.125, 0.25, 0.375, 0.5, 0.5, 0.625, 0.75, 0.875, 1] }}
          className="absolute -inset-5 rounded-full bg-white/30 blur-xl" 
        />
        
        {/* Stars around the moon */}
        <div className="absolute -inset-5">
          {stars.map((star, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, star.size > 1 ? 0.9 : 0.6, 0.2] }}
              transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, delay: i * 0.15 }}
              className="absolute rounded-full bg-white"
              style={{ 
                left: `${star.x}%`, 
                top: `${star.y}%`, 
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: star.size > 1 ? "0 0 2px rgba(255,255,255,0.5)" : "none"
              }}
            />
          ))}
        </div>
        
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="moonTextureProd" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#fffffb" />
                <stop offset="50%" stopColor="#f5f5ef" />
                <stop offset="100%" stopColor="#e8e8e0" />
              </radialGradient>
              <clipPath id="moonClipProd">
                <circle cx="50" cy="50" r={R} />
              </clipPath>
              {/* Crater pattern */}
              <pattern id="craterPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="25" r="4" fill="rgba(0,0,0,0.06)" />
                <circle cx="60" cy="35" r="6" fill="rgba(0,0,0,0.05)" />
                <circle cx="45" cy="55" r="3" fill="rgba(0,0,0,0.07)" />
                <circle cx="70" cy="60" r="5" fill="rgba(0,0,0,0.04)" />
                <circle cx="35" cy="70" r="4" fill="rgba(0,0,0,0.06)" />
                <circle cx="55" cy="75" r="3" fill="rgba(0,0,0,0.05)" />
                <circle cx="25" cy="45" r="2" fill="rgba(0,0,0,0.08)" />
                <circle cx="65" cy="20" r="2.5" fill="rgba(0,0,0,0.06)" />
              </pattern>
            </defs>
            <circle cx="50" cy="50" r={R} fill={darkColor} />
            <g clipPath="url(#moonClipProd)">
              <motion.g
                animate={{ opacity: [1, 1, 1, 1, 1, 0, 0, 0, 0, 1] }}
                transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.125, 0.25, 0.375, 0.5, 0.5, 0.625, 0.75, 0.875, 1] }}
              >
                <path d={`M 50 ${50-R} A ${R} ${R} 0 0 1 50 ${50+R} L 50 ${50-R} Z`} fill="url(#moonTextureProd)" />
                {/* Craters on lit side */}
                <path d={`M 50 ${50-R} A ${R} ${R} 0 0 1 50 ${50+R} L 50 ${50-R} Z`} fill="url(#craterPattern)" />
                <motion.ellipse
                  cx="50" cy="50" ry={R}
                  animate={{ rx: [R, R*0.65, 0, R*0.65, R, R, R, R, R, R], fill: [darkColor, darkColor, darkColor, litColor, litColor, litColor, litColor, litColor, litColor, darkColor] }}
                  transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.125, 0.25, 0.375, 0.5, 0.5, 0.625, 0.75, 0.875, 1] }}
                />
              </motion.g>
              <motion.g
                animate={{ opacity: [0, 0, 0, 0, 0, 1, 1, 1, 1, 0] }}
                transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.125, 0.25, 0.375, 0.5, 0.5, 0.625, 0.75, 0.875, 1] }}
              >
                <path d={`M 50 ${50-R} A ${R} ${R} 0 0 0 50 ${50+R} L 50 ${50-R} Z`} fill="url(#moonTextureProd)" />
                {/* Craters on lit side (waning) */}
                <path d={`M 50 ${50-R} A ${R} ${R} 0 0 0 50 ${50+R} L 50 ${50-R} Z`} fill="url(#craterPattern)" />
                <motion.ellipse
                  cx="50" cy="50" ry={R}
                  animate={{ rx: [R, R, R, R, R, R, R*0.65, 0, R*0.65, R], fill: [litColor, litColor, litColor, litColor, litColor, litColor, litColor, litColor, darkColor, darkColor] }}
                  transition={{ duration, repeat: Infinity, ease: "linear", times: [0, 0.125, 0.25, 0.375, 0.5, 0.5, 0.625, 0.75, 0.875, 1] }}
                />
              </motion.g>
            </g>
            {/* Subtle edge highlight */}
            <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AnimatedSoundWave() {
  const heights = [20, 28, 38, 50, 62, 74, 84, 92, 98, 98, 92, 84, 74, 62, 50, 38, 28, 20];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-28 h-16 flex items-center justify-center gap-[2px]">
        {heights.map((h, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-purple-500 to-pink-400"
            animate={{ 
              height: [`${h * 0.3}%`, `${h * 0.3}%`, `${h}%`, `${h * 0.3}%`, `${h * 0.3}%`],
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeOut",
              times: [0, 0.1, 0.3, 0.5, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ============ PRODUCT CARD ============

function ProductCard({ product, isCenter }: { product: typeof products[0]; isCenter: boolean }) {
  const isDark = product.previewType === "starmap" || product.previewType === "moonphase" || product.previewType === "soundwave";
  
  const renderPreview = () => {
    if (product.image) {
      return (
        <div className="relative w-full h-full p-3">
          <Image src={product.image} alt={product.title} fill className="object-contain" />
          {isCenter && (
            <motion.div
              initial={{ y: -5 }}
              animate={{ y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              className="absolute"
              style={{ 
                top: product.id === "australia-map" ? "42%" : "32%", 
                left: product.id === "australia-map" ? "62%" : "52%" 
              }}
            >
              <MapPin size={16} style={{ color: product.accentColor, fill: product.accentColor }} />
            </motion.div>
          )}
        </div>
      );
    }
    
    // Animated previews for center, static for sides
    if (isCenter) {
      switch (product.previewType) {
        case "map": return <AnimatedMapPreview />;
        case "starmap": return <AnimatedStarMap />;
        case "moonphase": return <AnimatedMoonPhase />;
        case "soundwave": return <AnimatedSoundWave />;
        default: return null;
      }
    } else {
      switch (product.previewType) {
        case "map": return <StaticMapPreview />;
        case "starmap": return <StaticStarMap />;
        case "moonphase": return <StaticMoonPhase />;
        case "soundwave": return <StaticSoundWave />;
        default: return null;
      }
    }
  };
  
  return (
    <Link href={product.href} className="block group h-full">
      <div className="relative h-full">
        {/* Frame shadow */}
        <div className="absolute inset-0 rounded-lg bg-black/15" style={{ transform: "translate(3px, 4px)", filter: "blur(10px)" }} />
        
        {/* Print frame */}
        <div className="relative h-full rounded-lg overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 p-1.5 md:p-2">
          {/* Frame edges */}
          <div className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-white" />
            <div className="absolute top-0 left-0 bottom-0 w-px bg-white" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-black/5" />
            <div className="absolute top-0 right-0 bottom-0 w-px bg-black/5" />
          </div>
          
          <div className="relative w-full h-full rounded overflow-hidden flex flex-col" style={{ backgroundColor: product.bgColor }}>
            <div className="flex-grow flex items-center justify-center">
              {renderPreview()}
            </div>
            
            {product.previewType !== "map" && (
              <div className="flex-shrink-0 text-center pb-2 md:pb-3 px-2" style={{ color: isDark ? "#ffffff" : "#333333" }}>
                <p className="text-[7px] md:text-[9px] uppercase tracking-widest mb-0.5 opacity-60">{product.subtitle}</p>
                <h3 className="font-serif font-semibold text-[10px] md:text-xs">{product.title}</h3>
              </div>
            )}
          </div>
        </div>
        
        {/* Hover overlay - center only */}
        {isCenter && (
          <div className="absolute inset-0 rounded-lg flex items-center justify-center bg-black/0 opacity-0 group-hover:opacity-100 group-hover:bg-black/40 transition-all duration-200">
            <span className="text-white text-sm font-medium">Create →</span>
          </div>
        )}
      </div>
    </Link>
  );
}

// ============ MAIN PAGE ============

export default function ProductsPage() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const minSwipeDistance = 50;
  
  const goNext = () => setCenterIndex((prev) => (prev + 1) % products.length);
  const goPrev = () => setCenterIndex((prev) => (prev - 1 + products.length) % products.length);
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) goNext();
    else if (distance < -minSwipeDistance) goPrev();
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // Get visible products - use CSS for responsive, not JS
  const getVisibleProducts = () => {
    const indices = [];
    for (let i = -3; i <= 3; i++) {
      const idx = (centerIndex + i + products.length) % products.length;
      indices.push({ index: idx, offset: i, product: products[idx] });
    }
    return indices;
  };

  const visibleProducts = getVisibleProducts();
  const centerProduct = products[centerIndex];

  // Don't render carousel until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-4 py-8 lg:py-16">
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl lg:text-4xl font-serif font-semibold text-charcoal">
              Choose Your Print
            </h1>
          </div>
          <div className="h-[320px] md:h-[480px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brand-300 border-t-brand-600 rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-8 lg:mb-12"
        >
          <h1 className="text-2xl lg:text-4xl font-serif font-semibold text-charcoal">
            Choose Your Print
          </h1>
        </motion.div>

        {/* Carousel */}
        <div 
          className="relative flex items-center justify-center h-[320px] md:h-[480px] mb-6 lg:mb-8 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Left Arrow - hidden on small mobile */}
          <button
            onClick={goPrev}
            className="absolute left-1 lg:left-4 z-20 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/90 shadow-md items-center justify-center active:scale-95 transition-transform hidden sm:flex"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="text-charcoal" />
          </button>
          
          {/* Cards */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
            {visibleProducts.map(({ index, offset, product }) => {
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);
              
              // Scale and opacity based on distance from center
              const scale = isCenter ? 1 : Math.max(0.7, 0.9 - absOffset * 0.08);
              const opacity = isCenter ? 1 : Math.max(0.4, 0.85 - absOffset * 0.15);
              const zIndex = 10 - absOffset;
              
              // Hide cards too far on mobile
              const hiddenOnMobile = absOffset > 1;
              
              return (
                <div
                  key={`${product.id}-${offset}`}
                  className={`absolute transition-all duration-300 ease-out cursor-pointer ${hiddenOnMobile ? 'hidden sm:block' : ''}`}
                  style={{ 
                    width: "clamp(140px, 18vw, 220px)",
                    height: `calc(clamp(140px, 18vw, 220px) / ${A4_ASPECT} + 36px)`,
                    transform: `translateX(calc(${offset} * clamp(100px, 14vw, 180px))) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                  onClick={() => !isCenter && setCenterIndex(index)}
                >
                  <ProductCard product={product} isCenter={isCenter} />
                </div>
              );
            })}
          </div>
          
          {/* Right Arrow - hidden on small mobile */}
          <button
            onClick={goNext}
            className="absolute right-1 lg:right-4 z-20 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/90 shadow-md items-center justify-center active:scale-95 transition-transform hidden sm:flex"
            aria-label="Next"
          >
            <ChevronRight size={20} className="text-charcoal" />
          </button>
        </div>

        {/* Current product info */}
        <div className="text-center">
          <p className="text-[10px] lg:text-xs uppercase tracking-widest text-brand-500 mb-1">
            {centerProduct.subtitle}
          </p>
          <h2 className="text-lg lg:text-xl font-serif font-semibold text-charcoal">
            {centerProduct.title}
          </h2>
          <div className="mt-3 flex justify-center gap-1.5">
            {products.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCenterIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === centerIndex ? "bg-charcoal" : "bg-brand-300 hover:bg-brand-400"}`}
                aria-label={`Go to ${products[i].title}`}
              />
            ))}
          </div>
          
          {/* Swipe hint on mobile */}
          <p className="mt-4 text-xs text-brand-400 sm:hidden">
            Swipe to browse
          </p>
        </div>
      </div>
    </div>
  );
}