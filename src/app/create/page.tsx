"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MapLocation, MapStyle, PrintSize, FrameOption, PrintCustomization, ProductSelection } from "@/types";
import { priceConfig, calculateTotal } from "@/lib/pricing";
import LocationSearch from "@/components/create/LocationSearch";
import PrintPreview from "@/components/create/PrintPreview";
import StyleSelector from "@/components/create/StyleSelector";
import TextEditor from "@/components/create/TextEditor";
import ProductOptions from "@/components/create/ProductOptions";
import OrderSummary from "@/components/create/OrderSummary";

export default function CreatePage() {
  // Customization state
  const [customization, setCustomization] = useState<PrintCustomization>({
    title: "Where We Met",
    subtitle: "",
    date: "",
    location: null,
    style: "minimal",
  });

  // Product selection state
  const [product, setProduct] = useState<ProductSelection>({
    size: "A3",
    frame: priceConfig.frames[0],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleLocationSelect = useCallback((location: MapLocation) => {
    setCustomization((prev) => ({ ...prev, location }));
  }, []);

  const handleStyleChange = useCallback((style: MapStyle) => {
    setCustomization((prev) => ({ ...prev, style }));
  }, []);

  const handleTitleChange = useCallback((title: string) => {
    setCustomization((prev) => ({ ...prev, title }));
  }, []);

  const handleSubtitleChange = useCallback((subtitle: string) => {
    setCustomization((prev) => ({ ...prev, subtitle }));
  }, []);

  const handleDateChange = useCallback((date: string) => {
    setCustomization((prev) => ({ ...prev, date }));
  }, []);

  const handleSizeChange = useCallback((size: PrintSize) => {
    setProduct((prev) => ({ ...prev, size }));
  }, []);

  const handleFrameChange = useCallback((frame: FrameOption) => {
    setProduct((prev) => ({ ...prev, frame }));
  }, []);

  const handleCheckout = async () => {
    if (!customization.location) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customization,
          product,
          totalPrice: calculateTotal(product.size, product.frame),
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error("Checkout error:", error);
        alert("Something went wrong. Please try again.");
        setIsLoading(false);
        return;
      }

      if (url) {
        window.location.href = url;
      } else {
        console.error("No checkout URL returned");
        alert("Something went wrong. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal">
            Create Your Map Print
          </h1>
          <p className="mt-3 text-brand-600 max-w-xl mx-auto">
            Search for your special location, personalise your print, and order
            in minutes.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-28"
          >
            <PrintPreview customization={customization} />
          </motion.div>

          {/* Right Column - Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Location Search */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                1. Find Your Location
              </h2>
              <LocationSearch onLocationSelect={handleLocationSelect} />
            </div>

            {/* Map Style */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                2. Choose Your Style
              </h2>
              <StyleSelector
                selectedStyle={customization.style}
                onStyleChange={handleStyleChange}
              />
            </div>

            {/* Text Customization */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                3. Personalise Your Text
              </h2>
              <TextEditor
                title={customization.title}
                subtitle={customization.subtitle}
                date={customization.date}
                onTitleChange={handleTitleChange}
                onSubtitleChange={handleSubtitleChange}
                onDateChange={handleDateChange}
              />
            </div>

            {/* Product Options */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                4. Select Size & Frame
              </h2>
              <ProductOptions
                selectedSize={product.size}
                selectedFrame={product.frame}
                onSizeChange={handleSizeChange}
                onFrameChange={handleFrameChange}
              />
            </div>

            {/* Order Summary */}
            <OrderSummary
              customization={customization}
              product={product}
              onCheckout={handleCheckout}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}