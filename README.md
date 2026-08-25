# 🌸 Lotus Women's Clothing — Premium 3D Fashion Website

A premium, highly animated, conversion-focused fashion e-commerce website for **Lotus Women's Clothing** (Pusad, Maharashtra · PAN India shipping · sizes up to 6XL), with WhatsApp-first ordering.

---

## ✨ Features

- **3D lotus hero** — a custom-built blooming lotus (Three.js / React Three Fiber) with golden dust particles, mouse parallax and scroll depth
- **Elegant loader** — lotus bloom + "LOTUS" wordmark intro
- **Custom cursor** (desktop) with contextual `VIEW` / `DRAG` / `PLAY` states
- **Full shopping experience** — 24 sample products, categories, collections, filters (category / size / colour / price / stock), sorting, quick view, product detail with zoom, related + recently viewed
- **Cart drawer + wishlist** persisted in `localStorage`
- **WhatsApp ordering** — every "Order on WhatsApp" button generates a dynamic pre-filled message (product, code, size, colour, qty, price, link). Cart checkout composes the whole order
- **Search overlay** with live results (name / code / category / collection / tags)
- **Watch & Shop** — Instagram-reels style shoppable video cards (autoplay when visible, pause off-screen)
- **Shop the Look** hotspots, **Lookbook** editorial spreads with parallax, **Journal** (blog) with categories & share buttons
- **Plus-size spotlight** (USP), size guide (XS–6XL), reviews marquees, store location, contact, shipping & returns, privacy, terms, branded 404
- **Mobile-first** — full-screen animated menu, bottom navigation, filter bottom-sheet, tested layouts from 320px up
- Scroll reveals, marquees, magnetic buttons, 3D card tilt, page transitions, film grain, reduced-motion support

## 🧰 Tech Stack

React 18 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP ScrollTrigger · Three.js · React Three Fiber · React Router (hash routing) · Lucide icons

## 🚀 Run Locally

```bash
npm install
npm run dev        # start dev server
npm run build      # production build (output: dist/)
npm run typecheck  # TypeScript check
```

## 📁 Folder Structure

```
src/
├── data/            # ALL editable content lives here
│   ├── config.ts    # business info, WhatsApp number, nav, footer, size chart
│   ├── products.ts  # products, categories, collections
│   ├── content.ts   # reviews, reels, journal posts, lookbook, homepage copy
│   └── images.ts    # central image registry (swap placeholders here)
├── lib/utils.ts     # currency, WhatsApp message builders, helpers
├── context/StoreContext.tsx   # cart, wishlist, UI state (localStorage)
├── three/LotusHero.tsx        # 3D lotus scene
├── components/      # navbar, footer, overlays, product card, chrome
├── pages/           # one file per route group
└── App.tsx          # router + providers + layout
```

## 🔧 Common Edits (no code knowledge needed)

| What | Where |
|---|---|
| **Change WhatsApp number** | `src/data/config.ts` → `BRAND.whatsappNumber` (digits only, with country code, e.g. `9198XXXXXXXX`) |
| **Change Instagram** | `src/data/config.ts` → `BRAND.instagramHandle` / `instagramUrl` |
| **Add a product** | `src/data/products.ts` → copy any object in `PRODUCTS`, change fields (id, code, name, price, sizes, colors, images…) |
| **Replace images** | Put real photos in `/public/images/`, then update `src/data/images.ts` to `/images/your-photo.jpg` — everything updates |
| **Replace videos** | Add an MP4 URL to a product's `video` field or a reel's `video` field in `src/data/content.ts` |
| **Logo** | The lotus mark is inline SVG in `src/components/ui.tsx` (`LotusMark`) — replace that SVG path |
| **Store details / hours / phone** | `src/data/config.ts` |
| **Free-shipping threshold** | `src/data/config.ts` → `BRAND.freeShippingAbove` |

## 🌐 Deploy to Netlify

1. Push this project to GitHub.
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import an existing project** → choose your repo.
3. Build settings auto-detect: **Build command** `npm run build`, **Publish directory** `dist`.
4. Click **Deploy site**. Done — hash-based routing means refreshes work with no redirect rules needed.

> Manual option: run `npm run build` locally, then drag the `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop).

## 🗄️ Future Supabase Integration

The architecture is backend-ready: every piece of content is already isolated in `src/data/*` with TypeScript types that mirror database tables.

1. Create a Supabase project and tables: `products`, `categories`, `collections`, `reviews`, `journal_posts`, `reels`, `settings` (columns match the fields in `src/data/products.ts` and `content.ts`).
2. `@supabase/supabase-js` is already a dependency. Create `src/lib/supabase.ts` with your URL + anon key.
3. Replace static imports with fetches, e.g. `const { data } = await supabase.from('products').select('*')` inside a small data-hook, and feed the same `Product` type into existing components — **no UI changes required**.
4. Add an admin dashboard (or use Supabase Studio) to manage products, banners, reviews and store settings — the site reads whatever the tables hold.
5. For payments later, add Razorpay/Stripe at the checkout step in `src/components/Overlays.tsx` (`CartDrawer`) — the WhatsApp flow can remain as a fallback.

## 📱 Notes

- Product photos are premium AI placeholders — replace via `src/data/images.ts`.
- WhatsApp number `919876543210` is a placeholder — update it before launch.

Made with care for Lotus 🌸
