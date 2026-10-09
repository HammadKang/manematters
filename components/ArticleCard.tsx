import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/lib/categories";
import { formatDate, type PostMeta } from "@/lib/posts";

export default function ArticleCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  const cat = getCategory(post.category);
  return (
    <article
      className={`group h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/15 ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className={featured ? "contents" : "block"}>
        <div className={`relative overflow-hidden bg-brand-soft ${featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[360px]" : "aspect-[16/10]"}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={featured ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand shadow backdrop-blur">
            {cat?.name}
          </span>
        </div>
        <div className={`flex flex-col ${featured ? "justify-center p-8 lg:p-10" : "p-6"}`}>
          <p className="text-xs font-medium text-gray-500">
            {formatDate(post.date)} · {post.readingTime} min read
          </p>
          <h3 className={`mt-2 font-semibold leading-snug transition-colors group-hover:text-brand ${featured ? "text-2xl lg:text-3xl" : "text-lg"}`}>
            {post.title}
          </h3>
          <p className={`mt-3 text-gray-600 ${featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm"}`}>{post.description}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
            Read article <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
