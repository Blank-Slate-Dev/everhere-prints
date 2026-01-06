// src/lib/blog/posts.ts

import { BlogPost, BlogCategory, CATEGORY_LABELS } from './types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-read-star-map',
    title: 'How to Read a Star Map: A Beginner\'s Guide',
    description: 'Learn how to read and understand your custom star map, including constellations, stars, and celestial coordinates.',
    category: 'how-to',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-12-15',
    updatedAt: '2026-01-05',
    image: '/images/blog/how-to-read-star-map.jpg',
    imageAlt: 'Custom star map showing constellations and stars',
    tags: ['star map', 'astronomy', 'how to', 'guide'],
    readingTime: 7,
    featured: true,
    content: `
# How to Read a Star Map: A Beginner's Guide

So you've received a beautiful star map—maybe showing the night sky from your wedding, a birthday, or another special moment. But now you're looking at it wondering: what am I actually seeing here? Don't worry, you're not alone. Let's break down exactly how to read and appreciate your star map.

## What You're Looking At

A star map (also called a celestial chart) shows the exact position of stars, constellations, and sometimes planets as they appeared from a specific location at a specific time. Unlike a regular map that shows geography, a star map shows what was directly above that spot on Earth at that moment.

Think of it like a snapshot of the sky—frozen in time.

## The Celestial Sphere

Here's the key concept: imagine you're standing inside a giant transparent sphere, with stars painted on the inside. That's essentially what your star map represents—a flattened version of the "celestial sphere" as seen from your location.

**The centre of your map** represents directly overhead (the zenith). **The outer edge** represents the horizon all around you. Everything in between is the dome of sky you could see if you looked up that night.

## Finding Constellations

Most star maps highlight the major constellations with lines connecting the stars. Here are some common ones you might find:

### Northern Hemisphere Favourites
- **Ursa Major (The Great Bear)** - Contains the famous "Big Dipper" asterism
- **Orion (The Hunter)** - Recognisable by three stars in a row forming his belt
- **Cassiopeia** - A distinctive W-shape
- **Leo (The Lion)** - Looks like a lion lying down

### Southern Hemisphere Highlights
- **Southern Cross (Crux)** - Australia's most famous constellation
- **Centaurus** - Contains Alpha Centauri, our nearest stellar neighbour
- **Scorpius** - Looks like a scorpion with a curved tail
- **Carina** - Part of the ancient "ship" constellation

### Seasonal Variations

What you see depends entirely on when and where your map was created. A star map from December in Sydney will look very different from one in July in London. That's what makes each map unique—it's specific to YOUR moment.

## Understanding Brightness

You'll notice stars are shown in different sizes on your map. Larger dots = brighter stars. Astronomers measure brightness using "magnitude"—confusingly, lower numbers mean brighter stars. The brightest star in the sky, Sirius, has a magnitude of -1.46.

## The Ecliptic Line

Some star maps show a curved line across the sky called the ecliptic. This is the path the Sun appears to travel throughout the year, and it's also where you'll find the Moon and planets. If your map includes the Moon, it will be somewhere along this line.

## Making It Personal

Here's what makes your star map special: no one else has this exact view. The combination of date, time, and location creates a unique snapshot. Even if someone else got married the same night, if they were in a different city, their sky was subtly different.

When you look at your star map, you're not just looking at astronomy—you're looking at a moment in time that mattered to you, captured in the stars.

## Tips for Enjoying Your Star Map

1. **Find your birth constellation** - Look for your zodiac sign (Aries, Taurus, etc.)
2. **Spot the brightest stars** - They'll be the largest dots on your map
3. **Look for the Moon** - If your map includes it, note its phase
4. **Check the cardinal directions** - North, South, East, West help orient you
5. **Share the story** - The best part is explaining to guests what they're looking at

## A Note on Accuracy

Our star maps are calculated using precise astronomical data—the same databases used by observatories and NASA. The positions are accurate to your specific date, time, and location. Yes, that really was your sky.
    `,
  },
  {
    slug: 'what-to-write-on-star-map',
    title: 'What to Write on a Star Map: 50+ Message Ideas',
    description: 'Stuck on what text to add? Here are 50+ ideas for star map messages, quotes, and captions for every occasion.',
    category: 'inspiration',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-11-20',
    image: '/images/blog/what-to-write.jpg',
    imageAlt: 'Star map with personalised message text',
    tags: ['star map', 'messages', 'quotes', 'inspiration'],
    readingTime: 5,
    content: `
# What to Write on a Star Map: 50+ Message Ideas

The design is perfect, the date is set, but now you're staring at that empty text field wondering what to write. Don't worry—we've helped thousands of customers through this exact moment. Here are our favourite message ideas for every occasion.

## For Weddings & Anniversaries

**Short & Sweet:**
- "The night we said I do"
- "Written in the stars"
- "Our forever began here"
- "Where our story started"

**With Names & Date:**
- "Sarah & James • 15.03.2024"
- "The night we became the Johnsons"
- "10 years of adventures • 2015-2025"

**Romantic Quotes:**
- "I have loved the stars too fondly to be fearful of the night" — Galileo
- "We are all made of star stuff" — Carl Sagan
- "To the moon and back, forever"

## For Births & Baby Gifts

**Classic:**
- "The night a star was born"
- "Welcome to the world, [Name]"
- "[Name] • Born under these stars"

**With Details:**
- "Olivia Rose • 3.2kg • 7:42am"
- "The day our universe expanded"
- "Our greatest adventure began"

## For Memorials

**Gentle & Loving:**
- "Forever in our hearts"
- "Among the stars now"
- "Your light shines on"

**With Dates:**
- "In loving memory of [Name] • 1945-2024"
- "The stars received a beautiful soul"

## Tips for Writing Your Message

1. **Keep it concise** - Less is more. Short messages look cleaner and are easier to read.
2. **Include the date** - It adds context and meaning: "14 February 2024"
3. **Add coordinates** - Some people love adding the lat/long for authenticity
4. **Consider two lines** - A title on top, date or names below works well
5. **Avoid clichés if you can** - "Love you to the moon and back" is nice but personal words are better
    `,
  },
  {
    slug: 'moon-phase-meanings-explained',
    title: 'Moon Phase Meanings: What Each Phase Symbolises',
    description: 'Discover the meaning behind each moon phase, from new moon to full moon, and what your moon phase print represents.',
    category: 'inspiration',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-10-10',
    image: '/images/blog/moon-phases.jpg',
    imageAlt: 'Eight moon phases showing lunar cycle',
    tags: ['moon phase', 'symbolism', 'meanings', 'lunar'],
    readingTime: 6,
    content: `
# Moon Phase Meanings: What Each Phase Symbolises

When you create a moon phase print, you're capturing more than just an astronomical event—you're preserving a symbol that humans have found meaning in for thousands of years. Here's what each moon phase represents and why yours might be significant.

## The Eight Moon Phases

The Moon goes through eight distinct phases during its 29.5-day cycle. Each has its own visual appearance and traditional meaning.

### 1. New Moon 🌑
**Symbolism:** New beginnings, fresh starts, setting intentions, planting seeds for the future.

### 2. Waxing Crescent 🌒
**Symbolism:** Hope, wishes, intention-setting, the first steps of a journey.

### 3. First Quarter 🌓
**Symbolism:** Decision-making, taking action, overcoming challenges, commitment.

### 4. Waxing Gibbous 🌔
**Symbolism:** Refinement, adjustment, patience, anticipation.

### 5. Full Moon 🌕
**Symbolism:** Culmination, celebration, abundance, clarity, heightened emotion.

### 6. Waning Gibbous 🌖
**Symbolism:** Gratitude, sharing, giving back, reflection.

### 7. Last Quarter 🌗
**Symbolism:** Release, forgiveness, letting go, making space for new things.

### 8. Waning Crescent 🌘
**Symbolism:** Rest, reflection, surrender, preparation for renewal.

## Why Moon Phases Matter Culturally

Across virtually every culture, the Moon has held significance. When you capture your moon phase, you're connecting to something ancient and universal.
    `,
  },
  {
    slug: 'first-anniversary-paper-gift-ideas',
    title: 'First Anniversary Gift Ideas: Creative Paper Gifts That Aren\'t Boring',
    description: 'The 1st anniversary is the paper anniversary. Here are creative paper gift ideas that go beyond a greeting card.',
    category: 'gift-guides',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-09-05',
    image: '/images/blog/paper-anniversary.jpg',
    imageAlt: 'Paper anniversary gift ideas including star map',
    tags: ['anniversary', 'first anniversary', 'paper', 'gift guide'],
    readingTime: 5,
    content: `
# First Anniversary Gift Ideas: Creative Paper Gifts That Aren't Boring

The traditional first anniversary gift is paper. And while that might sound limiting (a card? really?), it's actually one of the most creative anniversary themes. Paper is versatile—it can be transformed into something meaningful, personal, and lasting.

## Why Paper?

Paper represents:
- A **blank page** — your new life together is unwritten
- **Fragility** — new marriages need care and nurturing  
- **Potential** — paper can become anything

## Paper Gift Ideas (Ranked by Thoughtfulness)

### Tier 1: Deeply Personal

**Custom Star Map Print**
A star map showing the exact night sky from your wedding night is technically a paper gift—it's printed on archival paper. But it's so much more than that.

**Love Letter Book**
Write 12 love letters (one for each month you've been married) and have them bound into a small book.

### Tier 2: Thoughtful & Practical

**Concert or Event Tickets**
Technically paper! Book something you'll both love.

**First Edition Book**
Find a first edition of their favourite book.

**Tickets to Travel**
Plane tickets, train tickets, ferry tickets—all paper.
    `,
  },
  {
    slug: 'sound-wave-art-explained',
    title: 'Sound Wave Art: How Your Song Becomes a Print',
    description: 'Ever wondered how sound wave art works? Here\'s the science and meaning behind turning your favourite song into wall art.',
    category: 'behind-the-scenes',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-08-15',
    image: '/images/blog/sound-wave-explained.jpg',
    imageAlt: 'Sound wave art showing audio waveform visualization',
    tags: ['sound wave', 'how it works', 'music', 'art'],
    readingTime: 4,
    content: `
# Sound Wave Art: How Your Song Becomes a Print

Sound wave art has exploded in popularity, and for good reason—it turns something invisible (sound) into something you can see and display.

## The Science of Sound Waves

Sound travels in waves. When you speak, sing, or play music, you create pressure waves that move through the air.

## How We Create Sound Wave Art

When you upload audio or select a song, we:
1. **Analyse the audio** — Breaking it down into its component frequencies
2. **Generate the waveform** — Creating a visual representation
3. **Stylise the output** — Applying colours and design elements
4. **Optimise for print** — Ensuring it looks beautiful at large sizes

## Popular Uses for Sound Wave Art

- Wedding First Dance Song
- Baby's First Words or Cry
- Wedding Vows
- Voice Messages
- Favourite Song Lyrics
    `,
  },
  {
    slug: 'unique-wedding-gifts-australia',
    title: 'Unique Wedding Gifts in Australia: What Actually Stands Out',
    description: 'Skip the registry and give a wedding gift they\'ll actually remember. Here\'s what stands out from the pile of toasters.',
    category: 'gift-guides',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-07-20',
    image: '/images/blog/unique-wedding-gifts.jpg',
    imageAlt: 'Unique wedding gift ideas including personalised prints',
    tags: ['wedding gifts', 'australia', 'unique gifts', 'personalised'],
    readingTime: 6,
    content: `
# Unique Wedding Gifts in Australia: What Actually Stands Out

Let's be honest about modern wedding registries: they're either picked clean by the time you check, full of things the couple already has, or replaced entirely by a "wishing well."

## What Actually Works

### 1. Personalised Prints
A star map of their wedding night or a map of where they met is unique, personal, lasting, and unexpected.

### 2. Experience Gifts
Give them a future memory, not a thing.

### 3. Upgraded Basics
If you want to give something practical, upgrade it.

## The Budget Question

Australians typically spend:
- **Close friends/family:** $150-300
- **Good friends/colleagues:** $100-150  
- **Acquaintances/plus-ones:** $75-100
    `,
  },
  {
    slug: 'best-memorial-gifts',
    title: 'Meaningful Memorial Gifts: Honouring Someone Special',
    description: 'Finding the right memorial gift is hard. Here are thoughtful ways to honour someone\'s memory and comfort those grieving.',
    category: 'gift-guides',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-06-10',
    image: '/images/blog/memorial-gifts.jpg',
    imageAlt: 'Memorial gift ideas for remembering loved ones',
    tags: ['memorial', 'sympathy', 'bereavement', 'remembrance'],
    readingTime: 7,
    content: `
# Meaningful Memorial Gifts: Honouring Someone Special

When someone loses a loved one, knowing what to say or give is impossibly hard. But thoughtful memorial gifts can provide lasting comfort.

## When to Give Memorial Gifts

- **2-4 weeks after** — When the funeral crowd has gone
- **On significant dates** — Birthday, anniversary of passing, holidays
- **When it feels right** — There's no wrong time to show you remember

## Memorial Gift Ideas

### Lasting Keepsakes

**Star Map of a Special Date**
Create a star map showing the night sky from a meaningful date.

**Moon Phase Print**
A subtle, beautiful option showing the moon from their birthday or another significant date.

**Custom Sound Wave**
If you have a voice recording—a voicemail, a laugh, anything—it can become art.
    `,
  },
  {
    slug: 'australia-location-map-ideas',
    title: '10 Beautiful Australian Locations to Capture in Print',
    description: 'From Sydney Harbour to Uluru, here are stunning Australian locations that make perfect personalised map prints.',
    category: 'inspiration',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-05-05',
    image: '/images/blog/australia-locations.jpg',
    imageAlt: 'Beautiful Australian locations for custom map prints',
    tags: ['australia', 'locations', 'map', 'travel', 'inspiration'],
    readingTime: 5,
    content: `
# 10 Beautiful Australian Locations to Capture in Print

Australia has some of the most stunning geography on Earth. Here are ten Australian spots that look absolutely beautiful on the wall.

## 1. Sydney Harbour
The iconic harbour, Opera House, Harbour Bridge, and surrounding suburbs.

## 2. Melbourne's Inner City
Melbourne's grid layout with the Yarra River winding through.

## 3. Great Barrier Reef (Cairns/Port Douglas)
The coastline around Cairns and Port Douglas is stunning.

## 4. Byron Bay
That distinctive lighthouse point and the curved bay.

## 5. Uluru (Ayers Rock)
The heart of Australia—minimalist and powerful.

## 6. Tasmania's Cradle Mountain
Tassie's rugged beauty translates beautifully to maps.

## 7. The Twelve Apostles (Great Ocean Road)
Victoria's coastline along the Great Ocean Road is dramatic.

## 8. Perth & Fremantle
Perth's location where the Swan River meets the coast.

## 9. The Whitsundays
The scattered islands and Whitehaven Beach.

## 10. Broome & The Kimberley
The ancient coastline and remote beauty.
    `,
  },
];

// Helper functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts
    .filter((post) => post.category === categorySlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => 
      post.category === currentPost.category ||
      post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const tags = blogPosts.flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

export function getAllCategories(): BlogCategory[] {
  const categories = blogPosts.map((post) => post.category);
  return [...new Set(categories)];
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return blogPosts
    .filter((post) => post.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getCategoryLabel(category: BlogCategory): string {
  return CATEGORY_LABELS[category] || category;
}
