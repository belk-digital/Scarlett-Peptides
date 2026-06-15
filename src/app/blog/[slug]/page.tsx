import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { getAllProducts } from "@/data/products";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // A very simple heuristic to find mentioned products based on the post category or content
  // In a real app, you might specify related product slugs in the MDX frontmatter.
  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter(p => post.content.toLowerCase().includes(p.name.toLowerCase()) || p.category === post.category)
    .slice(0, 2);

  const allBlogPosts = getAllPosts();
  const currentIndex = allBlogPosts.findIndex(p => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? allBlogPosts[currentIndex - 1] : null; // Newer post
  const prevPost = currentIndex < allBlogPosts.length - 1 ? allBlogPosts[currentIndex + 1] : null; // Older post

  return (
    <div className="flex flex-col w-full min-h-screen bg-base">
      
      {/* 1. HERO HEADER */}
      <section className="pt-24 pb-16 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest text-textmuted mb-6">
            <span className="text-mauve border border-mauve/30 px-3 py-1 rounded-full">{post.category}</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="w-1 h-1 rounded-full bg-bordersub"></span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-rosegold mb-8 tracking-wide leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* 2. COVER IMAGE */}
      <section className="px-4 max-w-5xl mx-auto w-full mb-16">
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden card-elevated">
          <div className="absolute inset-0 flex items-center justify-center text-textmuted bg-surface2 z-0">
            <span className="font-serif text-sm opacity-30 px-4 text-center">Hero Image Placeholder</span>
          </div>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover z-10 opacity-90 mix-blend-luminosity"
          />
        </div>
      </section>

      <section className="px-4 pb-24 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 items-start">
        
        {/* 3. MDX CONTENT BODY */}
        {/* 
          Using @tailwindcss/typography (prose).
          We customize colors inline to match the dark theme without polluting global css.
        */}
        <div className="w-full lg:w-2/3 prose prose-invert max-w-none 
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-rosegoldhi
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:text-rosegold
          prose-p:text-textsub prose-p:leading-relaxed prose-p:font-light
          prose-a:text-rosegold prose-a:underline hover:prose-a:text-rosegoldhi
          prose-strong:text-textmain prose-strong:font-medium
          prose-ul:text-textsub prose-li:marker:text-champagne
          prose-blockquote:border-l-rosegold prose-blockquote:bg-surface2/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-serif prose-blockquote:text-champagne prose-blockquote:italic
        ">
          <ReactMarkdown>{post.content}</ReactMarkdown>
          
          {/* 3b. PREV / NEXT LINKS */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-bordersub not-prose gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col w-full sm:w-1/2 text-left">
                <span className="text-[10px] uppercase tracking-widest text-textmuted mb-1 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 transform transition-transform group-hover:-translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Previous Article
                </span>
                <span className="font-serif text-rosegold group-hover:text-rosegoldhi transition-colors truncate">{prevPost.title}</span>
              </Link>
            ) : <div className="w-full sm:w-1/2"></div>}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col w-full sm:w-1/2 text-right sm:items-end">
                <span className="text-[10px] uppercase tracking-widest text-textmuted mb-1 flex items-center justify-end gap-2">
                  Next Article
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 transform transition-transform group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
                <span className="font-serif text-rosegold group-hover:text-rosegoldhi transition-colors truncate text-right w-full">{nextPost.title}</span>
              </Link>
            ) : <div className="w-full sm:w-1/2"></div>}
          </div>
        </div>

        {/* 4. SIDEBAR CTA */}
        <aside className="w-full lg:w-1/3 sticky top-32">
          
          <div className="card-elevated p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-rosegold/50"></div>
            <h3 className="font-serif text-2xl text-rosegold mb-4">Shop the Research</h3>
            <p className="text-sm text-textsub mb-8 leading-relaxed">
              Explore the laboratory-grade compounds discussed in this article. Fulfilled by 99 Purity Peptides.
            </p>
            
            {relatedProducts.length > 0 ? (
              <div className="space-y-4 text-left">
                {relatedProducts.map(product => (
                  <Link key={product.slug} href={`/product/${product.slug}`} className="flex items-center gap-4 group bg-surface2 border border-bordersub p-3 rounded-xl hover:border-rosegold/50 transition-all">
                    <div className="relative w-16 h-16 rounded-lg bg-base overflow-hidden shrink-0">
                      <Image src={product.image} alt={product.name} fill className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-serif text-rosegold truncate">{product.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-textmuted mt-1">View Compound</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <Link 
                href="/shop"
                className="bg-transparent text-rosegold border border-rosegold px-8 py-3 rounded-full font-medium tracking-widest uppercase text-xs hover:bg-rosegold hover:text-base transition-all inline-block w-full"
              >
                View Full Catalog
              </Link>
            )}
          </div>

          <Link href="/blog" className="flex items-center justify-center gap-2 text-sm text-textsub hover:text-rosegold transition-colors py-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Journal
          </Link>
        </aside>

      </section>
    </div>
  );
}
