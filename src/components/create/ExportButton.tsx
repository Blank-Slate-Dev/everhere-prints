// src/components/create/ExportButton.tsx
// Export button for downloading high-resolution print files

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, Loader2, AlertCircle, FileImage, Info } from "lucide-react";
import { usePrintExport } from "@/hooks/usePrintExport";
import { PrintSizeKey, DPILevel, PRINT_DIMENSIONS } from "@/lib/printExport";

interface ExportButtonProps {
  generateSvg: () => string;
  productType: string;
  selectedSize: PrintSizeKey;
  disabled?: boolean;
  className?: string;
}

export default function ExportButton({
  generateSvg,
  productType,
  selectedSize,
  disabled = false,
  className = "",
}: ExportButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDpi, setSelectedDpi] = useState<DPILevel>("high");
  const [exportSuccess, setExportSuccess] = useState(false);
  
  const { 
    isExporting, 
    progress, 
    error, 
    exportAndDownload, 
    getExportInfo 
  } = usePrintExport();

  const exportInfo = getExportInfo(selectedSize, selectedDpi);

  const handleExport = async () => {
    setExportSuccess(false);
    
    try {
      const svgContent = generateSvg();
      
      const success = await exportAndDownload({
        svgContent,
        size: selectedSize,
        dpiLevel: selectedDpi,
        productType,
      });
      
      if (success) {
        setExportSuccess(true);
        setTimeout(() => {
          setShowModal(false);
          setExportSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  return (
    <>
      {/* Export Button */}
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled || isExporting}
        className={`
          flex items-center gap-2 px-4 py-2 
          bg-stone-100 hover:bg-stone-200 
          text-stone-700 font-medium rounded-lg
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        <Download size={18} />
        <span>Export Print File</span>
      </button>

      {/* Export Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => !isExporting && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-stone-100">
                <h3 className="text-lg font-semibold text-charcoal">
                  Export High-Resolution Print
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  Download a print-ready PNG file
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-5 space-y-5">
                {/* Size info */}
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-stone-600 mb-3">
                    <FileImage size={18} />
                    <span className="font-medium">Print Size: {selectedSize}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-stone-400">Dimensions</span>
                      <p className="font-mono text-stone-700">
                        {exportInfo.width} × {exportInfo.height} px
                      </p>
                    </div>
                    <div>
                      <span className="text-stone-400">Resolution</span>
                      <p className="font-mono text-stone-700">{exportInfo.dpi} DPI</p>
                    </div>
                    <div>
                      <span className="text-stone-400">Est. File Size</span>
                      <p className="font-mono text-stone-700">{exportInfo.estimatedFileSize}</p>
                    </div>
                    <div>
                      <span className="text-stone-400">Format</span>
                      <p className="font-mono text-stone-700">PNG</p>
                    </div>
                  </div>
                </div>

                {/* Quality selector */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Quality Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["standard", "high", "ultra"] as DPILevel[]).map((level) => {
                      const info = getExportInfo(selectedSize, level);
                      return (
                        <button
                          key={level}
                          onClick={() => setSelectedDpi(level)}
                          disabled={isExporting}
                          className={`
                            px-3 py-2 rounded-lg text-sm font-medium transition-colors
                            ${selectedDpi === level
                              ? "bg-charcoal text-white"
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                            }
                            disabled:opacity-50
                          `}
                        >
                          <div className="capitalize">{level}</div>
                          <div className="text-xs opacity-70 mt-0.5">
                            {info.dpi} DPI
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Info note */}
                <div className="flex gap-2 text-xs text-stone-500 bg-blue-50 rounded-lg p-3">
                  <Info size={14} className="flex-shrink-0 mt-0.5 text-blue-500" />
                  <p>
                    300 DPI (High) is recommended for professional printing. 
                    Ultra quality creates larger files but may improve fine details.
                  </p>
                </div>

                {/* Error message */}
                {error && (
                  <div className="flex gap-2 text-sm text-red-600 bg-red-50 rounded-lg p-3">
                    <AlertCircle size={18} className="flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                {/* Progress bar */}
                {isExporting && (
                  <div className="space-y-2">
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-charcoal"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-center text-stone-500">
                      Generating high-resolution file...
                    </p>
                  </div>
                )}

                {/* Success message */}
                {exportSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-lg p-3"
                  >
                    <Check size={18} />
                    <span className="font-medium">Download started!</span>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-stone-50 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isExporting}
                  className="flex-1 px-4 py-2.5 text-stone-600 font-medium rounded-lg hover:bg-stone-200 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting || exportSuccess}
                  className="flex-1 px-4 py-2.5 bg-charcoal text-white font-medium rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isExporting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Exporting...</span>
                    </>
                  ) : exportSuccess ? (
                    <>
                      <Check size={18} />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      <span>Download PNG</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
