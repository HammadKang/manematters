import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { IMG, unsplash } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the ManeMatters team for questions, feedback or collaborations.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact Us | ManeMatters", images: [unsplash(IMG.hero, 1200)] },
};

export default function ContactPage() {
  return (
    <>
      <PageHero image={unsplash(IMG.straight2, 2000)} title={<>Let&apos;s <span className="text-brand">talk hair</span></>}>
        Questions, feedback or collaboration ideas? We&apos;d love to hear from you.
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-5">
        <Reveal dir="left" className="lg:col-span-3">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
            <ContactForm />
          </div>
        </Reveal>

        <Reveal dir="right" className="space-y-6 lg:col-span-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <Image src={unsplash(IMG.tools, 1000)} alt="Hair styling tools" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
          </div>
          <div className="rounded-3xl bg-brand-soft p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">Email us</p>
            <a href={`mailto:${SITE.email}`} className="mt-1 block text-xl font-semibold hover:text-brand">{SITE.email}</a>
            <p className="mt-2 text-sm text-gray-600">We usually reply within 1-2 working days.</p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
