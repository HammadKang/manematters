import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import rehypeSlug from "rehype-slug";
import AdSlot from "./AdSlot";

const components = {
  // Markdown images ![alt](/images/x.jpg) become optimized next/image automatically
  img: ({ src, alt }: ComponentProps<"img">) =>
    typeof src === "string" ? (
      <Image src={src} alt={alt || ""} width={1200} height={675} sizes="(min-width: 1024px) 700px, 100vw" className="h-auto w-full rounded-xl" />
    ) : null,
  // Use <Callout>...</Callout> inside any article for a highlighted tip box
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 rounded-xl border-l-4 border-brand bg-brand-soft p-5 [&>p]:my-0">{children}</div>
  ),
};

const opts = { mdxOptions: { rehypePlugins: [rehypeSlug] } };

/**
 * Renders the article. The in-content ad is inserted automatically
 * in the middle of the article (before the middle H2).
 */
export default function MdxContent({ source }: { source: string }) {
  const sections = source.split(/\n(?=## )/);
  const mid = Math.ceil(sections.length / 2);
  const first = sections.slice(0, mid).join("\n");
  const second = sections.slice(mid).join("\n");

  return (
    <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-img:rounded-xl">
      <MDXRemote source={first} components={components} options={opts} />
      <AdSlot slot="inContent" className="not-prose my-8" width={336} height={280} />
      {second && <MDXRemote source={second} components={components} options={opts} />}
    </div>
  );
}
