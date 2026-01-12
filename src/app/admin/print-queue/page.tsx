// src/app/admin/print-queue/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Printer,
  Download,
  CheckCircle,
  Clock,
  FileImage,
  Loader2,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

// Print queue item type
interface PrintQueueItem {
  id: string;
  customer: string;
  product: string;
  productType: string;
  size: string;
  frame: string;
  status: string;
  createdAt: string;
  customization: {
    title?: string;
    subtitle?: string;
    date?: string;
    [key: string]: unknown;
  };
  printFile?: string;
}

// Mock print queue - in production, filter orders with status "pending" or "printing"
const mockPrintQueue: PrintQueueItem[] = [
  {
    id: "ORD-001",
    customer: "Sarah Mitchell",
    product: "Sound Wave Art",
    productType: "soundwave",
    size: "A3",
    frame: "Black",
    status: "pending",
    createdAt: "2025-01-12T10:30:00Z",
    customization: {
      title: "Shake It Off",
      subtitle: "Taylor Swift",
    },
  },
  {
    id: "ORD-005",
    customer: "Lisa Anderson",
    product: "Australia Map",
    productType: "australiamap",
    size: "A3",
    frame: "Black",
    createdAt: "2025-01-11T11:00:00Z",
    status: "pending",
    customization: {
      title: "Our Adventures",
    },
  },
  {
    id: "ORD-002",
    customer: "James Wilson",
    product: "Star Map",
    productType: "starmap",
    size: "A2",
    frame: "Oak",
    status: "printing",
    createdAt: "2025-01-12T09:15:00Z",
    customization: {
      title: "The Night We Met",
      date: "2024-06-15",
    },
    printFile: "/exports/ORD-002-starmap-A2.png",
  },
];

const sizeOptions = ["A4", "A3", "A2"];

export default function PrintQueuePage() {
  const [queue, setQueue] = useState<PrintQueueItem[]>(mockPrintQueue);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [isBatchExporting, setIsBatchExporting] = useState(false);

  const pendingCount = queue.filter((item) => item.status === "pending").length;
  const printingCount = queue.filter((item) => item.status === "printing").length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === queue.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(queue.map((item) => item.id));
    }
  };

  const handleExport = async (item: PrintQueueItem, size?: string) => {
    setIsExporting(item.id);
    
    try {
      // Simulate export
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id
            ? {
                ...q,
                status: "printing",
                printFile: `/exports/${item.id}-${item.productType}-${size || item.size}.png`,
              }
            : q
        )
      );
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(null);
    }
  };

  const handleBatchExport = async () => {
    if (selectedItems.length === 0) return;
    
    setIsBatchExporting(true);
    
    for (const id of selectedItems) {
      const item = queue.find((q) => q.id === id);
      if (item && item.status === "pending") {
        await handleExport(item);
      }
    }
    
    setIsBatchExporting(false);
    setSelectedItems([]);
  };

  const markAsComplete = (id: string) => {
    setQueue((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Print Queue</h1>
          <p className="text-stone-500 mt-1">
            Generate and manage print files for orders
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg"
            title="Refresh"
          >
            <RefreshCw size={20} />
          </button>
          
          {selectedItems.length > 0 && (
            <button
              onClick={handleBatchExport}
              disabled={isBatchExporting}
              className="px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isBatchExporting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Exporting {selectedItems.length}...
                </>
              ) : (
                <>
                  <FileImage size={16} />
                  Export Selected ({selectedItems.length})
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-yellow-700">{pendingCount}</p>
              <p className="text-sm text-yellow-600">Pending Export</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Printer size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-blue-700">{printingCount}</p>
              <p className="text-sm text-blue-600">Ready to Print</p>
            </div>
          </div>
        </div>
      </div>

      {/* Queue list */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-3 bg-stone-50 border-b border-stone-200 flex items-center">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedItems.length === queue.length && queue.length > 0}
              onChange={selectAll}
              className="w-4 h-4 rounded border-stone-300 text-charcoal focus:ring-charcoal"
            />
            <span className="text-sm text-stone-600">Select All</span>
          </label>
        </div>

        {/* Items */}
        <div className="divide-y divide-stone-200">
          {queue.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`p-6 hover:bg-stone-50 transition-colors ${
                selectedItems.includes(item.id) ? "bg-brand-50" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                  className="mt-1 w-4 h-4 rounded border-stone-300 text-charcoal focus:ring-charcoal"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-charcoal">{item.id}</span>
                        <span
                          className={`
                            px-2 py-0.5 rounded-full text-xs font-medium
                            ${item.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                            }
                          `}
                        >
                          {item.status === "pending" ? "Pending" : "Ready"}
                        </span>
                      </div>
                      <p className="text-sm text-stone-600 mt-1">
                        {item.customer} • {item.product}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    {/* Size & Frame */}
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono bg-stone-100 px-2 py-0.5 rounded">
                          {item.size}
                        </span>
                        <span className="text-sm text-stone-500">{item.frame}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customization preview */}
                  <div className="mt-3 text-sm text-stone-600 bg-stone-50 rounded-lg px-3 py-2">
                    <span className="font-medium">{item.customization.title || "Untitled"}</span>
                    {item.customization.subtitle && (
                      <span className="text-stone-400"> — {item.customization.subtitle}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-3">
                    {item.status === "pending" ? (
                      <button
                        onClick={() => handleExport(item)}
                        disabled={isExporting === item.id}
                        className="px-4 py-2 bg-charcoal text-white text-sm rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isExporting === item.id ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <FileImage size={14} />
                            Generate Print File
                          </>
                        )}
                      </button>
                    ) : (
                      <>
                        <a
                          href={item.printFile}
                          download
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <Download size={14} />
                          Download PNG
                        </a>
                        <button
                          onClick={() => markAsComplete(item.id)}
                          className="px-4 py-2 text-stone-600 text-sm rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-2"
                        >
                          <CheckCircle size={14} />
                          Mark Complete
                        </button>
                      </>
                    )}

                    {/* Size override dropdown */}
                    {item.status === "pending" && (
                      <div className="relative ml-auto">
                        <select
                          defaultValue={item.size}
                          onChange={(e) => handleExport(item, e.target.value)}
                          disabled={isExporting === item.id}
                          className="appearance-none pl-3 pr-8 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
                        >
                          <option disabled>Export as...</option>
                          {sizeOptions.map((size) => (
                            <option key={size} value={size}>
                              Export {size}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {queue.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <p className="text-lg font-medium text-charcoal">All caught up!</p>
            <p className="text-stone-500 mt-1">No prints in the queue</p>
          </div>
        )}
      </div>
    </div>
  );
}