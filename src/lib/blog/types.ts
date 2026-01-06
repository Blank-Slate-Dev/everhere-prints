// src/lib/blog/types.ts

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  image: string;
  imageAlt: string;
  category: BlogCategory;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

export type BlogCategory =
  | 'gift-guides'
  | 'how-to'
  | 'inspiration'
  | 'behind-the-scenes';

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  'gift-ideas': 'Gift Ideas',
  'product-guides': 'Product Guides',
  occasions: 'Occasions',
  'how-to': 'How To',
  inspiration: 'Inspiration',
};

export const CATEGORY_DESCRIPTIONS: Record<BlogCategory, string> = {
  'gift-ideas': 'Discover unique personalised gift ideas for every occasion',
  'product-guides': 'Learn about our products and how to create the perfect print',
  occasions: 'Celebrate special moments with meaningful gifts',
  'how-to': 'Step-by-step guides for creating personalised prints',
  inspiration: 'Stories and ideas to inspire your perfect gift',
};
