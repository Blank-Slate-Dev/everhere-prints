// src/lib/serverPricing.ts
// SECURITY: Server-side pricing calculations
// Never trust client-provided prices - always calculate on the server

import { PrintSize } from "@/types";
import { priceConfig } from "./pricing";

/**
 * Valid product types for pricing
 */
export type ProductType =
  | "map"
  | "star_map"
  | "moon_phase"
  | "soundwave"
  | "australia"
  | "newzealand";

/**
 * Product-specific base prices (in cents)
 * These are added to the size price
 */
const PRODUCT_BASE_PRICES: Record<ProductType, number> = {
  map: 0, // Uses size price directly
  star_map: 0, // Uses size price directly
  moon_phase: 0, // Uses size price directly
  soundwave: 0, // Uses size price directly
  australia: 0, // Uses size price directly
  newzealand: 0, // Uses size price directly
};

/**
 * Validate that a size is valid
 */
function isValidSize(size: string): size is PrintSize {
  return size in priceConfig.sizes;
}

/**
 * Validate that a frame ID is valid
 */
function isValidFrame(frameId: string): boolean {
  return priceConfig.frames.some((f) => f.id === frameId);
}

/**
 * Get frame price by ID
 */
function getFramePrice(frameId: string): number {
  const frame = priceConfig.frames.find((f) => f.id === frameId);
  if (!frame) {
    throw new Error(`Invalid frame ID: ${frameId}`);
  }
  return frame.price;
}

/**
 * Calculate the total price for any product
 * SECURITY: This is the only function that should determine prices
 */
export function calculateProductPrice(
  productType: ProductType,
  size: PrintSize,
  frameId: string
): number {
  // Validate inputs
  if (!isValidSize(size)) {
    throw new Error(`Invalid size: ${size}`);
  }

  if (!isValidFrame(frameId)) {
    throw new Error(`Invalid frame: ${frameId}`);
  }

  // Get base prices
  const sizePrice = priceConfig.sizes[size].price;
  const framePrice = getFramePrice(frameId);
  const productBasePrice = PRODUCT_BASE_PRICES[productType] || 0;

  // Calculate total
  const total = sizePrice + framePrice + productBasePrice;

  // SECURITY: Sanity check - prices should be reasonable
  if (total < 1000 || total > 100000) {
    // $10 - $1000 AUD range
    throw new Error(`Calculated price out of valid range: ${total}`);
  }

  return total;
}

/**
 * Validate a client-provided price matches server calculation
 * Useful for logging/monitoring price manipulation attempts
 */
export function validateClientPrice(
  clientPrice: number,
  productType: ProductType,
  size: PrintSize,
  frameId: string
): { valid: boolean; serverPrice: number; difference: number } {
  try {
    const serverPrice = calculateProductPrice(productType, size, frameId);
    const difference = Math.abs(clientPrice - serverPrice);
    const valid = difference === 0;

    if (!valid) {
      console.warn(
        `SECURITY: Price mismatch detected! Client: ${clientPrice}, Server: ${serverPrice}, Difference: ${difference}`
      );
    }

    return { valid, serverPrice, difference };
  } catch (error) {
    console.error("Price validation error:", error);
    return { valid: false, serverPrice: 0, difference: clientPrice };
  }
}
