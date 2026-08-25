import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { ANNOUNCEMENTS, BRAND, NAV_LINKS } from "../data/config";
import { cx, waLink } from "../lib/utils";
import { LotusMark, Marquee } from "./ui";
import { WhatsAppGlyph } from "./Chrome";

function Logo({ dark }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Lotus Women's Clothing — home">
      <LotusMark className={cx("h-9 w-9 transition-transform duration-500 group-hover:rotate-12", dark ? "text-champagne" : "text-gold")} />
      <span className="leading-none">
        <span className={cx("block font-display text-[22px] font-semibold tracking-[0.3em]", dark ? "text-ivory-soft" : "text-ink")}>LOTUS</span>
        <span className={cx("mt-1 block font-body text-[7.5px] font-medium uppercase tracking-[0.34em]", dark ? "text-champagne/80" : "text-ink-soft")}>Women's Clothing</span>
      </span>
    </Link>
  );
}

function Announcement() {
  return (
    <div className="relative z-[81] h-8 overflow-hidden bg-wine text-champagne">
      <Marquee fast className="h-full">
        {ANNOUNCEMENTS.map((a) => (
          <span key={a} className="mx-6 flex items-center gap-6 whitespace-nowrap font-body text-[10.5px] font-medium uppercase tracking-[0.26em]">
            <span className="animate-ticker-glow">✦</span>
            {a}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  const iconBtn =
    "relative grid h-10 w-10 place-items-center rounded-full text-ink transition-all duration-300 hover:bg-plum/10 hover:text-plum";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80]">
        <Announcement />
        <div
          className={cx(
            "relative border-b border-line/80 bg-ivory-soft/95 backdrop-blur-xl transition-shadow duration-500",
            scrolled && "shadow-[0_10px_40px_rgba(43,29,34,0.07)]"
          )}
        >
          <div className="mx-auto flex h-[64px] max-w-[1520px] items-center justify-between gap-4 px-4 md:h-[76px] md:px-8">
            <Logo />

            <nav className="hidden items-center gap-[26px] lg:flex" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cx(
                      "link-underline font-body text-[11px] font-medium uppercase tracking-[0.16em] transition-colors",
                      isActive ? "is-active text-plum" : "text-ink/80 hover:text-ink"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-0.5 md:gap-1.5">
              <button type="button" onClick={() => setSearchOpen(true)} className={iconBtn} aria-label="Search products">
                <Search className="h-[19px] w-[19px]" />
              </button>
              <Link to="/wishlist" className={iconBtn} aria-label={`Wishlist, ${wishlist.length} items`}>
                <Heart className="h-[19px] w-[19px]" />
                {wishlist.length > 0 && (
                  <span key={wishlist.length} className="animate-pop absolute right-0.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-plum text-[9px] font-semibold text-ivory-soft">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button type="button" onClick={() => setCartOpen(true)} className={iconBtn} aria-label={`Shopping bag, ${cartCount} items`}>
                <ShoppingBag className="h-[19px] w-[19px]" />
                {cartCount > 0 && (
                  <span key={cartCount} className="animate-pop absolute right-0.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-semibold text-wine">
                    {cartCount}
                  </span>
                )}
              </button>
              <a href={waLink("Hello Lotus Women's Clothing 🌸")} target="_blank" rel="noreferrer" className={cx(iconBtn, "hidden sm:grid")} aria-label="WhatsApp">
                <WhatsAppGlyph className="h-[17px] w-[17px]" />
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
                aria-label="Open menu"
              >
                <span className="h-px w-6 bg-ink transition-all" />
                <span className="h-px w-4 self-end mr-2 bg-ink transition-all" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-wine text-ivory-soft lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <Logo dark />
              <button type="button" onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center" aria-label="Close menu">
                <span className="relative block h-6 w-6">
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-ivory-soft" />
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-ivory-soft" />
                </span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-7 pb-6" aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -34 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.055, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      cx(
                        "group flex items-baseline gap-4 border-b border-ivory-soft/10 py-3.5 font-display text-[30px] font-medium leading-none transition-colors",
                        isActive ? "text-champagne" : "text-ivory-soft hover:text-champagne"
                      )
                    }
                  >
                    <span className="font-body text-[10px] tracking-[0.3em] text-champagne/60">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="px-7 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <a href={waLink("Hello Lotus Women's Clothing 🌸")} target="_blank" rel="noreferrer" className="btn-wa w-full">
                <WhatsAppGlyph className="h-4 w-4" /> Order on WhatsApp
              </a>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-body text-[10.5px] uppercase tracking-[0.26em] text-ivory-soft/50">{BRAND.instagramHandle}</p>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="font-body text-[10.5px] uppercase tracking-[0.26em] text-champagne underline-offset-4 hover:underline">
                  Follow
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
