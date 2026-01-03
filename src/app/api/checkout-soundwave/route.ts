// src/app/api/checkout-soundwave/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { SoundWaveProductSelection, SongMetadata } from "@/types";
import { getSizeDetails } from "@/lib/pricing";
import { getSoundWaveStyle } from "@/lib/soundWaveConfig";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface SoundWaveCustomizationPayload {
  title: string;
  subtitle: string;
  dateText: string;
  styleId: string;
  waveformData: number[];
  audioDuration: number;
  audioFileName: string;
  songData: SongMetadata | null;
  showAlbumArt: boolean;
  showArtistName: boolean;
  showAlbumName: boolean;
  showDuration: boolean;
  showLyrics: boolean;
  waveformPosition: number;
  fullLyrics: string | null;
  selectedLyrics: string[];
}

interface CheckoutRequestBody {
  customization: SoundWaveCustomizationPayload;
  product: SoundWaveProductSelection;
  totalPrice: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { customization, product, totalPrice } = body;

    const sizeDetails = getSizeDetails(product.size);
    const styleConfig = getSoundWaveStyle(customization.styleId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Format duration for description
    const durationMins = Math.floor(customization.audioDuration / 60);
    const durationSecs = Math.floor(customization.audioDuration % 60);
    const formattedDuration = `${durationMins}:${durationSecs.toString().padStart(2, "0")}`;

    // Build product description
    const descriptionParts = [
      `Sound Wave Print - ${styleConfig.name}`,
    ];
    
    if (customization.songData) {
      descriptionParts.push(`"${customization.songData.songName}" by ${customization.songData.artistName}`);
    } else if (customization.audioFileName) {
      descriptionParts.push(`"${customization.audioFileName}"`);
    }
    
    descriptionParts.push(formattedDuration);
    descriptionParts.push(`${sizeDetails.name} Print (${sizeDetails.dimensions})`);
    descriptionParts.push(product.frame.id !== "none" ? `with ${product.frame.name}` : "Print Only");
    
    if (customization.showLyrics && customization.selectedLyrics.length > 0) {
      descriptionParts.push(`with ${customization.selectedLyrics.length} lyric lines`);
    }

    const productDescription = descriptionParts.filter(Boolean).join(" | ");

    // Compress full waveform data for metadata (Stripe has limits)
    const compressedWaveform = customization.waveformData
      .filter((_, i) => i % 4 === 0)
      .map((v) => Math.round(v * 100))
      .join(",");

    // Build metadata object
    const baseMetadata: Record<string, string> = {
      product_type: "sound_wave",
      style_id: customization.styleId,
      style_name: styleConfig.name,
      title: customization.title || "",
      subtitle: customization.subtitle || "",
      date_text: customization.dateText || "",
      audio_file_name: customization.audioFileName || "",
      audio_duration: customization.audioDuration.toString(),
      waveform_sample_count: customization.waveformData.length.toString(),
      lyrics_position: customization.waveformPosition.toString(),
      show_album_art: customization.showAlbumArt.toString(),
      show_artist_name: customization.showArtistName.toString(),
      show_album_name: customization.showAlbumName.toString(),
      show_duration: customization.showDuration.toString(),
      show_lyrics: customization.showLyrics.toString(),
      size: product.size,
      frame: product.frame.id,
    };

    // Add song data if available
    if (customization.songData) {
      baseMetadata.track_id = customization.songData.trackId;
      baseMetadata.song_name = customization.songData.songName;
      baseMetadata.artist_name = customization.songData.artistName;
      baseMetadata.album_name = customization.songData.albumName;
      baseMetadata.album_art_url = customization.songData.albumArtUrl || "";
      baseMetadata.song_duration_ms = customization.songData.durationMs.toString();
      baseMetadata.track_url = customization.songData.trackUrl;
    }

    // Add selected lyrics (up to 4 lines)
    if (customization.showLyrics && customization.selectedLyrics.length > 0) {
      baseMetadata.lyrics_count = customization.selectedLyrics.length.toString();
      customization.selectedLyrics.forEach((line, index) => {
        // Truncate if needed (Stripe metadata value limit is 500 chars)
        baseMetadata[`lyric_line_${index + 1}`] = line.slice(0, 200);
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["AU", "NZ"],
      },
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: "EverHere Prints - Sound Wave Print",
              description: productDescription,
              images: customization.songData?.albumArtUrl ? [customization.songData.albumArtUrl] : [],
              metadata: {
                ...baseMetadata,
                waveform_compressed: compressedWaveform.slice(0, 400),
              },
            },
            unit_amount: totalPrice,
          },
          quantity: 1,
        },
      ],
      metadata: {
        ...baseMetadata,
        waveform_compressed: compressedWaveform.slice(0, 400),
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelled`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
