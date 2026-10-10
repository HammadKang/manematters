import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "ManeMatters content is for general information only and is not medical advice.",
  alternates: { canonical: "/disclaimer" },
  openGraph: { url: "/disclaimer", title: "Disclaimer | ManeMatters" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Dis<span className="text-brand">claimer</span></h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>
      <div className="prose mt-6 max-w-none">
        <h2>Not medical advice</h2>
        <p>
          The articles on {SITE.name} are for general information and education only. They are not a
          substitute for advice from a doctor, dermatologist or trichologist. If you have sudden or heavy
          hair loss, scalp pain, infection, or a skin condition, please see a qualified medical professional.
        </p>
        <h2>Results vary</h2>
        <p>
          Hair type, health, diet, climate and many other factors affect results. A tip that works for one
          person may not work for another, and we cannot promise any specific result.
        </p>
        <h2>Patch test first</h2>
        <p>
          Home remedies and products can cause allergic reactions or irritation. Always do a patch test
          before using a new ingredient, and stop immediately if you feel burning, itching or redness.
        </p>
        <h2>Author background</h2>
        <p>
          Content is written by Aiman Khan Babar, who has completed a cosmetology/beautician course. She is
          not a medical doctor.
        </p>
        <h2>Advertising and links</h2>
        <p>
          This site may display advertisements, including Google AdSense. We are not responsible for the
          content of advertisers or external websites we link to.
        </p>
        <h2>Contact</h2>
        <p>Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </div>
  );
}
