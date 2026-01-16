// src/app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { verifySessionToken } from "@/lib/adminAuth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Verify admin authentication from request cookies
 */
async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  try {
    // SECURITY: Verify admin authentication
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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
    // SECURITY: Don't leak error details to client
    console.error("Admin orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
