// src/components/create/LocationSearch.tsx
"use client";

import { useEffect, useRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { MapLocation } from "@/types";

interface LocationSearchProps {
  onLocationSelect: (location: MapLocation) => void;
}

export default function LocationSearch({
  onLocationSelect,
}: LocationSearchProps) {
  const geocoderContainerRef = useRef<HTMLDivElement>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);

  useEffect(() => {
    if (!geocoderContainerRef.current || geocoderRef.current) return;

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("Mapbox access token is not set");
      return;
    }

    const geocoder = new MapboxGeocoder({
      accessToken,
      types: "place,locality,neighborhood,address,poi",
      placeholder: "Search for a location...",
      limit: 5,
    });

    geocoder.addTo(geocoderContainerRef.current);

    geocoder.on("result", (e) => {
      const { center, place_name } = e.result;
      onLocationSelect({
        longitude: center[0],
        latitude: center[1],
        placeName: place_name,
        zoom: 14,
      });
    });

    geocoderRef.current = geocoder;

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.clear();
      }
    };
  }, [onLocationSelect]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-brand-700 mb-2">
        Location
      </label>
      <div ref={geocoderContainerRef} className="geocoder-container" />
      <p className="mt-2 text-xs text-brand-500">
        Search for any address, landmark, or city
      </p>
    </div>
  );
}