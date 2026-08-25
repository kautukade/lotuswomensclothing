import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { BRAND, FOOTER_COLS } from "../data/config";
import { cx, waLink } from "../lib/utils";
import { useStore } from "../context/StoreContext";
import { LotusMark } from "./ui";
import { WhatsAppGlyph } from "./Chrome";

export default function Footer() {
  const { pushToast } = useStore();
  const [email, setEmail] = useState("");

  const join = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      pushToast("Hmm, that email looks off", "Please check and try again");
      return;
    }
    setEmail("");
    pushToast("Welcome to the Lotus Circle", "New blooms in your inbox, every week 🌸");
  };

  return (
    <footer className="relative overflow-hidden bg-wine-deep text-ivory-soft">
      <div className="border-b border-ivory-soft/10">
        <div className="mx-auto grid max-w-[1520px] items-center gap-8 px-6 py-14 md:grid-cols-2 md:px-8 lg:py-16">
          <div>
            <p className="kicker !text-champagne">Newsletter</p>
            <h3 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium leading-tight">Join The Lotus Circle</h3>
            <p className="mt-2 max-w-md text-[14px] text-ivory-soft/60">First look at new arrivals, styling notes and members-only offers. No noise, only blooms.</p>
          </div>
          <form onSubmit={join} className="flex items-end gap-4">
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border-b border-ivory-soft/25 bg-transparent px-1 py-3.5 font-body text-[15px] text-ivory-soft placeholder:text-ivory-soft/35 outline-none transition-colors focus:border-champagne"
              />
            </label>
            <button type="submit" className="btn-gold shrink-0 px-7 py-3.5">Join</button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1520px] gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <LotusMark className="h-11 w-11 text-champagne" />
            <span className="leading-none">
              <span className="block font-display text-2xl font-semibold tracking-[0.3em]">LOTUS</span>
              <span className="mt-1 block font-body text-[8px] font-medium uppercase tracking-[0.34em] text-champagne/80">Women's Clothing</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs font-display text-[19px] italic leading-snug text-ivory-soft/80">"{BRAND.tagline}"</p>
          <p className="mt-4 text-[13px] leading-relaxed text-ivory-soft/50">
            Elegant women's fashion from {BRAND.location}. Sizes XS – 6XL, shipped across India.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h4 className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-champagne">{col.title}</h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.to.startsWith("http") ? (
                    <a href={l.to} target="_blank" rel="noreferrer" className="link-underline text-[14px] text-ivory-soft/75 transition-colors hover:text-ivory-soft">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to} className="link-underline text-[14px] text-ivory-soft/75 transition-colors hover:text-ivory-soft">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Social">
          <h4 className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-champagne">Social</h4>
          <div className="mt-5 space-y-3">
            <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-[14px] text-ivory-soft/75 transition-colors hover:text-ivory-soft">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-ivory-soft/20 transition-all duration-300 group-hover:border-champagne group-hover:bg-champagne group-hover:text-wine">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
              </span>
              Instagram
            </a>
            <a href={waLink("Hello Lotus Women's Clothing 🌸")} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-[14px] text-ivory-soft/75 transition-colors hover:text-ivory-soft">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-ivory-soft/20 transition-all duration-300 group-hover:border-champagne group-hover:bg-champagne group-hover:text-wine">
                <WhatsAppGlyph className="h-4 w-4" />
              </span>
              WhatsApp
            </a>
          </div>
          <p className="mt-6 text-[12px] leading-relaxed text-ivory-soft/40">
            Payments: Cash on Delivery · UPI on WhatsApp
            <br /> Online payments coming soon.
          </p>
        </nav>
      </div>

      <div className="relative border-t border-ivory-soft/10 px-6 pb-6 pt-8 md:px-8">
        <div className="mx-auto flex max-w-[1520px] flex-col items-center justify-between gap-3 text-[11.5px] tracking-[0.08em] text-ivory-soft/40 md:flex-row">
          <p>© {new Date().getFullYear()} Lotus Women's Clothing. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className={cx("hover:text-champagne transition-colors")}>Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-champagne">Terms</Link>
            <Link to="/shipping-returns" className="transition-colors hover:text-champagne">Shipping &amp; Returns</Link>
          </div>
          <p>Made with care in Pusad 🌸</p>
        </div>
      </div>

      <p aria-hidden className="text-stroke-ivory pointer-events-none -mb-[4vw] select-none whitespace-nowrap text-center font-display text-[22vw] font-bold leading-[0.78] opacity-60">
        LOTUS
      </p>
    </footer>
  );
}
