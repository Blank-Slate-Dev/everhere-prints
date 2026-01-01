// src/app/page.tsx
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import LifestyleShowcase from "@/components/home/LifestyleShowcase";
import Testimonials from "@/components/home/Testimonials";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <LifestyleShowcase />
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-24 lg:py-32 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold">
            Ready to capture your
            <br />
            <span className="text-brand-400">special place?</span>
          </h2>
          <p className="mt-6 text-lg text-brand-300 max-w-2xl mx-auto">
            Create a personalised map print in minutes. The perfect gift for
            anniversaries, weddings, or any moment worth remembering.
          </p>
          <div className="mt-10">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-charcoal hover:bg-brand-100"
              >
                Create Your Map Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
