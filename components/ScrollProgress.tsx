"use client";

import { useEffect, useState } from "react";

/** Thin pink reading-progress bar at the top of the screen. */
export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-transparent" aria-hidden>
      <div className="h-full bg-gradient-to-r from-brand to-orange-300" style={{ width: `${p}%` }} />
    </div>
  );
}
