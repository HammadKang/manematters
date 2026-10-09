import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { IMG, unsplash } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description: "ManeMatters shares simple, tested hair care advice for curly, straight and hair fall problems.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Us | ManeMatters", images: [unsplash(IMG.stylist, 1200)] },
};

const VALUES = [
  { t: "Tested, not trendy", d: "We focus on remedies that are realistic to try at home, and we are honest about their limits." },
  { t: "Simple steps", d: "No 15-product routines. Clear steps you can follow on a busy day." },
  { t: "Every hair type", d: "Curls, straight strands or shedding worries: there is a guide for you." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero image={unsplash(IMG.curly3, 2000)} title={<>About <span className="text-brand">ManeMatters</span></>}>
        Simple, tested hair care advice for people tired of confusing tips.
      </PageHero>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2">
        <Reveal dir="left" className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
          <Image src={unsplash(IMG.stylist, 1200)} alt="Hair stylist at work" fill sizes="(min-width: 1024px) 550px, 100vw" className="object-cover" />
        </Reveal>
        <Reveal dir="right">
          <h2 className="text-3xl font-bold">What we <span className="text-brand">do</span></h2>
          <div className="prose prose-lg mt-4">
            <p>
              ManeMatters is a hair care blog covering three things and doing them well: curly hair, straight
              hair, and hair fall.
            </p>
            <p>
              Every article is built around simple routines and remedies that are practical to try at home. We
              explain the &ldquo;why&rdquo; behind each tip so you can adjust it to your own hair.
            </p>
            {/* TODO: replace with your real story / team details */}
          </div>
        </Reveal>
      </div>

      <section className="bg-brand-soft/60 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 120}>
              <div className="h-full rounded-3xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-4 h-1.5 w-12 rounded bg-brand" />
                <h3 className="text-xl font-semibold">{v.t}</h3>
                <p className="mt-2 text-gray-600">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14">
        <Reveal>
          <div className="rounded-2xl border-l-4 border-brand bg-gray-50 p-6 text-gray-700">
            <strong>A quick note:</strong> our content is for general information and is not medical advice. If you
            have sudden or heavy hair loss, scalp pain, or a skin condition, please see a doctor or dermatologist.
          </div>
        </Reveal>
      </div>
    </>
  );
}
