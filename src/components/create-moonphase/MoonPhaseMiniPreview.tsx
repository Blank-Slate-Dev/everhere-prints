// src/components/create-moonphase/MoonPhaseMiniPreview.tsx
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { getMoonPhaseStyle } from "@/lib/moonPhaseConfig";
import { calculateMoonPhase } from "@/lib/moonPhaseCalculations";
import { calculateTotal, formatPrice } from "@/lib/pricing";
import { ChevronUp } from "lucide-react";

interface MoonPhaseMiniPreviewProps {
  customization: MoonPhaseCustomization;
  product: MoonPhaseProductSelection;
  onTap: () => void;
}

/**
 * Maps moon phase (0-1) to image number (1-24)
 * Image 24 = New Moon, Image 12 = Full Moon
 */
function getMoonImageNumber(phase: number): number {
  const p = ((phase % 1) + 1) % 1;
  
  if (p < 0.02 || p > 0.98) {
    return 24;
  }
  
  if (p < 0.25) {
    const t = p / 0.25;
    const img = 24 + t * 7;
    return Math.round(img > 24 ? img - 24 : img);
  } else if (p < 0.5) {
    const t = (p - 0.25) / 0.25;
    return Math.round(7 + t * 5);
  } else if (p < 0.75) {
    const t = (p - 0.5) / 0.25;
    return Math.round(12 + t * 7);
  } else {
    const t = (p - 0.75) / 0.25;
    return Math.round(19 + t * 5);
  }
}

export default function MoonPhaseMiniPreview({
  customization,
  product,
  onTap,
}: MoonPhaseMiniPreviewProps) {
  const style = getMoonPhaseStyle(customization.styleId);
  const total = calculateTotal(product.size, product.frame);

  const moonData = useMemo(
    () => calculateMoonPhase(customization.date),
    [customization.date]
  );

  const moonImageNumber = useMemo(
    () => getMoonImageNumber(moonData.phase),
    [moonData.phase]
  );

  const isLightStyle = style.id === "celestial";

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
          {/* Mini Moon Preview */}
          <div
            className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{ backgroundColor: style.backgroundColor }}
          >
            <div
              className="relative w-8 h-8 rounded-full overflow-hidden"
              style={{
                filter: isLightStyle ? "invert(1) brightness(0.9)" : "none",
              }}
            >
              <Image
                src={`/moon${moonImageNumber}.png`}
                alt={moonData.phaseName}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-grow text-left">
            <p className="text-sm font-medium text-charcoal truncate">
              {customization.title || "Under This Moon"}
            </p>
            <p className="text-xs text-brand-500">
              {moonData.phaseName} • {product.size} Print
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
