// src/components/create-soundwave/SoundWaveOrderSummary.tsx
"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Truck, Shield, AlertCircle } from "lucide-react";
import { SoundWaveCustomization, SoundWaveProductSelection } from "@/types";
import { calculateTotal, formatPrice, getSizeDetails } from "@/lib/pricing";
import { getSoundWaveStyle } from "@/lib/soundWaveConfig";
import { formatDuration } from "@/lib/audioProcessor";
import Button from "@/components/ui/Button";

interface SoundWaveOrderSummaryProps {
  customization: SoundWaveCustomization;
  product: SoundWaveProductSelection;
  onCheckout: () => void;
  isLoading: boolean;
}

export default function SoundWaveOrderSummary({
  customization,
  product,
  onCheckout,
  isLoading,
}: SoundWaveOrderSummaryProps) {
  const { size, frame } = product;
  const sizeDetails = getSizeDetails(size);
  const style = getSoundWaveStyle(customization.styleId);
  const total = calculateTotal(size, frame);
  const hasAudio = customization.waveformData.length > 0;
  const hasLyrics = customization.showLyrics && customization.selectedLyrics.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-charcoal mb-4">Order Summary</h2>

      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-brand-500">Style</span>
          <span className="text-charcoal font-medium">{style.name}</span>
        </div>

        {customization.songData && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-brand-500">Song</span>
              <span className="text-charcoal font-medium truncate max-w-[150px]">
                {customization.songData.songName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-500">Artist</span>
              <span className="text-charcoal font-medium truncate max-w-[150px]">
                {customization.songData.artistName}
              </span>
            </div>
          </>
        )}

        {hasAudio && !customization.songData && (
          <div className="flex justify-between text-sm">
            <span className="text-brand-500">Audio</span>
            <span className="text-charcoal font-medium truncate max-w-[150px]">
              {customization.audioFileName}
            </span>
          </div>
        )}

        {hasAudio && customization.audioDuration > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-brand-500">Duration</span>
            <span className="text-charcoal font-medium">
              {formatDuration(customization.audioDuration)}
            </span>
          </div>
        )}

        {hasLyrics && (
          <div className="flex justify-between text-sm">
            <span className="text-brand-500">Lyrics</span>
            <span className="text-charcoal font-medium">
              {customization.selectedLyrics.length} lines selected
            </span>
          </div>
        )}

        <div className="h-px bg-brand-100" />

        <div className="flex justify-between text-sm">
          <span className="text-brand-500">
            {sizeDetails.name} Print ({sizeDetails.dimensions})
          </span>
          <span className="text-charcoal font-medium">
            {formatPrice(sizeDetails.price)}
          </span>
        </div>

        {frame.price > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-brand-500">{frame.name}</span>
            <span className="text-charcoal font-medium">
              +{formatPrice(frame.price)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-brand-500 flex items-center gap-1">
            <Truck size={14} />
            Delivery (Australia)
          </span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>

        <div className="h-px bg-brand-100" />

        <div className="flex justify-between">
          <span className="text-charcoal font-semibold">Total</span>
          <span className="text-charcoal font-bold text-xl">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Audio Required Warning */}
      {!hasAudio && (
        <div className="mb-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-3 rounded-lg">
          <AlertCircle size={18} />
          <p className="text-sm">Please upload your audio file to continue</p>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        disabled={isLoading || !hasAudio}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              ⏳
            </motion.span>
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <ShoppingBag size={18} />
            Proceed to Checkout
          </span>
        )}
      </Button>

      {/* Trust Badges */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-brand-400">
        <span className="flex items-center gap-1">
          <Shield size={12} />
          Secure Payment
        </span>
        <span className="flex items-center gap-1">
          <Truck size={12} />
          Free Shipping
        </span>
      </div>
    </motion.div>
  );
}
