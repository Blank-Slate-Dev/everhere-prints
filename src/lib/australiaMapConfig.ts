// src/lib/australiaMapConfig.ts

export interface AustraliaMapColor {
  id: string;
  name: string;
  image: string;
  pinColor: string;
  textColor: string;
  accentColor: string;
  // Where Australia sits within this specific image (percentage values 0-100)
  bounds: ImageBounds;
}

interface ImageBounds {
  // Where the Australia outline starts/ends within the image (as percentages)
  left: number;   // Western edge of Australia (Steep Point)
  right: number;  // Eastern edge of Australia (Cape Byron)
  top: number;    // Northern edge (Cape York)
  bottom: number; // Southern edge (includes Tasmania)
}

// Australia's actual geographic coordinates (extended for Tasmania)
const GEO_BOUNDS = {
  west: 113.15,   // Westernmost point (Steep Point, WA)
  east: 153.64,   // Easternmost point (Cape Byron, NSW)
  north: -10.68,  // Northernmost point (Cape York, QLD)
  south: -43.64,  // Southernmost point (South East Cape, Tasmania)
};

// Y offset correction - shifts pins up/down to compensate for image positioning
const Y_OFFSET = 0; // Adjust this based on calibration

// CALIBRATED bounds for each map image
// These values should be updated using the calibration tool at /calibrate
const imageBounds: Record<string, ImageBounds> = {
  blue: { left: 5, right: 93, top: 11, bottom: 80 },
  green: { left: 4, right: 95, top: 8, bottom: 81 },
  pink: { left: 4, right: 95, top: 10, bottom: 81 },
  purple: { left: 5, right: 92, top: 12, bottom: 81 },
  orange: { left: 6, right: 92, top: 11, bottom: 80 },
  yellow: { left: 7, right: 92, top: 11, bottom: 79 },
  red: { left: 7, right: 92, top: 12, bottom: 80 },
  brown: { left: 5, right: 96, top: 12, bottom: 81 },
  cream: { left: 9, right: 88, top: 13, bottom: 75 },
  white: { left: 7, right: 92, top: 13, bottom: 78 },
  grey: { left: 6, right: 94, top: 13, bottom: 80 },
  black: { left: 8, right: 92, top: 12, bottom: 77 },
};

// Default bounds if a map isn't specifically calibrated
const defaultBounds: ImageBounds = { left: 6, right: 92, top: 12, bottom: 80 };

export const australiaMapColors: AustraliaMapColor[] = [
  {
    id: "blue",
    name: "Ocean Blue",
    image: "/australia_pastel_blue.png",
    pinColor: "#0369A1",
    textColor: "#075985",
    accentColor: "#0EA5E9",
    bounds: imageBounds.blue,
  },
  {
    id: "green",
    name: "Eucalyptus",
    image: "/australia_pastel_green.png",
    pinColor: "#047857",
    textColor: "#065F46",
    accentColor: "#10B981",
    bounds: imageBounds.green,
  },
  {
    id: "pink",
    name: "Blush Pink",
    image: "/australia_pastel_pink.png",
    pinColor: "#BE185D",
    textColor: "#9D174D",
    accentColor: "#EC4899",
    bounds: imageBounds.pink,
  },
  {
    id: "purple",
    name: "Lavender",
    image: "/australia_pastel_purple.png",
    pinColor: "#7C3AED",
    textColor: "#5B21B6",
    accentColor: "#8B5CF6",
    bounds: imageBounds.purple,
  },
  {
    id: "orange",
    name: "Sunset",
    image: "/australia_pastel_orange.png",
    pinColor: "#EA580C",
    textColor: "#9A3412",
    accentColor: "#F97316",
    bounds: imageBounds.orange,
  },
  {
    id: "yellow",
    name: "Sunshine",
    image: "/australia_pastel_yellow.png",
    pinColor: "#CA8A04",
    textColor: "#854D0E",
    accentColor: "#EAB308",
    bounds: imageBounds.yellow,
  },
  {
    id: "red",
    name: "Coral Red",
    image: "/australia_pastel_red.png",
    pinColor: "#DC2626",
    textColor: "#991B1B",
    accentColor: "#EF4444",
    bounds: imageBounds.red,
  },
  {
    id: "brown",
    name: "Earthy Brown",
    image: "/australia_pastel_brown.png",
    pinColor: "#92400E",
    textColor: "#78350F",
    accentColor: "#B45309",
    bounds: imageBounds.brown,
  },
  {
    id: "cream",
    name: "Vanilla",
    image: "/australia_pastel_cream.png",
    pinColor: "#A16207",
    textColor: "#854D0E",
    accentColor: "#CA8A04",
    bounds: imageBounds.cream,
  },
  {
    id: "white",
    name: "Pearl White",
    image: "/australia_pastel_white.png",
    pinColor: "#57534E",
    textColor: "#44403C",
    accentColor: "#78716C",
    bounds: imageBounds.white,
  },
  {
    id: "grey",
    name: "Silver Mist",
    image: "/australia_pastel_grey.png",
    pinColor: "#4B5563",
    textColor: "#374151",
    accentColor: "#6B7280",
    bounds: imageBounds.grey,
  },
  {
    id: "black",
    name: "Charcoal",
    image: "/australia_pastel_black.png",
    pinColor: "#1F2937",
    textColor: "#111827",
    accentColor: "#374151",
    bounds: imageBounds.black,
  },
];

/**
 * Convert geographic coordinates to image position percentages
 * 
 * @param latitude - The latitude coordinate (negative for Southern hemisphere)
 * @param longitude - The longitude coordinate
 * @param colorId - The map color ID to use the correct image bounds
 * @returns { x: 0-100, y: 0-100 } representing percentage position on image
 */
export function coordsToImagePosition(
  latitude: number,
  longitude: number,
  colorId: string = "blue"
): { x: number; y: number; isValid: boolean } {
  // Get the bounds for this specific map image
  const colorConfig = australiaMapColors.find((c) => c.id === colorId);
  const bounds = colorConfig?.bounds || defaultBounds;

  // Check if coordinates are roughly within Australia (including Tasmania)
  const isValid =
    latitude <= GEO_BOUNDS.north + 2 &&
    latitude >= GEO_BOUNDS.south - 2 &&
    longitude >= GEO_BOUNDS.west - 2 &&
    longitude <= GEO_BOUNDS.east + 2;

  // Calculate relative position within Australia (0 to 1)
  const relativeX = (longitude - GEO_BOUNDS.west) / (GEO_BOUNDS.east - GEO_BOUNDS.west);
  const relativeY = (latitude - GEO_BOUNDS.north) / (GEO_BOUNDS.south - GEO_BOUNDS.north);

  // Map to the actual position within this specific image
  const imageWidth = bounds.right - bounds.left;
  const imageHeight = bounds.bottom - bounds.top;
  
  const x = bounds.left + (relativeX * imageWidth);
  const y = bounds.top + (relativeY * imageHeight) + Y_OFFSET;

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