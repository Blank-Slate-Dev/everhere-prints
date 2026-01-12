// src/components/checkout/CheckoutForm.tsx
"use client";

import { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { 
  Lock, 
  Truck, 
  Shield, 
  CheckCircle, 
  Loader2,
  CreditCard,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

interface OrderSummary {
  productName: string;
  productDescription: string;
  size: string;
  frame: string;
  subtotal: number;
  shipping: number;
  total: number;
  imageUrl?: string;
}

interface CheckoutFormProps {
  orderSummary: OrderSummary;
  returnUrl: string;
  onSuccess?: () => void;
}

export default function CheckoutForm({ 
  orderSummary, 
  returnUrl,
  onSuccess 
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
          receipt_email: email,
        },
        redirect: "if_required",
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message || "An error occurred");
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setIsComplete(true);
        onSuccess?.();
        // Redirect to success page
        window.location.href = `${returnUrl}?payment_intent=${paymentIntent.id}`;
      }
    } catch (err) {
      setErrorMessage("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(cents / 100);
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Payment Successful!
        </h2>
        <p className="text-stone-600">
          Redirecting to your order confirmation...
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <section>
        <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-charcoal text-white rounded-full text-sm flex items-center justify-center">
            1
          </span>
          Contact Information
        </h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent transition-shadow"
          />
          <p className="text-xs text-stone-500 mt-1.5">
            We&apos;ll send your order confirmation and tracking info here
          </p>
        </div>
      </section>

      {/* Shipping Address */}
      <section>
        <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-charcoal text-white rounded-full text-sm flex items-center justify-center">
            2
          </span>
          Shipping Address
        </h2>
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
          <AddressElement 
            options={{
              mode: "shipping",
              allowedCountries: ["AU", "NZ"],
              fields: {
                phone: "always",
              },
              validation: {
                phone: {
                  required: "always",
                },
              },
            }}
          />
        </div>
      </section>

      {/* Payment */}
      <section>
        <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-charcoal text-white rounded-full text-sm flex items-center justify-center">
            3
          </span>
          Payment Details
        </h2>
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
          <PaymentElement 
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </section>

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm"
        >
          {errorMessage}
        </motion.div>
      )}

      {/* Order Summary (Mobile) */}
      <div className="lg:hidden bg-stone-50 rounded-xl p-4 border border-stone-100">
        <h3 className="font-medium text-charcoal mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-600">Subtotal</span>
            <span>{formatPrice(orderSummary.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600">Shipping</span>
            <span>{orderSummary.shipping === 0 ? "Free" : formatPrice(orderSummary.shipping)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2 border-t border-stone-200">
            <span>Total</span>
            <span>{formatPrice(orderSummary.total)}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-charcoal text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Pay {formatPrice(orderSummary.total)}
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CreditCard className="w-4 h-4" />
          <span>Encrypted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="w-4 h-4" />
          <span>Free Shipping</span>
        </div>
      </div>
    </form>
  );
}
