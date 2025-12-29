// src/components/create/MapPreview.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapLocation, MapStyle } from "@/types";
import { getMapStyleUrl } from "@/lib/mapStyles";

interface MapPreviewProps {
  location: MapLocation | null;
  style: MapStyle;
}

export default function MapPreview({ location, style }: MapPreviewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Already initialized

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("Mapbox access token is not set");
      return;
    }

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: getMapStyleUrl(style),
      center: location ? [location.longitude, location.latitude] : [151.2093, -33.8688], // Default to Sydney
      zoom: location ? location.zoom : 12,
      interactive: false,
      attributionControl: false,
      preserveDrawingBuffer: true, // Needed for export
    });

    map.on("load", () => {
      setIsLoaded(true);
    });

    mapRef.current = map;

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setIsLoaded(false);
    };
  }, []);

  // Update style
  useEffect(() => {
    if (!mapRef.current) return;
    
    mapRef.current.setStyle(getMapStyleUrl(style));
  }, [style]);

  // Update location
  useEffect(() => {
    if (!mapRef.current || !location) return;

    mapRef.current.flyTo({
      center: [location.longitude, location.latitude],
      zoom: location.zoom,
      duration: 2000,
      essential: true,
    });

    // Update or create marker
    if (markerRef.current) {
      markerRef.current.setLngLat([location.longitude, location.latitude]);
    } else {
      const markerElement = document.createElement("div");
      markerElement.innerHTML = `
        <div style="position: relative;">
          <div style="width: 12px; height: 12px; background-color: #9a8070; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
          <div style="position: absolute; inset: 0; width: 12px; height: 12px; background-color: #9a8070; border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.5;"></div>
        </div>
      `;

      markerRef.current = new mapboxgl.Marker({
        element: markerElement,
        anchor: "center",
      })
        .setLngLat([location.longitude, location.latitude])
        .addTo(mapRef.current);
    }
  }, [location]);

  return (
    <div className="absolute inset-0">
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        style={{ minHeight: "100%" }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-50">
          <div className="w-6 h-6 border-2 border-brand-300 border-t-brand-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}