import { NextResponse } from "next/server";

/**
 * Receives the contact form. Right now it only validates and logs the message
 * (visible in Vercel -> Logs). To actually get an email, call Resend / Formspree /
 * Nodemailer here and send to SITE.email.
 */
export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(() => ({}));
  if (!name || !message || !/^\S+@\S+\.\S+$/.test(String(email))) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  console.log("[contact]", { name, email, message });
  return NextResponse.json({ ok: true });
}
