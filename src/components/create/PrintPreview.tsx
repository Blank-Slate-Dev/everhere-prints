// src/components/create/PrintPreview.tsx
"use client";

import { motion } from "framer-motion";
import { PrintCustomization } from "@/types";
import MapPreview from "./MapPreview";

interface PrintPreviewProps {
  customization: PrintCustomization;
}

export default function PrintPreview({ customization }: PrintPreviewProps) {
  const { title, subtitle, date, location, style } = customization;

  const formatLocationName = (placeName: string): string => {
    const parts = placeName.split(",");
    if (parts.length >= 2) {
      return `${parts[0].trim()}, ${parts[parts.length - 1].trim()}`;
    }
    return placeName;
  };

  const textColor = style === "night" ? "text-white" : "text-charcoal";
  const subtitleColor = style === "night" ? "text-gray-300" : "text-brand-500";
  const dateColor = style === "night" ? "text-gray-400" : "text-brand-600";
  const coordsColor = style === "night" ? "text-gray-500" : "text-brand-400";
  const gradientBg = style === "night" 
    ? "bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" 
    : "bg-gradient-to-t from-white via-white/80 to-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Frame Container */}
      <div className="relative mx-auto max-w-md">
        {/* Shadow Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-200 to-brand-300 rounded-lg blur-2xl opacity-30 transform translate-y-4" />

        {/* Print Frame */}
        <div className="relative bg-white rounded-lg print-frame-shadow p-3 md:p-4">
          {/* Print Content */}
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-brand-100">
            {/* Map */}
            <MapPreview location={location} style={style} />

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
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -right-2 top-8 md:-right-4 md:top-12 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full shadow-lg"
      >
        Live Preview
      </motion.div>
    </motion.div>
  );
}