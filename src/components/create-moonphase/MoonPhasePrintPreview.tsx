// src/components/create-moonphase/MoonPhasePrintPreview.tsx
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { getMoonPhaseStyle, MOON_PREVIEW_STARS } from "@/lib/moonPhaseConfig";
import { calculateMoonPhase } from "@/lib/moonPhaseCalculations";

interface MoonPhasePrintPreviewProps {
  customization: MoonPhaseCustomization;
  product: MoonPhaseProductSelection;
}

/**
 * Maps moon phase (0-1) to image number (1-24) based on actual image content:
 * - Image 24: New Moon (phase 0)
 * - Image 7: First Quarter (phase 0.25)
 * - Image 12: Full Moon (phase 0.5)
 * - Image 19: Last Quarter (phase 0.75)
 * - Image 24: New Moon again (phase 1)
 */
function getMoonImageNumber(phase: number): number {
  // Normalize phase to 0-1 range
  const p = ((phase % 1) + 1) % 1;
  
  // New moon check (phase ~0 or ~1)
  if (p < 0.02 || p > 0.98) {
    return 24;
  }
  
  if (p < 0.25) {
    // New moon (24) → First quarter (7)
    // Wraps through 1, 2, 3, 4, 5, 6 to 7
    const t = p / 0.25;
    const img = 24 + t * 7; // 24 → 31
    return Math.round(img > 24 ? img - 24 : img);
  } else if (p < 0.5) {
    // First quarter (7) → Full moon (12)
    const t = (p - 0.25) / 0.25;
    return Math.round(7 + t * 5);
  } else if (p < 0.75) {
    // Full moon (12) → Last quarter (19)
    const t = (p - 0.5) / 0.25;
    return Math.round(12 + t * 7);
  } else {
    // Last quarter (19) → New moon (24)
    const t = (p - 0.75) / 0.25;
    return Math.round(19 + t * 5);
  }
}

export default function MoonPhasePrintPreview({
  customization,
  product,
}: MoonPhasePrintPreviewProps) {
  const { title, subtitle, dateText, date, styleId, showStars, showPhaseLabel } = customization;
  const { frame } = product;

  const style = getMoonPhaseStyle(styleId);
  const hasFrame = frame.id !== "none";

  // Calculate moon phase for the selected date
  const moonData = useMemo(() => calculateMoonPhase(date), [date]);
  
  // Get the appropriate moon image number (1-24)
  const moonImageNumber = useMemo(() => getMoonImageNumber(moonData.phase), [moonData.phase]);

  // Frame colors matching other products
  const frameColors = {
    none: "transparent",
    black: "#1a1a1a",
    white: "#ffffff",
    oak: "#d4a574",
  };

  const frameShadow = {
    none: "",
    black: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    white: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    oak: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      {/* Frame Container */}
      <div
        className="relative mx-auto"
        style={{ maxWidth: "500px" }}
      >
        {/* Frame (if selected) */}
        <div
          className="rounded-sm overflow-hidden"
          style={{
            padding: hasFrame ? "16px" : "0",
            backgroundColor: frameColors[frame.id],
            boxShadow: frameShadow[frame.id],
          }}
        >
          {/* Print Container */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "1 / 1.414", // A-series paper ratio
              backgroundColor: style.backgroundColor,
            }}
          >
            {/* Background Stars */}
            {showStars && style.showStars && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {MOON_PREVIEW_STARS.map((star, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      width: `${star.size}px`,
                      height: `${star.size}px`,
                      backgroundColor: style.starsColor,
                      opacity: star.opacity * 0.5,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Print Content */}
            <div className="relative w-full h-full flex flex-col items-center justify-between p-8 sm:p-12">
              {/* Top Section - Title */}
              <div className="text-center z-10 pt-4 sm:pt-8">
                <h1
                  className="text-xl sm:text-2xl md:text-3xl font-serif font-medium tracking-wide"
                  style={{ color: style.textColor }}
                >
                  {title || "Under This Moon"}
                </h1>
              </div>

              {/* Center Section - Moon */}
              <div className="flex-1 flex items-center justify-center w-full z-10 py-4">
                <MoonImage
                  imageNumber={moonImageNumber}
                  style={style}
                  showPhaseLabel={showPhaseLabel}
                  phaseName={moonData.phaseName}
                />
              </div>

              {/* Bottom Section - Details */}
              <div className="text-center z-10 pb-4 sm:pb-8 space-y-2">
                {subtitle && (
                  <p
                    className="text-base sm:text-lg md:text-xl font-serif tracking-wide"
                    style={{ color: style.textColor, opacity: 0.9 }}
                  >
                    {subtitle}
                  </p>
                )}
                {dateText && (
                  <p
                    className="text-sm sm:text-base tracking-widest uppercase"
                    style={{ color: style.accentColor }}
                  >
                    {dateText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frame Label */}
      {hasFrame && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-brand-500 mt-4"
        >
          Preview shown with {frame.name.toLowerCase()}
        </motion.p>
      )}
    </motion.div>
  );
}

// Moon Image Component
interface MoonImageProps {
  imageNumber: number;
  style: ReturnType<typeof getMoonPhaseStyle>;
  showPhaseLabel: boolean;
  phaseName: string;
}

function MoonImage({
  imageNumber,
  style,
  showPhaseLabel,
  phaseName,
}: MoonImageProps) {
  const size = 200; // Display size in pixels
  const isLightStyle = style.id === "celestial";

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          backgroundColor: style.moonGlowColor,
          transform: "scale(1.3)",
          opacity: 0.6,
        }}
      />

      {/* Moon Image Container */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          // Apply filter for light style (inverted moon)
          filter: isLightStyle ? "invert(1) brightness(0.9)" : "none",
        }}
      >
        <Image
          src={`/moon${imageNumber}.png`}
          alt={phaseName}
          width={512}
          height={512}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Subtle rim glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${style.moonGlowColor}`,
        }}
      />

      {/* Phase Label */}
      {showPhaseLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <p
            className="text-xs sm:text-sm tracking-widest uppercase"
            style={{ color: style.accentColor }}
          >
            {phaseName}
          </p>
        </motion.div>
      )}
    </div>
  );
}
