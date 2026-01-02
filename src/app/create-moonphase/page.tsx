// src/app/create-moonphase/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrintSize, FrameOption, MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { priceConfig, calculateTotal } from "@/lib/pricing";
import MoonPhasePrintPreview from "@/components/create-moonphase/MoonPhasePrintPreview";
import MoonPhaseMiniPreview from "@/components/create-moonphase/MoonPhaseMiniPreview";
import MoonPhaseDatePicker from "@/components/create-moonphase/MoonPhaseDatePicker";
import MoonPhaseStyleSelector from "@/components/create-moonphase/MoonPhaseStyleSelector";
import MoonPhaseDisplayOptions from "@/components/create-moonphase/MoonPhaseDisplayOptions";
import MoonPhaseTextEditor from "@/components/create-moonphase/MoonPhaseTextEditor";
import MoonPhaseProductOptions from "@/components/create-moonphase/MoonPhaseProductOptions";
import MoonPhaseOrderSummary from "@/components/create-moonphase/MoonPhaseOrderSummary";

export default function CreateMoonPhasePage() {
  // Customization state
  const [customization, setCustomization] = useState<MoonPhaseCustomization>({
    title: "Under This Moon",
    subtitle: "",
    dateText: "",
    date: new Date(),
    styleId: "midnight",
    showStars: true,
    showPhaseLabel: true,
  });

  // Product selection state
  const [product, setProduct] = useState<MoonPhaseProductSelection>({
    size: "A3",
    frame: priceConfig.frames[0],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showMiniPreview, setShowMiniPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Update dateText when date changes (if empty)
  useEffect(() => {
    if (!customization.dateText) {
      const formatted = customization.date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCustomization((prev) => ({ ...prev, dateText: formatted }));
    }
  }, [customization.date, customization.dateText]);

  // Track scroll position to show/hide mini preview on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!previewRef.current) return;

      const previewRect = previewRef.current.getBoundingClientRect();
      const previewCenter = previewRect.top + previewRect.height / 2;

      // Show mini preview when main preview center is above viewport
      setShowMiniPreview(previewCenter < -50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to center the preview in viewport
  const scrollToPreview = () => {
    if (!previewRef.current) return;

    const previewRect = previewRef.current.getBoundingClientRect();
    const previewHeight = previewRect.height;
    const viewportHeight = window.innerHeight;
    const previewTop = previewRect.top + window.scrollY;

    // Calculate scroll position to center the preview
    const scrollTarget = previewTop - viewportHeight / 2 + previewHeight / 2;

    window.scrollTo({
      top: Math.max(0, scrollTarget),
      behavior: "smooth",
    });
  };

  // Handlers
  const handleDateChange = useCallback((date: Date) => {
    // Also update the dateText when date changes
    const formatted = date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCustomization((prev) => ({ ...prev, date, dateText: formatted }));
  }, []);

  const handleStyleChange = useCallback((styleId: string) => {
    setCustomization((prev) => ({ ...prev, styleId }));
  }, []);

  const handleToggleStars = useCallback(() => {
    setCustomization((prev) => ({ ...prev, showStars: !prev.showStars }));
  }, []);

  const handleTogglePhaseLabel = useCallback(() => {
    setCustomization((prev) => ({ ...prev, showPhaseLabel: !prev.showPhaseLabel }));
  }, []);

  const handleTitleChange = useCallback((title: string) => {
    setCustomization((prev) => ({ ...prev, title }));
  }, []);

  const handleSubtitleChange = useCallback((subtitle: string) => {
    setCustomization((prev) => ({ ...prev, subtitle }));
  }, []);

  const handleDateTextChange = useCallback((dateText: string) => {
    setCustomization((prev) => ({ ...prev, dateText }));
  }, []);

  const handleSizeChange = useCallback((size: PrintSize) => {
    setProduct((prev) => ({ ...prev, size }));
  }, []);

  const handleFrameChange = useCallback((frame: FrameOption) => {
    setProduct((prev) => ({ ...prev, frame }));
  }, []);

  // Checkout handler
  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const total = calculateTotal(product.size, product.frame);

      const response = await fetch("/api/checkout-moonphase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customization: {
            ...customization,
            date: customization.date.toISOString(),
          },
          product,
          totalPrice: total,
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
      {/* Mobile Sticky Mini Preview */}
      <AnimatePresence>
        {showMiniPreview && (
          <MoonPhaseMiniPreview
            customization={customization}
            product={product}
            onTap={scrollToPreview}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal">
            Create Your Moon Phase Print
          </h1>
          <p className="mt-3 text-brand-600 max-w-xl mx-auto">
            Capture the exact moon phase from any date. Perfect for birthdays,
            anniversaries, or that unforgettable night.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Preview */}
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-28"
          >
            <MoonPhasePrintPreview customization={customization} product={product} />
          </motion.div>

          {/* Right Column - Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Date Selection */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                1. Choose Your Date
              </h2>
              <MoonPhaseDatePicker
                date={customization.date}
                onDateChange={handleDateChange}
              />
            </div>

            {/* Style Selection */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                2. Choose Your Style
              </h2>
              <div className="space-y-6">
                <MoonPhaseStyleSelector
                  selectedStyleId={customization.styleId}
                  onStyleChange={handleStyleChange}
                />
                <MoonPhaseDisplayOptions
                  showStars={customization.showStars}
                  showPhaseLabel={customization.showPhaseLabel}
                  onToggleStars={handleToggleStars}
                  onTogglePhaseLabel={handleTogglePhaseLabel}
                />
              </div>
            </div>

            {/* Text Customization */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                3. Personalise Your Text
              </h2>
              <MoonPhaseTextEditor
                title={customization.title}
                subtitle={customization.subtitle}
                dateText={customization.dateText}
                onTitleChange={handleTitleChange}
                onSubtitleChange={handleSubtitleChange}
                onDateTextChange={handleDateTextChange}
              />
            </div>

            {/* Product Options */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                4. Select Size & Frame
              </h2>
              <MoonPhaseProductOptions
                selectedSize={product.size}
                selectedFrame={product.frame}
                onSizeChange={handleSizeChange}
                onFrameChange={handleFrameChange}
              />
            </div>

            {/* Order Summary */}
            <MoonPhaseOrderSummary
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
