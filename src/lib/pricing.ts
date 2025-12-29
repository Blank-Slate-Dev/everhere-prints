// src/lib/pricing.ts
import { PriceConfig, PrintSize, FrameOption } from "@/types";

export const priceConfig: PriceConfig = {
  sizes: {
    A4: {
      name: "A4",
      dimensions: "21 × 29.7 cm",
      price: 3900, // £39.00 in pence
    },
    A3: {
      name: "A3",
      dimensions: "29.7 × 42 cm",
      price: 5900, // £59.00 in pence
    },
    A2: {
      name: "A2",
      dimensions: "42 × 59.4 cm",
      price: 7900, // £79.00 in pence
    },
  },
  frames: [
    { id: "none", name: "No Frame", price: 0 },
    { id: "black", name: "Black Frame", price: 2500 }, // £25.00
    { id: "white", name: "White Frame", price: 2500 }, // £25.00
    { id: "oak", name: "Oak Frame", price: 3500 }, // £35.00
  ],
};

export function calculateTotal(size: PrintSize, frame: FrameOption): number {
  const sizePrice = priceConfig.sizes[size].price;
  const framePrice = frame.price;
  return sizePrice + framePrice;
}

export function formatPrice(priceInPence: number): string {
  return `£${(priceInPence / 100).toFixed(2)}`;
}

export function getSizeDetails(size: PrintSize) {
  return priceConfig.sizes[size];
}