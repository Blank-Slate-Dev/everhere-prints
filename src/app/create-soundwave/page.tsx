// src/app/create-soundwave/page.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrintSize, FrameOption, SoundWaveCustomization, SoundWaveProductSelection, SongMetadata } from "@/types";
import { priceConfig } from "@/lib/pricing";
import { AudioProcessingResult } from "@/lib/audioProcessor";
import SoundWavePrintPreview from "@/components/create-soundwave/SoundWavePrintPreview";
import SoundWaveMiniPreview from "@/components/create-soundwave/SoundWaveMiniPreview";
import SoundWaveAudioUpload from "@/components/create-soundwave/SoundWaveAudioUpload";
import SoundWaveSongSearch from "@/components/create-soundwave/SoundWaveSongSearch";
import SoundWaveLyricsPosition from "@/components/create-soundwave/SoundWaveLyricsPosition";
import SoundWaveDisplayOptions from "@/components/create-soundwave/SoundWaveDisplayOptions";
import SoundWaveStyleSelector from "@/components/create-soundwave/SoundWaveStyleSelector";
import SoundWaveTextEditor from "@/components/create-soundwave/SoundWaveTextEditor";
import SoundWaveProductOptions from "@/components/create-soundwave/SoundWaveProductOptions";
import SoundWaveOrderSummary from "@/components/create-soundwave/SoundWaveOrderSummary";

export default function CreateSoundWavePage() {
  const [customization, setCustomization] = useState<SoundWaveCustomization>({
    title: "",
    subtitle: "",
    dateText: "",
    styleId: "midnight",
    waveformData: [],
    audioDuration: 0,
    audioFileName: "",
    songData: null,
    showAlbumArt: true,
    showArtistName: true,
    showAlbumName: false,
    showDuration: true,
    showLyrics: true,
    waveformPosition: 0.3,
    fullLyrics: null,
    selectedLyrics: [],
  });

  const [product, setProduct] = useState<SoundWaveProductSelection>({
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

  const handleAudioProcessed = useCallback((result: AudioProcessingResult) => { setCustomization((prev) => ({ ...prev, waveformData: result.waveformData, audioDuration: result.duration, audioFileName: result.fileName })); }, []);
  const handleClearAudio = useCallback(() => { setCustomization((prev) => ({ ...prev, waveformData: [], audioDuration: 0, audioFileName: "" })); }, []);
  const handleSongSelect = useCallback((song: SongMetadata | null) => { setCustomization((prev) => ({ ...prev, songData: song, title: song ? song.songName : prev.title, fullLyrics: null, selectedLyrics: [], waveformPosition: 0.3 })); }, []);
  const handlePositionChange = useCallback((position: number) => { setCustomization((prev) => ({ ...prev, waveformPosition: position })); }, []);
  const handleFullLyricsLoaded = useCallback((lyrics: string | null) => { setCustomization((prev) => ({ ...prev, fullLyrics: lyrics })); }, []);
  const handleSelectedLyricsChange = useCallback((lyrics: string[]) => { setCustomization((prev) => ({ ...prev, selectedLyrics: lyrics })); }, []);
  const handleToggleLyrics = useCallback(() => { setCustomization((prev) => ({ ...prev, showLyrics: !prev.showLyrics })); }, []);
  const handleStyleChange = useCallback((styleId: string) => { setCustomization((prev) => ({ ...prev, styleId })); }, []);
  const handleTitleChange = useCallback((title: string) => { setCustomization((prev) => ({ ...prev, title })); }, []);
  const handleSubtitleChange = useCallback((subtitle: string) => { setCustomization((prev) => ({ ...prev, subtitle })); }, []);
  const handleDateTextChange = useCallback((dateText: string) => { setCustomization((prev) => ({ ...prev, dateText })); }, []);
  const handleToggleAlbumArt = useCallback(() => { setCustomization((prev) => ({ ...prev, showAlbumArt: !prev.showAlbumArt })); }, []);
  const handleToggleArtistName = useCallback(() => { setCustomization((prev) => ({ ...prev, showArtistName: !prev.showArtistName })); }, []);
  const handleToggleAlbumName = useCallback(() => { setCustomization((prev) => ({ ...prev, showAlbumName: !prev.showAlbumName })); }, []);
  const handleToggleDuration = useCallback(() => { setCustomization((prev) => ({ ...prev, showDuration: !prev.showDuration })); }, []);
  const handleSizeChange = useCallback((size: PrintSize) => { setProduct((prev) => ({ ...prev, size })); }, []);
  const handleFrameChange = useCallback((frame: FrameOption) => { setProduct((prev) => ({ ...prev, frame })); }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream">
      <AnimatePresence>
        {showMiniPreview && <SoundWaveMiniPreview customization={customization} product={product} onTap={scrollToPreview} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal">Create Your Sound Wave Print</h1>
          <p className="mt-3 text-brand-600 max-w-xl mx-auto">Transform any song into stunning wall art with its unique waveform and your favourite lyrics.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div ref={previewContainerRef} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:sticky lg:top-28">
            <SoundWavePrintPreview customization={customization} product={product} captureRef={captureRef} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">1. Find Your Song</h2>
              <p className="text-sm text-brand-500 mb-4">Search for your song to get album artwork and lyrics</p>
              <SoundWaveSongSearch selectedSong={customization.songData} onSongSelect={handleSongSelect} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">2. Upload Your Audio</h2>
              <p className="text-sm text-brand-500 mb-4">Upload the full song to generate its complete waveform</p>
              <SoundWaveAudioUpload waveformData={customization.waveformData} audioFileName={customization.audioFileName} audioDuration={customization.audioDuration} onAudioProcessed={handleAudioProcessed} onClearAudio={handleClearAudio} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-charcoal">3. Select Your Lyrics</h2>
                {customization.songData && (
                  <button onClick={handleToggleLyrics} className={`px-3 py-1 text-sm rounded-full transition-colors ${customization.showLyrics ? "bg-charcoal text-white" : "bg-brand-100 text-brand-600"}`}>
                    Lyrics {customization.showLyrics ? "On" : "Off"}
                  </button>
                )}
              </div>
              <SoundWaveLyricsPosition waveformData={customization.waveformData} audioDuration={customization.audioDuration} styleId={customization.styleId} artist={customization.songData?.artistName || null} songTitle={customization.songData?.songName || null} position={customization.waveformPosition} selectedLyrics={customization.selectedLyrics} onPositionChange={handlePositionChange} onLyricsChange={handleSelectedLyricsChange} onFullLyricsLoaded={handleFullLyricsLoaded} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">4. Choose Your Style</h2>
              <div className="space-y-6">
                <SoundWaveStyleSelector selectedStyleId={customization.styleId} onStyleChange={handleStyleChange} />
                <SoundWaveDisplayOptions showAlbumArt={customization.showAlbumArt} showArtistName={customization.showArtistName} showAlbumName={customization.showAlbumName} showDuration={customization.showDuration} hasSongData={customization.songData !== null} onToggleAlbumArt={handleToggleAlbumArt} onToggleArtistName={handleToggleArtistName} onToggleAlbumName={handleToggleAlbumName} onToggleDuration={handleToggleDuration} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">5. Personalise Your Text</h2>
              <SoundWaveTextEditor title={customization.title} subtitle={customization.subtitle} dateText={customization.dateText} onTitleChange={handleTitleChange} onSubtitleChange={handleSubtitleChange} onDateTextChange={handleDateTextChange} />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm">
              <h2 className="text-lg font-semibold text-charcoal mb-4">6. Select Size & Frame</h2>
              <SoundWaveProductOptions selectedSize={product.size} selectedFrame={product.frame} onSizeChange={handleSizeChange} onFrameChange={handleFrameChange} />
            </div>

            <SoundWaveOrderSummary customization={customization} product={product} previewRef={captureRef} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
