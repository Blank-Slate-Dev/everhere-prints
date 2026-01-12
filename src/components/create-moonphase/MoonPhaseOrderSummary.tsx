// src/components/create-moonphase/MoonPhaseOrderSummary.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { calculateTotal, formatPrice, getSizeDetails } from "@/lib/pricing";
import { getMoonPhaseStyle } from "@/lib/moonPhaseConfig";
import { calculateMoonPhase } from "@/lib/moonPhaseCalculations";
import Button from "@/components/ui/Button";
import { Lock, Truck, Moon, ShieldCheck } from "lucide-react";

interface MoonPhaseOrderSummaryProps {
  customization: MoonPhaseCustomization;
  product: MoonPhaseProductSelection;
}

export default function MoonPhaseOrderSummary({
  customization,
  product,
}: MoonPhaseOrderSummaryProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleCheckout = async () => {
    if (!isComplete) return;
    
    setIsLoading(true);

    try {
      // Build product description
      const descriptionParts = [
        `Moon Phase - ${styleConfig.name}`,
        `${moonData.phaseName}`,
        `${sizeDetails.name} Print (${sizeDetails.dimensions})`,
        product.frame.id !== "none" ? `with ${product.frame.name}` : "Print Only",
      ];

      // Build metadata for order
      const metadata: Record<string, string> = {
        product_type: "moon_phase",
        date: customization.date.toISOString(),
        formatted_date: formatDate(customization.date),
        style_id: customization.styleId,
        style_name: styleConfig.name,
        phase_name: moonData.phaseName,
        phase_illumination: moonData.illumination.toFixed(1),
        title: customization.title || "",
        subtitle: customization.subtitle || "",
        date_text: customization.dateText || "",
        show_stars: customization.showStars.toString(),
        show_phase_label: customization.showPhaseLabel.toString(),
        size: product.size,
        frame: product.frame.id,
      };

      // Store order data for checkout page
      const orderData = {
        productType: "moon_phase",
        productName: "EverHere Prints - Moon Phase",
        productDescription: descriptionParts.join(" | "),
        size: product.size,
        frame: product.frame.id,
        frameName: product.frame.name,
        subtotal: total,
        shipping: 0,
        total: total,
        metadata,
        returnPath: "/create-moonphase",
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
        onClick={handleCheckout}
        disabled={!isComplete || isLoading}
        isLoading={isLoading}
        className="mt-2"
      >
        <Lock size={18} className="mr-2" />
        Secure Checkout
      </Button>

      {/* Trust Signals */}
      <div className="mt-4 pt-4 border-t border-brand-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-brand-500">
          <Truck size={14} />
          <span>Free shipping on all Australian orders</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-brand-500">
          <ShieldCheck size={14} />
          <span>Secure payment powered by Stripe</span>
        </div>
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
