"use client";

import { useEffect, useRef } from "react";

/** Fades/slides children in when they scroll into view. */
export default function Reveal({
  children,
  delay = 0,
  dir = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  dir?: "up" | "left" | "right" | "zoom";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-dir={dir} className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
