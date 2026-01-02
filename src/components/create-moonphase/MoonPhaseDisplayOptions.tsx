// src/components/create-moonphase/MoonPhaseDisplayOptions.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, Tag } from "lucide-react";

interface MoonPhaseDisplayOptionsProps {
  showStars: boolean;
  showPhaseLabel: boolean;
  onToggleStars: () => void;
  onTogglePhaseLabel: () => void;
}

export default function MoonPhaseDisplayOptions({
  showStars,
  showPhaseLabel,
  onToggleStars,
  onTogglePhaseLabel,
}: MoonPhaseDisplayOptionsProps) {
  const options = [
    {
      id: "stars",
      label: "Background Stars",
      description: "Subtle star field around the moon",
      icon: Sparkles,
      checked: showStars,
      onToggle: onToggleStars,
    },
    {
      id: "phaseLabel",
      label: "Phase Label",
      description: "Show moon phase name below moon",
      icon: Tag,
      checked: showPhaseLabel,
      onToggle: onTogglePhaseLabel,
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-brand-700">
        Display Options
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <ToggleOption key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
}

interface ToggleOptionProps {
  option: {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    checked: boolean;
    onToggle: () => void;
  };
}

function ToggleOption({ option }: ToggleOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={option.onToggle}
      className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
        option.checked
          ? "border-charcoal bg-brand-50"
          : "border-brand-200 bg-white hover:border-brand-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            option.checked ? "bg-charcoal text-white" : "bg-brand-100 text-brand-600"
          }`}
        >
          <option.icon size={16} />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-charcoal">{option.label}</p>
          <p className="text-xs text-brand-500">{option.description}</p>
        </div>
      </div>

      {/* Toggle Switch */}
      <div
        className={`relative w-10 h-6 rounded-full transition-colors ${
          option.checked ? "bg-charcoal" : "bg-brand-200"
        }`}
      >
        <motion.div
          layout
          className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-1 ${
            option.checked ? "left-5" : "left-1"
          }`}
        />
      </div>
    </motion.button>
  );
}
