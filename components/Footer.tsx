import Link from "next/link";
import Logo from "./Logo";
import { CATEGORIES } from "@/lib/categories";
import { SITE } from "@/lib/site";

const SOCIALS = [
  { name: "Instagram", d: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5h.01" },
  { name: "Facebook", d: "M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" },
  { name: "YouTube", d: "M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8zm7 1v6l5-3-5-3z" },
  { name: "Pinterest", d: "M12 3a9 9 0 00-3.3 17.4c-.1-.7-.1-1.8 0-2.6l1-4.2s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.6 1.1 1.2 0 .8-.5 1.9-.7 2.9-.2.9.4 1.6 1.3 1.6 1.5 0 2.7-1.6 2.7-4 0-2.1-1.5-3.5-3.6-3.5a3.7 3.7 0 00-3.8 3.7c0 .7.3 1.5.7 1.9" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-1 text-sm font-medium text-brand">{SITE.tagline}</p>
          <p className="mt-3 text-sm text-gray-600">
            Simple, tested hair care advice you can actually follow.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Categories</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="hover:text-brand">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><Link href="/about" className="hover:text-brand">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand">Contact Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-brand">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Follow Us</h3>
          <div className="mt-3 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-brand hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-5 text-center text-sm text-gray-500">
        © 2026 ManeMatters. All rights reserved.
      </div>
    </footer>
  );
}
