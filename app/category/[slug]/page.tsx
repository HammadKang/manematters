import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategory((await params).slug);
  if (!cat) return {};
  const title = `${cat.name} Tips & Remedies`;
  return {
    title,
    description: cat.description,
    alternates: { canonical: `/category/${cat.slug}` },
    openGraph: { title, description: cat.description, url: `/category/${cat.slug}`, images: [cat.image] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const cat = getCategory((await params).slug);
  if (!cat) notFound();
  const posts = getPostsByCategory(cat.slug);

  return (
    <>
      <PageHero
        image={cat.image}
        eyebrow={
          <nav aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-1">&gt;</span> {cat.name}
          </nav>
        }
        title={<>{cat.name} <span className="text-brand">Articles</span></>}
      >
        {cat.description}
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="mb-8 text-sm font-medium text-gray-500">{posts.length} {posts.length === 1 ? "article" : "articles"}</p>
        {posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 100}><ArticleCard post={p} /></Reveal>)}
          </div>
        ) : (
          <p className="text-gray-500">New articles coming soon.</p>
        )}
      </div>
    </>
  );
}
