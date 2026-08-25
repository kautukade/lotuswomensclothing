import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, SearchX, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { BRAND, SIZE_GUIDE } from "../data/config";
import { PRODUCTS, getProduct } from "../data/products";
import { checkoutMessage, cx, deliveryWindow, inr, orderMessage, pctOff, waLink } from "../lib/utils";
import { LotusMark, SmartImg, Stars } from "./ui";
import { WhatsAppGlyph } from "./Chrome";

/* ================= SEARCH OVERLAY ================= */
export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return PRODUCTS.filter((p) => [p.name, p.category, p.code, p.collection, ...p.tags].join(" ").toLowerCase().includes(s)).slice(0, 8);
  }, [q]);

  const go = (id: string) => {
    setSearchOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[105] overflow-y-auto bg-ivory-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="mx-auto max-w-5xl px-6 py-8">
            <div className="flex items-center justify-between">
              <p className="kicker">Search Lotus</p>
              <button type="button" onClick={() => setSearchOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-ivory-soft" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4 border-b-2 border-ink/15 pb-4 focus-within:border-gold">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search kurtis, codes, collections…"
                className="w-full bg-transparent font-display text-[clamp(1.6rem,4vw,2.8rem)] font-medium text-ink placeholder:text-ink/25 outline-none"
                aria-label="Search products"
              />
              <span className="hidden font-body text-[11px] uppercase tracking-[0.24em] text-ink-soft sm:block">
                {q ? `${results.length} found` : "Type to search"}
              </span>
            </div>

            {!q.trim() && (
              <div className="mt-10">
                <p className="font-body text-[11px] uppercase tracking-[0.28em] text-ink-soft">Popular right now</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {["Kurta Sets", "Plus Size", "Festive", "LOTUS-121", "Dresses", "Anarkali", "Co-ord"].map((t) => (
                    <button key={t} type="button" onClick={() => setQ(t)} className="rounded-full border border-line px-5 py-2.5 font-body text-[13px] text-ink transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q.trim() && results.length > 0 && (
              <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {results.map((p) => (
                  <button key={p.id} type="button" onClick={() => go(p.id)} className="group text-left">
                    <SmartImg src={p.images[0]} alt={p.name} className="aspect-[3/4] w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                    <p className="mt-3 font-body text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">{p.code}</p>
                    <p className="font-display text-[19px] font-semibold leading-tight text-ink group-hover:text-plum">{p.name}</p>
                    <p className="text-[14px] text-gold">{inr(p.price)}</p>
                  </button>
                ))}
              </div>
            )}

            {q.trim() && results.length === 0 && (
              <div className="mt-16 flex flex-col items-center text-center">
                <SearchX className="h-10 w-10 text-ink-soft/50" />
                <p className="mt-4 font-display text-2xl font-medium text-ink">No blooms found for "{q}"</p>
                <p className="mt-2 max-w-sm text-[14px] text-ink-soft">Try a product code like LOTUS-104, or browse a category instead.</p>
                <button type="button" onClick={() => { setSearchOpen(false); navigate("/shop"); }} className="btn-outline mt-6">
                  Browse all products
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================= CART DRAWER ================= */
export function CartDrawer() {
  const { cartOpen, setCartOpen, cartLines, updateQty, removeFromCart, subtotal, cartCount } = useStore();
  const progress = Math.min(100, (subtotal / BRAND.freeShippingAbove) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[96] bg-wine-deep/45 backdrop-blur-[2px]"
            onClick={() => setCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[97] flex w-full max-w-[430px] flex-col bg-paper shadow-[-30px_0_80px_rgba(43,29,34,0.25)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-[26px] font-semibold text-ink">
                Your Bag <span className="font-body text-[13px] font-medium text-ink-soft">({cartCount})</span>
              </h2>
              <button type="button" onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-ivory-soft" aria-label="Close">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {cartLines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <LotusMark className="h-16 w-16 text-blush" />
                <p className="mt-5 font-display text-2xl font-medium text-ink">Your bag is still a bud</p>
                <p className="mt-2 text-[14px] text-ink-soft">Nothing here yet — let's find something that blooms on you.</p>
                <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-primary mt-7">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="space-y-6">
                    {cartLines.map((l) => (
                      <li key={`${l.product.id}-${l.size}-${l.color}`} className="flex gap-4">
                        <Link to={`/product/${l.product.id}`} onClick={() => setCartOpen(false)} className="shrink-0">
                          <SmartImg src={l.product.images[0]} alt={l.product.name} className="h-28 w-[86px]" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-display text-[17px] font-semibold leading-tight text-ink">{l.product.name}</p>
                            <button type="button" onClick={() => removeFromCart(l.product.id, l.size, l.color)} className="text-ink-soft transition-colors hover:text-plum" aria-label={`Remove ${l.product.name}`}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-[12px] text-ink-soft">Size {l.size} · {l.color}</p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center border border-line">
                              <button type="button" onClick={() => updateQty(l.product.id, l.size, l.color, l.qty - 1)} className="grid h-8 w-8 place-items-center transition-colors hover:bg-ivory" aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
                              <span className="w-8 text-center text-[13px] font-medium">{l.qty}</span>
                              <button type="button" onClick={() => updateQty(l.product.id, l.size, l.color, l.qty + 1)} className="grid h-8 w-8 place-items-center transition-colors hover:bg-ivory" aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
                            </div>
                            <p className="font-display text-[17px] font-semibold text-plum">{inr(l.product.price * l.qty)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line bg-ivory-soft px-6 py-5">
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11.5px] font-medium uppercase tracking-[0.16em] text-ink-soft">
                      <span>{subtotal >= BRAND.freeShippingAbove ? "You've unlocked free shipping 🌸" : `Add ${inr(BRAND.freeShippingAbove - subtotal)} for free shipping`}</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden bg-line/60">
                      <motion.div className="h-full bg-gold" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[12px] uppercase tracking-[0.2em] text-ink-soft">Subtotal</span>
                    <span className="font-display text-[26px] font-semibold text-ink">{inr(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-soft">Estimated delivery: {deliveryWindow()} · COD &amp; UPI available</p>
                  <a href={waLink(checkoutMessage(cartLines))} target="_blank" rel="noreferrer" className="btn-wa mt-4 w-full">
                    <WhatsAppGlyph className="h-4 w-4" /> Checkout on WhatsApp
                  </a>
                  <button type="button" onClick={() => setCartOpen(false)} className="link-underline mx-auto mt-4 block font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ================= QUICK VIEW ================= */
export function QuickView() {
  const { quickViewId, setQuickViewId, addToCart } = useStore();
  const product = quickViewId ? getProduct(quickViewId) : undefined;
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSize(product.sizes[Math.min(2, product.sizes.length - 1)]);
      setColor(product.colors[0].name);
      setQty(1);
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.button
            type="button"
            aria-label="Close quick view"
            className="fixed inset-0 z-[98] bg-wine-deep/50 backdrop-blur-[2px]"
            onClick={() => setQuickViewId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[99] mx-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-paper md:inset-x-auto md:inset-y-0 md:my-auto md:max-h-[85vh]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.name}`}
          >
            <div className="grid md:grid-cols-2">
              <SmartImg src={product.images[0]} alt={product.name} className="aspect-[4/5] md:aspect-auto md:h-full" eager />
              <div className="relative p-7 md:p-9">
                <button type="button" onClick={() => setQuickViewId(null)} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-ivory-soft" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
                <p className="kicker">{product.code} · {product.category}</p>
                <h3 className="mt-2 pr-10 font-display text-[30px] font-semibold leading-tight text-ink">{product.name}</h3>
                <div className="mt-2 flex items-center gap-3">
                  <Stars rating={product.rating} />
                  <span className="text-[12px] text-ink-soft">{product.reviews} reviews</span>
                </div>
                <p className="mt-3 flex items-baseline gap-3">
                  <span className="font-display text-[28px] font-semibold text-plum">{inr(product.price)}</span>
                  <span className="text-[15px] text-ink-soft line-through">{inr(product.originalPrice)}</span>
                  <span className="bg-gold/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">-{pctOff(product)}%</span>
                </p>

                <p className="mt-5 font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">Colour — <span className="text-ink">{color}</span></p>
                <div className="mt-2 flex gap-2.5">
                  {product.colors.map((c) => (
                    <button key={c.name} type="button" onClick={() => setColor(c.name)} aria-label={`Colour ${c.name}`} className={cx("h-8 w-8 rounded-full border-2 transition-all", color === c.name ? "scale-110 border-plum" : "border-line hover:border-ink/40")} style={{ backgroundColor: c.hex }} />
                  ))}
                </div>

                <p className="mt-4 font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">Size</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} type="button" onClick={() => setSize(s)} className={cx("min-w-11 border px-3 py-2 text-[12px] font-medium tracking-wide transition-all", size === s ? "border-plum bg-plum text-ivory-soft" : "border-line hover:border-ink")}>
                      {s}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center border border-line">
                    <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} className="grid h-11 w-10 place-items-center hover:bg-ivory" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                    <span className="w-9 text-center text-[14px] font-medium">{qty}</span>
                    <button type="button" onClick={() => setQty((n) => Math.min(10, n + 1))} className="grid h-11 w-10 place-items-center hover:bg-ivory" aria-label="Increase"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button type="button" onClick={() => { addToCart(product.id, size, color, qty); setQuickViewId(null); }} className="btn-dark flex-1 py-[13px]">
                    <ShoppingBag className="h-4 w-4" /> Add to Bag
                  </button>
                </div>
                <a href={waLink(orderMessage(product, { size, color, qty }))} target="_blank" rel="noreferrer" className="btn-wa mt-3 w-full py-[13px]">
                  <WhatsAppGlyph className="h-4 w-4" /> Order on WhatsApp
                </a>
                <Link to={`/product/${product.id}`} onClick={() => setQuickViewId(null)} className="link-underline mx-auto mt-4 block w-fit font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                  View full details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ================= SIZE GUIDE MODAL ================= */
export function SizeGuideModal() {
  const { sizeGuideOpen, setSizeGuideOpen } = useStore();
  return (
    <AnimatePresence>
      {sizeGuideOpen && (
        <>
          <motion.button type="button" aria-label="Close size guide" className="fixed inset-0 z-[98] bg-wine-deep/50 backdrop-blur-[2px]" onClick={() => setSizeGuideOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div
            className="fixed inset-x-3 bottom-3 top-auto z-[99] mx-auto max-h-[80vh] w-auto max-w-2xl overflow-y-auto bg-paper p-7 md:inset-x-auto md:inset-y-0 md:my-auto md:p-10"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 70, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kicker">Find your fit</p>
                <h3 className="mt-1.5 font-display text-[30px] font-semibold text-ink">Size Guide</h3>
              </div>
              <button type="button" onClick={() => setSizeGuideOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line hover:bg-ink hover:text-ivory-soft" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[13.5px] text-ink-soft">All measurements in inches, garment laid flat. Between sizes? Go one up — our styles drape better with ease.</p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-ink/15 font-body text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">
                    <th className="py-3 pr-4">Size</th><th className="py-3 pr-4">Bust</th><th className="py-3 pr-4">Waist</th><th className="py-3">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((r) => (
                    <tr key={r.size} className="border-b border-line text-[14px] transition-colors hover:bg-ivory">
                      <td className="py-2.5 pr-4 font-display text-[16px] font-semibold text-plum">{r.size}</td>
                      <td className="py-2.5 pr-4">{r.bust}"</td>
                      <td className="py-2.5 pr-4">{r.waist}"</td>
                      <td className="py-2.5">{r.hip}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[13px] text-ink-soft">Not sure? WhatsApp us your measurements and we'll confirm your size before you order — it takes two minutes.</p>
            <a href={waLink("Hello Lotus 🌸 I need help choosing my size. My measurements are: Bust __, Waist __, Hip __.")} target="_blank" rel="noreferrer" className="btn-wa mt-5 w-full py-3.5">
              <WhatsAppGlyph className="h-4 w-4" /> Ask for size help
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
