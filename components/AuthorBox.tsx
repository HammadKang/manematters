import Link from "next/link";
import { AUTHOR } from "@/lib/site";

export default function AuthorBox() {
  return (
    <aside className="mt-10 flex gap-4 rounded-2xl border border-brand/20 bg-brand-soft/60 p-5">
      <div
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-xl font-bold text-white"
      >
        {AUTHOR.name[0]}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">Written by</p>
        <p className="font-semibold">{AUTHOR.name}</p>
        <p className="mt-1 text-sm text-gray-700">{AUTHOR.bio}</p>
        <p className="mt-2 text-xs text-gray-500">
          General information only, not medical advice. See our <Link href="/disclaimer" className="underline hover:text-brand">disclaimer</Link>.
        </p>
      </div>
    </aside>
  );
}
