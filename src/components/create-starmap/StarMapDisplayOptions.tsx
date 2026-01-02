// src/components/create-starmap/StarMapDisplayOptions.tsx
"use client";

import { motion } from "framer-motion";

interface StarMapDisplayOptionsProps {
  showConstellations: boolean;
  showConstellationNames: boolean;
  showGrid: boolean;
  showMilkyWay: boolean;
  showCardinals: boolean;
  onToggleConstellations: (value: boolean) => void;
  onToggleConstellationNames: (value: boolean) => void;
  onToggleGrid: (value: boolean) => void;
  onToggleMilkyWay: (value: boolean) => void;
  onToggleCardinals: (value: boolean) => void;
}

interface ToggleOption {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function StarMapDisplayOptions({
  showConstellations,
  showConstellationNames,
  showGrid,
  showMilkyWay,
  showCardinals,
  onToggleConstellations,
  onToggleConstellationNames,
  onToggleGrid,
  onToggleMilkyWay,
  onToggleCardinals,
}: StarMapDisplayOptionsProps) {
  const options: ToggleOption[] = [
    {
      id: "constellations",
      label: "Constellation Lines",
      description: "Connect stars into patterns",
      checked: showConstellations,
      onChange: onToggleConstellations,
    },
    {
      id: "names",
      label: "Constellation Names",
      description: "Label the constellations",
      checked: showConstellationNames,
      onChange: onToggleConstellationNames,
    },
    {
      id: "grid",
      label: "Celestial Grid",
      description: "Show altitude/azimuth lines",
      checked: showGrid,
      onChange: onToggleGrid,
    },
    {
      id: "milkyway",
      label: "Milky Way Glow",
      description: "Subtle galaxy band",
      checked: showMilkyWay,
      onChange: onToggleMilkyWay,
    },
    {
      id: "cardinals",
      label: "Cardinal Directions",
      description: "Show N, E, S, W markers",
      checked: showCardinals,
      onChange: onToggleCardinals,
    },
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Display Options
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <ToggleButton key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
}

function ToggleButton({ option }: { option: ToggleOption }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => option.onChange(!option.checked)}
      className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
        option.checked
          ? "border-charcoal bg-brand-50"
          : "border-brand-200 hover:border-brand-300 bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-charcoal truncate">
            {option.label}
          </p>
          <p className="text-[10px] text-brand-500 mt-0.5 truncate">
            {option.description}
          </p>
        </div>

        {/* Toggle indicator */}
        <div
          className={`w-10 h-6 rounded-full p-1 transition-colors flex-shrink-0 ml-2 ${
            option.checked ? "bg-charcoal" : "bg-brand-200"
          }`}
        >
          <motion.div
            layout
            className={`w-4 h-4 rounded-full bg-white shadow-sm ${
              option.checked ? "ml-auto" : "ml-0"
            }`}
          />
        </div>
      </div>
    </motion.button>
  );
}