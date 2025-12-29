// src/components/create/MapPreview.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapLocation, MapStyle } from "@/types";
import { getMapStyleUrl } from "@/lib/mapStyles";

// Sydney Harbour Bridge coordinates
const DEFAULT_CENTER: [number, number] = [151.2108, -33.8523];
const DEFAULT_ZOOM = 12; // City level

interface MapPreviewProps {
  location: MapLocation | null;
  style: MapStyle;
  zoom: number;
}

export default function MapPreview({ location, style, zoom }: MapPreviewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper function to add marker
  const addMarker = (map: mapboxgl.Map, loc: MapLocation) => {
    if (markerRef.current) {
      markerRef.current.remove();
    }

    const markerElement = document.createElement("div");
    markerElement.innerHTML = `
      <div style="position: relative;">
        <div style="width: 14px; height: 14px; background-color: #9a8070; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.35);"></div>
      </div>
    `;

    markerRef.current = new mapboxgl.Marker({
      element: markerElement,
      anchor: "center",
    })
      .setLngLat([loc.longitude, loc.latitude])
      .addTo(map);
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("Mapbox access token is not set");
      return;
    }

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: getMapStyleUrl(style),
      center: location ? [location.longitude, location.latitude] : DEFAULT_CENTER,
      zoom: location ? zoom : DEFAULT_ZOOM,
      interactive: false,
      attributionControl: false,
      preserveDrawingBuffer: true,
    });

    map.on("load", () => {
      setIsLoaded(true);
      if (location) {
        addMarker(map, location);
      }
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
    
    mapRef.current.once("style.load", () => {
      if (location && mapRef.current) {
        addMarker(mapRef.current, location);
      }
    });
  }, [style, location]);

  // Update location - Smooth fly with zoom-out/zoom-in effect
  useEffect(() => {
    if (!mapRef.current || !location) return;

    mapRef.current.flyTo({
      center: [location.longitude, location.latitude],
      zoom: zoom,
      speed: 0.8,
      curve: 1.4,
      duration: 2200, // 2.2 seconds
      essential: true,
    });

    if (isLoaded) {
      addMarker(mapRef.current, location);
    }
  }, [location, isLoaded]);

  // Update zoom separately (quick transition)
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.easeTo({
      zoom: zoom,
      duration: 200,
    });
  }, [zoom]);

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