import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import ArticleCard from "@/components/ArticleCard";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import SearchBar from "@/components/SearchBar";
import { CATEGORIES } from "@/lib/categories";
import { IMG, unsplash } from "@/lib/images";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | ${SITE.tagline}` },
  description: "Healthy hair starts here. Tested remedies for curly, straight & hair fall problems.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [unsplash(IMG.hero, 1200)] },
};

const TIPS = ["Detangle gently", "Cool water rinse", "Sleep on silk", "Scalp massage", "Trim every 8-12 weeks", "Protect from heat", "Stay hydrated", "Eat iron-rich foods"];

const STEPS = [
  { n: "01", t: "Pick your hair concern", d: "Curly, straight or hair fall: jump straight to the guides made for you.", icon: "M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11zm0-8a3 3 0 100-6 3 3 0 000 6z" },
  { n: "02", t: "Follow simple steps", d: "Every remedy is explained step by step, with the 'why' behind it.", icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" },
  { n: "03", t: "See healthier hair", d: "Stay consistent for a few weeks and watch shine and strength come back.", icon: "M12 3l2.5 5.5L20 9.3l-4 4.1 1 5.8-5-2.8-5 2.8 1-5.8-4-4.1 5.5-.8L12 3z" },
];

export default function HomePage() {
  const posts = getAllPosts();
  const searchItems = posts.map((p) => ({ slug: p.slug, title: p.title, category: p.category }));
  const [featured, ...rest] = posts;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-soft via-white to-white">
        <div className="animate-blob absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="animate-blob absolute -right-24 top-40 -z-10 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" style={{ animationDelay: "-6s" }} />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 lg:grid-cols-2 lg:py-24">
          <div className="relative z-20 text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand shadow-sm ring-1 ring-brand/20">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand" /> Curly · Straight · Hair Fall
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
                Healthy Hair <span className="gradient-text">Starts Here</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mx-auto mt-5 max-w-lg text-lg text-gray-600 lg:mx-0">
                Tested remedies for curly, straight &amp; hair fall problems
              </p>
            </Reveal>
            <Reveal delay={300} className="mx-auto mt-8 max-w-lg lg:mx-0">
              <SearchBar items={searchItems} />
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm lg:justify-start">
                <span className="font-medium leading-none text-gray-500">Popular:</span>
                {CATEGORIES.map((c) => (
                  <Link key={c.slug} href={`/category/${c.slug}`} className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3.5 py-1.5 leading-none font-medium transition hover:-translate-y-0.5 hover:border-brand hover:text-brand">
                    {c.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Photo collage */}
          <Reveal dir="right" className="relative mx-auto h-[420px] w-full max-w-md sm:h-[500px]">
            <div className="absolute right-0 top-0 h-[85%] w-[78%] overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-2xl shadow-brand/20 ring-8 ring-white">
              <Image src={unsplash(IMG.hero, 900)} alt="Woman with healthy shiny hair" fill priority sizes="(min-width: 1024px) 340px, 70vw" className="object-cover" />
            </div>
            <div className="animate-float absolute bottom-0 left-0 h-[42%] w-[44%] overflow-hidden rounded-3xl shadow-xl ring-8 ring-white">
              <Image src={unsplash(IMG.curly2, 600)} alt="Defined curls" fill sizes="200px" className="object-cover" />
            </div>
            <div className="animate-float-delay absolute left-0 top-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-lg">🌿</span>
              <div className="text-left text-sm"><p className="font-semibold">Tested remedies</p><p className="text-xs text-gray-500">Simple &amp; natural</p></div>
            </div>
            <div className="animate-float absolute -right-2 bottom-16 rounded-2xl bg-white px-4 py-3 text-sm shadow-xl sm:right-[-14px]">
              <p className="font-semibold text-brand">✨ Shine · Strength</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ad: below header */}
      <div className="mx-auto max-w-6xl px-4 pt-2">
        <AdSlot slot="homeTop" height={90} />
      </div>

      {/* Tips marquee */}
      <div className="marquee mt-10 overflow-hidden border-y border-gray-100 bg-ink py-4 text-white">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...TIPS, ...TIPS].map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-medium tracking-wide">
              {t} <span className="text-brand">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Category boxes */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Shop by <span className="text-brand">Hair Concern</span></h2>
          <p className="mt-2 text-gray-600">Pick what matches your hair and start there.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 120} dir="zoom">
              <Link href={`/category/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-lg transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/30">
                <Image src={c.image} alt={c.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                    {getPostsByCategory(c.slug).length} articles
                  </span>
                  <h3 className="mt-3 text-3xl font-bold">{c.name}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{c.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 font-semibold">
                    Explore <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Latest articles */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Fresh reads</p>
              <h2 className="mt-1 text-3xl font-bold sm:text-4xl">Latest Articles</h2>
            </div>
          </Reveal>
          {featured ? (
            <>
              <Reveal className="mb-6"><ArticleCard post={featured} featured /></Reveal>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.slice(0, 5).map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 100}><ArticleCard post={p} /></Reveal>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No articles yet.</p>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Hair care, <span className="text-brand">made simple</span></h2>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 150}>
              <div className="group relative h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-xl">
                <span className="absolute right-6 top-4 text-6xl font-bold text-brand/10 transition-colors group-hover:text-brand/20">{s.n}</span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand group-hover:text-white">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-gray-600">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Newsletter */}
      <Newsletter />
    </>
  );
}
