import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import { JOURNAL_CATEGORIES, JOURNAL_POSTS } from "../data/content";
import { cx, usePageTitle, waLink } from "../lib/utils";
import { useStore } from "../context/StoreContext";
import { LongArrow, LotusMark, PageHero, Reveal, SmartImg } from "../components/ui";
import { WhatsAppGlyph } from "../components/Chrome";

export function JournalList() {
  usePageTitle("The Lotus Journal | Styling Tips & Fashion Guides");
  const [cat, setCat] = useState("All");
  const posts = useMemo(() => (cat === "All" ? JOURNAL_POSTS : JOURNAL_POSTS.filter((p) => p.category === cat)), [cat]);
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero kicker="Notes from the atelier" title="The Lotus Journal" sub="Styling tips, size wisdom, festive inspiration and stories from behind the seams — written by the Lotus team." />

      <section className="mx-auto max-w-[1520px] px-6 py-14 md:px-8 md:py-20">
        <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6">
          {["All", ...JOURNAL_CATEGORIES].map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className={cx("shrink-0 rounded-full border px-5 py-2.5 font-body text-[12.5px] tracking-[0.06em] transition-all", cat === c ? "border-plum bg-plum text-ivory-soft" : "border-line text-ink-soft hover:border-ink hover:text-ink")}>
              {c}
            </button>
          ))}
        </div>

        {featured && (
          <Reveal>
            <Link to={`/journal/${featured.slug}`} className="group mt-12 grid gap-8 lg:grid-cols-2 lg:gap-14">
              <div className="overflow-hidden">
                <SmartImg src={featured.image} alt={featured.title} className="aspect-[4/3] w-full" imgClassName="transition-transform duration-[1200ms] group-hover:scale-[1.06]" eager />
              </div>
              <div className="flex flex-col justify-center">
                <p className="kicker">{featured.category} · {featured.readTime}</p>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.05] text-ink transition-colors group-hover:text-plum">{featured.title}</h2>
                <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-soft">{featured.excerpt}</p>
                <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-ink-soft">{featured.author} · {featured.date}</p>
                <span className="mt-6 inline-flex items-center gap-3 font-body text-[12px] font-medium uppercase tracking-[0.22em] text-gold">
                  Read the story <LongArrow className="h-3 w-7 transition-transform duration-500 group-hover:translate-x-2" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-16 grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <Link to={`/journal/${p.slug}`} className="group block">
                <div className="overflow-hidden">
                  <SmartImg src={p.image} alt={p.title} className="aspect-[4/3] w-full" imgClassName="transition-transform duration-[1100ms] group-hover:scale-[1.07]" />
                </div>
                <p className="mt-5 kicker">{p.category}</p>
                <h3 className="mt-2.5 font-display text-[24px] font-semibold leading-tight text-ink transition-colors group-hover:text-plum">{p.title}</h3>
                <p className="mt-2.5 line-clamp-2 text-[14px] leading-relaxed text-ink-soft">{p.excerpt}</p>
                <p className="mt-4 text-[11.5px] uppercase tracking-[0.18em] text-ink-soft">{p.date} · {p.readTime}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <LotusMark className="h-14 w-14 text-blush" />
            <p className="mt-4 font-display text-2xl font-medium text-ink">No stories in this petal yet</p>
          </div>
        )}
      </section>
    </>
  );
}

export function JournalPostPage() {
  const { slug } = useParams();
  const { pushToast } = useStore();
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  usePageTitle(post ? `${post.title} | The Lotus Journal` : "Story not found | The Lotus Journal");

  if (!post) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-40 text-center">
        <LotusMark className="h-16 w-16 text-blush" />
        <h1 className="mt-6 font-display text-[34px] font-medium text-ink">This page has drifted away</h1>
        <Link to="/journal" className="btn-primary mt-8">Back to the Journal</Link>
      </section>
    );
  }

  const related = JOURNAL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const shareText = `Reading "${post.title}" on The Lotus Journal 🌸`;
  const shareUrl = window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      pushToast("Link copied", "Share it with your style tribe");
    } catch {
      pushToast("Couldn't copy", "Please copy the address bar link");
    }
  };

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-36 md:pt-44">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="kicker">
          {post.category} · {post.readTime}
        </motion.p>
        <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-medium leading-[1.04] text-ink">
          <span className="block overflow-hidden">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>{post.title}</motion.span>
          </span>
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] uppercase tracking-[0.18em] text-ink-soft">
          <span>By {post.author}</span><span className="text-line">·</span><span>{post.date}</span>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Reveal><SmartImg src={post.image} alt={post.title} className="aspect-[16/9] w-full" eager /></Reveal>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-14">
        {post.content.map((para, i) => (
          <Reveal key={i} delay={0.05}>
            <p className={cx("mb-7 text-[16.5px] leading-[1.85] text-ink/85", i === 0 && "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[64px] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-plum")}>
              {para}
            </p>
          </Reveal>
        ))}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-line py-6">
          <p className="font-body text-[11px] uppercase tracking-[0.24em] text-ink-soft">Share this story</p>
          <div className="flex gap-2.5">
            <a href={waLink(`${shareText}\n${shareUrl}`)} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-all hover:border-[#1f6e43] hover:bg-[#1f6e43] hover:text-ivory-soft" aria-label="Share on WhatsApp">
              <WhatsAppGlyph className="h-4.5 w-4.5" />
            </a>
            <button type="button" onClick={copyLink} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-all hover:border-gold hover:bg-gold hover:text-wine" aria-label="Copy link">
              <Copy className="h-4.5 w-4.5" />
            </button>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-all hover:border-ink hover:bg-ink hover:text-ivory-soft" aria-label="Share on X">
              <Share2 className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </article>

      <section className="bg-ivory-soft/60 py-16">
        <div className="mx-auto max-w-[1520px] px-6 md:px-8">
          <Reveal><h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium text-ink">Keep reading</h2></Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <Link to={`/journal/${p.slug}`} className="group grid grid-cols-[120px_1fr] gap-5">
                  <SmartImg src={p.image} alt={p.title} className="aspect-square h-full w-full" />
                  <div>
                    <p className="kicker">{p.category}</p>
                    <h3 className="mt-2 font-display text-[21px] font-semibold leading-tight text-ink group-hover:text-plum">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-[13.5px] text-ink-soft">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
