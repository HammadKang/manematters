import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CATEGORIES, getCategory, type CategorySlug } from "./categories";
import { resolveImage } from "./images";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  category: CategorySlug;
  image: string;
  readingTime: number; // minutes
};

export type Post = PostMeta & { content: string };

function readPost(file: string): Post | null {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  if (data.draft) return null; // draft: true -> hidden from the site

  const category = data.category as CategorySlug;
  if (!CATEGORIES.some((c) => c.slug === category)) {
    throw new Error(
      `[${file}] invalid category "${data.category}". Use one of: ${CATEGORIES.map((c) => c.slug).join(", ")}`
    );
  }
  for (const key of ["title", "description", "date"]) {
    if (!data[key]) throw new Error(`[${file}] missing "${key}" in front matter`);
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    // gray-matter turns bare YYYY-MM-DD into a Date; normalise back to a string
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    author: data.author || "ManeMatters Team",
    category,
    image: data.image ? resolveImage(String(data.image)) : getCategory(category)!.image,
    readingTime: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);
export const getPostsByCategory = (c: CategorySlug) => getAllPosts().filter((p) => p.category === c);

/** Same-category posts first, topped up with other recent posts if fewer than `limit`. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

export const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
