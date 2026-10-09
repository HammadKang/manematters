"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = { slug: string; title: string; category: string };

/** Live search over all articles (index is passed from the server, no extra API needed). */
export default function SearchBar({ items, compact = false }: { items: Item[]; compact?: boolean }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return items.filter((i) => i.title.toLowerCase().includes(term)).slice(0, 6);
  }, [q, items]);

  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor={compact ? "search-side" : "search-hero"}>Search articles</label>
      <input
        id={compact ? "search-side" : "search-hero"}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search hair tips…"
        autoComplete="off"
        className={`w-full rounded-full border border-gray-200 bg-white pl-5 pr-12 text-ink shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 ${
          compact ? "py-2.5 text-sm" : "py-3.5 text-base"
        }`}
      />
      <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
      </svg>
      {q.trim().length >= 2 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-lg">
          {results.length ? (
            results.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="block px-5 py-3 text-sm hover:bg-brand-soft">
                  {r.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-5 py-3 text-sm text-gray-500">No articles found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
