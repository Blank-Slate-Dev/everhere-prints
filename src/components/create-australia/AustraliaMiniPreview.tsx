// src/components/create-australia/AustraliaMiniPreview.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AustraliaMapCustomization, AustraliaProductSelection } from "@/types";
import { getAustraliaMapColor, coordsToImagePosition } from "@/lib/australiaMapConfig";
import { Eye, MapPin } from "lucide-react";

interface AustraliaMiniPreviewProps {
  customization: AustraliaMapCustomization;
  product: AustraliaProductSelection;
  onTap: () => void;
}

export default function AustraliaMiniPreview({
  customization,
  product,
  onTap,
}: AustraliaMiniPreviewProps) {
  const { title, subtitle, date, location, colorId } = customization;
  const { frame } = product;

  const colorConfig = getAustraliaMapColor(colorId);
  const hasFrame = frame.id !== "none";

  // Calculate pin position using per-map calibration
  const pinPosition = location
    ? coordsToImagePosition(location.latitude, location.longitude, colorId)
    : null;

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
      background: "#ffffff",
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
        {/* Live mini preview - uses square aspect for proper pin positioning */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            width: "80px",
            height: "80px", // Square to match calibration
            borderRadius: hasFrame ? "1px" : "0px",
            background: currentFrame.background,
            padding: currentFrame.padding,
            boxShadow: "2px 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {/* Inner white mat */}
          <div
            className="w-full h-full bg-white"
            style={{
              padding: hasFrame ? "2px" : "2px",
            }}
          >
            {/* Square map container - matches calibration tool */}
            <div className="relative w-full h-full overflow-hidden bg-white">
              {/* Watercolor map */}
              <Image
                src={colorConfig.image}
                alt={colorConfig.name}
                fill
                className="object-contain"
                sizes="80px"
              />

              {/* Pin - positioned relative to square container */}
              {pinPosition && pinPosition.isValid && (
                <div
                  className="absolute z-10"
                  style={{
                    left: `${pinPosition.x}%`,
                    top: `${pinPosition.y}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <MapPin
                    size={10}
                    style={{
                      color: colorConfig.pinColor,
                      fill: colorConfig.pinColor,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info text */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-base font-semibold text-charcoal">
            Your Print Preview
          </p>
          <p className="text-sm text-brand-600 mt-1 truncate">
            {location
              ? formatLocationName(location.placeName)
              : "No location selected"}
          </p>
          <p className="text-xs text-brand-400 mt-0.5">
            {colorConfig.name} • {product.size}
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