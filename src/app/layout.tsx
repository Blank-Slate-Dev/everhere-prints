// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "EverHere Prints - Personalised Map Prints | Where We Met",
  description:
    "Create beautiful, personalised map prints of the places that matter most. Perfect for anniversaries, weddings, and cherished memories. Premium quality, handcrafted in Australia.",
  keywords: [
    "where we met map print",
    "custom map print",
    "personalised map poster",
    "anniversary map gift",
    "wedding location print",
    "couple map print",
    "location art print",
  ],
  authors: [{ name: "EverHere Prints" }],
  openGraph: {
    title: "EverHere Prints - Personalised Map Prints",
    description:
      "Create beautiful, personalised map prints of the places that matter most.",
    type: "website",
    locale: "en_GB",
    siteName: "EverHere Prints",
  },
  twitter: {
    card: "summary_large_image",
    title: "EverHere Prints - Personalised Map Prints",
    description:
      "Create beautiful, personalised map prints of the places that matter most.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream text-charcoal antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
