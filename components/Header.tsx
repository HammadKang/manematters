"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/category/curly-hair", label: "Curly Hair" },
  { href: "/category/straight-hair", label: "Straight Hair" },
  { href: "/category/hair-fall", label: "Hair Fall" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (href: string, label: string, mobile = false) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return (
      <Link
        key={href}
        href={href}
        onClick={() => setOpen(false)}
        className={`${mobile ? "block py-3 text-base" : "group relative text-sm"} font-medium transition-colors hover:text-brand ${
          active ? "text-brand" : "text-ink"
        }`}
      >
        {label}
        {!mobile && (
          <span className={`absolute -bottom-1 left-0 h-0.5 rounded bg-brand transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
        )}
      </Link>
    );
  };

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "border-gray-100 shadow-md" : "border-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV.map((n) => link(n.href, n.label))}
        </nav>
        <button
          className="rounded-md p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="animate-slide-down border-t border-gray-100 bg-white px-4 pb-3 md:hidden" aria-label="Mobile">
          {NAV.map((n) => link(n.href, n.label, true))}
        </nav>
      )}
    </header>
  );
}
