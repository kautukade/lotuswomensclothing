import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Heart, Minus, Play, Plus, Ruler, ShoppingBag, Truck, Undo2 } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { PRODUCTS, getProduct } from "../data/products";
import { cx, deliveryWindow, inr, orderMessage, pctOff, usePageTitle, waLink } from "../lib/utils";
import { BRAND } from "../data/config";
import { Accordion, LotusMark, Reveal, SmartImg, Stars } from "../components/ui";
import { ProductCard } from "../components/ProductBits";
import { WhatsAppGlyph } from "../components/Chrome";

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { addToCart, setCartOpen, toggleWishlist, inWishlist, trackView, setSizeGuideOpen, recentlyViewed } = useStore();

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState<{ x: number; y: number; on: boolean }>({ x: 50, y: 50, on: false });
  const imgWrap = useRef<HTMLDivElement>(null);

  usePageTitle(product ? `${product.name} | Lotus Women's Clothing` : "Product not found | Lotus Women's Clothing");

  useEffect(() => {
    if (product) {
      trackView(product.id);
      setActiveImg(0);
      setSize(product.sizes[Math.min(2, product.sizes.length - 1)]);
      setColor(product.colors[0].name);
      setQty(1);
    }
  }, [product, trackView]);

  useEffect(() => {
    if (!product) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.images,
      sku: product.code,
      brand: { "@type": "Brand", name: "Lotus Women's Clothing" },
      offers: { "@type": "Offer", price: product.price, priceCurrency: "INR", availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [product]);

  const related = useMemo(
    () => (product ? PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)).slice(0, 4) : []),
    [product]
  );
  const recent = useMemo(
    () => (product ? recentlyViewed.filter((rid) => rid !== product.id).map((rid) => getProduct(rid)).filter(Boolean).slice(0, 4) : []),
    [recentlyViewed, product]
  );

  if (!product) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-40 text-center">
        <LotusMark className="h-16 w-16 text-blush" />
        <h1 className="mt-6 font-display text-[36px] font-medium text-ink">This bloom has wilted</h1>
        <p className="mt-2 max-w-sm text-[15px] text-ink-soft">The product you're looking for doesn't exist or has been removed. Let's find you something beautiful instead.</p>
        <Link to="/shop" className="btn-primary mt-8">Back to Shop</Link>
      </section>
    );
  }

  const wished = inWishlist(product.id);
  const off = pctOff(product);
  const waMsg = orderMessage(product, { size, color, qty });

  return (
    <>
      <section className="mx-auto max-w-[1520px] px-6 pb-10 pt-32 md:px-8 md:pt-40">
        <nav aria-label="Breadcrumb" className="font-body text-[11px] uppercase tracking-[0.2em] text-ink-soft">
          <Link to="/" className="hover:text-plum">Home</Link> <span className="mx-2 text-line">/</span>
          <Link to="/shop" className="hover:text-plum">Shop</Link> <span className="mx-2 text-line">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* gallery */}
          <div>
            <div
              ref={imgWrap}
              data-cursor="view"
              className="relative aspect-[3/4] cursor-crosshair overflow-hidden bg-ivory"
              onMouseMove={(e) => {
                const r = imgWrap.current?.getBoundingClientRect();
                if (!r) return;
                setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
              }}
              onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
            >
              <SmartImg
                key={activeImg}
                src={product.images[activeImg]}
                alt={`${product.name} — view ${activeImg + 1}`}
                className="h-full w-full"
                imgClassName="transition-transform duration-300 ease-out"
                eager
              />
              <img
                src={product.images[activeImg]}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-200"
                style={{ transform: `scale(${zoom.on ? 1.8 : 1})`, transformOrigin: `${zoom.x}% ${zoom.y}%`, opacity: zoom.on ? 1 : 0 }}
              />
              {off > 0 && <span className="absolute left-4 top-4 bg-gold px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-wine">Save {off}%</span>}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={cx("absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition-all", wished ? "border-plum bg-plum text-ivory-soft" : "border-line/70 bg-paper/80 text-ink hover:text-plum")}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cx("h-5 w-5", wished && "animate-pop fill-current")} />
              </button>
              <span className="absolute bottom-4 left-4 hidden bg-wine-deep/60 px-3 py-1.5 font-body text-[9.5px] uppercase tracking-[0.2em] text-ivory-soft backdrop-blur-sm md:block">
                Hover to zoom
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} type="button" onClick={() => setActiveImg(i)} className={cx("relative aspect-[3/4] w-20 overflow-hidden border-2 transition-all md:w-24", activeImg === i ? "border-plum" : "border-transparent opacity-70 hover:opacity-100")} aria-label={`Show image ${i + 1}`}>
                  <SmartImg src={img} alt="" className="h-full w-full" />
                </button>
              ))}
              <Link to="/watch-shop" className="grid aspect-[3/4] w-20 place-items-center border border-dashed border-line bg-ivory-soft text-center transition-colors hover:border-gold md:w-24" data-cursor="play">
                <span className="flex flex-col items-center gap-1.5 text-ink-soft">
                  <Play className="h-5 w-5 text-gold" />
                  <span className="px-1 font-body text-[8.5px] uppercase tracking-[0.14em]">Watch reel</span>
                </span>
              </Link>
            </div>
          </div>

          {/* info */}
          <div className="lg:pt-2">
            <p className="kicker">{product.code} · {product.collection}</p>
            <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] text-ink">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Stars rating={product.rating} />
              <span className="text-[13px] text-ink-soft">{product.rating} · {product.reviews} reviews</span>
              <span className={cx("flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[9.5px] font-semibold uppercase tracking-[0.14em]", product.stock > 10 ? "bg-[#1f6e43]/10 text-[#1f6e43]" : "bg-gold/15 text-gold")}>
                <BadgeCheck className="h-3 w-3" /> {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
              </span>
            </div>

            <p className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-[36px] font-semibold text-plum">{inr(product.price)}</span>
              <span className="text-[17px] text-ink-soft line-through">{inr(product.originalPrice)}</span>
              {off > 0 && <span className="bg-gold/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">-{off}% off</span>}
              <span className="w-full text-[11.5px] text-ink-soft">Inclusive of all taxes · COD &amp; UPI available</span>
            </p>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-7">
              <p className="font-body text-[11px] uppercase tracking-[0.24em] text-ink-soft">Colour — <span className="text-ink">{color}</span></p>
              <div className="mt-2.5 flex gap-3">
                {product.colors.map((c) => (
                  <button key={c.name} type="button" onClick={() => setColor(c.name)} aria-label={`Colour ${c.name}`} className={cx("h-9 w-9 rounded-full border-2 transition-all", color === c.name ? "scale-110 border-plum" : "border-line hover:border-ink/40")} style={{ backgroundColor: c.hex }} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="font-body text-[11px] uppercase tracking-[0.24em] text-ink-soft">Size — <span className="text-ink">{size}</span></p>
                <button type="button" onClick={() => setSizeGuideOpen(true)} className="flex items-center gap-1.5 font-body text-[11px] uppercase tracking-[0.18em] text-gold hover:text-plum">
                  <Ruler className="h-3.5 w-3.5" /> Size Guide
                </button>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} type="button" onClick={() => setSize(s)} className={cx("min-w-12 border px-3.5 py-2.5 text-[13px] font-medium tracking-wide transition-all", size === s ? "border-plum bg-plum text-ivory-soft" : "border-line hover:border-ink")}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-line">
                <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} className="grid h-13 w-11 place-items-center py-4 hover:bg-ivory" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center text-[15px] font-medium">{qty}</span>
                <button type="button" onClick={() => setQty((n) => Math.min(10, n + 1))} className="grid h-13 w-11 place-items-center py-4 hover:bg-ivory" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
              </div>
              <button type="button" onClick={() => addToCart(product.id, size, color, qty)} className="btn-dark flex-1 basis-52">
                <ShoppingBag className="h-4 w-4" /> Add to Bag
              </button>
              <button
                type="button"
                onClick={() => { addToCart(product.id, size, color, qty, true); setCartOpen(true); }}
                className="btn-primary flex-1 basis-52"
              >
                Buy Now
              </button>
            </div>

            <a href={waLink(waMsg)} target="_blank" rel="noreferrer" className="btn-wa mt-3 w-full">
              <WhatsAppGlyph className="h-4 w-4" /> Order on WhatsApp
            </a>

            <div className="mt-8 grid gap-3 border-y border-line py-6 text-[13.5px] text-ink-soft sm:grid-cols-3">
              <p className="flex items-center gap-2.5"><Truck className="h-4.5 w-4.5 shrink-0 text-gold" /> Free shipping over {inr(BRAND.freeShippingAbove)}</p>
              <p className="flex items-center gap-2.5"><Undo2 className="h-4.5 w-4.5 shrink-0 text-gold" /> 7-day easy returns</p>
              <p className="flex items-center gap-2.5"><BadgeCheck className="h-4.5 w-4.5 shrink-0 text-gold" /> Quality checked by hand</p>
            </div>

            <div className="mt-2">
              <Accordion title="Description" defaultOpen><p>{product.description}</p></Accordion>
              <Accordion title="Fabric & Fit">
                <p><strong className="text-ink">Fabric:</strong> {product.fabric}</p>
                <p className="mt-2"><strong className="text-ink">Fit:</strong> {product.fit}</p>
              </Accordion>
              <Accordion title="Wash Care"><p>{product.washCare}</p></Accordion>
              <Accordion title="Shipping">
                <p>We ship PAN India from Pusad, Maharashtra. Orders are dispatched within 24–48 hours and typically arrive in {deliveryWindow()}. Free shipping on orders above {inr(BRAND.freeShippingAbove)}; a flat ₹79 applies below that.</p>
              </Accordion>
              <Accordion title="Returns & Exchange">
                <p>Changed your mind? Unworn items with tags can be returned or exchanged within 7 days of delivery. WhatsApp us with your order details and we'll arrange a pickup — exchanges are always free.</p>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory-soft/60 py-20">
          <div className="mx-auto max-w-[1520px] px-6 md:px-8">
            <Reveal><h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium text-ink">You May Also Like</h2></Reveal>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-[1520px] px-6 md:px-8">
            <Reveal><h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium text-ink">Recently Viewed</h2></Reveal>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
              {(recent as NonNullable<(typeof recent)[number]>[]).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
