// src/app/not-found.tsx

import Link from 'next/link';
import { Home, Search, ArrowRight, Star, MapPin, Moon, Music } from 'lucide-react';

const popularPages = [
  { name: 'Star Maps', href: '/star-map', icon: Star },
  { name: 'Where We Met', href: '/where-we-met', icon: MapPin },
  { name: 'Moon Phase', href: '/moon-phase', icon: Moon },
  { name: 'Sound Wave Art', href: '/sound-wave', icon: Music },
];

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-serif text-stone-200 mb-4">404</div>
          <div className="w-24 h-1 bg-stone-200 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-stone-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been
          moved, deleted, or perhaps the URL was mistyped.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/gifts"
            className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-6 py-3 rounded-full font-medium hover:bg-stone-50 transition-colors"
          >
            <Search className="w-5 h-5" />
            Browse Gifts
          </Link>
        </div>

        {/* Popular Pages */}
        <div>
          <p className="text-sm text-stone-500 mb-4">Or try one of our popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-700 hover:bg-stone-200 transition-colors"
              >
                <page.icon className="w-4 h-4" />
                {page.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Help */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-sm text-stone-500">
            Still can't find what you're looking for?{' '}
            <Link href="/contact" className="text-stone-900 underline hover:no-underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
