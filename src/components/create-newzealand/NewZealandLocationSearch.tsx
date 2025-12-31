// src/components/create-newzealand/NewZealandLocationSearch.tsx
"use client";

import { useEffect, useRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { MapLocation } from "@/types";

interface NewZealandLocationSearchProps {
  onLocationSelect: (location: MapLocation) => void;
}

export default function NewZealandLocationSearch({
  onLocationSelect,
}: NewZealandLocationSearchProps) {
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
      types: "place,locality,neighborhood,address,poi,postcode",
      placeholder: "Search for a place in New Zealand...",
      limit: 5,
      countries: "nz", // New Zealand only
      bbox: [165.5, -47.5, 179.0, -34.0], // New Zealand bounding box
    });

    geocoder.addTo(geocoderContainerRef.current);

    geocoder.on("result", (e) => {
      const { center, place_name } = e.result;

      onLocationSelect({
        longitude: center[0],
        latitude: center[1],
        placeName: place_name,
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
        Location in New Zealand
      </label>
      <div ref={geocoderContainerRef} className="geocoder-container" />
      <p className="mt-2 text-xs text-brand-500">
        Search for any suburb, city, landmark, or postcode in New Zealand
      </p>
    </div>
  );
}