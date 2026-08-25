import { IMG } from "./images";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  collection: string;
  description: string;
  fabric: string;
  fit: string;
  washCare: string;
  price: number;
  originalPrice: number;
  images: string[];
  video?: string;
  sizes: string[];
  colors: ColorOption[];
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  plusSize?: boolean;
  tags: string[];
}

const ROSE: ColorOption = { name: "Rose", hex: "#d9a0ae" };
const IVORY: ColorOption = { name: "Ivory", hex: "#f1e6d4" };
const PLUM: ColorOption = { name: "Plum", hex: "#7c3b4e" };
const SAGE: ColorOption = { name: "Sage", hex: "#a8b5a0" };
const GOLD: ColorOption = { name: "Gold", hex: "#c9a24b" };
const WINE: ColorOption = { name: "Wine", hex: "#5c2432" };
const BLUSH: ColorOption = { name: "Blush", hex: "#ebc9d2" };
const COCOA: ColorOption = { name: "Cocoa", hex: "#8a6a52" };

const STD = ["XS", "S", "M", "L", "XL", "XXL"];
const EXT = ["S", "M", "L", "XL", "XXL", "3XL", "4XL"];
const PLUS = ["XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

const CARE = "Gentle machine wash cold with like colours. Do not bleach. Iron on low, inside out. Dry in shade.";

export const PRODUCTS: Product[] = [
  {
    id: "p1", code: "LOTUS-101", name: "Aanchal Floral Kurta Set", category: "Kurta Sets", collection: "Everyday Elegance",
    description: "A gracefully tailored kurta set with a hand-finished floral print, paired with flowing palazzos and a feather-light dupatta. Designed to move beautifully from morning chai to evening plans.",
    fabric: "Premium rayon with modal lining", fit: "Relaxed A-line kurta, high-rise palazzo", washCare: CARE,
    price: 1499, originalPrice: 2499, images: [IMG.kurtaSet, IMG.heroModel],
    sizes: EXT, colors: [ROSE, IVORY, SAGE], stock: 24, rating: 4.8, reviews: 132,
    featured: true, newArrival: true, bestseller: true, tags: ["floral", "festive casual", "daily wear"],
  },
  {
    id: "p2", code: "LOTUS-102", name: "Noor Chikankari Kurti", category: "Kurtis", collection: "Everyday Elegance",
    description: "Delicate chikankari-inspired embroidery traces the neckline of this airy kurti. A timeless piece that feels handcrafted, because the details demand it.",
    fabric: "Soft mul cotton", fit: "Straight cut, side slits", washCare: CARE,
    price: 899, originalPrice: 1499, images: [IMG.kurti, IMG.kurtaSet],
    sizes: EXT, colors: [IVORY, BLUSH, SAGE], stock: 40, rating: 4.7, reviews: 98,
    newArrival: true, tags: ["chikankari", "office", "summer"],
  },
  {
    id: "p3", code: "LOTUS-103", name: "Gulnar Anarkali Set", category: "Festive", collection: "Festive Edit",
    description: "Layers of shimmering georgette fall into a full-flare anarkali, finished with zari borders and a trailing dupatta. Made for evenings that deserve applause.",
    fabric: "Georgette with satin lining", fit: "Fitted bodice, full flare", washCare: "Dry clean recommended",
    price: 2799, originalPrice: 4599, images: [IMG.festive, IMG.reel],
    sizes: STD, colors: [WINE, GOLD, PLUM], stock: 12, rating: 4.9, reviews: 76,
    featured: true, bestseller: true, tags: ["anarkali", "wedding guest", "party"],
  },
  {
    id: "p4", code: "LOTUS-104", name: "Sitara Midi Dress", category: "Dresses", collection: "Date Night",
    description: "A fluid midi dress with soft pleats that catch the light as you move. Minimal lines, maximal presence — your new favourite answer to 'what should I wear?'.",
    fabric: "Flowy crepe", fit: "Fit-and-flare, concealed zip", washCare: CARE,
    price: 1299, originalPrice: 2199, images: [IMG.dress, IMG.heroModel],
    sizes: STD, colors: [BLUSH, COCOA, WINE], stock: 30, rating: 4.6, reviews: 64,
    newArrival: true, tags: ["midi", "brunch", "date night"],
  },
  {
    id: "p5", code: "LOTUS-105", name: "Meher Blazer Co-ord", category: "Co-ord Sets", collection: "Office Chic",
    description: "A relaxed blazer and tailored shorts cut from the same warm neutral cloth. Effortless power dressing, minus the effort.",
    fabric: "Structured poly-viscose", fit: "Oversized blazer, high-rise shorts", washCare: CARE,
    price: 1699, originalPrice: 2799, images: [IMG.coords, IMG.dress],
    sizes: EXT, colors: [IVORY, COCOA], stock: 18, rating: 4.7, reviews: 41,
    newArrival: true, tags: ["co-ord", "workwear", "minimal"],
  },
  {
    id: "p6", code: "LOTUS-106", name: "Rhea Satin Top", category: "Tops", collection: "Date Night",
    description: "Liquid satin with a cowl drape and adjustable straps. Pairs with everything from palazzos to denim — the quiet hero of your wardrobe.",
    fabric: "Matte satin", fit: "Bias cut, relaxed", washCare: "Hand wash cold",
    price: 699, originalPrice: 1199, images: [IMG.coords, IMG.dress],
    sizes: STD, colors: [BLUSH, GOLD, WINE], stock: 52, rating: 4.5, reviews: 88,
    tags: ["satin", "evening", "versatile"],
  },
  {
    id: "p7", code: "LOTUS-107", name: "Banaras Silk Kurta Set", category: "Ethnic Wear", collection: "Wedding Guest",
    description: "Banarasi-inspired silk blend with woven gold accents. The kurta falls long and regal; the churidar and dupatta complete a look fit for the front row.",
    fabric: "Silk blend with woven zari", fit: "Straight long kurta", washCare: "Dry clean only",
    price: 2199, originalPrice: 3499, images: [IMG.festive, IMG.kurtaSet],
    sizes: EXT, colors: [GOLD, WINE, PLUM], stock: 15, rating: 4.8, reviews: 59,
    bestseller: true, tags: ["silk", "wedding", "zari"],
  },
  {
    id: "p8", code: "LOTUS-108", name: "Zoya Palazzo Suit", category: "Ethnic Wear", collection: "Everyday Elegance",
    description: "A breezy kurta with pintuck detailing worn over sweeping palazzos. Sage and ivory tones keep it serene; the cut keeps it sharp.",
    fabric: "Cotton-silk blend", fit: "A-line kurta, pleated palazzo", washCare: CARE,
    price: 1899, originalPrice: 2999, images: [IMG.lookbook, IMG.kurtaSet],
    sizes: EXT, colors: [SAGE, IVORY], stock: 21, rating: 4.7, reviews: 47,
    featured: true, tags: ["palazzo", "pintuck", "day wear"],
  },
  {
    id: "p9", code: "LOTUS-109", name: "Kamal Wrap Dress", category: "Dresses", collection: "Summer Collection",
    description: "The wrap that flatters every curve — adjustable tie, fluttering skirt, and a print inspired by lotus petals at dawn.",
    fabric: "Airy viscose", fit: "True wrap, adjustable", washCare: CARE,
    price: 1399, originalPrice: 2299, images: [IMG.dress, IMG.coords],
    sizes: PLUS, colors: [ROSE, PLUM], stock: 26, rating: 4.8, reviews: 73,
    plusSize: true, tags: ["wrap", "flattering", "summer"],
  },
  {
    id: "p10", code: "LOTUS-110", name: "Padma Sharara Set", category: "Festive", collection: "Wedding Guest",
    description: "A short embroidered kurti over dramatic flared shararas, crowned with a heavily bordered dupatta. Festive dressing, elevated.",
    fabric: "Raw silk with gota work", fit: "Short kurti, flared sharara", washCare: "Dry clean only",
    price: 3299, originalPrice: 5299, images: [IMG.festive, IMG.lookbook],
    sizes: STD, colors: [GOLD, WINE], stock: 9, rating: 4.9, reviews: 38,
    featured: true, tags: ["sharara", "gota", "celebration"],
  },
  {
    id: "p11", code: "LOTUS-111", name: "Sana Rayon Kurti", category: "Kurtis", collection: "Everyday Elegance",
    description: "Buttery-soft rayon in a forgiving straight cut with a delicate printed border. The kurti you'll reach for three times a week.",
    fabric: "Premium rayon", fit: "Straight cut, knee length", washCare: CARE,
    price: 749, originalPrice: 1299, images: [IMG.kurti, IMG.boutique],
    sizes: PLUS, colors: [BLUSH, SAGE, COCOA], stock: 60, rating: 4.6, reviews: 154,
    bestseller: true, plusSize: true, tags: ["daily", "soft", "printed"],
  },
  {
    id: "p12", code: "LOTUS-112", name: "Tara Linen Co-ord", category: "Co-ord Sets", collection: "Summer Collection",
    description: "Breathable linen shirt and easy trousers dyed in sun-washed ivory. Crumpled by design, polished by attitude.",
    fabric: "100% linen", fit: "Boxy shirt, tapered trouser", washCare: "Machine wash gentle, line dry",
    price: 1599, originalPrice: 2599, images: [IMG.coords, IMG.lookbook],
    sizes: EXT, colors: [IVORY, SAGE], stock: 17, rating: 4.7, reviews: 33,
    newArrival: true, tags: ["linen", "summer", "resort"],
  },
  {
    id: "p13", code: "LOTUS-113", name: "Mira Flare Dress", category: "Dresses", collection: "Summer Collection",
    description: "A swingy flare dress with puff sleeves and a smocked bodice. Twirl-tested, picnic-approved.",
    fabric: "Cotton poplin", fit: "Smocked bodice, flare skirt", washCare: CARE,
    price: 1199, originalPrice: 1999, images: [IMG.dress, IMG.reel],
    sizes: PLUS, colors: [BLUSH, ROSE, IVORY], stock: 34, rating: 4.5, reviews: 57,
    newArrival: true, plusSize: true, tags: ["flare", "puff sleeve", "casual"],
  },
  {
    id: "p14", code: "LOTUS-114", name: "Chandni Organza Kurti", category: "Kurtis", collection: "Festive Edit",
    description: "Sheer organza sleeves over a lined body, scattered with tonal sequins. Subtle sparkle for evenings that shimmer.",
    fabric: "Organza with satin lining", fit: "A-line, sheer sleeves", washCare: "Hand wash cold, dry flat",
    price: 1099, originalPrice: 1799, images: [IMG.kurti, IMG.festive],
    sizes: EXT, colors: [IVORY, GOLD], stock: 22, rating: 4.6, reviews: 29,
    tags: ["organza", "sequin", "evening"],
  },
  {
    id: "p15", code: "LOTUS-115", name: "Aisha Straight-Cut Suit", category: "Kurta Sets", collection: "Office Chic",
    description: "Crisp straight-cut kurta with matching pants and a slim dupatta. Boardroom polish with ethnic soul.",
    fabric: "Gada silk", fit: "Straight cut, side pockets", washCare: CARE,
    price: 1349, originalPrice: 2199, images: [IMG.kurtaSet, IMG.kurti],
    sizes: PLUS, colors: [PLUM, SAGE, COCOA], stock: 28, rating: 4.7, reviews: 121,
    bestseller: true, plusSize: true, tags: ["office", "straight cut", "pockets"],
  },
  {
    id: "p16", code: "LOTUS-116", name: "Devika Wedding Guest Set", category: "Festive", collection: "Wedding Guest",
    description: "An embroidered overlay kurta with a trailing dupatta in wine and antique gold. Arrive understated, leave unforgettable.",
    fabric: "Velvet touch georgette", fit: "Layered overlay, straight", washCare: "Dry clean only",
    price: 2999, originalPrice: 4999, images: [IMG.festive, IMG.heroModel],
    sizes: EXT, colors: [WINE, GOLD], stock: 11, rating: 4.9, reviews: 44,
    featured: true, tags: ["wedding", "velvet", "embroidered"],
  },
  {
    id: "p17", code: "LOTUS-117", name: "Kavya Pleated Skirt Set", category: "Western Wear", collection: "Office Chic",
    description: "A ribbed knit top tucked into a champagne pleated midi skirt. Office-to-dinner in zero outfit changes.",
    fabric: "Knit top, pleated poly skirt", fit: "Fitted top, elastic waist skirt", washCare: CARE,
    price: 1499, originalPrice: 2399, images: [IMG.coords, IMG.dress],
    sizes: STD, colors: [GOLD, COCOA], stock: 19, rating: 4.6, reviews: 26,
    newArrival: true, tags: ["pleated", "knit", "elegant"],
  },
  {
    id: "p18", code: "LOTUS-118", name: "Leela Handloom Kurta", category: "Kurtis", collection: "Everyday Elegance",
    description: "Handloom cotton with a natural slub texture and wooden buttons. Slow fashion that feels like a hug from home.",
    fabric: "Handloom cotton", fit: "Relaxed, curved hem", washCare: CARE,
    price: 649, originalPrice: 1099, images: [IMG.boutique, IMG.kurti],
    sizes: EXT, colors: [IVORY, COCOA, SAGE], stock: 45, rating: 4.5, reviews: 92,
    tags: ["handloom", "sustainable", "buttons"],
  },
  {
    id: "p19", code: "LOTUS-119", name: "Vanshika Dhoti Kurta Set", category: "Ethnic Wear", collection: "Festive Edit",
    description: "A contemporary dhoti drape meets a classic kurta in sage and ivory. For the woman who honours tradition on her own terms.",
    fabric: "Art silk", fit: "Pre-stitched dhoti, A-line kurta", washCare: "Dry clean recommended",
    price: 1999, originalPrice: 3299, images: [IMG.lookbook, IMG.kurtaSet],
    sizes: EXT, colors: [SAGE, IVORY], stock: 14, rating: 4.8, reviews: 37,
    newArrival: true, featured: true, tags: ["dhoti", "fusion", "statement"],
  },
  {
    id: "p20", code: "LOTUS-120", name: "Ritika Rib Knit Dress", category: "Western Wear", collection: "Date Night",
    description: "A body-skimming rib knit midi with a square neckline. Stretch that holds, lines that flatter.",
    fabric: "Ribbed knit with stretch", fit: "Bodycon, mid-thigh slit", washCare: "Machine wash gentle",
    price: 1099, originalPrice: 1799, images: [IMG.dress, IMG.coords],
    sizes: STD, colors: [COCOA, WINE, BLUSH], stock: 23, rating: 4.4, reviews: 51,
    tags: ["bodycon", "knit", "minimal"],
  },
  {
    id: "p21", code: "LOTUS-121", name: "Ojasvi Plus Kurta Set", category: "Kurta Sets", collection: "Plus Size Favorites",
    description: "Thoughtful tailoring from XL to 6XL — wider armholes, longer lengths, real pockets. Plum and gold embroidery celebrate every curve.",
    fabric: "Modal blend with lining", fit: "A-line, curve-friendly", washCare: CARE,
    price: 1599, originalPrice: 2599, images: [IMG.plussize, IMG.kurtaSet],
    sizes: PLUS, colors: [PLUM, ROSE], stock: 31, rating: 4.9, reviews: 87,
    newArrival: true, plusSize: true, featured: true, tags: ["plus size", "6xl", "embroidered"],
  },
  {
    id: "p22", code: "LOTUS-122", name: "Hema Plus Anarkali", category: "Festive", collection: "Plus Size Favorites",
    description: "A grand anarkali flare graded beautifully up to 6XL, with empire seams that lengthen and a dupatta that drapes like poetry.",
    fabric: "Georgette with satin lining", fit: "Empire waist, full flare", washCare: "Dry clean recommended",
    price: 2499, originalPrice: 3999, images: [IMG.plussize, IMG.festive],
    sizes: PLUS, colors: [WINE, GOLD], stock: 13, rating: 4.8, reviews: 42,
    plusSize: true, tags: ["plus size", "anarkali", "festive"],
  },
  {
    id: "p23", code: "LOTUS-123", name: "Priya Plus Co-ord", category: "Co-ord Sets", collection: "Plus Size Favorites",
    description: "An easy oversized shirt and wide-leg trouser co-ord, cut generously without losing shape. Confidence, coordinated.",
    fabric: "Tencel blend", fit: "Oversized shirt, wide leg", washCare: CARE,
    price: 1799, originalPrice: 2899, images: [IMG.plussize, IMG.coords],
    sizes: PLUS, colors: [IVORY, SAGE], stock: 20, rating: 4.7, reviews: 35,
    newArrival: true, plusSize: true, tags: ["plus size", "co-ord", "tencel"],
  },
  {
    id: "p24", code: "LOTUS-124", name: "Neelam Plus Wrap Dress", category: "Dresses", collection: "Plus Size Favorites",
    description: "A structured wrap dress with ruching that sculpts and a skirt that swings. Available up to 6XL, because elegance has no size limit.",
    fabric: "Stretch crepe", fit: "Wrap, ruched side", washCare: CARE,
    price: 1399, originalPrice: 2299, images: [IMG.plussize, IMG.dress],
    sizes: PLUS, colors: [PLUM, COCOA], stock: 25, rating: 4.8, reviews: 66,
    plusSize: true, bestseller: true, tags: ["plus size", "wrap", "sculpting"],
  },
];

export const CATEGORIES = [
  { name: "Kurta Sets", image: IMG.kurtaSet, to: "/shop?cat=Kurta%20Sets" },
  { name: "Kurtis", image: IMG.kurti, to: "/shop?cat=Kurtis" },
  { name: "Dresses", image: IMG.dress, to: "/shop?cat=Dresses" },
  { name: "Tops", image: IMG.coords, to: "/shop?cat=Tops" },
  { name: "Co-ord Sets", image: IMG.coords, to: "/shop?cat=Co-ord%20Sets" },
  { name: "Ethnic Wear", image: IMG.lookbook, to: "/shop?cat=Ethnic%20Wear" },
  { name: "Festive Collection", image: IMG.festive, to: "/shop?cat=Festive" },
  { name: "Western Wear", image: IMG.dress, to: "/shop?cat=Western%20Wear" },
  { name: "Plus Size", image: IMG.plussize, to: "/plus-size" },
  { name: "New Arrivals", image: IMG.reel, to: "/new-arrivals" },
];

export const COLLECTIONS = [
  { id: "everyday", name: "Everyday Elegance", tagline: "Soft staples for the every-day you", image: IMG.boutique, filter: "Everyday Elegance" },
  { id: "festive", name: "Festive Edit", tagline: "Zari, shimmer and celebration", image: IMG.festive, filter: "Festive Edit" },
  { id: "datenight", name: "Date Night", tagline: "Looks that linger in memory", image: IMG.dress, filter: "Date Night" },
  { id: "office", name: "Office Chic", tagline: "Polished from standup to sunset", image: IMG.coords, filter: "Office Chic" },
  { id: "wedding", name: "Wedding Guest", tagline: "Front-row festive dressing", image: IMG.lookbook, filter: "Wedding Guest" },
  { id: "summer", name: "Summer Collection", tagline: "Breezy fabrics, sun-washed tones", image: IMG.heroModel, filter: "Summer Collection" },
  { id: "plus", name: "Plus Size Favorites", tagline: "Graded with care, XL to 6XL", image: IMG.plussize, filter: "Plus Size Favorites" },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const productByCode = (code: string) => PRODUCTS.find((p) => p.code === code);
