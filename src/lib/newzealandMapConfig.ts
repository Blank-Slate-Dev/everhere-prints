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
const mapCalibrationData: Record<string, { bounds: { left: number; right: number; top: number; bottom: number }; pins: Record<string, PinPosition> }> = {
  blue: {
    bounds: { left: 4.6, right: 76, top: 7.4, bottom: 91.2 },
    pins: {
      capeReinga: { x: 45.4, y: 7.6 },
      eastCape: { x: 75.7, y: 29.6 },
      bluff: { x: 29.3, y: 86.6 },
      westCape: { x: 20.7, y: 83.0 },
      auckland: { x: 55.5, y: 22.5 },
      wellington: { x: 56.2, y: 51.9 },
      christchurch: { x: 46.9, y: 67.0 },
      queenstown: { x: 29.8, y: 77.6 },
      rotorua: { x: 64.7, y: 31.9 },
      dunedin: { x: 37.8, y: 82.1 },
      hamilton: { x: 58.7, y: 29.7 },
      tauranga: { x: 63.2, y: 29.0 },
    },
  },
  green: {
    bounds: { left: 5.8, right: 77.9, top: 8.1, bottom: 90.9 },
    pins: {
      capeReinga: { x: 47.6, y: 8.3 },
      eastCape: { x: 77.6, y: 30.2 },
      bluff: { x: 30.5, y: 86.5 },
      westCape: { x: 22.1, y: 82.8 },
      auckland: { x: 57.6, y: 23.6 },
      wellington: { x: 57.8, y: 51.8 },
      christchurch: { x: 48.3, y: 67.4 },
      queenstown: { x: 31.6, y: 78.0 },
      rotorua: { x: 66.8, y: 33.1 },
      dunedin: { x: 39.6, y: 81.8 },
      hamilton: { x: 60.6, y: 31.0 },
      tauranga: { x: 65.3, y: 30.1 },
    },
  },
  pink: {
    bounds: { left: 7.5, right: 75.3, top: 10.8, bottom: 89.2 },
    pins: {
      capeReinga: { x: 47.0, y: 11.0 },
      eastCape: { x: 75.0, y: 31.0 },
      bluff: { x: 30.8, y: 85.0 },
      westCape: { x: 22.8, y: 81.2 },
      auckland: { x: 56.3, y: 25.0 },
      wellington: { x: 56.8, y: 51.7 },
      christchurch: { x: 47.5, y: 66.7 },
      queenstown: { x: 32.5, y: 77.2 },
      rotorua: { x: 64.5, y: 34.0 },
      dunedin: { x: 39.3, y: 80.2 },
      hamilton: { x: 58.8, y: 32.0 },
      tauranga: { x: 63.7, y: 31.2 },
    },
  },
  purple: {
    bounds: { left: 1.6, right: 75.6, top: 6, bottom: 92.9 },
    pins: {
      capeReinga: { x: 44.5, y: 6.2 },
      eastCape: { x: 75.3, y: 29.0 },
      bluff: { x: 27.0, y: 88.2 },
      westCape: { x: 18.3, y: 84.2 },
      auckland: { x: 54.3, y: 22.2 },
      wellington: { x: 54.8, y: 52.5 },
      christchurch: { x: 45.5, y: 68.5 },
      queenstown: { x: 28.5, y: 79.2 },
      rotorua: { x: 64.8, y: 32.0 },
      dunedin: { x: 36.0, y: 83.5 },
      hamilton: { x: 57.8, y: 29.5 },
      tauranga: { x: 63.2, y: 29.0 },
    },
  },
  orange: {
    bounds: { left: 1.1, right: 75.1, top: 7.3, bottom: 93.4 },
    pins: {
      capeReinga: { x: 44.3, y: 7.5 },
      eastCape: { x: 74.8, y: 29.5 },
      bluff: { x: 26.5, y: 88.7 },
      westCape: { x: 17.8, y: 85.5 },
      auckland: { x: 54.0, y: 22.7 },
      wellington: { x: 54.8, y: 53.0 },
      christchurch: { x: 44.5, y: 68.7 },
      queenstown: { x: 27.5, y: 81.2 },
      rotorua: { x: 64.3, y: 33.2 },
      dunedin: { x: 35.5, y: 83.5 },
      hamilton: { x: 57.3, y: 31.2 },
      tauranga: { x: 62.0, y: 29.7 },
    },
  },
  yellow: {
    bounds: { left: 3.7, right: 74.8, top: 6.8, bottom: 90 },
    pins: {
      capeReinga: { x: 44.8, y: 7.0 },
      eastCape: { x: 74.5, y: 28.7 },
      bluff: { x: 28.0, y: 85.5 },
      westCape: { x: 19.8, y: 81.5 },
      auckland: { x: 54.5, y: 22.2 },
      wellington: { x: 55.5, y: 50.7 },
      christchurch: { x: 46.0, y: 66.2 },
      queenstown: { x: 29.5, y: 76.0 },
      rotorua: { x: 64.5, y: 32.0 },
      dunedin: { x: 37.0, y: 80.5 },
      hamilton: { x: 57.0, y: 30.0 },
      tauranga: { x: 62.7, y: 28.7 },
    },
  },
  red: {
    bounds: { left: -1.6, right: 75.3, top: 6, bottom: 94.8 },
    pins: {
      capeReinga: { x: 43.0, y: 6.2 },
      eastCape: { x: 75.0, y: 29.7 },
      bluff: { x: 24.8, y: 90.0 },
      westCape: { x: 15.8, y: 85.7 },
      auckland: { x: 53.5, y: 22.2 },
      wellington: { x: 53.5, y: 53.5 },
      christchurch: { x: 43.5, y: 69.7 },
      queenstown: { x: 25.8, y: 80.2 },
      rotorua: { x: 63.5, y: 33.2 },
      dunedin: { x: 33.8, y: 84.5 },
      hamilton: { x: 56.3, y: 30.2 },
      tauranga: { x: 61.5, y: 29.5 },
    },
  },
  brown: {
    bounds: { left: 2.1, right: 76.1, top: 7.5, bottom: 92.8 },
    pins: {
      capeReinga: { x: 45.3, y: 7.7 },
      eastCape: { x: 75.8, y: 30.5 },
      bluff: { x: 27.8, y: 88.2 },
      westCape: { x: 18.8, y: 84.5 },
      auckland: { x: 55.3, y: 23.2 },
      wellington: { x: 55.5, y: 53.0 },
      christchurch: { x: 45.5, y: 68.5 },
      queenstown: { x: 28.5, y: 78.7 },
      rotorua: { x: 64.8, y: 33.2 },
      dunedin: { x: 36.3, y: 82.7 },
      hamilton: { x: 58.5, y: 31.0 },
      tauranga: { x: 63.2, y: 30.0 },
    },
  },
  cream: {
    bounds: { left: 5.6, right: 76.3, top: 8.5, bottom: 90.9 },
    pins: {
      capeReinga: { x: 46.5, y: 8.7 },
      eastCape: { x: 76.0, y: 30.5 },
      bluff: { x: 30.3, y: 86.5 },
      westCape: { x: 21.5, y: 82.7 },
      auckland: { x: 56.3, y: 23.5 },
      wellington: { x: 57.0, y: 52.0 },
      christchurch: { x: 47.8, y: 67.0 },
      queenstown: { x: 31.3, y: 77.0 },
      rotorua: { x: 66.0, y: 33.2 },
      dunedin: { x: 38.8, y: 81.2 },
      hamilton: { x: 59.3, y: 30.5 },
      tauranga: { x: 64.0, y: 29.7 },
    },
  },
  white: {
    bounds: { left: 12, right: 72, top: 15.3, bottom: 84.2 },
    pins: {
      capeReinga: { x: 47.0, y: 15.5 },
      eastCape: { x: 71.8, y: 33.2 },
      bluff: { x: 33.0, y: 80.5 },
      westCape: { x: 25.5, y: 78.0 },
      auckland: { x: 54.8, y: 27.7 },
      wellington: { x: 55.5, y: 51.5 },
      christchurch: { x: 47.5, y: 64.7 },
      queenstown: { x: 34.0, y: 72.2 },
      rotorua: { x: 62.7, y: 36.5 },
      dunedin: { x: 40.3, y: 76.2 },
      hamilton: { x: 57.3, y: 33.7 },
      tauranga: { x: 61.5, y: 33.2 },
    },
  },
  grey: {
    bounds: { left: 6.6, right: 75, top: 10.5, bottom: 89.5 },
    pins: {
      capeReinga: { x: 46.5, y: 10.7 },
      eastCape: { x: 74.8, y: 31.5 },
      bluff: { x: 31.0, y: 85.2 },
      westCape: { x: 22.0, y: 82.0 },
      auckland: { x: 55.5, y: 24.7 },
      wellington: { x: 56.0, y: 52.5 },
      christchurch: { x: 47.3, y: 66.7 },
      queenstown: { x: 31.8, y: 76.2 },
      rotorua: { x: 64.3, y: 34.5 },
      dunedin: { x: 38.8, y: 80.5 },
      hamilton: { x: 58.5, y: 31.5 },
      tauranga: { x: 63.0, y: 31.0 },
    },
  },
  black: {
    bounds: { left: -2.4, right: 77.1, top: 4.7, bottom: 95.1 },
    pins: {
      capeReinga: { x: 44.3, y: 5.0 },
      eastCape: { x: 76.8, y: 28.7 },
      bluff: { x: 24.8, y: 90.2 },
      westCape: { x: 15.5, y: 86.2 },
      auckland: { x: 54.5, y: 21.2 },
      wellington: { x: 54.8, y: 52.5 },
      christchurch: { x: 44.8, y: 69.2 },
      queenstown: { x: 26.5, y: 80.5 },
      rotorua: { x: 64.5, y: 31.7 },
      dunedin: { x: 34.5, y: 85.0 },
      hamilton: { x: 57.5, y: 29.0 },
      tauranga: { x: 63.0, y: 27.7 },
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