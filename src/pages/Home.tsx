import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeCheck, ChevronLeft, ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import LotusHero from "../three/LotusHero";
import { useStore } from "../context/StoreContext";
import { BRAND, SIZES_ALL } from "../data/config";
import { CATEGORIES, COLLECTIONS, PRODUCTS, getProduct } from "../data/products";
import { INSTAGRAM_GRID, REVIEWS, REELS, SHOP_THE_LOOK, STORY_STATS, WHY_LOTUS } from "../data/content";
import { IMG } from "../data/images";
import { cx, inr, orderMessage, usePageTitle, waLink } from "../lib/utils";
import { LongArrow, LotusMark, Magnetic, Marquee, PetalShape, Reveal, SectionHead, SmartImg, Stars } from "../components/ui";
import { ProductCard, ReelCard } from "../components/ProductBits";
import { WhatsAppGlyph } from "../components/Chrome";

gsap.registerPlugin(ScrollTrigger);

/* ---------- tiny custom line icons for "why lotus" ---------- */
function WhyIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "truck":
      return <svg viewBox="0 0 32 32" className="h-8 w-8" {...common}><path d="M2 9h17v13H2zM19 13h6l4 4v5h-10" /><circle cx="8" cy="24" r="2.4" /><circle cx="23" cy="24" r="2.4" /><path d="M5 13h7" /></svg>;
    case "ruler":
      return <svg viewBox="0 0 32 32" className="h-8 w-8" {...common}><rect x="3" y="12" width="26" height="8" rx="1" transform="rotate(-20 16 16)" /><path d="M9 17.5l1.2 3M14 15.7l1.2 3M19 13.9l1.2 3M24 12.1l1.2 3" /></svg>;
    case "sparkle":
      return <svg viewBox="0 0 32 32" className="h-8 w-8" {...common}><path d="M16 4l2.6 7.4L26 14l-7.4 2.6L16 24l-2.6-7.4L6 14l7.4-2.6z" /><path d="M25 22l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" /></svg>;
    case "shield":
      return <svg viewBox="0 0 32 32" className="h-8 w-8" {...common}><path d="M16 4l10 3.5v8c0 6.5-4.2 10.8-10 12.5C10.2 26.3 6 22 6 15.5v-8z" /><path d="M11.5 15.5l3.2 3.2 6-6.4" /></svg>;
    case "chat":
      return <svg viewBox="0 0 32 32" className="h-8 w-8" {...common}><path d="M5 7h22v15H13l-6 5v-5H5z" /><path d="M10.5 12.5h11M10.5 16.5h7" /></svg>;
    default:
      return <svg viewBox="0 0 32 32" className="h-8 w-8" {...common}><path d="M16 26S5 19.5 5 12a6 6 0 0 1 11-3.2A6 6 0 0 1 27 12c0 7.5-11 14-11 14z" /></svg>;
  }
}

/* ================= HERO ================= */
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textO = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const bloomY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-hero-line]").forEach((el, i) => {
        gsap.from(el, {
          yPercent: 118,
          duration: 1.15,
          delay: 0.35 + i * 0.16,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 md:pt-36">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(235,201,210,0.5),transparent_65%)]" />
        <div className="absolute right-[-10%] top-[-10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(216,188,138,0.35),transparent_60%)]" />
        <svg className="absolute right-[4%] top-[16%] hidden h-[520px] w-[520px] animate-spin-slow text-gold/25 lg:block" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.35" strokeDasharray="1.5 3.5" />
        </svg>
        {[
          { cls: "left-[8%] top-[24%] h-7 w-5 text-rose/50", d: "0s" },
          { cls: "left-[42%] top-[14%] h-5 w-4 text-champagne/70", d: "1.6s" },
          { cls: "left-[6%] bottom-[20%] h-6 w-4 text-blush", d: "3s" },
        ].map((p, i) => (
          <span key={i} className={cx("animate-float-y absolute", p.cls)} style={{ animationDelay: p.d }}>
            <PetalShape className="h-full w-full" />
          </span>
        ))}
      </div>

      {/* 3D lotus */}
      <motion.div style={{ y: bloomY }} className="absolute inset-y-0 right-[-6%] w-[88%] sm:w-[70%] lg:w-[56%]" aria-hidden>
        <LotusHero className="h-full w-full" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: textO }} className="relative z-10 mx-auto w-full max-w-[1520px] px-6 md:px-8">
        <div className="max-w-[640px]">
          <p className="kicker flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-gold/70" />
            Lotus Women's Clothing · Pusad, Maharashtra
          </p>
          <h1 className="mt-6 font-display font-medium leading-[0.98] text-ink">
            <span className="block overflow-hidden pb-1 text-[clamp(3rem,8.5vw,6.2rem)]">
              <span data-hero-line className="block">Wear Your</span>
            </span>
            <span className="block overflow-hidden pb-1 text-[clamp(3rem,8.5vw,6.2rem)]">
              <span data-hero-line className="block">Confidence.</span>
            </span>
            <span className="block overflow-hidden pb-2 text-[clamp(2.4rem,6.5vw,4.6rem)] italic text-plum">
              <span data-hero-line className="block">Bloom in your style.</span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9 }}
            className="mt-6 max-w-[440px] text-[16px] leading-relaxed text-ink-soft"
          >
            Elegant women's fashion from Pusad, delivered across India. Thoughtfully curated styles available in sizes up to <strong className="font-semibold text-ink">6XL</strong>.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9 }} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic><Link to="/shop" className="btn-primary">Shop Collection <LongArrow className="h-3 w-6" /></Link></Magnetic>
            <Magnetic><Link to="/new-arrivals" className="btn-outline">New Arrivals</Link></Magnetic>
          </motion.div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            href={waLink("Hello Lotus Women's Clothing 🌸\n\nI would like to order:")}
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-3 font-body text-[12px] font-medium uppercase tracking-[0.24em] text-[#1f6e43]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1f6e43]/10 transition-transform duration-300 group-hover:scale-110">
              <WhatsAppGlyph className="h-4 w-4" />
            </span>
            Order on WhatsApp
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden
      >
        <span className="font-body text-[9.5px] uppercase tracking-[0.34em] text-ink-soft">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <motion.span className="absolute left-0 top-0 h-4 w-px bg-gold" animate={{ y: [-16, 48] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </motion.div>
    </section>
  );
}

/* ================= BRAND TICKER ================= */
function BrandTicker() {
  const words = ["Kurta Sets", "Kurtis", "Dresses", "Co-ords", "Ethnic Wear", "Festive", "Plus Size 6XL", "Western"];
  return (
    <div className="border-y border-line bg-ivory-soft/70 py-5">
      <Marquee>
        {words.map((w) => (
          <span key={w} className="mx-7 flex items-center gap-7">
            <span className="font-display text-[22px] font-medium italic text-ink/80 md:text-[26px]">{w}</span>
            <LotusMark className="h-4 w-4 text-gold/70" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ================= CATEGORIES ================= */
const CAT_SPANS = [
  "md:col-span-5 md:row-span-2",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-6",
  "md:col-span-6",
];

function categoryCount(name: string) {
  if (name === "Plus Size") return PRODUCTS.filter((p) => p.plusSize).length;
  if (name === "New Arrivals") return PRODUCTS.filter((p) => p.newArrival).length;
  return PRODUCTS.filter((p) => p.category === name).length;
}

function Categories() {
  return (
    <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-8 md:py-32">
      <SectionHead kicker="Curated for you" title="Shop By Category" link="View everything" linkTo="/shop" />

      {/* mobile swipe */}
      <div className="no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:hidden">
        {CATEGORIES.map((c) => (
          <Link key={c.name} to={c.to} data-cursor="view" className="group relative w-[72vw] shrink-0 snap-start overflow-hidden">
            <SmartImg src={c.image} alt={c.name} className="aspect-[3/4] w-full" imgClassName="transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/85 via-wine-deep/10 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 text-ivory-soft">
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-champagne">{categoryCount(c.name)} styles</p>
              <p className="mt-1 font-display text-[26px] font-semibold leading-tight">{c.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* desktop editorial grid */}
      <div className="mt-14 hidden grid-flow-dense grid-cols-12 gap-4 md:grid" style={{ gridAutoRows: "235px" }}>
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.08} className={CAT_SPANS[i]}>
            <Link to={c.to} data-cursor="view" className="group relative block h-full w-full overflow-hidden">
              <SmartImg src={c.image} alt={c.name} className="absolute inset-0 h-full w-full" imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.09]" />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/80 via-wine-deep/5 to-transparent transition-opacity duration-500 group-hover:from-wine-deep/90" />
              <div className="absolute inset-3 border border-champagne/0 transition-all duration-500 group-hover:border-champagne/50" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-ivory-soft">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.26em] text-champagne">{categoryCount(c.name)} styles</p>
                  <p className="mt-1.5 font-display text-[30px] font-semibold leading-none">{c.name}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory-soft/40 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-champagne group-hover:bg-champagne group-hover:text-wine">
                  <LongArrow className="h-3.5 w-6" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= NEW ARRIVALS ================= */
function NewArrivals() {
  const items = PRODUCTS.filter((p) => p.newArrival).slice(0, 8);
  return (
    <section className="bg-ivory-soft/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-8">
        <SectionHead kicker="This week at Lotus" title="Freshly Bloomed" link="All new arrivals" linkTo="/new-arrivals" />
        <p className="mt-5 max-w-lg text-[15px] text-ink-soft">Discover our latest arrivals — new styles land every week, and the good sizes go first.</p>
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PLUS SIZE ================= */
function PlusSizeSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { yPercent: 7 }, {
        yPercent: -7, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative overflow-hidden bg-wine py-24 text-ivory-soft md:py-36">
      <LotusMark className="pointer-events-none absolute -left-24 bottom-[-60px] h-[420px] w-[420px] text-champagne/[0.07]" />
      <div className="mx-auto grid max-w-[1520px] items-center gap-14 px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal y={16}><span className="kicker !text-champagne">The Lotus promise</span></Reveal>
          <h2 className="mt-4 font-display font-medium leading-[1.02] text-[clamp(2.4rem,5.5vw,4.2rem)]">
            <span className="block overflow-hidden pb-1"><motion.span className="block" initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>Fashion Without Limits.</motion.span></span>
            <span className="block overflow-hidden pb-1"><motion.span className="block italic text-champagne" initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>Beautiful styles. Sizes up to 6XL.</motion.span></span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ivory-soft/75">
              Every woman deserves fashion that feels beautiful, comfortable and confident. Our plus-size range isn't an afterthought — every piece is graded proportionally, from armholes to hem, so it fits the way it was designed to.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {SIZES_ALL.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.05, duration: 0.4 }}
                  className={cx("border px-4 py-2 font-body text-[12px] font-medium tracking-[0.14em]", ["5XL", "6XL"].includes(s) ? "border-champagne bg-champagne text-wine" : "border-ivory-soft/25 text-ivory-soft/80")}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic><Link to="/plus-size" className="btn-gold">Explore Plus Size Collection <LongArrow className="h-3 w-6" /></Link></Magnetic>
              <a href={waLink("Hello Lotus 🌸 I'd love to see more plus-size styles.")} target="_blank" rel="noreferrer" className="btn-base border border-ivory-soft/30 px-8 py-4 text-ivory-soft hover:border-champagne hover:text-champagne">
                Ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 border border-champagne/30 md:-inset-6" aria-hidden />
          <div className="relative overflow-hidden">
            <div ref={imgRef} className="will-change-transform">
              <SmartImg src={CATEGORIES[8].image} alt="Plus size fashion at Lotus" className="aspect-[4/5] w-full" eager />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 bg-paper/95 p-5 text-ink backdrop-blur"
            >
              <div>
                <p className="font-display text-[22px] font-semibold leading-tight">Graded, not stretched.</p>
                <p className="mt-1 text-[12.5px] text-ink-soft">Proportional fits from XL to 6XL</p>
              </div>
              <LotusMark className="h-10 w-10 shrink-0 text-plum" />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="mt-20 overflow-hidden border-y border-ivory-soft/10 py-4">
        <Marquee fast>
          {SIZES_ALL.concat(SIZES_ALL).map((s, i) => (
            <span key={i} className="mx-6 font-display text-[26px] font-medium italic text-ivory-soft/35">{s} <span className="not-italic text-champagne/50">✦</span></span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ================= SHOP THE LOOK ================= */
function ShopTheLook() {
  const [active, setActive] = useState<number | null>(null);
  const spot = SHOP_THE_LOOK;
  const items = spot.hotspots.map((h) => ({ ...h, product: getProduct(h.productId)! })).filter((h) => h.product);

  const shopAll = () => {
    const msg = [
      "Hello Lotus Women's Clothing 🌸", "",
      `I'd like to shop "${spot.title}":`, "",
      ...items.map((h, i) => `${i + 1}. ${h.product.name} (${h.product.code}) — ${inr(h.product.price)}`),
      "", "Please confirm availability.",
    ].join("\n");
    window.open(waLink(msg), "_blank", "noopener");
  };

  return (
    <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <SectionHead kicker="Wear the story" title="Shop The Look" />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Tap the golden pins on "{spot.title}" to see exactly what she's wearing — every piece is available to order, in your size.
            </p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {items.map((h, i) => (
              <Reveal key={h.product.id} delay={0.2 + i * 0.08}>
                <button
                  type="button"
                  onClick={() => setActive(active === i ? null : i)}
                  className={cx("flex w-full items-center justify-between gap-4 border px-5 py-4 text-left transition-all duration-300", active === i ? "border-gold bg-gold/10" : "border-line hover:border-ink/40")}
                >
                  <span>
                    <span className="block font-display text-[19px] font-semibold text-ink">{h.product.name}</span>
                    <span className="text-[12px] uppercase tracking-[0.18em] text-ink-soft">{h.label}</span>
                  </span>
                  <span className="font-body text-[15px] font-semibold text-plum">{inr(h.product.price)}</span>
                </button>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.45}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Magnetic><button type="button" onClick={shopAll} className="btn-primary">Shop This Look <LongArrow className="h-3 w-6" /></button></Magnetic>
              <Link to="/lookbook" className="btn-outline">View Lookbook</Link>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal y={50}>
            <div className="relative mx-auto max-w-[520px] overflow-hidden">
              <SmartImg src={spot.image} alt={spot.title} className="aspect-[3/4] w-full" eager />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-deep/30 to-transparent" />
              {spot.hotspots.map((h, i) => (
                <div key={i} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  <button type="button" onClick={() => setActive(active === i ? null : i)} className="relative block -translate-x-1/2 -translate-y-1/2" aria-label={h.label}>
                    <span className="animate-pulse-ring absolute inset-0 rounded-full bg-champagne/70" />
                    <span className={cx("relative grid h-7 w-7 place-items-center rounded-full border-2 border-paper font-body text-[10px] font-bold text-wine transition-all duration-300", active === i ? "scale-125 bg-gold" : "bg-champagne")}>
                      {i + 1}
                    </span>
                  </button>
                  {active === i && items[i] && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="absolute left-1/2 top-5 z-10 w-52 -translate-x-1/2 bg-paper p-4 shadow-[0_18px_50px_rgba(43,29,34,0.25)]">
                      <p className="font-display text-[16px] font-semibold leading-tight text-ink">{items[i].product.name}</p>
                      <p className="mt-1 text-[13px] text-plum">{inr(items[i].product.price)}</p>
                      <Link to={`/product/${items[i].product.id}`} className="link-underline mt-2 inline-block font-body text-[10px] uppercase tracking-[0.2em] text-ink-soft">View product</Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= WATCH & SHOP PREVIEW ================= */
function WatchShopPreview() {
  return (
    <section className="bg-ivory-soft/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-8">
        <SectionHead kicker="Reels you can wear" title="Watch. Love. Shop." link="Watch & shop all" linkTo="/watch-shop" />
        <p className="mt-5 max-w-lg text-[15px] text-ink-soft">Straight from our Instagram — see the fall, the flare and the fit in motion, then shop it in one tap.</p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {REELS.slice(0, 4).map((r, i) => (
            <ReelCard key={r.id} reel={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= TRENDING (horizontal scroll) ================= */
function Trending() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => trackRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto flex max-w-[1520px] flex-wrap items-end justify-between gap-6 px-6 md:px-8">
        <SectionHead kicker="Mood boards" title="Trending Collections" />
        <div className="flex items-center gap-3">
          <span className="mr-2 hidden font-body text-[10.5px] uppercase tracking-[0.26em] text-ink-soft md:block">Drag / swipe</span>
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll collections left" className="grid h-12 w-12 place-items-center rounded-full border border-line text-ink transition-all hover:border-gold hover:bg-gold hover:text-wine">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll collections right" className="grid h-12 w-12 place-items-center rounded-full border border-line text-ink transition-all hover:border-gold hover:bg-gold hover:text-wine">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={trackRef} data-cursor="drag" className="no-scrollbar mt-12 flex snap-x gap-5 overflow-x-auto scroll-smooth px-6 md:px-[max(2rem,calc((100vw-1520px)/2+2rem))]">
        {COLLECTIONS.map((c, i) => {
          const count = PRODUCTS.filter((p) => p.collection === c.filter).length;
          return (
            <Reveal key={c.id} delay={i * 0.06} className="w-[300px] shrink-0 snap-start md:w-[380px]">
              <Link to={`/shop?collection=${encodeURIComponent(c.filter)}`} data-cursor="view" className="group relative block overflow-hidden">
                <SmartImg src={c.image} alt={c.name} className="aspect-[4/5] w-full" imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]" />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/85 via-transparent to-transparent" />
                <div className="absolute inset-4 flex flex-col justify-end border border-champagne/0 p-5 transition-all duration-500 group-hover:border-champagne/40">
                  <p className="font-body text-[10px] uppercase tracking-[0.26em] text-champagne">{count} pieces</p>
                  <p className="mt-2 font-display text-[30px] font-semibold leading-none text-ivory-soft">{c.name}</p>
                  <p className="mt-2 line-clamp-1 text-[13px] text-ivory-soft/70">{c.tagline}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-2 font-body text-[10.5px] font-semibold uppercase tracking-[0.22em] text-ivory-soft">
                    Explore <LongArrow className="h-3 w-6 transition-transform duration-500 group-hover:translate-x-2" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ================= REVIEWS ================= */
function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <div className="mx-3 w-[320px] shrink-0 border border-line bg-paper p-7 md:w-[380px]">
      <div className="flex items-center justify-between">
        <Stars rating={r.rating} />
        <span className="flex items-center gap-1.5 rounded-full bg-[#1f6e43]/10 px-2.5 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1f6e43]">
          <BadgeCheck className="h-3 w-3" /> Verified Buyer
        </span>
      </div>
      <p className="mt-4 font-display text-[18px] italic leading-snug text-ink">"{r.text}"</p>
      <div className="mt-6 flex items-center gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-plum font-display text-[18px] font-semibold text-ivory-soft">
          {r.name.charAt(0)}
        </span>
        <div>
          <p className="font-body text-[14px] font-semibold text-ink">{r.name}</p>
          <p className="text-[12px] text-ink-soft">{r.location} · {r.date}</p>
        </div>
      </div>
      <p className="mt-4 border-t border-line pt-3 font-body text-[11px] uppercase tracking-[0.16em] text-ink-soft">
        Purchased: <span className="text-plum">{r.product}</span>
      </p>
    </div>
  );
}

function Reviews() {
  const row1 = REVIEWS.slice(0, 5);
  const row2 = REVIEWS.slice(4);
  return (
    <section className="overflow-hidden bg-wine py-24 text-ivory-soft md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-8">
        <SectionHead dark kicker="4.8 average · 1000+ orders" title="Loved By Our Customers" link="Read all reviews" linkTo="/reviews" />
      </div>
      <div className="mt-14">
        <Marquee className="py-2">{row1.map((r) => <ReviewCard key={r.name} r={r} />)}</Marquee>
        <Marquee reverse className="py-2">{row2.map((r) => <ReviewCard key={r.name} r={r} />)}</Marquee>
      </div>
    </section>
  );
}

/* ================= STORY ================= */
function Story() {
  return (
    <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal y={50}>
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border border-gold/40" aria-hidden />
            <SmartImg src={IMG.boutique} alt="Inside the Lotus boutique" className="aspect-[4/5] w-full" />
          </div>
        </Reveal>
        <div>
          <SectionHead kicker="Our story" title="Rooted in Pusad, blooming across India" />
          <Reveal delay={0.15}>
            <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
              Lotus began with a simple belief — that beautiful clothing shouldn't stop at a size, a pincode, or a language barrier. From our home in Pusad, Maharashtra, we curate fashion that feels premium, fits genuinely, and arrives anywhere in India.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              Every style is quality-checked by hand before it ships, and every order is a conversation — WhatsApp us, and a real person answers with real photos, real size help, and real care.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
              {STORY_STATS.map((s) => (
                <div key={s.label} className="bg-ivory-soft p-5 text-center">
                  <p className="font-display text-[26px] font-semibold text-plum">{s.value}</p>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-[0.18em] text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <Link to="/about" className="group mt-9 inline-flex items-center gap-3 font-body text-[12px] font-medium uppercase tracking-[0.24em] text-ink">
              Read our full story <LongArrow className="h-3 w-7 text-gold transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= WHY LOTUS ================= */
function WhyLotus() {
  return (
    <section className="border-y border-line bg-ivory-soft/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-8">
        <SectionHead kicker="Why shop Lotus" title="The little things, done beautifully" center />
        <div className="mt-16 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {WHY_LOTUS.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.1}>
              <div className="group border-t border-line py-8 transition-colors duration-500 hover:border-gold">
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[34px] font-medium italic leading-none text-line transition-colors duration-500 group-hover:text-champagne">0{i + 1}</span>
                  <span className="text-plum transition-all duration-500 group-hover:-translate-y-1 group-hover:text-gold"><WhyIcon name={w.icon} /></span>
                </div>
                <h3 className="mt-4 font-display text-[24px] font-semibold text-ink">{w.title}</h3>
                <p className="mt-2 max-w-xs text-[14.5px] leading-relaxed text-ink-soft">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= INSTAGRAM ================= */
function InstagramSection() {
  return (
    <section className="mx-auto max-w-[1520px] px-6 py-24 md:px-8 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead kicker="Daily blooms" title="Follow Our Style Journey" />
        <Reveal delay={0.15}>
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
            {BRAND.instagramHandle}
          </a>
        </Reveal>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {INSTAGRAM_GRID.map((src, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="group relative block overflow-hidden" aria-label="Open Instagram">
              <SmartImg src={src} alt={`Lotus style post ${i + 1}`} className="aspect-square w-full" imgClassName="transition-transform duration-[1100ms] group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-wine/0 transition-all duration-500 group-hover:bg-wine/55">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-ivory-soft opacity-0 transition-all duration-500 group-hover:opacity-100"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= VISIT ================= */
function Visit() {
  return (
    <section className="border-t border-line bg-ivory-soft/60 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1520px] items-center gap-12 px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead kicker="Visit Lotus" title="Find us in the heart of Pusad" />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              We'd love to meet you in person. Drop by for a styling session, try before you buy, or simply say hello — chai is on us. Exact address shared on request.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {[
              { icon: <MapPin className="h-5 w-5" />, label: "Store", value: BRAND.location },
              { icon: <Clock className="h-5 w-5" />, label: "Hours", value: BRAND.hours },
              { icon: <Phone className="h-5 w-5" />, label: "Call", value: BRAND.phone },
              { icon: <Mail className="h-5 w-5" />, label: "Email", value: BRAND.email },
            ].map((row) => (
              <Reveal key={row.label} delay={0.2}>
                <div className="flex items-center gap-4 border-b border-line pb-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-gold">{row.icon}</span>
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.24em] text-ink-soft">{row.label}</p>
                    <p className="font-display text-[18px] font-semibold text-ink">{row.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="btn-dark">Get Directions <LongArrow className="h-3 w-6" /></a>
              <a href={BRAND.phoneHref} className="btn-outline">Call Us</a>
              <a href={waLink("Hello Lotus 🌸 I'd like to visit the store.")} target="_blank" rel="noreferrer" className="btn-wa"><WhatsAppGlyph className="h-4 w-4" /> WhatsApp</a>
            </div>
          </Reveal>
        </div>
        <Reveal y={50}>
          <div className="relative overflow-hidden border border-line bg-paper p-3">
            <svg viewBox="0 0 600 460" className="h-auto w-full" role="img" aria-label="Stylised map of Pusad with the Lotus store location">
              <rect width="600" height="460" fill="#f7f1e4" />
              <g stroke="#e3d6c2" strokeWidth="14" strokeLinecap="round">
                <path d="M-20 120 Q 180 90 620 150" /><path d="M-20 320 Q 240 280 620 340" /><path d="M140 -20 Q 180 200 120 480" /><path d="M420 -20 Q 380 240 460 480" />
              </g>
              <g stroke="#d8bc8a" strokeWidth="5" strokeLinecap="round" opacity="0.8">
                <path d="M-20 210 L 620 235" /><path d="M280 -20 L 300 480" /><path d="M40 420 L 560 60" />
              </g>
              <g fill="#e9dfc9">
                <rect x="40" y="40" width="70" height="46" rx="4" /><rect x="200" y="160" width="90" height="60" rx="4" /><rect x="330" y="70" width="60" height="80" rx="4" /><rect x="480" y="200" width="80" height="70" rx="4" /><rect x="180" y="350" width="110" height="56" rx="4" /><rect x="390" y="330" width="70" height="90" rx="4" />
              </g>
              <g>
                <circle cx="300" cy="225" r="70" fill="#c98a9b" opacity="0.14" />
                <circle cx="300" cy="225" r="34" fill="#c98a9b" opacity="0.22" />
                <circle cx="300" cy="225" r="9" fill="#7c3b4e" />
                <path d="M300 168c-20 0-34 15-34 33 0 24 34 56 34 56s34-32 34-56c0-18-14-33-34-33zm0 44a11 11 0 1 1 0-22 11 11 0 0 1 0 22z" fill="#7c3b4e" />
              </g>
              <text x="300" y="305" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="13" letterSpacing="3" fill="#77616a">PUSAD · MAHARASHTRA</text>
            </svg>
            <div className="pointer-events-none absolute inset-3 border border-gold/30" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function Home() {
  usePageTitle("Lotus Women's Clothing | Women's Fashion in Pusad | Sizes Up To 6XL");
  return (
    <>
      <Hero />
      <BrandTicker />
      <Categories />
      <NewArrivals />
      <PlusSizeSection />
      <ShopTheLook />
      <WatchShopPreview />
      <Trending />
      <Reviews />
      <Story />
      <WhyLotus />
      <InstagramSection />
      <Visit />
    </>
  );
}
