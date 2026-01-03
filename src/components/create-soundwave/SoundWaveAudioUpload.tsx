// src/components/create-soundwave/SoundWaveAudioUpload.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Music, X, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import {
  processAudioFile,
  isValidAudioFile,
  isValidFileSize,
  formatDuration,
  MAX_AUDIO_FILE_SIZE,
  AudioProcessingResult,
} from "@/lib/audioProcessor";
import { AUDIO_SUGGESTIONS } from "@/lib/soundWaveConfig";

interface SoundWaveAudioUploadProps {
  waveformData: number[];
  audioFileName: string;
  audioDuration: number;
  onAudioProcessed: (result: AudioProcessingResult) => void;
  onClearAudio: () => void;
}

export default function SoundWaveAudioUpload({
  waveformData,
  audioFileName,
  audioDuration,
  onAudioProcessed,
  onClearAudio,
}: SoundWaveAudioUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasAudio = waveformData.length > 0;

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      if (!isValidAudioFile(file)) {
        setError("Please upload a valid audio file (MP3, WAV, M4A, AAC, OGG)");
        return;
      }

      if (!isValidFileSize(file)) {
        const maxSizeMB = MAX_AUDIO_FILE_SIZE / (1024 * 1024);
        setError(`File is too large. Maximum size is ${maxSizeMB}MB`);
        return;
      }

      setIsProcessing(true);

      try {
        const result = await processAudioFile(file);
        onAudioProcessed(result);
      } catch (err) {
        console.error("Audio processing error:", err);
        setError("Failed to process audio file. Please try a different file.");
      } finally {
        setIsProcessing(false);
      }
    },
    [onAudioProcessed]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const handleClick = () => fileInputRef.current?.click();

  const handleClear = () => {
    setError(null);
    onClearAudio();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!hasAudio && !isProcessing && (
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
              ? "border-brand-500 bg-brand-50"
              : "border-brand-200 hover:border-brand-400 hover:bg-brand-50/50"
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Upload
            size={32}
            className={`mx-auto mb-3 ${isDragging ? "text-brand-500" : "text-brand-400"}`}
          />
          <p className="text-charcoal font-medium">
            {isDragging ? "Drop your audio file here" : "Drag & drop your audio file"}
          </p>
          <p className="text-sm text-brand-500 mt-1">
            or click to browse
          </p>
          <p className="text-xs text-brand-400 mt-3">
            MP3, WAV, M4A, AAC, OGG • Max 10MB
          </p>
        </div>
      )}

      {/* Processing State */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border border-brand-200 rounded-xl p-6 text-center bg-brand-50"
          >
            <Loader2 size={32} className="mx-auto animate-spin text-brand-500 mb-3" />
            <p className="text-charcoal font-medium">Processing audio...</p>
            <p className="text-sm text-brand-500 mt-1">
              Extracting waveform data
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success State */}
      <AnimatePresence>
        {hasAudio && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border border-green-200 rounded-xl p-4 bg-green-50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <div>
                  <p className="text-charcoal font-medium truncate max-w-[200px]">
                    {audioFileName}
                  </p>
                  <p className="text-sm text-brand-500">
                    Duration: {formatDuration(audioDuration)} • {waveformData.length} samples
                  </p>
                </div>
              </div>

              <button
                onClick={handleClear}
                className="p-2 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                title="Remove audio"
              >
                <X size={18} />
              </button>
            </div>

            {/* Waveform preview */}
            <div className="h-12 flex items-center gap-[2px] bg-green-100 rounded-lg p-2">
              {waveformData.filter((_, i) => i % 2 === 0).map((amplitude, index) => (
                <div
                  key={index}
                  className="flex-1 bg-green-500 rounded-full"
                  style={{
                    height: `${Math.max(10, amplitude * 100)}%`,
                    opacity: 0.6 + amplitude * 0.4,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg"
          >
            <AlertCircle size={18} />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions */}
      {!hasAudio && !isProcessing && (
        <div className="mt-4">
          <p className="text-xs text-brand-400 mb-2 flex items-center gap-1">
            <Music size={12} />
            Ideas for your sound wave:
          </p>
          <div className="flex flex-wrap gap-2">
            {AUDIO_SUGGESTIONS.slice(0, 4).map((suggestion, index) => (
              <span
                key={index}
                className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded-full"
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
