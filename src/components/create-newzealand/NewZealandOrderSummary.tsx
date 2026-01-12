// src/components/create-newzealand/NewZealandOrderSummary.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { NewZealandMapCustomization, NewZealandProductSelection } from "@/types";
import { calculateTotal, formatPrice, getSizeDetails } from "@/lib/pricing";
import { getNewZealandMapColor } from "@/lib/newzealandMapConfig";
import Button from "@/components/ui/Button";
import { Lock, Truck, ShieldCheck } from "lucide-react";

interface NewZealandOrderSummaryProps {
  customization: NewZealandMapCustomization;
  product: NewZealandProductSelection;
}

export default function NewZealandOrderSummary({
  customization,
  product,
}: NewZealandOrderSummaryProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const sizeDetails = getSizeDetails(product.size);
  const colorConfig = getNewZealandMapColor(customization.colorId);
  const total = calculateTotal(product.size, product.frame);
  const isComplete = customization.location !== null;

  const handleCheckout = async () => {
    if (!isComplete || !customization.location) return;
    
    setIsLoading(true);

    try {
      // Build product description
      const descriptionParts = [
        `New Zealand Map - ${colorConfig.name}`,
        `${sizeDetails.name} Print (${sizeDetails.dimensions})`,
        product.frame.id !== "none" ? `with ${product.frame.name}` : "Print Only",
      ];

      // Build metadata for order
      const metadata: Record<string, string> = {
        product_type: "newzealand_map",
        location_name: customization.location.placeName,
        latitude: customization.location.latitude.toString(),
        longitude: customization.location.longitude.toString(),
        color_id: customization.colorId,
        color_name: colorConfig.name,
        title: customization.title || "",
        subtitle: customization.subtitle || "",
        date: customization.date || "",
        size: product.size,
        frame: product.frame.id,
      };

      // Store order data for checkout page
      const orderData = {
        productType: "newzealand_map",
        productName: "EverHere Prints - New Zealand Map",
        productDescription: descriptionParts.join(" | "),
        size: product.size,
        frame: product.frame.id,
        frameName: product.frame.name,
        subtotal: total,
        shipping: 0,
        total: total,
        metadata,
        returnPath: "/create-newzealand",
      };

      // Store in sessionStorage and navigate
      sessionStorage.setItem("checkoutOrder", JSON.stringify(orderData));
      router.push("/checkout");
      
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-charcoal mb-4">Order Summary</h3>

      {/* Line Items */}
      <div className="space-y-3 pb-4 border-b border-brand-100">
        <div className="flex justify-between text-sm">
          <span className="text-brand-600">
            New Zealand Map - {colorConfig.name}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-brand-600">
            {sizeDetails.name} Print ({sizeDetails.dimensions})
          </span>
          <span className="font-medium text-charcoal">
            {formatPrice(sizeDetails.price)}
          </span>
        </div>

        {product.frame.price > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-brand-600">{product.frame.name}</span>
            <span className="font-medium text-charcoal">
              {formatPrice(product.frame.price)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-brand-600">Delivery to NZ & Australia</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-4">
        <span className="text-lg font-semibold text-charcoal">Total</span>
        <span className="text-2xl font-bold text-charcoal">
          {formatPrice(total)}
        </span>
      </div>

      {/* Checkout Button */}
      <Button
        fullWidth
        size="lg"
        onClick={handleCheckout}
        disabled={!isComplete || isLoading}
        isLoading={isLoading}
        className="mt-2"
      >
        {isComplete ? (
          <>
            <Lock size={18} className="mr-2" />
            Secure Checkout
          </>
        ) : (
          "Select a Location First"
        )}
      </Button>

      {/* Trust Indicators */}
      <div className="mt-4 pt-4 border-t border-brand-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-brand-500">
          <Truck size={14} />
          <span>Free shipping to NZ & Australia</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-brand-500">
          <ShieldCheck size={14} />
          <span>Secure payment powered by Stripe</span>
        </div>
      </div>

      {/* Location Warning */}
      {!isComplete && (
        <p className="mt-4 text-center text-sm text-brand-500">
          Please search for a location to complete your print.
        </p>
      )}
    </motion.div>
  );
}
