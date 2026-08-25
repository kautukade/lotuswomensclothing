/** Central business configuration — swap values here (or later from Supabase). */
export const BRAND = {
  name: "Lotus",
  fullName: "Lotus Women's Clothing",
  tagline: "Bloom In Your Style",
  location: "Pusad, Maharashtra, India",
  /** WhatsApp number in international format, digits only. Change this to the store number. */
  whatsappNumber: "919876543210",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "hello@thelotus.in",
  instagramHandle: "@the.lotus.clothing",
  instagramUrl: "https://www.instagram.com/the.lotus.clothing",
  hours: "Mon – Sun · 10:00 AM – 9:00 PM",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pusad%2C+Maharashtra%2C+India",
  freeShippingAbove: 1999,
  shippingEtaDays: [4, 7] as [number, number],
};

export const ANNOUNCEMENTS = [
  "PAN India Shipping",
  "Sizes Available Up To 6XL",
  "New Arrivals Every Week",
  "Order Easily On WhatsApp",
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Collections", to: "/collections" },
  { label: "Plus Size", to: "/plus-size" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "Reviews", to: "/reviews" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const SIZES_ALL = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

export const SIZE_GUIDE: { size: string; bust: string; waist: string; hip: string }[] = [
  { size: "XS", bust: "32", waist: "26", hip: "35" },
  { size: "S", bust: "34", waist: "28", hip: "37" },
  { size: "M", bust: "36", waist: "30", hip: "39" },
  { size: "L", bust: "38", waist: "32", hip: "41" },
  { size: "XL", bust: "40", waist: "34", hip: "43" },
  { size: "XXL", bust: "42", waist: "36", hip: "45" },
  { size: "3XL", bust: "44", waist: "38", hip: "47" },
  { size: "4XL", bust: "46", waist: "40", hip: "49" },
  { size: "5XL", bust: "48", waist: "42", hip: "51" },
  { size: "6XL", bust: "50", waist: "44", hip: "53" },
];

export const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/new-arrivals" },
      { label: "Kurtis", to: "/shop?cat=Kurtis" },
      { label: "Kurta Sets", to: "/shop?cat=Kurta%20Sets" },
      { label: "Dresses", to: "/shop?cat=Dresses" },
      { label: "Plus Size", to: "/plus-size" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Size Guide", to: "/size-guide" },
      { label: "Shipping", to: "/shipping-returns" },
      { label: "Returns", to: "/shipping-returns" },
      { label: "FAQs", to: "/contact" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "Instagram", to: BRAND.instagramUrl },
      { label: "Lookbook", to: "/lookbook" },
      { label: "Journal", to: "/journal" },
    ],
  },
];
