// src/components/create-starmap/StarMapDateTimePicker.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronDown, Star } from "lucide-react";

interface StarMapDateTimePickerProps {
  date: Date;
  time: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
}

const quickDateOptions = [
  { label: "Today", getValue: () => new Date() },
  {
    label: "Our Wedding",
    getValue: () => {
      const d = new Date();
      d.setFullYear(d.getFullYear() - 1);
      return d;
    },
  },
  {
    label: "First Date",
    getValue: () => {
      const d = new Date();
      d.setFullYear(d.getFullYear() - 2);
      return d;
    },
  },
];

const popularTimes = [
  { label: "Sunset", time: "19:00" },
  { label: "Midnight", time: "00:00" },
  { label: "Evening", time: "21:00" },
  { label: "Late Night", time: "23:00" },
];

export default function StarMapDateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
}: StarMapDateTimePickerProps) {
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

  const formatTimeDisplay = (t: string) => {
    const [hours, minutes] = t.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-2">
          <Calendar className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Date of Your Special Moment
        </label>

        <div className="relative">
          <input
            type="date"
            value={formatDateForInput(date)}
            onChange={(e) => onDateChange(new Date(e.target.value))}
            max={formatDateForInput(new Date())}
            min="1900-01-01"
            className="w-full px-4 py-3 text-charcoal bg-white border border-brand-200 rounded-lg
                       appearance-none cursor-pointer
                       transition-all duration-200
                       focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
          />
        </div>

        <p className="mt-2 text-sm text-brand-600">
          <Star className="inline w-3 h-3 mr-1" />
          {formatDateDisplay(date)}
        </p>
      </div>

      {/* Time Selection */}
      <div>
        <label className="block text-sm font-medium text-brand-700 mb-2">
          <Clock className="inline w-4 h-4 mr-1.5 -mt-0.5" />
          Time of Night
        </label>

        <div className="relative">
          <input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full px-4 py-3 text-charcoal bg-white border border-brand-200 rounded-lg
                       appearance-none cursor-pointer
                       transition-all duration-200
                       focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
          />
        </div>

        {/* Quick time options */}
        <div className="mt-3 flex flex-wrap gap-2">
          {popularTimes.map((option) => (
            <motion.button
              key={option.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTimeChange(option.time)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                time === option.time
                  ? "bg-charcoal text-white border-charcoal"
                  : "bg-white text-brand-600 border-brand-200 hover:border-brand-300"
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>

        <p className="mt-3 text-xs text-brand-500">
          For the best star visibility, evening times (after sunset) are recommended.
        </p>
      </div>
    </div>
  );
}