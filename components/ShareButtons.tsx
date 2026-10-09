"use client";

import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => (typeof window !== "undefined" ? window.location.href : "");

  const open = (base: string) => window.open(base, "_blank", "noopener,noreferrer,width=600,height=500");
  const btn =
    "flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold">Share:</span>
      <button className={btn} onClick={() => open(`https://wa.me/?text=${encodeURIComponent(title + " " + url())}`)}>WhatsApp</button>
      <button className={btn} onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`)}>Facebook</button>
      <button className={btn} onClick={() => open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url())}&description=${encodeURIComponent(title)}`)}>Pinterest</button>
      <button
        className={btn}
        onClick={async () => {
          try { await navigator.clipboard.writeText(url()); } catch {}
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? "✓ Copied" : "Copy link"}
      </button>
    </div>
  );
}
