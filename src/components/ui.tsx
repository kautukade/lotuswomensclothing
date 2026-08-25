import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useSpring } from "framer-motion";
import { Star } from "lucide-react";
import { cx, isFinePointer } from "../lib/utils";

/* ---------- scroll reveal ---------- */
export function Reveal({ children, delay = 0, y = 34, className, once = true }: {
  children: ReactNode; delay?: number; y?: number; className?: string; once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- section heading with masked line reveal ---------- */
export function SectionHead({ kicker, title, link, linkTo, dark, center }: {
  kicker: string; title: string; link?: string; linkTo?: string; dark?: boolean; center?: boolean;
}) {
  return (
    <div className={cx("flex flex-wrap items-end justify-between gap-x-10 gap-y-5", center && "justify-center text-center")}>
      <div className={center ? "mx-auto" : ""}>
        <Reveal y={16}>
          <span className="kicker flex items-center gap-3">
            <span className={cx("inline-block h-px w-8", dark ? "bg-champagne/60" : "bg-gold/60")} />
            {kicker}
          </span>
        </Reveal>
        <h2 className={cx("mt-4 font-display font-medium leading-[1.03] text-[clamp(2rem,5vw,3.6rem)]", dark ? "text-ivory-soft" : "text-ink")}>
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              initial={{ y: "112%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.span>
          </span>
        </h2>
      </div>
      {link && linkTo && (
        <Reveal delay={0.15}>
          <Link
            to={linkTo}
            className={cx(
              "group inline-flex items-center gap-3 border-b pb-1 font-body text-[12px] font-medium uppercase tracking-[0.22em] transition-colors",
              dark ? "border-ivory-soft/30 text-ivory-soft hover:border-champagne hover:text-champagne" : "border-ink/25 text-ink hover:border-gold hover:text-gold"
            )}
          >
            {link}
            <LongArrow className="h-4 w-7 transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- icons ---------- */
export function LongArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 12" fill="none" className={className} aria-hidden>
      <path d="M0 6h26M21 1l5.5 5L21 11" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M24 6c3.6 5.2 5.4 10.4 5.4 15.6A5.4 5.4 0 0 1 24 27a5.4 5.4 0 0 1-5.4-5.4C18.6 16.4 20.4 11.2 24 6z" fill="currentColor" opacity="0.92" />
      <path d="M11 13.5c5.4 2.6 9 7 10 13.2-6.4-.6-10.9-5.4-10-13.2zm26 0c.9 7.8-3.6 12.6-10 13.2 1-6.2 4.6-10.6 10-13.2z" fill="currentColor" opacity="0.6" />
      <path d="M7 24.5c4.3.5 7.7 2.2 9.8 5.2-4.4 1.4-8-.1-9.8-5.2zm34 0c-1.8 5.1-5.4 6.6-9.8 5.2 2.1-3 5.5-4.7 9.8-5.2z" fill="currentColor" opacity="0.34" />
      <path d="M13 34.5c6.8 3.4 14.2 3.4 22 0-3.4 5.6-7.6 8.4-11 8.4s-7.6-2.8-11-8.4z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

export function PetalShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" fill="none" className={className} aria-hidden>
      <path d="M20 2C30 16 34 30 34 40a14 14 0 1 1-28 0C6 30 10 16 20 2z" fill="currentColor" />
    </svg>
  );
}

/* ---------- rating stars ---------- */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cx("h-3.5 w-3.5", i <= Math.round(rating) ? "fill-gold text-gold" : "fill-line text-line")} />
      ))}
    </span>
  );
}

/* ---------- resilient image ---------- */
export function SmartImg({ src, alt, className, imgClassName, eager }: {
  src: string; alt: string; className?: string; imgClassName?: string; eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={cx("relative overflow-hidden bg-ivory", className)}>
      {!loaded && !failed && <div className="skeleton absolute inset-0" />}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-blush/50 via-ivory-soft to-champagne/50">
          <LotusMark className="h-12 w-12 text-plum/40" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cx("h-full w-full object-cover transition-[opacity,transform] duration-700", loaded ? "opacity-100" : "opacity-0", imgClassName)}
        />
      )}
    </div>
  );
}

/* ---------- magnetic wrapper ---------- */
export function Magnetic({ children, strength = 0.22, className }: {
  children: ReactNode; strength?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 160, damping: 16 });
  const y = useSpring(0, { stiffness: 160, damping: 16 });
  const fine = isFinePointer();
  return (
    <motion.div
      ref={ref}
      className={cx("inline-block", className)}
      style={{ x, y }}
      onMouseMove={fine ? (e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      } : undefined}
      onMouseLeave={fine ? () => { x.set(0); y.set(0); } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ---------- subtle 3D tilt card ---------- */
export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 140, damping: 16 });
  const ry = useSpring(0, { stiffness: 140, damping: 16 });
  const fine = isFinePointer();
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={fine ? (e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      } : undefined}
      onMouseLeave={fine ? () => { rx.set(0); ry.set(0); } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ---------- infinite marquee ---------- */
export function Marquee({ children, className, fast, reverse }: {
  children: ReactNode; className?: string; fast?: boolean; reverse?: boolean;
}) {
  return (
    <div className={cx("group flex overflow-hidden", className)}>
      {[0, 1].map((k) => (
        <div
          key={k}
          aria-hidden={k === 1}
          className={cx("flex w-max shrink-0 items-center", fast ? "animate-marquee-fast" : "animate-marquee", "group-hover:[animation-play-state:paused]")}
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

/* ---------- accordion ---------- */
export function Accordion({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-body text-[13px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold"
        aria-expanded={open}
      >
        {title}
        <span className={cx("relative h-3.5 w-3.5 shrink-0 transition-transform duration-500", open && "rotate-45")}>
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-6 text-[15px] leading-relaxed text-ink-soft">{children}</div>
      </motion.div>
    </div>
  );
}

/* ---------- page shell for sub pages ---------- */
export function PageHero({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden bg-wine px-6 pb-20 pt-40 text-ivory-soft md:pb-28 md:pt-52">
      <LotusMark className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-champagne/10 md:h-[26rem] md:w-[26rem]" />
      <div className="mx-auto max-w-7xl">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="kicker !text-champagne">
          {kicker}
        </motion.p>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,4.8rem)] font-medium leading-[1.02]">
          <span className="block overflow-hidden">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
              {title}
            </motion.span>
          </span>
        </h1>
        {sub && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-6 max-w-xl text-[16px] leading-relaxed text-ivory-soft/75">
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}
