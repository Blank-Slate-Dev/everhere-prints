// src/app/api/checkout-australia/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { AustraliaMapCustomization, AustraliaProductSelection } from "@/types";
import { getSizeDetails } from "@/lib/pricing";
import { getAustraliaMapColor } from "@/lib/australiaMapConfig";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CheckoutRequestBody {
  customization: AustraliaMapCustomization;
  product: AustraliaProductSelection;
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
    const colorConfig = getAustraliaMapColor(customization.colorId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Build product description
    const productDescription = [
      `Australia Map - ${colorConfig.name}`,
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
              name: "EverHere Prints - Australia Map",
              description: productDescription,
              images: [],
              metadata: {
                product_type: "australia_map",
                location_name: customization.location.placeName,
                latitude: customization.location.latitude.toString(),
                longitude: customization.location.longitude.toString(),
                color_id: customization.colorId,
                color_name: colorConfig.name,
                title: customization.title,
                subtitle: customization.subtitle,
                date: customization.date,
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
        product_type: "australia_map",
        location_name: customization.location.placeName,
        latitude: customization.location.latitude.toString(),
        longitude: customization.location.longitude.toString(),
        color_id: customization.colorId,
        color_name: colorConfig.name,
        title: customization.title,
        subtitle: customization.subtitle,
        date: customization.date,
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