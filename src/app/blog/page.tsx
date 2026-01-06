// src/app/blog/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, JsonLd } from '@/components/seo';
import { generateCollectionPageSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG, PAGE_META } from '@/lib/seo/constants';
import { getAllPosts, getAllCategories, formatDate, getFeaturedPosts } from '@/lib/blog/posts';

export const metadata: Metadata = genMeta({
  title: PAGE_META.blog.title,
  description: PAGE_META.blog.description,
  keywords: PAGE_META.X.keywords,
  path: '/blog',
  image: '/images/og/blog.jpg',
});

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts(1);
  const categories = getAllCategories();

  const collectionSchema = generateCollectionPageSchema({
    name: 'EverHere Prints Blog',
    description: PAGE_META.blog.description,
    url: `${SITE_CONFIG.url}/blog`,
    image: `${SITE_CONFIG.url}/images/og/blog.jpg`,
  });

  return (
    <>
      <JsonLd data={collectionSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
              Gift Ideas & Inspiration
            </h1>
            <p className="text-lg text-stone-600">
              Discover gift ideas, learn about star maps and moon phases, and find
              inspiration for celebrating your special moments.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="border-y border-stone-200 bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
              <Link
                href="/blog"
                className="text-sm font-medium text-stone-900 whitespace-nowrap"
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-stone-500 hover:text-stone-900 whitespace-nowrap transition-colors"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="grid lg:grid-cols-2 gap-8 items-center">
              <Link
                href={`/blog/${featuredPosts[0].slug}`}
                className="relative aspect-[4/3] block group"
              >
                <Image
                  src={featuredPosts[0].image}
                  alt={featuredPosts[0].imageAlt}
                  fill
                  className="object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </Link>
              <div>
                <span className="inline-block px-3 py-1 text-xs font-medium text-stone-600 bg-stone-100 rounded-full mb-4">
                  {featuredPosts[0].category}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-4">
                  <Link
                    href={`/blog/${featuredPosts[0].slug}`}
                    className="hover:text-stone-600 transition-colors"
                  >
                    {featuredPosts[0].title}
                  </Link>
                </h2>
                <p className="text-stone-600 mb-6">{featuredPosts[0].description}</p>
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredPosts[0].publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPosts[0].readingTime} min read
                  </span>
                </div>
                <Link
                  href={`/blog/${featuredPosts[0].slug}`}
                  className="inline-flex items-center gap-2 text-stone-900 font-medium hover:gap-3 transition-all"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h2 className="font-serif text-2xl text-stone-900 mb-8">All Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <article key={post.slug} className="group">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-[4/3] block mb-4"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </Link>
                <span className="inline-block px-2 py-0.5 text-xs text-stone-500 bg-stone-100 rounded mb-2">
                  {post.category}
                </span>
                <h3 className="font-serif text-lg text-stone-900 mb-2 line-clamp-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-stone-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-stone-600 line-clamp-2 mb-3">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl text-stone-900 mb-4">
              Get Gift Ideas & Inspiration
            </h2>
            <p className="text-stone-600 mb-6">
              Subscribe to our newsletter for the latest gift guides, seasonal
              inspiration, and exclusive offers.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-stone-400 mt-3">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
