// src/app/create-australia/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapLocation, PrintSize, FrameOption, AustraliaMapCustomization, AustraliaProductSelection } from "@/types";
import { priceConfig } from "@/lib/pricing";
import AustraliaLocationSearch from "@/components/create-australia/AustraliaLocationSearch";
import AustraliaPrintPreview from "@/components/create-australia/AustraliaPrintPreview";
import AustraliaMiniPreview from "@/components/create-australia/AustraliaMiniPreview";
import { AustraliaColorPreviewExpanded } from "@/components/create-australia/AustraliaColorSelector";
import AustraliaTextEditor from "@/components/create-australia/AustraliaTextEditor";
import AustraliaProductOptions from "@/components/create-australia/AustraliaProductOptions";
import AustraliaOrderSummary from "@/components/create-australia/AustraliaOrderSummary";

export default function CreateAustraliaPage() {
  const [customization, setCustomization] = useState<AustraliaMapCustomization>({
    title: "Our Special Place",
    subtitle: "",
    date: "",
    location: null,
    colorId: "blue",
  });

  const [product, setProduct] = useState<AustraliaProductSelection>({
    size: "A3",
    frame: priceConfig.frames[0],
  });

  const [showMiniPreview, setShowMiniPreview] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!previewContainerRef.current) return;
      const previewRect = previewContainerRef.current.getBoundingClientRect();
      const previewBottom = previewRect.bottom;
      setShowMiniPreview(previewBottom < 96);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPreview = () => {
    if (!previewContainerRef.current) return;
    const previewRect = previewContainerRef.current.getBoundingClientRect();
    const previewHeight = previewRect.height;
    const viewportHeight = window.innerHeight;
    const previewTop = previewRect.top + window.scrollY;
    const scrollTarget = previewTop - (viewportHeight / 2) + (previewHeight / 2);
    window.scrollTo({ top: Math.max(0, scrollTarget), behavior: "smooth" });
  };

  const handleLocationSelect = useCallback((location: MapLocation) => { setCustomization((prev) => ({ ...prev, location })); }, []);
  const handleColorChange = useCallback((colorId: string) => { setCustomization((prev) => ({ ...prev, colorId })); }, []);
  const handleTitleChange = useCallback((title: string) => { setCustomization((prev) => ({ ...prev, title })); }, []);
  const handleSubtitleChange = useCallback((subtitle: string) => { setCustomization((prev) => ({ ...prev, subtitle })); }, []);
  const handleDateChange = useCallback((date: string) => { setCustomization((prev) => ({ ...prev, date })); }, []);
  const handleSizeChange = useCallback((size: PrintSize) => { setProduct((prev) => ({ ...prev, size })); }, []);
  const handleFrameChange = useCallback((frame: FrameOption) => { setProduct((prev) => ({ ...prev, frame })); }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream">
      <AnimatePresence>
        {showMiniPreview && <AustraliaMiniPreview customization={customization} product={product} onTap={scrollToPreview} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal">Create Your Australia Map Print</h1>
          <p className="mt-3 text-brand-600 max-w-xl mx-auto">Mark your special place on a beautiful watercolour map of Australia. Perfect for anniversaries, weddings, and cherished memories.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div ref={previewContainerRef} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:sticky lg:top-28">
            <AustraliaPrintPreview customization={customization} product={product} captureRef={captureRef} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">1. Find Your Location</h2>
              <AustraliaLocationSearch onLocationSelect={handleLocationSelect} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">2. Choose Your Colour</h2>
              <AustraliaColorPreviewExpanded selectedColorId={customization.colorId} onColorChange={handleColorChange} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">3. Personalise Your Text</h2>
              <AustraliaTextEditor title={customization.title} subtitle={customization.subtitle} date={customization.date} onTitleChange={handleTitleChange} onSubtitleChange={handleSubtitleChange} onDateChange={handleDateChange} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">4. Select Size & Frame</h2>
              <AustraliaProductOptions selectedSize={product.size} selectedFrame={product.frame} onSizeChange={handleSizeChange} onFrameChange={handleFrameChange} />
            </div>

            <AustraliaOrderSummary customization={customization} product={product} previewRef={captureRef} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
