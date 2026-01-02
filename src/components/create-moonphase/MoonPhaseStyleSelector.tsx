// src/components/create-moonphase/MoonPhaseStyleSelector.tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { moonPhaseStyles, MoonPhaseStyle } from "@/lib/moonPhaseConfig";

// Pre-computed star positions for preview consistency
const PREVIEW_STARS = [
  { size: 1.5, left: 12, top: 15 },
  { size: 1, left: 25, top: 8 },
  { size: 2, left: 85, top: 12 },
  { size: 1.2, left: 78, top: 25 },
  { size: 1.5, left: 15, top: 80 },
  { size: 1, left: 88, top: 78 },
];

interface MoonPhaseStyleSelectorProps {
  selectedStyleId: string;
  onStyleChange: (styleId: string) => void;
}

export default function MoonPhaseStyleSelector({
  selectedStyleId,
  onStyleChange,
}: MoonPhaseStyleSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Background Style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {moonPhaseStyles.map((style) => (
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
  style: MoonPhaseStyle;
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
      {/* Preview showing sky color with moon */}
      <div
        className="w-full aspect-square rounded-lg mb-2 relative overflow-hidden"
        style={{ backgroundColor: style.backgroundColor }}
      >
        {/* Stars */}
        {style.showStars && (
          <div className="absolute inset-0">
            {PREVIEW_STARS.map((star, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: style.starsColor,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}

        {/* Moon Preview */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Moon glow */}
            <div
              className="absolute inset-0 rounded-full blur-md"
              style={{
                backgroundColor: style.moonGlowColor,
                transform: "scale(1.3)",
              }}
            />
            {/* Moon circle */}
            <div
              className="relative w-10 h-10 rounded-full"
              style={{
                backgroundColor: style.moonFillColor,
                boxShadow: `inset -4px 0 8px ${style.moonShadowColor}`,
              }}
            />
          </div>
        </div>
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
