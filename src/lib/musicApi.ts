// src/lib/musicApi.ts
// iTunes Search API integration for song search and metadata
// No authentication required!

export interface MusicTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string | null; // 600x600 image URL
  albumArtSmall: string | null; // 100x100 image URL
  durationMs: number;
  previewUrl: string | null;
  trackUrl: string;
}

export interface MusicSearchResult {
  tracks: MusicTrack[];
  total: number;
}

/**
 * Format milliseconds to MM:SS
 */
export function formatDurationMs(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// iTunes API response types
interface iTunesTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  trackTimeMillis: number;
  previewUrl?: string;
  trackViewUrl: string;
}

interface iTunesSearchResponse {
  resultCount: number;
  results: iTunesTrack[];
}

/**
 * Get high-resolution album art URL from iTunes
 * iTunes provides 100x100 by default, but we can request larger
 */
function getHighResArtwork(url100: string): string {
  // Replace 100x100 with 600x600 for high-res
  return url100.replace("100x100bb", "600x600bb");
}

/**
 * Parse iTunes API track response into our format
 */
function parseTrack(track: iTunesTrack): MusicTrack {
  return {
    id: track.trackId.toString(),
    name: track.trackName,
    artist: track.artistName,
    album: track.collectionName,
    albumArt: getHighResArtwork(track.artworkUrl100),
    albumArtSmall: track.artworkUrl100,
    durationMs: track.trackTimeMillis,
    previewUrl: track.previewUrl || null,
    trackUrl: track.trackViewUrl,
  };
}

/**
 * Search for tracks via iTunes Search API
 * This is called client-side through our API route to handle CORS
 */
export async function searchTracks(query: string): Promise<MusicSearchResult> {
  if (!query.trim()) {
    return { tracks: [], total: 0 };
  }

  try {
    const response = await fetch(
      `/api/music/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    const data: iTunesSearchResponse = await response.json();

    return {
      tracks: data.results.map(parseTrack),
      total: data.resultCount,
    };
  } catch (error) {
    console.error("Music search error:", error);
    return { tracks: [], total: 0 };
  }
}
