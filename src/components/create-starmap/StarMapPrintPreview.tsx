// src/components/create-starmap/StarMapPrintPreview.tsx
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { StarMapCustomization, StarMapProductSelection } from "@/types";
import { renderStarMap, getSkyDescription } from "@/lib/starMapRenderer";
import { loadBscStars, Star } from "@/lib/bscStars";
import { priceConfig } from "@/lib/pricing";

interface StarMapPrintPreviewProps {
  customization: StarMapCustomization;
  product: StarMapProductSelection;
}

export default function StarMapPrintPreview({
  customization,
  product,
}: StarMapPrintPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [starsLoaded, setStarsLoaded] = useState(false);
  const [starsError, setStarsError] = useState<string | null>(null);

  // Load BSC stars once on mount
  useEffect(() => {
    let cancelled = false;

    loadBscStars({ maxMag: 6.5 })
      .then((loadedStars) => {
        if (!cancelled) {
          setStars(loadedStars);
          setStarsLoaded(true);
          console.log(`Loaded ${loadedStars.length} BSC stars`);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to load BSC stars:", err);
          setStarsError(err.message);
          setStarsLoaded(true); // Mark as loaded so we can render with empty stars
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Get print dimensions based on size
  const dimensions = useMemo(() => {
    const sizeInfo = priceConfig.sizes[product.size];
    // Parse dimensions like "29.7 × 42 cm"
    const match = sizeInfo.dimensions.match(/([\d.]+)\s*×\s*([\d.]+)/);
    if (match) {
      return {
        width: parseFloat(match[1]),
        height: parseFloat(match[2]),
        aspectRatio: parseFloat(match[1]) / parseFloat(match[2]),
      };
    }
    return { width: 21, height: 29.7, aspectRatio: 21 / 29.7 }; // A4 default
  }, [product.size]);

  // Combine date and time into a single Date object
  const renderDate = useMemo(() => {
    const date = new Date(customization.date);
    const [hours, minutes] = (customization.time || "21:00").split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }, [customization.date, customization.time]);

  // Get sky description
  const skyDescription = useMemo(() => {
    if (!customization.location) return "";
    return getSkyDescription(
      renderDate,
      customization.location.latitude,
      customization.location.longitude
    );
  }, [renderDate, customization.location]);

  // Render the star map
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !starsLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on container and aspect ratio
    const containerWidth = container.clientWidth;
    const containerHeight = containerWidth / dimensions.aspectRatio;

    // Use higher resolution for sharper rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    ctx.scale(dpr, dpr);

    setIsRendering(true);

    // Render with a small delay for better UX during rapid changes
    const renderTimer = setTimeout(() => {
      const location = customization.location || {
        latitude: -33.8688,
        longitude: 151.2093,
      };

      renderStarMap(ctx, {
        date: renderDate,
        latitude: location.latitude,
        longitude: location.longitude,
        styleId: customization.styleId,
        showConstellations: customization.showConstellations,
        showConstellationNames: customization.showConstellationNames,
        showGrid: customization.showGrid,
        showMilkyWay: customization.showMilkyWay,
        canvasWidth: containerWidth,
        canvasHeight: containerHeight,
        stars, // Pass loaded BSC stars
      });

      setIsRendering(false);
    }, 50);

    return () => clearTimeout(renderTimer);
  }, [
    customization,
    dimensions,
    renderDate,
    stars,
    starsLoaded,
  ]);

  // Format location for display
  const locationDisplay = useMemo(() => {
    if (!customization.location) return "Select a location...";
    
    // Cast through unknown to access potential properties
    const loc = customization.location as unknown as Record<string, unknown>;
    const displayName = loc.placeName || loc.address || loc.name || loc.label;
    
    if (typeof displayName === "string" && displayName.trim()) {
      return displayName;
    }
    
    // Fallback to coordinates
    return `${customization.location.latitude.toFixed(2)}°, ${customization.location.longitude.toFixed(2)}°`;
  }, [customization.location]);

  // Format coordinates
  const coordinatesDisplay = customization.location
    ? `${Math.abs(customization.location.latitude).toFixed(4)}°${
        customization.location.latitude >= 0 ? "N" : "S"
      }, ${Math.abs(customization.location.longitude).toFixed(4)}°${
        customization.location.longitude >= 0 ? "E" : "W"
      }`
    : "";

  return (
    <div className="space-y-4">
      {/* Print Preview Container */}
      <motion.div
        ref={containerRef}
        className="relative bg-white rounded-xl overflow-hidden shadow-xl border border-brand-100"
        style={{ aspectRatio: dimensions.aspectRatio }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Frame Effect (if selected) */}
        {product.frame.id !== "none" && (
          <div
            className={`absolute inset-0 pointer-events-none z-10 ${
              product.frame.id === "black"
                ? "border-[12px] border-charcoal"
                : product.frame.id === "white"
                ? "border-[12px] border-white shadow-inner"
                : "border-[12px] border-amber-200"
            }`}
            style={{
              boxShadow:
                product.frame.id === "oak"
                  ? "inset 0 0 0 2px rgba(139, 90, 43, 0.3)"
                  : undefined,
            }}
          />
        )}

        {/* Canvas Container */}
        <div className="absolute inset-0 flex flex-col">
          {/* Star Map Canvas */}
          <div className="flex-1 relative">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />

            {/* Loading/Rendering Indicator */}
            {(!starsLoaded || isRendering) && (
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50">
                <div className="text-white/80 text-sm flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {!starsLoaded ? "Loading stars..." : "Rendering..."}
                </div>
              </div>
            )}

            {/* Error indicator */}
            {starsError && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-500/80 text-white text-xs px-3 py-2 rounded">
                Star catalog failed to load: {starsError}
              </div>
            )}
          </div>

          {/* Print Text Area */}
          <div
            className={`px-6 py-4 text-center ${
              customization.styleId === "celestial"
                ? "bg-cream text-charcoal"
                : "bg-charcoal text-white"
            }`}
          >
            {/* Title */}
            <h2
              className="font-serif text-lg sm:text-xl font-semibold tracking-wide"
              style={{ letterSpacing: "0.05em" }}
            >
              {customization.title || "The Night We Met"}
            </h2>

            {/* Subtitle (optional) */}
            {customization.subtitle && (
              <p className="mt-1 text-sm opacity-80">
                {customization.subtitle}
              </p>
            )}

            {/* Location & Date */}
            <div className="mt-2 text-xs sm:text-sm opacity-70 space-y-0.5">
              {customization.location && (
                <p>{locationDisplay}</p>
              )}
              <p>{customization.dateText || "Select a date..."}</p>
            </div>

            {/* Coordinates */}
            {coordinatesDisplay && (
              <p className="mt-1 text-[10px] sm:text-xs opacity-50 font-mono tracking-wider">
                {coordinatesDisplay}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sky Info */}
      {customization.location && skyDescription && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-brand-600"
        >
          <span className="inline-flex items-center gap-2">
            <span className="text-lg">🌙</span>
            Moon Phase: {skyDescription}
          </span>
        </motion.div>
      )}

      {/* Star count indicator (dev info) */}
      {starsLoaded && stars.length > 0 && (
        <div className="text-center text-xs text-brand-400">
          {stars.length.toLocaleString()} stars in catalog
        </div>
      )}
    </div>
  );
}