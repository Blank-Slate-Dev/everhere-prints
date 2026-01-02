// src/components/create-moonphase/MoonPhaseMiniPreview.tsx
"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { getMoonPhaseStyle } from "@/lib/moonPhaseConfig";
import { calculateMoonPhase, getPhaseAngle } from "@/lib/moonPhaseCalculations";
import { calculateTotal, formatPrice } from "@/lib/pricing";
import { ChevronUp } from "lucide-react";

interface MoonPhaseMiniPreviewProps {
  customization: MoonPhaseCustomization;
  product: MoonPhaseProductSelection;
  onTap: () => void;
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

  const { isWaxing, illuminationPercent } = useMemo(
    () => getPhaseAngle(moonData.phase),
    [moonData.phase]
  );

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
            <MiniMoon
              isWaxing={isWaxing}
              illuminationPercent={illuminationPercent}
              isLightStyle={style.id === "celestial"}
            />
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

// Simplified Mini Moon Component using Canvas
interface MiniMoonProps {
  isWaxing: boolean;
  illuminationPercent: number;
  isLightStyle: boolean;
}

function MiniMoon({ isWaxing, illuminationPercent, isLightStyle }: MiniMoonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 32;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 12;

    ctx.clearRect(0, 0, size, size);

    // Draw base moon
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    // Base color
    const baseColor = isLightStyle ? "#2a2a35" : "#d8d4c8";
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, size, size);

    // Simple maria
    const mariaColor = isLightStyle ? "#1a1a22" : "#9a9890";
    ctx.fillStyle = mariaColor;
    ctx.beginPath();
    ctx.ellipse(cx - radius * 0.2, cy - radius * 0.2, radius * 0.3, radius * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + radius * 0.2, cy - radius * 0.05, radius * 0.2, radius * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx - radius * 0.35, cy + radius * 0.1, radius * 0.2, radius * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Draw phase shadow
    if (illuminationPercent < 100) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      const shadowColor = isLightStyle ? "#faf8f5" : "#0a1628";

      if (illuminationPercent < 50) {
        const litWidth = (illuminationPercent / 50) * radius;
        if (isWaxing) {
          ctx.fillStyle = shadowColor;
          ctx.fillRect(0, 0, cx + radius - litWidth, size);
        } else {
          ctx.fillStyle = shadowColor;
          ctx.fillRect(cx - radius + litWidth, 0, size, size);
        }
      } else {
        const shadowWidth = ((100 - illuminationPercent) / 50) * radius;
        if (isWaxing) {
          ctx.fillStyle = shadowColor;
          ctx.fillRect(0, 0, cx - radius + shadowWidth * 2, size);
        } else {
          ctx.fillStyle = shadowColor;
          ctx.fillRect(cx + radius - shadowWidth * 2, 0, size, size);
        }
      }

      ctx.restore();
    }

  }, [isWaxing, illuminationPercent, isLightStyle]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
    />
  );
}
