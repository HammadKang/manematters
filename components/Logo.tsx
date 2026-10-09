import Link from "next/link";

export default function Logo({ className = "text-2xl" }: { className?: string }) {
  return (
    <Link href="/" className={`font-bold tracking-tight ${className}`} aria-label="ManeMatters home">
      <span className="text-ink">Mane</span>
      <span className="text-brand">Matters</span>
    </Link>
  );
}
