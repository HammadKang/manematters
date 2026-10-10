import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using the ManeMatters website.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title: "Terms of Use | ManeMatters" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Terms of <span className="text-brand">Use</span></h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>
      <div className="prose mt-6 max-w-none">
        <p>By using {SITE.name} you agree to these terms. If you do not agree, please do not use the site.</p>
        <h2>Use of content</h2>
        <p>
          All articles, text and design on this site belong to {SITE.name} unless stated otherwise. You may
          share links and short quotes with credit, but you may not copy or republish full articles without
          our written permission.
        </p>
        <h2>No medical advice</h2>
        <p>
          Content is for general information only. Please read our <a href="/disclaimer">Disclaimer</a>.
        </p>
        <h2>Your responsibility</h2>
        <p>
          You use any tip, remedy or product at your own risk. We are not liable for any loss, damage or
          reaction resulting from using information on this site.
        </p>
        <h2>External links and ads</h2>
        <p>We are not responsible for third-party websites or advertisements shown on or linked from this site.</p>
        <h2>Changes</h2>
        <p>We may update these terms at any time. Continued use of the site means you accept the changes.</p>
        <h2>Contact</h2>
        <p>Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </div>
  );
}
