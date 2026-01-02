// src/components/create-moonphase/MoonPhaseDatePicker.tsx
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Moon, Sparkles } from "lucide-react";
import { calculateMoonPhase, findNextPhase } from "@/lib/moonPhaseCalculations";

interface MoonPhaseDatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const quickDateOptions = [
  {
    label: "Today",
    getValue: () => new Date(),
  },
  {
    label: "Next Full Moon",
    getValue: () => findNextPhase("full"),
  },
  {
    label: "Next New Moon",
    getValue: () => findNextPhase("new"),
  },
];

export default function MoonPhaseDatePicker({
  date,
  onDateChange,
}: MoonPhaseDatePickerProps) {
  // Calculate moon phase for display
  const moonData = useMemo(() => calculateMoonPhase(date), [date]);

  const formatDateForInput = (d: Date) => {
    return d.toISOString().split("T")[0];
  };

  const formatDateDisplay = (d: Date) => {
    return d.toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-2">
          <Calendar className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Select Your Date
        </label>

        <div className="relative">
          <input
            type="date"
            value={formatDateForInput(date)}
            onChange={(e) => {
              const newDate = new Date(e.target.value + "T12:00:00");
              onDateChange(newDate);
            }}
            max={formatDateForInput(new Date(2100, 11, 31))}
            min="1900-01-01"
            className="w-full px-4 py-3 text-charcoal bg-white border border-brand-200 rounded-lg
                       appearance-none cursor-pointer
                       transition-all duration-200
                       focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
          />
        </div>

        <p className="mt-2 text-sm text-brand-600">
          <Sparkles className="inline w-3 h-3 mr-1" />
          {formatDateDisplay(date)}
        </p>
      </div>

      {/* Quick Date Options */}
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-2">
          Quick Select
        </label>
        <div className="flex flex-wrap gap-2">
          {quickDateOptions.map((option) => (
            <motion.button
              key={option.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDateChange(option.getValue())}
              className="px-3 py-1.5 text-xs rounded-full border transition-all
                         bg-white text-brand-600 border-brand-200 hover:border-brand-300"
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Moon Phase Info Card */}
      <motion.div
        key={date.toISOString()}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-xl p-4 border border-brand-100"
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">{moonData.emoji}</div>
          <div>
            <p className="font-medium text-charcoal">{moonData.phaseName}</p>
            <p className="text-sm text-brand-600">
              {moonData.illumination.toFixed(0)}% illuminated
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-brand-700 italic">
          &ldquo;{moonData.description}&rdquo;
        </p>
      </motion.div>

      {/* Helpful Dates */}
      <div className="bg-white rounded-xl p-4 border border-brand-100">
        <h4 className="text-sm font-medium text-charcoal mb-3 flex items-center gap-2">
          <Moon className="w-4 h-4" />
          Upcoming Moon Phases
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <UpcomingPhaseCard phase="full" label="Full Moon" emoji="🌕" />
          <UpcomingPhaseCard phase="new" label="New Moon" emoji="🌑" />
          <UpcomingPhaseCard phase="first-quarter" label="First Quarter" emoji="🌓" />
          <UpcomingPhaseCard phase="last-quarter" label="Last Quarter" emoji="🌗" />
        </div>
      </div>
    </div>
  );
}

// Upcoming Phase Card Component
interface UpcomingPhaseCardProps {
  phase: "new" | "first-quarter" | "full" | "last-quarter";
  label: string;
  emoji: string;
}

function UpcomingPhaseCard({ phase, label, emoji }: UpcomingPhaseCardProps) {
  const nextDate = useMemo(() => findNextPhase(phase), [phase]);

  const formatShortDate = (d: Date) => {
    return d.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{emoji}</span>
      <div>
        <p className="text-brand-600">{label}</p>
        <p className="text-xs text-brand-500">{formatShortDate(nextDate)}</p>
      </div>
    </div>
  );
}
