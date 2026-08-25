import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { PRODUCTS, getProduct } from "../data/products";
import { REELS } from "../data/content";
import { IMG } from "../data/images";
import { inr, usePageTitle, waLink } from "../lib/utils";
import { LongArrow, Reveal, SmartImg } from "../components/ui";
import { ReelCard } from "../components/ProductBits";
import { WhatsAppGlyph } from "../components/Chrome";

function ParallaxImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <SmartImg src={src} alt={alt} className="h-full w-full" eager />
      </motion.div>
    </div>
  );
}

interface Spread {
  title: string;
  chapter: string;
  quote: string;
  image: string;
  items: string[];
  reverse?: boolean;
}

const SPREADS: Spread[] = [
  { title: "The Courtyard", chapter: "Chapter 01", quote: "Sun-warmed stone, a wandering dupatta, and nothing to rush toward.", image: IMG.lookbook, items: ["p8", "p19", "p10"] },
  { title: "After Dark", chapter: "Chapter 02", quote: "Wine, gold and a flare that remembers every twirl.", image: IMG.festive, items: ["p3", "p16", "p10"], reverse: true },
  { title: "Every Body", chapter: "Chapter 03", quote: "Cut for curves, graded with care — elegance has no size limit.", image: IMG.plussize, items: ["p21", "p22", "p24"] },
  { title: "Soft Morning", chapter: "Chapter 04", quote: "Chai steam, rayon softness, and the day still unwritten.", image: IMG.heroModel, items: ["p1", "p2", "p4"], reverse: true },
];

function LookSpread({ s, index }: { s: Spread; index: number }) {
  const items = s.items.map((id) => getProduct(id)).filter((p): p is NonNullable<ReturnType<typeof getProduct>> => !!p);
  const total = items.reduce((sum, p) => sum + p.price, 0);
  const shopLook = () => {
    const msg = ["Hello Lotus Women's Clothing 🌸", "", `I'd like to shop "${s.title}" from the Lookbook:`, "", ...items.map((p, i) => `${i + 1}. ${p.name} (${p.code}) — ${inr(p.price)}`), "", `Total: ${inr(total)}`, "", "Please confirm availability."].join("\n");
    window.open(waLink(msg), "_blank", "noopener");
  };

  return (
    <article className="mx-auto grid max-w-[1520px] items-center gap-10 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
      <div className={s.reverse ? "lg:order-2" : ""}>
        <Reveal y={60}>
          <ParallaxImg src={s.image} alt={`${s.title} — Lotus lookbook`} className="aspect-[3/4] w-full" />
        </Reveal>
      </div>
      <div className={s.reverse ? "lg:order-1" : ""}>
        <Reveal>
          <p className="kicker">{s.chapter} · Look 0{index + 1}</p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.02] text-ink">{s.title}</h2>
          <p className="mt-4 max-w-md font-display text-[20px] italic leading-snug text-ink-soft">"{s.quote}"</p>
        </Reveal>
        <div className="mt-8 space-y-3">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={0.15 + i * 0.08}>
              <Link to={`/product/${p.id}`} className="group flex items-center gap-4 border border-line p-3.5 transition-all duration-300 hover:border-gold hover:bg-paper">
                <SmartImg src={p.images[0]} alt={p.name} className="h-20 w-16 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[18px] font-semibold text-ink group-hover:text-plum">{p.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">{p.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-[15px] font-semibold text-plum">{inr(p.price)}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 font-body text-[9.5px] uppercase tracking-[0.18em] text-gold">
                    View <LongArrow className="h-2.5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button type="button" onClick={shopLook} className="btn-primary">Shop This Look — {inr(total)}</button>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function Lookbook() {
  usePageTitle("Lookbook | Lotus Women's Clothing");
  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden pt-32">
        <ParallaxImg src={IMG.lookbook} alt="Lotus Lookbook cover" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/90 via-wine-deep/25 to-wine-deep/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1520px] px-6 pb-16 md:px-8 md:pb-24">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="kicker !text-champagne">
            The Lotus Lookbook · Vol. 01
          </motion.p>
          <h1 className="mt-4 font-display font-medium leading-[0.98] text-ivory-soft">
            <span className="block overflow-hidden text-[clamp(3rem,9vw,7rem)]">
              <motion.span className="block" initial={{ y: "112%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>Worn like</motion.span>
            </span>
            <span className="block overflow-hidden text-[clamp(3rem,9vw,7rem)] italic text-champagne">
              <motion.span className="block" initial={{ y: "112%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>a love letter.</motion.span>
            </span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.9 }} className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ivory-soft/80">
            Four chapters, twelve pieces, one philosophy — clothes that feel like they were written for you. Every look is shoppable in sizes up to 6XL.
          </motion.p>
        </div>
      </section>

      <div className="divide-y divide-line">
        {SPREADS.map((s, i) => (
          <LookSpread key={s.title} s={s} index={i} />
        ))}
      </div>

      <section className="border-t border-line bg-ivory-soft/60 py-20">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-6 px-6 md:px-8">
          <div>
            <p className="kicker">Next volume soon</p>
            <p className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-ink">Get first look on Instagram</p>
          </div>
          <div className="flex gap-4">
            <Link to="/shop" className="btn-primary">Shop All Pieces <LongArrow className="h-3 w-6" /></Link>
            <a href="https://www.instagram.com/the.lotus.clothing" target="_blank" rel="noreferrer" className="btn-outline">Follow Along</a>
          </div>
        </div>
      </section>
    </>
  );
}

export function WatchShop() {
  usePageTitle("Watch & Shop | Lotus Women's Clothing");
  return (
    <>
      <section className="relative overflow-hidden bg-wine px-6 pb-20 pt-40 text-ivory-soft md:pb-28 md:pt-52">
        <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(216,188,138,0.25),transparent_65%)]" />
        <div className="mx-auto max-w-7xl">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="kicker !text-champagne">Social commerce, the Lotus way</motion.p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6.5vw,4.8rem)] font-medium leading-[1.02]">
            <span className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>Watch. Love. Shop.</motion.span>
            </span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-6 max-w-xl text-[16px] leading-relaxed text-ivory-soft/75">
            Reels straight from <span className="text-champagne">@the.lotus.clothing</span> — see the fall, the flare and the fit in motion. Every video is shoppable: tap through to the product or order it straight on WhatsApp.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-[1520px] px-6 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {REELS.map((r, i) => (
            <ReelCard key={r.id} reel={r} index={i} />
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 border-t border-line pt-10 text-center">
          <p className="w-full font-display text-[22px] font-medium text-ink">Want a personal video of any piece before you order?</p>
          <a href={waLink("Hello Lotus 🌸 Could you send me a video of a product before I order?")} target="_blank" rel="noreferrer" className="btn-wa">
            <WhatsAppGlyph className="h-4 w-4" /> Request a video on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

export type { ReactNode };
