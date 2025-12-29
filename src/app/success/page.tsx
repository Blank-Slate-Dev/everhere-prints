// src/app/success/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // In a production app, you would verify the session with Stripe here
      // For now, we'll just mark it as verified
      setIsVerified(true);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal">
            Thank you for your order!
          </h1>

          <p className="mt-4 text-lg text-brand-600 max-w-lg mx-auto">
            Your personalised map print is being prepared with care. We can&apos;t
            wait for you to see it.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 bg-white rounded-2xl p-8 border border-brand-100 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-charcoal mb-6">
            What happens next?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p className="font-medium text-charcoal">Confirmation Email</p>
                <p className="text-sm text-brand-600 mt-1">
                  You&apos;ll receive an order confirmation email shortly with all
                  the details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <p className="font-medium text-charcoal">Production & Shipping</p>
                <p className="text-sm text-brand-600 mt-1">
                  Your print will be carefully produced and shipped within 5-7
                  business days.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/create">
            <Button variant="outline" size="lg" className="group">
              Create Another Print
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="lg">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Support Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm text-brand-500"
        >
          Questions about your order?{" "}
          <Link href="/contact" className="underline hover:text-charcoal">
            Contact our support team
          </Link>
        </motion.p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-20 lg:pt-24 bg-cream flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-300 border-t-brand-600 rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}