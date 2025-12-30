// src/lib/australiaMapConfig.ts

export interface AustraliaMapColor {
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

interface CalibrationPoint {
  lat: number;
  lng: number;
  positions: Record<string, PinPosition>;
}

// Australia's geographic bounds
const GEO_BOUNDS = {
  west: 113.15,   // Steep Point
  east: 153.64,   // Cape Byron
  north: -10.68,  // Cape York
  south: -43.64,  // South of Tasmania
};

// Calibration data for each map color - manually calibrated pin positions
const mapCalibrationData: Record<string, { bounds: { left: number; right: number; top: number; bottom: number }; pins: Record<string, PinPosition> }> = {
  blue: {
    bounds: { left: 4.8, right: 94.6, top: 11, bottom: 91.2 },
    pins: {
      steepPoint: { x: 4.8, y: 47.1 },
      capeByron: { x: 94.6, y: 47.0 },
      capeYork: { x: 70.6, y: 11.0 },
      hobart: { x: 80.3, y: 89.4 },
      perth: { x: 11.2, y: 62.5 },
      darwin: { x: 45.1, y: 14.7 },
      brisbane: { x: 91.3, y: 43.0 },
      melbourne: { x: 74.8, y: 76.9 },
      sydney: { x: 89.1, y: 66.6 },
      adelaide: { x: 62.1, y: 69.0 },
      cairns: { x: 77.9, y: 26.4 },
      alice: { x: 51.9, y: 38.3 },
    },
  },
  green: {
    bounds: { left: 3.2, right: 97.6, top: 8.2, bottom: 91.8 },
    pins: {
      steepPoint: { x: 3.2, y: 49.0 },
      capeByron: { x: 97.6, y: 48.7 },
      capeYork: { x: 73.6, y: 8.2 },
      hobart: { x: 78.8, y: 89.9 },
      perth: { x: 9.6, y: 62.3 },
      darwin: { x: 45.0, y: 11.3 },
      brisbane: { x: 95.4, y: 44.7 },
      melbourne: { x: 74.2, y: 77.1 },
      sydney: { x: 90.2, y: 67.9 },
      adelaide: { x: 62.2, y: 68.2 },
      cairns: { x: 80.9, y: 22.7 },
      alice: { x: 52.4, y: 35.1 },
    },
  },
  pink: {
    bounds: { left: 3.8, right: 96.9, top: 9.9, bottom: 91.6 },
    pins: {
      steepPoint: { x: 3.8, y: 48.7 },
      capeByron: { x: 96.9, y: 44.7 },
      capeYork: { x: 70.1, y: 9.9 },
      hobart: { x: 81.0, y: 89.7 },
      perth: { x: 10.3, y: 62.5 },
      darwin: { x: 45.4, y: 13.4 },
      brisbane: { x: 93.2, y: 41.5 },
      melbourne: { x: 74.3, y: 77.1 },
      sydney: { x: 89.8, y: 68.9 },
      adelaide: { x: 61.6, y: 68.1 },
      cairns: { x: 77.7, y: 21.1 },
      alice: { x: 51.2, y: 35.7 },
    },
  },
  purple: {
    bounds: { left: 6.3, right: 94.3, top: 12, bottom: 90.4 },
    pins: {
      steepPoint: { x: 6.3, y: 50.0 },
      capeByron: { x: 94.3, y: 47.7 },
      capeYork: { x: 69.2, y: 12.0 },
      hobart: { x: 80.8, y: 88.6 },
      perth: { x: 12.4, y: 62.6 },
      darwin: { x: 45.6, y: 15.9 },
      brisbane: { x: 90.8, y: 44.0 },
      melbourne: { x: 74.9, y: 77.5 },
      sydney: { x: 89.5, y: 67.6 },
      adelaide: { x: 61.8, y: 68.7 },
      cairns: { x: 76.7, y: 25.2 },
      alice: { x: 50.7, y: 39.1 },
    },
  },
  orange: {
    bounds: { left: 6.6, right: 95.2, top: 12.3, bottom: 90.7 },
    pins: {
      steepPoint: { x: 6.6, y: 48.7 },
      capeByron: { x: 95.2, y: 53.0 },
      capeYork: { x: 70.5, y: 12.3 },
      hobart: { x: 82.2, y: 88.9 },
      perth: { x: 12.0, y: 62.6 },
      darwin: { x: 45.2, y: 15.7 },
      brisbane: { x: 93.7, y: 46.8 },
      melbourne: { x: 76.1, y: 76.7 },
      sydney: { x: 88.0, y: 63.0 },
      adelaide: { x: 62.5, y: 69.2 },
      cairns: { x: 77.9, y: 26.1 },
      alice: { x: 51.1, y: 40.0 },
    },
  },
  yellow: {
    bounds: { left: 7.2, right: 94.1, top: 12.7, bottom: 89.4 },
    pins: {
      steepPoint: { x: 7.2, y: 49.5 },
      capeByron: { x: 94.1, y: 49.2 },
      capeYork: { x: 68.8, y: 12.7 },
      hobart: { x: 81.4, y: 87.6 },
      perth: { x: 13.0, y: 62.0 },
      darwin: { x: 44.4, y: 13.9 },
      brisbane: { x: 92.0, y: 44.8 },
      melbourne: { x: 74.7, y: 75.8 },
      sydney: { x: 90.2, y: 65.4 },
      adelaide: { x: 59.6, y: 68.1 },
      cairns: { x: 77.2, y: 26.4 },
      alice: { x: 52.1, y: 37.0 },
    },
  },
  red: {
    bounds: { left: 5, right: 95.2, top: 11.9, bottom: 90.2 },
    pins: {
      steepPoint: { x: 5.0, y: 48.0 },
      capeByron: { x: 95.2, y: 53.0 },
      capeYork: { x: 70.1, y: 11.9 },
      hobart: { x: 82.3, y: 88.4 },
      perth: { x: 12.0, y: 58.0 },
      darwin: { x: 44.9, y: 15.7 },
      brisbane: { x: 94.3, y: 48.3 },
      melbourne: { x: 75.7, y: 76.7 },
      sydney: { x: 89.5, y: 67.4 },
      adelaide: { x: 62.6, y: 68.9 },
      cairns: { x: 77.9, y: 26.4 },
      alice: { x: 51.7, y: 38.4 },
    },
  },
  brown: {
    bounds: { left: 5.1, right: 95, top: 11, bottom: 93.4 },
    pins: {
      steepPoint: { x: 5.1, y: 47.7 },
      capeByron: { x: 95.0, y: 52.1 },
      capeYork: { x: 70.5, y: 11.0 },
      hobart: { x: 82.1, y: 91.5 },
      perth: { x: 11.1, y: 63.3 },
      darwin: { x: 45.8, y: 16.0 },
      brisbane: { x: 94.6, y: 46.6 },
      melbourne: { x: 76.3, y: 77.7 },
      sydney: { x: 89.9, y: 68.4 },
      adelaide: { x: 62.5, y: 71.1 },
      cairns: { x: 79.0, y: 27.5 },
      alice: { x: 50.6, y: 38.7 },
    },
  },
  cream: {
    bounds: { left: 9.3, right: 87.3, top: 12.6, bottom: 84.5 },
    pins: {
      steepPoint: { x: 9.3, y: 45.0 },
      capeByron: { x: 87.3, y: 49.2 },
      capeYork: { x: 65.5, y: 12.6 },
      hobart: { x: 75.8, y: 82.8 },
      perth: { x: 14.9, y: 58.5 },
      darwin: { x: 44.1, y: 16.3 },
      brisbane: { x: 86.5, y: 44.9 },
      melbourne: { x: 70.4, y: 71.5 },
      sydney: { x: 82.7, y: 63.0 },
      adelaide: { x: 59.0, y: 64.6 },
      cairns: { x: 71.6, y: 25.6 },
      alice: { x: 49.5, y: 36.5 },
    },
  },
  white: {
    bounds: { left: 6.8, right: 91.4, top: 12.5, bottom: 87.8 },
    pins: {
      steepPoint: { x: 6.8, y: 47.7 },
      capeByron: { x: 91.4, y: 49.7 },
      capeYork: { x: 67.5, y: 12.5 },
      hobart: { x: 78.7, y: 86.1 },
      perth: { x: 12.7, y: 62.7 },
      darwin: { x: 45.2, y: 16.5 },
      brisbane: { x: 90.1, y: 43.9 },
      melbourne: { x: 73.1, y: 74.8 },
      sydney: { x: 86.9, y: 64.1 },
      adelaide: { x: 60.1, y: 67.8 },
      cairns: { x: 74.9, y: 25.6 },
      alice: { x: 51.2, y: 37.3 },
    },
  },
  grey: {
    bounds: { left: 5.8, right: 94.2, top: 12.3, bottom: 89.8 },
    pins: {
      steepPoint: { x: 5.8, y: 47.0 },
      capeByron: { x: 94.2, y: 52.3 },
      capeYork: { x: 70.3, y: 12.3 },
      hobart: { x: 80.8, y: 88.1 },
      perth: { x: 12.8, y: 61.9 },
      darwin: { x: 44.7, y: 15.5 },
      brisbane: { x: 92.8, y: 46.1 },
      melbourne: { x: 75.3, y: 76.0 },
      sydney: { x: 88.6, y: 66.6 },
      adelaide: { x: 61.9, y: 68.2 },
      cairns: { x: 78.1, y: 27.1 },
      alice: { x: 51.0, y: 39.2 },
    },
  },
  black: {
    bounds: { left: 6.7, right: 90.5, top: 12.2, bottom: 87.3 },
    pins: {
      steepPoint: { x: 6.7, y: 44.9 },
      capeByron: { x: 90.5, y: 51.3 },
      capeYork: { x: 67.9, y: 12.2 },
      hobart: { x: 78.7, y: 85.6 },
      perth: { x: 12.8, y: 59.1 },
      darwin: { x: 44.9, y: 15.7 },
      brisbane: { x: 89.7, y: 45.2 },
      melbourne: { x: 72.8, y: 73.2 },
      sydney: { x: 86.4, y: 63.4 },
      adelaide: { x: 59.1, y: 65.5 },
      cairns: { x: 75.1, y: 25.8 },
      alice: { x: 50.6, y: 38.0 },
    },
  },
};

// Known calibration points with their coordinates
const calibrationPoints: CalibrationPoint[] = [
  { lat: -26.15, lng: 113.15, positions: {} }, // steepPoint
  { lat: -28.64, lng: 153.64, positions: {} }, // capeByron
  { lat: -10.68, lng: 142.53, positions: {} }, // capeYork
  { lat: -42.88, lng: 147.33, positions: {} }, // hobart
  { lat: -31.95, lng: 115.86, positions: {} }, // perth
  { lat: -12.46, lng: 130.85, positions: {} }, // darwin
  { lat: -27.47, lng: 153.03, positions: {} }, // brisbane
  { lat: -37.81, lng: 144.96, positions: {} }, // melbourne
  { lat: -33.87, lng: 151.21, positions: {} }, // sydney
  { lat: -34.93, lng: 138.60, positions: {} }, // adelaide
  { lat: -16.92, lng: 145.78, positions: {} }, // cairns
  { lat: -23.70, lng: 133.88, positions: {} }, // alice
];

// Map pin IDs to calibration point indices
const pinIdToIndex: Record<string, number> = {
  steepPoint: 0,
  capeByron: 1,
  capeYork: 2,
  hobart: 3,
  perth: 4,
  darwin: 5,
  brisbane: 6,
  melbourne: 7,
  sydney: 8,
  adelaide: 9,
  cairns: 10,
  alice: 11,
};

// Build calibration points positions for each color
Object.entries(mapCalibrationData).forEach(([colorId, data]) => {
  Object.entries(data.pins).forEach(([pinId, pos]) => {
    const idx = pinIdToIndex[pinId];
    if (idx !== undefined) {
      calibrationPoints[idx].positions[colorId] = pos;
    }
  });
});

export const australiaMapColors: AustraliaMapColor[] = [
  {
    id: "blue",
    name: "Ocean Blue",
    image: "/australia_pastel_blue.png",
    pinColor: "#0369A1",
    textColor: "#075985",
    accentColor: "#0EA5E9",
  },
  {
    id: "green",
    name: "Eucalyptus",
    image: "/australia_pastel_green.png",
    pinColor: "#047857",
    textColor: "#065F46",
    accentColor: "#10B981",
  },
  {
    id: "pink",
    name: "Blush Pink",
    image: "/australia_pastel_pink.png",
    pinColor: "#BE185D",
    textColor: "#9D174D",
    accentColor: "#EC4899",
  },
  {
    id: "purple",
    name: "Lavender",
    image: "/australia_pastel_purple.png",
    pinColor: "#7C3AED",
    textColor: "#5B21B6",
    accentColor: "#8B5CF6",
  },
  {
    id: "orange",
    name: "Sunset",
    image: "/australia_pastel_orange.png",
    pinColor: "#EA580C",
    textColor: "#9A3412",
    accentColor: "#F97316",
  },
  {
    id: "yellow",
    name: "Sunshine",
    image: "/australia_pastel_yellow.png",
    pinColor: "#CA8A04",
    textColor: "#854D0E",
    accentColor: "#EAB308",
  },
  {
    id: "red",
    name: "Coral Red",
    image: "/australia_pastel_red.png",
    pinColor: "#DC2626",
    textColor: "#991B1B",
    accentColor: "#EF4444",
  },
  {
    id: "brown",
    name: "Earthy Brown",
    image: "/australia_pastel_brown.png",
    pinColor: "#92400E",
    textColor: "#78350F",
    accentColor: "#B45309",
  },
  {
    id: "cream",
    name: "Vanilla",
    image: "/australia_pastel_cream.png",
    pinColor: "#A16207",
    textColor: "#854D0E",
    accentColor: "#CA8A04",
  },
  {
    id: "white",
    name: "Pearl White",
    image: "/australia_pastel_white.png",
    pinColor: "#57534E",
    textColor: "#44403C",
    accentColor: "#78716C",
  },
  {
    id: "grey",
    name: "Silver Mist",
    image: "/australia_pastel_grey.png",
    pinColor: "#4B5563",
    textColor: "#374151",
    accentColor: "#6B7280",
  },
  {
    id: "black",
    name: "Charcoal",
    image: "/australia_pastel_black.png",
    pinColor: "#1F2937",
    textColor: "#111827",
    accentColor: "#374151",
  },
];

/**
 * Convert geographic coordinates to image position using linear interpolation
 * within the calibrated bounds for each map color.
 * 
 * Each map has been calibrated with 4 extreme points that define its bounds.
 * We use simple linear interpolation within those bounds for predictable positioning.
 */
export function coordsToImagePosition(
  latitude: number,
  longitude: number,
  colorId: string = "blue"
): { x: number; y: number; isValid: boolean } {
  // Check if coordinates are roughly within Australia
  const isValid =
    latitude <= GEO_BOUNDS.north + 2 &&
    latitude >= GEO_BOUNDS.south - 2 &&
    longitude >= GEO_BOUNDS.west - 2 &&
    longitude <= GEO_BOUNDS.east + 2;

  // Get calibration data for this color
  const colorData = mapCalibrationData[colorId];
  if (!colorData) {
    // Fallback to blue if color not found
    return coordsToImagePosition(latitude, longitude, "blue");
  }

  const { bounds } = colorData;
  
  // Linear interpolation using the calibrated bounds for this specific map
  // X: longitude maps from GEO_BOUNDS.west→east to bounds.left→right
  const lngRatio = (longitude - GEO_BOUNDS.west) / (GEO_BOUNDS.east - GEO_BOUNDS.west);
  const x = bounds.left + lngRatio * (bounds.right - bounds.left);
  
  // Y: latitude maps from GEO_BOUNDS.north→south to bounds.top→bottom
  const latRatio = (latitude - GEO_BOUNDS.north) / (GEO_BOUNDS.south - GEO_BOUNDS.north);
  const y = bounds.top + latRatio * (bounds.bottom - bounds.top);

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
export function getAustraliaMapColor(colorId: string): AustraliaMapColor {
  return australiaMapColors.find((c) => c.id === colorId) || australiaMapColors[0];
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
  steepPoint: { lat: -26.15, lng: 113.15, name: "Steep Point (West)" },
  capeByron: { lat: -28.64, lng: 153.64, name: "Cape Byron (East)" },
  capeYork: { lat: -10.68, lng: 142.53, name: "Cape York (North)" },
  
  // Major cities
  perth: { lat: -31.95, lng: 115.86, name: "Perth" },
  darwin: { lat: -12.46, lng: 130.85, name: "Darwin" },
  brisbane: { lat: -27.47, lng: 153.03, name: "Brisbane" },
  melbourne: { lat: -37.81, lng: 144.96, name: "Melbourne" },
  sydney: { lat: -33.87, lng: 151.21, name: "Sydney" },
  adelaide: { lat: -34.93, lng: 138.60, name: "Adelaide" },
  hobart: { lat: -42.88, lng: 147.33, name: "Hobart" },
  cairns: { lat: -16.92, lng: 145.78, name: "Cairns" },
  alice: { lat: -23.70, lng: 133.88, name: "Alice Springs" },
  canberra: { lat: -35.28, lng: 149.13, name: "Canberra" },
  goldCoast: { lat: -28.02, lng: 153.40, name: "Gold Coast" },
  newcastle: { lat: -32.93, lng: 151.78, name: "Newcastle" },
};