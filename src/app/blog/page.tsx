import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import NewsletterForm from "@/components/NewsletterForm";

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const posts = getAllPosts();
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category as string | undefined;

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
    : posts;

  // Extract unique categories for the filter chips
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. HERO */}
      <section className="py-24 px-4 text-center bg-surface2 border-b border-bordersub relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">The Journal</span>
          <h1 className="font-serif text-5xl md:text-7xl text-rosegold mb-6 tracking-wide drop-shadow-sm">
            Research & Insights
          </h1>
          <p className="font-serif text-2xl text-champagne leading-relaxed max-w-2xl mx-auto">
            Deep dives into peptide purity, compounding science, and laboratory best practices.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* CATEGORY FILTER CHIPS */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/blog"
            className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all border ${
              !activeCategory
                ? "bg-rosegold text-base border-rosegold"
                : "bg-transparent text-textsub border-bordersub hover:border-rosegold hover:text-rosegold"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat.toLowerCase()}`}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all border ${
                activeCategory?.toLowerCase() === cat.toLowerCase()
                  ? "bg-rosegold text-base border-rosegold"
                  : "bg-transparent text-textsub border-bordersub hover:border-rosegold hover:text-rosegold"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* POSTS GRID */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.slug} className="card-elevated group flex flex-col overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block relative w-full aspect-[16/10] bg-surface2 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-textmuted bg-surface2 z-0">
                    <span className="font-serif text-sm opacity-30 px-4 text-center">Image Placeholder</span>
                  </div>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 z-10 opacity-80 mix-blend-luminosity hover:mix-blend-normal"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-surface/80 backdrop-blur-sm text-mauve text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-bordersub">
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-textmuted mb-4">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-bordersub"></span>
                    <span>{post.readingTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-serif text-2xl text-rosegold mb-3 hover:text-rosegoldhi transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-textsub text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-bordersub">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs uppercase tracking-widest text-champagne hover:text-rosegoldhi transition-colors inline-flex items-center gap-2 group/link"
                    >
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-bordersub rounded-2xl bg-surface2/50">
            <h3 className="font-serif text-2xl text-rosegold mb-2">No articles found</h3>
            <p className="text-textsub">Check back soon for new research insights.</p>
          </div>
        )}
      </section>

      {/* NEWSLETTER BAND */}
      <section className="py-24 bg-base border-t border-bordersub text-center px-4 mt-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl text-rosegold mb-4">Stay Informed</h2>
          <p className="text-textsub mb-10">Join our journal to receive the latest purity reports and catalog updates.</p>
          <NewsletterForm ctaText="Subscribe" />
        </div>
      </section>
    </div>
  );
}
