// src/components/create-australia/AustraliaPrintPreview.tsx
"use client";

import { useEffect, useState, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AustraliaMapCustomization, AustraliaProductSelection } from "@/types";
import { getAustraliaMapColor, coordsToImagePosition } from "@/lib/australiaMapConfig";
import { MapPin } from "lucide-react";

interface AustraliaPrintPreviewProps {
  customization: AustraliaMapCustomization;
  product: AustraliaProductSelection;
  captureRef?: RefObject<HTMLDivElement | null>;
}

export default function AustraliaPrintPreview({
  customization,
  product,
  captureRef,
}: AustraliaPrintPreviewProps) {
  const { title, subtitle, date, location, colorId } = customization;
  const { frame, size } = product;

  const colorConfig = getAustraliaMapColor(colorId);
  const hasFrame = frame.id !== "none";

  // Calculate pin position
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number; isValid: boolean } | null>(null);
  const [showPin, setShowPin] = useState(false);

  useEffect(() => {
    if (location) {
      const position = coordsToImagePosition(location.latitude, location.longitude, colorId);
      setPinPosition(position);
      setShowPin(false);
      const timer = setTimeout(() => setShowPin(true), 100);
      return () => clearTimeout(timer);
    } else {
      setPinPosition(null);
      setShowPin(false);
    }
  }, [location, colorId]);

  const formatLocationName = (placeName: string): string => {
    const parts = placeName.split(",");
    if (parts.length >= 2) {
      return `${parts[0].trim()}, ${parts[parts.length - 1].trim()}`;
    }
    return placeName;
  };

  // Frame configuration for visual display
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

  // Simplified frame colors for capture (solid colors work better with html2canvas)
  const captureFrameColors: Record<string, string> = {
    none: "transparent",
    black: "#1a1a1a",
    white: "#f0f0f0",
    oak: "#b8854a",
  };

  const config = frameConfig[frame.id as keyof typeof frameConfig];
  const captureFrameColor = captureFrameColors[frame.id] || "transparent";
  const paperAspectRatio = 1 / Math.sqrt(2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* ==================== VISUAL PREVIEW (unchanged) ==================== */}
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
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${config.edgeHighlight} 0%, ${config.edgeHighlight} 70%, transparent 100%)` }} />
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, ${config.edgeHighlight} 0%, ${config.edgeHighlight} 70%, transparent 100%)` }} />
              </div>
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent 0%, ${config.edgeShadow} 30%, ${config.edgeShadow} 100%)` }} />
                <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, transparent 0%, ${config.edgeShadow} 30%, ${config.edgeShadow} 100%)` }} />
              </div>
            </>
          )}

          {/* Inner rebate shadow */}
          {hasFrame && (
            <div className="absolute rounded-sm pointer-events-none" style={{ inset: `${config.frameWidth - 3}px`, boxShadow: `inset 2px 2px 6px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(0,0,0,0.1)` }} />
          )}

          {/* White mat/paper */}
          <div className="relative bg-white" style={{ padding: hasFrame ? "8px" : "12px", boxShadow: hasFrame ? `inset 1px 1px 3px rgba(0,0,0,0.04)` : "none" }}>
            {hasFrame && (
              <div className="absolute pointer-events-none" style={{ top: 0, left: 0, right: "50%", bottom: "50%", background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)" }} />
            )}

            {/* Print Content Area */}
            <div className="relative w-full bg-white overflow-hidden" style={{ aspectRatio: `${paperAspectRatio}` }}>
              {/* Map Area */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-center" style={{ height: "78%" }}>
                <div className="relative w-full" style={{ aspectRatio: "1/1", maxHeight: "100%" }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={colorId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                      <Image src={colorConfig.image} alt={`Australia Map - ${colorConfig.name}`} fill className="object-contain" priority />
                    </motion.div>
                  </AnimatePresence>

                  {/* Location Pin */}
                  <AnimatePresence>
                    {showPin && pinPosition && pinPosition.isValid && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute z-10" style={{ left: `${pinPosition.x}%`, top: `${pinPosition.y}%` }}>
                        <motion.div initial={{ y: -50, scale: 0.5 }} animate={{ y: 0, scale: 1 }} exit={{ y: -30, scale: 0.5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ position: "absolute", left: "-14px", top: "-28px" }}>
                          <MapPin size={28} className="drop-shadow-lg" style={{ color: colorConfig.pinColor, fill: colorConfig.pinColor }} />
                        </motion.div>
                        <motion.div initial={{ scale: 0.5, opacity: 0.6 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }} className="absolute w-2 h-2 rounded-full" style={{ backgroundColor: colorConfig.pinColor, left: "-4px", top: "-4px" }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Coordinates */}
                  {location && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-2 left-2 text-[8px] md:text-[9px] font-mono pointer-events-none z-20" style={{ color: colorConfig.accentColor, opacity: 0.7 }}>
                      {Math.abs(location.latitude).toFixed(4)}°S, {location.longitude.toFixed(4)}°E
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-center px-4" style={{ height: "22%" }}>
                <motion.p key={title} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] mb-1" style={{ color: colorConfig.accentColor }}>
                  {title || "Our Special Place"}
                </motion.p>
                <motion.p key={location?.placeName || "placeholder"} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-base md:text-lg lg:text-xl leading-tight" style={{ color: colorConfig.textColor }}>
                  {location ? formatLocationName(location.placeName) : "Your Location"}
                </motion.p>
                {(subtitle || date) && (
                  <motion.p key={`${subtitle}-${date}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] md:text-xs mt-1" style={{ color: colorConfig.accentColor }}>
                    {subtitle}{subtitle && date && " • "}{date}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Size indicator badge */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="absolute -right-2 top-8 md:-right-4 md:top-12 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-10">
        {size} Preview
      </motion.div>

      {/* ==================== HIDDEN CAPTURE ELEMENT ==================== */}
      {/* This element is positioned off-screen and uses simplified styling for html2canvas */}
      <div
        ref={captureRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "300px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Frame */}
        <div
          style={{
            padding: hasFrame ? "10px" : "0px",
            backgroundColor: captureFrameColor,
            borderRadius: "2px",
          }}
        >
          {/* White mat */}
          <div
            style={{
              padding: hasFrame ? "6px" : "8px",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Print content */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: `${paperAspectRatio}`,
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              {/* Map area */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "78%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "1", maxHeight: "100%" }}>
                  {/* Use img tag instead of Next Image for html2canvas compatibility */}
                  <img
                    src={colorConfig.image}
                    alt=""
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    crossOrigin="anonymous"
                  />
                  
                  {/* Pin */}
                  {pinPosition && pinPosition.isValid && (
                    <div
                      style={{
                        position: "absolute",
                        left: `${pinPosition.x}%`,
                        top: `${pinPosition.y}%`,
                        zIndex: 10,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "-8px",
                          top: "-16px",
                          width: "16px",
                          height: "16px",
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill={colorConfig.pinColor} stroke={colorConfig.pinColor}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" fill="white" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Coordinates */}
                  {location && (
                    <div
                      style={{
                        position: "absolute",
                        top: "4px",
                        left: "4px",
                        fontSize: "5px",
                        fontFamily: "monospace",
                        color: colorConfig.accentColor,
                        opacity: 0.7,
                      }}
                    >
                      {Math.abs(location.latitude).toFixed(4)}°S, {location.longitude.toFixed(4)}°E
                    </div>
                  )}
                </div>
              </div>

              {/* Text content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "22%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "0 8px",
                }}
              >
                <p
                  style={{
                    fontSize: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: "2px",
                    color: colorConfig.accentColor,
                    margin: 0,
                  }}
                >
                  {title || "Our Special Place"}
                </p>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "10px",
                    lineHeight: 1.2,
                    color: colorConfig.textColor,
                    margin: 0,
                  }}
                >
                  {location ? formatLocationName(location.placeName) : "Your Location"}
                </p>
                {(subtitle || date) && (
                  <p
                    style={{
                      fontSize: "6px",
                      marginTop: "2px",
                      color: colorConfig.accentColor,
                      margin: "2px 0 0 0",
                    }}
                  >
                    {subtitle}{subtitle && date && " • "}{date}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
