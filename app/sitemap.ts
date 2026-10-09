import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/contact", "/privacy-policy"].map((p) => ({ url: `${SITE.url}${p}` }));
  const cats = CATEGORIES.map((c) => ({ url: `${SITE.url}/category/${c.slug}` }));
  const posts = getAllPosts().map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: p.date }));
  return [...pages, ...cats, ...posts];
}
