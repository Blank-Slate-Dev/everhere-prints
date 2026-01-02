// src/app/api/checkout-moonphase/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { MoonPhaseProductSelection } from "@/types";
import { getSizeDetails } from "@/lib/pricing";
import { getMoonPhaseStyle } from "@/lib/moonPhaseConfig";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface MoonPhaseCustomizationPayload {
  title: string;
  subtitle: string;
  dateText: string;
  date: string; // ISO string
  styleId: string;
  showStars: boolean;
  showPhaseLabel: boolean;
}

interface CheckoutRequestBody {
  customization: MoonPhaseCustomizationPayload;
  product: MoonPhaseProductSelection;
  totalPrice: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { customization, product, totalPrice } = body;

    const sizeDetails = getSizeDetails(product.size);
    const styleConfig = getMoonPhaseStyle(customization.styleId);
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
      `Moon Phase Print - ${styleConfig.name}`,
      formattedDate,
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
              name: "EverHere Prints - Moon Phase Print",
              description: productDescription,
              images: [],
              metadata: {
                product_type: "moon_phase",
                date: customization.date,
                formatted_date: formattedDate,
                style_id: customization.styleId,
                style_name: styleConfig.name,
                title: customization.title,
                subtitle: customization.subtitle,
                date_text: customization.dateText,
                show_stars: customization.showStars.toString(),
                show_phase_label: customization.showPhaseLabel.toString(),
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
        product_type: "moon_phase",
        date: customization.date,
        formatted_date: formattedDate,
        style_id: customization.styleId,
        style_name: styleConfig.name,
        title: customization.title,
        subtitle: customization.subtitle,
        date_text: customization.dateText,
        show_stars: customization.showStars.toString(),
        show_phase_label: customization.showPhaseLabel.toString(),
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
