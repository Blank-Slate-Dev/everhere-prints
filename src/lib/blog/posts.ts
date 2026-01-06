// src/lib/blog/posts.ts

import { BlogPost, BlogCategory } from './types';

export const blogCategories: BlogCategory[] = [
  { name: 'Gift Guides', slug: 'gift-guides', description: 'Find the perfect personalised gift for any occasion' },
  { name: 'How To', slug: 'how-to', description: 'Tips and tutorials for creating beautiful prints' },
  { name: 'Inspiration', slug: 'inspiration', description: 'Ideas and stories to inspire your next gift' },
  { name: 'Behind the Scenes', slug: 'behind-the-scenes', description: 'A look at how we create your prints' },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-read-star-map',
    title: 'How to Read a Star Map: A Beginner\'s Guide',
    description: 'Learn how to read and understand your custom star map, including constellations, stars, and celestial coordinates.',
    category: 'How To',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-12-15',
    updatedAt: '2026-01-05',
    image: '/images/blog/how-to-read-star-map.jpg',
    tags: ['star map', 'astronomy', 'how to', 'guide'],
    readingTime: 7,
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
    category: 'Inspiration',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-11-20',
    image: '/images/blog/what-to-write.jpg',
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

**Personal Vows (Shortened):**
- "I choose you, today and always"
- "My favourite hello, my hardest goodbye"
- "You are my today and all of my tomorrows"

## For Births & Baby Gifts

**Classic:**
- "The night a star was born"
- "Welcome to the world, [Name]"
- "[Name] • Born under these stars"

**With Details:**
- "Olivia Rose • 3.2kg • 7:42am"
- "The day our universe expanded"
- "Our greatest adventure began"

**From the Heart:**
- "We wished upon a star and you came true"
- "The stars aligned just for you"
- "Born to be loved"

## For Memorials

**Gentle & Loving:**
- "Forever in our hearts"
- "Among the stars now"
- "Your light shines on"

**With Dates:**
- "In loving memory of [Name] • 1945-2024"
- "The stars received a beautiful soul"

**Quotes:**
- "Perhaps they are not stars, but openings where our loved ones shine"
- "Gone from our sight, but never our hearts"

## For Birthdays

**Milestone Birthdays:**
- "30 trips around the sun"
- "The night a legend was born"
- "18 and written in the stars"

**General:**
- "Your birthday sky"
- "Born under lucky stars"
- "[Name]'s constellation"

## For First Dates & Relationships

**Where You Met:**
- "Where it all began"
- "The night I found you"
- "Our first chapter"

**Engagement:**
- "She said yes"
- "The night I asked forever"
- "From this moment on"

## For Graduations & Achievements

- "The stars aligned"
- "Destined for greatness"
- "Dream big, reach for the stars"
- "Class of 2025"

## Tips for Writing Your Message

1. **Keep it concise** - Less is more. Short messages look cleaner and are easier to read.

2. **Include the date** - It adds context and meaning: "14 February 2024"

3. **Add coordinates** - Some people love adding the lat/long for authenticity

4. **Consider two lines** - A title on top, date or names below works well

5. **Avoid clichés if you can** - "Love you to the moon and back" is nice but personal words are better

## What NOT to Write

- Very long paragraphs (won't fit, won't look good)
- Inside jokes that won't make sense later
- Anything you might regret in 10 years
- Text-speak or abbreviations

## Our Favourites from Real Customers

Over the years, we've seen some beautiful messages:

*"The night our family became four"* — New baby

*"52°12'N 0°07'E — Where you stole my heart"* — Proposal

*"Dad's last Christmas with us. Forever our brightest star."* — Memorial

*"The night we danced until dawn"* — Wedding anniversary

---

Still stuck? Keep it simple. Names, date, location. That's all you really need. The stars do the talking.
    `,
  },
  {
    slug: 'moon-phase-meanings-explained',
    title: 'Moon Phase Meanings: What Each Phase Symbolises',
    description: 'Discover the meaning behind each moon phase, from new moon to full moon, and what your moon phase print represents.',
    category: 'Inspiration',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-10-10',
    image: '/images/blog/moon-phases.jpg',
    tags: ['moon phase', 'symbolism', 'meanings', 'lunar'],
    readingTime: 6,
    content: `
# Moon Phase Meanings: What Each Phase Symbolises

When you create a moon phase print, you're capturing more than just an astronomical event—you're preserving a symbol that humans have found meaning in for thousands of years. Here's what each moon phase represents and why yours might be significant.

## The Eight Moon Phases

The Moon goes through eight distinct phases during its 29.5-day cycle. Each has its own visual appearance and traditional meaning.

### 1. New Moon 🌑

**Appearance:** Completely dark (the Moon is between Earth and Sun)

**Symbolism:** New beginnings, fresh starts, setting intentions, planting seeds for the future.

**If your date has a new moon:** Your moment represents a fresh chapter. It's particularly meaningful for weddings, births, or starting something new. In many cultures, new moons are considered auspicious for beginning ventures.

### 2. Waxing Crescent 🌒

**Appearance:** A thin sliver of light on the right side

**Symbolism:** Hope, wishes, intention-setting, the first steps of a journey.

**If your date has a waxing crescent:** Your moment is about potential—something beautiful just beginning to emerge. There's a sense of anticipation and growth.

### 3. First Quarter 🌓

**Appearance:** Right half illuminated (half moon)

**Symbolism:** Decision-making, taking action, overcoming challenges, commitment.

**If your date has a first quarter moon:** Your moment represents determination. It's about making choices and committing to a path. Great for engagements or career milestones.

### 4. Waxing Gibbous 🌔

**Appearance:** More than half lit, almost full

**Symbolism:** Refinement, adjustment, patience, anticipation.

**If your date has a waxing gibbous:** Your moment is building toward something. There's excitement in the air—you're close to a peak experience but not quite there yet.

### 5. Full Moon 🌕

**Appearance:** Completely illuminated

**Symbolism:** Culmination, celebration, abundance, clarity, heightened emotion.

**If your date has a full moon:** Your moment was intense and powerful. Full moons are associated with strong emotions, which is why so many significant moments happen to fall on them. If your wedding or birth was under a full moon, you're in good company—they're considered highly auspicious in many cultures.

### 6. Waning Gibbous 🌖

**Appearance:** Still mostly lit, but decreasing

**Symbolism:** Gratitude, sharing, giving back, reflection.

**If your date has a waning gibbous:** Your moment carries a sense of appreciation and wisdom. It's about sharing what you've learned or received.

### 7. Last Quarter 🌗

**Appearance:** Left half illuminated

**Symbolism:** Release, forgiveness, letting go, making space for new things.

**If your date has a last quarter moon:** Your moment represents transition—the end of one thing making room for another. Beautiful for memorials or marking the end of chapters.

### 8. Waning Crescent 🌘

**Appearance:** A thin sliver on the left

**Symbolism:** Rest, reflection, surrender, preparation for renewal.

**If your date has a waning crescent:** Your moment is about quiet contemplation. It's the breath before a new beginning.

## Why Moon Phases Matter Culturally

Across virtually every culture, the Moon has held significance:

- **Ancient Egyptians** based their calendar on lunar cycles
- **Many religions** time holidays by the Moon (Easter, Ramadan, Chinese New Year)
- **Farmers** have planted by moon phases for centuries
- **Coastal cultures** understand the Moon's pull on tides

When you capture your moon phase, you're connecting to something ancient and universal.

## Finding Meaning in Your Moon Phase

Here's a way to think about it: whatever phase the Moon was in during your special moment, that's YOUR moon. It doesn't matter if it wasn't full or wasn't a perfect crescent—the specific phase adds character and meaning.

A new moon wedding? You're starting fresh, with everything ahead of you.
A baby born under a waning crescent? They came into the world during a peaceful, reflective time.
A full moon anniversary? Your love was and is intense and abundant.

## The Science Behind It

The Moon doesn't actually change shape—we're just seeing different portions illuminated by the Sun as it orbits Earth. A full cycle takes about 29.5 days, meaning the Moon you see tonight will look noticeably different in just a few days.

Our moon phase prints show the exact illumination and angle from your specific date and location, calculated using astronomical algorithms. It's not a generic image—it's YOUR moon, precise to the night.

## Combining Moon Phases

Some couples create prints showing multiple moons—the moon from when they met, when they got engaged, and when they married. The progression tells a visual story of their relationship through lunar cycles.

---

Whatever phase your Moon was in, it's part of what makes your moment unique. The same event under a different moon would have felt subtly different. Yours happened exactly as it was meant to.
    `,
  },
  {
    slug: 'first-anniversary-paper-gift-ideas',
    title: 'First Anniversary Gift Ideas: Creative Paper Gifts That Aren\'t Boring',
    description: 'The 1st anniversary is the paper anniversary. Here are creative paper gift ideas that go beyond a greeting card.',
    category: 'Gift Guides',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-09-05',
    image: '/images/blog/paper-anniversary.jpg',
    tags: ['anniversary', 'first anniversary', 'paper', 'gift guide'],
    readingTime: 5,
    content: `
# First Anniversary Gift Ideas: Creative Paper Gifts That Aren't Boring

The traditional first anniversary gift is paper. And while that might sound limiting (a card? really?), it's actually one of the most creative anniversary themes. Paper is versatile—it can be transformed into something meaningful, personal, and lasting.

Here's how to nail the paper anniversary without resorting to a greeting card.

## Why Paper?

First, let's appreciate the symbolism. Paper represents:

- A **blank page** — your new life together is unwritten
- **Fragility** — new marriages need care and nurturing  
- **Potential** — paper can become anything

It's actually quite beautiful when you think about it. Your first year of marriage is like a fresh piece of paper—full of possibility.

## Paper Gift Ideas (Ranked by Thoughtfulness)

### Tier 1: Deeply Personal

**Custom Star Map Print**
A star map showing the exact night sky from your wedding night is technically a paper gift—it's printed on archival paper. But it's so much more than that. Every time you look at it, you'll remember exactly how the sky looked on the most important night of your life.

*Why it works:* Personal, beautiful, conversation-starter, actually fits the theme.

**Love Letter Book**
Write 12 love letters (one for each month you've been married) and have them bound into a small book. Include photos, ticket stubs, and memories from each month.

*Why it works:* Incredibly personal, shows effort, becomes a keepsake.

**Custom Illustration**
Commission an artist to illustrate a meaningful scene—your first home, your wedding venue, or a moment from your relationship.

*Why it works:* One-of-a-kind artwork that's completely unique to you.

### Tier 2: Thoughtful & Practical

**Concert or Event Tickets**
Technically paper! Book something you'll both love—a concert, show, sports event, or experience.

*Why it works:* Creates new memories while honouring tradition.

**First Edition Book**
Find a first edition of their favourite book, or a book that's meaningful to your relationship.

*Why it works:* Thoughtful if they're a reader, potentially valuable.

**Tickets to Travel**
Plane tickets, train tickets, ferry tickets—all paper. Surprise them with a trip.

*Why it works:* Adventure + tradition = perfect combo.

### Tier 3: Sweet & Simple

**Custom Map Print**
A beautiful map of where you met, got engaged, or honeymooned.

*Why it works:* Personal, affordable, looks great on the wall.

**Origami Something**
Learn to fold something meaningful—1,000 paper cranes is traditional for weddings in Japan.

*Why it works:* Shows time and effort. Extremely romantic if you pull it off.

**Paper Flowers**
A bouquet that will never wilt. You can make them yourself or order handcrafted paper flowers.

*Why it works:* Creative spin on flowers, lasts forever.

## What to Avoid

- **Just a card** — Unless it's paired with something else, this feels lazy
- **Cash or vouchers** — Technically paper, but really not in the spirit
- **Toilet paper jokes** — Yes, someone will think they're funny. They're not.
- **Nothing** — "We don't do anniversary gifts" is fine, but probably not for the first one

## Making It Special

Whatever you choose, presentation matters. Wrap it beautifully, write a heartfelt card (okay, NOW a card is appropriate), and make a moment of it. Cook dinner, open a nice bottle of wine, and give your gift with intention.

The best first anniversary gifts show that you paid attention this year—to what your partner loves, to what you've experienced together, to what makes your relationship unique.

## Our Pick

We're obviously biased, but a custom star map is our favourite paper anniversary gift for a reason. It's beautiful, meaningful, actually paper, and something they'll keep forever. Every time guests ask about it, they'll get to tell your love story.

Plus, you can add a line from your vows or a message that encapsulates your first year. "365 days down, forever to go" kind of thing.

---

Paper might seem like a humble material, but it's been used to record humanity's greatest love stories, most important documents, and most beautiful art. Your first anniversary gift can continue that tradition.
    `,
  },
  {
    slug: 'sound-wave-art-explained',
    title: 'Sound Wave Art: How Your Song Becomes a Print',
    description: 'Ever wondered how sound wave art works? Here\'s the science and meaning behind turning your favourite song into wall art.',
    category: 'Behind the Scenes',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-08-15',
    image: '/images/blog/sound-wave-explained.jpg',
    tags: ['sound wave', 'how it works', 'music', 'art'],
    readingTime: 4,
    content: `
# Sound Wave Art: How Your Song Becomes a Print

Sound wave art has exploded in popularity, and for good reason—it turns something invisible (sound) into something you can see and display. But how does it actually work? And what makes one sound wave print better than another?

## The Science of Sound Waves

Sound travels in waves. When you speak, sing, or play music, you create pressure waves that move through the air. These waves have characteristics:

- **Amplitude** — How loud the sound is (height of the wave)
- **Frequency** — How high or low the pitch is (how compressed the wave is)
- **Waveform** — The unique "shape" of the sound

Every sound has a unique waveform. Your voice sounds different from mine because our waveforms are different. "Happy Birthday" sung by you looks different than "Happy Birthday" sung by Mariah Carey.

## How We Create Sound Wave Art

When you upload audio or select a song, we:

1. **Analyse the audio** — Breaking it down into its component frequencies and amplitudes
2. **Generate the waveform** — Creating a visual representation of the sound over time
3. **Stylise the output** — Applying colours, effects, and design elements
4. **Optimise for print** — Ensuring it looks beautiful at large sizes

The result is a unique visual fingerprint of your audio—something no one else has unless they have the exact same recording.

## What Makes a Good Sound Wave Print?

### Audio Quality Matters
A high-quality audio source produces a cleaner, more detailed waveform. A song from Spotify will look better than a song recorded on your phone in a noisy room.

### Length Matters
Very short clips (under 10 seconds) can look sparse. Very long clips (over 3 minutes) can become too dense. We find 30 seconds to 2 minutes works best for wall art.

### The Song Itself Matters
Dynamic songs with quiet and loud parts create more interesting waveforms than songs that are consistently loud throughout. A orchestral piece will look different than electronic dance music.

## Popular Uses for Sound Wave Art

**Wedding First Dance Song**
The most popular choice. Your first dance visualised and hanging in your home.

**Baby's First Words or Cry**
The sound of "mama" or "dada" captured forever.

**Wedding Vows**
Record yourselves reading your vows, then immortalise the waveform.

**Voice Messages**
A loved one saying "I love you" — especially meaningful for memorial pieces.

**Favourite Song Lyrics**
A specific verse or chorus from a meaningful song.

**Pet Sounds**
Yes, people do this. A dog's bark or cat's meow, immortalised.

## Reading Your Sound Wave

Unlike a star map where constellations have names, a sound wave is more abstract. You can't "read" it exactly, but you can appreciate it:

- **Big peaks** = loud moments
- **Flat sections** = quiet or silence
- **Dense areas** = lots happening musically
- **Sparse areas** = simpler passages

If you know your song well, you might be able to pick out the chorus (usually the densest, loudest part) or the quiet intro.

## The Meaning Behind It

What makes sound wave art special isn't the science—it's the sentiment. You're taking something ephemeral (sound that exists only in moments) and making it permanent. 

That song that was playing when you met? Now it's on your wall.
Your grandmother's voice? Preserved forever.
Your wedding vows? A visual reminder of promises made.

It's not just decoration. It's memory, made tangible.

## Tips for Creating Your Sound Wave Print

1. **Choose a high-quality audio source** — Spotify, Apple Music, or CD quality
2. **Pick a meaningful section** — The chorus, a specific verse, or the whole song
3. **Consider who will see it** — Inside jokes are fun but explaining it to every guest gets old
4. **Match your home's aesthetic** — We offer multiple colour schemes and styles
5. **Size matters** — Larger prints show more detail

---

Sound wave art bridges the gap between hearing and seeing. It's a way to hold onto sounds that matter, long after they've faded from the air.
    `,
  },
  {
    slug: 'unique-wedding-gifts-australia',
    title: 'Unique Wedding Gifts in Australia: What Actually Stands Out',
    description: 'Skip the registry and give a wedding gift they\'ll actually remember. Here\'s what stands out from the pile of toasters.',
    category: 'Gift Guides',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-07-20',
    image: '/images/blog/unique-wedding-gifts.jpg',
    tags: ['wedding gifts', 'australia', 'unique gifts', 'personalised'],
    readingTime: 6,
    content: `
# Unique Wedding Gifts in Australia: What Actually Stands Out

Let's be honest about modern wedding registries: they're either picked clean by the time you check, full of things the couple already has, or replaced entirely by a "wishing well" (polite Australian for "just give us cash").

But you want to give something memorable. Something that makes them tear up when they open it. Something they'll still have in 20 years.

Here's what actually stands out from the pile of generic gifts.

## The Problem with Registry Gifts

Before we get to solutions, let's acknowledge the problem. Today's couples:

- **Already live together** — They have plates, they have sheets
- **Have specific taste** — Your "safe" choice might not match their aesthetic  
- **Don't need more stuff** — Marie Kondo has entered the chat
- **Want experiences** — But you can't wrap a "trip to Bali" easily

So what do you do?

## What Actually Works

### 1. Personalised Prints (Obviously)

We're biased, but hear us out. A star map of their wedding night or a map of where they met is:

- **Unique** — No one else has the same one
- **Personal** — Requires knowing details about THEM
- **Lasting** — Hangs on the wall for decades
- **Unexpected** — Guarantees a reaction when opened

This is the gift that makes people cry (good tears). We've seen it happen at hundreds of weddings.

### 2. Experience Gifts

Give them a future memory, not a thing:

- **Hot air balloon ride** over the Hunter Valley
- **Cooking class** together in Melbourne
- **Weekend away** at a boutique hotel
- **Private wine tasting** in the Barossa
- **Couples massage** at a day spa

The trick is making it easy to redeem. Include all booking details, not just a vague "gift card for an experience."

### 3. Upgraded Basics

If you want to give something practical, upgrade it:

- Instead of towels → **Sheridan luxury towels**
- Instead of sheets → **Cultiver linen bedding**
- Instead of wine glasses → **Riedel crystal**
- Instead of a toaster → **Smeg retro appliance**

The couple won't buy themselves the "expensive version." You can.

### 4. Art They'll Love

Original artwork is memorable if you know their taste:

- Commission a local artist
- Buy a print from an artist they follow on Instagram
- Find vintage art that matches their home

This requires homework but pays off big.

### 5. Subscription Services

The gift that keeps giving:

- **Wine subscription** (Different Drops, Qantas Wine)
- **Flower subscription** (Bloombox, Floraly)
- **Book subscription** (Book Depository, Readings)
- **Food subscription** (Marley Spoon, HelloFresh)

Pay for 3-6 months upfront so they don't have to think about it.

## What NOT to Give

### Generic Homewares
Unless it's on their registry, don't guess. Your taste isn't their taste.

### "Gag" Gifts
The moment has passed. Mr & Mrs matching robes were funny in 2010.

### Nothing
"We'll give them cash later" often becomes "We forgot to give them anything." Just contribute to the wishing well.

### Regifted Items
People can tell. They always tell.

### Anything That Creates Obligation
A puppy, a timeshare referral, anything that requires them to do something.

## How to Present Your Gift

Presentation matters almost as much as the gift:

1. **Write a real card** — Not just "Congrats! Love, Dave"
2. **Wrap it properly** — Or have it gift-wrapped
3. **Include a note** explaining what it is (especially for personalised items)
4. **Give it at the right moment** — Engagement party, bridal shower, or wedding itself

## The Budget Question

Australians typically spend:

- **Close friends/family:** $150-300
- **Good friends/colleagues:** $100-150  
- **Acquaintances/plus-ones:** $75-100

Our framed prints fall right in that sweet spot—meaningful enough for close friends, affordable enough that you're not breaking the bank.

## The Verdict

The best wedding gifts share three qualities:

1. **Personal** — Shows you know them
2. **Lasting** — Still relevant in 10 years
3. **Special** — They wouldn't buy it themselves

A star map of their wedding night? Ticks all three boxes. A generic Myer voucher? Ticks zero.

Be the guest who gave THAT gift. The one they still talk about years later. The one hanging in their living room when you visit for dinner.

---

*Need help choosing? Our team can help you create the perfect personalised wedding gift. Free shipping across Australia, always.*
    `,
  },
  {
    slug: 'best-memorial-gifts',
    title: 'Meaningful Memorial Gifts: Honouring Someone Special',
    description: 'Finding the right memorial gift is hard. Here are thoughtful ways to honour someone\'s memory and comfort those grieving.',
    category: 'Gift Guides',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-06-10',
    image: '/images/blog/memorial-gifts.jpg',
    tags: ['memorial', 'sympathy', 'bereavement', 'remembrance'],
    readingTime: 7,
    content: `
# Meaningful Memorial Gifts: Honouring Someone Special

When someone loses a loved one, knowing what to say or give is impossibly hard. Flowers fade, cards get lost, and words feel inadequate. But thoughtful memorial gifts can provide lasting comfort—a way to honour the person who's gone and support the person who's grieving.

This isn't a fun topic, but it's an important one. Here's how to give a memorial gift that truly helps.

## When to Give Memorial Gifts

The initial funeral period is covered with flowers and food. Consider giving your memorial gift:

- **2-4 weeks after** — When the funeral crowd has gone and reality sets in
- **On significant dates** — Birthday, anniversary of passing, holidays
- **When it feels right** — There's no wrong time to show you remember

The second wave of grief, when everyone else has moved on, is often the hardest. A thoughtful gift then says "I still remember. You're not alone."

## Memorial Gift Ideas

### Lasting Keepsakes

**Star Map of a Special Date**
Create a star map showing the night sky from a meaningful date—their wedding night, the night they were born, or a moment they cherished together. Add text like "Forever in our hearts" or "Your star still shines."

**Moon Phase Print**
A subtle, beautiful option showing the moon from their birthday or another significant date. Less overtly "memorial" which some people prefer.

**Custom Sound Wave**
If you have a voice recording—a voicemail saying "I love you," a laugh, anything—it can become art. This is incredibly meaningful but requires having audio.

### Comfort Gifts

**Weighted Blanket**
The physical sensation of weight can be comforting during grief. High-quality weighted blankets are expensive enough that people rarely buy them for themselves.

**Self-Care Package**
Nice candles, bath products, tea, cozy socks. Things that say "take care of yourself."

**Meal Delivery**
Cooking feels impossible when grieving. A month of meal delivery services or DoorDash credits helps practically.

### Acts of Service

Sometimes the best gift isn't a thing:

- **Lawn care or cleaning service** for a month
- **Taking over a specific task** they're struggling with
- **Walking their dog** regularly
- **Being present** without expecting anything

### For the Longer Term

**Memorial Tree or Plant**
A living memorial that grows over time. Many organisations will plant a tree in someone's name.

**Donation in Their Name**
To a cause they cared about. Include a card explaining the donation.

**Memory Book**
Collect photos, stories, and memories from friends and family. This takes effort but means everything.

## What to Write

This is the hardest part. Some genuine options:

- "I don't have words, but I have you in my heart"
- "Thinking of you and [name]"
- "I'm here whenever you need"
- "They touched so many lives, including mine"
- "Remembering [name] and all the joy they brought"

What NOT to write:
- "They're in a better place" (you don't know their beliefs)
- "Everything happens for a reason" (not comforting)
- "Let me know if you need anything" (they won't ask—just help)
- "I know how you feel" (you don't, and that's okay)

## For Different Relationships

### Losing a Parent
This is foundational grief. Gifts that honour the relationship work well—a map of the family home, a star map from the parent's wedding, something that says "this person mattered and raised you."

### Losing a Spouse
The loneliest grief. Practical help matters as much as symbolic gifts. Consider both—a memorial print AND meals for a month.

### Losing a Child
The most devastating loss. Tread carefully. Many parents want their child's name spoken and remembered. A star map with the child's name, or a memorial that keeps their memory alive, can mean everything.

### Losing a Friend
Don't underestimate this grief just because it's not family. Friendships can be decades deep. A thoughtful acknowledgment shows their loss matters.

## Timing and Presentation

For memorial gifts:

- **Don't wait for the perfect moment** — Now is fine
- **Deliver in person if possible** — It means more
- **Don't expect a reaction** — They might cry, or not. Both are okay
- **Include a handwritten note** — Not typed, handwritten
- **Make it easy** — Don't require them to do anything (no "call me!")

## A Personal Note

We've shipped thousands of memorial prints. Each one represents someone loved and lost. We take these orders seriously—checking details twice, choosing careful packaging, including a compassionate note.

A star map showing "the night we met" takes on different meaning when it's in memory of a spouse. A moon phase from someone's birthday becomes sacred when they're no longer here.

These aren't just products to us. They're tributes.

---

*If you're creating a memorial print and need help with wording or design choices, our team is here. Email us anytime.*
    `,
  },
  {
    slug: 'australia-location-map-ideas',
    title: '10 Beautiful Australian Locations to Capture in Print',
    description: 'From Sydney Harbour to Uluru, here are stunning Australian locations that make perfect personalised map prints.',
    category: 'Inspiration',
    author: { name: 'EverHere Team', avatar: '/images/team/avatar.jpg' },
    publishedAt: '2025-05-05',
    image: '/images/blog/australia-locations.jpg',
    tags: ['australia', 'locations', 'map', 'travel', 'inspiration'],
    readingTime: 5,
    content: `
# 10 Beautiful Australian Locations to Capture in Print

Australia has some of the most stunning geography on Earth—from harbour cities to red deserts, rainforests to coastlines. If you're creating a location map print, here are ten Australian spots that look absolutely beautiful on the wall.

## 1. Sydney Harbour

The obvious choice, but for good reason. The iconic harbour, Opera House, Harbour Bridge, and surrounding suburbs create a map that's instantly recognisable. Perfect for:
- Couples who met in Sydney
- Harbour wedding venues (Taronga Zoo, anyone?)
- New Year's Eve proposals

**Map tip:** Zoom in tight on the harbour itself for maximum impact, or zoom out to include Manly and the Northern Beaches.

## 2. Melbourne's Inner City

Melbourne's grid layout with the Yarra River winding through creates a beautiful geometric map. The laneways, gardens, and distinctive suburbs (Fitzroy, St Kilda, Richmond) are all recognisable.

**Map tip:** Include the MCG and Royal Botanic Gardens for added visual interest.

## 3. Great Barrier Reef (Cairns/Port Douglas)

The reef doesn't show on standard maps, but the coastline around Cairns and Port Douglas is stunning. Islands, inlets, and the dramatic coast make for interesting cartography.

**Map tip:** Perfect for honeymoon memories or proposals on the reef.

## 4. Byron Bay

That distinctive lighthouse point and the curved bay create a memorable map. Byron has significance for so many Australians—gap year memories, music festivals, life-changing moments.

**Map tip:** Include the hinterland towns (Bangalow, Mullumbimby) for a broader view.

## 5. Uluru (Ayers Rock)

The heart of Australia. A map centred on Uluru is minimalist and powerful—the rock itself surrounded by red nothing. It's a spiritual place for many, making it meaningful beyond tourism.

**Map tip:** Add Kata Tjuta (The Olgas) for context and visual balance.

## 6. Tasmania's Cradle Mountain

Tassie's rugged beauty translates beautifully to maps. The lakes, wilderness, and dramatic topography create something you don't see from mainland maps.

**Map tip:** Great for couples who got engaged on a Tassie hiking trip.

## 7. The Twelve Apostles (Great Ocean Road)

Victoria's coastline along the Great Ocean Road is dramatic and distinctive. The rock formations don't show on basic maps, but the coastal geography is unmistakable.

**Map tip:** Perfect for road trip memories—mark your route along the coast.

## 8. Perth & Fremantle

Often overlooked, Perth's location where the Swan River meets the coast creates beautiful cartography. The river winding through the city is quite different from the east coast capitals.

**Map tip:** Include Rottnest Island if it's meaningful to your story.

## 9. The Whitsundays

The scattered islands and Whitehaven Beach create a map that screams "tropical paradise." Popular for proposals, honeymoons, and milestone celebrations.

**Map tip:** Centre on Heart Reef if you're being romantic about it.

## 10. Broome & The Kimberley

The ancient coastline, dramatic colours (captured through design choices rather than actual map colours), and remote beauty of the Kimberley make for striking prints.

**Map tip:** Great for adventure couples or those with NW Western Australia connections.

## Tips for Choosing Your Location

**Be Specific**
"Sydney" is fine, but "the exact corner of Bondi Beach where we first kissed" is better. Our maps can zoom to specific spots.

**Consider the Shape**
Some locations create better map shapes than others. Islands, bays, and coastal areas have natural boundaries. Inland suburbs can look a bit blob-like.

**Add Coordinates**
Including latitude and longitude adds authenticity and helps viewers understand exactly where this is.

**Choose Meaningful Over Pretty**
The "prettiest" location on a map isn't always the most meaningful. That tiny town in regional Queensland where you grew up might make a better gift than generic Sydney Harbour.

---

*Don't see your location? Every spot on Earth can become a beautiful map. The meaning you attach to it is what matters most.*
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

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts
    .filter((post) => post.category.toLowerCase() === category.toLowerCase())
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
