// src/components/create-soundwave/SoundWaveMiniPreview.tsx
"use client";

import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { SoundWaveCustomization, SoundWaveProductSelection } from "@/types";
import { getSoundWaveStyle } from "@/lib/soundWaveConfig";
import { calculateTotal, formatPrice } from "@/lib/pricing";

interface SoundWaveMiniPreviewProps {
  customization: SoundWaveCustomization;
  product: SoundWaveProductSelection;
  onTap: () => void;
}

export default function SoundWaveMiniPreview({
  customization,
  product,
  onTap,
}: SoundWaveMiniPreviewProps) {
  const style = getSoundWaveStyle(customization.styleId);
  const total = calculateTotal(product.size, product.frame);
  const hasAudio = customization.waveformData.length > 0;

  // Get a subset of waveform data for mini preview
  const miniWaveform = hasAudio
    ? customization.waveformData.filter((_, i) => i % 5 === 0)
    : [0.3, 0.5, 0.8, 0.6, 0.9, 0.7, 0.4, 0.6, 0.8, 0.5];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-40 lg:hidden"
    >
      <div className="bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-sm">
        <button
          onClick={onTap}
          className="w-full px-4 py-3 flex items-center gap-3"
        >
          {/* Mini Waveform Preview */}
          <div
            className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center gap-[1px] px-1"
            style={{ backgroundColor: style.backgroundColor }}
          >
            {miniWaveform.slice(0, 10).map((amplitude, index) => (
              <div
                key={index}
                className="w-0.5 rounded-full"
                style={{
                  height: `${Math.max(10, amplitude * 100)}%`,
                  backgroundColor: style.waveColor,
                  opacity: hasAudio ? 1 : 0.4,
                }}
              />
            ))}
          </div>

          {/* Info */}
          <div className="flex-grow text-left">
            <p className="text-sm font-medium text-charcoal truncate">
              {customization.title || customization.songData?.songName || "Your Sound Wave"}
            </p>
            <p className="text-xs text-brand-500">
              {customization.songData?.artistName || style.name} • {product.size} Print
            </p>
          </div>

          {/* Price + Chevron */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-charcoal">
              {formatPrice(total)}
            </span>
            <ChevronUp size={16} className="text-brand-400" />
          </div>
        </button>
      </div>
    </motion.div>
  );
}
