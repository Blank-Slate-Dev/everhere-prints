// src/app/api/export/print/route.ts
// High-resolution print export API
// Converts SVG to high-res PNG at print-ready resolution

import { NextRequest, NextResponse } from "next/server";
import { 
  PRINT_DIMENSIONS, 
  PrintSizeKey, 
  DPI_SETTINGS, 
  DPILevel,
  generateExportFilename 
} from "@/lib/printExport";

// Dynamic import for sharp (server-side only)
async function getSharp() {
  const sharp = (await import("sharp")).default;
  return sharp;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      svgContent, 
      size = "A3", 
      dpiLevel = "high",
      productType = "soundwave",
      filename 
    } = body as {
      svgContent: string;
      size?: PrintSizeKey;
      dpiLevel?: DPILevel;
      productType?: string;
      filename?: string;
    };

    // Validate inputs
    if (!svgContent) {
      return NextResponse.json(
        { success: false, error: "SVG content is required" },
        { status: 400 }
      );
    }

    if (!PRINT_DIMENSIONS[size]) {
      return NextResponse.json(
        { success: false, error: `Invalid size: ${size}. Use A4, A3, or A2` },
        { status: 400 }
      );
    }

    const dpi = DPI_SETTINGS[dpiLevel] || DPI_SETTINGS.high;
    const dimensions = PRINT_DIMENSIONS[size];
    
    // Recalculate dimensions if different DPI requested
    const targetWidth = Math.round((dimensions.width / 300) * dpi);
    const targetHeight = Math.round((dimensions.height / 300) * dpi);

    // Convert SVG to high-res PNG using sharp
    const sharp = await getSharp();
    
    // Ensure SVG has proper dimensions in the root element
    const svgWithDimensions = ensureSvgDimensions(svgContent, targetWidth, targetHeight);
    const svgBuffer = Buffer.from(svgWithDimensions, "utf-8");

    const pngBuffer = await sharp(svgBuffer, {
      density: dpi, // This sets the DPI for SVG rasterization
    })
      .resize(targetWidth, targetHeight, {
        fit: "fill",
        kernel: "lanczos3", // High-quality resampling
      })
      .png({
        compressionLevel: 6, // Balance between size and quality
        quality: 100,
      })
      .toBuffer();

    // Generate filename
    const outputFilename = filename || generateExportFilename(productType, size, "png");

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const uint8Array = new Uint8Array(pngBuffer);

    // Return the PNG as a downloadable file
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${outputFilename}"`,
        "Content-Length": uint8Array.length.toString(),
        "X-Print-Width": targetWidth.toString(),
        "X-Print-Height": targetHeight.toString(),
        "X-Print-DPI": dpi.toString(),
        "X-Print-Size": size,
      },
    });
  } catch (error) {
    console.error("Print export error:", error);
    
    // Check for specific sharp errors
    if (error instanceof Error) {
      if (error.message.includes("sharp")) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Image processing failed. Please try again.",
            details: error.message 
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: "Failed to generate print file" },
      { status: 500 }
    );
  }
}

/**
 * Ensure SVG has width/height attributes for proper rendering
 */
function ensureSvgDimensions(svg: string, width: number, height: number): string {
  // Check if SVG already has width/height
  if (svg.includes('width="') && svg.includes('height="')) {
    return svg;
  }
  
  // Add dimensions to SVG tag
  return svg.replace(
    "<svg",
    `<svg width="${width}" height="${height}"`
  );
}

/**
 * GET endpoint to check export capabilities and get info
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    capabilities: {
      formats: ["png"],
      sizes: Object.keys(PRINT_DIMENSIONS),
      dpiLevels: Object.keys(DPI_SETTINGS),
      maxDpi: DPI_SETTINGS.ultra,
    },
    dimensions: {
      A4: { 
        pixels: PRINT_DIMENSIONS.A4, 
        mm: { width: 210, height: 297 } 
      },
      A3: { 
        pixels: PRINT_DIMENSIONS.A3, 
        mm: { width: 297, height: 420 } 
      },
      A2: { 
        pixels: PRINT_DIMENSIONS.A2, 
        mm: { width: 420, height: 594 } 
      },
    },
  });
}
