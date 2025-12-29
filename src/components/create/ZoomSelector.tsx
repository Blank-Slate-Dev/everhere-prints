// src/components/create/ZoomSelector.tsx
"use client";

import { motion } from "framer-motion";
import { ZoomIn, ZoomOut } from "lucide-react";

interface ZoomOption {
  id: string;
  label: string;
  value: number;
  description: string;
}

const zoomOptions: ZoomOption[] = [
  { id: "building", label: "Building", value: 18, description: "Very close" },
  { id: "street", label: "Street", value: 16, description: "Street level" },
  { id: "neighborhood", label: "Neighbourhood", value: 14, description: "Local area" },
  { id: "city", label: "City", value: 12, description: "Wide view" },
];

interface ZoomSelectorProps {
  selectedZoom: number;
  onZoomChange: (zoom: number) => void;
}

export default function ZoomSelector({
  selectedZoom,
  onZoomChange,
}: ZoomSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Map Zoom
      </label>
      <div className="flex items-center gap-2">
        <ZoomOut size={16} className="text-brand-400" />
        <div className="flex-1 grid grid-cols-4 gap-2">
          {zoomOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onZoomChange(option.value)}
              className={`relative px-3 py-2 rounded-lg border-2 transition-all duration-200 text-center ${
                selectedZoom === option.value
                  ? "border-charcoal bg-brand-50"
                  : "border-brand-200 hover:border-brand-300 bg-white"
              }`}
            >
              <p className="text-xs font-medium text-charcoal">{option.label}</p>
              <p className="text-[10px] text-brand-500 mt-0.5">{option.description}</p>
            </motion.button>
          ))}
        </div>
        <ZoomIn size={16} className="text-brand-400" />
      </div>
    </div>
  );
}