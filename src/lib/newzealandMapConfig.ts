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

// Calibration data for each map color - manually calibrated pin positions (20 pins each)
const mapCalibrationData: Record<string, { bounds: { left: number; right: number; top: number; bottom: number }; pins: Record<string, PinPosition> }> = {
  blue: {
    bounds: { left: 20.7, right: 76, top: 7.4, bottom: 91.2 },
    pins: {
      capeReinga: { x: 45.5, y: 7.6 },
      eastCape: { x: 75.8, y: 29.2 },
      bluff: { x: 29.3, y: 86.7 },
      westCape: { x: 21.0, y: 83.0 },
      whangarei: { x: 50.5, y: 12.5 },
      auckland: { x: 55.5, y: 22.0 },
      tauranga: { x: 62.7, y: 28.7 },
      gisborne: { x: 73.5, y: 35.2 },
      napier: { x: 67.3, y: 40.2 },
      hamilton: { x: 58.8, y: 29.2 },
      rotorua: { x: 64.3, y: 33.2 },
      newPlymouth: { x: 52.8, y: 37.5 },
      wellington: { x: 56.0, y: 52.0 },
      nelson: { x: 49.7, y: 51.6 },
      greymouth: { x: 40.2, y: 58.9 },
      queenstown: { x: 29.0, y: 77.2 },
      christchurch: { x: 47.0, y: 67.0 },
      timaru: { x: 40.7, y: 71.6 },
      dunedin: { x: 38.0, y: 82.0 },
      invercargill: { x: 29.3, y: 85.5 },
    },
  },
  green: {
    bounds: { left: 21.7, right: 77.7, top: 8.2, bottom: 90.9 },
    pins: {
      capeReinga: { x: 47.5, y: 8.4 },
      eastCape: { x: 77.5, y: 30.0 },
      bluff: { x: 30.8, y: 86.4 },
      westCape: { x: 22.0, y: 82.9 },
      whangarei: { x: 52.3, y: 13.2 },
      auckland: { x: 57.3, y: 22.2 },
      tauranga: { x: 64.5, y: 29.0 },
      gisborne: { x: 75.0, y: 36.0 },
      napier: { x: 68.8, y: 41.2 },
      hamilton: { x: 61.3, y: 30.0 },
      rotorua: { x: 65.3, y: 33.2 },
      newPlymouth: { x: 55.0, y: 37.9 },
      wellington: { x: 57.8, y: 51.9 },
      nelson: { x: 51.0, y: 51.9 },
      greymouth: { x: 41.8, y: 58.9 },
      queenstown: { x: 30.0, y: 78.0 },
      christchurch: { x: 48.8, y: 67.4 },
      timaru: { x: 42.5, y: 71.4 },
      dunedin: { x: 39.3, y: 81.6 },
      invercargill: { x: 30.8, y: 85.4 },
    },
  },
  pink: {
    bounds: { left: 22.2, right: 75, top: 10.7, bottom: 89.2 },
    pins: {
      capeReinga: { x: 47.0, y: 10.9 },
      eastCape: { x: 74.7, y: 31.1 },
      bluff: { x: 30.5, y: 84.9 },
      westCape: { x: 22.5, y: 81.6 },
      whangarei: { x: 51.7, y: 16.2 },
      auckland: { x: 56.0, y: 23.7 },
      tauranga: { x: 62.7, y: 30.2 },
      gisborne: { x: 72.5, y: 36.7 },
      napier: { x: 66.5, y: 41.7 },
      hamilton: { x: 60.0, y: 31.2 },
      rotorua: { x: 63.5, y: 33.5 },
      newPlymouth: { x: 53.7, y: 38.6 },
      wellington: { x: 56.5, y: 51.9 },
      nelson: { x: 50.5, y: 52.1 },
      greymouth: { x: 41.2, y: 59.4 },
      queenstown: { x: 30.8, y: 75.7 },
      christchurch: { x: 47.8, y: 67.0 },
      timaru: { x: 41.7, y: 70.6 },
      dunedin: { x: 39.5, y: 80.1 },
      invercargill: { x: 30.5, y: 84.4 },
    },
  },
  purple: {
    bounds: { left: 17.6, right: 75.3, top: 5.9, bottom: 93.6 },
    pins: {
      capeReinga: { x: 44.4, y: 6.1 },
      eastCape: { x: 75.1, y: 29.0 },
      bluff: { x: 26.9, y: 88.8 },
      westCape: { x: 17.9, y: 85.1 },
      whangarei: { x: 48.8, y: 11.2 },
      auckland: { x: 54.0, y: 20.5 },
      tauranga: { x: 62.0, y: 28.5 },
      gisborne: { x: 72.3, y: 35.5 },
      napier: { x: 66.0, y: 40.7 },
      hamilton: { x: 58.5, y: 29.5 },
      rotorua: { x: 63.0, y: 32.2 },
      newPlymouth: { x: 51.3, y: 37.4 },
      wellington: { x: 54.9, y: 52.3 },
      nelson: { x: 47.8, y: 52.8 },
      greymouth: { x: 38.3, y: 60.7 },
      queenstown: { x: 26.5, y: 78.7 },
      christchurch: { x: 45.3, y: 68.2 },
      timaru: { x: 40.3, y: 72.2 },
      dunedin: { x: 36.4, y: 83.3 },
      invercargill: { x: 26.9, y: 87.8 },
    },
  },
  orange: {
    bounds: { left: 17.4, right: 74.6, top: 7.2, bottom: 93.6 },
    pins: {
      capeReinga: { x: 44.4, y: 7.4 },
      eastCape: { x: 74.4, y: 29.9 },
      bluff: { x: 26.9, y: 89.0 },
      westCape: { x: 17.6, y: 85.5 },
      whangarei: { x: 50.0, y: 14.0 },
      auckland: { x: 54.1, y: 21.3 },
      tauranga: { x: 61.5, y: 29.2 },
      gisborne: { x: 71.8, y: 36.0 },
      napier: { x: 65.3, y: 41.7 },
      hamilton: { x: 58.0, y: 30.5 },
      rotorua: { x: 62.3, y: 33.0 },
      newPlymouth: { x: 51.0, y: 38.5 },
      wellington: { x: 54.3, y: 52.7 },
      nelson: { x: 48.1, y: 52.6 },
      greymouth: { x: 38.1, y: 60.6 },
      queenstown: { x: 26.5, y: 79.2 },
      christchurch: { x: 44.9, y: 69.1 },
      timaru: { x: 38.9, y: 73.1 },
      dunedin: { x: 35.9, y: 83.7 },
      invercargill: { x: 26.9, y: 88.0 },
    },
  },
  yellow: {
    bounds: { left: 19.2, right: 74.7, top: 6.7, bottom: 90.1 },
    pins: {
      capeReinga: { x: 45.1, y: 6.9 },
      eastCape: { x: 74.5, y: 28.6 },
      bluff: { x: 28.2, y: 85.6 },
      westCape: { x: 19.5, y: 82.1 },
      whangarei: { x: 50.2, y: 12.5 },
      auckland: { x: 55.0, y: 21.6 },
      tauranga: { x: 62.5, y: 28.4 },
      gisborne: { x: 71.8, y: 34.7 },
      napier: { x: 65.8, y: 40.0 },
      hamilton: { x: 58.8, y: 29.5 },
      rotorua: { x: 63.2, y: 32.5 },
      newPlymouth: { x: 52.0, y: 37.0 },
      wellington: { x: 55.3, y: 50.9 },
      nelson: { x: 49.0, y: 50.6 },
      greymouth: { x: 38.3, y: 60.2 },
      queenstown: { x: 28.2, y: 77.0 },
      christchurch: { x: 46.5, y: 66.5 },
      timaru: { x: 40.3, y: 69.7 },
      dunedin: { x: 37.3, y: 80.4 },
      invercargill: { x: 28.2, y: 84.4 },
    },
  },
  red: {
    bounds: { left: 15.5, right: 75, top: 5.9, bottom: 94.4 },
    pins: {
      capeReinga: { x: 42.8, y: 6.1 },
      eastCape: { x: 74.8, y: 29.9 },
      bluff: { x: 24.5, y: 89.6 },
      westCape: { x: 15.8, y: 85.9 },
      whangarei: { x: 49.0, y: 12.7 },
      auckland: { x: 56.0, y: 23.0 },
      tauranga: { x: 61.8, y: 29.4 },
      gisborne: { x: 72.3, y: 36.0 },
      napier: { x: 65.5, y: 41.5 },
      hamilton: { x: 57.5, y: 30.5 },
      rotorua: { x: 62.5, y: 33.7 },
      newPlymouth: { x: 50.7, y: 38.1 },
      wellington: { x: 54.0, y: 53.1 },
      nelson: { x: 46.8, y: 52.9 },
      greymouth: { x: 36.8, y: 60.4 },
      queenstown: { x: 25.0, y: 80.5 },
      christchurch: { x: 43.5, y: 69.6 },
      timaru: { x: 38.0, y: 73.4 },
      dunedin: { x: 33.8, y: 84.4 },
      invercargill: { x: 24.5, y: 88.6 },
    },
  },
  brown: {
    bounds: { left: 18.7, right: 76.2, top: 7.8, bottom: 92.7 },
    pins: {
      capeReinga: { x: 46.0, y: 8.0 },
      eastCape: { x: 76.0, y: 30.0 },
      bluff: { x: 27.3, y: 88.1 },
      westCape: { x: 19.0, y: 84.6 },
      whangarei: { x: 52.0, y: 15.0 },
      auckland: { x: 55.3, y: 22.0 },
      tauranga: { x: 62.7, y: 29.9 },
      gisborne: { x: 73.0, y: 36.6 },
      napier: { x: 66.8, y: 41.9 },
      hamilton: { x: 58.8, y: 30.5 },
      rotorua: { x: 63.5, y: 34.5 },
      newPlymouth: { x: 52.0, y: 38.6 },
      wellington: { x: 55.5, y: 52.9 },
      nelson: { x: 48.8, y: 52.9 },
      greymouth: { x: 38.8, y: 60.9 },
      queenstown: { x: 27.8, y: 79.2 },
      christchurch: { x: 45.8, y: 68.9 },
      timaru: { x: 39.3, y: 73.6 },
      dunedin: { x: 36.3, y: 82.9 },
      invercargill: { x: 27.3, y: 87.1 },
    },
  },
  cream: {
    bounds: { left: 21.5, right: 76, top: 8.9, bottom: 90.8 },
    pins: {
      capeReinga: { x: 47.0, y: 9.1 },
      eastCape: { x: 75.8, y: 30.7 },
      bluff: { x: 30.0, y: 86.4 },
      westCape: { x: 21.8, y: 83.1 },
      whangarei: { x: 52.0, y: 14.6 },
      auckland: { x: 56.0, y: 23.1 },
      tauranga: { x: 63.5, y: 29.6 },
      gisborne: { x: 73.3, y: 36.5 },
      napier: { x: 67.0, y: 41.2 },
      hamilton: { x: 59.3, y: 30.1 },
      rotorua: { x: 64.3, y: 33.1 },
      newPlymouth: { x: 53.8, y: 38.2 },
      wellington: { x: 56.8, y: 51.9 },
      nelson: { x: 50.2, y: 52.0 },
      greymouth: { x: 40.0, y: 62.0 },
      queenstown: { x: 30.0, y: 77.4 },
      christchurch: { x: 47.5, y: 66.7 },
      timaru: { x: 42.5, y: 71.0 },
      dunedin: { x: 38.0, y: 82.0 },
      invercargill: { x: 30.0, y: 85.4 },
    },
  },
  white: {
    bounds: { left: 25.3, right: 71.4, top: 15.5, bottom: 84.4 },
    pins: {
      capeReinga: { x: 47.0, y: 15.7 },
      eastCape: { x: 71.3, y: 33.2 },
      bluff: { x: 32.5, y: 80.7 },
      westCape: { x: 25.5, y: 77.7 },
      whangarei: { x: 51.5, y: 20.2 },
      auckland: { x: 55.0, y: 26.7 },
      tauranga: { x: 60.8, y: 32.7 },
      gisborne: { x: 69.5, y: 38.0 },
      napier: { x: 64.3, y: 42.0 },
      hamilton: { x: 56.5, y: 31.7 },
      rotorua: { x: 61.8, y: 35.7 },
      newPlymouth: { x: 52.5, y: 40.0 },
      wellington: { x: 55.3, y: 51.7 },
      nelson: { x: 49.8, y: 52.0 },
      greymouth: { x: 40.0, y: 61.0 },
      queenstown: { x: 32.8, y: 72.0 },
      christchurch: { x: 47.5, y: 65.2 },
      timaru: { x: 43.8, y: 67.2 },
      dunedin: { x: 39.8, y: 76.5 },
      invercargill: { x: 32.5, y: 79.5 },
    },
  },
  grey: {
    bounds: { left: 21.7, right: 74.5, top: 10.3, bottom: 89.5 },
    pins: {
      capeReinga: { x: 46.3, y: 10.5 },
      eastCape: { x: 74.3, y: 31.5 },
      bluff: { x: 30.5, y: 85.2 },
      westCape: { x: 22.0, y: 82.2 },
      whangarei: { x: 52.0, y: 15.0 },
      auckland: { x: 56.0, y: 23.0 },
      tauranga: { x: 64.0, y: 30.0 },
      gisborne: { x: 72.3, y: 37.0 },
      napier: { x: 66.3, y: 42.0 },
      hamilton: { x: 59.0, y: 30.0 },
      rotorua: { x: 65.0, y: 33.0 },
      newPlymouth: { x: 53.0, y: 39.0 },
      wellington: { x: 55.8, y: 52.5 },
      nelson: { x: 49.8, y: 52.5 },
      greymouth: { x: 40.0, y: 61.2 },
      queenstown: { x: 30.8, y: 77.2 },
      christchurch: { x: 47.3, y: 67.2 },
      timaru: { x: 41.8, y: 70.5 },
      dunedin: { x: 38.5, y: 80.2 },
      invercargill: { x: 30.5, y: 84.2 },
    },
  },
  black: {
    bounds: { left: 15.2, right: 77, top: 4.7, bottom: 94.8 },
    pins: {
      capeReinga: { x: 43.8, y: 5.0 },
      eastCape: { x: 76.8, y: 28.7 },
      bluff: { x: 24.5, y: 90.0 },
      westCape: { x: 15.5, y: 86.0 },
      whangarei: { x: 49.5, y: 11.0 },
      auckland: { x: 54.5, y: 20.0 },
      tauranga: { x: 62.5, y: 27.7 },
      gisborne: { x: 73.8, y: 35.0 },
      napier: { x: 67.0, y: 40.2 },
      hamilton: { x: 58.5, y: 28.5 },
      rotorua: { x: 64.3, y: 31.7 },
      newPlymouth: { x: 51.7, y: 37.0 },
      wellington: { x: 54.8, y: 52.5 },
      nelson: { x: 47.8, y: 52.2 },
      greymouth: { x: 37.3, y: 60.0 },
      queenstown: { x: 24.8, y: 80.0 },
      christchurch: { x: 45.3, y: 69.7 },
      timaru: { x: 38.5, y: 73.5 },
      dunedin: { x: 34.8, y: 84.5 },
      invercargill: { x: 24.5, y: 89.0 },
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

// Geographic coordinates of calibration points (20 total)
const calibrationGeoCoords: Record<string, { lat: number; lng: number }> = {
  // Extreme boundary points
  capeReinga: { lat: -34.43, lng: 172.68 },
  eastCape: { lat: -37.69, lng: 178.55 },
  bluff: { lat: -46.60, lng: 168.35 },
  westCape: { lat: -45.99, lng: 166.46 },
  // North Island - East Coast
  whangarei: { lat: -35.73, lng: 174.32 },
  auckland: { lat: -36.85, lng: 174.76 },
  tauranga: { lat: -37.69, lng: 176.17 },
  gisborne: { lat: -38.66, lng: 178.02 },
  napier: { lat: -39.49, lng: 176.92 },
  // North Island - Central/West
  hamilton: { lat: -37.79, lng: 175.28 },
  rotorua: { lat: -38.14, lng: 176.25 },
  newPlymouth: { lat: -39.07, lng: 174.08 },
  wellington: { lat: -41.29, lng: 174.78 },
  // South Island - North/West
  nelson: { lat: -41.27, lng: 173.28 },
  greymouth: { lat: -42.45, lng: 171.21 },
  queenstown: { lat: -45.03, lng: 168.66 },
  // South Island - East Coast
  christchurch: { lat: -43.53, lng: 172.64 },
  timaru: { lat: -44.40, lng: 171.25 },
  dunedin: { lat: -45.87, lng: 170.50 },
  invercargill: { lat: -46.41, lng: 168.35 },
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