// src/components/checkout/StripeProvider.tsx
"use client";

import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Appearance } from "@stripe/stripe-js";

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Custom appearance to match your brand
const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#292524", // charcoal
    colorBackground: "#ffffff",
    colorText: "#1c1917",
    colorDanger: "#dc2626",
    fontFamily: "system-ui, -apple-system, sans-serif",
    spacingUnit: "4px",
    borderRadius: "8px",
    fontSizeBase: "16px",
  },
  rules: {
    ".Input": {
      border: "1px solid #e7e5e4",
      boxShadow: "none",
      padding: "12px 14px",
    },
    ".Input:focus": {
      border: "1px solid #292524",
      boxShadow: "0 0 0 1px #292524",
    },
    ".Input--invalid": {
      border: "1px solid #dc2626",
    },
    ".Label": {
      fontWeight: "500",
      color: "#44403c",
      marginBottom: "6px",
    },
    ".Error": {
      color: "#dc2626",
      fontSize: "14px",
    },
  },
};

interface StripeProviderProps {
  children: ReactNode;
  clientSecret: string;
}

export default function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
