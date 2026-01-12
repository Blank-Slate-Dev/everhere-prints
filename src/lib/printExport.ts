// src/lib/printExport.ts
// High-resolution print export configuration and utilities

/**
 * Print sizes in millimeters (ISO A-series)
 */
export const PRINT_SIZES = {
  A4: { width: 210, height: 297, name: "A4" },
  A3: { width: 297, height: 420, name: "A3" },
  A2: { width: 420, height: 594, name: "A2" },
} as const;

export type PrintSizeKey = keyof typeof PRINT_SIZES;

/**
 * DPI settings for different quality levels
 */
export const DPI_SETTINGS = {
  preview: 72,      // Screen preview
  standard: 150,    // Good quality print
  high: 300,        // Professional print quality
  ultra: 450,       // Maximum quality (large file size)
} as const;

export type DPILevel = keyof typeof DPI_SETTINGS;

/**
 * Convert millimeters to inches
 */
export function mmToInches(mm: number): number {
  return mm / 25.4;
}

/**
 * Convert millimeters to pixels at a given DPI
 */
export function mmToPixels(mm: number, dpi: number): number {
  return Math.round(mmToInches(mm) * dpi);
}

/**
 * Get pixel dimensions for a print size at a given DPI
 */
export function getPrintPixelDimensions(
  size: PrintSizeKey,
  dpi: number = DPI_SETTINGS.high
): { width: number; height: number; dpi: number; sizeName: string } {
  const printSize = PRINT_SIZES[size];
  return {
    width: mmToPixels(printSize.width, dpi),
    height: mmToPixels(printSize.height, dpi),
    dpi,
    sizeName: printSize.name,
  };
}

/**
 * All print dimension presets at 300 DPI
 */
export const PRINT_DIMENSIONS = {
  A4: getPrintPixelDimensions("A4", 300),  // 2480 × 3508
  A3: getPrintPixelDimensions("A3", 300),  // 3508 × 4961
  A2: getPrintPixelDimensions("A2", 300),  // 4961 × 7016
} as const;

/**
 * Estimate file size for a given resolution (rough estimate)
 * Assumes ~3 bytes per pixel for PNG with moderate compression
 */
export function estimateFileSize(width: number, height: number): string {
  const bytes = width * height * 3 * 0.5; // 50% compression estimate
  if (bytes > 1024 * 1024) {
    return `~${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `~${(bytes / 1024).toFixed(0)} KB`;
}

/**
 * Print export request payload
 */
export interface PrintExportRequest {
  svgContent: string;
  size: PrintSizeKey;
  dpiLevel?: DPILevel;
  format?: "png" | "pdf";
  filename?: string;
}

/**
 * Print export response
 */
export interface PrintExportResponse {
  success: boolean;
  url?: string;
  filename?: string;
  dimensions?: {
    width: number;
    height: number;
    dpi: number;
  };
  fileSize?: string;
  error?: string;
}

/**
 * Generate export filename
 */
export function generateExportFilename(
  productType: string,
  size: PrintSizeKey,
  format: "png" | "pdf" = "png"
): string {
  const timestamp = Date.now();
  const sanitizedProduct = productType.toLowerCase().replace(/\s+/g, "-");
  return `everhere-${sanitizedProduct}-${size}-${timestamp}.${format}`;
}
