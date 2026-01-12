// src/components/create-soundwave/SoundWaveExportSection.tsx
// Example integration of export functionality for Sound Wave prints

"use client";

import { useCallback } from "react";
import ExportButton from "@/components/create/ExportButton";
import { SoundWaveCustomization, SoundWaveProductSelection } from "@/types";
import { generateSoundWaveSvg } from "@/lib/soundWaveSvgGenerator";
import { PrintSizeKey } from "@/lib/printExport";

interface SoundWaveExportSectionProps {
  customization: SoundWaveCustomization;
  product: SoundWaveProductSelection;
}

export default function SoundWaveExportSection({
  customization,
  product,
}: SoundWaveExportSectionProps) {
  // Map your product size to PrintSizeKey
  const getPrintSize = (): PrintSizeKey => {
    // Assuming product.size is "A4", "A3", or "A2"
    const sizeMap: Record<string, PrintSizeKey> = {
      A4: "A4",
      A3: "A3",
      A2: "A2",
    };
    return sizeMap[product.size] || "A3";
  };

  // Generate SVG callback for the export button
  const generateSvg = useCallback(() => {
    return generateSoundWaveSvg({
      customization,
      size: getPrintSize(),
    });
  }, [customization, product.size]);

  const hasAudio = customization.waveformData.length > 0;

  return (
    <div className="border-t border-stone-200 pt-6 mt-6">
      <h3 className="text-sm font-medium text-stone-700 mb-3">
        Print Export
      </h3>
      <p className="text-xs text-stone-500 mb-4">
        Download a high-resolution file for professional printing.
        {!hasAudio && " Upload audio first to export your custom waveform."}
      </p>
      
      <ExportButton
        generateSvg={generateSvg}
        productType="soundwave"
        selectedSize={getPrintSize()}
        disabled={!hasAudio}
      />
    </div>
  );
}

/**
 * USAGE EXAMPLE:
 * 
 * Add this to your Sound Wave creator page where you have access to
 * the customization and product state:
 * 
 * ```tsx
 * import SoundWaveExportSection from "@/components/create-soundwave/SoundWaveExportSection";
 * 
 * // In your component:
 * <SoundWaveExportSection 
 *   customization={customization} 
 *   product={product} 
 * />
 * ```
 * 
 * This will render an "Export Print File" button that:
 * 1. Opens a modal with quality options
 * 2. Generates the SVG at the selected size
 * 3. Sends to the API for high-res PNG conversion
 * 4. Downloads the file automatically
 */
