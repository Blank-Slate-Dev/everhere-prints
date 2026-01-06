// src/app/privacy-policy/page.tsx

import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/seo';

export const metadata: Metadata = genMeta({
  title: 'Privacy Policy | EverHere Prints',
  description: 'Our privacy policy explains how EverHere Prints collects, uses, and protects your personal information.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl text-stone-900 mb-8">Privacy Policy</h1>
        <p className="text-stone-500 mb-8">Last updated: January 2026</p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Introduction</h2>
            <p>
              EverHere Prints ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website everhereprints.com.au and make purchases 
              from us.
            </p>
            <p>
              We are based in Sydney, Australia, and comply with the Australian Privacy 
              Principles (APPs) contained in the Privacy Act 1988 (Cth).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Information We Collect</h2>
            <h3 className="font-medium text-lg text-stone-900 mb-2">Personal Information</h3>
            <p>When you place an order, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and email address</li>
              <li>Shipping and billing address</li>
              <li>Phone number (for delivery purposes)</li>
              <li>Payment information (processed securely by Stripe)</li>
              <li>Order details and customisation preferences</li>
            </ul>

            <h3 className="font-medium text-lg text-stone-900 mb-2 mt-6">Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfil your orders</li>
              <li>Communicate with you about your order</li>
              <li>Send shipping updates and tracking information</li>
              <li>Respond to customer service requests</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">How We Protect Your Information</h2>
            <p>
              We implement appropriate technical and organisational security measures to 
              protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL encryption for all data transmission</li>
              <li>Secure payment processing through Stripe (PCI-DSS compliant)</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Shipping carriers:</strong> To deliver your order (Australia Post, courier services)</li>
              <li><strong>Payment processors:</strong> Stripe processes all payments securely</li>
              <li><strong>Analytics providers:</strong> To understand website usage (anonymised data)</li>
              <li><strong>Legal requirements:</strong> If required by law or to protect our rights</li>
            </ul>
            <p className="mt-4">We never sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential cookies:</strong> Required for the website to function</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
            </ul>
            <p className="mt-4">
              You can control cookies through your browser settings. Disabling certain cookies 
              may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Your Rights</h2>
            <p>Under Australian privacy law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfil the 
              purposes for which it was collected, including to satisfy legal, accounting, 
              or reporting requirements. Order records are typically retained for 7 years 
              for tax purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than 
              Australia, including the United States (for payment processing via Stripe). 
              We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Children's Privacy</h2>
            <p>
              Our website is not intended for children under 16. We do not knowingly collect 
              personal information from children. If you believe we have collected information 
              from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of 
              significant changes by posting the new policy on this page and updating the 
              "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, 
              please contact us:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> privacy@everhereprints.com.au</li>
              <li><strong>Address:</strong> Sydney, NSW, Australia</li>
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
