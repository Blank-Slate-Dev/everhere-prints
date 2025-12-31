// src/types/index.ts
export interface MapLocation {
  longitude: number;
  latitude: number;
  placeName: string;
}

export type MapStyle = "minimal" | "night" | "satellite";

export interface PrintCustomization {
  title: string;
  subtitle: string;
  date: string;
  location: MapLocation | null;
  style: MapStyle;
  zoom: number;
}

export type PrintSize = "A4" | "A3" | "A2";

export interface FrameOption {
  id: "none" | "black" | "white" | "oak";
  name: string;
  price: number;
}

export interface ProductSelection {
  size: PrintSize;
  frame: FrameOption;
}

export interface OrderData {
  customization: PrintCustomization;
  product: ProductSelection;
  totalPrice: number;
}

export interface PriceConfig {
  sizes: Record<PrintSize, { name: string; dimensions: string; price: number }>;
  frames: FrameOption[];
}

// Australia Map Print Types
export interface AustraliaMapCustomization {
  title: string;
  subtitle: string;
  date: string;
  location: MapLocation | null;
  colorId: string;
}

export interface AustraliaProductSelection {
  size: PrintSize;
  frame: FrameOption;
}

export interface AustraliaOrderData {
  customization: AustraliaMapCustomization;
  product: AustraliaProductSelection;
  totalPrice: number;
}

// New Zealand Map Print Types
export interface NewZealandMapCustomization {
  title: string;
  subtitle: string;
  date: string;
  location: MapLocation | null;
  colorId: string;
}

export interface NewZealandProductSelection {
  size: PrintSize;
  frame: FrameOption;
}

export interface NewZealandOrderData {
  customization: NewZealandMapCustomization;
  product: NewZealandProductSelection;
  totalPrice: number;
}

export type ProductType = "map" | "australia" | "newzealand";