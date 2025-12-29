// src/components/layout/Footer.tsx
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif font-semibold">
                EverHere
                <span className="text-brand-400"> Prints</span>
              </span>
            </Link>
            <p className="mt-4 text-brand-300 max-w-md">
              Beautiful, personalised map prints that capture the places that
              mean the most to you. Perfect for anniversaries, weddings, and
              cherished memories.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/create"
                  className="text-brand-300 hover:text-white transition-colors"
                >
                  Create Your Map
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-brand-300 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="text-brand-300 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#reviews"
                  className="text-brand-300 hover:text-white transition-colors"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-brand-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-brand-300 hover:text-white transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-brand-300 hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-brand-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-400">
            © {currentYear} EverHere Prints. All rights reserved.
          </p>
          <p className="text-sm text-brand-400 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-400" /> in Australia
          </p>
        </div>
      </div>
    </footer>
  );
}