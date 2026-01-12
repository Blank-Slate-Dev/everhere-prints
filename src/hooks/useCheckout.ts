// src/hooks/useCheckout.ts
// Hook for navigating to embedded checkout with order data

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface CheckoutData {
  productType: string;
  productName: string;
  productDescription: string;
  size: string;
  frame: string;
  frameName: string;
  subtotal: number; // in cents
  shipping: number; // in cents
  total: number; // in cents
  metadata: Record<string, string>;
  returnPath: string;
  previewImage?: string;
}

export function useCheckout() {
  const router = useRouter();

  const goToCheckout = useCallback((data: CheckoutData) => {
    // Store order data in sessionStorage
    sessionStorage.setItem("checkoutOrder", JSON.stringify(data));
    
    // Navigate to checkout page
    router.push("/checkout");
  }, [router]);

  return { goToCheckout };
}

/**
 * Example usage in OrderSummary component:
 * 
 * const { goToCheckout } = useCheckout();
 * 
 * const handleCheckout = () => {
 *   goToCheckout({
 *     productType: "sound_wave",
 *     productName: "EverHere Prints - Sound Wave Print",
 *     productDescription: "A3 Print with Black Frame | Midnight Style",
 *     size: "A3",
 *     frame: "black",
 *     frameName: "Black Frame",
 *     subtotal: 8900, // $89.00
 *     shipping: 0,
 *     total: 8900,
 *     metadata: {
 *       title: "Shake It Off",
 *       artist: "Taylor Swift",
 *       // ... other customization data
 *     },
 *     returnPath: "/create-soundwave",
 *   });
 * };
 */
