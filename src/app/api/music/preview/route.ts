// src/app/api/music/preview/route.ts
// Proxy for iTunes audio previews to handle CORS
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    // Validate it's an Apple/iTunes URL for security
    const parsedUrl = new URL(url);
    const allowedHosts = [
      "audio-ssl.itunes.apple.com",
      "is1-ssl.mzstatic.com",
      "is2-ssl.mzstatic.com",
      "is3-ssl.mzstatic.com",
      "is4-ssl.mzstatic.com",
      "is5-ssl.mzstatic.com",
    ];

    if (!allowedHosts.some(host => parsedUrl.hostname.includes(host) || parsedUrl.hostname.endsWith(".apple.com"))) {
      return NextResponse.json(
        { error: "Invalid audio URL" },
        { status: 400 }
      );
    }

    // Fetch the audio file
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; EverHerePrints/1.0)",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch audio" },
        { status: response.status }
      );
    }

    // Get the audio data
    const audioBuffer = await response.arrayBuffer();

    // Return the audio with proper headers
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Audio proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy audio" },
      { status: 500 }
    );
  }
}
