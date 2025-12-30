// src/app/calibrate/page.tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { MapPin, Copy, Check, RotateCcw, CheckCircle } from "lucide-react";
import {
  australiaMapColors,
  getAustraliaMapColor,
} from "@/lib/australiaMapConfig";

// Australia's geographic bounds
const GEO_BOUNDS = {
  west: 113.15,
  east: 153.64,
  north: -10.68,
  south: -43.64,
};

// All calibration points
const calibrationPoints = [
  { id: "steepPoint", name: "Steep Point (West)", lat: -26.15, lng: 113.15, color: "#DC2626", isExtreme: true },
  { id: "capeByron", name: "Cape Byron (East)", lat: -28.64, lng: 153.64, color: "#16A34A", isExtreme: true },
  { id: "capeYork", name: "Cape York (North)", lat: -10.68, lng: 142.53, color: "#EA580C", isExtreme: true },
  { id: "hobart", name: "Hobart (Tasmania)", lat: -42.88, lng: 147.33, color: "#7C3AED", isExtreme: true },
  { id: "perth", name: "Perth", lat: -31.95, lng: 115.86, color: "#EF4444", isExtreme: false },
  { id: "darwin", name: "Darwin", lat: -12.46, lng: 130.85, color: "#F59E0B", isExtreme: false },
  { id: "brisbane", name: "Brisbane", lat: -27.47, lng: 153.03, color: "#10B981", isExtreme: false },
  { id: "melbourne", name: "Melbourne", lat: -37.81, lng: 144.96, color: "#3B82F6", isExtreme: false },
  { id: "sydney", name: "Sydney", lat: -33.87, lng: 151.21, color: "#EC4899", isExtreme: false },
  { id: "adelaide", name: "Adelaide", lat: -34.93, lng: 138.60, color: "#8B5CF6", isExtreme: false },
  { id: "cairns", name: "Cairns", lat: -16.92, lng: 145.78, color: "#06B6D4", isExtreme: false },
  { id: "alice", name: "Alice Springs", lat: -23.70, lng: 133.88, color: "#F97316", isExtreme: false },
];

// Default starting positions
const defaultPinPositions: Record<string, { x: number; y: number }> = {
  steepPoint: { x: 5, y: 48 },
  capeByron: { x: 95, y: 52 },
  capeYork: { x: 68, y: 5 },
  hobart: { x: 78, y: 92 },
  perth: { x: 12, y: 58 },
  darwin: { x: 42, y: 12 },
  brisbane: { x: 92, y: 45 },
  melbourne: { x: 75, y: 75 },
  sydney: { x: 88, y: 63 },
  adelaide: { x: 58, y: 68 },
  cairns: { x: 75, y: 22 },
  alice: { x: 48, y: 42 },
};

type PinPositions = Record<string, { x: number; y: number }>;
type AllColorPositions = Record<string, PinPositions>;

const STORAGE_KEY = "australia-map-calibration-v2";

export default function CalibratePage() {
  const [selectedColorId, setSelectedColorId] = useState("blue");
  const [allColorPositions, setAllColorPositions] = useState<AllColorPositions>({});
  const [calibratedColors, setCalibratedColors] = useState<Set<string>>(new Set());
  const [yOffset, setYOffset] = useState(0);
  const [draggingPin, setDraggingPin] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const colorConfig = getAustraliaMapColor(selectedColorId);

  // Load saved positions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAllColorPositions(parsed.positions || {});
        setCalibratedColors(new Set(parsed.calibrated || []));
        setYOffset(parsed.yOffset || 0);
      } catch (e) {
        console.error("Failed to load saved calibration:", e);
      }
    }
  }, []);

  // Save to localStorage whenever positions change
  useEffect(() => {
    const data = {
      positions: allColorPositions,
      calibrated: Array.from(calibratedColors),
      yOffset,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [allColorPositions, calibratedColors, yOffset]);

  // Get pin positions for current color (or defaults)
  const currentPinPositions = allColorPositions[selectedColorId] || { ...defaultPinPositions };

  // Update positions for current color
  const updateCurrentPositions = (newPositions: PinPositions) => {
    setAllColorPositions(prev => ({
      ...prev,
      [selectedColorId]: newPositions,
    }));
  };

  // Mark current color as calibrated
  const markAsCalibrated = () => {
    setCalibratedColors(prev => new Set([...prev, selectedColorId]));
  };

  // Calculate bounds from extreme points
  const calculateBounds = useCallback((positions: PinPositions) => {
    const steepPoint = positions.steepPoint || defaultPinPositions.steepPoint;
    const capeByron = positions.capeByron || defaultPinPositions.capeByron;
    const capeYork = positions.capeYork || defaultPinPositions.capeYork;
    const hobart = positions.hobart || defaultPinPositions.hobart;

    const steepPointRelX = (calibrationPoints[0].lng - GEO_BOUNDS.west) / (GEO_BOUNDS.east - GEO_BOUNDS.west);
    const capeByronRelX = (calibrationPoints[1].lng - GEO_BOUNDS.west) / (GEO_BOUNDS.east - GEO_BOUNDS.west);
    const capeYorkRelY = (calibrationPoints[2].lat - GEO_BOUNDS.north) / (GEO_BOUNDS.south - GEO_BOUNDS.north);
    const hobartRelY = (calibrationPoints[3].lat - GEO_BOUNDS.north) / (GEO_BOUNDS.south - GEO_BOUNDS.north);

    const width = (capeByron.x - steepPoint.x) / (capeByronRelX - steepPointRelX);
    const left = steepPoint.x - steepPointRelX * width;
    const right = left + width;

    const height = (hobart.y - capeYork.y) / (hobartRelY - capeYorkRelY);
    const top = capeYork.y - capeYorkRelY * height;
    const bottom = top + height;

    return {
      left: Math.round(left * 10) / 10,
      right: Math.round(right * 10) / 10,
      top: Math.round(top * 10) / 10,
      bottom: Math.round(bottom * 10) / 10,
    };
  }, []);

  const bounds = calculateBounds(currentPinPositions);

  // Handle drag
  const handleDragStart = (pinId: string, clientX: number, clientY: number) => {
    setDraggingPin(pinId);
    updatePinPosition(pinId, clientX, clientY);
  };

  const updatePinPosition = (pinId: string, clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    updateCurrentPositions({
      ...currentPinPositions,
      [pinId]: {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      },
    });
  };

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!draggingPin) return;
      updatePinPosition(draggingPin, clientX, clientY);
    },
    [draggingPin, currentPinPositions]
  );

  const handleDragEnd = () => {
    setDraggingPin(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseDown = (pinId: string, e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(pinId, e.clientX, e.clientY);
  };

  const handleTouchStart = (pinId: string, e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleDragStart(pinId, e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const resetCurrentColor = () => {
    updateCurrentPositions({ ...defaultPinPositions });
    setCalibratedColors(prev => {
      const newSet = new Set(prev);
      newSet.delete(selectedColorId);
      return newSet;
    });
  };

  const resetAll = () => {
    setAllColorPositions({});
    setCalibratedColors(new Set());
    setYOffset(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Generate config for current color with ALL pin positions
  const generateCurrentConfig = () => {
    const positions = currentPinPositions;
    const b = bounds;
    
    const pinLines = calibrationPoints.map(point => {
      const pos = positions[point.id] || defaultPinPositions[point.id];
      return `      ${point.id}: { x: ${pos.x.toFixed(1)}, y: ${pos.y.toFixed(1)} }, // ${point.name}`;
    }).join('\n');

    return `  ${selectedColorId}: {
    bounds: { left: ${b.left}, right: ${b.right}, top: ${b.top}, bottom: ${b.bottom} },
    pins: {
${pinLines}
    },
  },`;
  };

  const copyCurrentConfig = () => {
    navigator.clipboard.writeText(generateCurrentConfig());
    markAsCalibrated();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate full config for all calibrated maps
  const generateAllConfig = () => {
    const mapConfigs: string[] = [];
    
    australiaMapColors.forEach(color => {
      const positions = allColorPositions[color.id];
      if (positions) {
        const b = calculateBounds(positions);
        
        const pinLines = calibrationPoints.map(point => {
          const pos = positions[point.id] || defaultPinPositions[point.id];
          return `      ${point.id}: { x: ${pos.x.toFixed(1)}, y: ${pos.y.toFixed(1)} },`;
        }).join('\n');

        mapConfigs.push(`  ${color.id}: {
    bounds: { left: ${b.left}, right: ${b.right}, top: ${b.top}, bottom: ${b.bottom} },
    pins: {
${pinLines}
    },
  },`);
      }
    });

    return `// Australia Map Calibration Data
// Generated from calibration tool

const Y_OFFSET = ${yOffset};

const mapCalibrationData = {
${mapConfigs.join('\n')}
};

export default mapCalibrationData;`;
  };

  const copyAllConfig = () => {
    navigator.clipboard.writeText(generateAllConfig());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PIN_SIZE = 28;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">
          Per-Map Pin Calibration
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Calibrate each map color separately. Exports ALL pin positions for each map.
        </p>

        {/* Color Selector with Calibration Status */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Select Map Color:</span>
            <span className="text-sm text-gray-500">
              {calibratedColors.size} / {australiaMapColors.length} calibrated
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {australiaMapColors.map((color) => {
              const isCalibrated = calibratedColors.has(color.id);
              const isSelected = selectedColorId === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColorId(color.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-gray-900 text-white"
                      : isCalibrated
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {color.name}
                  {isCalibrated && !isSelected && (
                    <CheckCircle size={12} className="inline ml-1 text-green-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <div className="bg-white rounded-xl p-4 flex-1 max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Y Offset (global)</label>
              <span className="text-sm font-mono bg-gray-100 px-2 py-0.5 rounded">{yOffset}</span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              value={yOffset}
              onChange={(e) => setYOffset(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Labels</label>
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-3 py-1 rounded-lg text-sm ${showLabels ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}
            >
              {showLabels ? 'On' : 'Off'}
            </button>
          </div>

          <button
            onClick={resetCurrentColor}
            className="bg-white rounded-xl p-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <RotateCcw size={16} />
            <span className="text-sm font-medium">Reset This Map</span>
          </button>
        </div>

        {/* Map with Pins */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">{colorConfig.name}</h2>
            {calibratedColors.has(selectedColorId) && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle size={16} />
                Calibrated
              </span>
            )}
          </div>

          <div
            ref={containerRef}
            className="relative aspect-square w-full select-none touch-none cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
          >
            <Image
              src={colorConfig.image}
              alt={colorConfig.name}
              fill
              className="object-contain pointer-events-none"
              priority
              draggable={false}
            />

            {calibrationPoints.map((point) => {
              const pos = currentPinPositions[point.id] || defaultPinPositions[point.id];
              const isBeingDragged = draggingPin === point.id;
              const pinSize = point.isExtreme ? PIN_SIZE : PIN_SIZE - 4;
              
              return (
                <div
                  key={point.id}
                  className={`absolute z-20 transition-transform duration-75 ${
                    isBeingDragged ? "z-30" : "hover:scale-110"
                  }`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                >
                  <div 
                    className="cursor-grab active:cursor-grabbing"
                    style={{
                      position: 'absolute',
                      left: `-${pinSize / 2}px`,
                      top: `-${pinSize}px`,
                    }}
                    onMouseDown={(e) => handleMouseDown(point.id, e)}
                    onTouchStart={(e) => handleTouchStart(point.id, e)}
                  >
                    <div className="relative">
                      <MapPin
                        size={pinSize}
                        style={{ color: point.color, fill: point.color }}
                        className="drop-shadow-lg"
                        strokeWidth={point.isExtreme ? 2.5 : 2}
                      />
                      {point.isExtreme && (
                        <div 
                          className="absolute -inset-1 rounded-full border-2 border-dashed animate-pulse"
                          style={{ borderColor: point.color }}
                        />
                      )}
                    </div>
                    
                    {showLabels && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-sm"
                        style={{ backgroundColor: point.color, color: "white", opacity: isBeingDragged ? 1 : 0.9 }}
                      >
                        {point.name}
                      </div>
                    )}
                  </div>

                  <div 
                    className="absolute w-1 h-1 rounded-full bg-black opacity-50"
                    style={{ left: '-2px', top: '-2px' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Live Pin Positions Table */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Pin Positions:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
              {calibrationPoints.map((point) => {
                const pos = currentPinPositions[point.id] || defaultPinPositions[point.id];
                return (
                  <div 
                    key={point.id} 
                    className={`p-2 rounded ${point.isExtreme ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: point.color }} />
                      <span className="font-medium truncate">{point.name}</span>
                    </div>
                    <div className="font-mono text-gray-600">
                      x: {pos.x.toFixed(1)}, y: {pos.y.toFixed(1)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Output - Current Map */}
        <div className="mt-8 bg-white rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Full Config for {colorConfig.name}:</h2>
            <button
              onClick={copyCurrentConfig}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              Copy & Mark Done
            </button>
          </div>
          
          <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-64 overflow-y-auto">
{generateCurrentConfig()}
          </pre>
        </div>

        {/* Export All */}
        {calibratedColors.size > 0 && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-green-800">Export All Calibrated Maps</h2>
                <p className="text-sm text-green-600">{calibratedColors.size} maps with full pin data</p>
              </div>
              <button
                onClick={copyAllConfig}
                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Copy size={14} />
                Copy Full Config
              </button>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {australiaMapColors.map(color => (
                <span
                  key={color.id}
                  className={`px-2 py-0.5 rounded text-xs ${
                    calibratedColors.has(color.id)
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {color.name}
                </span>
              ))}
            </div>

            <details className="text-sm">
              <summary className="cursor-pointer text-green-700 hover:text-green-900 font-medium">
                Preview full export...
              </summary>
              <pre className="mt-2 bg-white p-4 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto border border-green-200">
{generateAllConfig()}
              </pre>
            </details>
          </div>
        )}

        {/* Reset All */}
        <div className="mt-6 text-center">
          <button
            onClick={resetAll}
            className="text-sm text-red-600 hover:text-red-800 underline"
          >
            Reset All Calibrations
          </button>
        </div>
      </div>
    </div>
  );
}