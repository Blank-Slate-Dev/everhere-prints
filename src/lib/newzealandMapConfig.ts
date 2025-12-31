// src/lib/newzealandMapConfig.ts

export interface NewZealandMapColor {
  id: string;
  name: string;
  image: string;
  pinColor: string;
  textColor: string;
  accentColor: string;
}

interface PinPosition {
  x: number;
  y: number;
}

// New Zealand's geographic bounds
const GEO_BOUNDS = {
  west: 166.4,    // West Cape
  east: 178.6,    // East Cape
  north: -34.4,   // Cape Reinga
  south: -47.3,   // Stewart Island
};

// Calibration data for each map color - manually calibrated pin positions
// These will need to be calibrated once you have the images
const mapCalibrationData: Record<string, { bounds: { left: number; right: number; top: number; bottom: number }; pins: Record<string, PinPosition> }> = {
  blue: {
    // Bounds calculated from calibration points (left=13.0 calculated from Cape Reinga + East Cape)
    bounds: { left: 13.0, right: 76, top: 7.4, bottom: 91.2 },
    pins: {
      capeReinga: { x: 45.4, y: 7.6 }, // Cape Reinga (North)
      eastCape: { x: 75.7, y: 29.6 }, // East Cape
      bluff: { x: 29.3, y: 86.6 }, // Bluff (South)
      westCape: { x: 20.7, y: 83.0 }, // West Cape
      auckland: { x: 55.5, y: 22.5 }, // Auckland
      wellington: { x: 56.2, y: 51.9 }, // Wellington
      christchurch: { x: 46.9, y: 67.0 }, // Christchurch
      queenstown: { x: 29.8, y: 77.6 }, // Queenstown
      rotorua: { x: 64.7, y: 31.9 }, // Rotorua
      dunedin: { x: 37.8, y: 82.1 }, // Dunedin
      hamilton: { x: 58.7, y: 29.7 }, // Hamilton
      tauranga: { x: 63.2, y: 29.0 }, // Tauranga
    },
  },
  green: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  pink: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  purple: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  orange: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  yellow: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  red: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  brown: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  cream: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  white: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  grey: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
  black: {
    bounds: { left: 10, right: 90, top: 5, bottom: 95 },
    pins: {
      capeReinga: { x: 55, y: 5 },
      eastCape: { x: 90, y: 28 },
      bluff: { x: 25, y: 92 },
      westCape: { x: 10, y: 55 },
      auckland: { x: 58, y: 12 },
      wellington: { x: 72, y: 38 },
      christchurch: { x: 62, y: 55 },
      queenstown: { x: 32, y: 72 },
      rotorua: { x: 75, y: 22 },
      dunedin: { x: 48, y: 78 },
      hamilton: { x: 63, y: 16 },
      tauranga: { x: 78, y: 18 },
    },
  },
};

export const newzealandMapColors: NewZealandMapColor[] = [
  {
    id: "blue",
    name: "Ocean Blue",
    image: "/new_zealand_pastel_blue.png",
    pinColor: "#0369A1",
    textColor: "#075985",
    accentColor: "#0EA5E9",
  },
  {
    id: "green",
    name: "Eucalyptus",
    image: "/new_zealand_pastel_green.png",
    pinColor: "#047857",
    textColor: "#065F46",
    accentColor: "#10B981",
  },
  {
    id: "pink",
    name: "Blush Pink",
    image: "/new_zealand_pastel_pink.png",
    pinColor: "#BE185D",
    textColor: "#9D174D",
    accentColor: "#EC4899",
  },
  {
    id: "purple",
    name: "Lavender",
    image: "/new_zealand_pastel_purple.png",
    pinColor: "#7C3AED",
    textColor: "#5B21B6",
    accentColor: "#8B5CF6",
  },
  {
    id: "orange",
    name: "Sunset",
    image: "/new_zealand_pastel_orange.png",
    pinColor: "#EA580C",
    textColor: "#9A3412",
    accentColor: "#F97316",
  },
  {
    id: "yellow",
    name: "Sunshine",
    image: "/new_zealand_pastel_yellow.png",
    pinColor: "#CA8A04",
    textColor: "#854D0E",
    accentColor: "#EAB308",
  },
  {
    id: "red",
    name: "Coral Red",
    image: "/new_zealand_pastel_red.png",
    pinColor: "#DC2626",
    textColor: "#991B1B",
    accentColor: "#EF4444",
  },
  {
    id: "brown",
    name: "Earthy Brown",
    image: "/new_zealand_pastel_brown.png",
    pinColor: "#92400E",
    textColor: "#78350F",
    accentColor: "#B45309",
  },
  {
    id: "cream",
    name: "Vanilla",
    image: "/new_zealand_pastel_cream.png",
    pinColor: "#A16207",
    textColor: "#854D0E",
    accentColor: "#CA8A04",
  },
  {
    id: "white",
    name: "Pearl White",
    image: "/new_zealand_pastel_white.png",
    pinColor: "#57534E",
    textColor: "#44403C",
    accentColor: "#78716C",
  },
  {
    id: "grey",
    name: "Silver Mist",
    image: "/new_zealand_pastel_grey.png",
    pinColor: "#4B5563",
    textColor: "#374151",
    accentColor: "#6B7280",
  },
  {
    id: "black",
    name: "Charcoal",
    image: "/new_zealand_pastel_black.png",
    pinColor: "#1F2937",
    textColor: "#111827",
    accentColor: "#374151",
  },
];

// Geographic coordinates of calibration points
const calibrationGeoCoords: Record<string, { lat: number; lng: number }> = {
  capeReinga: { lat: -34.43, lng: 172.68 },
  eastCape: { lat: -37.69, lng: 178.55 },
  bluff: { lat: -46.60, lng: 168.35 },
  westCape: { lat: -45.99, lng: 166.46 },
  auckland: { lat: -36.85, lng: 174.76 },
  wellington: { lat: -41.29, lng: 174.78 },
  christchurch: { lat: -43.53, lng: 172.64 },
  queenstown: { lat: -45.03, lng: 168.66 },
  rotorua: { lat: -38.14, lng: 176.25 },
  dunedin: { lat: -45.87, lng: 170.50 },
  hamilton: { lat: -37.79, lng: 175.28 },
  tauranga: { lat: -37.69, lng: 176.17 },
};

/**
 * Convert geographic coordinates to image position using hybrid approach:
 * 1. Calculate base position using linear interpolation (preserves relative positions)
 * 2. Apply weighted correction based on nearby calibration point offsets
 * 
 * This avoids IDW "gravity wells" while still correcting for artistic distortion.
 */
export function coordsToImagePosition(
  latitude: number,
  longitude: number,
  colorId: string = "blue"
): { x: number; y: number; isValid: boolean } {
  // Check if coordinates are roughly within New Zealand
  const isValid =
    latitude <= GEO_BOUNDS.north + 1 &&
    latitude >= GEO_BOUNDS.south - 1 &&
    longitude >= GEO_BOUNDS.west - 1 &&
    longitude <= GEO_BOUNDS.east + 1;

  // Get calibration data for this color
  const colorData = mapCalibrationData[colorId];
  if (!colorData) {
    return coordsToImagePosition(latitude, longitude, "blue");
  }

  const { bounds, pins } = colorData;

  // Step 1: Calculate BASE position using linear interpolation
  const lngRatio = (longitude - GEO_BOUNDS.west) / (GEO_BOUNDS.east - GEO_BOUNDS.west);
  const latRatio = (latitude - GEO_BOUNDS.north) / (GEO_BOUNDS.south - GEO_BOUNDS.north);
  
  const baseX = bounds.left + lngRatio * (bounds.right - bounds.left);
  const baseY = bounds.top + latRatio * (bounds.bottom - bounds.top);

  // Step 2: Calculate correction offsets from calibration points
  // Each calibration point has an "offset" = actual position - linear prediction
  let sumOffsetX = 0;
  let sumOffsetY = 0;
  let sumWeights = 0;

  const pinIds = Object.keys(pins);
  
  for (const pinId of pinIds) {
    const geo = calibrationGeoCoords[pinId];
    const actualPos = pins[pinId];
    
    if (!geo || !actualPos) continue;

    // Calculate what linear interpolation would predict for this calibration point
    const predictedLngRatio = (geo.lng - GEO_BOUNDS.west) / (GEO_BOUNDS.east - GEO_BOUNDS.west);
    const predictedLatRatio = (geo.lat - GEO_BOUNDS.north) / (GEO_BOUNDS.south - GEO_BOUNDS.north);
    const predictedX = bounds.left + predictedLngRatio * (bounds.right - bounds.left);
    const predictedY = bounds.top + predictedLatRatio * (bounds.bottom - bounds.top);

    // The offset is the difference between actual calibrated position and prediction
    const offsetX = actualPos.x - predictedX;
    const offsetY = actualPos.y - predictedY;

    // Calculate geographic distance for weighting
    const dLat = latitude - geo.lat;
    const dLng = longitude - geo.lng;
    const distance = Math.sqrt(dLat * dLat + dLng * dLng);

    // Use gentler weighting (power of 1.5) to avoid sharp transitions
    // Add small constant to avoid division by zero and reduce extreme weights
    const weight = 1 / Math.pow(distance + 0.5, 1.5);
    
    sumOffsetX += offsetX * weight;
    sumOffsetY += offsetY * weight;
    sumWeights += weight;
  }

  // Apply weighted average of offsets to base position
  const correctionX = sumWeights > 0 ? sumOffsetX / sumWeights : 0;
  const correctionY = sumWeights > 0 ? sumOffsetY / sumWeights : 0;

  const x = baseX + correctionX;
  const y = baseY + correctionY;

  // Clamp to valid range
  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(2, Math.min(98, y)),
    isValid,
  };
}

/**
 * Get a color configuration by ID
 */
export function getNewZealandMapColor(colorId: string): NewZealandMapColor {
  return newzealandMapColors.find((c) => c.id === colorId) || newzealandMapColors[0];
}

/**
 * Get the calibration data for a specific color
 */
export function getCalibrationData(colorId: string) {
  return mapCalibrationData[colorId] || mapCalibrationData.blue;
}

/**
 * Test locations for verification
 */
export const testLocations = {
  // Extreme points
  capeReinga: { lat: -34.43, lng: 172.68, name: "Cape Reinga (North)" },
  eastCape: { lat: -37.69, lng: 178.55, name: "East Cape" },
  bluff: { lat: -46.60, lng: 168.35, name: "Bluff (South)" },
  westCape: { lat: -42.45, lng: 169.15, name: "West Cape" },

  // Major cities
  auckland: { lat: -36.85, lng: 174.76, name: "Auckland" },
  wellington: { lat: -41.29, lng: 174.78, name: "Wellington" },
  christchurch: { lat: -43.53, lng: 172.64, name: "Christchurch" },
  queenstown: { lat: -45.03, lng: 168.66, name: "Queenstown" },
  rotorua: { lat: -38.14, lng: 176.25, name: "Rotorua" },
  dunedin: { lat: -45.87, lng: 170.50, name: "Dunedin" },
  hamilton: { lat: -37.79, lng: 175.28, name: "Hamilton" },
  tauranga: { lat: -37.69, lng: 176.17, name: "Tauranga" },
  napier: { lat: -39.49, lng: 176.92, name: "Napier" },
  nelson: { lat: -41.27, lng: 173.28, name: "Nelson" },
  invercargill: { lat: -46.41, lng: 168.35, name: "Invercargill" },
};