// src/components/create-australia/AustraliaOrderSummary.tsx
"use client";

import { motion } from "framer-motion";
import { AustraliaMapCustomization, AustraliaProductSelection } from "@/types";
import { calculateTotal, formatPrice, getSizeDetails } from "@/lib/pricing";
import { getAustraliaMapColor } from "@/lib/australiaMapConfig";
import Button from "@/components/ui/Button";
import { Lock, Truck } from "lucide-react";

interface AustraliaOrderSummaryProps {
  customization: AustraliaMapCustomization;
  product: AustraliaProductSelection;
  onCheckout: () => void;
  isLoading: boolean;
}

export default function AustraliaOrderSummary({
  customization,
  product,
  onCheckout,
  isLoading,
}: AustraliaOrderSummaryProps) {
  const sizeDetails = getSizeDetails(product.size);
  const colorConfig = getAustraliaMapColor(customization.colorId);
  const total = calculateTotal(product.size, product.frame);
  const isComplete = customization.location !== null;

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
            Australia Map - {colorConfig.name}
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
          <span className="text-brand-600">Australian Delivery</span>
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
        onClick={onCheckout}
        disabled={!isComplete}
        isLoading={isLoading}
        className="mt-2"
      >
        {isComplete ? "Proceed to Checkout" : "Select a Location First"}
      </Button>

      {/* Trust Indicators */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-brand-500">
        <span className="flex items-center gap-1">
          <Lock size={12} />
          Secure Checkout
        </span>
        <span className="flex items-center gap-1">
          <Truck size={12} />
          5-7 Day Delivery
        </span>
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