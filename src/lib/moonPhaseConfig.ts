// src/lib/moonPhaseConfig.ts
// Moon phase print styles and configuration

export interface MoonPhaseStyle {
  id: string;
  name: string;
  description: string;
  backgroundColor: string;
  moonFillColor: string;
  moonShadowColor: string;
  moonBorderColor: string;
  moonGlowColor: string;
  craterColor: string;
  textColor: string;
  accentColor: string;
  starsColor: string;
  showStars: boolean;
}

export const moonPhaseStyles: MoonPhaseStyle[] = [
  {
    id: "midnight",
    name: "Midnight",
    description: "Classic dark navy sky",
    backgroundColor: "#0a1628",
    moonFillColor: "#f5f5f0",
    moonShadowColor: "#0a1628",
    moonBorderColor: "rgba(255, 255, 255, 0.1)",
    moonGlowColor: "rgba(255, 255, 255, 0.15)",
    craterColor: "rgba(0, 0, 0, 0.08)",
    textColor: "#ffffff",
    accentColor: "#6495ed",
    starsColor: "#ffffff",
    showStars: true,
  },
  {
    id: "deep-space",
    name: "Deep Space",
    description: "Pure black cosmos",
    backgroundColor: "#000000",
    moonFillColor: "#e8e8e0",
    moonShadowColor: "#000000",
    moonBorderColor: "rgba(255, 255, 255, 0.08)",
    moonGlowColor: "rgba(255, 255, 255, 0.12)",
    craterColor: "rgba(0, 0, 0, 0.1)",
    textColor: "#ffffff",
    accentColor: "#ffd700",
    starsColor: "#ffffff",
    showStars: true,
  },
  {
    id: "twilight",
    name: "Twilight",
    description: "Soft purple dusk",
    backgroundColor: "#1a1a2e",
    moonFillColor: "#faf8f5",
    moonShadowColor: "#1a1a2e",
    moonBorderColor: "rgba(199, 125, 255, 0.15)",
    moonGlowColor: "rgba(199, 125, 255, 0.1)",
    craterColor: "rgba(0, 0, 0, 0.06)",
    textColor: "#ffffff",
    accentColor: "#c77dff",
    starsColor: "#e8d4ff",
    showStars: true,
  },
  {
    id: "celestial",
    name: "Celestial",
    description: "Warm ivory elegance",
    backgroundColor: "#faf8f5",
    moonFillColor: "#1a1a2e",
    moonShadowColor: "#faf8f5",
    moonBorderColor: "rgba(26, 26, 46, 0.2)",
    moonGlowColor: "rgba(26, 26, 46, 0.05)",
    craterColor: "rgba(255, 255, 255, 0.1)",
    textColor: "#1a1a2e",
    accentColor: "#5a4a3f",
    starsColor: "#c4b8a8",
    showStars: false,
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    description: "Romantic blush tones",
    backgroundColor: "#2d1f2b",
    moonFillColor: "#fdf0e8",
    moonShadowColor: "#2d1f2b",
    moonBorderColor: "rgba(255, 182, 193, 0.2)",
    moonGlowColor: "rgba(255, 182, 193, 0.1)",
    craterColor: "rgba(0, 0, 0, 0.05)",
    textColor: "#ffffff",
    accentColor: "#e8a0a0",
    starsColor: "#ffd4d4",
    showStars: true,
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Deep teal waters",
    backgroundColor: "#0d2630",
    moonFillColor: "#f0f5f5",
    moonShadowColor: "#0d2630",
    moonBorderColor: "rgba(100, 200, 200, 0.15)",
    moonGlowColor: "rgba(100, 200, 200, 0.1)",
    craterColor: "rgba(0, 0, 0, 0.06)",
    textColor: "#ffffff",
    accentColor: "#5fb3b3",
    starsColor: "#a0e0e0",
    showStars: true,
  },
];

/**
 * Get a moon phase style by ID
 */
export function getMoonPhaseStyle(styleId: string): MoonPhaseStyle {
  return moonPhaseStyles.find((s) => s.id === styleId) || moonPhaseStyles[0];
}

/**
 * Pre-computed star positions for consistent rendering
 * Each star: { x: 0-100%, y: 0-100%, size: 1-3, opacity: 0.3-1 }
 */
export const MOON_PREVIEW_STARS = [
  { x: 8, y: 12, size: 1.5, opacity: 0.7 },
  { x: 15, y: 8, size: 1, opacity: 0.5 },
  { x: 22, y: 18, size: 2, opacity: 0.8 },
  { x: 12, y: 35, size: 1.2, opacity: 0.6 },
  { x: 5, y: 52, size: 1.8, opacity: 0.9 },
  { x: 18, y: 68, size: 1, opacity: 0.5 },
  { x: 8, y: 78, size: 1.5, opacity: 0.7 },
  { x: 25, y: 85, size: 1.2, opacity: 0.6 },
  { x: 88, y: 10, size: 1.8, opacity: 0.8 },
  { x: 92, y: 25, size: 1, opacity: 0.5 },
  { x: 85, y: 38, size: 1.5, opacity: 0.7 },
  { x: 95, y: 48, size: 2, opacity: 0.9 },
  { x: 82, y: 62, size: 1.2, opacity: 0.6 },
  { x: 90, y: 75, size: 1, opacity: 0.5 },
  { x: 78, y: 82, size: 1.5, opacity: 0.7 },
  { x: 93, y: 88, size: 1.8, opacity: 0.8 },
  { x: 35, y: 5, size: 1, opacity: 0.4 },
  { x: 65, y: 8, size: 1.2, opacity: 0.5 },
  { x: 40, y: 92, size: 1.5, opacity: 0.6 },
  { x: 60, y: 95, size: 1, opacity: 0.4 },
];

/**
 * Crater positions for realistic moon surface (percentages relative to moon center and radius)
 * Each crater: { x: -1 to 1, y: -1 to 1, size: 0.02-0.15 }
 */
export const MOON_CRATERS = [
  { x: -0.3, y: -0.4, size: 0.12 },
  { x: 0.2, y: -0.25, size: 0.08 },
  { x: -0.15, y: 0.1, size: 0.15 },
  { x: 0.35, y: 0.15, size: 0.1 },
  { x: -0.45, y: 0.3, size: 0.06 },
  { x: 0.1, y: 0.4, size: 0.09 },
  { x: -0.2, y: -0.15, size: 0.05 },
  { x: 0.4, y: -0.1, size: 0.07 },
  { x: -0.1, y: 0.55, size: 0.08 },
  { x: 0.25, y: 0.45, size: 0.06 },
  { x: -0.4, y: -0.2, size: 0.04 },
  { x: 0.15, y: -0.5, size: 0.05 },
  { x: -0.25, y: 0.35, size: 0.07 },
  { x: 0.5, y: 0.3, size: 0.04 },
  { x: -0.35, y: 0.55, size: 0.05 },
];

/**
 * Special date meanings for display
 */
export const SPECIAL_MOON_MEANINGS: Record<string, string> = {
  "New Moon": "New beginnings, fresh starts, and setting intentions",
  "Waxing Crescent": "Growth, hope, and emerging possibilities",
  "First Quarter": "Action, decisions, and overcoming challenges",
  "Waxing Gibbous": "Refinement, patience, and building momentum",
  "Full Moon": "Culmination, celebration, and heightened emotions",
  "Waning Gibbous": "Gratitude, sharing, and teaching others",
  "Last Quarter": "Release, forgiveness, and letting go",
  "Waning Crescent": "Rest, reflection, and spiritual renewal",
};
