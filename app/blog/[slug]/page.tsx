import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import AuthorBox from "@/components/AuthorBox";
import ArticleCard from "@/components/ArticleCard";
import MdxContent from "@/components/MdxContent";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import SearchBar from "@/components/SearchBar";
import ShareButtons from "@/components/ShareButtons";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";
import { getToc } from "@/lib/toc";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const cat = getCategory(post.category)!;
  const all = getAllPosts();
  const recent = all.slice(0, 5);
  const related = getRelatedPosts(post, 3);
  const searchItems = all.map((p) => ({ slug: p.slug, title: p.title, category: p.category }));

  const toc = getToc(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${SITE.url}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ScrollProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">Home</Link> <span className="mx-1">&gt;</span>{" "}
        <Link href={`/category/${cat.slug}`} className="hover:text-brand">{cat.name}</Link>{" "}
        <span className="mx-1">&gt;</span> <span className="text-ink">{post.title}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[7fr_3fr]">
        {/* Main column (70%) */}
        <article className="min-w-0">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-gray-500">
            By <span className="font-medium text-ink">{post.author}</span> · {formatDate(post.date)} · {post.readingTime} min read
          </p>

          {/* Ad: below title */}
          <AdSlot slot="belowTitle" className="my-6" height={90} />

          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-brand-soft shadow-xl">
            <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
          </div>

          {toc.length > 2 && (
            <nav aria-label="In this article" className="mt-8 rounded-2xl border border-brand/20 bg-brand-soft/60 p-5">
              <p className="font-semibold">In this article</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {toc.map((t) => (
                  <li key={t.id} className={t.level === 3 ? "ml-4" : ""}>
                    <a href={`#${t.id}`} className="text-gray-700 transition hover:text-brand hover:underline">{t.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="mt-8">
            <MdxContent source={post.content} />
          </div>

          <AuthorBox />

          <div className="mt-10 border-t border-gray-100 pt-6">
            <ShareButtons title={post.title} />
          </div>
        </article>

        {/* Sidebar (30%) */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div>
            <h2 className="mb-3 text-lg font-semibold">Search</h2>
            <SearchBar items={searchItems} compact />
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold">Categories</h2>
            <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="flex justify-between px-4 py-3 text-sm hover:bg-brand-soft hover:text-brand">
                    {c.name} <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold">Recent Articles</h2>
            <ul className="space-y-4">
              {recent.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex gap-3">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-soft">
                      <Image src={p.image} alt="" fill sizes="80px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <span className="text-sm font-medium leading-snug group-hover:text-brand">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <AdSlot slot="sidebar" width={300} height={250} />
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => <Reveal key={p.slug} delay={i * 100}><ArticleCard post={p} /></Reveal>)}
          </div>
        </section>
      )}
    </div>
  );
}
