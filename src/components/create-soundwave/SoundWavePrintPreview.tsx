// src/components/create-soundwave/SoundWavePrintPreview.tsx
"use client";

import { useMemo, RefObject } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SoundWaveCustomization, SoundWaveProductSelection } from "@/types";
import { getSoundWaveStyle } from "@/lib/soundWaveConfig";
import { formatDuration } from "@/lib/audioProcessor";

interface SoundWavePrintPreviewProps {
  customization: SoundWaveCustomization;
  product: SoundWaveProductSelection;
  captureRef?: RefObject<HTMLDivElement | null>;
}

export default function SoundWavePrintPreview({
  customization,
  product,
  captureRef,
}: SoundWavePrintPreviewProps) {
  const { title, subtitle, dateText, styleId, waveformData, audioDuration, songData, showAlbumArt, showArtistName, showAlbumName, showDuration, showLyrics, waveformPosition, selectedLyrics } = customization;
  const { frame, size } = product;

  const style = getSoundWaveStyle(styleId);
  const hasFrame = frame.id !== "none";
  const hasAudio = waveformData.length > 0;
  const hasSongData = songData !== null;
  const hasLyrics = showLyrics && selectedLyrics.length > 0;

  const displayAlbumArt = showAlbumArt && hasSongData && songData?.albumArtUrl;
  const displayArtistName = showArtistName && hasSongData;
  const displayAlbumName = showAlbumName && hasSongData;
  const displayDuration = showDuration && (audioDuration > 0 || (hasSongData && songData?.durationMs));

  const durationDisplay = useMemo(() => {
    if (hasSongData && songData?.durationMs) {
      const totalSeconds = Math.floor(songData.durationMs / 1000);
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    }
    if (audioDuration > 0) return formatDuration(audioDuration);
    return null;
  }, [hasSongData, songData, audioDuration]);

  const displayWaveform = useMemo(() => {
    if (!hasAudio || waveformData.length === 0) return generatePlaceholderWaveform();
    const targetBars = 100;
    if (waveformData.length <= targetBars) return waveformData;
    const resampled: number[] = [];
    const step = waveformData.length / targetBars;
    for (let i = 0; i < targetBars; i++) { const idx = Math.floor(i * step); resampled.push(waveformData[idx]); }
    return resampled;
  }, [hasAudio, waveformData]);

  const waveformPath = useMemo(() => {
    const data = displayWaveform;
    const width = 400; const height = 120; const centerY = height / 2;
    if (data.length === 0) return "";
    const points: string[] = []; const bottomPoints: string[] = [];
    for (let i = 0; i < data.length; i++) {
      const x = (i / (data.length - 1)) * width;
      const amplitude = data[i] * (height * 0.38);
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${(centerY - amplitude).toFixed(2)}`);
      bottomPoints.unshift(`L ${x.toFixed(2)} ${(centerY + amplitude).toFixed(2)}`);
    }
    return points.join(" ") + " " + bottomPoints.join(" ") + " Z";
  }, [displayWaveform]);

  const playheadX = waveformPosition * 400;

  function generatePlaceholderWaveform(): number[] {
    const placeholder: number[] = [];
    for (let i = 0; i < 80; i++) { const x = i / 80; const wave = 0.2 + 0.3 * Math.sin(x * Math.PI * 3) + 0.2 * Math.sin(x * Math.PI * 7 + 0.5) + 0.15 * Math.sin(x * Math.PI * 13 + 1) + 0.1 * Math.sin(x * Math.PI * 23 + 2); placeholder.push(Math.max(0.08, Math.min(1, wave))); }
    return placeholder;
  }

  const gradientId = `waveGradient-${styleId}`;

  const frameConfig = {
    none: { outerBg: "transparent", frameWidth: 0, shadowColor: "rgba(0,0,0,0.2)", edgeHighlight: "transparent", edgeShadow: "transparent" },
    black: { outerBg: "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 30%, #0d0d0d 70%, #1a1a1a 100%)", edgeHighlight: "rgba(255,255,255,0.1)", edgeShadow: "rgba(0,0,0,0.9)", frameWidth: 16, shadowColor: "rgba(0,0,0,0.6)" },
    white: { outerBg: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 30%, #ebebeb 70%, #f5f5f5 100%)", edgeHighlight: "rgba(255,255,255,1)", edgeShadow: "rgba(0,0,0,0.12)", frameWidth: 16, shadowColor: "rgba(0,0,0,0.2)" },
    oak: { outerBg: "linear-gradient(145deg, #dbb896 0%, #c49660 30%, #9a7042 70%, #b8854a 100%)", edgeHighlight: "rgba(255,230,200,0.5)", edgeShadow: "rgba(60,35,10,0.7)", frameWidth: 16, shadowColor: "rgba(80,50,20,0.4)" },
  };

  const captureFrameColors: Record<string, string> = { none: "transparent", black: "#1a1a1a", white: "#f0f0f0", oak: "#b8854a" };
  const config = frameConfig[frame.id as keyof typeof frameConfig];
  const captureFrameColor = captureFrameColors[frame.id] || "transparent";
  const paperAspectRatio = 1 / Math.sqrt(2);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative">
      {/* ==================== VISUAL PREVIEW ==================== */}
      <div className="relative mx-auto max-w-lg">
        <div className="absolute inset-0 rounded-sm" style={{ transform: "translate(6px, 10px)", filter: "blur(25px)", background: config.shadowColor, opacity: 0.7 }} />

        <motion.div layout transition={{ duration: 0.3 }} className="relative" style={{ padding: hasFrame ? `${config.frameWidth}px` : "0px", background: hasFrame ? config.outerBg : "transparent", borderRadius: hasFrame ? "3px" : "2px", boxShadow: hasFrame ? `4px 8px 25px -5px ${config.shadowColor}, 8px 16px 40px -10px rgba(0,0,0,0.25)` : `4px 8px 25px -8px rgba(0,0,0,0.3)` }}>
          {hasFrame && (
            <>
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${config.edgeHighlight} 0%, ${config.edgeHighlight} 70%, transparent 100%)` }} />
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, ${config.edgeHighlight} 0%, ${config.edgeHighlight} 70%, transparent 100%)` }} />
              </div>
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent 0%, ${config.edgeShadow} 30%, ${config.edgeShadow} 100%)` }} />
                <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg, transparent 0%, ${config.edgeShadow} 30%, ${config.edgeShadow} 100%)` }} />
              </div>
              <div className="absolute rounded-sm pointer-events-none" style={{ inset: `${config.frameWidth - 3}px`, boxShadow: `inset 2px 2px 6px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(0,0,0,0.1)` }} />
            </>
          )}

          <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${paperAspectRatio}`, backgroundColor: style.backgroundColor }}>
            <div className="absolute inset-0 flex flex-col" style={{ padding: "6%" }}>
              {displayAlbumArt && songData?.albumArtUrl ? (
                <>
                  <div className="flex-shrink-0 flex justify-center" style={{ marginBottom: "4%" }}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative" style={{ width: hasLyrics ? "40%" : "50%", aspectRatio: "1", borderRadius: "4px", overflow: "hidden", boxShadow: "0 15px 50px -12px rgba(0,0,0,0.5)" }}>
                      <Image src={songData.albumArtUrl} alt={songData.albumName} fill className="object-cover" unoptimized />
                    </motion.div>
                  </div>

                  <div className="flex-shrink-0 flex items-center justify-center overflow-visible" style={{ height: hasLyrics ? "18%" : "22%" }}>
                    <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }}>
                      {style.waveGradient && <defs><linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={style.waveGradient.from} /><stop offset="50%" stopColor={style.waveGradient.to} /><stop offset="100%" stopColor={style.waveGradient.from} /></linearGradient></defs>}
                      <path d={waveformPath} fill={style.waveGradient ? `url(#${gradientId})` : style.waveColor} opacity={hasAudio ? 0.9 : 0.3} />
                      {hasLyrics && hasAudio && (<><line x1={playheadX} y1={10} x2={playheadX} y2={110} stroke={style.accentColor} strokeWidth={2} opacity={0.8} /><circle cx={playheadX} cy={10} r={4} fill={style.accentColor} /><circle cx={playheadX} cy={110} r={4} fill={style.accentColor} /></>)}
                    </svg>
                  </div>

                  {hasLyrics && (
                    <div className="flex-shrink-0 text-center" style={{ marginTop: "3%", marginBottom: "2%" }}>
                      {selectedLyrics.map((line, index) => (<p key={index} className="italic" style={{ color: style.textColor, fontSize: "clamp(7px, 2.2vw, 11px)", opacity: 0.85, lineHeight: 1.6 }}>&ldquo;{line}&rdquo;</p>))}
                    </div>
                  )}

                  <div className="flex-grow flex flex-col items-center justify-center text-center" style={{ paddingTop: "2%" }}>
                    <motion.h1 key={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif font-semibold tracking-wide leading-tight" style={{ color: style.textColor, fontSize: "clamp(12px, 3.5vw, 20px)", marginBottom: "2%" }}>{title || songData?.songName || "Your Song"}</motion.h1>
                    {displayArtistName && songData && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-light tracking-widest uppercase" style={{ color: style.textColor, opacity: 0.7, fontSize: "clamp(7px, 2vw, 10px)", letterSpacing: "0.2em", marginBottom: "2%" }}>{songData.artistName}</motion.p>}
                    {displayAlbumName && songData && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="italic" style={{ color: style.accentColor, fontSize: "clamp(6px, 1.8vw, 9px)", marginBottom: "2%" }}>{songData.albumName}</motion.p>}
                    {displayDuration && durationDisplay && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono tracking-widest" style={{ color: style.accentColor, fontSize: "clamp(9px, 2.5vw, 12px)", opacity: 0.6 }}>{durationDisplay}</motion.p>}
                    {dateText && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tracking-widest uppercase" style={{ color: style.accentColor, fontSize: "clamp(5px, 1.5vw, 8px)", letterSpacing: "0.25em", marginTop: "3%" }}>{dateText}</motion.p>}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-shrink-0 text-center" style={{ marginBottom: "3%" }}>
                    <motion.h1 key={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif font-semibold tracking-wide" style={{ color: style.textColor, fontSize: "clamp(14px, 4.5vw, 24px)" }}>{title || "Your Sound Wave"}</motion.h1>
                    {subtitle && !displayArtistName && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-light tracking-widest uppercase mt-2" style={{ color: style.textColor, opacity: 0.7, fontSize: "clamp(7px, 2vw, 10px)", letterSpacing: "0.15em" }}>{subtitle}</motion.p>}
                  </div>

                  <div className="flex-grow flex items-center justify-center overflow-visible" style={{ minHeight: "25%", maxHeight: hasLyrics ? "45%" : "55%" }}>
                    <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }}>
                      {style.waveGradient && <defs><linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={style.waveGradient.from} /><stop offset="50%" stopColor={style.waveGradient.to} /><stop offset="100%" stopColor={style.waveGradient.from} /></linearGradient></defs>}
                      <path d={waveformPath} fill={style.waveGradient ? `url(#${gradientId})` : style.waveColor} opacity={hasAudio ? 0.9 : 0.3} />
                      {hasLyrics && hasAudio && (<><line x1={playheadX} y1={10} x2={playheadX} y2={110} stroke={style.accentColor} strokeWidth={2} opacity={0.8} /><circle cx={playheadX} cy={10} r={4} fill={style.accentColor} /><circle cx={playheadX} cy={110} r={4} fill={style.accentColor} /></>)}
                    </svg>
                  </div>

                  {hasLyrics && (
                    <div className="flex-shrink-0 text-center" style={{ marginTop: "4%", marginBottom: "2%" }}>
                      {selectedLyrics.map((line, index) => (<p key={index} className="italic" style={{ color: style.textColor, fontSize: "clamp(8px, 2.5vw, 12px)", opacity: 0.85, lineHeight: 1.7 }}>&ldquo;{line}&rdquo;</p>))}
                    </div>
                  )}

                  <div className="flex-shrink-0 text-center" style={{ marginTop: "3%" }}>
                    {displayDuration && durationDisplay && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono tracking-widest" style={{ color: style.accentColor, fontSize: "clamp(10px, 3vw, 16px)", opacity: 0.6, marginBottom: "2%" }}>{durationDisplay}</motion.p>}
                    {dateText && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tracking-widest uppercase" style={{ color: style.accentColor, fontSize: "clamp(6px, 1.8vw, 9px)", letterSpacing: "0.25em" }}>{dateText}</motion.p>}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="absolute -right-2 top-8 md:-right-4 md:top-12 bg-charcoal text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-10">{size} Preview</motion.div>

      {/* ==================== HIDDEN CAPTURE ELEMENT ==================== */}
      <div ref={captureRef} aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, width: "300px", backgroundColor: "#ffffff" }}>
        <div style={{ padding: hasFrame ? "10px" : "0px", backgroundColor: captureFrameColor, borderRadius: "2px" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: `${paperAspectRatio}`, backgroundColor: style.backgroundColor, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "16px" }}>
              {/* Title */}
              <div style={{ textAlign: "center", marginBottom: "12px" }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.03em", color: style.textColor }}>{title || songData?.songName || "Your Sound Wave"}</p>
                {displayArtistName && songData && <p style={{ fontSize: "7px", letterSpacing: "0.15em", textTransform: "uppercase", color: style.textColor, opacity: 0.7, marginTop: "4px" }}>{songData.artistName}</p>}
              </div>

              {/* Waveform placeholder */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "90%", height: "40px", backgroundColor: style.waveColor, opacity: 0.5, borderRadius: "4px" }} />
              </div>

              {/* Lyrics */}
              {hasLyrics && (
                <div style={{ textAlign: "center", marginTop: "8px", marginBottom: "8px" }}>
                  {selectedLyrics.slice(0, 2).map((line, index) => (<p key={index} style={{ fontStyle: "italic", fontSize: "7px", color: style.textColor, opacity: 0.85, lineHeight: 1.5 }}>&ldquo;{line}&rdquo;</p>))}
                </div>
              )}

              {/* Bottom text */}
              <div style={{ textAlign: "center", marginTop: "auto" }}>
                {displayDuration && durationDisplay && <p style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.1em", color: style.accentColor, opacity: 0.6 }}>{durationDisplay}</p>}
                {dateText && <p style={{ fontSize: "6px", letterSpacing: "0.15em", textTransform: "uppercase", color: style.accentColor, marginTop: "4px" }}>{dateText}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
