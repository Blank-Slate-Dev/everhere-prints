// src/components/create-starmap/StarMapPrintPreview.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { StarMapCustomization, StarMapProductSelection } from "@/types";
import { getStarMapStyle } from "@/lib/starMapConfig";
import { renderStarMap } from "@/lib/starMapRenderer";

interface StarMapPrintPreviewProps {
  customization: StarMapCustomization;
  product: StarMapProductSelection;
}

export default function StarMapPrintPreview({
  customization,
  product,
}: StarMapPrintPreviewProps) {
  const {
    title,
    subtitle,
    dateText,
    date,
    time,
    location,
    styleId,
    showConstellations,
    showConstellationNames,
    showGrid,
    showMilkyWay,
  } = customization;
  const { frame, size } = product;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);

  const style = getStarMapStyle(styleId);
  const hasFrame = frame.id !== "none";

  // Render star map when options change
  useEffect(() => {
    if (!canvasRef.current || !location) return;

    setIsRendering(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Parse time - use nullish coalescing (??) instead of OR (||) 
    // because 0 is a valid hour (midnight) but falsy in JavaScript
    const [hours, minutes] = time.split(":").map(Number);
    const renderDate = new Date(date);
    renderDate.setHours(hours ?? 21, minutes ?? 0, 0, 0);

    // Render with small delay for smooth transitions
    const timer = setTimeout(() => {
      renderStarMap(ctx, {
        date: renderDate,
        latitude: location.latitude,
        longitude: location.longitude,
        styleId,
        showConstellations,
        showConstellationNames,
        showGrid,
        showMilkyWay,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      });
      setIsRendering(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [
    date,
    time,
    location,
    styleId,
    showConstellations,
    showConstellationNames,
    showGrid,
    showMilkyWay,
  ]);

  const formatLocationName = (placeName: string): string => {
    const parts = placeName.split(",");
    if (parts.length >= 2) {
      return `${parts[0].trim()}, ${parts[parts.length - 1].trim()}`;
    }
    return placeName;
  };

  // Frame configuration
  const frameConfig = {
    none: {
      outerBg: "transparent",
      frameWidth: 0,
      shadowColor: "rgba(0,0,0,0.2)",
      edgeHighlight: "transparent",
      edgeShadow: "transparent",
    },
    black: {
      outerBg:
        "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 30%, #0d0d0d 70%, #1a1a1a 100%)",
      edgeHighlight: "rgba(255,255,255,0.1)",
      edgeShadow: "rgba(0,0,0,0.9)",
      frameWidth: 16,
      shadowColor: "rgba(0,0,0,0.6)",
    },
    white: {
      outerBg:
        "linear-gradient(145deg, #ffffff 0%, #f5f5f5 30%, #ebebeb 70%, #f5f5f5 100%)",
      edgeHighlight: "rgba(255,255,255,1)",
      edgeShadow: "rgba(0,0,0,0.12)",
      frameWidth: 16,
      shadowColor: "rgba(0,0,0,0.2)",
    },
    oak: {
      outerBg:
        "linear-gradient(145deg, #dbb896 0%, #c49660 30%, #9a7042 70%, #b8854a 100%)",
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
        {/* Drop shadow */}
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
              ? `4px 8px 25px -5px ${config.shadowColor}, 8px 16px 40px -10px rgba(0,0,0,0.25)`
              : `4px 8px 25px -8px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Frame edge highlights */}
          {hasFrame && (
            <>
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
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
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
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
            </>
          )}

          {/* Inner rebate shadow */}
          {hasFrame && (
            <div
              className="absolute rounded-sm pointer-events-none"
              style={{
                inset: `${config.frameWidth - 3}px`,
                boxShadow: `inset 2px 2px 6px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(0,0,0,0.1)`,
              }}
            />
          )}

          {/* Print Content */}
          <div
            className="relative overflow-hidden"
            style={{
              backgroundColor: style.backgroundColor,
              padding: hasFrame ? "8px" : "12px",
            }}
          >
            {/* Star Map Canvas */}
            <div className="relative aspect-square w-full">
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                className="w-full h-full"
              />

              {/* Loading overlay */}
              {isRendering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}

              {/* Placeholder when no location */}
              {!location && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: style.backgroundColor }}
                >
                  <div className="text-center px-8">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed flex items-center justify-center"
                      style={{ borderColor: style.textColor, opacity: 0.3 }}
                    >
                      <svg
                        className="w-8 h-8"
                        style={{ color: style.textColor, opacity: 0.5 }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: style.textColor, opacity: 0.5 }}
                    >
                      Select a location to see your night sky
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="py-4 text-center">
              {/* Title */}
              <motion.p
                key={title}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[9px] md:text-[11px] uppercase tracking-[0.25em] mb-1"
                style={{ color: style.accentColor }}
              >
                {title || "The Night We Met"}
              </motion.p>

              {/* Location Name */}
              <motion.p
                key={location?.placeName || "placeholder"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-lg md:text-xl lg:text-2xl leading-tight"
                style={{ color: style.textColor }}
              >
                {location
                  ? formatLocationName(location.placeName)
                  : "Your Location"}
              </motion.p>

              {/* Subtitle & Date */}
              {(subtitle || dateText) && (
                <motion.p
                  key={`${subtitle}-${dateText}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] md:text-xs mt-2"
                  style={{ color: style.accentColor }}
                >
                  {subtitle}
                  {subtitle && dateText && " • "}
                  {dateText}
                </motion.p>
              )}

              {/* Coordinates */}
              {location && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[8px] md:text-[9px] font-mono mt-2"
                  style={{ color: style.textColor, opacity: 0.4 }}
                >
                  {Math.abs(location.latitude).toFixed(4)}°
                  {location.latitude >= 0 ? "N" : "S"},{" "}
                  {Math.abs(location.longitude).toFixed(4)}°
                  {location.longitude >= 0 ? "E" : "W"}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Size indicator badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -right-2 top-8 md:-right-4 md:top-12 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-10"
      >
        {size} Preview
      </motion.div>
    </motion.div>
  );
}