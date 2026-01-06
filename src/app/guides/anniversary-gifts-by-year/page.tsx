// src/app/guides/anniversary-gifts-by-year/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Gift, Star, MapPin, Moon, Music, Gem, Flower2 } from 'lucide-react';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { Breadcrumbs, FAQSchema, JsonLd } from '@/components/seo';
import type { FAQItem } from '@/types/seo';

export const metadata: Metadata = genMeta({
  title: 'Anniversary Gifts by Year: Complete Guide (1st to 60th) | EverHere Prints',
  description:
    'The complete guide to anniversary gifts by year. Traditional & modern themes, gemstones, colours, and flowers for every anniversary from 1st to 60th. Find the perfect personalised gift.',
  keywords: [
    'anniversary gifts by year',
    'traditional anniversary gifts',
    'modern anniversary gifts',
    'first anniversary gift',
    'paper anniversary',
    'silver anniversary gifts',
    'golden anniversary gifts',
    'anniversary gift guide',
    'wedding anniversary themes',
    'anniversary gemstones',
  ],
  path: '/guides/anniversary-gifts-by-year',
  image: '/images/og/anniversary-guide.jpg',
});

// Complete anniversary data for all years 1-60
const anniversaryYears = [
  { year: 1, traditional: 'Paper', modern: 'Clocks', gemstone: 'Gold Jewellery', flower: 'Carnation', colour: 'Gold/Yellow', gift: 'Star Map Print', description: 'Paper symbolises the blank page of your new life together. A star map print captures your wedding night perfectly.' },
  { year: 2, traditional: 'Cotton', modern: 'China', gemstone: 'Garnet', flower: 'Lily of the Valley', colour: 'Red/White', gift: 'Canvas Print', description: 'Cotton represents comfort and adaptability. A canvas print brings warmth to your home.' },
  { year: 3, traditional: 'Leather', modern: 'Crystal/Glass', gemstone: 'Pearl', flower: 'Sunflower', colour: 'White/Jade', gift: 'Framed Print', description: 'Leather symbolises durability. A beautifully framed print will last a lifetime.' },
  { year: 4, traditional: 'Fruit/Flowers', modern: 'Appliances', gemstone: 'Blue Topaz', flower: 'Hydrangea', colour: 'Blue/Green', gift: 'Botanical Print', description: 'Fruit and flowers represent the blossoming of your relationship.' },
  { year: 5, traditional: 'Wood', modern: 'Silverware', gemstone: 'Sapphire', flower: 'Daisy', colour: 'Blue/Pink/Turquoise', gift: 'Wooden Framed Map', description: 'Wood represents the strong roots you\'ve established. A wooden-framed print is ideal.' },
  { year: 6, traditional: 'Candy/Iron', modern: 'Wood', gemstone: 'Amethyst', flower: 'Calla Lily', colour: 'Purple/White', gift: 'Where We Met Map', description: 'Iron symbolises the strength of your bond. Celebrate with a map of your special place.' },
  { year: 7, traditional: 'Wool/Copper', modern: 'Desk Sets', gemstone: 'Onyx', flower: 'Freesia', colour: 'Off White/Copper', gift: 'Custom Print Set', description: 'Wool represents warmth and comfort in your relationship.' },
  { year: 8, traditional: 'Pottery/Bronze', modern: 'Linens/Lace', gemstone: 'Tourmaline', flower: 'Clematis', colour: 'Bronze', gift: 'Ceramic Print', description: 'Pottery represents the art of shaping your life together.' },
  { year: 9, traditional: 'Pottery/Willow', modern: 'Leather', gemstone: 'Lapis Lazuli', flower: 'Poppy', colour: 'Terracotta', gift: 'Nature Print', description: 'Willow symbolises flexibility and resilience in love.' },
  { year: 10, traditional: 'Tin/Aluminium', modern: 'Diamond Jewellery', gemstone: 'Diamond', flower: 'Daffodil', colour: 'Silver/Blue', gift: 'Metal Print', description: 'A decade of love deserves something that shines. Diamond accents or metal prints work beautifully.' },
  { year: 11, traditional: 'Steel', modern: 'Fashion Jewellery', gemstone: 'Turquoise', flower: 'Tulip', colour: 'Turquoise', gift: 'Minimalist Print', description: 'Steel represents the unbreakable nature of your bond.' },
  { year: 12, traditional: 'Silk/Linen', modern: 'Pearls', gemstone: 'Jade', flower: 'Peony', colour: 'Oyster White', gift: 'Elegant Print', description: 'Silk represents luxury and refinement in your relationship.' },
  { year: 13, traditional: 'Lace', modern: 'Textiles/Furs', gemstone: 'Citrine', flower: 'Chrysanthemum', colour: 'White', gift: 'Delicate Art Print', description: 'Lace symbolises the intricate beauty of long-term love.' },
  { year: 14, traditional: 'Ivory', modern: 'Gold Jewellery', gemstone: 'Opal', flower: 'Dahlia', colour: 'Ivory', gift: 'Classic Print', description: 'Ivory (now ethically substituted) represents purity and timelessness.' },
  { year: 15, traditional: 'Crystal', modern: 'Watches', gemstone: 'Ruby', flower: 'Rose', colour: 'Red', gift: 'Premium Framed Print', description: 'Crystal represents clarity and transparency. A crystal-clear premium print captures your journey.' },
  { year: 16, traditional: 'Wax', modern: 'Silver Hollowware', gemstone: 'Peridot', flower: 'Statice', colour: 'Silver', gift: 'Candlelit Theme Print', description: 'Wax symbolises the warmth you bring to each other\'s lives.' },
  { year: 17, traditional: 'Furniture', modern: 'Furniture', gemstone: 'Carnelian', flower: 'Red Carnation', colour: 'Yellow', gift: 'Home Decor Print', description: 'Furniture represents building a home together.' },
  { year: 18, traditional: 'Porcelain', modern: 'Porcelain', gemstone: 'Cat\'s Eye', flower: 'Lily', colour: 'Blue', gift: 'Fine Art Print', description: 'Porcelain symbolises delicate beauty that endures.' },
  { year: 19, traditional: 'Bronze', modern: 'Bronze', gemstone: 'Aquamarine', flower: 'Bronze Chrysanthemum', colour: 'Bronze', gift: 'Bronze-Toned Print', description: 'Bronze represents the strength forged over time.' },
  { year: 20, traditional: 'China', modern: 'Platinum', gemstone: 'Emerald', flower: 'Aster', colour: 'White/Green', gift: 'Platinum Frame Print', description: 'Two decades of love deserve something precious. Emerald accents or platinum framing.' },
  { year: 21, traditional: 'Brass/Nickel', modern: 'Brass/Nickel', gemstone: 'Iolite', flower: 'Orange Blossom', colour: 'Orange', gift: 'Warm-Toned Print', description: 'Brass and nickel represent durability with style.' },
  { year: 22, traditional: 'Copper', modern: 'Copper', gemstone: 'Spinel', flower: 'Fern', colour: 'Copper', gift: 'Copper-Accent Print', description: 'Copper symbolises beauty and warmth.' },
  { year: 23, traditional: 'Silver Plate', modern: 'Silver Plate', gemstone: 'Imperial Topaz', flower: 'Gladiolus', colour: 'Silver', gift: 'Silver Frame Print', description: 'Silver plate represents enduring value.' },
  { year: 24, traditional: 'Opal', modern: 'Musical Instruments', gemstone: 'Tanzanite', flower: 'Lavender', colour: 'Lavender', gift: 'Sound Wave Art', description: 'Music and opal both capture light beautifully. A soundwave print of your song is perfect.' },
  { year: 25, traditional: 'Silver', modern: 'Silver', gemstone: 'Silver Jubilee', flower: 'Iris', colour: 'Silver', gift: 'Silver Anniversary Print', description: 'The Silver Anniversary deserves celebration. A beautifully framed print in silver marks this milestone.' },
  { year: 26, traditional: 'Original Pictures', modern: 'Original Pictures', gemstone: 'Star Sapphire', flower: 'Yellow Rose', colour: 'N/A', gift: 'Custom Artwork', description: 'Original pictures celebrate your unique love story.' },
  { year: 27, traditional: 'Sculpture', modern: 'Sculpture', gemstone: 'Almandine Garnet', flower: 'Leucadendron', colour: 'N/A', gift: 'Artistic Print', description: 'Sculpture represents the art of love.' },
  { year: 28, traditional: 'Orchids', modern: 'Orchids', gemstone: 'Orchid Tourmaline', flower: 'Orchid', colour: 'Lavender', gift: 'Botanical Print', description: 'Orchids represent rare and delicate beauty.' },
  { year: 29, traditional: 'Furniture', modern: 'Furniture', gemstone: 'Rose Quartz', flower: 'African Violet', colour: 'N/A', gift: 'Home Decor Print', description: 'Furniture gifts represent building your forever home.' },
  { year: 30, traditional: 'Pearl', modern: 'Diamond', gemstone: 'Pearl', flower: 'Lily', colour: 'White/Ivory', gift: 'Pearl Anniversary Print', description: 'The Pearl Anniversary marks 30 years of growing beauty, like a pearl in an oyster.' },
  { year: 31, traditional: 'Timepieces', modern: 'Timepieces', gemstone: 'Hawk\'s Eye', flower: 'Carnation', colour: 'N/A', gift: 'Timeless Print', description: 'Timepieces celebrate the precious time you\'ve spent together.' },
  { year: 32, traditional: 'Conveyances', modern: 'Conveyances', gemstone: 'Blue Zircon', flower: 'Philodendron', colour: 'N/A', gift: 'Journey Map', description: 'Conveyances represent your journey together.' },
  { year: 33, traditional: 'Amethyst', modern: 'Amethyst', gemstone: 'Amethyst', flower: 'Viola', colour: 'Purple', gift: 'Purple-Themed Print', description: 'Amethyst represents clarity and calm in your relationship.' },
  { year: 34, traditional: 'Opal', modern: 'Opal', gemstone: 'Opal', flower: 'Smilax', colour: 'Multi', gift: 'Opalescent Print', description: 'Opal\'s many colours represent the many facets of your love.' },
  { year: 35, traditional: 'Coral', modern: 'Jade', gemstone: 'Coral/Jade', flower: 'Coral Rose', colour: 'Coral', gift: 'Coral Anniversary Print', description: 'Coral represents the organic growth of your relationship over 35 years.' },
  { year: 36, traditional: 'Bone China', modern: 'Bone China', gemstone: 'Blue Tanzanite', flower: 'Monstera', colour: 'White', gift: 'Refined Print', description: 'Bone china represents refinement and elegance.' },
  { year: 37, traditional: 'Alabaster', modern: 'Alabaster', gemstone: 'Alexandrite', flower: 'Lily', colour: 'White', gift: 'Classic White Print', description: 'Alabaster represents pure, enduring love.' },
  { year: 38, traditional: 'Beryl/Tourmaline', modern: 'Beryl/Tourmaline', gemstone: 'Tourmaline', flower: 'Red Dahlia', colour: 'Various', gift: 'Vibrant Print', description: 'Beryl and tourmaline represent the vibrant colours of your life together.' },
  { year: 39, traditional: 'Lace', modern: 'Lace', gemstone: 'Malachite', flower: 'Bird of Paradise', colour: 'Green', gift: 'Intricate Print', description: 'Lace represents the delicate intricacy of long-lasting love.' },
  { year: 40, traditional: 'Ruby', modern: 'Ruby', gemstone: 'Ruby', flower: 'Nasturtium', colour: 'Red', gift: 'Ruby Anniversary Print', description: 'The Ruby Anniversary celebrates 40 years of passionate love. Ruby red accents honour this milestone.' },
  { year: 41, traditional: 'Land', modern: 'Land', gemstone: 'Precious Topaz', flower: 'Amaranth', colour: 'N/A', gift: 'Location Map', description: 'Land represents the foundation you\'ve built together.' },
  { year: 42, traditional: 'Real Estate', modern: 'Real Estate', gemstone: 'Labradorite', flower: 'Dahlia', colour: 'N/A', gift: 'Home Map Print', description: 'Real estate celebrates the home you\'ve made together.' },
  { year: 43, traditional: 'Travel', modern: 'Travel', gemstone: 'Pyrope Garnet', flower: 'Cerbera', colour: 'N/A', gift: 'Journey Route Map', description: 'Travel represents your adventures together. A route map of your travels is perfect.' },
  { year: 44, traditional: 'Groceries', modern: 'Groceries', gemstone: 'Fire Agate', flower: 'Lantana', colour: 'N/A', gift: 'Kitchen Art Print', description: 'Groceries represent the everyday love that nourishes.' },
  { year: 45, traditional: 'Sapphire', modern: 'Sapphire', gemstone: 'Sapphire', flower: 'Blue Iris', colour: 'Blue', gift: 'Sapphire Anniversary Print', description: 'The Sapphire Anniversary marks 45 years. Deep blue tones honour this achievement.' },
  { year: 46, traditional: 'Original Poetry', modern: 'Original Poetry', gemstone: 'Larimar', flower: 'Blue Delphiniums', colour: 'N/A', gift: 'Custom Quote Print', description: 'Poetry represents the words that define your love.' },
  { year: 47, traditional: 'Books', modern: 'Books', gemstone: 'Andalusite', flower: 'Paperwhites', colour: 'N/A', gift: 'Literary Print', description: 'Books represent the chapters of your life together.' },
  { year: 48, traditional: 'Optical Goods', modern: 'Optical Goods', gemstone: 'Sunstone', flower: 'Heliotrope', colour: 'N/A', gift: 'Stargazing Print', description: 'Optical goods celebrate seeing the world together. A star map is perfect.' },
  { year: 49, traditional: 'Luxuries', modern: 'Luxuries', gemstone: 'Heliolite', flower: 'Helichrysum', colour: 'N/A', gift: 'Luxury Framed Print', description: 'Luxuries represent treating yourselves after 49 years of devotion.' },
  { year: 50, traditional: 'Gold', modern: 'Gold', gemstone: 'Gold', flower: 'Yellow Rose', colour: 'Gold', gift: 'Golden Anniversary Print', description: 'The Golden Anniversary celebrates half a century of love. Gold-framed prints honour this incredible milestone.' },
  { year: 51, traditional: 'Shepherd\'s Check', modern: 'Shepherd\'s Check', gemstone: 'Citrine', flower: 'Butterfly Weed', colour: 'N/A', gift: 'Patterned Print', description: 'Shepherd\'s check represents the careful watching over your love.' },
  { year: 52, traditional: 'Star Ruby', modern: 'Star Ruby', gemstone: 'Star Ruby', flower: 'Red Aster', colour: 'Red', gift: 'Star-Themed Print', description: 'Star ruby represents the celestial nature of lasting love.' },
  { year: 53, traditional: 'Cashmere', modern: 'Cashmere', gemstone: 'Charoite', flower: 'Bougainvillea', colour: 'N/A', gift: 'Luxurious Print', description: 'Cashmere represents the soft comfort of 53 years together.' },
  { year: 54, traditional: 'Sphene', modern: 'Sphene', gemstone: 'Sphene', flower: 'Acacia', colour: 'N/A', gift: 'Rare Beauty Print', description: 'Sphene, a rare gem, represents the rarity of such enduring love.' },
  { year: 55, traditional: 'Emerald', modern: 'Emerald', gemstone: 'Emerald', flower: 'Green Plants', colour: 'Green', gift: 'Emerald Anniversary Print', description: 'The Emerald Anniversary marks 55 years of evergreen love.' },
  { year: 56, traditional: 'Star Sapphire', modern: 'Star Sapphire', gemstone: 'Star Sapphire', flower: 'Blue Orchid', colour: 'Blue', gift: 'Celestial Print', description: 'Star sapphire represents the cosmic nature of your bond.' },
  { year: 57, traditional: 'Azurite', modern: 'Azurite', gemstone: 'Azurite', flower: 'Forget-Me-Not', colour: 'Blue', gift: 'Deep Blue Print', description: 'Azurite represents depth and wisdom in love.' },
  { year: 58, traditional: 'Almandine', modern: 'Almandine', gemstone: 'Almandine', flower: 'Red Chrysanthemum', colour: 'Red', gift: 'Warm Red Print', description: 'Almandine represents the enduring warmth of your love.' },
  { year: 59, traditional: 'Malachite', modern: 'Malachite', gemstone: 'Malachite', flower: 'Green Orchid', colour: 'Green', gift: 'Nature Print', description: 'Malachite represents transformation and growth.' },
  { year: 60, traditional: 'Diamond', modern: 'Diamond', gemstone: 'Diamond', flower: 'White Rose', colour: 'White/Diamond', gift: 'Diamond Anniversary Print', description: 'The Diamond Anniversary celebrates 60 years—as rare and precious as the gem itself. The ultimate milestone deserves the ultimate print.' },
];

const milestoneYears = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const products = [
  { name: 'Star Map', icon: Star, slug: '/star-map', description: 'The night sky from your special date' },
  { name: 'Where We Met Map', icon: MapPin, slug: '/where-we-met', description: 'Your meaningful location' },
  { name: 'Moon Phase Print', icon: Moon, slug: '/moon-phase', description: 'The moon from any date' },
  { name: 'Sound Wave Art', icon: Music, slug: '/sound-wave', description: 'Your song visualised' },
];

const faqs: FAQItem[] = [
  {
    question: 'What are the traditional anniversary gifts by year?',
    answer: 'Traditional anniversary gifts follow a progression of materials: 1st is Paper, 5th is Wood, 10th is Tin/Aluminium, 15th is Crystal, 20th is China, 25th is Silver, 30th is Pearl, 40th is Ruby, 50th is Gold, and 60th is Diamond. Each material symbolises an aspect of how relationships grow stronger over time.',
  },
  {
    question: 'What is the difference between traditional and modern anniversary gifts?',
    answer: 'Traditional anniversary gifts date back centuries and use symbolic materials (paper, wood, silver, gold). Modern anniversary gifts were introduced in 1937 to offer more practical alternatives. For example, the 1st anniversary is traditionally Paper but modern suggests Clocks. Both are equally meaningful—choose based on your partner\'s preferences.',
  },
  {
    question: 'What are anniversary gemstones?',
    answer: 'Each anniversary year has an associated gemstone. Notable ones include: 1st - Gold Jewellery, 5th - Sapphire, 10th - Diamond, 15th - Ruby, 20th - Emerald, 25th - Silver Jubilee, 30th - Pearl, 40th - Ruby, 45th - Sapphire, 50th - Gold, and 60th - Diamond. These can be incorporated into gifts or jewellery.',
  },
  {
    question: 'Why is the 1st anniversary called the Paper Anniversary?',
    answer: 'Paper symbolises the blank page of your new life together—a fresh start with endless possibilities to write your story. It also represents the fragility of a new marriage that requires care and nurturing. Print gifts like star maps perfectly honour this tradition while creating lasting keepsakes.',
  },
  {
    question: 'What is the best anniversary gift for someone who has everything?',
    answer: 'Personalised gifts work best for people who have everything because they\'re completely unique. A custom star map showing your wedding night sky, a map of where you first met, or soundwave art of your wedding song cannot be bought anywhere else—they\'re one-of-a-kind representations of your specific love story.',
  },
  {
    question: 'Do I have to follow traditional anniversary gift themes?',
    answer: 'Not at all! Traditional themes are guidelines, not rules. Many couples enjoy incorporating the theme creatively—like giving a star map print (paper) for the 1st anniversary or a wooden-framed print for the 5th. Others ignore themes entirely and focus on what their partner will love most.',
  },
];

function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

export default function AnniversaryGiftsByYearPage() {
  // HowTo schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Choose the Perfect Anniversary Gift by Year',
    description: 'A step-by-step guide to selecting meaningful anniversary gifts based on traditional and modern themes.',
    totalTime: 'PT10M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Identify Your Anniversary Year', text: 'Determine which anniversary you\'re celebrating—each year has unique traditional and modern gift themes.' },
      { '@type': 'HowToStep', position: 2, name: 'Choose Traditional or Modern Theme', text: 'Decide whether to follow traditional materials (paper, wood, silver) or modern alternatives (clocks, silverware, platinum).' },
      { '@type': 'HowToStep', position: 3, name: 'Consider the Gemstone and Colour', text: 'Each year has an associated gemstone and colour that can inspire your gift choice or presentation.' },
      { '@type': 'HowToStep', position: 4, name: 'Personalise Your Gift', text: 'Make your gift unique by incorporating meaningful dates, locations, or moments from your relationship.' },
      { '@type': 'HowToStep', position: 5, name: 'Add a Personal Message', text: 'Include custom text, names, or a heartfelt quote that speaks to your specific love story.' },
    ],
  };

  // ItemList schema
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Anniversary Gifts by Year',
    description: 'Complete list of traditional and modern anniversary gift themes from 1st to 60th year',
    numberOfItems: anniversaryYears.length,
    itemListElement: anniversaryYears.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${item.year}${getOrdinalSuffix(item.year)} Anniversary - ${item.traditional}`,
      description: item.description,
    })),
  };

  return (
    <>
      <JsonLd data={[howToSchema, itemListSchema]} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Guides', href: '/guides' },
              { name: 'Anniversary Gifts by Year', href: '/guides/anniversary-gifts-by-year' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm mb-6">
              <Gift className="w-4 h-4" />
              Complete Anniversary Guide
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
              Anniversary Gifts by Year: The Complete Guide
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed mb-8">
              From Paper to Diamond—discover the traditional and modern gift themes,
              gemstones, colours, and flowers for every wedding anniversary from
              1st to 60th year. Find meaningful gift ideas that honour each milestone.
            </p>
            
            {/* Table of Contents */}
            <nav className="bg-stone-100 rounded-xl p-6">
              <h2 className="font-medium text-stone-900 mb-4">Jump to Milestone Anniversaries</h2>
              <div className="flex flex-wrap gap-2">
                {milestoneYears.map((year) => (
                  <a
                    key={year}
                    href={`#year-${year}`}
                    className="px-3 py-1.5 bg-white rounded-full text-sm text-stone-700 hover:bg-stone-200 transition-colors"
                  >
                    {year}{getOrdinalSuffix(year)}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section className="bg-white border-y border-stone-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl text-stone-900 mb-6">
              Quick Reference: Major Anniversary Milestones
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="py-3 pr-4 font-medium text-stone-900">Year</th>
                    <th className="py-3 px-4 font-medium text-stone-900">Traditional</th>
                    <th className="py-3 px-4 font-medium text-stone-900">Modern</th>
                    <th className="py-3 px-4 font-medium text-stone-900">Gemstone</th>
                    <th className="py-3 px-4 font-medium text-stone-900">Colour</th>
                    <th className="py-3 pl-4 font-medium text-stone-900">Our Pick</th>
                  </tr>
                </thead>
                <tbody>
                  {anniversaryYears.filter((y) => milestoneYears.includes(y.year)).map((item) => (
                    <tr key={item.year} className="border-b border-stone-100">
                      <td className="py-3 pr-4 font-medium text-stone-900">{item.year}{getOrdinalSuffix(item.year)}</td>
                      <td className="py-3 px-4 text-stone-600">{item.traditional}</td>
                      <td className="py-3 px-4 text-stone-600">{item.modern}</td>
                      <td className="py-3 px-4 text-stone-600">{item.gemstone}</td>
                      <td className="py-3 px-4 text-stone-600">{item.colour}</td>
                      <td className="py-3 pl-4 text-rose-600 font-medium">{item.gift}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Product Suggestions */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-serif text-2xl text-stone-900 mb-6">Personalised Prints for Any Anniversary</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.slug} href={product.slug} className="group bg-stone-50 rounded-xl p-6 hover:bg-stone-100 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <product.icon className="w-6 h-6 text-stone-700" />
                </div>
                <h3 className="font-medium text-stone-900 mb-1">{product.name}</h3>
                <p className="text-sm text-stone-600">{product.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* All Anniversary Years */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-serif text-3xl text-stone-900 mb-8">Complete Anniversary Gift Guide: Year by Year</h2>
          <div className="space-y-6">
            {anniversaryYears.map((item) => {
              const isMilestone = milestoneYears.includes(item.year);
              return (
                <article
                  key={item.year}
                  id={`year-${item.year}`}
                  className={`scroll-mt-24 ${isMilestone ? 'bg-gradient-to-r from-rose-50 to-amber-50 border-2 border-rose-200' : 'bg-white border border-stone-200'} rounded-2xl p-6 md:p-8`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-3xl md:text-4xl font-serif ${isMilestone ? 'text-rose-600' : 'text-stone-900'}`}>
                          {item.year}{getOrdinalSuffix(item.year)}
                        </span>
                        <span className="text-2xl md:text-3xl font-serif text-stone-400">Anniversary</span>
                        {isMilestone && (
                          <span className="px-2 py-1 bg-rose-600 text-white text-xs font-medium rounded-full">Milestone</span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif text-stone-900">The {item.traditional} Anniversary</h3>
                    </div>
                    <Link href="/star-map" className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors">
                      Create Gift <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <p className="text-stone-600 mb-6">{item.description}</p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Traditional</div>
                      <div className="font-medium text-stone-900">{item.traditional}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <div className="text-xs text-stone-500 uppercase tracking-wide mb-1">Modern</div>
                      <div className="font-medium text-stone-900">{item.modern}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wide mb-1">
                        <Gem className="w-3 h-3" /> Gemstone
                      </div>
                      <div className="font-medium text-stone-900">{item.gemstone}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wide mb-1">
                        <Flower2 className="w-3 h-3" /> Flower
                      </div>
                      <div className="font-medium text-stone-900">{item.flower}</div>
                    </div>
                  </div>
                  {item.colour !== 'N/A' && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-stone-500">
                      <span>Anniversary Colour:</span>
                      <span className="font-medium text-stone-700">{item.colour}</span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-stone-100 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSchema faqs={faqs} showUI={true} title="Anniversary Gift Questions" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-stone-900 rounded-3xl p-8 md:p-12 text-center">
            <Heart className="w-12 h-12 text-rose-400 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Create Your Anniversary Gift</h2>
            <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
              Design a personalised print that captures your love story. From paper to diamond, our prints work for every anniversary.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/star-map" className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-colors">
                Design Star Map <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/gifts/anniversary-gifts" className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors">
                Browse Anniversary Gifts
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
