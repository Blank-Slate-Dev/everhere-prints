// src/lib/bscStars.ts
// BSC5 (Bright Star Catalog) loader with ~9000 stars

export type BscStarRaw = {
  RA: string;   // "00h 08m 23.3s"
  Dec: string;  // "+29° 05′ 26″"
  V: string;    // "2.06" (visual magnitude)
  HR?: string;  // Harvard Revised number
  K?: string;   // Temperature in Kelvin
  N?: string;   // Common name (optional)
  B?: string;   // Bayer designation (optional)
  C?: string;   // Constellation (optional)
  F?: string;   // Flamsteed number (optional)
};

export type Star = {
  id: string;
  ra: number;        // Right Ascension in HOURS (0-24) for compatibility with renderer
  dec: number;       // Declination in degrees (-90 to +90)
  mag: number;       // Visual magnitude (smaller = brighter)
  name?: string;     // Common or Bayer name
  tempK?: number;    // Temperature in Kelvin for color
};

/**
 * Parse HMS (hours, minutes, seconds) to decimal hours
 * "00h 08m 23.3s" -> 0.1398 hours
 */
function parseHmsToHours(hms: string): number {
  const m = hms.trim().match(/^(\d+)h\s+(\d+)m\s+([\d.]+)s$/);
  if (!m) return NaN;
  const h = Number(m[1]);
  const min = Number(m[2]);
  const s = Number(m[3]);
  return h + min / 60 + s / 3600;
}

/**
 * Parse DMS (degrees, arcminutes, arcseconds) to decimal degrees
 * "+29° 05′ 26″" -> 29.0906 degrees
 * "-00° 30′ 11″" -> -0.5031 degrees
 */
function parseDmsToDeg(dms: string): number {
  const m = dms.trim().match(/^([+-])?(\d+)°\s+(\d+)′\s+(\d+)″$/);
  if (!m) return NaN;
  const sign = m[1] === "-" ? -1 : 1;
  const deg = Number(m[2]);
  const min = Number(m[3]);
  const sec = Number(m[4]);
  return sign * (deg + min / 60 + sec / 3600);
}

// Cache for loaded stars
let cachedStars: Star[] | null = null;
let loadingPromise: Promise<Star[]> | null = null;

/**
 * Load BSC stars from the JSON catalog.
 * Stars are cached after first load.
 * 
 * @param options.maxMag - Maximum magnitude to include (default: 6.5, roughly naked-eye limit)
 * @returns Promise resolving to array of Star objects
 */
export async function loadBscStars(options?: { maxMag?: number }): Promise<Star[]> {
  const maxMag = options?.maxMag ?? 6.5;

  // Return cached if available and matches criteria
  // (For simplicity, we cache all stars up to mag 6.5 and filter client-side if needed)
  if (cachedStars) {
    return maxMag >= 6.5 
      ? cachedStars 
      : cachedStars.filter(s => s.mag <= maxMag);
  }

  // If already loading, wait for that promise
  if (loadingPromise) {
    const stars = await loadingPromise;
    return maxMag >= 6.5 
      ? stars 
      : stars.filter(s => s.mag <= maxMag);
  }

  // Start loading
  loadingPromise = (async () => {
    const res = await fetch("/data/bsc5-short.json");
    if (!res.ok) {
      throw new Error(`Failed to load BSC stars: ${res.status}`);
    }
    
    const raw: BscStarRaw[] = await res.json();
    const stars: Star[] = [];

    for (const s of raw) {
      const mag = Number(s.V);
      if (!Number.isFinite(mag) || mag > 6.5) continue;

      const ra = parseHmsToHours(s.RA);
      const dec = parseDmsToDeg(s.Dec);
      if (!Number.isFinite(ra) || !Number.isFinite(dec)) continue;

      // Build name from available fields
      const name = s.N ?? (s.B && s.C ? `${s.B} ${s.C}` : undefined);

      stars.push({
        id: `HR${s.HR ?? "?"}-${ra.toFixed(4)}-${dec.toFixed(4)}`,
        ra,      // Hours (0-24)
        dec,     // Degrees (-90 to +90)
        mag,
        name,
        tempK: s.K ? Number(s.K) : undefined,
      });
    }

    // Sort by magnitude (brightest first) for efficient rendering
    stars.sort((a, b) => a.mag - b.mag);

    cachedStars = stars;
    return stars;
  })();

  const stars = await loadingPromise;
  loadingPromise = null;

  return maxMag >= 6.5 
    ? stars 
    : stars.filter(s => s.mag <= maxMag);
}

/**
 * Clear the star cache (useful for testing)
 */
export function clearBscCache(): void {
  cachedStars = null;
  loadingPromise = null;
}

/**
 * Get approximate star color from temperature (Kelvin)
 * Returns RGB values for realistic star coloring
 */
export function getStarColorFromTemp(tempK: number | undefined): { r: number; g: number; b: number } {
  if (!tempK || tempK <= 0) {
    return { r: 255, g: 255, b: 255 }; // Default white
  }

  // Simplified blackbody approximation
  // Real stars range from ~2000K (red) to ~40000K (blue-white)
  const t = tempK / 100;
  let r: number, g: number, b: number;

  // Red
  if (t <= 66) {
    r = 255;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
  }

  // Green
  if (t <= 66) {
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
  } else {
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  }

  // Blue
  if (t >= 66) {
    b = 255;
  } else if (t <= 19) {
    b = 0;
  } else {
    b = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  }

  return {
    r: Math.max(0, Math.min(255, Math.round(r))),
    g: Math.max(0, Math.min(255, Math.round(g))),
    b: Math.max(0, Math.min(255, Math.round(b))),
  };
}