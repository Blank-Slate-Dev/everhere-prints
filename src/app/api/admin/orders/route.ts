// src/app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: NextRequest) {
  try {
    // Fetch all PaymentIntents from Stripe
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    });

    // Return all succeeded payments as orders
    const orders = paymentIntents.data
      .filter((pi) => pi.status === "succeeded")
      .map((pi) => ({
        id: pi.id,
        amount: pi.amount,
        currency: pi.currency,
        status: pi.status,
        email: pi.receipt_email || "N/A",
        created: new Date(pi.created * 1000).toISOString(),
        metadata: pi.metadata,
      }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}