// src/lib/mapStyles.ts
import { MapStyle } from "@/types";

interface MapStyleConfig {
  id: MapStyle;
  name: string;
  description: string;
  url: string;
  previewColor: string;
}

export const mapStyles: MapStyleConfig[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, light aesthetic",
    url: "mapbox://styles/mapbox/light-v11",
    previewColor: "#f5f0ed",
  },
  {
    id: "night",
    name: "Night",
    description: "Elegant dark theme",
    url: "mapbox://styles/mapbox/dark-v11",
    previewColor: "#1a1a1a",
  },
  {
    id: "satellite",
    name: "Satellite",
    description: "Real-world imagery",
    url: "mapbox://styles/mapbox/satellite-streets-v12",
    previewColor: "#2d4a3e",
  },
];

export function getMapStyle(styleId: MapStyle): MapStyleConfig {
  return mapStyles.find((s) => s.id === styleId) || mapStyles[0];
}

export function getMapStyleUrl(styleId: MapStyle): string {
  return getMapStyle(styleId).url;
}