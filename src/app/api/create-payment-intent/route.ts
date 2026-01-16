// src/app/api/create-payment-intent/route.ts
// Creates a Payment Intent for embedded checkout
// SECURITY: Prices are calculated server-side

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrintSize } from "@/types";
import { calculateProductPrice, ProductType } from "@/lib/serverPricing";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2025-12-15.clover",
});

interface PaymentIntentRequest {
  // SECURITY: amount is now optional and validated against server calculation
  amount?: number;
  productType: string;
  productName: string;
  productDescription: string;
  metadata: Record<string, string>;
  customerEmail?: string;
  // Required for server-side price calculation
  size: string;
  frameId: string;
}

/**
 * Map product type strings to valid ProductType
 */
function mapProductType(type: string): ProductType {
  const typeMap: Record<string, ProductType> = {
    map: "map",
    star_map: "star_map",
    starmap: "star_map",
    moon_phase: "moon_phase",
    moonphase: "moon_phase",
    soundwave: "soundwave",
    australia: "australia",
    newzealand: "newzealand",
  };

  const mapped = typeMap[type.toLowerCase()];
  if (!mapped) {
    throw new Error(`Unknown product type: ${type}`);
  }
  return mapped;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentIntentRequest = await request.json();
    const {
      productType,
      productName,
      productDescription,
      metadata,
      customerEmail,
      size,
      frameId,
    } = body;

    // Validate required fields
    if (!size || !frameId) {
      return NextResponse.json(
        { error: "Size and frame are required for pricing" },
        { status: 400 }
      );
    }

    // SECURITY: Calculate price server-side
    let serverCalculatedPrice: number;
    try {
      const mappedProductType = mapProductType(productType);
      serverCalculatedPrice = calculateProductPrice(
        mappedProductType,
        size as PrintSize,
        frameId
      );
    } catch (error) {
      console.error("Price calculation error:", error);
      return NextResponse.json(
        { error: "Invalid product configuration" },
        { status: 400 }
      );
    }

    // SECURITY: Log if client price doesn't match (for monitoring)
    if (body.amount && body.amount !== serverCalculatedPrice) {
      console.warn(
        `SECURITY: Price mismatch in payment intent! ` +
          `Client: ${body.amount}, Server: ${serverCalculatedPrice}, ` +
          `Product: ${productType}, Size: ${size}, Frame: ${frameId}`
      );
    }

    // Create a PaymentIntent with SERVER-CALCULATED price
    const paymentIntent = await stripe.paymentIntents.create({
      amount: serverCalculatedPrice, // SECURITY: Always use server price
      currency: "aud",
      automatic_payment_methods: { enabled: true },
      metadata: {
        product_type: productType,
        product_name: productName,
        size,
        frame_id: frameId,
        calculated_price: serverCalculatedPrice.toString(),
        ...(metadata ?? {}),
      },
      description: productDescription,
      receipt_email: customerEmail,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      // Return the server-calculated price so client can update UI
      amount: serverCalculatedPrice,
    });
  } catch (error) {
    // SECURITY: Don't leak error details
    console.error("Payment intent error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
