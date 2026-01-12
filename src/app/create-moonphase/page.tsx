// src/app/create-moonphase/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrintSize, FrameOption, MoonPhaseCustomization, MoonPhaseProductSelection } from "@/types";
import { priceConfig } from "@/lib/pricing";
import MoonPhasePrintPreview from "@/components/create-moonphase/MoonPhasePrintPreview";
import MoonPhaseMiniPreview from "@/components/create-moonphase/MoonPhaseMiniPreview";
import MoonPhaseDatePicker from "@/components/create-moonphase/MoonPhaseDatePicker";
import MoonPhaseStyleSelector from "@/components/create-moonphase/MoonPhaseStyleSelector";
import MoonPhaseDisplayOptions from "@/components/create-moonphase/MoonPhaseDisplayOptions";
import MoonPhaseTextEditor from "@/components/create-moonphase/MoonPhaseTextEditor";
import MoonPhaseProductOptions from "@/components/create-moonphase/MoonPhaseProductOptions";
import MoonPhaseOrderSummary from "@/components/create-moonphase/MoonPhaseOrderSummary";

export default function CreateMoonPhasePage() {
  const [customization, setCustomization] = useState<MoonPhaseCustomization>({
    title: "Under This Moon",
    subtitle: "",
    dateText: "",
    date: new Date(),
    styleId: "midnight",
    showStars: true,
    showPhaseLabel: true,
  });

  const [product, setProduct] = useState<MoonPhaseProductSelection>({
    size: "A3",
    frame: priceConfig.frames[0],
  });

  const [showMiniPreview, setShowMiniPreview] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!customization.dateText) {
      const formatted = customization.date.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
      setCustomization((prev) => ({ ...prev, dateText: formatted }));
    }
  }, [customization.date, customization.dateText]);

  useEffect(() => {
    const handleScroll = () => {
      if (!previewContainerRef.current) return;
      const previewRect = previewContainerRef.current.getBoundingClientRect();
      const previewCenter = previewRect.top + previewRect.height / 2;
      setShowMiniPreview(previewCenter < -50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPreview = () => {
    if (!previewContainerRef.current) return;
    const previewRect = previewContainerRef.current.getBoundingClientRect();
    const previewHeight = previewRect.height;
    const viewportHeight = window.innerHeight;
    const previewTop = previewRect.top + window.scrollY;
    const scrollTarget = previewTop - viewportHeight / 2 + previewHeight / 2;
    window.scrollTo({ top: Math.max(0, scrollTarget), behavior: "smooth" });
  };

  const handleDateChange = useCallback((date: Date) => { const formatted = date.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }); setCustomization((prev) => ({ ...prev, date, dateText: formatted })); }, []);
  const handleStyleChange = useCallback((styleId: string) => { setCustomization((prev) => ({ ...prev, styleId })); }, []);
  const handleToggleStars = useCallback(() => { setCustomization((prev) => ({ ...prev, showStars: !prev.showStars })); }, []);
  const handleTogglePhaseLabel = useCallback(() => { setCustomization((prev) => ({ ...prev, showPhaseLabel: !prev.showPhaseLabel })); }, []);
  const handleTitleChange = useCallback((title: string) => { setCustomization((prev) => ({ ...prev, title })); }, []);
  const handleSubtitleChange = useCallback((subtitle: string) => { setCustomization((prev) => ({ ...prev, subtitle })); }, []);
  const handleDateTextChange = useCallback((dateText: string) => { setCustomization((prev) => ({ ...prev, dateText })); }, []);
  const handleSizeChange = useCallback((size: PrintSize) => { setProduct((prev) => ({ ...prev, size })); }, []);
  const handleFrameChange = useCallback((frame: FrameOption) => { setProduct((prev) => ({ ...prev, frame })); }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream">
      <AnimatePresence>
        {showMiniPreview && <MoonPhaseMiniPreview customization={customization} product={product} onTap={scrollToPreview} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal">Create Your Moon Phase Print</h1>
          <p className="mt-3 text-brand-600 max-w-xl mx-auto">Capture the exact moon phase from any date. Perfect for birthdays, anniversaries, or that unforgettable night.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div ref={previewContainerRef} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:sticky lg:top-28">
            <MoonPhasePrintPreview customization={customization} product={product} captureRef={captureRef} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">1. Choose Your Date</h2>
              <MoonPhaseDatePicker date={customization.date} onDateChange={handleDateChange} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">2. Choose Your Style</h2>
              <div className="space-y-6">
                <MoonPhaseStyleSelector selectedStyleId={customization.styleId} onStyleChange={handleStyleChange} />
                <MoonPhaseDisplayOptions showStars={customization.showStars} showPhaseLabel={customization.showPhaseLabel} onToggleStars={handleToggleStars} onTogglePhaseLabel={handleTogglePhaseLabel} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">3. Personalise Your Text</h2>
              <MoonPhaseTextEditor title={customization.title} subtitle={customization.subtitle} dateText={customization.dateText} onTitleChange={handleTitleChange} onSubtitleChange={handleSubtitleChange} onDateTextChange={handleDateTextChange} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">4. Select Size & Frame</h2>
              <MoonPhaseProductOptions selectedSize={product.size} selectedFrame={product.frame} onSizeChange={handleSizeChange} onFrameChange={handleFrameChange} />
            </div>

            <MoonPhaseOrderSummary customization={customization} product={product} previewRef={captureRef} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
