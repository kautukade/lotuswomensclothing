import { IMG } from "./images";

export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  date: string;
}

export const REVIEWS: Review[] = [
  { name: "Sneha Deshmukh", location: "Pusad", rating: 5, text: "Ordered the Aanchal kurta set on WhatsApp and it reached in 4 days. The fabric feels far more premium than the price. My new favourite store!", product: "Aanchal Floral Kurta Set", date: "Jan 2026" },
  { name: "Pooja Rathod", location: "Yavatmal", rating: 5, text: "Finally a store that stocks my size without calling it 'special'. The 4XL fit is genuinely graded well — not just stretched. Thank you Lotus.", product: "Ojasvi Plus Kurta Set", date: "Dec 2025" },
  { name: "Ayesha Khan", location: "Nagpur", rating: 4.5, text: "The Gulnar anarkali made me feel like the main character at my cousin's wedding. Dupatta trail is gorgeous. Sizing chart was spot on.", product: "Gulnar Anarkali Set", date: "Nov 2025" },
  { name: "Kavita Ingole", location: "Mumbai", rating: 5, text: "I was nervous ordering ethnic wear online. The team shared real photos on WhatsApp before shipping. Quality checked, neatly packed, delivered on time.", product: "Banaras Silk Kurta Set", date: "Jan 2026" },
  { name: "Rutuja Pawar", location: "Pune", rating: 5, text: "Linen co-ord is my uniform now. Breathable in Indian summers and looks expensive. Already ordered a second colour.", product: "Tara Linen Co-ord", date: "Oct 2025" },
  { name: "Meenal Joshi", location: "Nashik", rating: 4.5, text: "Exchange was hassle-free when I needed a different size. They arranged pickup and sent the new one immediately. Rare service these days.", product: "Sitara Midi Dress", date: "Sep 2025" },
  { name: "Farah Shaikh", location: "Hyderabad", rating: 5, text: "The plus-size wrap dress fits like it was stitched for me. Ruching does magic. Ordering the plum colour next!", product: "Neelam Plus Wrap Dress", date: "Dec 2025" },
  { name: "Sakshi Ghodmare", location: "Indore", rating: 5, text: "Every piece arrives ironed, folded and scented. You can feel the care. The lookbook helped me style my kurti three different ways.", product: "Noor Chikankari Kurti", date: "Nov 2025" },
  { name: "Vaishali More", location: "Delhi", rating: 4.5, text: "PAN India shipping is real — my order crossed half the country in 5 days. The dhoti kurta set is a showstopper. Compliments guaranteed.", product: "Vanshika Dhoti Kurta Set", date: "Jan 2026" },
];

export interface LookHotspot {
  x: number;
  y: number;
  label: string;
  productId: string;
}

export const SHOP_THE_LOOK: { image: string; title: string; hotspots: LookHotspot[] } = {
  image: IMG.lookbook,
  title: "The Courtyard Look",
  hotspots: [
    { x: 52, y: 18, label: "Statement Jhumkas", productId: "p10" },
    { x: 44, y: 46, label: "Zoya Palazzo Suit", productId: "p8" },
    { x: 58, y: 74, label: "Flowing Dupatta", productId: "p19" },
  ],
};

export interface Reel {
  id: string;
  title: string;
  image: string;
  video?: string;
  productId: string;
  views: string;
}

export const REELS: Reel[] = [
  { id: "r1", title: "Twirl test: Gulnar Anarkali", image: IMG.reel, productId: "p3", views: "48.2K" },
  { id: "r2", title: "One dress, three moods", image: IMG.dress, productId: "p4", views: "31.9K" },
  { id: "r3", title: "Festive draping, decoded", image: IMG.festive, productId: "p16", views: "27.4K" },
  { id: "r4", title: "Office week in co-ords", image: IMG.coords, productId: "p5", views: "19.8K" },
  { id: "r5", title: "Plus-size fits that hug right", image: IMG.plussize, productId: "p21", views: "52.6K" },
  { id: "r6", title: "Behind the seams in Pusad", image: IMG.boutique, productId: "p18", views: "15.3K" },
];

export interface JournalPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
}

export const JOURNAL_CATEGORIES = ["Styling Tips", "Fashion Trends", "Size Guides", "Festive Fashion", "Clothing Care", "New Arrivals", "Behind The Brand"];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "5-ways-to-style-a-kurta-set",
    title: "5 Ways To Style A Kurta Set",
    category: "Styling Tips",
    excerpt: "One kurta set, five moods — from office mornings to mehendi evenings. Here's how our stylists rework the same silhouette.",
    image: IMG.kurtaSet, author: "Team Lotus", date: "12 Jan 2026", readTime: "4 min read",
    content: [
      "The kurta set is the hardest-working silhouette in an Indian wardrobe — and yet most of us wear it on repeat the same way. The secret to making one set feel like five is in the layers, the drape, and the details you add.",
      "Look one: the office polish. Wear the kurta closed with the matching bottoms, add a slim belt over the kurta, and switch the dupatta for structured jhumkas. Tuck the kurta's front panel in for an instant structured look.",
      "Look two: the casual errand. Open the kurta like a long jacket over a fitted top and straight-fit jeans. Roll the sleeves to the elbow — it reads intentional, not lazy.",
      "Look three: festive evening. Drape the dupatta on one shoulder with a brooch, add a potli bag, and let the embroidery do the talking. A deeper lip shade finishes it.",
      "Look four: winter layer. Throw a long waistcoat or a pashmina in a contrasting tone over the kurta. Texture contrast — wool over rayon — looks considered.",
      "Look five: the fusion twist. Swap the bottoms for a pleated skirt, cinch the kurta, and wear kolhapuris. Tradition, on your own terms.",
    ],
  },
  {
    slug: "how-to-choose-your-perfect-kurti-size",
    title: "How To Choose Your Perfect Kurti Size",
    category: "Size Guides",
    excerpt: "Between sizes? Here's the measuring method our tailors swear by — and when to size up on purpose.",
    image: IMG.kurti, author: "Team Lotus", date: "28 Dec 2025", readTime: "3 min read",
    content: [
      "A kurti that fits at the shoulders and flows everywhere else is the entire game. Start with a soft measuring tape and a mirror — or better, a friend.",
      "Measure your bust at the fullest point, keeping the tape parallel to the floor. For kurtis, this single number decides 80% of your size. Compare it to our size chart, and if you sit between two sizes, take the larger one — kurtis drape better with ease.",
      "Next, shoulder seam: the stitch should land exactly where your shoulder ends. If it droops, the kurti will look oversized in the wrong places.",
      "Length matters more than people think. Knee-length suits most heights; if you're petite, a side-slit straight cut elongates. Taller frames carry A-line and anarkali lengths beautifully.",
      "At Lotus, every size from XS to 6XL is graded individually — armholes, darts and lengths scale proportionally, not just the width. When in doubt, WhatsApp us your measurements and we'll confirm your size before you order.",
    ],
  },
  {
    slug: "festive-looks-you-will-love",
    title: "Festive Looks You'll Love This Season",
    category: "Festive Fashion",
    excerpt: "Zari, velvet-touch georgette and wine tones — the festive edit our customers can't stop reordering.",
    image: IMG.festive, author: "Team Lotus", date: "18 Oct 2025", readTime: "5 min read",
    content: [
      "This season's festive palette is moving away from loud shimmer toward something richer: wine, antique gold, deep plum — colours that photograph like heirlooms.",
      "The anarkali remains the queen of festive wear, and this year the flare is fuller. Our Gulnar set pairs georgette with a satin lining so the flare holds its shape through every twirl.",
      "If skirts are your language, the sharara is the moment. Short kurti, dramatic flare, heavy dupatta border — it's architecture you can dance in.",
      "For the minimalist, a velvet-touch overlay kurta with one statement piece of jewellery beats a heavily embroidered full set. Restraint reads expensive.",
      "Whatever you choose, order two weeks ahead of the event. Festive pieces move fast, and sizes above XL sell out first — a problem we're proud to keep solving.",
    ],
  },
  {
    slug: "caring-for-embroidered-fabrics",
    title: "Caring For Embroidered & Zari Fabrics",
    category: "Clothing Care",
    excerpt: "Keep the shimmer for years, not one season. Simple care rituals for zari, gota and chikankari work.",
    image: IMG.boutique, author: "Team Lotus", date: "02 Nov 2025", readTime: "3 min read",
    content: [
      "Embroidery is stitched, not printed — which means it can last decades if you treat it like the craft it is.",
      "Rule one: zari and gota pieces are dry-clean only. Water dulls metallic threads and can rust older-style zari from the inside.",
      "Rule two: never fold embroidered panels directly against each other. Roll the garment around a muslin cloth, or fold with tissue between the embroidered layers to prevent thread creasing.",
      "For chikankari and thread embroidery, gentle cold machine wash inside a mesh bag works — skip the spin cycle's highest setting and dry in shade, always.",
      "Iron inside out on low, and never press directly on sequins or stones. A steamer is the safest friend an embroidered garment can have.",
    ],
  },
  {
    slug: "behind-the-brand-made-in-pusad",
    title: "Behind The Brand: Made In Pusad, Loved Across India",
    category: "Behind The Brand",
    excerpt: "From a small town in Vidarbha to doorsteps in 28 states — why Lotus exists and what we obsess over.",
    image: IMG.lookbook, author: "Team Lotus", date: "05 Jan 2026", readTime: "4 min read",
    content: [
      "Lotus began with a simple frustration: beautiful clothes existed, but not for every body — and not easily, from where we live. Pusad gave us our roots; the internet gave us the rest of India.",
      "Every style that carries our name is checked by hand before it ships. Seams, fall, embroidery density, colour truth against the photo — if a piece doesn't pass, it doesn't leave.",
      "We chose to grade sizes properly instead of grading up lazily. A 4XL at Lotus has proportionally placed darts and armholes, because comfort is engineering, not an afterthought.",
      "WhatsApp ordering isn't a compromise for us — it's a choice. Real conversations, real photos before dispatch, real humans. That's how a small-town brand earns big-city trust.",
      "The lotus blooms in still water and stays unsoiled. That's the standard we hold: beauty that lasts, fashion that includes, service that answers.",
    ],
  },
  {
    slug: "new-season-new-blooms",
    title: "New Season, New Blooms: What Just Landed",
    category: "New Arrivals",
    excerpt: "Linen co-ords, organza sleeves and plus-size shararas — a first look at this month's arrivals.",
    image: IMG.heroModel, author: "Team Lotus", date: "20 Jan 2026", readTime: "3 min read",
    content: [
      "Fresh blooms have landed, and this month's rack leans into two moods: structured calm and festive drama.",
      "On the calm side: the Tara linen co-ord and the Kavya pleated skirt set. Neutral, breathable, endlessly re-wearable — the backbone of a capsule wardrobe.",
      "On the drama side: the Vanshika dhoti kurta set reworks a classic drape into something architectural, and the Chandni organza kurti adds sheer-sleeve sparkle without going loud.",
      "And because inclusivity isn't a capsule for us: three new plus-size styles have joined the range, graded XL to 6XL, including the already-selling-out Priya co-ord.",
      "New drops happen every week on Instagram first — follow @the.lotus.clothing so you never miss a size that sells fast.",
    ],
  },
];

export const WHY_LOTUS = [
  { icon: "truck", title: "PAN India Shipping", text: "From Pusad to every pincode — tracked delivery across all 28 states and UTs." },
  { icon: "ruler", title: "Sizes Up To 6XL", text: "Properly graded fits from XS to 6XL. Every body, equally considered." },
  { icon: "sparkle", title: "Curated Fashion", text: "New hand-picked styles every week — trends filtered through timeless taste." },
  { icon: "shield", title: "Quality Checked", text: "Every piece is inspected by hand before it leaves our store." },
  { icon: "chat", title: "Easy WhatsApp Ordering", text: "Order in a chat. Real photos, real people, real-fast replies." },
  { icon: "heart", title: "Customer Support", text: "Size help, exchanges and styling advice — one message away, 7 days a week." },
];

export const STORY_STATS = [
  { value: "500+", label: "Styles Curated" },
  { value: "XS – 6XL", label: "Size Range" },
  { value: "28", label: "States Served" },
  { value: "4.8★", label: "Average Rating" },
];

export const INSTAGRAM_GRID = [IMG.reel, IMG.festive, IMG.plussize, IMG.kurti, IMG.dress, IMG.lookbook];
