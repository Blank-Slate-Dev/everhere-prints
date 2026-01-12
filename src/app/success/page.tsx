// src/app/success/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircle, 
  Package, 
  Mail, 
  ArrowRight, 
  Truck, 
  Clock,
  Heart,
  Loader2,
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paymentIntentId = searchParams.get("payment_intent");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Verify either session_id (old flow) or payment_intent (new embedded flow)
    if (sessionId || paymentIntentId) {
      setIsVerified(true);
      // Clear the stored checkout order
      sessionStorage.removeItem("checkoutOrder");
    }
  }, [sessionId, paymentIntentId]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/circlelogo.png"
              alt="EverHere Prints"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold text-charcoal">
              EverHere Prints
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.5 }}
          className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal">
            Thank you for your order!
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-lg mx-auto">
            Your personalised print is being prepared with care. We can&apos;t
            wait for you to see it.
          </p>
        </motion.div>

        {/* What's Next Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-8"
        >
          <div className="px-6 py-4 bg-stone-50 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-charcoal">
              What happens next?
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-charcoal">Confirmation Email</h3>
                <p className="text-sm text-stone-600 mt-1">
                  You&apos;ll receive an order confirmation email shortly with all
                  the details and a receipt.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-charcoal">We Create Your Print</h3>
                <p className="text-sm text-stone-600 mt-1">
                  Our team will carefully produce your custom print with premium
                  materials. Production takes 2-3 business days.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-charcoal">Shipped to You</h3>
                <p className="text-sm text-stone-600 mt-1">
                  Your print will be carefully packaged and shipped. You&apos;ll
                  receive tracking information via email.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8"
        >
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-900">Estimated Delivery</h3>
              <p className="text-sm text-amber-800 mt-1">
                Australian orders typically arrive within 5-10 business days.
                New Zealand orders take 10-14 business days.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-charcoal text-white font-medium rounded-xl hover:bg-stone-800 transition-colors"
          >
            Create Another Print
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-charcoal font-medium rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Thank You Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-stone-500 text-sm">
            <Heart className="w-4 h-4 text-red-400" />
            <span>Made with love in Australia</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
