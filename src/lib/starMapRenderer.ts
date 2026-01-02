// src/lib/starMapRenderer.ts
// Star map renderer using BSC5 catalog (~9000 real stars)

import * as Astronomy from "astronomy-engine";
import {
  StarMapStyle,
  constellations,
  getStarMapStyle,
} from "./starMapConfig";
import { Star, getStarColorFromTemp } from "./bscStars";

interface RenderOptions {
  date: Date;
  latitude: number;
  longitude: number;
  styleId: string;
  showConstellations: boolean;
  showConstellationNames: boolean;
  showGrid: boolean;
  showMilkyWay: boolean;
  canvasWidth: number;
  canvasHeight: number;
  stars?: Star[]; // BSC star catalog (loaded externally)
}

interface StarPosition {
  x: number;
  y: number;
  magnitude: number;
  name?: string;
  altitude: number;
  tempK?: number;
}

// ---------- helpers ----------

const DEG2RAD = Math.PI / 180;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Simple deterministic pseudo-random based on numbers (no state)
function hash2(a: number, b: number): number {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

// Convert Right Ascension and Declination to Altitude/Azimuth for a given time and location
function raDecToAltAz(
  ra: number, // hours (0-24)
  dec: number, // degrees
  date: Date,
  latitude: number,
  longitude: number
): { altitude: number; azimuth: number } {
  const time = Astronomy.MakeTime(date);

  // Calculate Local Sidereal Time
  const gst = Astronomy.SiderealTime(time);
  const lst = gst + longitude / 15; // hours

  // Hour angle
  const ha = (lst - ra) * 15; // degrees

  // Convert to radians
  const haRad = ha * DEG2RAD;
  const decRad = dec * DEG2RAD;
  const latRad = latitude * DEG2RAD;

  // Altitude
  const sinAlt =
    Math.sin(decRad) * Math.sin(latRad) +
    Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad);
  const altitude = Math.asin(sinAlt) / DEG2RAD;

  // Azimuth
  const cosAz =
    (Math.sin(decRad) - Math.sin(latRad) * sinAlt) /
    (Math.cos(latRad) * Math.cos(altitude * DEG2RAD));
  let azimuth = Math.acos(clamp(cosAz, -1, 1)) / DEG2RAD;

  if (Math.sin(haRad) > 0) {
    azimuth = 360 - azimuth;
  }

  return { altitude, azimuth };
}

// Project altitude/azimuth to x/y on canvas (stereographic projection)
function projectToCanvas(
  altitude: number,
  azimuth: number,
  centerX: number,
  centerY: number,
  radius: number
): { x: number; y: number } | null {
  // Only show stars above horizon (or slightly below for aesthetic)
  if (altitude < -5) return null;

  const r = radius * Math.cos(altitude * DEG2RAD);
  const theta = ((azimuth - 180) * Math.PI) / 180; // rotate so North is up

  const x = centerX + r * Math.sin(theta);
  const y = centerY - r * Math.cos(theta);

  return { x, y };
}

// Magnitude to visual radius (print-quality scaling)
function getMagnitudeRadius(magnitude: number, canvasWidth: number): number {
  // Scale factor based on canvas size (preview vs print)
  const scaleFactor = canvasWidth < 900 ? 1.0 : 1.3;
  
  // Brighter stars (lower magnitude) get larger radius
  // Mag range: roughly -1.5 (Sirius) to 6.5 (naked eye limit)
  const t = clamp((6.5 - magnitude) / 8, 0, 1);
  const base = lerp(0.3, 4.5, Math.pow(t, 1.5));
  
  return clamp(base * scaleFactor, 0.25, 6);
}

// Get star color based on temperature and style
function getStarColor(
  style: StarMapStyle,
  tempK: number | undefined,
  magnitude: number
): string {
  // For light backgrounds, use dark star color
  if (style.id === "celestial") {
    return style.starColor;
  }

  // No temperature data - use style's default star color
  if (!tempK) {
    return style.starColor;
  }

  // Get RGB from temperature
  const rgb = getStarColorFromTemp(tempK);
  
  // Blend toward white for dimmer stars (less saturated)
  const dimFactor = clamp((magnitude - 2) / 4, 0, 0.7);
  const r = Math.round(lerp(rgb.r, 255, dimFactor));
  const g = Math.round(lerp(rgb.g, 255, dimFactor));
  const b = Math.round(lerp(rgb.b, 255, dimFactor));

  return `rgb(${r}, ${g}, ${b})`;
}

// Helper function to draw text with letter spacing
function drawSpacedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  letterSpacing: number
): void {
  let currentX = x;
  for (let i = 0; i < text.length; i++) {
    ctx.fillText(text[i], currentX, y);
    currentX += ctx.measureText(text[i]).width + letterSpacing;
  }
}

// Subtle paper grain overlay
function drawSubtleGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opacity = 0.035
): void {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.globalCompositeOperation = "overlay";

  const passes = 3;
  for (let p = 0; p < passes; p++) {
    const step = 6 + p * 3;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const n = hash2(x + p * 19.7, y + p * 33.3);
        ctx.fillStyle =
          n > 0.5 ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  ctx.restore();
}

// ---------- Main Render Function ----------

export function renderStarMap(
  ctx: CanvasRenderingContext2D,
  options: RenderOptions
): void {
  const {
    date,
    latitude,
    longitude,
    styleId,
    showConstellations,
    showConstellationNames,
    showGrid,
    showMilkyWay,
    canvasWidth,
    canvasHeight,
    stars = [],
  } = options;

  const style = getStarMapStyle(styleId);
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const radius = Math.min(canvasWidth, canvasHeight) * 0.42;

  // Clear canvas
  ctx.fillStyle = style.backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // --- Premium vignette (outside circle) ---
  {
    const vg = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.45,
      centerX,
      centerY,
      radius * 1.25
    );
    vg.addColorStop(0, "transparent");
    vg.addColorStop(1, "rgba(0,0,0,0.35)");
    ctx.save();
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
  }

  // Draw circular mask/border
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.clip();

  // --- Atmosphere falloff (toward horizon) ---
  {
    const atm = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.2,
      centerX,
      centerY,
      radius
    );
    atm.addColorStop(0, "transparent");
    atm.addColorStop(1, "rgba(0,0,0,0.28)");
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = atm;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
  }

  // --- Milky Way (layered, organic feel) ---
  if (showMilkyWay) {
    ctx.save();

    // Layer 1: broad haze
    let gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius
    );
    gradient.addColorStop(0, style.milkyWayColor);
    gradient.addColorStop(0.55, style.milkyWayColor);
    gradient.addColorStop(1, "transparent");

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(0.42);
    ctx.scale(1.12, 0.32);
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Layer 2: tighter dust band
    gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius
    );
    gradient.addColorStop(0, style.milkyWayColor);
    gradient.addColorStop(0.35, style.milkyWayColor);
    gradient.addColorStop(1, "transparent");

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(0.42);
    ctx.scale(1.0, 0.18);
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // --- Grid ---
  if (showGrid) {
    ctx.save();
    ctx.strokeStyle = style.gridColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.38;

    // Concentric circles (altitude lines)
    for (let alt = 15; alt <= 75; alt += 15) {
      const gridRadius = radius * (1 - alt / 90);
      ctx.beginPath();
      ctx.arc(centerX, centerY, gridRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Radial lines (azimuth lines)
    for (let az = 0; az < 360; az += 30) {
      const angle = ((az - 180) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.sin(angle),
        centerY - radius * Math.cos(angle)
      );
      ctx.stroke();
    }

    ctx.restore();
  }

  // --- Calculate star positions ---
  const starPositions: StarPosition[] = [];

  // Determine magnitude limit based on canvas size (more stars for print)
  const magLimit = canvasWidth < 900 ? 5.5 : 6.5;

  for (const star of stars) {
    // Skip stars dimmer than our limit
    if (star.mag > magLimit) continue;

    const { altitude, azimuth } = raDecToAltAz(
      star.ra,
      star.dec,
      date,
      latitude,
      longitude
    );

    const pos = projectToCanvas(altitude, azimuth, centerX, centerY, radius);

    if (pos) {
      starPositions.push({
        x: pos.x,
        y: pos.y,
        magnitude: star.mag,
        name: star.name,
        altitude,
        tempK: star.tempK,
      });
    }
  }

  // --- Draw constellation lines ---
  if (showConstellations) {
    ctx.save();
    ctx.strokeStyle = style.constellationLineColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.85;

    for (const constellation of constellations) {
      for (const line of constellation.lines) {
        const [ra1, dec1, ra2, dec2] = line;

        const pos1AltAz = raDecToAltAz(ra1, dec1, date, latitude, longitude);
        const pos2AltAz = raDecToAltAz(ra2, dec2, date, latitude, longitude);

        const pos1 = projectToCanvas(
          pos1AltAz.altitude,
          pos1AltAz.azimuth,
          centerX,
          centerY,
          radius
        );

        const pos2 = projectToCanvas(
          pos2AltAz.altitude,
          pos2AltAz.azimuth,
          centerX,
          centerY,
          radius
        );

        if (pos1 && pos2) {
          // Fade lines near horizon
          const fade = clamp(
            (Math.min(pos1AltAz.altitude, pos2AltAz.altitude) + 8) / 30,
            0.25,
            1
          );
          ctx.globalAlpha = 0.85 * fade;

          ctx.beginPath();
          ctx.moveTo(pos1.x, pos1.y);
          ctx.lineTo(pos2.x, pos2.y);
          ctx.stroke();
        }
      }
    }

    ctx.restore();
  }

  // --- Draw stars (dimmest first, then bright on top) ---
  // Stars are already sorted brightest-first, so reverse for proper layering
  const sortedStars = [...starPositions].sort((a, b) => b.magnitude - a.magnitude);

  for (const star of sortedStars) {
    const starRadius = getMagnitudeRadius(star.magnitude, canvasWidth);

    // Fade stars near the horizon (atmospheric extinction)
    const horizonFade = clamp((star.altitude + 10) / 35, 0.15, 1);

    // Subtle twinkle variance for organic feel
    const tw = lerp(0.85, 1.08, hash2(star.x, star.y));
    const finalR = starRadius * tw;

    const starColor = getStarColor(style, star.tempK, star.magnitude);

    // Star glow for bright stars (mag < 2.2)
    if (star.magnitude < 2.2) {
      const glowIntensity = clamp((2.2 - star.magnitude) / 3.7, 0, 1);
      const glowRadius = finalR * lerp(3.0, 5.5, glowIntensity);
      
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, glowRadius
      );

      // Use star's actual color for glow
      gradient.addColorStop(0, style.starGlowColor);
      gradient.addColorStop(1, "transparent");

      ctx.save();
      ctx.globalAlpha = horizonFade * lerp(0.15, 0.65, glowIntensity);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Star dot
    ctx.save();
    ctx.globalAlpha = horizonFade;
    ctx.fillStyle = starColor;
    ctx.beginPath();
    ctx.arc(star.x, star.y, finalR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // --- Draw constellation names ---
  if (showConstellationNames) {
    const fontSize = Math.max(9, canvasWidth / 55);
    const letterSpacing = fontSize * 0.15;

    for (const constellation of constellations) {
      let sumX = 0,
        sumY = 0,
        count = 0;
      let minAltitude = 90;

      for (const line of constellation.lines) {
        const [ra1, dec1] = line;
        const altAz = raDecToAltAz(ra1, dec1, date, latitude, longitude);
        const pos = projectToCanvas(
          altAz.altitude,
          altAz.azimuth,
          centerX,
          centerY,
          radius
        );

        if (pos) {
          sumX += pos.x;
          sumY += pos.y;
          count++;
          minAltitude = Math.min(minAltitude, altAz.altitude);
        }
      }

      if (count > 0) {
        const labelX = sumX / count;
        const labelY = sumY / count - fontSize * 1.2;

        const altitudeFade = Math.min(1, Math.max(0.3, (minAltitude + 10) / 40));

        const displayName = constellation.name.toUpperCase();

        ctx.font = `300 ${fontSize}px "Helvetica Neue", "Inter", Arial, sans-serif`;
        const baseWidth = ctx.measureText(displayName).width;
        const totalWidth = baseWidth + (displayName.length - 1) * letterSpacing;

        // Outer glow
        ctx.save();
        ctx.globalAlpha = altitudeFade * 0.18;
        ctx.fillStyle = style.starGlowColor;
        ctx.filter = `blur(${fontSize * 0.3}px)`;
        drawSpacedText(ctx, displayName, labelX - totalWidth / 2, labelY, letterSpacing);
        ctx.restore();

        // Soft shadow
        ctx.save();
        ctx.globalAlpha = altitudeFade * 0.28;
        ctx.fillStyle = style.backgroundColor;
        ctx.filter = `blur(${fontSize * 0.14}px)`;
        drawSpacedText(ctx, displayName, labelX - totalWidth / 2 + 1, labelY + 1, letterSpacing);
        ctx.restore();

        // Main text
        ctx.save();
        ctx.globalAlpha = altitudeFade * 0.85;
        ctx.fillStyle = style.constellationNameColor;
        ctx.font = `300 ${fontSize}px "Helvetica Neue", "Inter", Arial, sans-serif`;
        drawSpacedText(ctx, displayName, labelX - totalWidth / 2, labelY, letterSpacing);
        ctx.restore();
      }
    }
  }

  // --- Draw horizon circle ---
  ctx.strokeStyle = style.horizonColor;
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore(); // End circular clip

  // --- Cardinal directions ---
  const dirFontSize = Math.max(11, canvasWidth / 40);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const dirOffset = radius + dirFontSize * 1.5;
  const directions = [
    { label: "N", x: centerX, y: centerY - dirOffset },
    { label: "S", x: centerX, y: centerY + dirOffset },
    { label: "E", x: centerX - dirOffset, y: centerY },
    { label: "W", x: centerX + dirOffset, y: centerY },
  ];

  for (const dir of directions) {
    // Glow
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = style.starGlowColor;
    ctx.filter = `blur(${dirFontSize * 0.4}px)`;
    ctx.font = `500 ${dirFontSize}px "Helvetica Neue", "Inter", Arial, sans-serif`;
    ctx.fillText(dir.label, dir.x, dir.y);
    ctx.restore();

    // Main
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = style.textColor;
    ctx.font = `500 ${dirFontSize}px "Helvetica Neue", "Inter", Arial, sans-serif`;
    ctx.fillText(dir.label, dir.x, dir.y);
    ctx.restore();
  }

  // --- Subtle grain overlay ---
  drawSubtleGrain(ctx, canvasWidth, canvasHeight, 0.03);
}

// ---------- Sky Description ----------

export function getSkyDescription(
  date: Date,
  latitude: number,
  longitude: number
): string {
  const time = Astronomy.MakeTime(date);

  const moonPhase = Astronomy.MoonPhase(time);
  let phaseName = "New Moon";
  if (moonPhase > 337.5 || moonPhase <= 22.5) phaseName = "New Moon";
  else if (moonPhase <= 67.5) phaseName = "Waxing Crescent";
  else if (moonPhase <= 112.5) phaseName = "First Quarter";
  else if (moonPhase <= 157.5) phaseName = "Waxing Gibbous";
  else if (moonPhase <= 202.5) phaseName = "Full Moon";
  else if (moonPhase <= 247.5) phaseName = "Waning Gibbous";
  else if (moonPhase <= 292.5) phaseName = "Last Quarter";
  else phaseName = "Waning Crescent";

  return phaseName;
}
