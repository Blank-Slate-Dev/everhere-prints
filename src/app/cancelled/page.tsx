// src/app/cancelled/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";

export default function CancelledPage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 bg-cream flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-20 h-20 mx-auto bg-brand-100 rounded-full flex items-center justify-center mb-8"
        >
          <XCircle className="w-10 h-10 text-brand-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-charcoal">
            Order Cancelled
          </h1>

          <p className="mt-4 text-lg text-brand-600 max-w-lg mx-auto">
            Your order was cancelled and you haven&apos;t been charged. Your map
            design is still saved if you&apos;d like to continue.
          </p>
        </motion.div>

        {/* Reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 bg-white rounded-2xl p-8 border border-brand-100 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-charcoal mb-4">
            Changed your mind?
          </h2>
          <p className="text-brand-600 max-w-md mx-auto">
            No worries! You can return to the editor and continue designing your
            print. We&apos;ll keep your customizations ready for when you&apos;re ready to
            order.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/create">
            <Button size="lg" className="group">
              <ArrowLeft
                size={18}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />
              Back to Editor
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Return Home
            </Button>
          </Link>
        </motion.div>

        {/* Support Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm text-brand-500 flex items-center justify-center gap-2"
        >
          <HelpCircle size={14} />
          Need help?{" "}
          <Link href="/contact" className="underline hover:text-charcoal">
            Contact our support team
          </Link>
        </motion.p>
      </div>
    </div>
  );
}