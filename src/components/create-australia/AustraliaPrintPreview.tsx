// src/components/create-australia/AustraliaPrintPreview.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AustraliaMapCustomization, AustraliaProductSelection } from "@/types";
import { getAustraliaMapColor, coordsToImagePosition } from "@/lib/australiaMapConfig";
import { MapPin } from "lucide-react";

interface AustraliaPrintPreviewProps {
  customization: AustraliaMapCustomization;
  product: AustraliaProductSelection;
}

export default function AustraliaPrintPreview({
  customization,
  product,
}: AustraliaPrintPreviewProps) {
  const { title, subtitle, date, location, colorId } = customization;
  const { frame } = product;

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

            {/* Print Content Area */}
            <div className="bg-white">
              {/* 
                CRITICAL: This is the EXACT same structure as the calibration tool
                - aspect-square container
                - Image with fill + object-contain
                - Pin positioned with percentages
              */}
              <div className="relative aspect-square w-full">
                {/* Map Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={colorId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={colorConfig.image}
                      alt={`Australia Map - ${colorConfig.name}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Location Pin - EXACT same positioning as calibration tool */}
                <AnimatePresence>
                  {showPin && pinPosition && pinPosition.isValid && (
                    <motion.div
                      initial={{ y: -100, opacity: 0, scale: 0.5 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -50, opacity: 0, scale: 0.5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.6,
                      }}
                      className="absolute z-10"
                      style={{
                        left: `${pinPosition.x}%`,
                        top: `${pinPosition.y}%`,
                        transform: "translate(-50%, -100%)",
                      }}
                    >
                      {/* Pin Shadow */}
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full opacity-30"
                        style={{ backgroundColor: colorConfig.pinColor }}
                      />
                      {/* Pin Icon */}
                      <MapPin
                        size={28}
                        className="drop-shadow-lg"
                        style={{
                          color: colorConfig.pinColor,
                          fill: colorConfig.pinColor,
                        }}
                      />
                      {/* Pulse Effect */}
                      <motion.div
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: colorConfig.pinColor }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Coordinates - Top Left corner */}
                {location && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 left-3 text-[8px] md:text-[10px] font-mono pointer-events-none z-20"
                    style={{ color: colorConfig.accentColor, opacity: 0.7 }}
                  >
                    {Math.abs(location.latitude).toFixed(4)}°S,{" "}
                    {location.longitude.toFixed(4)}°E
                  </motion.div>
                )}
              </div>

              {/* Text Content - Below the map */}
              <div className="pt-4 pb-2 text-center">
                {/* Title */}
                <motion.p
                  key={title}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] md:text-xs uppercase tracking-[0.25em] mb-1"
                  style={{ color: colorConfig.accentColor }}
                >
                  {title || "Our Special Place"}
                </motion.p>

                {/* Location Name */}
                <motion.p
                  key={location?.placeName || "placeholder"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-lg md:text-xl lg:text-2xl"
                  style={{ color: colorConfig.textColor }}
                >
                  {location ? formatLocationName(location.placeName) : "Your Location"}
                </motion.p>

                {/* Subtitle & Date */}
                {(subtitle || date) && (
                  <motion.p
                    key={`${subtitle}-${date}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs md:text-sm mt-1"
                    style={{ color: colorConfig.accentColor }}
                  >
                    {subtitle}
                    {subtitle && date && " • "}
                    {date}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Live Preview Badge */}
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