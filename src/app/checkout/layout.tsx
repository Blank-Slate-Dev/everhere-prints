// src/app/checkout/layout.tsx
// Custom layout for checkout - full screen overlay that covers main site

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | EverHere Prints",
  description: "Complete your order securely",
  robots: "noindex, nofollow",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="checkout-layout">
      {/* This wraps the checkout page which uses fixed positioning */}
      {/* The fixed inset-0 z-50 on the page will cover the root layout's Header/Footer */}
      {children}
    </div>
  );
}