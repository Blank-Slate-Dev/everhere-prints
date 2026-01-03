// src/components/create-soundwave/SoundWaveDisplayOptions.tsx
"use client";

import { motion } from "framer-motion";
import { Image, User, Disc, Clock } from "lucide-react";

interface SoundWaveDisplayOptionsProps {
  showAlbumArt: boolean;
  showArtistName: boolean;
  showAlbumName: boolean;
  showDuration: boolean;
  hasSongData: boolean;
  onToggleAlbumArt: () => void;
  onToggleArtistName: () => void;
  onToggleAlbumName: () => void;
  onToggleDuration: () => void;
}

interface ToggleOptionProps {
  label: string;
  icon: React.ReactNode;
  isEnabled: boolean;
  isDisabled?: boolean;
  onToggle: () => void;
}

function ToggleOption({ label, icon, isEnabled, isDisabled, onToggle }: ToggleOptionProps) {
  return (
    <button
      onClick={onToggle}
      disabled={isDisabled}
      className={`
        flex items-center gap-3 p-3 rounded-lg transition-all duration-200 w-full text-left
        ${isDisabled
          ? "opacity-40 cursor-not-allowed"
          : isEnabled
            ? "bg-charcoal text-white"
            : "bg-brand-50 text-charcoal hover:bg-brand-100"
        }
      `}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex-grow text-sm font-medium">{label}</span>
      <motion.div
        layout
        className={`
          w-10 h-6 rounded-full p-1 transition-colors duration-200
          ${isEnabled ? "bg-white/20" : "bg-brand-200"}
        `}
      >
        <motion.div
          layout
          className={`
            w-4 h-4 rounded-full transition-colors duration-200
            ${isEnabled ? "bg-white ml-auto" : "bg-brand-400"}
          `}
        />
      </motion.div>
    </button>
  );
}

export default function SoundWaveDisplayOptions({
  showAlbumArt,
  showArtistName,
  showAlbumName,
  showDuration,
  hasSongData,
  onToggleAlbumArt,
  onToggleArtistName,
  onToggleAlbumName,
  onToggleDuration,
}: SoundWaveDisplayOptionsProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-brand-500">Display Options</p>
      
      <div className="grid grid-cols-2 gap-2">
        <ToggleOption
          label="Album Art"
          icon={<Image size={16} />}
          isEnabled={showAlbumArt}
          isDisabled={!hasSongData}
          onToggle={onToggleAlbumArt}
        />
        <ToggleOption
          label="Artist"
          icon={<User size={16} />}
          isEnabled={showArtistName}
          isDisabled={!hasSongData}
          onToggle={onToggleArtistName}
        />
        <ToggleOption
          label="Album"
          icon={<Disc size={16} />}
          isEnabled={showAlbumName}
          isDisabled={!hasSongData}
          onToggle={onToggleAlbumName}
        />
        <ToggleOption
          label="Duration"
          icon={<Clock size={16} />}
          isEnabled={showDuration}
          onToggle={onToggleDuration}
        />
      </div>

      {!hasSongData && (
        <p className="text-xs text-brand-400 italic">
          Search for a song above to enable album art and metadata options
        </p>
      )}
    </div>
  );
}
