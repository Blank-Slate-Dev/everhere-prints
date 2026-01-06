// src/lib/blog/types.ts

export type BlogCategory =
  | 'gift-guides'
  | 'how-to'
  | 'inspiration'
  | 'behind-the-scenes';

export interface BlogAuthor {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: BlogAuthor;
  image: string;
  imageAlt: string;
  category: BlogCategory;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  'gift-guides': 'Gift Guides',
  'how-to': 'How To',
  'inspiration': 'Inspiration',
  'behind-the-scenes': 'Behind the Scenes',
};

export const CATEGORY_DESCRIPTIONS: Record<BlogCategory, string> = {
  'gift-guides': 'Find the perfect personalised gift for any occasion',
  'how-to': 'Tips and tutorials for creating beautiful prints',
  'inspiration': 'Ideas and stories to inspire your next gift',
  'behind-the-scenes': 'A look at how we create your prints',
};
