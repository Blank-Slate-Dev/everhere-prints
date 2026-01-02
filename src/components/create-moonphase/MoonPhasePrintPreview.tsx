// src/components/create-moonphase/MoonPhasePrintPreview.tsx
"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { getMoonPhaseStyle, MOON_PREVIEW_STARS } from "@/lib/moonPhaseConfig";
import { calculateMoonPhase, getPhaseAngle } from "@/lib/moonPhaseCalculations";

interface MoonPhasePrintPreviewProps {
  customization: MoonPhaseCustomization;
  product: MoonPhaseProductSelection;
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
  const { isWaxing, illuminationPercent } = useMemo(
    () => getPhaseAngle(moonData.phase),
    [moonData.phase]
  );

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
                <RealisticMoon
                  phase={moonData.phase}
                  isWaxing={isWaxing}
                  illuminationPercent={illuminationPercent}
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

// Realistic Moon Component using Canvas
interface RealisticMoonProps {
  phase: number;
  isWaxing: boolean;
  illuminationPercent: number;
  style: ReturnType<typeof getMoonPhaseStyle>;
  showPhaseLabel: boolean;
  phaseName: string;
}

function RealisticMoon({
  phase,
  isWaxing,
  illuminationPercent,
  style,
  showPhaseLabel,
  phaseName,
}: RealisticMoonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerSize = 240;
  const moonRadius = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI support
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = containerSize * dpr;
    canvas.height = containerSize * dpr;
    canvas.style.width = `${containerSize}px`;
    canvas.style.height = `${containerSize}px`;
    ctx.scale(dpr, dpr);

    const centerX = containerSize / 2;
    const centerY = containerSize / 2;

    // Clear canvas
    ctx.clearRect(0, 0, containerSize, containerSize);

    // Draw outer glow
    const glowGradient = ctx.createRadialGradient(
      centerX, centerY, moonRadius * 0.9,
      centerX, centerY, moonRadius * 1.4
    );
    glowGradient.addColorStop(0, style.moonGlowColor);
    glowGradient.addColorStop(1, "transparent");
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, containerSize, containerSize);

    // Create moon base with realistic coloring
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, moonRadius, 0, Math.PI * 2);
    ctx.clip();

    // Base moon color - warm gray like real moon
    const isLightStyle = style.id === "celestial";
    const baseColor = isLightStyle ? "#2a2a35" : "#d8d4c8";
    ctx.fillStyle = baseColor;
    ctx.fillRect(centerX - moonRadius, centerY - moonRadius, moonRadius * 2, moonRadius * 2);

    // Draw maria (dark seas) - based on real lunar maria positions
    const mariaColor = isLightStyle ? "#1a1a22" : "#8a8880";
    drawMaria(ctx, centerX, centerY, moonRadius, mariaColor);

    // Draw highland texture
    drawHighlandTexture(ctx, centerX, centerY, moonRadius, isLightStyle);

    // Draw craters
    const craterColor = isLightStyle ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";
    const craterHighlight = isLightStyle ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.15)";
    drawCraters(ctx, centerX, centerY, moonRadius, craterColor, craterHighlight);

    // Draw crater rays (Tycho, Copernicus)
    drawCraterRays(ctx, centerX, centerY, moonRadius, isLightStyle);

    // Apply limb darkening for 3D effect
    const limbGradient = ctx.createRadialGradient(
      centerX, centerY, moonRadius * 0.5,
      centerX, centerY, moonRadius
    );
    limbGradient.addColorStop(0, "transparent");
    limbGradient.addColorStop(0.7, "transparent");
    limbGradient.addColorStop(1, isLightStyle ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.2)");
    ctx.fillStyle = limbGradient;
    ctx.fillRect(centerX - moonRadius, centerY - moonRadius, moonRadius * 2, moonRadius * 2);

    ctx.restore();

    // Draw phase shadow
    if (illuminationPercent < 100) {
      drawPhaseShadow(ctx, centerX, centerY, moonRadius, phase, isWaxing, illuminationPercent, style);
    }

    // Draw subtle rim highlight
    ctx.beginPath();
    ctx.arc(centerX, centerY, moonRadius - 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = isLightStyle ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();

  }, [phase, isWaxing, illuminationPercent, style, containerSize, moonRadius]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{
          width: containerSize,
          height: containerSize,
        }}
      />

      {/* Phase Label */}
      {showPhaseLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
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

// Draw lunar maria (the dark "seas")
function drawMaria(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string
) {
  ctx.fillStyle = color;

  // Mare Tranquillitatis (Sea of Tranquility) - right side
  ctx.beginPath();
  ctx.ellipse(cx + radius * 0.25, cy - radius * 0.1, radius * 0.25, radius * 0.2, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Mare Serenitatis (Sea of Serenity) - upper right
  ctx.beginPath();
  ctx.ellipse(cx + radius * 0.15, cy - radius * 0.35, radius * 0.2, radius * 0.18, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Mare Imbrium (Sea of Rains) - upper left, largest
  ctx.beginPath();
  ctx.ellipse(cx - radius * 0.2, cy - radius * 0.25, radius * 0.35, radius * 0.28, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Mare Nubium (Sea of Clouds) - lower left
  ctx.beginPath();
  ctx.ellipse(cx - radius * 0.15, cy + radius * 0.35, radius * 0.22, radius * 0.15, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Mare Frigoris (Sea of Cold) - top
  ctx.beginPath();
  ctx.ellipse(cx, cy - radius * 0.6, radius * 0.4, radius * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  // Oceanus Procellarum (Ocean of Storms) - left side, very large
  ctx.beginPath();
  ctx.ellipse(cx - radius * 0.4, cy, radius * 0.25, radius * 0.45, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // Mare Crisium (Sea of Crises) - right edge, isolated
  ctx.beginPath();
  ctx.ellipse(cx + radius * 0.55, cy - radius * 0.2, radius * 0.12, radius * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mare Fecunditatis (Sea of Fertility) - lower right
  ctx.beginPath();
  ctx.ellipse(cx + radius * 0.4, cy + radius * 0.2, radius * 0.18, radius * 0.15, -0.3, 0, Math.PI * 2);
  ctx.fill();
}

// Draw highland texture
function drawHighlandTexture(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  isLightStyle: boolean
) {
  // Add subtle noise texture to highlands
  const textureColor = isLightStyle ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)";
  
  for (let i = 0; i < 200; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius * 0.95;
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    const size = Math.random() * 3 + 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = textureColor;
    ctx.fill();
  }
}

// Draw craters
function drawCraters(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  shadowColor: string,
  highlightColor: string
) {
  // Major craters with positions based on real lunar geography
  const craters = [
    // Tycho - prominent crater in southern highlands
    { x: 0, y: 0.65, size: 0.08, prominent: true },
    // Copernicus - prominent crater with rays
    { x: -0.25, y: 0.05, size: 0.07, prominent: true },
    // Kepler
    { x: -0.5, y: 0, size: 0.04, prominent: false },
    // Aristarchus - very bright
    { x: -0.55, y: -0.25, size: 0.035, prominent: true },
    // Plato - dark floor
    { x: -0.05, y: -0.55, size: 0.06, prominent: false },
    // Various smaller craters
    { x: 0.3, y: 0.4, size: 0.03, prominent: false },
    { x: -0.35, y: 0.45, size: 0.025, prominent: false },
    { x: 0.45, y: -0.3, size: 0.03, prominent: false },
    { x: 0.2, y: -0.5, size: 0.025, prominent: false },
    { x: -0.4, y: -0.4, size: 0.035, prominent: false },
    { x: 0.5, y: 0.1, size: 0.02, prominent: false },
    { x: -0.15, y: 0.5, size: 0.025, prominent: false },
    { x: 0.35, y: -0.15, size: 0.02, prominent: false },
    { x: -0.3, y: 0.2, size: 0.02, prominent: false },
    { x: 0.1, y: 0.3, size: 0.018, prominent: false },
  ];

  craters.forEach((crater) => {
    const craterX = cx + crater.x * radius;
    const craterY = cy + crater.y * radius;
    const craterRadius = crater.size * radius;

    // Crater shadow (gives depth)
    ctx.beginPath();
    ctx.arc(craterX, craterY, craterRadius, 0, Math.PI * 2);
    ctx.fillStyle = shadowColor;
    ctx.fill();

    // Crater rim highlight (subtle)
    if (crater.prominent) {
      ctx.beginPath();
      ctx.arc(craterX - craterRadius * 0.2, craterY - craterRadius * 0.2, craterRadius * 0.9, 0, Math.PI * 2);
      ctx.strokeStyle = highlightColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });
}

// Draw crater rays (bright ejecta patterns)
function drawCraterRays(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  isLightStyle: boolean
) {
  const rayColor = isLightStyle ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)";
  
  // Tycho rays - most prominent ray system on the Moon
  const tychoX = cx;
  const tychoY = cy + radius * 0.65;
  
  ctx.strokeStyle = rayColor;
  ctx.lineWidth = 2;
  
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const rayLength = radius * (0.5 + Math.random() * 0.4);
    
    ctx.beginPath();
    ctx.moveTo(tychoX, tychoY);
    ctx.lineTo(
      tychoX + Math.cos(angle) * rayLength,
      tychoY + Math.sin(angle) * rayLength * 0.8
    );
    ctx.stroke();
  }

  // Copernicus rays
  const copX = cx - radius * 0.25;
  const copY = cy + radius * 0.05;
  
  ctx.lineWidth = 1.5;
  
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const rayLength = radius * (0.2 + Math.random() * 0.2);
    
    ctx.beginPath();
    ctx.moveTo(copX, copY);
    ctx.lineTo(
      copX + Math.cos(angle) * rayLength,
      copY + Math.sin(angle) * rayLength
    );
    ctx.stroke();
  }
}

// Draw phase shadow with soft terminator
function drawPhaseShadow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  phase: number,
  isWaxing: boolean,
  illuminationPercent: number,
  style: ReturnType<typeof getMoonPhaseStyle>
) {
  ctx.save();

  // Clip to moon circle
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  if (illuminationPercent <= 0) {
    // New moon - all shadow
    ctx.fillStyle = style.moonShadowColor;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    ctx.restore();
    return;
  }

  if (illuminationPercent < 50) {
    // Less than half lit - shadow covers most of the moon
    if (isWaxing) {
      // Waxing crescent - lit on right, shadow on left
      const litWidth = (illuminationPercent / 50) * radius;
      
      // Draw shadow from left edge to terminator
      const gradient = ctx.createLinearGradient(
        cx - radius, cy,
        cx + radius - litWidth, cy
      );
      gradient.addColorStop(0, style.moonShadowColor);
      gradient.addColorStop(0.85, style.moonShadowColor);
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(cx - radius, cy - radius, radius * 2 - litWidth + radius * 0.1, radius * 2);
    } else {
      // Waning crescent - lit on left, shadow on right
      const litWidth = (illuminationPercent / 50) * radius;
      
      const gradient = ctx.createLinearGradient(
        cx + radius, cy,
        cx - radius + litWidth, cy
      );
      gradient.addColorStop(0, style.moonShadowColor);
      gradient.addColorStop(0.85, style.moonShadowColor);
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(cx - radius + litWidth - radius * 0.1, cy - radius, radius * 2 - litWidth + radius * 0.1, radius * 2);
    }
  } else {
    // More than half lit - shadow covers less than half
    const shadowWidth = ((100 - illuminationPercent) / 50) * radius;
    
    if (isWaxing) {
      // Waxing gibbous - small shadow on left
      const gradient = ctx.createLinearGradient(
        cx - radius, cy,
        cx - radius + shadowWidth * 2, cy
      );
      gradient.addColorStop(0, style.moonShadowColor);
      gradient.addColorStop(0.7, style.moonShadowColor);
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(cx - radius, cy - radius, shadowWidth * 2 + radius * 0.15, radius * 2);
    } else {
      // Waning gibbous - small shadow on right
      const gradient = ctx.createLinearGradient(
        cx + radius, cy,
        cx + radius - shadowWidth * 2, cy
      );
      gradient.addColorStop(0, style.moonShadowColor);
      gradient.addColorStop(0.7, style.moonShadowColor);
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(cx + radius - shadowWidth * 2 - radius * 0.15, cy - radius, shadowWidth * 2 + radius * 0.15, radius * 2);
    }
  }

  ctx.restore();
}
