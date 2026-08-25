import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Heart, Instagram, Mail, MapPin, Phone, Ruler, Send, ShoppingBag } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { BRAND, SIZE_GUIDE, SIZES_ALL } from "../data/config";
import { COLLECTIONS, PRODUCTS, getProduct } from "../data/products";
import { REVIEWS, STORY_STATS } from "../data/content";
import { cx, usePageTitle, waLink } from "../lib/utils";
import { Accordion, LongArrow, LotusMark, Marquee, PageHero, PetalShape, Reveal, SectionHead, SmartImg, Stars } from "../components/ui";
import { ProductCard } from "../components/ProductBits";
import { WhatsAppGlyph } from "../components/Chrome";
import { IMG } from "../data/images";

/* ================= ABOUT ================= */
export function About() {
  usePageTitle("Our Story | Lotus Women's Clothing");
  return (
    <>
      <PageHero kicker="Our story" title="A small-town brand with a big bloom" sub="Lotus Women's Clothing is a curated fashion house from Pusad, Maharashtra — sending confidence across India, one WhatsApp order at a time." />

      <section className="mx-auto max-w-[1520px] px-6 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal y={50}>
            <div className="relative">
              <div className="absolute -right-4 -top-4 h-full w-full border border-gold/40" aria-hidden />
              <SmartImg src={IMG.boutique} alt="Garments being quality checked at Lotus" className="aspect-[4/5] w-full" />
            </div>
          </Reveal>
          <div>
            <SectionHead kicker="Why the lotus" title="Beauty that rises, untouched" />
            <Reveal delay={0.15}>
              <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
                The lotus blooms in still water and stays unsoiled — that's the standard we hold for fashion. Beautiful, not loud. Considered, not mass-produced. Inclusive, without exception.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                We started because the women around us deserved better choices — choices that didn't stop at XL, that didn't require a metro city, and that didn't trade comfort for style. Today, every style we curate is checked by hand, graded honestly from XS to 6XL, and delivered to all 28 states.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                Ordering with us is a conversation, not a checkout form. Message us on WhatsApp, and a real person shares real photos, confirms your size, and keeps you posted until the parcel is in your hands.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
                {STORY_STATS.map((s) => (
                  <div key={s.label} className="bg-ivory-soft p-5 text-center">
                    <p className="font-display text-[24px] font-semibold text-plum">{s.value}</p>
                    <p className="mt-1 font-body text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-3">
          {[
            { t: "Confidence first", d: "Every piece is chosen for how it makes you feel — not just how it photographs.", img: IMG.heroModel },
            { t: "Inclusive always", d: "Sizes XS to 6XL, graded proportionally. Fashion without limits is a promise, not a capsule.", img: IMG.plussize },
            { t: "Rooted, reaching", d: "Proudly from Pusad, shipping PAN India with tracking and care to every pincode.", img: IMG.lookbook },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 0.1}>
              <div className="group">
                <div className="overflow-hidden">
                  <SmartImg src={v.img} alt={v.t} className="aspect-[4/5] w-full" imgClassName="transition-transform duration-[1100ms] group-hover:scale-[1.06]" />
                </div>
                <h3 className="mt-5 font-display text-[24px] font-semibold text-ink">{v.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col items-center gap-5 border border-gold/40 bg-gold/10 px-8 py-12 text-center">
            <LotusMark className="h-12 w-12 text-plum" />
            <p className="max-w-xl font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-snug text-ink">Ready to find the piece that feels like it was waiting for you?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop" className="btn-primary">Shop The Collection <LongArrow className="h-3 w-6" /></Link>
              <a href={waLink("Hello Lotus 🌸 I'm new here — help me pick my first order!")} target="_blank" rel="noreferrer" className="btn-wa"><WhatsAppGlyph className="h-4 w-4" /> Say hello</a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ================= CONTACT ================= */
export function Contact() {
  usePageTitle("Contact Us | Lotus Women's Clothing");
  const { pushToast } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "Product inquiry", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      pushToast("Almost there", "Please add your name and a short message");
      return;
    }
    const msg = [
      "Hello Lotus Women's Clothing 🌸", "",
      `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      `Inquiry type: ${form.type}`, "",
      `Message: ${form.message}`,
    ].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
    pushToast("Opening WhatsApp…", "Your message is ready to send");
  };

  return (
    <>
      <PageHero kicker="We answer fast" title="Talk to a human, not a bot" sub="Product questions, size help, order updates or collaborations — reach us on WhatsApp, call, or drop a note below." />

      <section className="mx-auto grid max-w-[1520px] gap-14 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form onSubmit={submit} className="border border-line bg-paper p-7 md:p-10">
            <h2 className="font-display text-[30px] font-semibold text-ink">Send us a note</h2>
            <p className="mt-1.5 text-[13.5px] text-ink-soft">Submitting opens WhatsApp with your message ready — one tap to send.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">Name *</span>
                <input className="input-luxe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </label>
              <label className="block">
                <span className="mb-1 block font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">Phone</span>
                <input className="input-luxe" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 …" />
              </label>
              <label className="block">
                <span className="mb-1 block font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">Email</span>
                <input className="input-luxe" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="mb-1 block font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">Inquiry type</span>
                <select className="input-luxe appearance-none" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {["Product inquiry", "Order support", "Size help", "Returns & exchange", "Collaboration", "Other"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1 block font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft">Message *</span>
                <textarea className="input-luxe min-h-32 resize-y" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you're looking for — product codes welcome" />
              </label>
            </div>
            <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
              <Send className="h-4 w-4" /> {sent ? "Send another" : "Send via WhatsApp"}
            </button>
          </form>
        </Reveal>

        <div className="space-y-5">
          {[
            { icon: <WhatsAppGlyph className="h-5 w-5" />, t: "WhatsApp — fastest", d: "Real photos, size help and orders", href: waLink("Hello Lotus Women's Clothing 🌸"), ext: true, accent: true },
            { icon: <Phone className="h-5 w-5" />, t: "Call us", d: BRAND.phone, href: BRAND.phoneHref, ext: false, accent: false },
            { icon: <Instagram className="h-5 w-5" />, t: "Instagram", d: BRAND.instagramHandle, href: BRAND.instagramUrl, ext: true, accent: false },
            { icon: <Mail className="h-5 w-5" />, t: "Email", d: BRAND.email, href: `mailto:${BRAND.email}`, ext: false, accent: false },
            { icon: <MapPin className="h-5 w-5" />, t: "Visit", d: `${BRAND.location} · ${BRAND.hours}`, href: BRAND.mapsUrl, ext: true, accent: false },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <a href={c.href} target={c.ext ? "_blank" : undefined} rel={c.ext ? "noreferrer" : undefined} className={cx("group flex items-center gap-5 border p-5 transition-all duration-300 hover:-translate-y-0.5", c.accent ? "border-[#1f6e43]/40 bg-[#1f6e43]/5 hover:border-[#1f6e43]" : "border-line bg-paper hover:border-gold")}>
                <span className={cx("grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors", c.accent ? "border-[#1f6e43]/30 text-[#1f6e43]" : "border-line text-gold group-hover:bg-gold group-hover:text-wine")}>{c.icon}</span>
                <span>
                  <span className="block font-display text-[20px] font-semibold leading-tight text-ink">{c.t}</span>
                  <span className="text-[13px] text-ink-soft">{c.d}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

/* ================= SIZE GUIDE PAGE ================= */
export function SizeGuidePage() {
  usePageTitle("Size Guide | Lotus Women's Clothing");
  return (
    <>
      <PageHero kicker="Fit, engineered" title="The Size Guide" sub="Every Lotus style from XS to 6XL — measured honestly, graded proportionally. Here's how to find your perfect fit." />

      <section className="mx-auto max-w-[1520px] px-6 py-16 md:px-8 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal>
              <div className="overflow-x-auto border border-line bg-paper">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <thead>
                    <tr className="border-b-2 border-ink/15 bg-ivory-soft font-body text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">
                      <th className="px-6 py-4">Size</th><th className="px-6 py-4">Bust (in)</th><th className="px-6 py-4">Waist (in)</th><th className="px-6 py-4">Hip (in)</th><th className="px-6 py-4">Typical UK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_GUIDE.map((r, i) => (
                      <tr key={r.size} className={cx("border-b border-line text-[14.5px] transition-colors hover:bg-gold/10", i >= 6 && "bg-blush/20")}>
                        <td className="px-6 py-3.5 font-display text-[18px] font-semibold text-plum">{r.size}</td>
                        <td className="px-6 py-3.5">{r.bust}"</td>
                        <td className="px-6 py-3.5">{r.waist}"</td>
                        <td className="px-6 py-3.5">{r.hip}"</td>
                        <td className="px-6 py-3.5 text-ink-soft">{["UK 6", "UK 8", "UK 10", "UK 12", "UK 14", "UK 16", "UK 18", "UK 20", "UK 22", "UK 24"][i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <p className="mt-4 text-[13px] text-ink-soft">Shaded rows are our extended sizes — cut with proportional armholes, darts and lengths, never just widened.</p>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                { icon: <Ruler className="h-6 w-6" />, t: "1 · Measure", d: "Bust at the fullest point, waist at the narrowest, hip at the widest — tape parallel to the floor." },
                { icon: <Heart className="h-6 w-6" />, t: "2 · Compare", d: "Match your bust measurement to the chart. Between sizes? Go one up — drape loves ease." },
                { icon: <WhatsAppGlyph className="h-6 w-6" />, t: "3 · Confirm", d: "WhatsApp us your numbers and the product code — we'll confirm your size before you order." },
              ].map((s, i) => (
                <Reveal key={s.t} delay={i * 0.1}>
                  <div className="border-t border-line pt-6">
                    <span className="text-gold">{s.icon}</span>
                    <h3 className="mt-3 font-display text-[22px] font-semibold text-ink">{s.t}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="h-fit space-y-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="border border-gold/40 bg-gold/10 p-7">
                <p className="font-display text-[24px] font-semibold leading-tight text-ink">Still unsure?</p>
                <p className="mt-2 text-[13.5px] text-ink-soft">Send us your measurements — we reply within minutes during store hours.</p>
                <a href={waLink("Hello Lotus 🌸 I need help choosing my size. My measurements are:\nBust: __\nWaist: __\nHip: __\nProduct code: LOTUS-__")} target="_blank" rel="noreferrer" className="btn-wa mt-5 w-full py-3.5">
                  <WhatsAppGlyph className="h-4 w-4" /> Ask for size help
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/shop" className="group flex items-center justify-between border border-line bg-paper p-6 transition-colors hover:border-gold">
                <span>
                  <span className="block font-display text-[21px] font-semibold text-ink">Shop all sizes</span>
                  <span className="text-[12.5px] text-ink-soft">{SIZES_ALL[0]} – {SIZES_ALL[SIZES_ALL.length - 1]} available</span>
                </span>
                <LongArrow className="h-3.5 w-7 text-gold transition-transform duration-500 group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ================= SHIPPING & RETURNS ================= */
export function ShippingReturns() {
  usePageTitle("Shipping & Returns | Lotus Women's Clothing");
  return (
    <>
      <PageHero kicker="The practical bits" title="Shipping & Returns" sub="Clear, fair and fast — everything you need to know about delivery, payment and exchanges." />
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Accordion title="How fast will my order arrive?" defaultOpen>
          <p>Orders are dispatched from Pusad, Maharashtra within 24–48 hours. Delivery typically takes 4–7 working days anywhere in India, with live tracking shared on WhatsApp. Metros often see parcels in 3–4 days.</p>
        </Accordion>
        <Accordion title="What does shipping cost?">
          <p>Free shipping on orders above {`₹${BRAND.freeShippingAbove.toLocaleString("en-IN")}`}. Below that, a flat ₹79 applies — no surprises at checkout, ever.</p>
        </Accordion>
        <Accordion title="How do I pay?">
          <p>Today you can pay via Cash on Delivery or UPI on WhatsApp — choose whatever feels comfortable. A full online payment gateway (cards, netbanking, wallets) is on its way.</p>
        </Accordion>
        <Accordion title="What is the return policy?">
          <p>Unworn items with tags intact can be returned within 7 days of delivery for a refund or store credit. WhatsApp us your order details and we'll arrange a pickup from your doorstep.</p>
        </Accordion>
        <Accordion title="Can I exchange for another size?">
          <p>Absolutely — exchanges are always free and prioritised. We ship the new size as soon as the pickup is confirmed, so you're never waiting on both ends.</p>
        </Accordion>
        <Accordion title="Something arrived damaged or wrong?">
          <p>Send us a photo on WhatsApp within 48 hours of delivery. We'll replace it at our cost — including shipping — no questions, no forms.</p>
        </Accordion>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={waLink("Hello Lotus 🌸 I have a question about my order.")} target="_blank" rel="noreferrer" className="btn-wa"><WhatsAppGlyph className="h-4 w-4" /> WhatsApp support</a>
          <Link to="/shop" className="btn-outline">Continue shopping</Link>
        </div>
      </section>
    </>
  );
}

/* ================= LEGAL ================= */
function LegalShell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero kicker="The fine print, softly" title={title} sub={`Last updated: ${updated}`} />
      <section className="mx-auto max-w-3xl space-y-8 px-6 py-16 text-[15.5px] leading-relaxed text-ink/85 md:py-24">{children}</section>
    </>
  );
}

export function Privacy() {
  usePageTitle("Privacy Policy | Lotus Women's Clothing");
  return (
    <LegalShell title="Privacy Policy" updated="January 2026">
      <div><h2 className="font-display text-2xl font-semibold text-ink">1. What we collect</h2><p className="mt-3">When you browse or order, we may know your name, contact details, delivery address and order history — only what's needed to serve you. We never sell your data to anyone.</p></div>
      <div><h2 className="font-display text-2xl font-semibold text-ink">2. How we use it</h2><p className="mt-3">Your details are used to confirm orders, arrange delivery, provide size help and — only if you opt in — send you new-arrival updates via the Lotus Circle newsletter.</p></div>
      <div><h2 className="font-display text-2xl font-semibold text-ink">3. WhatsApp conversations</h2><p className="mt-3">Orders placed on WhatsApp are governed by WhatsApp's own privacy terms. We keep order chats solely for fulfilment and support.</p></div>
      <div><h2 className="font-display text-2xl font-semibold text-ink">4. Your choices</h2><p className="mt-3">You can ask us to update or erase your details at any time — one message to {BRAND.email} or WhatsApp is enough.</p></div>
      <div><h2 className="font-display text-2xl font-semibold text-ink">5. Contact</h2><p className="mt-3">Questions? Write to {BRAND.email} or WhatsApp us — a human replies.</p></div>
    </LegalShell>
  );
}

export function Terms() {
  usePageTitle("Terms & Conditions | Lotus Women's Clothing");
  return (
    <LegalShell title="Terms & Conditions" updated="January 2026">
      <div><h2 className="font-display text-2xl font-semibold text-ink">1. Ordering</h2><p className="mt-3">An order is confirmed once we verify availability and payment on WhatsApp or phone. Prices are in INR and inclusive of taxes.</p></div>
      <div><h2 className="font-display text-2xl font-semibold text-ink">2. Colours & imagery</h2><p className="mt-3">We photograph in natural light and share real photos on request, but slight colour variation across screens is possible.</p></div>
      <div><h2 className="font-display text-2xl font-semibold text-ink">3. Shipping</h2><p className="mt-3">Delivery timelines are estimates; courier delays beyond our control are rare but possible. We track every parcel and keep you posted.</p></div>
      <div><h2 className="font-display text-2xl font-semibold text-ink">4. Returns & exchanges</h2><p className="mt-3">Covered in detail on our Shipping &amp; Returns page — 7-day returns, free exchanges, and replacements for anything that arrives imperfect.</p></div>
      <div><h2 className="font-display text-2xl font-semibold text-ink">5. Fair use</h2><p className="mt-3">Content on this site — photos, lookbooks and writing — belongs to Lotus Women's Clothing. Sharing is loved; republishing needs permission.</p></div>
    </LegalShell>
  );
}

/* ================= REVIEWS PAGE ================= */
export function ReviewsPage() {
  usePageTitle("Customer Reviews | Lotus Women's Clothing");
  return (
    <>
      <PageHero kicker="4.8★ average rating" title="Loved By Our Customers" sub="Unedited words from women across India — from Pusad to Delhi, from XS to 6XL." />
      <section className="mx-auto max-w-[1520px] px-6 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_24px_60px_rgba(43,29,34,0.1)]">
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="flex items-center gap-1.5 rounded-full bg-[#1f6e43]/10 px-2.5 py-1 font-body text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1f6e43]">
                    <BadgeCheck className="h-3 w-3" /> Verified Buyer
                  </span>
                </div>
                <p className="mt-4 flex-1 font-display text-[19px] italic leading-snug text-ink">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-plum font-display text-[18px] font-semibold text-ivory-soft">{r.name.charAt(0)}</span>
                  <div>
                    <p className="font-body text-[14px] font-semibold text-ink">{r.name}</p>
                    <p className="text-[12px] text-ink-soft">{r.location} · {r.date}</p>
                  </div>
                </div>
                <p className="mt-4 border-t border-line pt-3 font-body text-[11px] uppercase tracking-[0.16em] text-ink-soft">Purchased: <span className="text-plum">{r.product}</span></p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium text-ink">Bloomed with us recently?</p>
            <a href={waLink("Hello Lotus 🌸 I'd love to share my review!")} target="_blank" rel="noreferrer" className="btn-primary">Share your story <LongArrow className="h-3 w-6" /></a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ================= WISHLIST ================= */
export function WishlistPage() {
  usePageTitle("Wishlist | Lotus Women's Clothing");
  const { wishlist } = useStore();
  const items = wishlist.map((id) => getProduct(id)).filter((p): p is NonNullable<ReturnType<typeof getProduct>> => !!p);
  return (
    <>
      <PageHero kicker="Saved for later" title="Your Wishlist" sub={items.length ? `${items.length} piece${items.length > 1 ? "s" : ""} waiting for the right moment.` : "Pieces you love, saved in one place."} />
      <section className="mx-auto max-w-[1520px] px-6 py-16 md:px-8 md:py-24">
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
              <Heart className="h-14 w-14 text-blush" />
            </motion.span>
            <p className="mt-5 font-display text-[30px] font-medium text-ink">Nothing saved yet</p>
            <p className="mt-2 max-w-sm text-[14.5px] text-ink-soft">Tap the heart on any product to keep it here — your future favourites are one scroll away.</p>
            <Link to="/shop" className="btn-primary mt-8"><ShoppingBag className="h-4 w-4" /> Explore the collection</Link>
          </div>
        )}
      </section>
    </>
  );
}

/* ================= COLLECTIONS ================= */
export function CollectionsPage() {
  usePageTitle("Collections | Lotus Women's Clothing");
  return (
    <>
      <PageHero kicker="Mood boards" title="The Collections" sub="Seven ways to wear Lotus — from everyday ease to wedding-guest drama. Every collection shippable PAN India, in sizes up to 6XL." />
      <section className="mx-auto max-w-[1520px] px-6 py-16 md:px-8 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((c, i) => {
            const count = PRODUCTS.filter((p) => p.collection === c.filter).length;
            return (
              <Reveal key={c.id} delay={(i % 3) * 0.09}>
                <Link to={`/shop?collection=${encodeURIComponent(c.filter)}`} data-cursor="view" className="group relative block overflow-hidden">
                  <SmartImg src={c.image} alt={c.name} className={cx("w-full", i % 3 === 1 ? "aspect-[4/5.6]" : "aspect-[4/5]")} imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/85 via-wine-deep/10 to-transparent" />
                  <div className="absolute inset-5 flex flex-col justify-end border border-champagne/0 p-5 transition-all duration-500 group-hover:border-champagne/40">
                    <p className="font-body text-[10px] uppercase tracking-[0.26em] text-champagne">{count} pieces</p>
                    <p className="mt-2 font-display text-[32px] font-semibold leading-none text-ivory-soft">{c.name}</p>
                    <p className="mt-2 text-[13.5px] text-ivory-soft/75">{c.tagline}</p>
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
    </>
  );
}

/* ================= 404 ================= */
export function NotFound() {
  usePageTitle("Page Not Found | Lotus Women's Clothing");
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-32 text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[
          "left-[12%] top-[22%] h-8 w-6 text-rose/40",
          "left-[80%] top-[30%] h-6 w-4 text-champagne/60",
          "left-[24%] bottom-[24%] h-7 w-5 text-blush",
          "left-[70%] bottom-[18%] h-5 w-4 text-rose/40",
        ].map((c, i) => (
          <span key={i} className={cx("animate-float-y absolute", c)} style={{ animationDelay: `${i * 1.2}s` }}>
            <PetalShape className="h-full w-full" />
          </span>
        ))}
      </div>
      <motion.div initial={{ scale: 0.5, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
        <LotusMark className="mx-auto h-24 w-24 text-plum" />
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }} className="kicker mt-8">Error 404</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9 }} className="mt-4 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-medium leading-tight text-ink">
        This petal has <span className="italic text-plum">drifted away</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.9 }} className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
        The page you're after doesn't exist — but the collection is very much alive. Let's get you back to something beautiful.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }} className="mt-9 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-primary">Back to Home</Link>
        <Link to="/shop" className="btn-outline">Shop Collection</Link>
      </motion.div>
      <Marquee className="mt-16 w-screen opacity-40">
        {["Bloom in your style", "Sizes up to 6XL", "PAN India shipping", "Order on WhatsApp"].map((t) => (
          <span key={t} className="mx-8 font-display text-[20px] italic text-ink-soft">{t} ✦</span>
        ))}
      </Marquee>
    </section>
  );
}
