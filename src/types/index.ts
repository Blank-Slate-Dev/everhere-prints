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

export type ProductType = "map" | "australia" | "newzealand" | "starmap" | "moonphase" | "soundwave";

// Star Map Print Types
export interface StarMapCustomization {
  title: string;
  subtitle: string;
  dateText: string;
  date: Date;
  time: string; // HH:MM format
  location: MapLocation | null;
  styleId: string;
  showConstellations: boolean;
  showConstellationNames: boolean;
  showGrid: boolean;
  showMilkyWay: boolean;
  showCardinals: boolean;
}

export interface StarMapProductSelection {
  size: PrintSize;
  frame: FrameOption;
}

export interface StarMapOrderData {
  customization: StarMapCustomization;
  product: StarMapProductSelection;
  totalPrice: number;
}

// Moon Phase Print Types
export interface MoonPhaseCustomization {
  title: string;
  subtitle: string;
  dateText: string;
  date: Date;
  styleId: string;
  showStars: boolean;
  showPhaseLabel: boolean;
}

export interface MoonPhaseProductSelection {
  size: PrintSize;
  frame: FrameOption;
}

export interface MoonPhaseOrderData {
  customization: MoonPhaseCustomization;
  product: MoonPhaseProductSelection;
  totalPrice: number;
}

// Sound Wave Print Types
export interface SoundWaveCustomization {
  title: string;
  subtitle: string;
  dateText: string;
  styleId: string;
  waveformData: number[]; // Full song waveform (normalized 0-1)
  audioDuration: number; // Duration in seconds
  audioFileName: string;
  // Song metadata (from music search)
  songData: SongMetadata | null;
  // Display toggles
  showAlbumArt: boolean;
  showArtistName: boolean;
  showAlbumName: boolean;
  showDuration: boolean;
  showLyrics: boolean;
  // Playhead position (0-1) - determines which section of waveform to show and which lyrics
  waveformPosition: number;
  // Lyrics
  fullLyrics: string | null;
  selectedLyrics: string[]; // Array of selected lyric lines (up to 4)
}

export interface SongMetadata {
  trackId: string;
  songName: string;
  artistName: string;
  albumName: string;
  albumArtUrl: string | null;
  durationMs: number;
  trackUrl: string;
  previewUrl: string | null;
  geniusId?: number; // For fetching lyrics
}

export interface SoundWaveProductSelection {
  size: PrintSize;
  frame: FrameOption;
}

export interface SoundWaveOrderData {
  customization: SoundWaveCustomization;
  product: SoundWaveProductSelection;
  totalPrice: number;
}
