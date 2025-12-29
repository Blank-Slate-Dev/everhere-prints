// src/components/create/ProductOptions.tsx
"use client";

import { motion } from "framer-motion";
import { PrintSize, FrameOption } from "@/types";
import { priceConfig, formatPrice } from "@/lib/pricing";
import { Check } from "lucide-react";

interface ProductOptionsProps {
  selectedSize: PrintSize;
  selectedFrame: FrameOption;
  onSizeChange: (size: PrintSize) => void;
  onFrameChange: (frame: FrameOption) => void;
}

export default function ProductOptions({
  selectedSize,
  selectedFrame,
  onSizeChange,
  onFrameChange,
}: ProductOptionsProps) {
  const sizes = Object.entries(priceConfig.sizes) as [
    PrintSize,
    { name: string; dimensions: string; price: number }
  ][];

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-3">
          Print Size
        </label>
        <div className="grid grid-cols-3 gap-3">
          {sizes.map(([sizeKey, sizeData]) => (
            <motion.button
              key={sizeKey}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSizeChange(sizeKey)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                selectedSize === sizeKey
                  ? "border-charcoal bg-brand-50"
                  : "border-brand-200 hover:border-brand-300 bg-white"
              }`}
            >
              <p className="text-lg font-semibold text-charcoal">
                {sizeData.name}
              </p>
              <p className="text-xs text-brand-500 mt-1">{sizeData.dimensions}</p>
              <p className="text-sm font-medium text-charcoal mt-2">
                {formatPrice(sizeData.price)}
              </p>

              {selectedSize === sizeKey && (
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

      {/* Frame Selection */}
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-3">
          Frame Option
        </label>
        <div className="grid grid-cols-2 gap-3">
          {priceConfig.frames.map((frame) => (
            <motion.button
              key={frame.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFrameChange(frame)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedFrame.id === frame.id
                  ? "border-charcoal bg-brand-50"
                  : "border-brand-200 hover:border-brand-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal">{frame.name}</p>
                  <p className="text-sm text-brand-500 mt-0.5">
                    {frame.price === 0 ? "Included" : `+${formatPrice(frame.price)}`}
                  </p>
                </div>

                {/* Frame Color Preview */}
                {frame.id !== "none" && (
                  <div
                    className={`w-8 h-8 rounded-lg border ${
                      frame.id === "black"
                        ? "bg-gray-900 border-gray-700"
                        : frame.id === "white"
                        ? "bg-white border-gray-200"
                        : "bg-amber-100 border-amber-200"
                    }`}
                  />
                )}
              </div>

              {selectedFrame.id === frame.id && (
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
    </div>
  );
}