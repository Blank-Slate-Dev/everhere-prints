// src/components/create-soundwave/SoundWaveOrderSummary.tsx
"use client";

import { useState, RefObject } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SoundWaveCustomization, SoundWaveProductSelection } from "@/types";
import { calculateTotal, formatPrice, getSizeDetails } from "@/lib/pricing";
import { soundWaveStyles } from "@/lib/soundWaveConfig";
import Button from "@/components/ui/Button";
import { Lock, Truck, ShieldCheck } from "lucide-react";

interface SoundWaveOrderSummaryProps {
  customization: SoundWaveCustomization;
  product: SoundWaveProductSelection;
  previewRef?: RefObject<HTMLDivElement | null>;
  onCheckout?: () => Promise<void>;
  isLoading?: boolean;
}

export default function SoundWaveOrderSummary({
  customization,
  product,
  previewRef,
  onCheckout,
  isLoading: externalIsLoading,
}: SoundWaveOrderSummaryProps) {
  const router = useRouter();
  const [internalIsLoading, setInternalIsLoading] = useState(false);

  // Use external loading state if provided, otherwise use internal
  const isLoading = externalIsLoading !== undefined ? externalIsLoading : internalIsLoading;

  const sizeDetails = getSizeDetails(product.size);
  const styleConfig = soundWaveStyles.find((s) => s.id === customization.styleId) || soundWaveStyles[0];
  const total = calculateTotal(product.size, product.frame);
  
  // Sound wave prints require audio to be uploaded
  const isComplete = customization.waveformData.length > 0;

  // Capture preview image using html2canvas
  const capturePreviewImage = async (): Promise<string | undefined> => {
    if (!previewRef?.current) return undefined;

    try {
      // Dynamically import html2canvas to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      return canvas.toDataURL("image/jpeg", 0.85);
    } catch (error) {
      console.error("Failed to capture preview:", error);
      return undefined;
    }
  };

  const internalHandleCheckout = async () => {
    if (!isComplete) return;

    setInternalIsLoading(true);

    try {
      // Capture the preview image
      const previewImage = await capturePreviewImage();

      // Build product description
      const descriptionParts = [
        `Sound Wave Art - ${styleConfig.name}`,
        customization.songData ? `"${customization.songData.songName}" by ${customization.songData.artistName}` : customization.title,
        `${sizeDetails.name} Print (${sizeDetails.dimensions})`,
        product.frame.id !== "none" ? `with ${product.frame.name}` : "Print Only",
      ];

      // Build metadata for order
      const metadata: Record<string, string> = {
        product_type: "sound_wave",
        style_id: customization.styleId,
        style_name: styleConfig.name,
        title: customization.title || "",
        subtitle: customization.subtitle || "",
        date_text: customization.dateText || "",
        song_name: customization.songData?.songName || "",
        artist_name: customization.songData?.artistName || "",
        album_name: customization.songData?.albumName || "",
        audio_duration: customization.audioDuration.toString(),
        waveform_position: customization.waveformPosition.toString(),
        show_album_art: customization.showAlbumArt.toString(),
        show_artist_name: customization.showArtistName.toString(),
        show_album_name: customization.showAlbumName.toString(),
        show_duration: customization.showDuration.toString(),
        show_lyrics: customization.showLyrics.toString(),
        selected_lyrics: customization.selectedLyrics.join(" / "),
        size: product.size,
        frame: product.frame.id,
      };

      // Store order data for checkout page
      const orderData = {
        productType: "sound_wave",
        productName: "EverHere Prints - Sound Wave Art",
        productDescription: descriptionParts.filter(Boolean).join(" | "),
        size: product.size,
        frame: product.frame.id,
        frameName: product.frame.name,
        subtotal: total,
        shipping: 0,
        total: total,
        metadata,
        returnPath: "/create-soundwave",
        previewImage,
      };

      // Store in sessionStorage and navigate
      sessionStorage.setItem("checkoutOrder", JSON.stringify(orderData));
      router.push("/checkout");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setInternalIsLoading(false);
    }
  };

  // Use external checkout handler if provided, otherwise use internal
  const handleCheckout = onCheckout || internalHandleCheckout;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-charcoal mb-4">Order Summary</h3>

      {/* Line Items */}
      <div className="space-y-3 pb-4 border-b border-brand-100">
        <div className="flex justify-between text-sm">
          <span className="text-brand-600">
            Sound Wave Art - {styleConfig.name}
          </span>
        </div>
        {customization.songData && (
          <div className="text-sm text-brand-500">
            &quot;{customization.songData.songName}&quot; by {customization.songData.artistName}
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-brand-600">
            {sizeDetails.name} Print ({sizeDetails.dimensions})
          </span>
          <span className="font-medium text-charcoal">
            {formatPrice(sizeDetails.price)}
          </span>
        </div>

        {product.frame.price > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-brand-600">{product.frame.name}</span>
            <span className="font-medium text-charcoal">
              {formatPrice(product.frame.price)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-brand-600">Australian Delivery</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-4">
        <span className="text-lg font-semibold text-charcoal">Total</span>
        <span className="text-2xl font-bold text-charcoal">
          {formatPrice(total)}
        </span>
      </div>

      {/* Checkout Button */}
      <Button
        fullWidth
        size="lg"
        onClick={handleCheckout}
        disabled={!isComplete || isLoading}
        isLoading={isLoading}
        className="mt-2"
      >
        {isComplete ? (
          <>
            <Lock size={18} className="mr-2" />
            Secure Checkout
          </>
        ) : (
          "Upload Audio First"
        )}
      </Button>

      {/* Trust Indicators */}
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

      {/* Audio Warning */}
      {!isComplete && (
        <p className="mt-4 text-center text-sm text-brand-500">
          Please upload your audio file to complete your print.
        </p>
      )}
    </motion.div>
  );
}
