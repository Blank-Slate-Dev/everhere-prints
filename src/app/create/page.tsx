// src/app/create/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapLocation, MapStyle, PrintSize, FrameOption, PrintCustomization, ProductSelection } from "@/types";
import { priceConfig } from "@/lib/pricing";
import LocationSearch from "@/components/create/LocationSearch";
import PrintPreview from "@/components/create/PrintPreview";
import StyleSelector from "@/components/create/StyleSelector";
import ZoomSelector from "@/components/create/ZoomSelector";
import TextEditor from "@/components/create/TextEditor";
import ProductOptions from "@/components/create/ProductOptions";
import OrderSummary from "@/components/create/OrderSummary";
import MiniPreview from "@/components/create/MiniPreview";

export default function CreatePage() {
  // Customization state
  const [customization, setCustomization] = useState<PrintCustomization>({
    title: "Where We Met",
    subtitle: "",
    date: "",
    location: null,
    style: "minimal",
    zoom: 12,
  });

  // Product selection state
  const [product, setProduct] = useState<ProductSelection>({
    size: "A3",
    frame: priceConfig.frames[0],
  });

  const [showMiniPreview, setShowMiniPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

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
    const scrollTarget = previewTop - (viewportHeight / 2) + (previewHeight / 2);
    
    window.scrollTo({
      top: Math.max(0, scrollTarget),
      behavior: "smooth",
    });
  };

  // Handlers
  const handleLocationSelect = useCallback((location: MapLocation) => {
    setCustomization((prev) => ({ ...prev, location }));
  }, []);

  const handleStyleChange = useCallback((style: MapStyle) => {
    setCustomization((prev) => ({ ...prev, style }));
  }, []);

  const handleZoomChange = useCallback((zoom: number) => {
    setCustomization((prev) => ({ ...prev, zoom }));
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

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream">
      {/* Mobile Sticky Mini Preview */}
      <AnimatePresence>
        {showMiniPreview && (
          <MiniPreview
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
            ref={previewRef}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-28"
          >
            <PrintPreview customization={customization} product={product} />
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

            {/* Map Style & Zoom */}
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                2. Choose Your Style
              </h2>
              <div className="space-y-6">
                <StyleSelector
                  selectedStyle={customization.style}
                  onStyleChange={handleStyleChange}
                />
                <ZoomSelector
                  selectedZoom={customization.zoom}
                  onZoomChange={handleZoomChange}
                />
              </div>
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

            {/* Order Summary - pass previewRef for image capture */}
            <OrderSummary
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
