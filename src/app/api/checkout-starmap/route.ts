// src/app/api/checkout-starmap/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { StarMapProductSelection } from "@/types";
import { getSizeDetails } from "@/lib/pricing";
import { getStarMapStyle } from "@/lib/starMapConfig";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface StarMapCustomizationPayload {
  title: string;
  subtitle: string;
  dateText: string;
  date: string; // ISO string
  time: string;
  location: {
    longitude: number;
    latitude: number;
    placeName: string;
  } | null;
  styleId: string;
  showConstellations: boolean;
  showConstellationNames: boolean;
  showGrid: boolean;
  showMilkyWay: boolean;
}

interface CheckoutRequestBody {
  customization: StarMapCustomizationPayload;
  product: StarMapProductSelection;
  totalPrice: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { customization, product, totalPrice } = body;

    if (!customization.location) {
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 }
      );
    }

    const sizeDetails = getSizeDetails(product.size);
    const styleConfig = getStarMapStyle(customization.styleId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Format date for description
    const dateObj = new Date(customization.date);
    const formattedDate = dateObj.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Build product description
    const productDescription = [
      `Star Map - ${styleConfig.name}`,
      `${formattedDate} at ${customization.time}`,
      `${sizeDetails.name} Print (${sizeDetails.dimensions})`,
      product.frame.id !== "none" ? `with ${product.frame.name}` : "Print Only",
    ].join(" | ");

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
              name: "EverHere Prints - Star Map",
              description: productDescription,
              images: [],
              metadata: {
                product_type: "star_map",
                location_name: customization.location.placeName,
                latitude: customization.location.latitude.toString(),
                longitude: customization.location.longitude.toString(),
                date: customization.date,
                time: customization.time,
                style_id: customization.styleId,
                style_name: styleConfig.name,
                title: customization.title,
                subtitle: customization.subtitle,
                date_text: customization.dateText,
                show_constellations: customization.showConstellations.toString(),
                show_constellation_names: customization.showConstellationNames.toString(),
                show_grid: customization.showGrid.toString(),
                show_milky_way: customization.showMilkyWay.toString(),
                size: product.size,
                frame: product.frame.id,
              },
            },
            unit_amount: totalPrice,
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_type: "star_map",
        location_name: customization.location.placeName,
        latitude: customization.location.latitude.toString(),
        longitude: customization.location.longitude.toString(),
        date: customization.date,
        time: customization.time,
        style_id: customization.styleId,
        title: customization.title,
        subtitle: customization.subtitle,
        date_text: customization.dateText,
        show_constellations: customization.showConstellations.toString(),
        show_constellation_names: customization.showConstellationNames.toString(),
        show_grid: customization.showGrid.toString(),
        show_milky_way: customization.showMilkyWay.toString(),
        size: product.size,
        frame: product.frame.id,
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