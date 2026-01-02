// src/components/create-moonphase/MoonPhaseOrderSummary.tsx
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { calculateTotal, formatPrice, getSizeDetails } from "@/lib/pricing";
import { getMoonPhaseStyle } from "@/lib/moonPhaseConfig";
import { calculateMoonPhase } from "@/lib/moonPhaseCalculations";
import Button from "@/components/ui/Button";
import { Lock, Truck, Moon } from "lucide-react";

interface MoonPhaseOrderSummaryProps {
  customization: MoonPhaseCustomization;
  product: MoonPhaseProductSelection;
  onCheckout: () => void;
  isLoading: boolean;
}

export default function MoonPhaseOrderSummary({
  customization,
  product,
  onCheckout,
  isLoading,
}: MoonPhaseOrderSummaryProps) {
  const sizeDetails = getSizeDetails(product.size);
  const styleConfig = getMoonPhaseStyle(customization.styleId);
  const total = calculateTotal(product.size, product.frame);

  const moonData = useMemo(
    () => calculateMoonPhase(customization.date),
    [customization.date]
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Moon phase print is always complete (just needs a date which has a default)
  const isComplete = true;

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
          <span className="text-brand-600 flex items-center gap-1.5">
            <Moon size={14} />
            Moon Phase - {styleConfig.name}
          </span>
        </div>

        <div className="text-xs text-brand-500 -mt-1 ml-5">
          {moonData.phaseName} • {formatDate(customization.date)}
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
        {isComplete ? "Proceed to Checkout" : "Complete Your Design"}
      </Button>

      {/* Trust Signals */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-brand-500">
        <span className="flex items-center gap-1">
          <Lock size={12} />
          Secure Checkout
        </span>
        <span className="flex items-center gap-1">
          <Truck size={12} />
          Free Shipping
        </span>
      </div>

      {/* Moon Phase Meaning */}
      <div className="mt-4 p-3 bg-brand-50 rounded-lg">
        <p className="text-xs text-brand-600 text-center">
          <span className="font-medium">{moonData.phaseName}</span>
          {" · "}
          {moonData.illumination.toFixed(0)}% illuminated
        </p>
      </div>
    </motion.div>
  );
}
