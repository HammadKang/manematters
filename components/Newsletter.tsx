"use client";

import Image from "next/image";
import { useState } from "react";
import { IMG, unsplash } from "@/lib/images";
import Reveal from "./Reveal";
import SuccessModal from "./SuccessModal";

/** Shows the popup only. TODO: connect Mailchimp/ConvertKit/etc. to actually collect emails. */
export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="relative isolate overflow-hidden">
      <Image src={unsplash(IMG.newsletter, 1800)} alt="" fill sizes="100vw" className="animate-ken -z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/90 via-brand-dark/85 to-black/70" />
      <div className="animate-blob absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      <Reveal className="mx-auto max-w-2xl px-4 py-20 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Join the ManeMatters family</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Get Hair Tips Weekly</h2>
        <p className="mt-3 text-white/85">One short email a week. Tested remedies, no spam.</p>
        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            setDone(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            aria-label="Email address"
            className="flex-1 rounded-full bg-white px-6 py-3.5 text-ink outline-none ring-2 ring-transparent transition focus:ring-white/60"
          />
          <button className="btn-shine rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-black">
            Subscribe
          </button>
        </form>
      </Reveal>
      {done && (
        <SuccessModal title="You're subscribed!" message="Welcome to ManeMatters. Your weekly hair tips will land in your inbox soon." onClose={() => setDone(false)} />
      )}
    </section>
  );
}
