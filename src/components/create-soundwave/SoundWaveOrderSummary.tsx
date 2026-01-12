// src/components/create-soundwave/SoundWaveOrderSummary.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Truck, Shield, AlertCircle, Lock, ShieldCheck } from "lucide-react";
import { SoundWaveCustomization, SoundWaveProductSelection } from "@/types";
import { calculateTotal, formatPrice, getSizeDetails } from "@/lib/pricing";
import { getSoundWaveStyle } from "@/lib/soundWaveConfig";
import { formatDuration } from "@/lib/audioProcessor";
import Button from "@/components/ui/Button";

interface SoundWaveOrderSummaryProps {
  customization: SoundWaveCustomization;
  product: SoundWaveProductSelection;
}

export default function SoundWaveOrderSummary({
  customization,
  product,
}: SoundWaveOrderSummaryProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const { size, frame } = product;
  const sizeDetails = getSizeDetails(size);
  const style = getSoundWaveStyle(customization.styleId);
  const total = calculateTotal(size, frame);
  const hasAudio = customization.waveformData.length > 0;
  const hasLyrics = customization.showLyrics && customization.selectedLyrics.length > 0;
  const hasTitle = customization.title.trim().length > 0;
  const isComplete = hasAudio && hasTitle;

  const handleCheckout = async () => {
    if (!isComplete) return;
    
    setIsLoading(true);

    try {
      // Build product description
      const descriptionParts = [
        `${sizeDetails.name} Print (${sizeDetails.dimensions})`,
        frame.id !== "none" ? `with ${frame.name}` : "Print Only",
        `${style.name} Style`,
      ];
      
      if (hasLyrics) {
        descriptionParts.push(`with ${customization.selectedLyrics.length} lyric lines`);
      }

      // Build metadata for order
      const metadata: Record<string, string> = {
        product_type: "sound_wave",
        style_id: customization.styleId,
        style_name: style.name,
        title: customization.title || "",
        subtitle: customization.subtitle || "",
        date_text: customization.dateText || "",
        audio_file_name: customization.audioFileName || "",
        audio_duration: customization.audioDuration.toString(),
        waveform_sample_count: customization.waveformData.length.toString(),
        waveform_position: customization.waveformPosition.toString(),
        show_album_art: customization.showAlbumArt.toString(),
        show_artist_name: customization.showArtistName.toString(),
        show_album_name: customization.showAlbumName.toString(),
        show_duration: customization.showDuration.toString(),
        show_lyrics: customization.showLyrics.toString(),
        size: size,
        frame: frame.id,
      };

      // Add song data if available
      if (customization.songData) {
        metadata.track_id = customization.songData.trackId;
        metadata.song_name = customization.songData.songName;
        metadata.artist_name = customization.songData.artistName;
        metadata.album_name = customization.songData.albumName;
        metadata.album_art_url = customization.songData.albumArtUrl || "";
        metadata.song_duration_ms = customization.songData.durationMs.toString();
      }

      // Add lyrics
      if (hasLyrics) {
        metadata.lyrics_count = customization.selectedLyrics.length.toString();
        customization.selectedLyrics.forEach((line, index) => {
          metadata[`lyric_line_${index + 1}`] = line.slice(0, 200);
        });
      }

      // Store order data for checkout page
      const orderData = {
        productType: "sound_wave",
        productName: "EverHere Prints - Sound Wave Art",
        productDescription: descriptionParts.join(" | "),
        size: size,
        frame: frame.id,
        frameName: frame.name,
        subtotal: total,
        shipping: 0,
        total: total,
        metadata,
        returnPath: "/create-soundwave",
        previewImage: customization.songData?.albumArtUrl || undefined,
      };

      // Store in sessionStorage and navigate
      sessionStorage.setItem("checkoutOrder", JSON.stringify(orderData));
      router.push("/checkout");
      
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

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
          <p className="text-sm">Please upload or search for audio to continue</p>
        </div>
      )}

      {/* Title Required Warning */}
      {hasAudio && !hasTitle && (
        <div className="mb-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-3 rounded-lg">
          <AlertCircle size={18} />
          <p className="text-sm">Please add a title to continue</p>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        disabled={isLoading || !isComplete}
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
        ) : isComplete ? (
          <span className="flex items-center gap-2">
            <Lock size={18} />
            Secure Checkout
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <ShoppingBag size={18} />
            Complete Your Design
          </span>
        )}
      </Button>

      {/* Trust Badges */}
      <div className="mt-4 pt-4 border-t border-brand-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-brand-500">
          <Truck size={14} />
          <span>Free shipping on all Australian orders</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-brand-500">
          <ShieldCheck size={14} />
          <span>Secure payment powered by Stripe</span>
        </div>
      </div>
    </motion.div>
  );
}
