// src/components/create-starmap/StarMapPrintPreview.tsx
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { StarMapCustomization, StarMapProductSelection } from "@/types";
import { renderStarMap, getSkyDescription } from "@/lib/starMapRenderer";
import { loadBscStars, Star } from "@/lib/bscStars";
import { getStarMapStyle } from "@/lib/starMapConfig";

interface StarMapPrintPreviewProps {
  customization: StarMapCustomization;
  product: StarMapProductSelection;
}

export default function StarMapPrintPreview({
  customization,
  product,
}: StarMapPrintPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [starsLoaded, setStarsLoaded] = useState(false);
  const [starsError, setStarsError] = useState<string | null>(null);

  const { frame, size } = product;
  const hasFrame = frame.id !== "none";
  const style = getStarMapStyle(customization.styleId);

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
          setStarsLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
    if (!canvasRef.current || !mapContainerRef.current || !starsLoaded) return;

    const canvas = canvasRef.current;
    const container = mapContainerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get actual container dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Use higher resolution for sharper rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    ctx.scale(dpr, dpr);

    setIsRendering(true);

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
        showCardinals: customization.showCardinals,
        canvasWidth: containerWidth,
        canvasHeight: containerHeight,
        stars,
      });

      setIsRendering(false);
    }, 50);

    return () => clearTimeout(renderTimer);
  }, [customization, renderDate, stars, starsLoaded]);

  // Format location for display
  const locationDisplay = useMemo(() => {
    if (!customization.location) return "Your Location";

    const loc = customization.location as unknown as Record<string, unknown>;
    const displayName = loc.placeName || loc.address || loc.name || loc.label;

    if (typeof displayName === "string" && displayName.trim()) {
      // Shorten long names
      const parts = displayName.split(",");
      if (parts.length >= 2) {
        return `${parts[0].trim()}, ${parts[parts.length - 1].trim()}`;
      }
      return displayName;
    }

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

  // Frame configuration (matching other products)
  const frameConfig = {
    none: {
      outerBg: "transparent",
      frameWidth: 0,
      shadowColor: "rgba(0,0,0,0.2)",
      edgeHighlight: "transparent",
      edgeShadow: "transparent",
    },
    black: {
      outerBg: "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 30%, #0d0d0d 70%, #1a1a1a 100%)",
      edgeHighlight: "rgba(255,255,255,0.1)",
      edgeShadow: "rgba(0,0,0,0.9)",
      frameWidth: 16,
      shadowColor: "rgba(0,0,0,0.6)",
    },
    white: {
      outerBg: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 30%, #ebebeb 70%, #f5f5f5 100%)",
      edgeHighlight: "rgba(255,255,255,1)",
      edgeShadow: "rgba(0,0,0,0.12)",
      frameWidth: 16,
      shadowColor: "rgba(0,0,0,0.2)",
    },
    oak: {
      outerBg: "linear-gradient(145deg, #dbb896 0%, #c49660 30%, #9a7042 70%, #b8854a 100%)",
      edgeHighlight: "rgba(255,230,200,0.5)",
      edgeShadow: "rgba(60,35,10,0.7)",
      frameWidth: 16,
      shadowColor: "rgba(80,50,20,0.4)",
    },
  };

  const config = frameConfig[frame.id as keyof typeof frameConfig];

  // A-series paper ratio: 1:√2 ≈ 1:1.4142 (width:height in portrait)
  const paperAspectRatio = 1 / Math.sqrt(2);

  // Text colors based on style
  const isLightStyle = customization.styleId === "celestial";
  const textBgColor = isLightStyle ? "#faf8f5" : style.backgroundColor;
  const titleColor = isLightStyle ? "#6b5b4f" : "rgba(255,255,255,0.7)";
  const mainTextColor = isLightStyle ? "#1a1a2e" : "#ffffff";
  const subtitleColor = isLightStyle ? "#6b5b4f" : "rgba(255,255,255,0.6)";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Frame Container */}
      <div className="relative mx-auto max-w-md">
        {/* Drop shadow */}
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            transform: "translate(6px, 10px)",
            filter: "blur(25px)",
            background: config.shadowColor,
            opacity: 0.7,
          }}
        />

        {/* Outer frame wrapper */}
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          className="relative"
          style={{
            padding: hasFrame ? `${config.frameWidth}px` : "0px",
            background: hasFrame ? config.outerBg : "transparent",
            borderRadius: hasFrame ? "3px" : "2px",
            boxShadow: hasFrame
              ? `4px 8px 25px -5px ${config.shadowColor}, 8px 16px 40px -10px rgba(0,0,0,0.25)`
              : `4px 8px 25px -8px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Frame edge highlights */}
          {hasFrame && (
            <>
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${config.edgeHighlight} 0%, ${config.edgeHighlight} 70%, transparent 100%)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "2px",
                    background: `linear-gradient(180deg, ${config.edgeHighlight} 0%, ${config.edgeHighlight} 70%, transparent 100%)`,
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent 0%, ${config.edgeShadow} 30%, ${config.edgeShadow} 100%)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "2px",
                    background: `linear-gradient(180deg, transparent 0%, ${config.edgeShadow} 30%, ${config.edgeShadow} 100%)`,
                  }}
                />
              </div>
            </>
          )}

          {/* Inner rebate shadow */}
          {hasFrame && (
            <div
              className="absolute rounded-sm pointer-events-none"
              style={{
                inset: `${config.frameWidth - 3}px`,
                boxShadow: `inset 2px 2px 6px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(0,0,0,0.1)`,
              }}
            />
          )}

          {/* White mat/paper */}
          <div
            className="relative bg-white"
            style={{
              padding: hasFrame ? "8px" : "12px",
              boxShadow: hasFrame ? `inset 1px 1px 3px rgba(0,0,0,0.04)` : "none",
            }}
          >
            {/* Mat highlight */}
            {hasFrame && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: 0,
                  left: 0,
                  right: "50%",
                  bottom: "50%",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)",
                }}
              />
            )}

            {/* Print Content Area - A-series aspect ratio (portrait) */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: `${paperAspectRatio}`,
                backgroundColor: textBgColor,
              }}
            >
              {/* Star Map Area - takes up ~75% of height */}
              <div
                ref={mapContainerRef}
                className="absolute inset-x-0 top-0 overflow-hidden"
                style={{ height: "75%" }}
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                />

                {/* Loading indicator */}
                {(!starsLoaded || isRendering) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="text-white/80 text-sm flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      {!starsLoaded ? "Loading stars..." : "Rendering..."}
                    </div>
                  </div>
                )}

                {/* Error indicator */}
                {starsError && (
                  <div className="absolute bottom-2 left-2 right-2 bg-red-500/80 text-white text-[10px] px-2 py-1 rounded">
                    Failed to load stars
                  </div>
                )}

                {/* Coordinates overlay */}
                {coordinatesDisplay && (
                  <div
                    className="absolute top-2 left-2 text-[8px] md:text-[9px] font-mono pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {coordinatesDisplay}
                  </div>
                )}
              </div>

              {/* Text Content - Bottom 25% */}
              <div
                className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-center px-4"
                style={{ height: "25%", backgroundColor: textBgColor }}
              >
                {/* Title */}
                <motion.p
                  key={customization.title}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] mb-1"
                  style={{ color: titleColor }}
                >
                  {customization.title || "The Night We Met"}
                </motion.p>

                {/* Location Name */}
                <motion.p
                  key={locationDisplay}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-base md:text-lg lg:text-xl leading-tight"
                  style={{ color: mainTextColor }}
                >
                  {locationDisplay}
                </motion.p>

                {/* Subtitle & Date */}
                {(customization.subtitle || customization.dateText) && (
                  <motion.p
                    key={`${customization.subtitle}-${customization.dateText}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] md:text-xs mt-1"
                    style={{ color: subtitleColor }}
                  >
                    {customization.subtitle}
                    {customization.subtitle && customization.dateText && " • "}
                    {customization.dateText}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Size indicator badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -right-2 top-8 md:-right-4 md:top-12 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-10"
      >
        {size} Preview
      </motion.div>

      {/* Moon phase info */}
      {customization.location && skyDescription && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-center text-sm text-brand-600"
        >
          <span className="inline-flex items-center gap-2">
            <span className="text-lg">🌙</span>
            Moon Phase: {skyDescription}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}