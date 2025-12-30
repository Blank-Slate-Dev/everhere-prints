// src/app/calibrate/page.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { MapPin, Copy, Check, RotateCcw } from "lucide-react";
import {
  australiaMapColors,
  getAustraliaMapColor,
} from "@/lib/australiaMapConfig";

// Australia's geographic bounds
const GEO_BOUNDS = {
  west: 113.15,
  east: 153.64,
  north: -10.68,
  south: -43.64, // Extended south for Tasmania
};

// All calibration points - ALL are draggable
const calibrationPoints = [
  // Extreme points (for bounds calculation)
  { id: "steepPoint", name: "Steep Point (West)", lat: -26.15, lng: 113.15, color: "#DC2626", isExtreme: true },
  { id: "capeByron", name: "Cape Byron (East)", lat: -28.64, lng: 153.64, color: "#16A34A", isExtreme: true },
  { id: "capeYork", name: "Cape York (North)", lat: -10.68, lng: 142.53, color: "#EA580C", isExtreme: true },
  { id: "hobart", name: "Hobart (Tasmania)", lat: -42.88, lng: 147.33, color: "#7C3AED", isExtreme: true },
  
  // Major cities
  { id: "perth", name: "Perth", lat: -31.95, lng: 115.86, color: "#EF4444", isExtreme: false },
  { id: "darwin", name: "Darwin", lat: -12.46, lng: 130.85, color: "#F59E0B", isExtreme: false },
  { id: "brisbane", name: "Brisbane", lat: -27.47, lng: 153.03, color: "#10B981", isExtreme: false },
  { id: "melbourne", name: "Melbourne", lat: -37.81, lng: 144.96, color: "#3B82F6", isExtreme: false },
  { id: "sydney", name: "Sydney", lat: -33.87, lng: 151.21, color: "#EC4899", isExtreme: false },
  { id: "adelaide", name: "Adelaide", lat: -34.93, lng: 138.60, color: "#8B5CF6", isExtreme: false },
  { id: "cairns", name: "Cairns", lat: -16.92, lng: 145.78, color: "#06B6D4", isExtreme: false },
  { id: "alice", name: "Alice Springs", lat: -23.70, lng: 133.88, color: "#F97316", isExtreme: false },
];

// Default starting positions for pins (percentage) - rough estimates
const defaultPinPositions: Record<string, { x: number; y: number }> = {
  // Extreme points
  steepPoint: { x: 5, y: 48 },
  capeByron: { x: 95, y: 52 },
  capeYork: { x: 68, y: 5 },
  hobart: { x: 78, y: 92 },
  // Major cities
  perth: { x: 12, y: 58 },
  darwin: { x: 42, y: 12 },
  brisbane: { x: 92, y: 45 },
  melbourne: { x: 75, y: 75 },
  sydney: { x: 88, y: 63 },
  adelaide: { x: 58, y: 68 },
  cairns: { x: 75, y: 22 },
  alice: { x: 48, y: 42 },
};

export default function CalibratePage() {
  const [selectedColorId, setSelectedColorId] = useState("blue");
  const [pinPositions, setPinPositions] = useState<Record<string, { x: number; y: number }>>(
    () => ({ ...defaultPinPositions })
  );
  const [yOffset, setYOffset] = useState(0);
  const [draggingPin, setDraggingPin] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const colorConfig = getAustraliaMapColor(selectedColorId);

  // Calculate bounds from extreme points
  const calculateBounds = useCallback(() => {
    const steepPoint = pinPositions.steepPoint;
    const capeByron = pinPositions.capeByron;
    const capeYork = pinPositions.capeYork;
    const hobart = pinPositions.hobart;

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
  }, [pinPositions]);

  const bounds = calculateBounds();

  // Handle drag start - immediately snap pin tip to cursor
  const handleDragStart = (pinId: string, clientX: number, clientY: number) => {
    setDraggingPin(pinId);
    // Immediately update position so pin tip is at cursor
    updatePinPosition(pinId, clientX, clientY);
  };

  // Update pin position - pin TIP will be exactly at cursor position
  const updatePinPosition = (pinId: string, clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setPinPositions((prev) => ({
      ...prev,
      [pinId]: {
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      },
    }));
  };

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!draggingPin) return;
      updatePinPosition(draggingPin, clientX, clientY);
    },
    [draggingPin]
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

  const resetPins = () => {
    setPinPositions({ ...defaultPinPositions });
    setYOffset(0);
  };

  const copyConfig = () => {
    const configText = `${selectedColorId}: { left: ${bounds.left}, right: ${bounds.right}, top: ${bounds.top}, bottom: ${bounds.bottom} },`;
    navigator.clipboard.writeText(configText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAllConfig = () => {
    const allBounds = australiaMapColors.map(color => 
      `  ${color.id}: { left: ${bounds.left}, right: ${bounds.right}, top: ${bounds.top}, bottom: ${bounds.bottom} },`
    ).join('\n');
    const fullConfig = `const imageBounds: Record<string, ImageBounds> = {\n${allBounds}\n};\n\n// Y Offset to apply in coordsToImagePosition:\nconst Y_OFFSET = ${yOffset};`;
    navigator.clipboard.writeText(fullConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pin size for calculations
  const PIN_SIZE = 28;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">
          Full Pin Calibration Tool
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Drag ALL 12 pins to their correct locations. Extreme points (outlined) set the bounds.
        </p>

        {/* Color Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {australiaMapColors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColorId(color.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedColorId === color.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {/* Y Offset Control */}
          <div className="bg-white rounded-xl p-4 flex-1 max-w-xs">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Y Offset</label>
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

          {/* Toggle Labels */}
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Labels</label>
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-3 py-1 rounded-lg text-sm ${showLabels ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}
            >
              {showLabels ? 'On' : 'Off'}
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={resetPins}
            className="bg-white rounded-xl p-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <RotateCcw size={16} />
            <span className="text-sm font-medium">Reset</span>
          </button>
        </div>

        {/* Map with All Draggable Pins */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-2xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-square w-full select-none touch-none cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Map Image */}
            <Image
              src={colorConfig.image}
              alt={colorConfig.name}
              fill
              className="object-contain pointer-events-none"
              priority
              draggable={false}
            />

            {/* All Draggable Pins */}
            {calibrationPoints.map((point) => {
              const pos = pinPositions[point.id];
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
                  {/* 
                    Pin wrapper - the pin tip is positioned exactly at the parent's origin (0,0)
                    We offset the visual pin upward and leftward so its tip is at origin
                  */}
                  <div 
                    className="cursor-grab active:cursor-grabbing"
                    style={{
                      position: 'absolute',
                      // Offset so pin TIP is at (0,0) - move left by half width, up by full height
                      left: `-${pinSize / 2}px`,
                      top: `-${pinSize}px`,
                    }}
                    onMouseDown={(e) => handleMouseDown(point.id, e)}
                    onTouchStart={(e) => handleTouchStart(point.id, e)}
                  >
                    {/* Pin with different style for extreme points */}
                    <div className="relative">
                      <MapPin
                        size={pinSize}
                        style={{ 
                          color: point.color, 
                          fill: point.color,
                        }}
                        className="drop-shadow-lg"
                        strokeWidth={point.isExtreme ? 2.5 : 2}
                      />
                      {/* Ring around extreme points */}
                      {point.isExtreme && (
                        <div 
                          className="absolute -inset-1 rounded-full border-2 border-dashed animate-pulse"
                          style={{ borderColor: point.color }}
                        />
                      )}
                    </div>
                    
                    {/* Label */}
                    {showLabels && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-sm"
                        style={{ 
                          backgroundColor: point.color, 
                          color: "white",
                          opacity: isBeingDragged ? 1 : 0.9,
                        }}
                      >
                        {point.name}
                      </div>
                    )}
                  </div>

                  {/* Small dot at exact position for reference */}
                  <div 
                    className="absolute w-1 h-1 rounded-full bg-black opacity-50"
                    style={{
                      left: '-2px',
                      top: '-2px',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {calibrationPoints.map((point) => (
                <div key={point.id} className="flex items-center gap-1.5">
                  <MapPin 
                    size={12} 
                    style={{ color: point.color, fill: point.color }} 
                    strokeWidth={point.isExtreme ? 3 : 2}
                  />
                  <span className={point.isExtreme ? "font-semibold" : ""}>
                    {point.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output Config */}
        <div className="mt-8 bg-white rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Calculated Bounds:</h2>
            <div className="flex gap-2">
              <button
                onClick={copyConfig}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                Copy This
              </button>
              <button
                onClick={copyAllConfig}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Copy size={14} />
                Copy Full Config
              </button>
            </div>
          </div>
          
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`${selectedColorId}: { left: ${bounds.left}, right: ${bounds.right}, top: ${bounds.top}, bottom: ${bounds.bottom} },

// Y_OFFSET = ${yOffset}`}
          </pre>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Tips:</strong>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              <li><strong>Extreme points</strong> (dashed rings) set the bounds - position these first</li>
              <li><strong>City pins</strong> verify accuracy - they should land correctly after extremes are set</li>
              <li><strong>Y Offset</strong> shifts ALL pins up/down if there&apos;s a consistent vertical error</li>
              <li><strong>Copy Full Config</strong> applies these bounds to all colors (fine-tune each separately)</li>
            </ul>
          </div>
        </div>

        {/* Debug: Pin Positions */}
        <div className="mt-6 bg-white rounded-xl p-6 max-w-2xl mx-auto">
          <h2 className="font-semibold mb-3">Pin Positions:</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-xs font-mono">
            {calibrationPoints.map((point) => {
              const pos = pinPositions[point.id];
              return (
                <div 
                  key={point.id} 
                  className={`p-2 rounded flex items-center gap-1.5 ${point.isExtreme ? 'bg-amber-50 border border-amber-200' : 'bg-gray-100'}`}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: point.color }}
                  />
                  <span className="truncate">{point.id}:</span>
                  <span className="text-gray-600">{pos.x.toFixed(0)},{pos.y.toFixed(0)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}