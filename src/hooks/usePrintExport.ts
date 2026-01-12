// src/hooks/usePrintExport.ts
// React hook for exporting prints at high resolution

import { useState, useCallback } from "react";
import { PrintSizeKey, DPILevel, PRINT_DIMENSIONS, DPI_SETTINGS, estimateFileSize } from "@/lib/printExport";

interface ExportOptions {
  svgContent: string;
  size: PrintSizeKey;
  dpiLevel?: DPILevel;
  productType?: string;
  filename?: string;
}

interface ExportState {
  isExporting: boolean;
  progress: number;
  error: string | null;
}

interface ExportResult {
  success: boolean;
  blob?: Blob;
  filename?: string;
  dimensions?: {
    width: number;
    height: number;
    dpi: number;
  };
  error?: string;
}

export function usePrintExport() {
  const [state, setState] = useState<ExportState>({
    isExporting: false,
    progress: 0,
    error: null,
  });

  /**
   * Export print to high-resolution PNG
   */
  const exportPrint = useCallback(async (options: ExportOptions): Promise<ExportResult> => {
    const { svgContent, size, dpiLevel = "high", productType = "print", filename } = options;

    setState({ isExporting: true, progress: 10, error: null });

    try {
      // Validate SVG content
      if (!svgContent || !svgContent.includes("<svg")) {
        throw new Error("Invalid SVG content");
      }

      setState(prev => ({ ...prev, progress: 30 }));

      // Send to export API
      const response = await fetch("/api/export/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          svgContent,
          size,
          dpiLevel,
          productType,
          filename,
        }),
      });

      setState(prev => ({ ...prev, progress: 70 }));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Export failed: ${response.status}`);
      }

      // Get the PNG blob
      const blob = await response.blob();
      
      // Extract metadata from headers
      const exportFilename = response.headers.get("Content-Disposition")
        ?.match(/filename="(.+)"/)?.[1] || `print-${size}.png`;
      
      const dimensions = {
        width: parseInt(response.headers.get("X-Print-Width") || "0"),
        height: parseInt(response.headers.get("X-Print-Height") || "0"),
        dpi: parseInt(response.headers.get("X-Print-DPI") || "300"),
      };

      setState({ isExporting: false, progress: 100, error: null });

      return {
        success: true,
        blob,
        filename: exportFilename,
        dimensions,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Export failed";
      setState({ isExporting: false, progress: 0, error: errorMessage });
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, []);

  /**
   * Export and trigger browser download
   */
  const exportAndDownload = useCallback(async (options: ExportOptions): Promise<boolean> => {
    const result = await exportPrint(options);
    
    if (result.success && result.blob) {
      // Create download link
      const url = URL.createObjectURL(result.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = result.filename || "print.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    }
    
    return false;
  }, [exportPrint]);

  /**
   * Get export info for a given size
   */
  const getExportInfo = useCallback((size: PrintSizeKey, dpiLevel: DPILevel = "high") => {
    const dpi = DPI_SETTINGS[dpiLevel];
    const baseDimensions = PRINT_DIMENSIONS[size];
    
    // Recalculate for different DPI if needed
    const width = Math.round((baseDimensions.width / 300) * dpi);
    const height = Math.round((baseDimensions.height / 300) * dpi);
    
    return {
      size,
      dpi,
      dpiLevel,
      width,
      height,
      estimatedFileSize: estimateFileSize(width, height),
      aspectRatio: (width / height).toFixed(4),
    };
  }, []);

  return {
    ...state,
    exportPrint,
    exportAndDownload,
    getExportInfo,
    // Expose constants for UI
    availableSizes: Object.keys(PRINT_DIMENSIONS) as PrintSizeKey[],
    availableDpiLevels: Object.keys(DPI_SETTINGS) as DPILevel[],
  };
}
