// src/app/feed.xml/route.ts

import { SITE_CONFIG } from '@/lib/seo/constants';
import { getAllPosts } from '@/lib/blog/posts';

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = SITE_CONFIG.url;

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${SITE_CONFIG.business.email} (${post.author.name})</author>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
      <enclosure url="${baseUrl}${post.image}" type="image/jpeg" />
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>${SITE_CONFIG.name} Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Gift ideas, inspiration, and guides for personalised prints from EverHere Prints.</description>
    <language>en-AU</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}${SITE_CONFIG.images.logo}</url>
      <title>${SITE_CONFIG.name}</title>
      <link>${baseUrl}</link>
    </image>
    <copyright>© ${new Date().getFullYear()} ${SITE_CONFIG.name}. All rights reserved.</copyright>
    <managingEditor>${SITE_CONFIG.business.email} (${SITE_CONFIG.name})</managingEditor>
    <webMaster>${SITE_CONFIG.business.email} (${SITE_CONFIG.name})</webMaster>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
