// src/components/create-soundwave/SoundWaveLyricsSelector.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Loader2, AlertCircle, Check, ChevronDown, ChevronUp } from "lucide-react";
import { fetchLyrics, splitLyricsIntoLines } from "@/lib/lyricsApi";

interface LyricsSelectorProps {
  artist: string | null;
  songTitle: string | null;
  selectedLyrics: string[];
  onLyricsChange: (lyrics: string[]) => void;
  onFullLyricsLoaded: (lyrics: string | null) => void;
  maxLines?: number;
}

export default function SoundWaveLyricsSelector({
  artist,
  songTitle,
  selectedLyrics,
  onLyricsChange,
  onFullLyricsLoaded,
  maxLines = 4,
}: LyricsSelectorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allLines, setAllLines] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch lyrics when artist/title changes
  useEffect(() => {
    if (!artist || !songTitle) {
      setAllLines([]);
      setError(null);
      onFullLyricsLoaded(null);
      return;
    }

    const loadLyrics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchLyrics(artist, songTitle);

        if (result.lyrics) {
          const lines = splitLyricsIntoLines(result.lyrics);
          setAllLines(lines);
          onFullLyricsLoaded(result.lyrics);
        } else {
          setAllLines([]);
          setError(result.error || "Lyrics not found for this song");
          onFullLyricsLoaded(null);
        }
      } catch (err) {
        console.error("Lyrics error:", err);
        setError("Failed to load lyrics");
        onFullLyricsLoaded(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadLyrics();
  }, [artist, songTitle, onFullLyricsLoaded]);

  // Toggle line selection
  const toggleLine = (line: string) => {
    if (selectedLyrics.includes(line)) {
      // Remove line
      onLyricsChange(selectedLyrics.filter((l) => l !== line));
    } else if (selectedLyrics.length < maxLines) {
      // Add line
      onLyricsChange([...selectedLyrics, line]);
    }
  };

  // Select consecutive lines starting from index
  const selectConsecutiveLines = (startIndex: number) => {
    const newSelection = allLines.slice(startIndex, startIndex + maxLines);
    onLyricsChange(newSelection);
  };

  // Clear selection
  const clearSelection = () => {
    onLyricsChange([]);
  };

  // No song selected
  if (!artist || !songTitle) {
    return (
      <div className="text-center py-8 text-brand-400">
        <Music size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">Search for a song to load lyrics</p>
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loader2 size={32} className="mx-auto mb-2 animate-spin text-brand-500" />
        <p className="text-sm text-brand-500">Loading lyrics...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="text-center py-6">
        <AlertCircle size={28} className="mx-auto mb-2 text-amber-500" />
        <p className="text-sm text-amber-600 mb-3">{error}</p>
        <p className="text-xs text-brand-400">
          You can still create your print without lyrics, or try a different song
        </p>
      </div>
    );
  }

  // No lyrics found
  if (allLines.length === 0) {
    return (
      <div className="text-center py-6 text-brand-400">
        <Music size={28} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">No lyrics available</p>
      </div>
    );
  }

  const visibleLines = isExpanded ? allLines : allLines.slice(0, 12);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-500">
          Select up to {maxLines} lines ({selectedLyrics.length}/{maxLines} selected)
        </p>
        {selectedLyrics.length > 0 && (
          <button
            onClick={clearSelection}
            className="text-xs text-red-500 hover:text-red-600 transition-colors"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Selected Preview */}
      {selectedLyrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-charcoal text-white rounded-xl p-4"
        >
          <p className="text-xs text-white/50 mb-2">Preview on print:</p>
          <div className="space-y-1 text-center italic">
            {selectedLyrics.map((line, index) => (
              <p key={index} className="text-sm">
                &ldquo;{line}&rdquo;
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Lyrics List */}
      <div className="border border-brand-200 rounded-xl overflow-hidden">
        <div className="max-h-64 overflow-y-auto">
          {visibleLines.map((line, index) => {
            const isSelected = selectedLyrics.includes(line);
            const selectionIndex = selectedLyrics.indexOf(line);
            const isDisabled = !isSelected && selectedLyrics.length >= maxLines;

            return (
              <button
                key={index}
                onClick={() => toggleLine(line)}
                disabled={isDisabled}
                className={`
                  w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-all
                  border-b border-brand-100 last:border-b-0
                  ${isSelected
                    ? "bg-charcoal text-white"
                    : isDisabled
                      ? "bg-brand-50 text-brand-300 cursor-not-allowed"
                      : "bg-white text-charcoal hover:bg-brand-50"
                  }
                `}
              >
                {/* Selection indicator */}
                <span
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                    ${isSelected
                      ? "bg-white text-charcoal"
                      : "bg-brand-100 text-brand-400"
                    }
                  `}
                >
                  {isSelected ? selectionIndex + 1 : ""}
                </span>

                {/* Lyric text */}
                <span className="flex-grow truncate">{line}</span>

                {/* Check icon */}
                {isSelected && (
                  <Check size={16} className="flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Expand/Collapse button */}
        {allLines.length > 12 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 bg-brand-50 text-brand-600 text-sm flex items-center justify-center gap-1 hover:bg-brand-100 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} />
                Show less
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Show all {allLines.length} lines
              </>
            )}
          </button>
        )}
      </div>

      {/* Quick select tip */}
      <p className="text-xs text-brand-400">
        Tip: Click lines in the order you want them to appear on your print
      </p>
    </div>
  );
}
