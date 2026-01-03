// src/app/api/lyrics/search/route.ts
// Free lyrics API using lyrics.ovh - no API key needed
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const artist = searchParams.get("artist");
    const title = searchParams.get("title");

    if (!artist || !title) {
      return NextResponse.json(
        { error: "Both 'artist' and 'title' parameters are required" },
        { status: 400 }
      );
    }

    // Clean up the artist and title for better matching
    const cleanArtist = artist
      .replace(/\s*\(feat\..*?\)/gi, "") // Remove feat.
      .replace(/\s*ft\..*$/gi, "")       // Remove ft.
      .trim();
    
    const cleanTitle = title
      .replace(/\s*\(.*?\)/g, "")        // Remove anything in parentheses
      .replace(/\s*\[.*?\]/g, "")        // Remove anything in brackets
      .replace(/\s*-\s*.*$/, "")         // Remove anything after dash
      .trim();

    // Try lyrics.ovh API
    const response = await fetch(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(cleanArtist)}/${encodeURIComponent(cleanTitle)}`,
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Try with original values if cleaned version fails
      const retryResponse = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
        {
          headers: {
            "Accept": "application/json",
          },
        }
      );

      if (!retryResponse.ok) {
        return NextResponse.json(
          { error: "Lyrics not found", lyrics: null },
          { status: 404 }
        );
      }

      const retryData = await retryResponse.json();
      return NextResponse.json({ lyrics: retryData.lyrics });
    }

    const data = await response.json();
    return NextResponse.json({ lyrics: data.lyrics });
  } catch (error) {
    console.error("Lyrics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch lyrics", lyrics: null },
      { status: 500 }
    );
  }
}
