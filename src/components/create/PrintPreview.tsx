// src/components/create/PrintPreview.tsx
"use client";

import { motion } from "framer-motion";
import { PrintCustomization, ProductSelection } from "@/types";
import MapPreview from "./MapPreview";

interface PrintPreviewProps {
  customization: PrintCustomization;
  product: ProductSelection;
}

export default function PrintPreview({ customization, product }: PrintPreviewProps) {
  const { title, subtitle, date, location, style, zoom } = customization;
  const { frame } = product;

  const formatLocationName = (placeName: string): string => {
    const parts = placeName.split(",");
    if (parts.length >= 2) {
      return `${parts[0].trim()}, ${parts[parts.length - 1].trim()}`;
    }
    return placeName;
  };

  // Text colors based on map style
  const textColor = style === "night" ? "text-white" : "text-charcoal";
  const subtitleColor = style === "night" ? "text-gray-300" : "text-brand-500";
  const dateColor = style === "night" ? "text-gray-400" : "text-brand-600";
  const coordsColor = style === "night" ? "text-gray-500" : "text-brand-400";
  const gradientBg = style === "night" 
    ? "bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" 
    : "bg-gradient-to-t from-white via-white/80 to-transparent";

  const hasFrame = frame.id !== "none";

  // Light source: Top-left (135deg angle)
  // All highlights face top-left, all shadows face bottom-right

  const frameConfig = {
    none: {
      outerBg: "transparent",
      frameWidth: 0,
      shadowColor: "rgba(0,0,0,0.2)",
      edgeHighlight: "transparent",
      edgeShadow: "transparent",
    },
    black: {
      outerBg: "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 30%, #0d0d0d 70%, #1a1a1a 100%)",
      edgeHighlight: "rgba(255,255,255,0.1)",
      edgeShadow: "rgba(0,0,0,0.9)",
      frameWidth: 16,
      shadowColor: "rgba(0,0,0,0.6)",
    },
    white: {
      outerBg: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 30%, #ebebeb 70%, #f5f5f5 100%)",
      edgeHighlight: "rgba(255,255,255,1)",
      edgeShadow: "rgba(0,0,0,0.12)",
      frameWidth: 16,
      shadowColor: "rgba(0,0,0,0.2)",
    },
    oak: {
      outerBg: "linear-gradient(145deg, #dbb896 0%, #c49660 30%, #9a7042 70%, #b8854a 100%)",
      edgeHighlight: "rgba(255,230,200,0.5)",
      edgeShadow: "rgba(60,35,10,0.7)",
      frameWidth: 16,
      shadowColor: "rgba(80,50,20,0.4)",
    },
  };

  const config = frameConfig[frame.id as keyof typeof frameConfig];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Frame Container */}
      <div className="relative mx-auto max-w-md">
        
        {/* Drop shadow - offset to bottom-right (away from light) */}
        <div 
          className="absolute inset-0 rounded-sm"
          style={{
            transform: "translate(6px, 10px)",
            filter: "blur(25px)",
            background: config.shadowColor,
            opacity: 0.7,
          }}
        />

        {/* Outer frame wrapper */}
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          className="relative"
          style={{
            padding: hasFrame ? `${config.frameWidth}px` : "0px",
            background: hasFrame ? config.outerBg : "transparent",
            borderRadius: hasFrame ? "3px" : "2px",
            boxShadow: hasFrame 
              ? `
                4px 8px 25px -5px ${config.shadowColor},
                8px 16px 40px -10px rgba(0,0,0,0.25)
              `
              : `4px 8px 25px -8px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Frame highlight - top & left edges (facing light) */}
          {hasFrame && (
            <div 
              className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden"
            >
              {/* Top edge highlight */}
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${config.edgeHighlight} 0%, ${config.edgeHighlight} 70%, transparent 100%)`,
                }}
              />
              {/* Left edge highlight */}
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "2px",
                  background: `linear-gradient(180deg, ${config.edgeHighlight} 0%, ${config.edgeHighlight} 70%, transparent 100%)`,
                }}
              />
            </div>
          )}

          {/* Frame shadow - bottom & right edges (away from light) */}
          {hasFrame && (
            <div 
              className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden"
            >
              {/* Bottom edge shadow */}
              <div 
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, transparent 0%, ${config.edgeShadow} 30%, ${config.edgeShadow} 100%)`,
                }}
              />
              {/* Right edge shadow */}
              <div 
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "2px",
                  background: `linear-gradient(180deg, transparent 0%, ${config.edgeShadow} 30%, ${config.edgeShadow} 100%)`,
                }}
              />
            </div>
          )}

          {/* Inner rebate shadow (where glass sits in frame) */}
          {hasFrame && (
            <div 
              className="absolute rounded-sm pointer-events-none"
              style={{
                inset: `${config.frameWidth - 3}px`,
                boxShadow: `
                  inset 2px 2px 6px rgba(0,0,0,0.2),
                  inset 1px 1px 2px rgba(0,0,0,0.1)
                `,
              }}
            />
          )}

          {/* White mat/mount */}
          <div 
            className="relative bg-white"
            style={{
              padding: hasFrame ? "8px" : "12px",
              boxShadow: hasFrame 
                ? `inset 1px 1px 3px rgba(0,0,0,0.04)`
                : "none",
            }}
          >
            {/* Mat highlight on top-left */}
            {hasFrame && (
              <div 
                className="absolute pointer-events-none"
                style={{
                  top: 0,
                  left: 0,
                  right: "50%",
                  bottom: "50%",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)",
                }}
              />
            )}

            {/* Print Content */}
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-100">
              {/* Map */}
              <MapPreview location={location} style={style} zoom={zoom} />

              {/* Glass sheen - soft diagonal from top-left light source */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.06) 0%,
                      rgba(255,255,255,0.03) 20%,
                      rgba(255,255,255,0.01) 40%,
                      transparent 60%,
                      transparent 100%
                    )
                  `,
                }}
              />

              {/* Soft vignette shadow from frame edge - stronger on bottom-right */}
              {hasFrame && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: `
                      inset 8px 8px 20px -10px rgba(255,255,255,0.03),
                      inset -8px -8px 25px -10px rgba(0,0,0,0.08)
                    `,
                  }}
                />
              )}

              {/* Gradient Overlay for Text Readability */}
              <div className={`absolute inset-x-0 bottom-0 h-1/3 pointer-events-none ${gradientBg}`} />

              {/* Text Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-center pointer-events-none">
                {/* Title */}
                <motion.p
                  key={title}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-[10px] md:text-xs uppercase tracking-[0.25em] mb-2 ${subtitleColor}`}
                >
                  {title || "Where We Met"}
                </motion.p>

                {/* Location Name */}
                <motion.p
                  key={location?.placeName || "placeholder"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`font-serif text-lg md:text-xl lg:text-2xl ${textColor}`}
                >
                  {location ? formatLocationName(location.placeName) : "Your Location"}
                </motion.p>

                {/* Subtitle (Names) & Date */}
                {(subtitle || date) && (
                  <motion.p
                    key={`${subtitle}-${date}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm mt-2 ${dateColor}`}
                  >
                    {subtitle}
                    {subtitle && date && " • "}
                    {date}
                  </motion.p>
                )}
              </div>

              {/* Coordinates */}
              {location && (
                <div
                  className={`absolute top-4 left-4 text-[8px] md:text-[10px] font-mono pointer-events-none ${coordsColor}`}
                >
                  {location.latitude.toFixed(4)}°{location.latitude >= 0 ? "N" : "S"},{" "}
                  {Math.abs(location.longitude).toFixed(4)}°{location.longitude >= 0 ? "E" : "W"}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -right-2 top-8 md:-right-4 md:top-12 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-10"
      >
        Live Preview
      </motion.div>
    </motion.div>
  );
}