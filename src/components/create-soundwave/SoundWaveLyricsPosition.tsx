// src/components/create-soundwave/SoundWaveLyricsPosition.tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader2, AlertCircle, Music } from "lucide-react";
import { formatDuration } from "@/lib/audioProcessor";
import { getSoundWaveStyle } from "@/lib/soundWaveConfig";
import { fetchLyrics, splitLyricsIntoLines } from "@/lib/lyricsApi";

interface LyricsPositionProps {
  waveformData: number[];
  audioDuration: number;
  styleId: string;
  artist: string | null;
  songTitle: string | null;
  position: number; // 0-1 position in song
  selectedLyrics: string[];
  onPositionChange: (position: number) => void;
  onLyricsChange: (lyrics: string[]) => void;
  onFullLyricsLoaded: (lyrics: string | null) => void;
}

export default function SoundWaveLyricsPosition({
  waveformData,
  audioDuration,
  styleId,
  artist,
  songTitle,
  position,
  selectedLyrics,
  onPositionChange,
  onLyricsChange,
  onFullLyricsLoaded,
}: LyricsPositionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [allLines, setAllLines] = useState<string[]>([]);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [lyricsError, setLyricsError] = useState<string | null>(null);

  const style = getSoundWaveStyle(styleId);
  const currentTime = position * audioDuration;

  // Fetch lyrics when song changes
  useEffect(() => {
    if (!artist || !songTitle) {
      setAllLines([]);
      setLyricsError(null);
      onFullLyricsLoaded(null);
      onLyricsChange([]);
      return;
    }

    const loadLyrics = async () => {
      setIsLoadingLyrics(true);
      setLyricsError(null);

      try {
        const result = await fetchLyrics(artist, songTitle);

        if (result.lyrics) {
          const lines = splitLyricsIntoLines(result.lyrics);
          setAllLines(lines);
          onFullLyricsLoaded(result.lyrics);
          // Auto-select first 4 lines initially
          updateLyricsForPosition(0, lines);
        } else {
          setAllLines([]);
          setLyricsError(result.error || "Lyrics not found");
          onFullLyricsLoaded(null);
          onLyricsChange([]);
        }
      } catch (err) {
        console.error("Lyrics error:", err);
        setLyricsError("Failed to load lyrics");
        onFullLyricsLoaded(null);
      } finally {
        setIsLoadingLyrics(false);
      }
    };

    loadLyrics();
  }, [artist, songTitle]);

  // Update lyrics when position changes
  const updateLyricsForPosition = useCallback((pos: number, lines: string[] = allLines) => {
    if (lines.length === 0) {
      onLyricsChange([]);
      return;
    }

    // Estimate which line corresponds to this position in the song
    // Assume lyrics are roughly evenly distributed through the song
    const lineIndex = Math.floor(pos * lines.length);
    const startIndex = Math.max(0, Math.min(lineIndex, lines.length - 4));
    const selectedLines = lines.slice(startIndex, startIndex + 4);
    
    onLyricsChange(selectedLines);
  }, [allLines, onLyricsChange]);

  // Update lyrics when position changes (from drag)
  useEffect(() => {
    if (allLines.length > 0) {
      updateLyricsForPosition(position);
    }
  }, [position, allLines, updateLyricsForPosition]);

  // Get position from mouse/touch event
  const getPositionFromEvent = useCallback((clientX: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.max(0, Math.min(1, x / rect.width));
  }, []);

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const pos = getPositionFromEvent(e.clientX);
    onPositionChange(pos);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const pos = getPositionFromEvent(e.touches[0].clientX);
    onPositionChange(pos);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const pos = getPositionFromEvent(clientX);
      onPositionChange(pos);
    };

    const handleEnd = () => {
      setIsDragging(false);
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
  }, [isDragging, getPositionFromEvent, onPositionChange]);

  // No audio uploaded yet
  if (waveformData.length === 0) {
    return (
      <div className="text-center py-8 text-brand-400">
        <Music size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">Upload your audio to see the waveform</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Waveform with Playhead */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-500">Drag to select position</span>
          <span className="font-mono text-charcoal">{formatDuration(currentTime)}</span>
        </div>

        <div
          ref={containerRef}
          className="relative h-24 bg-brand-50 rounded-xl overflow-hidden cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Full Waveform */}
          <div className="absolute inset-0 flex items-center px-2">
            {waveformData.map((amplitude, index) => {
              const barPosition = index / waveformData.length;
              const isBeforePlayhead = barPosition <= position;
              
              return (
                <div
                  key={index}
                  className="flex-1 mx-[0.5px] rounded-full transition-colors duration-150"
                  style={{
                    height: `${Math.max(4, amplitude * 100)}%`,
                    backgroundColor: isBeforePlayhead ? style.waveColor : "#d1d5db",
                    opacity: isBeforePlayhead ? 0.9 : 0.5,
                  }}
                />
              );
            })}
          </div>

          {/* Playhead */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-charcoal shadow-lg"
            style={{ left: `calc(${position * 100}% - 2px)` }}
            animate={{ scale: isDragging ? 1.2 : 1 }}
          >
            {/* Playhead handle */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-charcoal rounded-full shadow-md flex items-center justify-center">
              <Play size={8} className="text-white ml-0.5" fill="white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-charcoal rounded-full shadow-md" />
          </motion.div>

          {/* Time markers */}
          <div className="absolute bottom-1 left-2 text-[10px] text-brand-400 font-mono">
            0:00
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-brand-400 font-mono">
            {formatDuration(audioDuration)}
          </div>
        </div>
      </div>

      {/* Lyrics Display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-brand-500">Lyrics at this position</span>
          {isLoadingLyrics && (
            <Loader2 size={16} className="animate-spin text-brand-400" />
          )}
        </div>

        <AnimatePresence mode="wait">
          {isLoadingLyrics ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-brand-50 rounded-xl p-6 text-center"
            >
              <Loader2 size={24} className="animate-spin text-brand-400 mx-auto mb-2" />
              <p className="text-sm text-brand-500">Loading lyrics...</p>
            </motion.div>
          ) : lyricsError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-amber-50 rounded-xl p-4 text-center"
            >
              <AlertCircle size={20} className="text-amber-500 mx-auto mb-2" />
              <p className="text-sm text-amber-600">{lyricsError}</p>
              <p className="text-xs text-amber-500 mt-1">
                Your print will still look great without lyrics
              </p>
            </motion.div>
          ) : selectedLyrics.length > 0 ? (
            <motion.div
              key="lyrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-charcoal rounded-xl p-5 text-center"
            >
              <div className="space-y-2">
                {selectedLyrics.map((line, index) => (
                  <motion.p
                    key={`${position}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-white text-sm italic"
                  >
                    &ldquo;{line}&rdquo;
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ) : !artist || !songTitle ? (
            <motion.div
              key="no-song"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-brand-50 rounded-xl p-6 text-center"
            >
              <Music size={24} className="text-brand-300 mx-auto mb-2" />
              <p className="text-sm text-brand-500">Search for a song to add lyrics</p>
            </motion.div>
          ) : (
            <motion.div
              key="no-lyrics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-brand-50 rounded-xl p-6 text-center"
            >
              <p className="text-sm text-brand-500">No lyrics available</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-brand-400">
        Drag the playhead to select which lyrics appear on your print. The entire song waveform will be shown.
      </p>
    </div>
  );
}
