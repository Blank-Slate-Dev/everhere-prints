// src/components/create-moonphase/MoonPhasePrintPreview.tsx
"use client";

import { useMemo, RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { getMoonPhaseStyle, MOON_PREVIEW_STARS } from "@/lib/moonPhaseConfig";
import { calculateMoonPhase } from "@/lib/moonPhaseCalculations";

interface MoonPhasePrintPreviewProps {
  customization: MoonPhaseCustomization;
  product: MoonPhaseProductSelection;
  captureRef?: RefObject<HTMLDivElement | null>;
}

function getMoonImageNumber(phase: number): number {
  const p = ((phase % 1) + 1) % 1;
  if (p < 0.02 || p > 0.98) return 24;
  if (p < 0.25) { const t = p / 0.25; const img = 24 + t * 7; return Math.round(img > 24 ? img - 24 : img); }
  else if (p < 0.5) { const t = (p - 0.25) / 0.25; return Math.round(7 + t * 5); }
  else if (p < 0.75) { const t = (p - 0.5) / 0.25; return Math.round(12 + t * 7); }
  else { const t = (p - 0.75) / 0.25; return Math.round(19 + t * 5); }
}

export default function MoonPhasePrintPreview({
  customization,
  product,
  captureRef,
}: MoonPhasePrintPreviewProps) {
  const { title, subtitle, dateText, date, styleId, showStars, showPhaseLabel } = customization;
  const { frame } = product;

  const style = getMoonPhaseStyle(styleId);
  const hasFrame = frame.id !== "none";

  const moonData = useMemo(() => calculateMoonPhase(date), [date]);
  const moonImageNumber = useMemo(() => getMoonImageNumber(moonData.phase), [moonData.phase]);

  const frameColors: Record<string, string> = { none: "transparent", black: "#1a1a1a", white: "#ffffff", oak: "#d4a574" };
  const frameShadow: Record<string, string> = { none: "", black: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", white: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", oak: "0 25px 50px -12px rgba(0, 0, 0, 0.35)" };
  const captureFrameColors: Record<string, string> = { none: "transparent", black: "#1a1a1a", white: "#f0f0f0", oak: "#b8854a" };
  const captureFrameColor = captureFrameColors[frame.id] || "transparent";

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full relative">
      {/* ==================== VISUAL PREVIEW ==================== */}
      <div className="relative mx-auto max-w-md">
        <div className="rounded-sm overflow-hidden" style={{ padding: hasFrame ? "16px" : "0", backgroundColor: frameColors[frame.id], boxShadow: frameShadow[frame.id] }}>
          <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1.414", backgroundColor: style.backgroundColor }}>
            {/* Background Stars */}
            {showStars && style.showStars && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {MOON_PREVIEW_STARS.map((star, i) => (
                  <div key={i} className="absolute rounded-full" style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, backgroundColor: style.starsColor, opacity: star.opacity * 0.5 }} />
                ))}
              </div>
            )}

            <div className="relative w-full h-full flex flex-col items-center justify-between p-8 sm:p-12">
              {/* Title */}
              <div className="text-center z-10 pt-4 sm:pt-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium tracking-wide" style={{ color: style.textColor }}>
                  {title || "Under This Moon"}
                </h1>
              </div>

              {/* Moon */}
              <div className="flex-1 flex items-center justify-center w-full z-10 py-4">
                <MoonImage imageNumber={moonImageNumber} style={style} showPhaseLabel={showPhaseLabel} phaseName={moonData.phaseName} />
              </div>

              {/* Details */}
              <div className="text-center z-10 pb-4 sm:pb-8 space-y-2">
                {subtitle && <p className="text-base sm:text-lg md:text-xl font-serif tracking-wide" style={{ color: style.textColor, opacity: 0.9 }}>{subtitle}</p>}
                {dateText && <p className="text-sm sm:text-base tracking-widest uppercase" style={{ color: style.accentColor }}>{dateText}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasFrame && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-brand-500 mt-4">Preview shown with {frame.name.toLowerCase()}</motion.p>}

      {/* ==================== HIDDEN CAPTURE ELEMENT ==================== */}
      <div ref={captureRef} aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, width: "300px", backgroundColor: "#ffffff" }}>
        <div style={{ padding: hasFrame ? "10px" : "0px", backgroundColor: captureFrameColor, borderRadius: "2px" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1.414", backgroundColor: style.backgroundColor, overflow: "hidden" }}>
            {/* Stars for capture */}
            {showStars && style.showStars && (
              <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                {MOON_PREVIEW_STARS.slice(0, 30).map((star, i) => (
                  <div key={i} style={{ position: "absolute", left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, backgroundColor: style.starsColor, borderRadius: "50%", opacity: star.opacity * 0.5 }} />
                ))}
              </div>
            )}

            {/* Content */}
            <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "20px 16px" }}>
              {/* Title */}
              <div style={{ textAlign: "center", paddingTop: "8px" }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", color: style.textColor }}>{title || "Under This Moon"}</p>
              </div>

              {/* Moon placeholder */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>
                <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: style.moonGlowColor, opacity: 0.8, boxShadow: `0 0 30px ${style.moonGlowColor}` }} />
              </div>

              {/* Details */}
              <div style={{ textAlign: "center", paddingBottom: "8px" }}>
                {subtitle && <p style={{ fontFamily: "Georgia, serif", fontSize: "10px", letterSpacing: "0.03em", color: style.textColor, opacity: 0.9, marginBottom: "4px" }}>{subtitle}</p>}
                {dateText && <p style={{ fontSize: "7px", letterSpacing: "0.15em", textTransform: "uppercase", color: style.accentColor }}>{dateText}</p>}
                {showPhaseLabel && <p style={{ fontSize: "6px", letterSpacing: "0.1em", textTransform: "uppercase", color: style.accentColor, marginTop: "4px" }}>{moonData.phaseName}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface MoonImageProps {
  imageNumber: number;
  style: ReturnType<typeof getMoonPhaseStyle>;
  showPhaseLabel: boolean;
  phaseName: string;
}

function MoonImage({ imageNumber, style, showPhaseLabel, phaseName }: MoonImageProps) {
  const size = 200;
  const isLightStyle = style.id === "celestial";

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: style.moonGlowColor, transform: "scale(1.3)", opacity: 0.6 }} />
      <div className="relative rounded-full overflow-hidden" style={{ width: size, height: size, filter: isLightStyle ? "invert(1) brightness(0.9)" : "none" }}>
        <Image src={`/moon${imageNumber}.png`} alt={phaseName} width={512} height={512} className="w-full h-full object-cover" priority />
      </div>
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `inset 0 0 20px ${style.moonGlowColor}` }} />
      {showPhaseLabel && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <p className="text-xs sm:text-sm tracking-widest uppercase" style={{ color: style.accentColor }}>{phaseName}</p>
        </motion.div>
      )}
    </div>
  );
}
