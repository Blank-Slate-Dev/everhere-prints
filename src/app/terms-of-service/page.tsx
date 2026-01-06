// src/app/terms-of-service/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/seo';

export const metadata: Metadata = genMeta({
  title: 'Terms of Service | EverHere Prints',
  description: 'Terms and conditions for using EverHere Prints website and purchasing our personalised print products.',
  path: '/terms-of-service',
});

export default function TermsOfServicePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ name: 'Terms of Service', href: '/terms-of-service' }]} />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl text-stone-900 mb-8">Terms of Service</h1>
        <p className="text-stone-500 mb-8">Last updated: January 2026</p>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the EverHere Prints website (everhereprints.com.au) and 
              purchasing our products, you agree to be bound by these Terms of Service. If 
              you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">2. Products and Services</h2>
            <p>
              EverHere Prints creates custom, personalised print products including star maps, 
              location maps, moon phase prints, soundwave art, and related items. Each product 
              is made to order based on your specifications.
            </p>
            <p className="mt-4">
              We strive to display product colours and details as accurately as possible. 
              However, we cannot guarantee that your device's display will accurately reflect 
              the final printed product. Slight variations in colour are normal due to 
              differences in screens, paper, and printing processes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">3. Orders and Payment</h2>
            <h3 className="font-medium text-lg text-stone-900 mb-2">Placing Orders</h3>
            <p>
              When you place an order, you are making an offer to purchase. We reserve the 
              right to accept or decline any order. Orders are confirmed when you receive 
              an order confirmation email.
            </p>

            <h3 className="font-medium text-lg text-stone-900 mb-2 mt-4">Pricing</h3>
            <p>
              All prices are displayed in Australian Dollars (AUD) and include GST. We reserve 
              the right to change prices at any time. The price at the time of your order is 
              the price you will pay.
            </p>

            <h3 className="font-medium text-lg text-stone-900 mb-2 mt-4">Payment</h3>
            <p>
              We accept payment via credit card, debit card, and other methods as displayed 
              at checkout. Payment is processed securely through Stripe. Full payment is 
              required before production begins.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">4. Custom Products</h2>
            <p>
              You are responsible for ensuring all customisation details (dates, locations, 
              text, names) are accurate before completing your order. We produce exactly 
              what you specify. Please double-check all details before ordering.
            </p>
            <p className="mt-4">
              <strong>Accuracy:</strong> Our star maps and moon phases use astronomical 
              databases to show accurate celestial positions for the date and location you 
              provide. Location maps use mapping data from third-party providers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">5. Shipping and Delivery</h2>
            <p>
              Shipping times and costs are detailed on our{' '}
              <Link href="/shipping-returns" className="underline hover:no-underline">
                Shipping & Returns
              </Link>{' '}
              page. Delivery times are estimates and not guaranteed. We are not responsible 
              for delays caused by shipping carriers, customs, or events beyond our control.
            </p>
            <p className="mt-4">
              Risk of loss and title for items purchased pass to you upon delivery to the 
              carrier.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">6. Returns and Refunds</h2>
            <p>
              Because each product is custom-made to your specifications, we cannot accept 
              returns for change of mind. However:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>If there is a printing error on our part, we will reprint at no cost</li>
              <li>If your item arrives damaged, we will replace or refund it</li>
              <li>If there is a quality issue, please contact us within 7 days of delivery</li>
            </ul>
            <p className="mt-4">
              For full details, see our{' '}
              <Link href="/shipping-returns#returns" className="underline hover:no-underline">
                Returns Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">7. Intellectual Property</h2>
            <p>
              All content on this website—including designs, text, graphics, logos, and 
              software—is the property of EverHere Prints or our licensors and is protected 
              by Australian and international copyright laws.
            </p>
            <p className="mt-4">
              When you purchase a print, you receive a physical product for personal use. 
              You do not receive any intellectual property rights in our designs. You may 
              not reproduce, resell, or distribute our products or designs.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">8. User Content</h2>
            <p>
              By submitting content to us (such as custom text, messages, or reviews), you 
              grant us a non-exclusive, royalty-free licence to use that content for 
              fulfilling your order and for marketing purposes (e.g., sharing customer reviews).
            </p>
            <p className="mt-4">
              You represent that any content you submit does not infringe on any third party's 
              rights and does not contain illegal, offensive, or harmful material.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, EverHere Prints shall not be liable 
              for any indirect, incidental, special, consequential, or punitive damages 
              arising from your use of our website or products.
            </p>
            <p className="mt-4">
              Our total liability for any claim arising from these terms or your use of our 
              products shall not exceed the amount you paid for the specific product giving 
              rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">10. Australian Consumer Law</h2>
            <p>
              Nothing in these terms excludes, restricts, or modifies any rights or remedies 
              you may have under the Australian Consumer Law (ACL) which cannot be excluded, 
              restricted, or modified by agreement. If the ACL applies to you, and we supply 
              goods or services to you that are not of a kind ordinarily acquired for personal, 
              domestic, or household use or consumption, our liability is limited to the 
              replacement or repair of the goods or resupply of the services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">11. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the 
              laws of New South Wales, Australia. Any disputes arising from these terms 
              shall be subject to the exclusive jurisdiction of the courts of New South Wales.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be 
              effective immediately upon posting to our website. Your continued use of 
              our website after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4">13. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> hello@everhereprints.com.au</li>
              <li><strong>Website:</strong> <Link href="/contact" className="underline hover:no-underline">Contact Page</Link></li>
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
