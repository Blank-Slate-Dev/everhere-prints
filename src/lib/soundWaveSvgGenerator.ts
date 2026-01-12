// src/lib/soundWaveSvgGenerator.ts
// Generates high-resolution SVG for Sound Wave prints

import { SoundWaveCustomization } from "@/types";
import { getSoundWaveStyle, SoundWaveStyle } from "@/lib/soundWaveConfig";
import { PRINT_DIMENSIONS, PrintSizeKey } from "@/lib/printExport";

interface GenerateSvgOptions {
  customization: SoundWaveCustomization;
  size: PrintSizeKey;
}

/**
 * Generate a complete SVG string for the Sound Wave print
 * This SVG is resolution-independent and can be converted to any size PNG
 */
export function generateSoundWaveSvg({ customization, size }: GenerateSvgOptions): string {
  const dimensions = PRINT_DIMENSIONS[size];
  const { width, height } = dimensions;
  
  const style = getSoundWaveStyle(customization.styleId);
  
  // Calculate layout proportions (6% padding like preview)
  const padding = Math.round(width * 0.06);
  const contentWidth = width - padding * 2;
  const contentHeight = height - padding * 2;
  
  // Waveform dimensions
  const waveformHeight = Math.round(contentHeight * 0.25);
  const waveformY = Math.round(contentHeight * 0.4);
  
  // Generate waveform path
  const waveformPath = generateWaveformPath(
    customization.waveformData.length > 0 
      ? customization.waveformData 
      : generatePlaceholderWaveform(),
    contentWidth,
    waveformHeight
  );
  
  // Font sizes scaled for print
  const titleFontSize = Math.round(width * 0.045);
  const subtitleFontSize = Math.round(width * 0.022);
  const metaFontSize = Math.round(width * 0.016);
  const lyricsFontSize = Math.round(width * 0.018);
  
  // Build SVG
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${width}" 
     height="${height}" 
     viewBox="0 0 ${width} ${height}">
  <defs>
    ${generateGradientDefs(style, contentWidth)}
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${style.backgroundColor}"/>
  
  <!-- Content area -->
  <g transform="translate(${padding}, ${padding})">
    
    ${customization.songData?.albumArtUrl ? generateAlbumArtSection(customization, contentWidth, contentHeight, style) : ""}
    
    <!-- Title -->
    <text 
      x="${contentWidth / 2}" 
      y="${Math.round(contentHeight * 0.12)}"
      text-anchor="middle"
      font-family="serif"
      font-size="${titleFontSize}"
      font-weight="600"
      fill="${style.textColor}"
    >${escapeXml(customization.title || "Your Song Title")}</text>
    
    <!-- Subtitle -->
    ${customization.subtitle ? `
    <text 
      x="${contentWidth / 2}" 
      y="${Math.round(contentHeight * 0.17)}"
      text-anchor="middle"
      font-family="sans-serif"
      font-size="${subtitleFontSize}"
      fill="${style.accentColor}"
      letter-spacing="0.1em"
    >${escapeXml(customization.subtitle.toUpperCase())}</text>
    ` : ""}
    
    <!-- Waveform -->
    <g transform="translate(0, ${waveformY})">
      <path 
        d="${waveformPath}"
        fill="${style.waveGradient ? 'url(#waveGradient)' : style.waveColor}"
        opacity="0.9"
      />
      
      <!-- Playhead line -->
      <line 
        x1="${Math.round(customization.waveformPosition * contentWidth)}" 
        y1="0"
        x2="${Math.round(customization.waveformPosition * contentWidth)}" 
        y2="${waveformHeight}"
        stroke="${style.textColor}"
        stroke-width="2"
        opacity="0.7"
      />
    </g>
    
    <!-- Artist/Album info -->
    ${generateMetaInfo(customization, contentWidth, contentHeight, style, metaFontSize)}
    
    <!-- Date text -->
    ${customization.dateText ? `
    <text 
      x="${contentWidth / 2}" 
      y="${Math.round(contentHeight * 0.88)}"
      text-anchor="middle"
      font-family="sans-serif"
      font-size="${metaFontSize}"
      fill="${style.accentColor}"
      letter-spacing="0.05em"
    >${escapeXml(customization.dateText)}</text>
    ` : ""}
    
    <!-- Lyrics -->
    ${customization.showLyrics && customization.selectedLyrics.length > 0 ? 
      generateLyricsSection(customization.selectedLyrics, contentWidth, contentHeight, style, lyricsFontSize) : ""}
    
  </g>
</svg>`;

  return svg;
}

/**
 * Generate gradient definitions for the SVG
 */
function generateGradientDefs(style: SoundWaveStyle, width: number): string {
  if (!style.waveGradient) return "";
  
  return `
    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${style.waveGradient.from}"/>
      <stop offset="100%" stop-color="${style.waveGradient.to}"/>
    </linearGradient>
  `;
}

/**
 * Generate waveform SVG path from amplitude data
 */
function generateWaveformPath(
  waveformData: number[],
  width: number,
  height: number
): string {
  // Resample to consistent number of points
  const targetPoints = 200;
  const data = resampleWaveform(waveformData, targetPoints);
  
  const centerY = height / 2;
  const points: string[] = [];
  const bottomPoints: string[] = [];
  
  for (let i = 0; i < data.length; i++) {
    const x = (i / (data.length - 1)) * width;
    const amplitude = data[i] * (height * 0.45);
    
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${(centerY - amplitude).toFixed(1)}`);
    bottomPoints.unshift(`L ${x.toFixed(1)} ${(centerY + amplitude).toFixed(1)}`);
  }
  
  return points.join(" ") + " " + bottomPoints.join(" ") + " Z";
}

/**
 * Resample waveform data to target number of points
 */
function resampleWaveform(data: number[], targetPoints: number): number[] {
  if (data.length <= targetPoints) return data;
  
  const resampled: number[] = [];
  const step = data.length / targetPoints;
  
  for (let i = 0; i < targetPoints; i++) {
    const idx = Math.floor(i * step);
    resampled.push(data[idx]);
  }
  
  return resampled;
}

/**
 * Generate placeholder waveform for preview
 */
function generatePlaceholderWaveform(): number[] {
  const placeholder: number[] = [];
  for (let i = 0; i < 100; i++) {
    const x = i / 100;
    const wave =
      0.2 +
      0.3 * Math.sin(x * Math.PI * 3) +
      0.2 * Math.sin(x * Math.PI * 7 + 0.5) +
      0.15 * Math.sin(x * Math.PI * 13 + 1) +
      0.1 * Math.sin(x * Math.PI * 23 + 2);
    placeholder.push(Math.max(0.08, Math.min(1, wave)));
  }
  return placeholder;
}

/**
 * Generate album art section (placeholder for external image)
 */
function generateAlbumArtSection(
  customization: SoundWaveCustomization,
  contentWidth: number,
  contentHeight: number,
  style: SoundWaveStyle
): string {
  // Note: For actual album art, you'd need to embed as base64 or reference external URL
  // This creates a placeholder rectangle - the server will handle image embedding
  const artSize = Math.round(contentWidth * 0.25);
  const artX = (contentWidth - artSize) / 2;
  const artY = Math.round(contentHeight * 0.2);
  
  if (!customization.showAlbumArt || !customization.songData?.albumArtUrl) {
    return "";
  }
  
  return `
    <!-- Album art placeholder - will be replaced with actual image -->
    <image 
      x="${artX}" 
      y="${artY}" 
      width="${artSize}" 
      height="${artSize}"
      href="${customization.songData.albumArtUrl}"
      preserveAspectRatio="xMidYMid slice"
    />
  `;
}

/**
 * Generate meta info (artist, album, duration)
 */
function generateMetaInfo(
  customization: SoundWaveCustomization,
  contentWidth: number,
  contentHeight: number,
  style: SoundWaveStyle,
  fontSize: number
): string {
  const parts: string[] = [];
  const y = Math.round(contentHeight * 0.75);
  
  if (customization.showArtistName && customization.songData?.artistName) {
    parts.push(customization.songData.artistName);
  }
  
  if (customization.showAlbumName && customization.songData?.albumName) {
    parts.push(customization.songData.albumName);
  }
  
  if (customization.showDuration && customization.songData?.durationMs) {
    const totalSeconds = Math.floor(customization.songData.durationMs / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    parts.push(`${mins}:${secs.toString().padStart(2, "0")}`);
  }
  
  if (parts.length === 0) return "";
  
  return `
    <text 
      x="${contentWidth / 2}" 
      y="${y}"
      text-anchor="middle"
      font-family="sans-serif"
      font-size="${fontSize}"
      fill="${style.accentColor}"
    >${escapeXml(parts.join("  •  "))}</text>
  `;
}

/**
 * Generate lyrics section
 */
function generateLyricsSection(
  lyrics: string[],
  contentWidth: number,
  contentHeight: number,
  style: SoundWaveStyle,
  fontSize: number
): string {
  const startY = Math.round(contentHeight * 0.78);
  const lineHeight = fontSize * 1.5;
  
  return lyrics.slice(0, 4).map((line, index) => `
    <text 
      x="${contentWidth / 2}" 
      y="${startY + index * lineHeight}"
      text-anchor="middle"
      font-family="serif"
      font-style="italic"
      font-size="${fontSize}"
      fill="${style.textColor}"
      opacity="0.8"
    >${escapeXml(line)}</text>
  `).join("");
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
