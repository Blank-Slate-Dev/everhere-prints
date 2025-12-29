// src/components/create/MiniPreview.tsx
"use client";

import { motion } from "framer-motion";
import { PrintCustomization, ProductSelection } from "@/types";
import { Eye } from "lucide-react";
import MapPreview from "./MapPreview";

interface MiniPreviewProps {
  customization: PrintCustomization;
  product: ProductSelection;
  onTap: () => void;
}

export default function MiniPreview({ customization, product, onTap }: MiniPreviewProps) {
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
  const subtitleColor = style === "night" ? "text-gray-400" : "text-brand-500";
  const gradientBg = style === "night" 
    ? "bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" 
    : "bg-gradient-to-t from-white via-white/80 to-transparent";

  const hasFrame = frame.id !== "none";

  // Adjust zoom for mini preview - smaller container needs lower zoom to show same area
  // Main preview is ~400px wide, mini is ~80px wide (5x smaller)
  // Each zoom level doubles the scale, so we reduce by ~2.3 levels (log2(5) ≈ 2.3)
  const adjustedZoom = Math.max(zoom - 2.5, 8);

  // Frame styles - scaled down proportionally (frame is ~3px at this size)
  const frameStyles = {
    none: { 
      background: "#ffffff", 
      padding: "0px",
    },
    black: { 
      background: "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 30%, #0d0d0d 70%, #1a1a1a 100%)", 
      padding: "3px",
    },
    white: { 
      background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 30%, #ebebeb 70%, #f5f5f5 100%)", 
      padding: "3px",
    },
    oak: { 
      background: "linear-gradient(145deg, #dbb896 0%, #c49660 30%, #9a7042 70%, #b8854a 100%)", 
      padding: "3px",
    },
  };

  const currentFrame = frameStyles[frame.id as keyof typeof frameStyles];

  return (
    <motion.div
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -150, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed top-24 left-4 right-4 z-40 lg:hidden"
    >
      <button
        onClick={onTap}
        className="w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-brand-200 p-4 flex items-center gap-4 active:scale-[0.98] transition-transform"
      >
        {/* Live mini preview */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            width: "80px",
            height: "107px",
            borderRadius: hasFrame ? "1px" : "0px",
            background: currentFrame.background,
            padding: currentFrame.padding,
            boxShadow: "2px 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {/* Inner white mat - only if framed */}
          <div 
            className="w-full h-full bg-white"
            style={{ 
              padding: hasFrame ? "2px" : "2px",
            }}
          >
            {/* Map container */}
            <div className="relative w-full h-full overflow-hidden bg-brand-100">
              {/* Actual map with adjusted zoom */}
              <MapPreview location={location} style={style} zoom={adjustedZoom} />
              
              {/* Text overlay gradient */}
              <div className={`absolute inset-x-0 bottom-0 h-1/2 pointer-events-none ${gradientBg}`} />
              
              {/* Mini text */}
              <div className="absolute inset-x-0 bottom-0 p-1.5 text-center pointer-events-none">
                <p className={`text-[5px] uppercase tracking-widest mb-0.5 ${subtitleColor}`}>
                  {title || "Where We Met"}
                </p>
                <p className={`font-serif text-[7px] leading-tight ${textColor}`}>
                  {location ? formatLocationName(location.placeName) : "Your Location"}
                </p>
                {(subtitle || date) && (
                  <p className={`text-[4px] mt-0.5 ${subtitleColor}`}>
                    {subtitle}{subtitle && date && " • "}{date}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info text */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-base font-semibold text-charcoal">
            Your Print Preview
          </p>
          <p className="text-sm text-brand-600 mt-1 truncate">
            {location ? formatLocationName(location.placeName) : "No location selected"}
          </p>
          <p className="text-xs text-brand-400 mt-0.5">
            {product.size} {frame.id !== "none" && `• ${frame.name}`}
          </p>
        </div>

        {/* View button */}
        <div className="flex-shrink-0 bg-charcoal text-white rounded-full p-3">
          <Eye size={20} />
        </div>
      </button>
    </motion.div>
  );
}