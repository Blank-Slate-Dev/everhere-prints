// src/app/create-starmap/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapLocation,
  PrintSize,
  FrameOption,
  StarMapCustomization,
  StarMapProductSelection,
} from "@/types";
import { priceConfig } from "@/lib/pricing";
import StarMapPrintPreview from "@/components/create-starmap/StarMapPrintPreview";
import StarMapMiniPreview from "@/components/create-starmap/StarMapMiniPreview";
import StarMapDateTimePicker from "@/components/create-starmap/StarMapDateTimePicker";
import StarMapLocationSearch from "@/components/create-starmap/StarMapLocationSearch";
import StarMapStyleSelector from "@/components/create-starmap/StarMapStyleSelector";
import StarMapDisplayOptions from "@/components/create-starmap/StarMapDisplayOptions";
import StarMapTextEditor from "@/components/create-starmap/StarMapTextEditor";
import StarMapProductOptions from "@/components/create-starmap/StarMapProductOptions";
import StarMapOrderSummary from "@/components/create-starmap/StarMapOrderSummary";

export default function CreateStarMapPage() {
  // Customization state
  const [customization, setCustomization] = useState<StarMapCustomization>({
    title: "The Night We Met",
    subtitle: "",
    dateText: "",
    date: new Date(),
    time: "21:00",
    location: null,
    styleId: "midnight",
    showConstellations: true,
    showConstellationNames: false,
    showGrid: false,
    showMilkyWay: true,
    showCardinals: true,
  });

  // Product selection state
  const [product, setProduct] = useState<StarMapProductSelection>({
    size: "A3",
    frame: priceConfig.frames[0],
  });

  const [showMiniPreview, setShowMiniPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Update dateText when date changes
  useEffect(() => {
    if (!customization.dateText) {
      const formatted = customization.date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCustomization((prev) => ({ ...prev, dateText: formatted }));
    }
  }, []);

  // Track scroll position to show/hide mini preview on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!previewRef.current) return;

      const previewRect = previewRef.current.getBoundingClientRect();
      const previewBottom = previewRect.bottom;
      setShowMiniPreview(previewBottom < 96);
    };

    handleScroll();

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

    const scrollTarget = previewTop - viewportHeight / 2 + previewHeight / 2;

    window.scrollTo({
      top: Math.max(0, scrollTarget),
      behavior: "smooth",
    });
  };

  // Handlers
  const handleLocationSelect = useCallback((location: MapLocation) => {
    setCustomization((prev) => ({ ...prev, location }));
  }, []);

  const handleDateChange = useCallback((date: Date) => {
    const formatted = date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCustomization((prev) => ({ ...prev, date, dateText: formatted }));
  }, []);

  const handleTimeChange = useCallback((time: string) => {
    setCustomization((prev) => ({ ...prev, time }));
  }, []);

  const handleStyleChange = useCallback((styleId: string) => {
    setCustomization((prev) => ({ ...prev, styleId }));
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

  const handleToggleConstellations = useCallback((value: boolean) => {
    setCustomization((prev) => ({ ...prev, showConstellations: value }));
  }, []);

  const handleToggleConstellationNames = useCallback((value: boolean) => {
    setCustomization((prev) => ({ ...prev, showConstellationNames: value }));
  }, []);

  const handleToggleGrid = useCallback((value: boolean) => {
    setCustomization((prev) => ({ ...prev, showGrid: value }));
  }, []);

  const handleToggleMilkyWay = useCallback((value: boolean) => {
    setCustomization((prev) => ({ ...prev, showMilkyWay: value }));
  }, []);

  const handleToggleCardinals = useCallback((value: boolean) => {
    setCustomization((prev) => ({ ...prev, showCardinals: value }));
  }, []);

  const handleSizeChange = useCallback((size: PrintSize) => {
    setProduct((prev) => ({ ...prev, size }));
  }, []);

  const handleFrameChange = useCallback((frame: FrameOption) => {
    setProduct((prev) => ({ ...prev, frame }));
  }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream">
      {/* Mobile Sticky Mini Preview */}
      <AnimatePresence>
        {showMiniPreview && (
          <StarMapMiniPreview
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
            Create Your Star Map
          </h1>
          <p className="mt-3 text-brand-600 max-w-xl mx-auto">
            Capture the night sky exactly as it appeared on your special moment.
            Perfect for anniversaries, births, and unforgettable nights.
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
            <StarMapPrintPreview customization={customization} product={product} />
          </motion.div>

          {/* Right Column - Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Location Search - First so users see their stars quickly */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                1. Find Your Location
              </h2>
              <StarMapLocationSearch onLocationSelect={handleLocationSelect} />
            </div>

            {/* Date & Time Selection */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                2. Choose Your Date & Time
              </h2>
              <StarMapDateTimePicker
                date={customization.date}
                time={customization.time}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
              />
            </div>

            {/* Style Selection */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                3. Choose Your Style
              </h2>
              <div className="space-y-6">
                <StarMapStyleSelector
                  selectedStyleId={customization.styleId}
                  onStyleChange={handleStyleChange}
                />
                <StarMapDisplayOptions
                  showConstellations={customization.showConstellations}
                  showConstellationNames={customization.showConstellationNames}
                  showGrid={customization.showGrid}
                  showMilkyWay={customization.showMilkyWay}
                  showCardinals={customization.showCardinals}
                  onToggleConstellations={handleToggleConstellations}
                  onToggleConstellationNames={handleToggleConstellationNames}
                  onToggleGrid={handleToggleGrid}
                  onToggleMilkyWay={handleToggleMilkyWay}
                  onToggleCardinals={handleToggleCardinals}
                />
              </div>
            </div>

            {/* Text Customization */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                4. Personalise Your Text
              </h2>
              <StarMapTextEditor
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
                5. Select Size & Frame
              </h2>
              <StarMapProductOptions
                selectedSize={product.size}
                selectedFrame={product.frame}
                onSizeChange={handleSizeChange}
                onFrameChange={handleFrameChange}
              />
            </div>

            {/* Order Summary - pass previewRef for image capture */}
            <StarMapOrderSummary
              customization={customization}
              product={product}
              previewRef={previewRef}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
