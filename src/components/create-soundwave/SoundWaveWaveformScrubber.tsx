// src/components/create-soundwave/SoundWaveWaveformScrubber.tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDuration } from "@/lib/audioProcessor";
import { getSoundWaveStyle } from "@/lib/soundWaveConfig";

interface WaveformScrubberProps {
  waveformData: number[];
  audioDuration: number;
  startPosition: number; // 0-1
  endPosition: number; // 0-1
  styleId: string;
  onSelectionChange: (start: number, end: number) => void;
}

export default function SoundWaveWaveformScrubber({
  waveformData,
  audioDuration,
  startPosition,
  endPosition,
  styleId,
  onSelectionChange,
}: WaveformScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<"start" | "end" | "range" | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [initialStart, setInitialStart] = useState(0);
  const [initialEnd, setInitialEnd] = useState(0);

  const style = getSoundWaveStyle(styleId);

  // Convert position to time
  const startTime = startPosition * audioDuration;
  const endTime = endPosition * audioDuration;
  const selectionDuration = endTime - startTime;

  // Get position from mouse/touch event
  const getPositionFromEvent = useCallback((clientX: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.max(0, Math.min(1, x / rect.width));
  }, []);

  // Handle drag start
  const handleDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    handle: "start" | "end" | "range"
  ) => {
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(handle);
    setDragStartX(clientX);
    setInitialStart(startPosition);
    setInitialEnd(endPosition);
  };

  // Handle drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = (clientX - dragStartX) / rect.width;

      let newStart = startPosition;
      let newEnd = endPosition;

      if (isDragging === "start") {
        newStart = Math.max(0, Math.min(initialStart + deltaX, endPosition - 0.05));
      } else if (isDragging === "end") {
        newEnd = Math.min(1, Math.max(initialEnd + deltaX, startPosition + 0.05));
      } else if (isDragging === "range") {
        const rangeWidth = initialEnd - initialStart;
        newStart = Math.max(0, Math.min(initialStart + deltaX, 1 - rangeWidth));
        newEnd = newStart + rangeWidth;
      }

      onSelectionChange(newStart, newEnd);
    };

    const handleEnd = () => {
      setIsDragging(null);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, dragStartX, initialStart, initialEnd, startPosition, endPosition, onSelectionChange]);

  // Quick selection buttons
  const handleQuickSelect = (seconds: number) => {
    const duration = seconds / audioDuration;
    const center = (startPosition + endPosition) / 2;
    const halfDuration = duration / 2;
    const newStart = Math.max(0, center - halfDuration);
    const newEnd = Math.min(1, newStart + duration);
    onSelectionChange(newStart, newEnd);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-500">Select Section to Display</p>
        <p className="text-xs text-brand-400 font-mono">
          {formatDuration(startTime)} - {formatDuration(endTime)} ({formatDuration(selectionDuration)})
        </p>
      </div>

      {/* Waveform Container */}
      <div
        ref={containerRef}
        className="relative h-24 bg-brand-50 rounded-xl overflow-hidden cursor-crosshair select-none"
      >
        {/* Full Waveform Background */}
        <div className="absolute inset-0 flex items-center px-2">
          {waveformData.map((amplitude, index) => (
            <div
              key={index}
              className="flex-1 mx-[0.5px] rounded-full bg-brand-200"
              style={{
                height: `${Math.max(4, amplitude * 100)}%`,
              }}
            />
          ))}
        </div>

        {/* Dimmed areas outside selection */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-white/70"
          style={{ width: `${startPosition * 100}%` }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 bg-white/70"
          style={{ width: `${(1 - endPosition) * 100}%` }}
        />

        {/* Selected Range Waveform */}
        <div
          className="absolute top-0 bottom-0 flex items-center overflow-hidden"
          style={{
            left: `${startPosition * 100}%`,
            width: `${(endPosition - startPosition) * 100}%`,
          }}
        >
          <div
            className="flex items-center h-full w-full px-1"
            style={{
              marginLeft: `-${startPosition * 100}%`,
              width: `${100 / (endPosition - startPosition)}%`,
            }}
          >
            {waveformData.map((amplitude, index) => (
              <div
                key={index}
                className="flex-1 mx-[0.5px] rounded-full transition-colors"
                style={{
                  height: `${Math.max(4, amplitude * 100)}%`,
                  backgroundColor: style.waveColor,
                }}
              />
            ))}
          </div>
        </div>

        {/* Selection Overlay - Draggable Range */}
        <div
          className="absolute top-0 bottom-0 border-2 border-charcoal/50 bg-charcoal/5 cursor-move"
          style={{
            left: `${startPosition * 100}%`,
            width: `${(endPosition - startPosition) * 100}%`,
          }}
          onMouseDown={(e) => handleDragStart(e, "range")}
          onTouchStart={(e) => handleDragStart(e, "range")}
        />

        {/* Start Handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-3 cursor-ew-resize flex items-center justify-center group"
          style={{ left: `calc(${startPosition * 100}% - 6px)` }}
          onMouseDown={(e) => handleDragStart(e, "start")}
          onTouchStart={(e) => handleDragStart(e, "start")}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-1.5 h-12 bg-charcoal rounded-full group-hover:bg-brand-600 transition-colors" />
        </motion.div>

        {/* End Handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-3 cursor-ew-resize flex items-center justify-center group"
          style={{ left: `calc(${endPosition * 100}% - 6px)` }}
          onMouseDown={(e) => handleDragStart(e, "end")}
          onTouchStart={(e) => handleDragStart(e, "end")}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-1.5 h-12 bg-charcoal rounded-full group-hover:bg-brand-600 transition-colors" />
        </motion.div>
      </div>

      {/* Quick Selection Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-brand-400">Quick select:</span>
        {[10, 15, 20, 30].map((seconds) => (
          <button
            key={seconds}
            onClick={() => handleQuickSelect(seconds)}
            disabled={seconds > audioDuration}
            className={`
              px-3 py-1 text-xs rounded-full transition-colors
              ${seconds > audioDuration
                ? "bg-brand-100 text-brand-300 cursor-not-allowed"
                : "bg-brand-100 text-brand-600 hover:bg-brand-200"
              }
            `}
          >
            {seconds}s
          </button>
        ))}
        <button
          onClick={() => onSelectionChange(0, 1)}
          className="px-3 py-1 text-xs rounded-full bg-brand-100 text-brand-600 hover:bg-brand-200 transition-colors"
        >
          Full Song
        </button>
      </div>

      <p className="text-xs text-brand-400">
        Drag the handles or the selection area to choose which part of the waveform to display on your print
      </p>
    </div>
  );
}
