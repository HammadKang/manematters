import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-5xl font-bold text-brand">404</h1>
      <p className="mt-3 text-gray-600">Sorry, we couldn&apos;t find that page.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark">Back to Home</Link>
    </div>
  );
}
