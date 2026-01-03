// src/components/create-soundwave/SoundWaveProductOptions.tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PrintSize, FrameOption } from "@/types";
import { priceConfig, formatPrice } from "@/lib/pricing";

interface SoundWaveProductOptionsProps {
  selectedSize: PrintSize;
  selectedFrame: FrameOption;
  onSizeChange: (size: PrintSize) => void;
  onFrameChange: (frame: FrameOption) => void;
}

export default function SoundWaveProductOptions({
  selectedSize,
  selectedFrame,
  onSizeChange,
  onFrameChange,
}: SoundWaveProductOptionsProps) {
  const sizes = Object.entries(priceConfig.sizes) as [
    PrintSize,
    { name: string; dimensions: string; price: number }
  ][];

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <p className="text-sm text-brand-500 mb-3">Print Size</p>
        <div className="grid grid-cols-3 gap-3">
          {sizes.map(([sizeId, sizeInfo]) => (
            <motion.button
              key={sizeId}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSizeChange(sizeId)}
              className={`
                relative p-4 rounded-xl text-center transition-all duration-200
                ${selectedSize === sizeId
                  ? "bg-charcoal text-white ring-2 ring-charcoal ring-offset-2"
                  : "bg-brand-50 text-charcoal hover:bg-brand-100"
                }
              `}
            >
              <p className="font-bold text-xl">{sizeId}</p>
              <p className="text-xs opacity-70 mt-0.5">{sizeInfo.dimensions}</p>
              <p className={`text-sm font-semibold mt-2 ${selectedSize === sizeId ? "text-white" : "text-brand-600"}`}>
                {formatPrice(sizeInfo.price)}
              </p>
              
              {selectedSize === sizeId && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-charcoal rounded-full flex items-center justify-center ring-2 ring-white"
                >
                  <Check size={12} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Frame Selection */}
      <div>
        <p className="text-sm text-brand-500 mb-3">Frame Option</p>
        <div className="grid grid-cols-2 gap-3">
          {priceConfig.frames.map((frame) => (
            <motion.button
              key={frame.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFrameChange(frame)}
              className={`
                relative p-4 rounded-xl text-left transition-all duration-200 flex items-center gap-3
                ${selectedFrame.id === frame.id
                  ? "bg-charcoal text-white ring-2 ring-charcoal ring-offset-2"
                  : "bg-brand-50 text-charcoal hover:bg-brand-100"
                }
              `}
            >
              {/* Frame color preview */}
              <div
                className="w-8 h-8 rounded-md flex-shrink-0 ring-1 ring-brand-200"
                style={{
                  backgroundColor:
                    frame.id === "none"
                      ? "transparent"
                      : frame.id === "black"
                        ? "#1a1a1a"
                        : frame.id === "white"
                          ? "#ffffff"
                          : "#d4a574",
                  backgroundImage:
                    frame.id === "none"
                      ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
                      : "none",
                  backgroundSize: frame.id === "none" ? "8px 8px" : "auto",
                  backgroundPosition: frame.id === "none" ? "0 0, 0 4px, 4px -4px, -4px 0px" : "auto",
                }}
              />

              <div className="flex-grow">
                <p className="font-medium text-sm">{frame.name}</p>
                <p className={`text-xs ${selectedFrame.id === frame.id ? "text-white/70" : "text-brand-500"}`}>
                  {frame.price === 0 ? "Included" : `+${formatPrice(frame.price)}`}
                </p>
              </div>

              {selectedFrame.id === frame.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-charcoal rounded-full flex items-center justify-center ring-2 ring-white"
                >
                  <Check size={12} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
