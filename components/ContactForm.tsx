"use client";

import { useState } from "react";
import SuccessModal from "./SuccessModal";

const field =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30";

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Your name</label>
          <input id="name" name="name" required minLength={2} placeholder="Ayesha Khan" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Your email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={field} />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
          <textarea id="message" name="message" required minLength={5} rows={5} placeholder="How can we help?" className={field} />
        </div>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <button
          disabled={sending}
          className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark disabled:opacity-70"
        >
          {sending && <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white" style={{ animation: "spin .7s linear infinite" }} />}
          {sending ? "Sending…" : "Send Message"}
        </button>
      </form>

      {sent && (
        <SuccessModal title="Message sent!" message="Thank you for reaching out. We'll get back to you soon." onClose={() => setSent(false)} />
      )}
    </>
  );
}
