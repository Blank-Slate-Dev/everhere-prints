// src/components/create-newzealand/NewZealandColorSelector.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { newzealandMapColors, NewZealandMapColor } from "@/lib/newzealandMapConfig";

interface NewZealandColorSelectorProps {
  selectedColorId: string;
  onColorChange: (colorId: string) => void;
}

export default function NewZealandColorSelector({
  selectedColorId,
  onColorChange,
}: NewZealandColorSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Choose Your Colour
      </label>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {newzealandMapColors.map((color) => (
          <ColorOption
            key={color.id}
            color={color}
            isSelected={selectedColorId === color.id}
            onClick={() => onColorChange(color.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface ColorOptionProps {
  color: NewZealandMapColor;
  isSelected: boolean;
  onClick: () => void;
}

function ColorOption({ color, isSelected, onClick }: ColorOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
        isSelected
          ? "border-charcoal ring-2 ring-charcoal/20"
          : "border-brand-200 hover:border-brand-300"
      }`}
      aria-label={`Select ${color.name}`}
    >
      {/* Thumbnail of the watercolor map */}
      <div className="absolute inset-0 p-1">
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
          <Image
            src={color.image}
            alt={color.name}
            fill
            className="object-contain"
            sizes="80px"
          />
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1 right-1 w-5 h-5 bg-charcoal rounded-full flex items-center justify-center shadow-md"
        >
          <Check size={12} className="text-white" />
        </motion.div>
      )}
    </motion.button>
  );
}

// Expanded view component for larger color preview
export function NewZealandColorPreviewExpanded({
  selectedColorId,
  onColorChange,
}: NewZealandColorSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Choose Your Colour
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {newzealandMapColors.map((color) => (
          <motion.button
            key={color.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onColorChange(color.id)}
            className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 p-3 bg-white ${
              selectedColorId === color.id
                ? "border-charcoal bg-brand-50"
                : "border-brand-200 hover:border-brand-300"
            }`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[3/4] w-full mb-2 rounded-lg overflow-hidden">
              <Image
                src={color.image}
                alt={color.name}
                fill
                className="object-contain"
                sizes="150px"
              />
            </div>

            {/* Label */}
            <p className="text-sm font-medium text-charcoal text-center">
              {color.name}
            </p>

            {/* Selected Indicator */}
            {selectedColorId === color.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-charcoal rounded-full flex items-center justify-center shadow-md"
              >
                <Check size={14} className="text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}