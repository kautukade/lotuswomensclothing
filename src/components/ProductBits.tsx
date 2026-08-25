import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Heart, Play, ShoppingBag } from "lucide-react";
import { useStore } from "../context/StoreContext";
import type { Product } from "../data/products";
import { getProduct } from "../data/products";
import type { Reel } from "../data/content";
import { cx, inr, orderMessage, pctOff, waLink } from "../lib/utils";
import { SmartImg, Stars, Tilt } from "./ui";
import { WhatsAppGlyph } from "./Chrome";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, inWishlist, setQuickViewId } = useStore();
  const wished = inWishlist(product.id);
  const off = pctOff(product);
  const quickAdd = () => addToCart(product.id, product.sizes[Math.min(2, product.sizes.length - 1)], product.colors[0].name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tilt className="group h-full">
        <div className="relative overflow-hidden">
          <Link to={`/product/${product.id}`} data-cursor="view" className="block" aria-label={product.name}>
            <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
              <SmartImg src={product.images[0]} alt={product.name} className="absolute inset-0 h-full w-full" imgClassName="transition-all duration-[900ms] ease-out group-hover:scale-[1.07] group-hover:opacity-0" eager={index < 4} />
              <SmartImg src={product.images[1] ?? product.images[0]} alt="" className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" imgClassName="scale-[1.07]" />
            </div>
          </Link>

          <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {product.newArrival && <span className="bg-plum px-2.5 py-1 font-body text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ivory-soft">New</span>}
            {product.bestseller && <span className="bg-wine px-2.5 py-1 font-body text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ivory-soft">Bestseller</span>}
            {off > 0 && <span className="bg-gold px-2.5 py-1 font-body text-[9.5px] font-semibold uppercase tracking-[0.18em] text-wine">-{off}%</span>}
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className={cx(
              "absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all duration-300",
              wished ? "border-plum bg-plum text-ivory-soft" : "border-line/70 bg-paper/80 text-ink hover:border-plum hover:text-plum"
            )}
          >
            <Heart className={cx("h-[17px] w-[17px] transition-transform", wished && "animate-pop fill-current")} />
          </button>

          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-stretch gap-px transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0">
            <button type="button" onClick={() => setQuickViewId(product.id)} className="flex flex-1 items-center justify-center gap-2 bg-paper/95 py-3.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur transition-colors hover:bg-ivory">
              <Eye className="h-4 w-4" /> Quick View
            </button>
            <button type="button" onClick={quickAdd} className="flex flex-1 items-center justify-center gap-2 bg-plum/95 py-3.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ivory-soft backdrop-blur transition-colors hover:bg-wine">
              <ShoppingBag className="h-4 w-4" /> Add
            </button>
            <a href={waLink(orderMessage(product))} target="_blank" rel="noreferrer" aria-label="Order on WhatsApp" className="flex items-center justify-center bg-[#1f6e43]/95 px-4 text-ivory-soft backdrop-blur transition-colors hover:bg-[#175533]">
              <WhatsAppGlyph className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between">
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">{product.category}</p>
            <Stars rating={product.rating} />
          </div>
          <h3 className="mt-1.5 font-display text-[20px] font-semibold leading-snug text-ink transition-colors group-hover:text-plum">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <div className="mt-1.5 flex items-center gap-2.5">
            <p className="font-body text-[15.5px] font-semibold text-plum">{inr(product.price)}</p>
            <p className="text-[13px] text-ink-soft line-through">{inr(product.originalPrice)}</p>
            <span className="ml-auto flex gap-1.5">
              {product.colors.slice(0, 3).map((c) => (
                <span key={c.name} title={c.name} className="h-3.5 w-3.5 rounded-full border border-line" style={{ backgroundColor: c.hex }} />
              ))}
            </span>
          </div>
          <p className="mt-1 text-[11px] tracking-[0.08em] text-ink-soft">Sizes {product.sizes[0]} – {product.sizes[product.sizes.length - 1]}</p>
        </div>
      </Tilt>
    </motion.article>
  );
}

/* ================= REEL ================= */
export function ReelCard({ reel, index = 0 }: { reel: Reel; index?: number }) {
  const product = getProduct(reel.productId);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const playing = inView && !paused;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!product) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <div data-cursor="play" onClick={() => setPaused((p) => !p)} className="relative aspect-[9/16] cursor-pointer overflow-hidden bg-wine">
        <SmartImg
          src={reel.image}
          alt={reel.title}
          className="absolute inset-0 h-full w-full"
          imgClassName={cx("transition-transform", playing && "animate-kenburns")}
          eager={index < 3}
        />
        {!playing && (
          <SmartImg src={reel.image} alt="" className="absolute inset-0 h-full w-full" imgClassName="" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/85 via-transparent to-wine-deep/40" />

        {/* progress bar */}
        <div className="absolute inset-x-3 top-3 h-[3px] overflow-hidden rounded-full bg-ivory-soft/25">
          <motion.div
            key={`${playing}`}
            className="h-full rounded-full bg-champagne"
            initial={{ width: "0%" }}
            animate={{ width: playing ? "100%" : "0%" }}
            transition={{ duration: 14, ease: "linear", repeat: playing ? Infinity : 0 }}
          />
        </div>

        <div className="absolute left-3 right-3 top-6 flex items-center justify-between text-ivory-soft">
          <span className="flex items-center gap-1.5 font-body text-[10.5px] font-medium tracking-[0.14em]">
            <Play className="h-3 w-3 fill-current" /> {reel.views} views
          </span>
          <span className="rounded-full border border-ivory-soft/30 px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.18em] backdrop-blur-sm">Reel</span>
        </div>

        {/* pause state */}
        <div className={cx("absolute inset-0 grid place-items-center transition-opacity duration-300", paused ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
          <span className="grid h-14 w-14 place-items-center rounded-full border border-ivory-soft/40 bg-wine-deep/40 text-ivory-soft backdrop-blur-sm">
            {paused ? <Play className="ml-1 h-6 w-6 fill-current" /> : <span className="font-body text-[10px] font-semibold tracking-[0.2em]">PAUSE</span>}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 text-ivory-soft" onClick={(e) => e.stopPropagation()}>
          <p className="font-display text-[18px] font-semibold leading-tight">{reel.title}</p>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-body text-[12px] text-ivory-soft/80">{product.name}</p>
              <p className="font-body text-[14px] font-semibold text-champagne">{inr(product.price)}</p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <Link to={`/product/${product.id}`} className="grid h-9 w-9 place-items-center rounded-full bg-ivory-soft text-wine transition-transform hover:scale-110" aria-label="View product">
                <Eye className="h-4 w-4" />
              </Link>
              <a href={waLink(orderMessage(product))} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-[#1f6e43] text-ivory-soft transition-transform hover:scale-110" aria-label="Order on WhatsApp">
                <WhatsAppGlyph className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
