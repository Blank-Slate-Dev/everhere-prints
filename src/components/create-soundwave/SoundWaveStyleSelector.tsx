// src/components/create-soundwave/SoundWaveStyleSelector.tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { soundWaveStyles, SoundWaveStyle } from "@/lib/soundWaveConfig";

interface SoundWaveStyleSelectorProps {
  selectedStyleId: string;
  onStyleChange: (styleId: string) => void;
}

export default function SoundWaveStyleSelector({
  selectedStyleId,
  onStyleChange,
}: SoundWaveStyleSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-brand-500">Background Style</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {soundWaveStyles.map((style) => (
          <StyleOption
            key={style.id}
            style={style}
            isSelected={selectedStyleId === style.id}
            onSelect={() => onStyleChange(style.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface StyleOptionProps {
  style: SoundWaveStyle;
  isSelected: boolean;
  onSelect: () => void;
}

function StyleOption({ style, isSelected, onSelect }: StyleOptionProps) {
  // Generate mini waveform bars for preview
  const previewBars = [0.3, 0.5, 0.8, 0.6, 0.9, 0.7, 0.4, 0.6, 0.8, 0.5, 0.3];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        relative rounded-xl p-3 text-left transition-all duration-200 overflow-hidden
        ${isSelected
          ? "ring-2 ring-charcoal ring-offset-2"
          : "ring-1 ring-brand-200 hover:ring-brand-300"
        }
      `}
      style={{ backgroundColor: style.backgroundColor }}
    >
      {/* Mini waveform preview */}
      <div className="h-10 flex items-center justify-center gap-[2px] mb-2">
        {previewBars.map((amplitude, index) => {
          const barColor = style.waveGradient
            ? `linear-gradient(to right, ${style.waveGradient.from}, ${style.waveGradient.to})`
            : style.waveColor;

          return (
            <motion.div
              key={index}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="w-1.5 rounded-full"
              style={{
                height: `${amplitude * 100}%`,
                background: barColor,
              }}
            />
          );
        })}
      </div>

      {/* Style name */}
      <p
        className="text-xs font-medium text-center"
        style={{ color: style.textColor }}
      >
        {style.name}
      </p>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1.5 right-1.5 w-5 h-5 bg-charcoal rounded-full flex items-center justify-center"
        >
          <Check size={12} className="text-white" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
}
