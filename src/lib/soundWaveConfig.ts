// src/lib/soundWaveConfig.ts
// Sound wave print styles and configuration

export interface SoundWaveStyle {
  id: string;
  name: string;
  description: string;
  backgroundColor: string;
  waveColor: string;
  waveGradient?: {
    from: string;
    to: string;
  };
  textColor: string;
  accentColor: string;
}

export const soundWaveStyles: SoundWaveStyle[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Timeless black on white",
    backgroundColor: "#ffffff",
    waveColor: "#1a1a1a",
    textColor: "#1a1a1a",
    accentColor: "#666666",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Silver waves on deep navy",
    backgroundColor: "#0a1628",
    waveColor: "#e0e4e8",
    textColor: "#ffffff",
    accentColor: "#6495ed",
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm gradient tones",
    backgroundColor: "#faf6f0",
    waveColor: "#e85d4c",
    waveGradient: {
      from: "#e85d4c",
      to: "#f4a442",
    },
    textColor: "#2d2a26",
    accentColor: "#c97d4d",
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    description: "Romantic blush elegance",
    backgroundColor: "#2d1f2b",
    waveColor: "#e8b4b8",
    waveGradient: {
      from: "#e8b4b8",
      to: "#d4a574",
    },
    textColor: "#ffffff",
    accentColor: "#e8a0a0",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep teal depths",
    backgroundColor: "#0d2630",
    waveColor: "#5fb3b3",
    waveGradient: {
      from: "#5fb3b3",
      to: "#87ceeb",
    },
    textColor: "#ffffff",
    accentColor: "#5fb3b3",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and understated",
    backgroundColor: "#fafafa",
    waveColor: "#333333",
    textColor: "#1a1a1a",
    accentColor: "#888888",
  },
];

/**
 * Get a sound wave style by ID
 */
export function getSoundWaveStyle(styleId: string): SoundWaveStyle {
  return soundWaveStyles.find((s) => s.id === styleId) || soundWaveStyles[0];
}

/**
 * Number of bars to display in the waveform
 */
export const WAVEFORM_BAR_COUNT = 100;

/**
 * Default audio messages for inspiration
 */
export const AUDIO_SUGGESTIONS = [
  "Record yourself saying 'I love you'",
  "A clip from your wedding song",
  "Baby's first words or heartbeat",
  "A special voicemail message",
  "Your favorite song chorus",
  "Wedding vows excerpt",
];
