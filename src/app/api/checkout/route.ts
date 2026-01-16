// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrintCustomization, ProductSelection, PrintSize } from "@/types";
import { priceConfig, getSizeDetails } from "@/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CheckoutRequestBody {
  customization: PrintCustomization;
  product: ProductSelection;
  // SECURITY: totalPrice from client is now ignored - calculated server-side
  totalPrice?: number;
}

/**
 * SECURITY: Calculate price server-side to prevent price manipulation attacks
 * Never trust price values from the client
 */
function calculateServerSidePrice(size: PrintSize, frameId: string): number {
  // Validate size
  const sizeConfig = priceConfig.sizes[size];
  if (!sizeConfig) {
    throw new Error(`Invalid size: ${size}`);
  }

  // Validate and get frame price
  const frame = priceConfig.frames.find((f) => f.id === frameId);
  if (!frame) {
    throw new Error(`Invalid frame: ${frameId}`);
  }

  return sizeConfig.price + frame.price;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { customization, product } = body;

    // Validate required fields
    if (!customization.location) {
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 }
      );
    }

    if (!product.size || !product.frame?.id) {
      return NextResponse.json(
        { error: "Product size and frame are required" },
        { status: 400 }
      );
    }

    // SECURITY: Calculate price server-side - ignore client-provided price
    let serverCalculatedPrice: number;
    try {
      serverCalculatedPrice = calculateServerSidePrice(product.size, product.frame.id);
    } catch (error) {
      console.error("Price calculation error:", error);
      return NextResponse.json(
        { error: "Invalid product configuration" },
        { status: 400 }
      );
    }

    const sizeDetails = getSizeDetails(product.size);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Build product description
    const productDescription = [
      `${sizeDetails.name} Print (${sizeDetails.dimensions})`,
      product.frame.id !== "none" ? `with ${product.frame.name}` : "Print Only",
      `| ${customization.style.charAt(0).toUpperCase() + customization.style.slice(1)} Style`,
    ].join(" ");

    // Create Stripe Checkout Session with server-calculated price
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
              name: "EverHere Prints - Custom Map Print",
              description: productDescription,
              images: [],
              metadata: {
                location_name: customization.location.placeName,
                latitude: customization.location.latitude.toString(),
                longitude: customization.location.longitude.toString(),
                zoom: customization.zoom.toString(),
                style: customization.style,
                title: customization.title,
                subtitle: customization.subtitle,
                date: customization.date,
                size: product.size,
                frame: product.frame.id,
              },
            },
            // SECURITY: Use server-calculated price, not client-provided
            unit_amount: serverCalculatedPrice,
          },
          quantity: 1,
        },
      ],
      metadata: {
        location_name: customization.location.placeName,
        latitude: customization.location.latitude.toString(),
        longitude: customization.location.longitude.toString(),
        zoom: customization.zoom.toString(),
        style: customization.style,
        title: customization.title,
        subtitle: customization.subtitle,
        date: customization.date,
        size: product.size,
        frame: product.frame.id,
        // Store the calculated price for verification
        calculated_price: serverCalculatedPrice.toString(),
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelled`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    // SECURITY: Don't leak error details to client
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
