// src/app/api/create-payment-intent/route.ts
// Creates a Payment Intent for embedded checkout

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

const stripe = new Stripe(secretKey, {
  // Your installed Stripe types only allow this literal right now:
  apiVersion: "2025-12-15.clover",
});

interface PaymentIntentRequest {
  amount: number; // in cents
  productType: string;
  productName: string;
  productDescription: string;
  metadata: Record<string, string>;
  customerEmail?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentIntentRequest = await request.json();
    const {
      amount,
      productType,
      productName,
      productDescription,
      metadata,
      customerEmail,
    } = body;

    // Validate amount
    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aud",
      automatic_payment_methods: { enabled: true },
      metadata: {
        product_type: productType,
        product_name: productName,
        ...(metadata ?? {}),
      },
      description: productDescription,
      receipt_email: customerEmail,
      // Shipping will be collected in the form
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
  }
}
