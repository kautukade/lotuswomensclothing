import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { SIZES_ALL } from "../data/config";
import { COLLECTIONS, PRODUCTS, type Product } from "../data/products";
import { cx, usePageTitle, waLink } from "../lib/utils";
import { PageHero, Reveal } from "../components/ui";
import { ProductCard } from "../components/ProductBits";
import { WhatsAppGlyph } from "../components/Chrome";

type Preset = "new" | "plus" | null;

const MAX_PRICE = 5000;

interface Filters {
  cat: string;
  collection: string;
  sizes: string[];
  colors: string[];
  maxPrice: number;
  inStock: boolean;
}

const ALL_COLORS = Array.from(
  PRODUCTS.reduce((m, p) => {
    p.colors.forEach((c) => m.set(c.name, c.hex));
    return m;
  }, new Map<string, string>())
);

function baseFilter(preset: Preset) {
  return (p: Product) => {
    if (preset === "new") return !!p.newArrival;
    if (preset === "plus") return !!p.plusSize;
    return true;
  };
}

function sortProducts(list: Product[], sort: string) {
  const arr = [...list];
  switch (sort) {
    case "price-asc": return arr.sort((a, b) => a.price - b.price);
    case "price-desc": return arr.sort((a, b) => b.price - a.price);
    case "popular": return arr.sort((a, b) => b.reviews - a.reviews);
    case "newest": return arr.sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival) || b.code.localeCompare(a.code));
    default: return arr.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.rating - a.rating);
  }
}

export default function Shop({ preset = null }: { preset?: Preset }) {
  usePageTitle(
    preset === "new"
      ? "New Arrivals | Lotus Women's Clothing"
      : preset === "plus"
        ? "Plus Size Fashion Up To 6XL | Lotus Women's Clothing"
        : "Shop Women's Clothing | Lotus Women's Clothing"
  );

  const [params, setParams] = useSearchParams();
  const { pushToast } = useStore();
  const [sort, setSort] = useState("featured");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(() => ({
    cat: params.get("cat") ?? "",
    collection: params.get("collection") ?? "",
    sizes: [],
    colors: [],
    maxPrice: MAX_PRICE,
    inStock: false,
  }));

  useEffect(() => {
    setFilters((f) => ({ ...f, cat: params.get("cat") ?? "", collection: params.get("collection") ?? "" }));
  }, [params]);

  const results = useMemo(() => {
    const list = PRODUCTS.filter(baseFilter(preset)).filter((p) => {
      if (filters.cat && p.category !== filters.cat) return false;
      if (filters.collection && p.collection !== filters.collection) return false;
      if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
      if (filters.colors.length && !filters.colors.some((c) => p.colors.some((pc) => pc.name === c))) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.inStock && p.stock <= 0) return false;
      return true;
    });
    return sortProducts(list, sort);
  }, [preset, filters, sort]);

  const activeCount =
    (filters.cat ? 1 : 0) + (filters.collection ? 1 : 0) + filters.sizes.length + filters.colors.length +
    (filters.maxPrice < MAX_PRICE ? 1 : 0) + (filters.inStock ? 1 : 0);

  const clearAll = () => {
    setFilters({ cat: "", collection: "", sizes: [], colors: [], maxPrice: MAX_PRICE, inStock: false });
    setParams({}, { replace: true });
    pushToast("Filters cleared");
  };

  const heroCopy: Record<string, { kicker: string; title: string; sub: string }> = {
    new: { kicker: "Fresh off the rack", title: "New Arrivals", sub: "New styles land every week. The good sizes go first — bloom before they're gone." },
    plus: { kicker: "Fashion without limits", title: "The Plus Size Edit", sub: "Every piece graded proportionally from XL to 6XL — armholes, darts and lengths that actually fit." },
    shop: { kicker: "The full collection", title: "Shop All", sub: "Kurtis, kurta sets, dresses, co-ords and festive wear — curated in Pusad, delivered PAN India." },
  };
  const hero = heroCopy[preset ?? "shop"];

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <p className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.26em] text-ink-soft">Category</p>
        <div className="space-y-1.5">
          {["", "Kurta Sets", "Kurtis", "Dresses", "Tops", "Co-ord Sets", "Ethnic Wear", "Festive", "Western Wear"].map((c) => (
            <button key={c || "all"} type="button" onClick={() => setFilters((f) => ({ ...f, cat: c }))} className={cx("block w-full text-left font-body text-[14px] transition-colors", filters.cat === c ? "font-semibold text-plum" : "text-ink-soft hover:text-ink")}>
              {c === "" ? "All categories" : c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.26em] text-ink-soft">Collection</p>
        <div className="space-y-1.5">
          <button type="button" onClick={() => setFilters((f) => ({ ...f, collection: "" }))} className={cx("block w-full text-left font-body text-[14px] transition-colors", filters.collection === "" ? "font-semibold text-plum" : "text-ink-soft hover:text-ink")}>
            All collections
          </button>
          {COLLECTIONS.map((c) => (
            <button key={c.id} type="button" onClick={() => setFilters((f) => ({ ...f, collection: c.filter }))} className={cx("block w-full text-left font-body text-[14px] transition-colors", filters.collection === c.filter ? "font-semibold text-plum" : "text-ink-soft hover:text-ink")}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.26em] text-ink-soft">Size</p>
        <div className="flex flex-wrap gap-1.5">
          {SIZES_ALL.map((s) => {
            const on = filters.sizes.includes(s);
            return (
              <button key={s} type="button" onClick={() => setFilters((f) => ({ ...f, sizes: on ? f.sizes.filter((x) => x !== s) : [...f.sizes, s] }))} className={cx("min-w-10 border px-2.5 py-2 text-[12px] font-medium transition-all", on ? "border-plum bg-plum text-ivory-soft" : "border-line text-ink hover:border-ink")}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.26em] text-ink-soft">Colour</p>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map(([name, hex]) => {
            const on = filters.colors.includes(name);
            return (
              <button key={name} type="button" title={name} onClick={() => setFilters((f) => ({ ...f, colors: on ? f.colors.filter((x) => x !== name) : [...f.colors, name] }))} className={cx("h-8 w-8 rounded-full border-2 transition-all", on ? "scale-110 border-plum" : "border-line hover:border-ink/40")} style={{ backgroundColor: hex }} aria-label={`Filter colour ${name}`} />
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.26em] text-ink-soft">Max price — ₹{filters.maxPrice.toLocaleString("en-IN")}</p>
        <input
          type="range"
          min={500}
          max={MAX_PRICE}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
          className="w-full accent-plum"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-[11px] text-ink-soft"><span>₹500</span><span>₹{MAX_PRICE.toLocaleString("en-IN")}+</span></div>
      </div>

      <label className="flex cursor-pointer items-center gap-3">
        <input type="checkbox" checked={filters.inStock} onChange={(e) => setFilters((f) => ({ ...f, inStock: e.target.checked }))} className="h-4 w-4 accent-plum" />
        <span className="font-body text-[14px] text-ink">In stock only</span>
      </label>

      <button type="button" onClick={clearAll} className="link-underline font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        Clear all filters {activeCount > 0 && `(${activeCount})`}
      </button>
    </div>
  );

  return (
    <>
      <PageHero kicker={hero.kicker} title={hero.title} sub={hero.sub} />

      <section className="mx-auto max-w-[1520px] px-6 py-14 md:px-8 md:py-20">
        {preset === "plus" && (
          <Reveal>
            <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border border-gold/40 bg-gold/10 px-6 py-5">
              <p className="font-display text-[19px] font-semibold text-ink">
                Every style below is graded <span className="text-plum">XL – 6XL</span> — proportionally cut, never just stretched.
              </p>
              <a href={waLink("Hello Lotus 🌸 I need help with plus-size sizing.")} target="_blank" rel="noreferrer" className="btn-wa py-3">
                <WhatsAppGlyph className="h-4 w-4" /> Size help
              </a>
            </div>
          </Reveal>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-body text-[13px] uppercase tracking-[0.2em] text-ink-soft">
            <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? "style" : "styles"}
            {filters.cat && <span> · {filters.cat}</span>}
            {filters.collection && <span> · {filters.collection}</span>}
          </p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setSheetOpen(true)} className="btn-outline gap-2 px-5 py-3 lg:hidden">
              <SlidersHorizontal className="h-4 w-4" /> Filters {activeCount > 0 && `(${activeCount})`}
            </button>
            <label className="relative">
              <span className="sr-only">Sort products</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none border border-line bg-paper py-3 pl-4 pr-10 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-ink outline-none transition-colors focus:border-gold">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            </label>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-32">{FilterPanel}</div>
          </aside>

          <div>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 xl:grid-cols-3">
                {results.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-24 text-center">
                <p className="font-display text-[30px] font-medium text-ink">Nothing blooms with those filters</p>
                <p className="mt-2 max-w-sm text-[14px] text-ink-soft">Try widening the price range or removing a size — or tell us what you're hunting for.</p>
                <div className="mt-7 flex gap-4">
                  <button type="button" onClick={clearAll} className="btn-primary">Clear filters</button>
                  <a href={waLink("Hello Lotus 🌸 I'm looking for something specific — can you help?")} target="_blank" rel="noreferrer" className="btn-outline">Ask on WhatsApp</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* mobile filter bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.button type="button" aria-label="Close filters" className="fixed inset-0 z-[96] bg-wine-deep/45" onClick={() => setSheetOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="fixed inset-x-0 bottom-0 z-[97] max-h-[85vh] overflow-y-auto bg-paper p-7 pb-24" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} role="dialog" aria-modal="true" aria-label="Filters">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-display text-[26px] font-semibold text-ink">Filters {activeCount > 0 && <span className="font-body text-[13px] text-ink-soft">({activeCount})</span>}</p>
                <button type="button" onClick={() => setSheetOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-line" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {FilterPanel}
              <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper p-5">
                <button type="button" onClick={() => setSheetOpen(false)} className="btn-primary w-full">Show {results.length} styles</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section className="border-t border-line bg-ivory-soft/60 py-16">
        <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-6 px-6 md:px-8">
          <div>
            <p className="kicker">Can't find it?</p>
            <p className="mt-2 max-w-xl font-display text-[26px] font-medium leading-snug text-ink">Tell us what you're dreaming of — we source requests every week.</p>
          </div>
          <div className="flex gap-4">
            <a href={waLink("Hello Lotus 🌸 I'm looking for a specific style — can you source it?")} target="_blank" rel="noreferrer" className="btn-wa"><WhatsAppGlyph className="h-4 w-4" /> WhatsApp us</a>
            <Link to="/contact" className="btn-outline">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
