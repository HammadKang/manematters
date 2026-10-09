"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { IMG, unsplash } from "@/lib/images";
import { ADSENSE } from "@/lib/site";

type SlotKey = keyof typeof ADSENSE.slots;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * One component for every ad position.
 * - With NEXT_PUBLIC_ADSENSE_CLIENT + the slot id set: renders a real Google AdSense unit.
 * - Otherwise: renders a labelled SAMPLE ad so you can see how the page looks with ads.
 */
export default function AdSlot({
  slot,
  className = "",
  width,
  height,
}: {
  slot: SlotKey;
  className?: string;
  width?: number;
  height: number;
}) {
  const slotId = ADSENSE.slots[slot];
  const live = Boolean(ADSENSE.client && slotId);

  useEffect(() => {
    if (!live) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [live]);

  const box = { maxWidth: width, minHeight: height };

  if (live) {
    return (
      <div className={`mx-auto w-full overflow-hidden ${className}`} style={box}>
        <ins
          className="adsbygoogle block"
          style={{ display: "block", minHeight: height }}
          data-ad-client={ADSENSE.client}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  const wide = !width; // leaderboard-style strip
  const sparkles = [
    { t: "12%", l: "46%", d: "0s", s: 14 },
    { t: "68%", l: "58%", d: ".8s", s: 10 },
    { t: "25%", l: "88%", d: "1.4s", s: 16 },
    { t: "78%", l: "30%", d: "2s", s: 12 },
  ];

  return (
    <div className={`mx-auto w-full ${className}`} style={{ maxWidth: width }}>
      <Link
        href="/contact"
        aria-label="Advertise with ManeMatters"
        className="ad-border group block rounded-[20px] p-[2px] shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/30"
      >
        <div className="relative flex w-full overflow-hidden rounded-[18px] bg-ink text-white" style={{ minHeight: height - 4 }}>
          <Image
            src={unsplash(wide ? IMG.tools : IMG.mask, 900)}
            alt=""
            fill
            sizes={wide ? "(min-width: 1152px) 1100px, 100vw" : "340px"}
            className="animate-ken object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/65 to-brand/50" />
          <div className="absolute -right-10 -top-10 h-40 w-40 animate-blob rounded-full bg-brand/40 blur-3xl" />
          {sparkles.map((sp, i) => (
            <span key={i} aria-hidden className="ad-sparkle absolute text-white" style={{ top: sp.t, left: sp.l, fontSize: sp.s, animationDelay: sp.d }}>✦</span>
          ))}

          <div className={`relative flex w-full ${wide ? "flex-col items-start justify-center gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8" : "flex-col items-center justify-center gap-3 p-6 text-center"}`}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Premium hair care</p>
              <p className={`mt-1 font-bold leading-tight ${wide ? "text-xl sm:text-2xl" : "text-2xl"}`}>
                Your brand <span className="gradient-text">here</span>
              </p>
              <p className="mt-1 text-xs text-white/80 sm:text-sm">Reach thousands who care about healthy hair.</p>
            </div>
            <span className="ad-cta btn-shine inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold shadow-lg transition-colors group-hover:bg-brand-dark">
              Advertise with us <span className="ad-arrow">→</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
