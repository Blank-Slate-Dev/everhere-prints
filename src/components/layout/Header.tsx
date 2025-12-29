// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 sm:h-28 lg:h-32">
          {/* Logo + Slogan */}
          <Link href="/" className="flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <Image
                src="/logo.png"
                alt="EverHere Prints"
                width={681}
                height={438}
                priority
                className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
              />
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin size={12} className="text-charcoal" />
                <span className="text-xs font-medium text-charcoal tracking-wide">
                  Here, forever.
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-brand-700 hover:text-charcoal transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium text-brand-700 hover:text-charcoal transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#reviews"
              className="text-sm font-medium text-brand-700 hover:text-charcoal transition-colors"
            >
              Reviews
            </Link>
            <Link href="/create">
              <Button size="sm">Create Your Map</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-t border-brand-100"
          >
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/#how-it-works"
                className="block text-brand-700 hover:text-charcoal transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/#features"
                className="block text-brand-700 hover:text-charcoal transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#reviews"
                className="block text-brand-700 hover:text-charcoal transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link href="/create" onClick={() => setIsMobileMenuOpen(false)}>
                <Button fullWidth>Create Your Map</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}