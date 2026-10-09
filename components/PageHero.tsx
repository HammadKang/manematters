import Image from "next/image";
import Reveal from "./Reveal";

/** Photo banner used at the top of category / about / contact pages. */
export default function PageHero({
  image,
  eyebrow,
  title,
  children,
}: {
  image: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={image} alt="" fill priority sizes="100vw" className="animate-ken -z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <Reveal className="mx-auto max-w-6xl px-4 py-20 text-white sm:py-28">
        {eyebrow && <div className="mb-3 text-sm text-white/80">{eyebrow}</div>}
        <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {children && <p className="mt-4 max-w-xl text-lg text-white/85">{children}</p>}
      </Reveal>
    </section>
  );
}
