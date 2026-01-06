// src/app/blog/[slug]/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2 } from 'lucide-react';
import { generateArticleMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs, ArticleSchema, JsonLd } from '@/components/seo';
import { generateBreadcrumbSchema } from '@/lib/seo/schemas';
import { SITE_CONFIG } from '@/lib/seo/constants';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
} from '@/lib/blog/posts';

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return generateArticleMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author.name,
    tags: post.tags,
    section: post.category,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const breadcrumbItems = [
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    ...breadcrumbItems,
  ]);

  return (
    <>
      {/* Schema markup */}
      <ArticleSchema
        title={post.title}
        description={post.description}
        image={post.image}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={post.author.name}
      />
      <JsonLd data={breadcrumbSchema} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Article Header */}
        <article>
          <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <span className="inline-block px-3 py-1 text-xs font-medium text-stone-600 bg-stone-100 rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-6 text-balance">
              {post.title}
            </h1>

            <p className="text-xl text-stone-600 mb-8">{post.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-stone-500">
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="prose-custom">
              {/* 
                In a real implementation, content would come from MDX or a CMS.
                This is placeholder content structure.
              */}
              <p>
                This is where the full article content would be rendered. In a production
                implementation, this would typically come from:
              </p>
              <ul>
                <li>MDX files processed at build time</li>
                <li>A headless CMS like Sanity, Contentful, or Strapi</li>
                <li>A database with rich text content</li>
              </ul>
              <p>
                The content would be rendered using a component like{' '}
                <code>@next/mdx</code> or a rich text renderer from your CMS.
              </p>

              <h2>Why This Matters for SEO</h2>
              <p>
                Each blog post page includes comprehensive structured data (JSON-LD),
                optimised meta tags, breadcrumb navigation, and semantic HTML structure.
                This helps search engines understand and properly index your content.
              </p>

              <h2>Next Steps</h2>
              <p>
                To add real content to this blog post template, you would integrate
                with your preferred content management system or set up MDX processing
                for markdown-based content.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-stone-200">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-1 text-sm text-stone-600 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm text-stone-500">Share this article:</span>
              <button
                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
                aria-label="Share article"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-stone-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl text-stone-900 mb-8">
                Related Articles
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.slug} className="group">
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="relative aspect-[4/3] block mb-4"
                    >
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.imageAlt}
                        fill
                        className="object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </Link>
                    <h3 className="font-serif text-lg text-stone-900 mb-2 line-clamp-2">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="hover:text-stone-600 transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-stone-600 line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl text-stone-900 mb-4">
              Ready to Create Your Own?
            </h2>
            <p className="text-stone-600 mb-8">
              Design a personalised print that captures your special moments.
            </p>
            <Link
              href="/star-map"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
