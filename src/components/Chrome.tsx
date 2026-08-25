import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Home, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { BRAND } from "../data/config";
import { cx, isFinePointer, isReducedMotion, waLink } from "../lib/utils";
import { LotusMark, PetalShape } from "./ui";

/* ================= LOADER ================= */
export function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[120] grid place-items-center bg-wine"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center">
        <div className="relative h-36 w-36 md:h-44 md:w-44">
          {[
            { cls: "text-plum", size: "inset-0", delay: 0.05, rot: -40 },
            { cls: "text-rose", size: "inset-3", delay: 0.28, rot: 30 },
            { cls: "text-champagne", size: "inset-6", delay: 0.5, rot: -15 },
          ].map((l, i) => (
            <motion.div
              key={i}
              className={cx("absolute", l.size, l.cls)}
              initial={{ scale: 0.15, opacity: 0, rotate: l.rot }}
              animate={{ scale: 1, opacity: i === 2 ? 1 : 0.5, rotate: 0 }}
              transition={{ delay: l.delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <LotusMark className="h-full w-full" />
            </motion.div>
          ))}
          <motion.div
            className="absolute -inset-8 rounded-full border border-champagne/25"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </div>
        <motion.h1
          className="mt-8 font-display text-4xl font-semibold tracking-[0.42em] text-ivory-soft md:text-5xl"
          initial={{ opacity: 0, letterSpacing: "0.7em", filter: "blur(6px)" }}
          animate={{ opacity: 1, letterSpacing: "0.42em", filter: "blur(0px)" }}
          transition={{ delay: 0.55, duration: 1.2, ease: "easeOut" }}
        >
          LOTUS
        </motion.h1>
        <motion.p
          className="mt-3 font-body text-[11px] uppercase tracking-[0.4em] text-champagne/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {BRAND.tagline}
        </motion.p>
        <div className="mt-8 h-px w-44 overflow-hidden bg-ivory-soft/15">
          <motion.div className="h-full bg-champagne" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ================= CUSTOM CURSOR ================= */
export function Cursor() {
  const enabled = useMemo(() => isFinePointer() && !isReducedMotion(), []);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("fine-cursor");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dotRef.current.style.opacity = "1";
      }
      if (ringRef.current) ringRef.current.style.opacity = "1";
      const t = e.target as HTMLElement | null;
      const holder = t?.closest?.("[data-cursor]");
      setLabel(holder?.getAttribute("data-cursor") ?? "");
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ringRef.current) ringRef.current.style.translate = `${rx}px ${ry}px`;
      raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      document.documentElement.classList.remove("fine-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  const big = label !== "";
  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[200] -ml-[4px] -mt-[4px] h-2 w-2 rounded-full bg-gold" style={{ opacity: 0 }} />
      <div
        ref={ringRef}
        className={cx(
          "pointer-events-none fixed left-0 top-0 z-[200] grid -ml-[21px] -mt-[21px] place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-300",
          big ? "h-[64px] w-[64px] border-transparent bg-gold font-body text-[10px] font-semibold tracking-[0.18em] text-wine" : "h-[42px] w-[42px] border-gold/70 bg-transparent text-transparent"
        )}
        style={{ opacity: 0 }}
      >
        {label || "•"}
      </div>
    </>
  );
}

/* ================= AMBIENT PETALS ================= */
const PETALS = [
  { left: "6%", delay: "0s", dur: "19s", cls: "text-rose/40 h-5 w-3.5" },
  { left: "16%", delay: "4.5s", dur: "23s", cls: "text-champagne/50 h-4 w-3" },
  { left: "38%", delay: "9s", dur: "21s", cls: "text-blush/60 h-6 w-4" },
  { left: "58%", delay: "2s", dur: "24s", cls: "text-rose/30 h-4 w-3" },
  { left: "74%", delay: "7s", dur: "18s", cls: "text-champagne/40 h-5 w-3.5" },
  { left: "88%", delay: "11s", dur: "22s", cls: "text-rose/40 h-4 w-3" },
];

export function AmbientPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] hidden overflow-hidden md:block" aria-hidden>
      {PETALS.map((p, i) => (
        <div key={i} className={cx("animate-petal-fall absolute -top-10", p.cls)} style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}>
          <PetalShape className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}

/* ================= WHATSAPP SVG ================= */
export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink("Hello Lotus Women's Clothing 🌸\n\nI would like to know more about your collection.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Lotus on WhatsApp"
      className="fixed bottom-6 right-6 z-[85] hidden h-14 w-14 place-items-center rounded-full bg-[#1f6e43] text-ivory-soft shadow-[0_10px_30px_rgba(23,85,51,0.45)] transition-transform duration-300 hover:scale-110 md:grid"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 16 }}
    >
      <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#1f6e43]/50" />
      <WhatsAppGlyph className="relative h-7 w-7" />
    </motion.a>
  );
}

/* ================= MOBILE BOTTOM NAV ================= */
export function BottomNav() {
  const { setCartOpen, setSearchOpen, cartCount, wishlist } = useStore();
  const { pathname } = useLocation();
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[9.5px] font-medium uppercase tracking-[0.14em] transition-colors";
  return (
    <nav className="fixed inset-x-0 bottom-0 z-[85] border-t border-line bg-ivory-soft/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden" aria-label="Primary mobile">
      <div className="flex items-stretch">
        <NavLink to="/" className={({ isActive }) => cx(item, isActive ? "text-plum" : "text-ink-soft")} end>
          <Home className="h-[19px] w-[19px]" />
          Home
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => cx(item, isActive || pathname.startsWith("/shop") ? "text-plum" : "text-ink-soft")}>
          <ShoppingBag className="h-[19px] w-[19px]" />
          Shop
        </NavLink>
        <button type="button" onClick={() => setSearchOpen(true)} className={cx(item, "text-ink-soft")} aria-label="Search">
          <Search className="h-[19px] w-[19px]" />
          Search
        </button>
        <NavLink to="/wishlist" className={({ isActive }) => cx(item, "relative", isActive ? "text-plum" : "text-ink-soft")}>
          <span className="relative">
            <Heart className="h-[19px] w-[19px]" />
            {wishlist.length > 0 && (
              <span key={wishlist.length} className="animate-pop absolute -right-2 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-plum text-[9px] font-semibold text-ivory-soft">
                {wishlist.length}
              </span>
            )}
          </span>
          Wishlist
        </NavLink>
        <button type="button" onClick={() => setCartOpen(true)} className={cx(item, "text-ink-soft")} aria-label="Open cart">
          <span className="relative">
            <ShoppingCart className="h-[19px] w-[19px]" />
            {cartCount > 0 && (
              <span key={cartCount} className="animate-pop absolute -right-2 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-semibold text-wine">
                {cartCount}
              </span>
            )}
          </span>
          Cart
        </button>
      </div>
    </nav>
  );
}

/* ================= TOASTS ================= */
export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-20 left-4 z-[110] flex flex-col gap-2 md:bottom-6 md:left-6">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -28, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="border-l-2 border-gold bg-paper px-5 py-3.5 shadow-[0_14px_40px_rgba(43,29,34,0.18)]"
          >
            <p className="font-display text-[17px] font-semibold text-ink">{t.title}</p>
            {t.sub && <p className="mt-0.5 font-body text-[12px] text-ink-soft">{t.sub}</p>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
