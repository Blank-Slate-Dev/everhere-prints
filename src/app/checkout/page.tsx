// src/app/checkout/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, 
  Shield, 
  Truck, 
  Clock, 
  Package,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";
import StripeProvider from "@/components/checkout/StripeProvider";
import CheckoutForm from "@/components/checkout/CheckoutForm";

// Order data passed via sessionStorage
interface OrderData {
  productType: string;
  productName: string;
  productDescription: string;
  size: string;
  frame: string;
  frameName: string;
  subtotal: number;
  shipping: number;
  total: number;
  metadata: Record<string, string>;
  returnPath: string;
  previewImage?: string;
}

function CheckoutContent() {
  const router = useRouter();
  
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get order data from sessionStorage
    const storedOrder = sessionStorage.getItem("checkoutOrder");
    
    if (!storedOrder) {
      setError("No order data found. Please go back and try again.");
      setIsLoading(false);
      return;
    }

    try {
      const order: OrderData = JSON.parse(storedOrder);
      setOrderData(order);

      // Create payment intent
      createPaymentIntent(order);
    } catch (err) {
      setError("Invalid order data. Please try again.");
      setIsLoading(false);
    }
  }, []);

  const createPaymentIntent = async (order: OrderData) => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: order.total,
          productType: order.productType,
          productName: order.productName,
          productDescription: order.productDescription,
          metadata: order.metadata,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment");
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (err) {
      setError("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(cents / 100);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-stone-400 mx-auto mb-4" />
          <p className="text-stone-600">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold text-charcoal mb-2">
            Something went wrong
          </h1>
          <p className="text-stone-600 mb-6">{error || "Unable to load checkout"}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const returnUrl = `${baseUrl}/success`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-50 overflow-y-auto">
      {/* Clean Checkout Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/circlelogo.png"
              alt="EverHere Prints"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-semibold text-charcoal text-lg hidden sm:block">
              EverHere Prints
            </span>
          </Link>
          
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back link */}
        <Link
          href={orderData.returnPath || "/products"}
          className="inline-flex items-center gap-1 text-stone-500 hover:text-charcoal mb-6 text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to editor
        </Link>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Left: Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 sm:p-8">
              <h1 className="text-xl sm:text-2xl font-semibold text-charcoal mb-6">
                Checkout
              </h1>
              
              {clientSecret ? (
                <StripeProvider clientSecret={clientSecret}>
                  <CheckoutForm
                    orderSummary={{
                      productName: orderData.productName,
                      productDescription: orderData.productDescription,
                      size: orderData.size,
                      frame: orderData.frameName,
                      subtotal: orderData.subtotal,
                      shipping: orderData.shipping,
                      total: orderData.total,
                    }}
                    returnUrl={returnUrl}
                  />
                </StripeProvider>
              ) : (
                <div className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-stone-400 mx-auto" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 sm:p-8 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-charcoal mb-6">
                Order Summary
              </h2>

              {/* Product */}
              <div className="flex gap-4 pb-6 border-b border-stone-100">
                {orderData.previewImage ? (
                  <div className="w-20 h-28 sm:w-24 sm:h-32 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={orderData.previewImage}
                      alt={orderData.productName}
                      width={96}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-28 sm:w-24 sm:h-32 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <Package className="w-8 h-8 text-stone-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-charcoal text-sm sm:text-base">
                    {orderData.productName}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 line-clamp-2">
                    {orderData.productDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                      {orderData.size}
                    </span>
                    <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                      {orderData.frameName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="py-5 space-y-3 border-b border-stone-100">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="text-charcoal font-medium">{formatPrice(orderData.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-5">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-charcoal">Total</span>
                  <span className="text-2xl font-bold text-charcoal">
                    {formatPrice(orderData.total)}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1 text-right">Including GST</p>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-stone-100 space-y-3">
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Free shipping Australia-wide</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Ships within 2-3 business days</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <span>Quality guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-stone-200 mt-12 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <p>© {new Date().getFullYear()} EverHere Prints</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-charcoal transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-charcoal transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-50 bg-stone-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}