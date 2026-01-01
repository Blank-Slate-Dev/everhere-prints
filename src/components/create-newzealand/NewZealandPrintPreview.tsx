// src/components/create-newzealand/NewZealandPrintPreview.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { NewZealandMapCustomization, NewZealandProductSelection } from "@/types";
import { getNewZealandMapColor, coordsToImagePosition } from "@/lib/newzealandMapConfig";
import { MapPin } from "lucide-react";

interface NewZealandPrintPreviewProps {
  customization: NewZealandMapCustomization;
  product: NewZealandProductSelection;
}

export default function NewZealandPrintPreview({
  customization,
  product,
}: NewZealandPrintPreviewProps) {
  const { title, subtitle, date, location, colorId } = customization;
  const { frame, size } = product;

  const colorConfig = getNewZealandMapColor(colorId);
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

          {/* White mat/paper */}
          <div
            className="relative bg-white"
            style={{
              padding: hasFrame ? "8px" : "12px",
              boxShadow: hasFrame ? `inset 1px 1px 3px rgba(0,0,0,0.04)` : "none",
            }}
          >
            {/* Mat highlight */}
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

            {/* Map container - EXACTLY like calibration tool: aspect-square w-full */}
            <div className="relative aspect-square w-full bg-white">
              <Image
                src={colorConfig.image}
                alt={`New Zealand Map - ${colorConfig.name}`}
                fill
                className="object-contain"
                priority
              />

              {/* Location Pin */}
              {showPin && pinPosition && pinPosition.isValid && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute z-10"
                  style={{
                    left: `${pinPosition.x}%`,
                    top: `${pinPosition.y}%`,
                  }}
                >
                  <motion.div
                    initial={{ y: -50, scale: 0.5 }}
                    animate={{ y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    style={{
                      position: "absolute",
                      left: "-14px",
                      top: "-28px",
                    }}
                  >
                    <MapPin
                      size={28}
                      className="drop-shadow-lg"
                      style={{
                        color: colorConfig.pinColor,
                        fill: colorConfig.pinColor,
                      }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: colorConfig.pinColor,
                      left: "-4px",
                      top: "-4px",
                    }}
                  />
                </motion.div>
              )}

              {/* Coordinates */}
              {location && (
                <div
                  className="absolute top-2 left-2 text-[8px] md:text-[9px] font-mono pointer-events-none z-20"
                  style={{ color: colorConfig.accentColor, opacity: 0.7 }}
                >
                  {Math.abs(location.latitude).toFixed(4)}°S,{" "}
                  {location.longitude.toFixed(4)}°E
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="py-4 px-4 text-center">
              <motion.p
                key={title}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] mb-1"
                style={{ color: colorConfig.accentColor }}
              >
                {title || "Our Special Place"}
              </motion.p>

              <motion.p
                key={location?.placeName || "placeholder"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-base md:text-lg lg:text-xl leading-tight"
                style={{ color: colorConfig.textColor }}
              >
                {location ? formatLocationName(location.placeName) : "Your Location"}
              </motion.p>

              {(subtitle || date) && (
                <motion.p
                  key={`${subtitle}-${date}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] md:text-xs mt-1"
                  style={{ color: colorConfig.accentColor }}
                >
                  {subtitle}
                  {subtitle && date && " • "}
                  {date}
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
        {size} 
      </motion.div>
    </motion.div>
  );
}