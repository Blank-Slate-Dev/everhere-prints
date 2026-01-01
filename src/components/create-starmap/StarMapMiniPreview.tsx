// src/components/create-starmap/StarMapMiniPreview.tsx
"use client";

import { motion } from "framer-motion";
import { StarMapCustomization, StarMapProductSelection } from "@/types";
import { getStarMapStyle } from "@/lib/starMapConfig";
import { Eye, Star } from "lucide-react";

interface StarMapMiniPreviewProps {
  customization: StarMapCustomization;
  product: StarMapProductSelection;
  onTap: () => void;
}

export default function StarMapMiniPreview({
  customization,
  product,
  onTap,
}: StarMapMiniPreviewProps) {
  const { location, styleId, title } = customization;
  const { frame } = product;

  const style = getStarMapStyle(styleId);
  const hasFrame = frame.id !== "none";

  const formatLocationName = (placeName: string): string => {
    const parts = placeName.split(",");
    if (parts.length >= 2) {
      return `${parts[0].trim()}, ${parts[parts.length - 1].trim()}`;
    }
    return placeName;
  };

  // Frame styles - scaled down
  const frameStyles = {
    none: {
      background: style.backgroundColor,
      padding: "0px",
    },
    black: {
      background:
        "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 30%, #0d0d0d 70%, #1a1a1a 100%)",
      padding: "3px",
    },
    white: {
      background:
        "linear-gradient(145deg, #ffffff 0%, #f5f5f5 30%, #ebebeb 70%, #f5f5f5 100%)",
      padding: "3px",
    },
    oak: {
      background:
        "linear-gradient(145deg, #dbb896 0%, #c49660 30%, #9a7042 70%, #b8854a 100%)",
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
            width: "70px",
            height: "70px",
            borderRadius: hasFrame ? "2px" : "50%",
            background: currentFrame.background,
            padding: currentFrame.padding,
            boxShadow: "2px 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {/* Inner star field */}
          <div
            className="w-full h-full rounded-full relative overflow-hidden"
            style={{ backgroundColor: style.backgroundColor }}
          >
            {/* Mini stars */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: style.starColor,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
              />
            ))}

            {/* Horizon circle */}
            <div
              className="absolute inset-2 rounded-full border border-dashed"
              style={{ borderColor: style.horizonColor }}
            />
          </div>
        </div>

        {/* Info text */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-brand-500 truncate flex items-center gap-1">
            <Star size={12} />
            {title || "The Night We Met"}
          </p>
          <p className="text-base font-semibold text-charcoal truncate">
            {location
              ? formatLocationName(location.placeName)
              : "No location selected"}
          </p>
          <p className="text-xs text-brand-400 mt-0.5">
            {style.name} • {product.size}
            {frame.id !== "none" && ` • ${frame.name}`}
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