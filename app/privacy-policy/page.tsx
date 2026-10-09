import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ManeMatters collects, uses and protects information, including cookies and advertising.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: { url: "/privacy-policy", title: "Privacy Policy | ManeMatters" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Privacy <span className="text-brand">Policy</span></h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: October 2026</p>
      <div className="prose mt-6 max-w-none">
        <p>
          This policy explains what information {SITE.name} (&ldquo;we&rdquo;) may collect when you visit
          our website and how it is used. This is a starter template; please review it with a legal
          professional before relying on it.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>Log data such as browser type, pages visited and time on site (via analytics tools).</li>
          <li>Your email address, if you choose to subscribe to our newsletter or contact us.</li>
        </ul>
        <h2>Cookies and advertising</h2>
        <p>
          We may use cookies to understand site usage. Third-party vendors, including Google, may use
          cookies to serve ads based on your visits to this and other websites. You can opt out of
          personalised advertising at{" "}
          <a href="https://www.google.com/settings/ads" rel="noopener noreferrer">Google Ads Settings</a>.
        </p>
        <h2>Third-party links</h2>
        <p>Our articles may link to other websites. We are not responsible for their privacy practices.</p>
        <h2>Your choices</h2>
        <p>You can unsubscribe from emails at any time, or ask us to delete your data.</p>
        <h2>Contact</h2>
        <p>Questions about this policy? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </div>
  );
}
