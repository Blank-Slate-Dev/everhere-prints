// src/components/create-soundwave/SoundWaveSongSearch.tsx
"use client";

import { useState, useCallback, useRef, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Music, X, Loader2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { searchTracks, MusicTrack, formatDurationMs } from "@/lib/musicApi";
import { SongMetadata } from "@/types";
import Input from "@/components/ui/Input";

interface SoundWaveSongSearchProps {
  selectedSong: SongMetadata | null;
  onSongSelect: (song: SongMetadata | null) => void;
}

export default function SoundWaveSongSearch({
  selectedSong,
  onSongSelect,
}: SoundWaveSongSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MusicTrack[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const searchResults = await searchTracks(searchQuery);
        setResults(searchResults.tracks);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  }, []);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTrack = (track: MusicTrack) => {
    const songData: SongMetadata = {
      trackId: track.id,
      songName: track.name,
      artistName: track.artist,
      albumName: track.album,
      albumArtUrl: track.albumArt,
      durationMs: track.durationMs,
      trackUrl: track.trackUrl,
      previewUrl: track.previewUrl, // Keep for potential future use
    };
    onSongSelect(songData);
    setShowResults(false);
    setQuery("");
  };

  const handleClearSong = () => {
    onSongSelect(null);
    setQuery("");
  };

  // If a song is selected, show it
  if (selectedSong) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-brand-200 rounded-xl p-4 bg-brand-50"
      >
        <div className="flex items-center gap-4">
          {/* Album Art */}
          {selectedSong.albumArtUrl && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md flex-shrink-0">
              <Image
                src={selectedSong.albumArtUrl}
                alt={selectedSong.albumName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Song Info */}
          <div className="flex-grow min-w-0">
            <p className="font-medium text-charcoal truncate">
              {selectedSong.songName}
            </p>
            <p className="text-sm text-brand-500 truncate">
              {selectedSong.artistName}
            </p>
            <p className="text-xs text-brand-400 truncate">
              {selectedSong.albumName} • {formatDurationMs(selectedSong.durationMs)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={selectedSong.trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-brand-100 text-brand-500 transition-colors"
              title="Open in Apple Music"
            >
              <ExternalLink size={16} />
            </a>
            <button
              onClick={handleClearSong}
              className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors"
              title="Remove song"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Search input and results
  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400"
        />
        <Input
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          placeholder="Search for a song..."
          className="pl-10"
        />
        {isSearching && (
          <Loader2
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 animate-spin"
          />
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (results.length > 0 || isSearching) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-brand-100 overflow-hidden max-h-80 overflow-y-auto"
          >
            {isSearching && results.length === 0 ? (
              <div className="p-4 text-center text-brand-500">
                <Loader2 size={24} className="mx-auto animate-spin mb-2" />
                <p className="text-sm">Searching...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center text-brand-500">
                <Music size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No songs found</p>
              </div>
            ) : (
              <div className="divide-y divide-brand-100">
                {results.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(track)}
                    className="w-full p-3 flex items-center gap-3 hover:bg-brand-50 transition-colors text-left"
                  >
                    {/* Album Art Thumbnail */}
                    {track.albumArtSmall ? (
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={track.albumArtSmall}
                          alt={track.album}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded bg-brand-100 flex items-center justify-center flex-shrink-0">
                        <Music size={20} className="text-brand-400" />
                      </div>
                    )}

                    {/* Track Info */}
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-charcoal truncate text-sm">
                        {track.name}
                      </p>
                      <p className="text-xs text-brand-500 truncate">
                        {track.artist}
                      </p>
                    </div>

                    {/* Duration */}
                    <span className="text-xs text-brand-400 flex-shrink-0">
                      {formatDurationMs(track.durationMs)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper text */}
      <p className="text-xs text-brand-400 mt-2">
        Search for any song to add album artwork and auto-generate its waveform
      </p>
    </div>
  );
}
