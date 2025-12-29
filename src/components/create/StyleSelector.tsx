// src/components/create/StyleSelector.tsx
"use client";

import { motion } from "framer-motion";
import { MapStyle } from "@/types";
import { mapStyles } from "@/lib/mapStyles";
import { Check } from "lucide-react";

interface StyleSelectorProps {
  selectedStyle: MapStyle;
  onStyleChange: (style: MapStyle) => void;
}

export default function StyleSelector({
  selectedStyle,
  onStyleChange,
}: StyleSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Map Style
      </label>
      <div className="grid grid-cols-3 gap-3">
        {mapStyles.map((style) => (
          <motion.button
            key={style.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStyleChange(style.id)}
            className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${
              selectedStyle === style.id
                ? "border-charcoal bg-brand-50"
                : "border-brand-200 hover:border-brand-300 bg-white"
            }`}
          >
            {/* Color Preview */}
            <div
              className="w-full aspect-video rounded-lg mb-2"
              style={{ backgroundColor: style.previewColor }}
            />

            {/* Label */}
            <p className="text-sm font-medium text-charcoal">{style.name}</p>
            <p className="text-xs text-brand-500 mt-0.5">{style.description}</p>

            {/* Selected Indicator */}
            {selectedStyle === style.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 bg-charcoal rounded-full flex items-center justify-center"
              >
                <Check size={12} className="text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}