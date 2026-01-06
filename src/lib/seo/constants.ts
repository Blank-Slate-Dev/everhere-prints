// src/lib/seo/constants.ts

export const SITE_CONFIG = {
  name: 'EverHere Prints',
  tagline: 'Personalised Prints That Capture Your Moments',
  description: 'Create beautiful personalised prints that celebrate your special moments. Custom star maps, where we met maps, moon phase prints, and sound wave art. Designed in Australia, delivered worldwide.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://everhereprints.com.au',
  locale: 'en_AU',
  currency: 'AUD',
  country: 'Australia',
  
  // Business details for LocalBusiness schema
  business: {
    legalName: 'EverHere Prints',
    address: {
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      addressCountry: 'AU',
    },
    email: 'hello@everhereprints.com.au',
    priceRange: '$$',
  },
  
  // Social media profiles
  social: {
    instagram: 'https://instagram.com/everhereprints',
    facebook: 'https://facebook.com/everhereprints',
    pinterest: 'https://pinterest.com/everhereprints',
  },
  
  // Default images
  images: {
    logo: '/images/logo.png',
    ogDefault: '/images/og-default.jpg',
    favicon: '/favicon.ico',
  },
} as const;

// Primary keywords by product category
export const PRODUCT_KEYWORDS = {
  starMap: [
    'custom star map',
    'personalised star map',
    'star map print',
    'night sky print',
    'constellation print',
    'stars on the night we met',
    'custom night sky poster',
    'star chart print',
    'astronomy print personalised',
    'celestial map custom',
  ],
  
  whereWeMet: [
    'where we met map',
    'custom location map',
    'personalised map print',
    'custom street map',
    'location print personalised',
    'city map custom print',
    'coordinates print',
    'special place map',
    'meeting place map print',
    'custom map poster',
  ],
  
  moonPhase: [
    'moon phase print',
    'birth moon print',
    'wedding moon phase',
    'lunar phase poster',
    'custom moon print',
    'moon on the night we met',
    'personalised moon phase',
    'moon calendar print',
    'lunar cycle poster',
    'moon phase wall art',
  ],
  
  soundWave: [
    'soundwave print',
    'sound wave art',
    'custom soundwave',
    'song soundwave print',
    'voice wave art',
    'audio waveform print',
    'wedding song print',
    'personalised soundwave',
    'music wave poster',
    'voice recording art',
  ],
  
  australiaMap: [
    'australia map print',
    'australian watercolour map',
    'custom australia poster',
    'new zealand map print',
    'watercolor australia map',
    'australian wall art',
    'personalised australia map',
    'state map print australia',
    'city map australia',
    'travel map australia',
  ],
} as const;

// Gift occasion keywords
export const OCCASION_KEYWORDS = {
  wedding: [
    'wedding gift',
    'wedding present ideas',
    'unique wedding gift',
    'personalised wedding gift',
    'wedding gift for couple',
    'bride and groom gift',
    'wedding anniversary gift',
    'engagement gift',
    'wedding gift australia',
    'meaningful wedding present',
  ],
  
  anniversary: [
    'anniversary gift',
    'anniversary present',
    'wedding anniversary gift',
    'first anniversary gift',
    'paper anniversary gift',
    'anniversary gift for husband',
    'anniversary gift for wife',
    'anniversary gift for couple',
    'romantic anniversary present',
    '1st anniversary gift ideas',
  ],
  
  valentines: [
    'valentines day gift',
    'valentine gift for him',
    'valentine gift for her',
    'romantic valentines present',
    'unique valentines gift',
    'personalised valentines',
    'valentines day ideas',
    'meaningful valentine gift',
    'couples valentines gift',
    'romantic gift ideas',
  ],
  
  christmas: [
    'christmas gift ideas',
    'personalised christmas gift',
    'unique christmas present',
    'christmas gift for parents',
    'christmas gift for couple',
    'meaningful christmas gift',
    'christmas gift australia',
    'last minute christmas gift',
    'thoughtful christmas present',
    'christmas gift for husband',
  ],
  
  mothersDay: [
    'mothers day gift',
    'mothers day present',
    'gift for mum australia',
    'personalised gift for mum',
    'unique mothers day gift',
    'meaningful gift for mother',
    'mothers day ideas australia',
    'special gift for mum',
    'custom mothers day present',
    'sentimental mothers day gift',
  ],
  
  fathersDay: [
    'fathers day gift',
    'fathers day gift australia',
    'gift for dad',
    'personalised gift for dad',
    'unique fathers day present',
    'meaningful gift for father',
    'fathers day ideas',
    'custom fathers day gift',
    'sentimental dad gift',
    'fathers day australia september',
  ],
  
  baby: [
    'baby gift',
    'newborn gift',
    'baby shower gift',
    'personalised baby gift',
    'birth gift ideas',
    'new baby present',
    'christening gift',
    'nursery wall art',
    'baby room decor',
    'stars when baby was born',
  ],
  
  memorial: [
    'memorial gift',
    'remembrance print',
    'sympathy gift',
    'in memory of gift',
    'bereavement gift',
    'memorial wall art',
    'tribute print',
    'condolence gift',
    'memorial keepsake',
    'remembering loved one',
  ],
} as const;

// Long-tail keywords with lower competition
export const LONG_TAIL_KEYWORDS = {
  highIntent: [
    'stars on the night we met print',
    'moon phase on wedding day',
    'custom map of where we got engaged',
    'personalised print of first date location',
    'night sky when baby was born',
    'soundwave of wedding song',
    'map of where we fell in love',
    'constellation on anniversary date',
    'coordinates of where we met',
    'voice message soundwave print',
  ],
  
  problemSolving: [
    'unique gift for couple who has everything',
    'meaningful gift for hard to buy for husband',
    'personalised gift ideas for someone special',
    'last minute gift that looks thoughtful',
    'romantic gift that isnt flowers',
    'gift to commemorate special date',
    'anniversary gift not jewellery',
    'wedding gift besides money',
    'sentimental gift for long distance',
    'gift to remember special place',
  ],
  
  australian: [
    'personalised gifts australia',
    'custom prints melbourne',
    'unique gifts sydney',
    'australian made personalised gifts',
    'gift delivery australia wide',
    'custom wall art brisbane',
    'personalised presents perth',
    'australian gift shop online',
    'fast shipping australia gifts',
    'australian small business gifts',
  ],
} as const;

// Page-specific meta configurations
export const PAGE_META = {
  home: {
    title: 'EverHere Prints | Personalised Star Maps, Location Maps & Custom Prints',
    description: 'Create meaningful personalised prints that capture your special moments. Custom star maps, where we met maps, moon phases & soundwave art. Australian made with love.',
    keywords: ['personalised prints', 'custom star map', 'where we met map', 'moon phase print', 'soundwave art', 'australian gifts'],
  },
  
  starMap: {
    title: 'Custom Star Map | Personalised Night Sky Print | EverHere Prints',
    description: 'Create a stunning custom star map showing the exact night sky from any date and location. Perfect for anniversaries, weddings & birthdays. Free AU shipping.',
    keywords: PRODUCT_KEYWORDS.starMap,
  },
  
  whereWeMet: {
    title: 'Where We Met Map | Custom Location Print | EverHere Prints',
    description: 'Design a beautiful personalised map of your special place. Where you met, got engaged, or fell in love. Premium quality prints with free Australian shipping.',
    keywords: PRODUCT_KEYWORDS.whereWeMet,
  },
  
  moonPhase: {
    title: 'Moon Phase Print | Custom Lunar Poster | EverHere Prints',
    description: 'Capture the moon phase from any special date. Perfect for weddings, births, and anniversaries. Beautiful personalised lunar prints delivered across Australia.',
    keywords: PRODUCT_KEYWORDS.moonPhase,
  },
  
  soundWave: {
    title: 'Sound Wave Art | Custom Audio Print | EverHere Prints',
    description: 'Transform your favourite song, voice message, or wedding vows into stunning soundwave art. Unique personalised prints capturing sound in visual form.',
    keywords: PRODUCT_KEYWORDS.soundWave,
  },
  
  australiaMap: {
    title: 'Australia Map Prints | Custom Watercolour Maps | EverHere Prints',
    description: 'Beautiful watercolour maps of Australia and New Zealand. Personalise with your locations, travels, and memories. High-quality Australian-made prints.',
    keywords: PRODUCT_KEYWORDS.australiaMap,
  },
  
  weddingGifts: {
    title: 'Unique Wedding Gifts | Personalised Presents for Couples | EverHere Prints',
    description: 'Find the perfect personalised wedding gift. Custom star maps, location prints, and more. Meaningful presents the happy couple will treasure forever.',
    keywords: OCCASION_KEYWORDS.wedding,
  },
  
  anniversaryGifts: {
    title: 'Anniversary Gift Ideas | Personalised Anniversary Presents | EverHere Prints',
    description: 'Celebrate your love story with a personalised anniversary gift. Custom prints marking your special moments, from first date to every year together.',
    keywords: OCCASION_KEYWORDS.anniversary,
  },
  
  valentinesGifts: {
    title: "Valentine's Day Gifts | Romantic Personalised Prints | EverHere Prints",
    description: "Show your love with a unique Valentine's Day gift. Personalised star maps, where you met maps, and soundwave art. Meaningful presents for your special person.",
    keywords: OCCASION_KEYWORDS.valentines,
  },
  
  christmasGifts: {
    title: 'Christmas Gift Ideas | Personalised Christmas Presents | EverHere Prints',
    description: 'Give a meaningful Christmas gift this year. Personalised prints capturing special moments and places. Thoughtful presents for everyone on your list.',
    keywords: OCCASION_KEYWORDS.christmas,
  },
  
  mothersDayGifts: {
    title: "Mother's Day Gifts Australia | Personalised Presents for Mum | EverHere Prints",
    description: "Find the perfect Mother's Day gift. Personalised prints celebrating your special bond. Custom star maps, location prints & more for the best mum ever.",
    keywords: OCCASION_KEYWORDS.mothersDay,
  },
  
  fathersDayGifts: {
    title: "Father's Day Gifts Australia | Unique Presents for Dad | EverHere Prints",
    description: "Celebrate Dad with a personalised Father's Day gift (September in Australia). Custom prints marking your shared memories. Thoughtful presents he'll love.",
    keywords: OCCASION_KEYWORDS.fathersDay,
  },
  
  babyGifts: {
    title: 'Baby Gift Ideas | Personalised Newborn Presents | EverHere Prints',
    description: 'Welcome a new arrival with a personalised baby gift. Night sky when they were born, birth moon phase prints & more. Beautiful nursery wall art.',
    keywords: OCCASION_KEYWORDS.baby,
  },
  
  blog: {
    title: 'Gift Ideas & Inspiration | EverHere Prints Blog',
    description: 'Discover gift ideas, learn about star maps and moon phases, and find inspiration for celebrating your special moments with personalised prints.',
    keywords: ['gift ideas', 'personalised print ideas', 'star map guide', 'anniversary inspiration', 'gift giving tips'],
  },
  
  about: {
    title: 'About Us | Our Story | EverHere Prints',
    description: 'EverHere Prints is an Australian business creating meaningful personalised artwork. Learn about our story, our values, and our commitment to quality.',
    keywords: ['about everhere prints', 'australian business', 'personalised print company', 'our story'],
  },
} as const;

// Shipping information for schema
export const SHIPPING_INFO = {
  australia: {
    name: 'Australia Wide Shipping',
    processingTime: '2-3 business days',
    deliveryTime: '3-7 business days',
    cost: 0, // Free shipping
    freeShippingThreshold: 0,
  },
  newZealand: {
    name: 'New Zealand Shipping',
    processingTime: '2-3 business days',
    deliveryTime: '7-14 business days',
    cost: 15,
  },
  international: {
    name: 'International Shipping',
    processingTime: '2-3 business days',
    deliveryTime: '14-21 business days',
    cost: 25,
  },
} as const;

// Product price ranges for schema
export const PRODUCT_PRICES = {
  starMap: { min: 59, max: 199 },
  whereWeMet: { min: 59, max: 199 },
  moonPhase: { min: 49, max: 179 },
  soundWave: { min: 59, max: 189 },
  australiaMap: { min: 69, max: 219 },
} as const;

// Seasonal content calendar
export const SEASONAL_CALENDAR = {
  january: ['new year gifts', 'fresh start', 'summer wedding season'],
  february: ['valentines day', 'romantic gifts', 'couple presents'],
  march: ['autumn wedding season', 'easter', 'international womens day'],
  april: ['easter gifts', 'anzac day', 'autumn occasions'],
  may: ['mothers day australia', 'autumn weddings', 'graduation'],
  june: ['mid-year sales', 'winter wedding season'],
  july: ['christmas in july', 'mid-year gifts'],
  august: ['spring preparation', 'fathers day prep'],
  september: ['fathers day australia', 'spring wedding season', 'engagement season'],
  october: ['engagement season peak', 'spring weddings', 'halloween'],
  november: ['wedding season peak australia', 'black friday', 'christmas prep'],
  december: ['christmas gifts', 'new year', 'summer weddings'],
} as const;
