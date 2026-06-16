"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/animations/TiltCard";
import NewsletterForm from "@/components/NewsletterForm";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/lib/blog";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
    : posts;

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#050505] text-white">
      {/* 1. HERO - Cinematic Full Bleed */}
      <section className="relative pt-40 pb-32 md:pt-56 md:pb-48 px-4 text-center overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/img-4.webp"
            alt="Laboratory background"
            fill
            className="object-cover opacity-40 grayscale mix-blend-luminosity scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] uppercase text-white/50 mb-6 block">
              The Journal
            </span>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-wide leading-[1.1]">
              Research &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#e5e5e5] font-light">
                Insights
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto font-sans">
              Deep dives into peptide purity, compounding science, and laboratory best practices.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 -mt-20">
        
        {/* CATEGORY FILTER CHIPS - Glassmorphism */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-16 md:mb-24 relative z-20">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 border backdrop-blur-md ${
                !activeCategory
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 border backdrop-blur-md ${
                  activeCategory === cat
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "bg-white/5 text-white/50 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {filteredPosts.length > 0 ? (
          <>
            {/* FEATURED POST */}
            {featuredPost && (
              <ScrollReveal direction="up" delay={0.3}>
                <Link href={`/blog/${featuredPost.slug}`} className="group block mb-16 md:mb-24">
                  <TiltCard className="w-full">
                    <div className="relative w-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                      {/* Image Side */}
                      <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 md:hidden" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050505] z-10 hidden md:block" />
                        <Image
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      {/* Content Side */}
                      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-20">
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/50 mb-6 font-sans">
                          <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20"></span>
                          <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {featuredPost.readingTime}</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 group-hover:text-white/90 transition-colors leading-[1.2]">
                          {featuredPost.title}
                        </h2>
                        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 font-light line-clamp-3 md:line-clamp-none">
                          {featuredPost.excerpt}
                        </p>
                        <div className="mt-auto">
                          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white">
                            <span className="border-b border-white/30 pb-1 group-hover:border-white transition-colors">Read Article</span>
                            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            )}

            {/* GRID POSTS */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {gridPosts.map((post, idx) => (
                  <ScrollReveal key={post.slug} direction="up" delay={0.1 + idx * 0.1} className="h-full">
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <TiltCard className="h-full">
                        <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden flex flex-col hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 shadow-lg relative">
                          
                          {/* Hover Shine Effect */}
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30"></div>

                          {/* Image Header */}
                          <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/50">
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105 z-10 opacity-90 mix-blend-luminosity group-hover:mix-blend-normal"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20 pointer-events-none" />
                            <div className="absolute top-4 left-4 z-30">
                              <span className="bg-black/50 backdrop-blur-md text-white/70 border border-white/10 text-[9px] tracking-widest uppercase px-3 py-1 rounded-full group-hover:text-white group-hover:border-white/30 transition-all">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          
                          {/* Content Body */}
                          <div className="p-6 md:p-8 flex flex-col flex-grow relative z-30">
                            <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-white/40 mb-4 font-sans">
                              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <span className="w-1 h-1 rounded-full bg-white/20"></span>
                              <span>{post.readingTime}</span>
                            </div>
                            <h3 className="font-serif text-xl md:text-2xl text-white mb-4 group-hover:text-white/90 transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </h3>
                            <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-8 font-light line-clamp-3">
                              {post.excerpt}
                            </p>
                            
                            <div className="mt-auto border-t border-white/10 pt-5 flex items-center justify-between group-hover:border-white/20 transition-colors">
                              <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">Read Article</span>
                              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-300" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </>
        ) : (
          <ScrollReveal direction="up">
            <div className="text-center py-32 border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-md">
              <h3 className="font-serif text-3xl text-white mb-4">No articles found</h3>
              <p className="text-white/50 font-light">Check back soon for new research insights.</p>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* NEWSLETTER SECTION - Elevated Cinematic Styling */}
      <section className="relative py-24 md:py-32 bg-[#020202] overflow-hidden border-t border-white/5 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[400px] md:min-h-0 md:aspect-[24/9] w-full rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 md:p-20 text-center">
            
            {/* Dark Cinematic Background */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/flower-3.webp" 
                alt="Cinematic abstract texture" 
                fill 
                className="object-cover opacity-30 grayscale mix-blend-luminosity scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/90 via-[#020202]/70 to-[#020202]/90" />
              {/* Subtle center glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto w-full">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/30" />
                  <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-sans">
                    The Inner Circle
                  </span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/30" />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
                  Elevate Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-light">
                    Knowledge Base
                  </span>
                </h2>
                <p className="text-white/50 font-light mb-12 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                  Join our exclusive journal to receive the latest purity reports, research methodologies, and catalog updates directly from our laboratory.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5} className="w-full">
                <div className="max-w-md mx-auto w-full bg-white/[0.03] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                  <NewsletterForm ctaText="Subscribe to Journal" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
