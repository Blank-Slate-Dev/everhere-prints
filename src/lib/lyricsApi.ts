// src/lib/lyricsApi.ts
// Client-side lyrics fetching

export interface LyricsResult {
  lyrics: string | null;
  error?: string;
}

/**
 * Fetch lyrics for a song by artist and title
 */
export async function fetchLyrics(
  artist: string,
  title: string
): Promise<LyricsResult> {
  try {
    const response = await fetch(
      `/api/lyrics/search?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`
    );

    const data = await response.json();

    if (!response.ok || !data.lyrics) {
      return { lyrics: null, error: data.error || "Lyrics not found" };
    }

    return { lyrics: cleanLyrics(data.lyrics) };
  } catch (error) {
    console.error("Lyrics fetch error:", error);
    return { lyrics: null, error: "Failed to fetch lyrics" };
  }
}

/**
 * Clean up lyrics text
 */
function cleanLyrics(lyrics: string): string {
  return lyrics
    // Remove "Paroles de la chanson..." headers
    .replace(/^Paroles de la chanson.*\n*/i, "")
    // Remove "[Verse 1]", "[Chorus]" etc markers
    .replace(/\[.*?\]\n?/g, "")
    // Remove empty lines at start/end
    .trim()
    // Normalize line breaks
    .replace(/\r\n/g, "\n")
    // Remove excessive blank lines
    .replace(/\n{3,}/g, "\n\n");
}

/**
 * Split lyrics into individual lines
 */
export function splitLyricsIntoLines(lyrics: string): string[] {
  return lyrics
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Group lyrics into verse chunks (by blank lines)
 */
export function groupLyricsIntoVerses(lyrics: string): string[][] {
  const verses: string[][] = [];
  let currentVerse: string[] = [];

  const lines = lyrics.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === "") {
      if (currentVerse.length > 0) {
        verses.push(currentVerse);
        currentVerse = [];
      }
    } else {
      currentVerse.push(trimmed);
    }
  }

  // Don't forget the last verse
  if (currentVerse.length > 0) {
    verses.push(currentVerse);
  }

  return verses;
}
