// src/app/manifest.webmanifest/route.ts

import { NextResponse } from "next/server";

const SITE_NAME = "EverHere Prints";
const SITE_DESCRIPTION = "Premium personalised map prints, star maps, moon phase art & sound wave prints. Handcrafted in Australia. Free shipping nationwide.";

export function GET() {
  const manifest = {
    name: SITE_NAME,
    short_name: "EverHere",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#292524",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["shopping", "lifestyle", "personalization"],
    screenshots: [
      {
        src: "/screenshots/home.png",
        sizes: "1280x720",
        type: "image/png",
      },
      {
        src: "/screenshots/product.png",
        sizes: "1280x720",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Create Star Map",
        url: "/star-map",
        description: "Design a custom star map",
      },
      {
        name: "Where We Met Map",
        url: "/where-we-met",
        description: "Create a location map print",
      },
      {
        name: "Gift Ideas",
        url: "/gifts",
        description: "Browse gift guides",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}