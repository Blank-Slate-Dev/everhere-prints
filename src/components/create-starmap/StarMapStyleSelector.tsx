// src/components/create-starmap/StarMapStyleSelector.tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { starMapStyles, StarMapStyle } from "@/lib/starMapConfig";

// Pre-computed deterministic star positions to avoid hydration mismatch
// Each star has: size (2-5px), left position (10-90%), top position (10-90%), glow radius (3-7px)
const PREVIEW_STARS = [
  { size: 3.2, left: 15, top: 22, glow: 4.5 },
  { size: 2.5, left: 72, top: 18, glow: 3.8 },
  { size: 4.1, left: 45, top: 35, glow: 5.2 },
  { size: 2.8, left: 28, top: 65, glow: 4.0 },
  { size: 3.5, left: 82, top: 42, glow: 5.8 },
  { size: 2.2, left: 55, top: 78, glow: 3.5 },
  { size: 4.5, left: 38, top: 52, glow: 6.2 },
  { size: 2.9, left: 68, top: 85, glow: 4.2 },
  { size: 3.8, left: 22, top: 45, glow: 5.5 },
  { size: 2.4, left: 88, top: 62, glow: 3.9 },
  { size: 3.1, left: 52, top: 15, glow: 4.8 },
  { size: 4.2, left: 35, top: 88, glow: 6.0 },
];

interface StarMapStyleSelectorProps {
  selectedStyleId: string;
  onStyleChange: (styleId: string) => void;
}

export default function StarMapStyleSelector({
  selectedStyleId,
  onStyleChange,
}: StarMapStyleSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Sky Style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {starMapStyles.map((style) => (
          <StyleOption
            key={style.id}
            style={style}
            isSelected={selectedStyleId === style.id}
            onClick={() => onStyleChange(style.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface StyleOptionProps {
  style: StarMapStyle;
  isSelected: boolean;
  onClick: () => void;
}

function StyleOption({ style, isSelected, onClick }: StyleOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${
        isSelected
          ? "border-charcoal ring-2 ring-charcoal/20"
          : "border-brand-200 hover:border-brand-300"
      }`}
    >
      {/* Preview circle showing sky color with stars */}
      <div
        className="w-full aspect-square rounded-lg mb-2 relative overflow-hidden"
        style={{ backgroundColor: style.backgroundColor }}
      >
        {/* Simulated stars - using pre-computed positions for SSR consistency */}
        <div className="absolute inset-0">
          {PREVIEW_STARS.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: style.starColor,
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.left}%`,
                top: `${star.top}%`,
                boxShadow: `0 0 ${star.glow}px ${style.starGlowColor}`,
              }}
            />
          ))}
        </div>

        {/* Constellation line preview */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
        >
          <line
            x1="20"
            y1="30"
            x2="45"
            y2="25"
            stroke={style.constellationLineColor}
            strokeWidth="1"
          />
          <line
            x1="45"
            y1="25"
            x2="60"
            y2="40"
            stroke={style.constellationLineColor}
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="40"
            x2="80"
            y2="35"
            stroke={style.constellationLineColor}
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-charcoal">{style.name}</p>
      <p className="text-[10px] text-brand-500 mt-0.5">{style.description}</p>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 bg-charcoal rounded-full flex items-center justify-center shadow-md"
        >
          <Check size={12} className="text-white" />
        </motion.div>
      )}
    </motion.button>
  );
}