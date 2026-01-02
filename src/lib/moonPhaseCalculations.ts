// src/lib/moonPhaseCalculations.ts
// Accurate moon phase calculations using astronomical algorithms

/**
 * Moon phase data returned from calculations
 */
export interface MoonPhaseData {
  phase: number; // 0-1 where 0 = new moon, 0.5 = full moon
  phaseName: string;
  illumination: number; // 0-100 percentage
  age: number; // days since new moon
  emoji: string;
  description: string;
}

/**
 * Named moon phases with their ranges
 */
const MOON_PHASES = [
  { name: "New Moon", emoji: "🌑", min: 0, max: 0.0625 },
  { name: "Waxing Crescent", emoji: "🌒", min: 0.0625, max: 0.1875 },
  { name: "First Quarter", emoji: "🌓", min: 0.1875, max: 0.3125 },
  { name: "Waxing Gibbous", emoji: "🌔", min: 0.3125, max: 0.4375 },
  { name: "Full Moon", emoji: "🌕", min: 0.4375, max: 0.5625 },
  { name: "Waning Gibbous", emoji: "🌖", min: 0.5625, max: 0.6875 },
  { name: "Last Quarter", emoji: "🌗", min: 0.6875, max: 0.8125 },
  { name: "Waning Crescent", emoji: "🌘", min: 0.8125, max: 1.0 },
];

/**
 * Synodic month length in days (time between new moons)
 */
const SYNODIC_MONTH = 29.53058867;

/**
 * Reference new moon date (known astronomical new moon)
 * January 6, 2000 at 18:14 UTC
 */
const KNOWN_NEW_MOON = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));

/**
 * Calculate the Julian Date for a given Date object
 */
function toJulianDate(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

/**
 * Normalize a value to 0-1 range
 */
function normalize(value: number): number {
  value = value - Math.floor(value);
  if (value < 0) value += 1;
  return value;
}

/**
 * Calculate moon phase for a given date
 * Uses the simple synodic calculation which is accurate to within a few hours
 */
export function calculateMoonPhase(date: Date): MoonPhaseData {
  // Calculate days since known new moon
  const daysSinceKnownNewMoon =
    (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);

  // Calculate phase (0-1)
  const phase = normalize(daysSinceKnownNewMoon / SYNODIC_MONTH);

  // Calculate age in days
  const age = phase * SYNODIC_MONTH;

  // Calculate illumination percentage
  // Uses cosine function for smooth illumination curve
  const illumination = (1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100;

  // Determine phase name
  const phaseInfo = MOON_PHASES.find(
    (p) => phase >= p.min && phase < p.max
  ) || MOON_PHASES[0];

  // Generate description
  const description = getPhaseDescription(phaseInfo.name, illumination);

  return {
    phase,
    phaseName: phaseInfo.name,
    illumination: Math.round(illumination * 10) / 10,
    age: Math.round(age * 10) / 10,
    emoji: phaseInfo.emoji,
    description,
  };
}

/**
 * Generate a poetic description for the moon phase
 */
function getPhaseDescription(phaseName: string, illumination: number): string {
  const descriptions: Record<string, string> = {
    "New Moon": "A time of new beginnings, when the sky holds its secrets in darkness.",
    "Waxing Crescent": "Hope emerges as the first sliver of light returns to the night sky.",
    "First Quarter": "Half illuminated, the moon marks a moment of balance and decision.",
    "Waxing Gibbous": "Growing brighter each night, anticipation builds toward fullness.",
    "Full Moon": "In full splendor, the moon casts its silver light upon all below.",
    "Waning Gibbous": "Still bright but softening, a time for gratitude and reflection.",
    "Last Quarter": "Half in shadow, the moon guides us toward completion.",
    "Waning Crescent": "A gentle farewell as the moon prepares for renewal.",
  };

  return descriptions[phaseName] || "The moon continues its eternal dance.";
}

/**
 * Get the phase angle for SVG rendering
 * Returns the percentage of the moon that should be lit from the right
 */
export function getPhaseAngle(phase: number): {
  isWaxing: boolean;
  illuminationPercent: number;
} {
  // First half of cycle (0-0.5) is waxing, second half is waning
  const isWaxing = phase < 0.5;

  // Calculate how much of the visible face is lit
  let illuminationPercent: number;

  if (phase <= 0.5) {
    // Waxing: 0% at new moon, 100% at full moon
    illuminationPercent = phase * 2 * 100;
  } else {
    // Waning: 100% just after full moon, 0% approaching new moon
    illuminationPercent = (1 - phase) * 2 * 100;
  }

  return { isWaxing, illuminationPercent };
}

/**
 * Calculate the terminator curve for realistic moon rendering
 * Returns points for an SVG path that creates the shadow edge
 */
export function calculateTerminatorPath(
  phase: number,
  radius: number,
  centerX: number,
  centerY: number
): string {
  const { isWaxing, illuminationPercent } = getPhaseAngle(phase);

  // Handle edge cases
  if (illuminationPercent <= 0) {
    // New moon - all dark
    return "";
  }
  if (illuminationPercent >= 100) {
    // Full moon - all lit
    return `M ${centerX - radius} ${centerY} 
            A ${radius} ${radius} 0 1 1 ${centerX - radius} ${centerY - 0.01}`;
  }

  // Calculate the terminator curve
  // The terminator is an ellipse that creates the shadow edge
  const terminatorWidth = Math.abs(Math.cos((illuminationPercent / 100) * Math.PI)) * radius;

  // Build the path
  // We draw from top to bottom on one side, then use arcs for the lit portion

  const topY = centerY - radius;
  const bottomY = centerY + radius;

  if (isWaxing) {
    // Waxing: lit from the right side
    // Draw the lit portion on the right
    if (illuminationPercent < 50) {
      // Less than half lit - draw crescent on right
      return `M ${centerX} ${topY}
              A ${terminatorWidth} ${radius} 0 0 0 ${centerX} ${bottomY}
              A ${radius} ${radius} 0 0 1 ${centerX} ${topY}`;
    } else {
      // More than half lit - gibbous on right
      return `M ${centerX} ${topY}
              A ${terminatorWidth} ${radius} 0 0 1 ${centerX} ${bottomY}
              A ${radius} ${radius} 0 0 1 ${centerX} ${topY}`;
    }
  } else {
    // Waning: lit from the left side
    if (illuminationPercent < 50) {
      // Less than half lit - draw crescent on left
      return `M ${centerX} ${topY}
              A ${terminatorWidth} ${radius} 0 0 1 ${centerX} ${bottomY}
              A ${radius} ${radius} 0 0 1 ${centerX} ${topY}`;
    } else {
      // More than half lit - gibbous on left
      return `M ${centerX} ${topY}
              A ${terminatorWidth} ${radius} 0 0 0 ${centerX} ${bottomY}
              A ${radius} ${radius} 0 0 1 ${centerX} ${topY}`;
    }
  }
}

/**
 * Find the next occurrence of a specific moon phase
 */
export function findNextPhase(
  targetPhase: "new" | "first-quarter" | "full" | "last-quarter",
  fromDate: Date = new Date()
): Date {
  const phaseTargets = {
    new: 0,
    "first-quarter": 0.25,
    full: 0.5,
    "last-quarter": 0.75,
  };

  const target = phaseTargets[targetPhase];
  const currentPhase = calculateMoonPhase(fromDate).phase;

  // Calculate days until target phase
  let daysUntil = (target - currentPhase) * SYNODIC_MONTH;
  if (daysUntil < 0) {
    daysUntil += SYNODIC_MONTH;
  }

  // Add days to current date
  const nextDate = new Date(fromDate);
  nextDate.setDate(nextDate.getDate() + Math.round(daysUntil));

  return nextDate;
}

/**
 * Get moon phase for a specific date formatted for display
 */
export function getMoonPhaseDisplay(date: Date): {
  phaseName: string;
  illumination: string;
  age: string;
  emoji: string;
} {
  const data = calculateMoonPhase(date);

  return {
    phaseName: data.phaseName,
    illumination: `${data.illumination.toFixed(0)}%`,
    age: `${data.age.toFixed(1)} days`,
    emoji: data.emoji,
  };
}
