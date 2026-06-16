"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Activity, FileText, Filter, FlaskConical, ShieldCheck, Zap, Truck, Headphones, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/animations/TiltCard";
import { useCart } from "@/context/CartContext";
import type { BlogPost } from "@/lib/blog";
import type { getAllProducts } from "@/data/products";

type ProductList = ReturnType<typeof getAllProducts>;
type Product = ProductList[0];

interface Props {
  allProducts: Product[];
  featuredProducts: Product[];
  recentPosts: BlogPost[];
}

const FAQItem = ({ faq, index }: { faq: any, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 cursor-pointer hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-6">
        <h3 className="text-base md:text-lg font-serif text-white group-hover:text-white transition-colors">{faq.q}</h3>
        <div className={`text-white/50 transition-transform duration-500 shrink-0 ${isOpen ? "rotate-45" : ""}`}>
          <Plus className="w-5 h-5" />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed font-light pt-4 mt-4 border-t border-white/10">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const ScrubWord = ({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return <motion.span style={{ opacity }} className="inline-block">{children}</motion.span>
};

export default function HomeClient({ allProducts, featuredProducts, recentPosts }: Props) {
  const { addItem } = useCart();
  const founderRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: founderProgress } = useScroll({
    target: founderRef,
    offset: ["start start", "end end"]
  });
  const founderQuoteWords = "As a female founder in the research space, I built this collection because I couldn't find a peptide source that met my exact standards for absolute purity, paired with an elegant, trustworthy experience.".split(" ");
  const bgOpacity = useTransform(founderProgress, [0, 0.5], [1, 0.1]);

  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScrollProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end end"]
  });
  const ctaBgScale = useTransform(ctaScrollProgress, [0, 1], [1, 1.15]);

  const containerRef = useRef(null);
  const textSectionRef = useRef(null);
  const categorySectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: categoryScrollY } = useScroll({
    target: categorySectionRef,
    offset: ["start end", "end start"]
  });
  const categoryBgY = useTransform(categoryScrollY, [0, 1], ["-15%", "15%"]);

  const infiniteProducts = [...allProducts, ...allProducts, ...allProducts];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || allProducts.length === 0) return;
    
    // On load, immediately jump to the middle set so users can scroll left infinitely
    setTimeout(() => {
      const setSize = allProducts.length;
      const set2Element = container.children[setSize] as HTMLElement;
      if (set2Element) {
        container.classList.remove('scroll-smooth');
        container.scrollLeft = set2Element.offsetLeft;
        void container.offsetWidth; // force reflow
        container.classList.add('scroll-smooth');
      }
    }, 100);

    let interval: NodeJS.Timeout;
    
    const startScroll = () => {
      interval = setInterval(() => {
        if (!container) return;
        const itemWidth = container.children[0] ? container.children[0].clientWidth + 24 : 350;
        container.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }, 4000);
    };
    
    startScroll();
    
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', startScroll);
    
    return () => {
      clearInterval(interval);
      container.removeEventListener('mouseenter', () => clearInterval(interval));
      container.removeEventListener('mouseleave', startScroll);
    };
  }, [allProducts.length]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (!container || allProducts.length === 0) return;
    
    const setSize = allProducts.length;
    const set2Element = container.children[setSize] as HTMLElement;
    const set3Element = container.children[setSize * 2] as HTMLElement;
    if (!set2Element || !set3Element) return;

    // If auto-scroll or user scrolls into Set 3, seamlessly warp back to Set 2
    if (container.scrollLeft >= set3Element.offsetLeft - 10) {
      const setWidth = set3Element.offsetLeft - set2Element.offsetLeft;
      container.classList.remove('scroll-smooth');
      container.scrollLeft -= setWidth;
      void container.offsetWidth;
      container.classList.add('scroll-smooth');
    }
  };

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const setSize = allProducts.length;
      const set2Element = container.children[setSize] as HTMLElement;
      const set3Element = container.children[setSize * 2] as HTMLElement;
      
      // If we are at the start of Set 2 and want to scroll left, warp to Set 3 first!
      if (set2Element && set3Element && container.scrollLeft <= set2Element.offsetLeft + 10) {
        const setWidth = set3Element.offsetLeft - set2Element.offsetLeft;
        container.classList.remove('scroll-smooth');
        container.scrollLeft += setWidth;
        void container.offsetWidth;
        container.classList.add('scroll-smooth');
      }
      
      const itemWidth = container.children[0] ? container.children[0].clientWidth + 24 : 350;
      container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  };
  
  const scrollRightBtn = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.children[0] ? scrollContainerRef.current.children[0].clientWidth + 24 : 350;
      scrollContainerRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textSectionRef,
    offset: ["start 80%", "end 50%"]
  });

  // Slow parallax on the hero background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);

  return (
    <div className="flex flex-col w-full bg-bg-base text-textmain overflow-clip selection:bg-textmain selection:text-bg-base">
      
      {/* 1. HERO (Full Background, Editorial Layout) */}
      <section ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden px-4 md:px-8 lg:px-12 pb-12 md:pb-20 pt-40">
        {/* Background Parallax */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image 
            src="/images/img-1 (1).webp" 
            alt="Editorial Portrait" 
            fill 
            priority
            className="object-cover object-[center_top] md:object-[center_20%] opacity-85"
          />
        </motion.div>

        {/* Elegant Shadow Overlays for text readability without ruining the image */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent h-[70%] top-auto"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent w-[60%] left-0"></div>

        <div className="relative z-20 w-full flex flex-col items-start justify-end h-full">
          
          {/* Typography */}
          <div className="w-full max-w-4xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-textsub mb-8 backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2 rounded-full">
                The Scarlett Hawkins Collection
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-serif tracking-tight mb-8 text-white leading-[0.95]"
            >
              Elevated<br />
              <span className="text-white">Wellness.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-base md:text-xl text-white/70 max-w-xl mb-12 font-light leading-relaxed"
            >
              Research-grade peptides — Retatrutide, BPC-157, NAD+, GHK-Cu, and more — tested to ≥99% purity and backed by independent COAs. The standard that serious research demands.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Link 
                href="/shop"
                className="group inline-flex items-center justify-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-full font-medium tracking-[0.1em] uppercase text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1"
              >
                Explore Catalog
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INTRO STATEMENT */}
      <section ref={textSectionRef} className="py-24 md:py-48 bg-bg-base relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        {/* Giant ambient quotation mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[40rem] text-white/[0.02] font-serif leading-none select-none pointer-events-none mt-20">
          "
        </div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.6] md:leading-[1.6] font-serif font-light tracking-wide flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3 md:gap-y-2"
            style={{ perspective: "1200px" }}
          >
            {'"From the founder of Scarlett Hawkins Medspa - a personally curated catalog of research-grade peptides, held to medspa standards of purity and trust."'.split(" ").map((word, i, array) => {
              const start = i / array.length;
              const end = start + (1 / array.length);
              
              // Map scroll to 3D cinematic effects
              const opacity = useTransform(textScrollProgress, [start * 0.8, end * 0.8], [0, 1]);
              const y = useTransform(textScrollProgress, [start * 0.8, end * 0.8], [40, 0]);
              const rotateX = useTransform(textScrollProgress, [start * 0.8, end * 0.8], [80, 0]);
              const scale = useTransform(textScrollProgress, [start * 0.8, end * 0.8], [1.2, 1]);
              const blurVal = useTransform(textScrollProgress, [start * 0.8, end * 0.8], [12, 0]);
              const filter = useTransform(blurVal, (v) => `blur(${v}px) drop-shadow(0px 10px 15px rgba(0,0,0,0.5))`);

              return (
                <motion.span
                  key={i}
                  style={{ 
                    opacity, 
                    y, 
                    rotateX, 
                    scale, 
                    filter,
                    transformOrigin: "bottom" 
                  }}
                  className="inline-block drop-shadow-2xl"
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
          
          <motion.div 
            className="mt-16 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 1 }}
          >
             <span className="text-white/50 mb-4">—</span>
             <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-white font-sans">Scarlett Hawkins</span>
             <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-textsub font-sans mt-2">Founder</span>
          </motion.div>
        </div>
      </section>

      {/* 2.5 CORE PILLARS (Speed, Quality, Support) */}
      <section className="py-20 bg-bg-base border-b border-bordersub">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-bordersub">
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col items-center p-6">
                <Truck className="w-6 h-6 text-textsub mb-4" strokeWidth={1.5} />
                <h3 className="text-sm tracking-widest uppercase mb-2">Rapid Fulfillment</h3>
                <p className="text-xs text-textmuted leading-relaxed max-w-xs">Orders dispatched within 24 hours via our laboratory partner, <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a> - keeping your research timeline on track.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col items-center p-6">
                <ShieldCheck className="w-6 h-6 text-textsub mb-4" strokeWidth={1.5} />
                <h3 className="text-sm tracking-widest uppercase mb-2">Verified Quality</h3>
                <p className="text-xs text-textmuted leading-relaxed max-w-xs">Every batch undergoes independent HPLC and LC-MS analysis. Certificates of Analysis are available for every compound in our catalog.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col items-center p-6">
                <Headphones className="w-6 h-6 text-textsub mb-4" strokeWidth={1.5} />
                <h3 className="text-sm tracking-widest uppercase mb-2">Dedicated Support</h3>
                <p className="text-xs text-textmuted leading-relaxed max-w-xs">Expert support available for order inquiries, COA requests, and compound documentation — not chatbots, real people.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COMPOUNDS */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-6">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-textmuted mb-4 block">Curated Selection</span>
              <h2 className="text-4xl tracking-tight">Featured Compounds</h2>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-textsub hover:text-textmain pb-2 border-b border-bordersub hover:border-textmain transition-all flex items-center gap-2 group">
              Explore All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
        
        <div className="relative w-full overflow-visible pb-12">
          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[calc(50%-12px)] lg:auto-cols-[calc(25%-18px)] gap-x-6 overflow-x-auto pt-32 pb-8 scroll-smooth hide-scrollbar w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteProducts.map((product, i) => {
              const minPrice = product.isVariable 
                ? Math.min(...(product.variants?.map(v => v.price) || [0]))
                : product.price;

              return (
                <ScrollReveal key={`${product.slug}-${i}`} delay={0} direction="up" className="w-full">
                  <Link href={`/product/${product.slug}`} className="group relative w-full h-full bg-white rounded-[2rem] p-6 pb-8 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.7)] block">
                    
                    {/* Subtle Background Elements to match reference */}
                    <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
                      <div className="absolute -left-6 top-1/4 w-16 h-32 border-[1.5px] border-gray-200 rounded-full opacity-50"></div>
                      <div className="absolute -right-8 bottom-1/3 w-20 h-40 border-[1.5px] border-gray-200 rounded-full opacity-50"></div>
                      <div className="absolute right-6 top-1/4 text-gray-200 text-xl">✦</div>
                      <div className="absolute left-8 bottom-1/4 text-gray-200 text-sm">✦</div>
                    </div>

                    {/* Floating Image with Split Gradient Border */}
                    <div className="absolute -top-16 w-32 h-32 p-[6px] rounded-[64px] bg-gradient-to-b from-white from-50% to-[#111] to-50% shadow-2xl transition-all duration-500 ease-out z-20 group-hover:scale-[1.6] group-hover:rounded-[20px] group-hover:p-[3px] origin-center">
                      <div className="relative w-full h-full rounded-[58px] overflow-hidden group-hover:rounded-[17px] transition-all duration-500">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="mt-20 flex flex-col items-center w-full relative z-10">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2 font-sans font-bold block">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-black mb-3 text-black font-sans uppercase tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-6 font-medium line-clamp-2 h-8 px-2">
                        {product.shortDescription}
                      </p>
                      
                      {/* Price Circle */}
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex flex-col items-center justify-center mb-8 shadow-inner border border-gray-200 group-hover:bg-black transition-colors duration-500">
                        {product.isVariable && (
                          <span className="text-[8px] font-medium uppercase tracking-widest text-gray-500 group-hover:text-gray-400 -mb-1 transition-colors duration-500">From</span>
                        )}
                        <span className="text-lg font-bold text-black font-sans group-hover:text-white transition-colors duration-500">
                          ${minPrice?.toFixed(0)}
                        </span>
                      </div>
                      
                      {/* Action Button */}
                      <button 
                        onClick={(e) => {
                          if (!product.isVariable) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!product.price) return;
                            addItem({
                              slug: product.slug,
                              name: product.name,
                              wooProductId: product.wooProductId,
                              price: product.price,
                              quantity: 1,
                              image: product.image,
                            });
                          }
                        }}
                        className="w-full bg-black text-white py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 shadow-xl z-20 relative cursor-pointer"
                      >
                        {product.isVariable ? "Select Options" : "Add to Cart"}
                      </button>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button 
              onClick={scrollLeftBtn} 
              className="p-4 rounded-full border border-bordersub hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 text-textmain"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-12 h-px bg-bordersub"></div>
            <button 
              onClick={scrollRightBtn} 
              className="p-4 rounded-full border border-bordersub hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 text-textmain"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* --- SEAMLESS SHARED BACKGROUND FOR CATEGORIES AND STANDARD --- */}
      <div ref={categorySectionRef} className="relative overflow-hidden">
        
        {/* Shared Background Image & Ambient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#020202]">
          <motion.div 
            className="absolute inset-0 w-full h-[130%]"
            style={{ y: categoryBgY }}
          >
            <Image 
              src="/images/img-8.webp" 
              alt="Laboratory background" 
              fill 
              className="object-cover object-center mix-blend-luminosity opacity-60"
            />
          </motion.div>
          {/* Fade edges to black, leave center visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]"></div>
          {/* Overall subtle darkening for readability */}
          <div className="absolute inset-0 bg-[#020202]/60"></div>
          
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"></div>
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-white/[0.015] blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3 z-0"></div>
          {/* Center glow for the features section */}
          <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none z-0"></div>
        </div>

        {/* 3.5 RESEARCH CATEGORIES */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-20 flex flex-col items-center">
                <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-white/50 mb-6 backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2 rounded-full">What We Carry</span>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6 text-white">Research by Category</h2>
                <p className="text-white/60 font-light max-w-2xl mx-auto text-sm leading-relaxed">
                  Our catalog spans four core areas of modern peptide research — each compound hand-selected for documented scientific relevance and verified purity.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  label: "Metabolic",
                  headline: "Metabolic Research",
                  desc: "Tri-agonist and GLP-1 class compounds including Retatrutide and Tesamorelin, studied for their roles in energy metabolism, adipose tissue dynamics, and hormonal signaling pathways.",
                  link: "/shop",
                  badge: "Retatrutide · Tesamorelin"
                },
                {
                  label: "Recovery & Repair",
                  headline: "Recovery & Repair",
                  desc: "Body protection and actin-regulation peptides such as BPC-157 and TB500, used extensively in research focused on tissue integrity, healing cascades, and cellular protection mechanisms.",
                  link: "/shop",
                  badge: "BPC-157 · TB500 · KPV"
                },
                {
                  label: "Longevity",
                  headline: "Longevity & Wellness",
                  desc: "NAD+, Glutathione, MOTS-C, and GHK-Cu — compounds at the frontier of aging biology, mitochondrial function, antioxidant capacity, and epigenetic research.",
                  link: "/shop",
                  badge: "NAD+ · GHK-Cu · MOTS-C"
                },
                {
                  label: "Proprietary",
                  headline: "Proprietary Blends",
                  desc: "Exclusive Scarlett Hawkins formulations — GLOW and KLOW — crafted as premium multi-compound research blends not available anywhere else.",
                  link: "/shop",
                  badge: "GLOW · KLOW"
                }
              ].map((cat, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="up" className="h-full">
                  <Link href={`/shop?category=${encodeURIComponent(cat.label)}`} className="group block h-full">
                    <TiltCard className="h-full">
                      <div className="h-full rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-lg p-8 flex flex-col transition-all duration-500 hover:bg-white/[0.1] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] relative overflow-hidden">
                        
                        {/* Glassmorphism shine effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-6 block group-hover:text-white/70 transition-colors">{cat.label}</span>
                        <h3 className="text-2xl font-serif text-white mb-4 tracking-wide group-hover:text-white transition-colors">{cat.headline}</h3>
                        <p className="text-white/60 text-xs leading-relaxed font-light flex-grow mb-8">{cat.desc}</p>
                        
                        <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 border-t border-white/10 pt-5 flex items-center justify-between group-hover:text-white/80 group-hover:border-white/20 transition-colors">
                          <span className="truncate max-w-[80%]">{cat.badge}</span>
                          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Faint divider between seamless sections */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10 max-w-7xl mx-auto"></div>

        {/* 4. THE STANDARD (Features) */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="none">
              <div className="mb-24 text-center flex flex-col items-center">
                <span className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-white/50 mb-6 backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2 rounded-full">
                  The Standard
                </span>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-6 text-white max-w-2xl leading-tight">Uncompromising Quality for Advanced Research</h2>
              </div>
            </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <FlaskConical className="w-5 h-5 transition-colors duration-500" strokeWidth={1.5} />,
                title: "≥99% Verified Purity",
                text: "Every compound is strictly HPLC + LC-MS tested to ensure the highest grade possible. Precision matters."
              },
              {
                icon: <ShieldCheck className="w-5 h-5 transition-colors duration-500" strokeWidth={1.5} />,
                title: "Full Transparency",
                text: "Certificates of analysis are available for every single batch in our catalog. No hidden variables."
              },
              {
                icon: <Filter className="w-5 h-5 transition-colors duration-500" strokeWidth={1.5} />,
                title: "Curated Catalog",
                text: "We filter out the noise, providing only the specific compounds truly worth your research attention."
              }
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.15} className="h-full">
                <TiltCard className="h-full">
                  <div className="group relative p-10 h-full rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-lg flex flex-col transition-all duration-500 hover:bg-white/[0.1] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] overflow-hidden">
                    
                    {/* Glassmorphism shine effect */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Glowing Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 mb-8 shadow-inner group-hover:bg-white group-hover:border-white transition-all duration-500 group-hover:scale-110">
                      <div className="text-white/50 group-hover:text-black transition-colors duration-500">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-serif tracking-wide mb-4 text-white group-hover:text-white transition-colors">{feature.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light flex-grow">{feature.text}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>

      {/* 4.5 EDUCATIONAL SEO BLOCK */}
      <section className="relative bg-[#020202] overflow-hidden">
        {/* VISUAL COLUMN (Right Full Bleed) */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 relative w-full h-[400px] lg:h-auto">
          <Image 
            src="/images/IMG-10.webp" 
            alt="Laboratory purity research" 
            fill 
            className="object-cover object-center opacity-60"
          />
          {/* Subtle gradient to blend edges seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-[#020202]/40 lg:to-[#020202]"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020202] to-transparent"></div>
          
          {/* Floating Glassmorphism Badge */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md lg:left-auto lg:right-16 lg:translate-x-0 z-20">
            <TiltCard className="w-full">
              <div className="w-full rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-3xl p-6 md:p-8 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div>
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <Activity className="w-4 h-4 text-white/50" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Verified Standard</span>
                  </div>
                  <span className="text-2xl md:text-4xl font-serif text-white tracking-wide">&ge;99% Purity</span>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shadow-inner">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={1} />
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* TEXT COLUMN (Left Constrained) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="py-16 lg:py-40 lg:w-1/2 lg:pr-24">
            <ScrollReveal direction="left">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-white/20"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Research Grade Purity</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif tracking-wide mb-8 md:mb-10 text-white leading-[1.2]">
                The Science Behind <br />
                <span className="text-white/80">High-Purity Peptides</span>
              </h2>
              <div className="space-y-6 font-light leading-relaxed text-sm md:text-base">
                <p className="text-white/60">
                  <strong className="text-white font-medium">Research peptides</strong> are short-chain amino acid sequences synthesized for in-vitro and preclinical study. They serve as invaluable tools for investigating signaling pathways, metabolic cascades, and cellular repair mechanisms that underpin modern longevity and metabolic science.
                </p>
                <p className="text-white/60">
                  At Scarlett Hawkins, every compound — from the tri-agonist <span className="text-white font-medium">Retatrutide</span> and mitochondrial activator <span className="text-white font-medium">MOTS-C</span>, to the copper-chelating <span className="text-white font-medium">GHK-Cu</span> and body-protective <span className="text-white font-medium">BPC-157</span> — is sourced exclusively through our laboratory partner, <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="text-white font-medium underline hover:text-gray-300">99 Purity Peptides</a>. Each batch undergoes independent HPLC chromatography and LC-MS mass confirmation before it reaches your lab.
                </p>
                <p className="text-white/60">
                  Impurities matter. TFA residues, heavy metals, and synthesis byproducts can skew results and compromise data integrity. Our ≥99% purity standard eliminates these variables, giving researchers a clean, reliable baseline for reproducible science.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4.6 COA TRANSPARENCY */}
      <section className="py-16 md:py-32 relative bg-[#020202] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            
            {/* VISUAL COLUMN (Left) */}
            <div className="w-full lg:w-1/2">
              <ScrollReveal direction="left">
                <TiltCard className="w-full">
                  <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 md:p-12 flex flex-col group overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    {/* Minimalist glowing gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"></div>
                    
                    {/* Watermark icon */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                      <FileText className="w-64 h-64" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-4 md:gap-5 border-b border-white/10 pb-6 md:pb-8 mb-6 md:mb-8 relative z-10">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shadow-inner">
                        <Zap className="w-5 h-5 text-white/80" strokeWidth={1} />
                      </div>
                      <div>
                        <h4 className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white mb-1">Certificate of Analysis</h4>
                        <span className="text-[10px] md:text-xs text-white/40 tracking-widest uppercase">Verified Documentation</span>
                      </div>
                    </div>

                    {/* Data Rows */}
                    <div className="space-y-4 md:space-y-6 text-xs md:text-sm text-white/50 font-mono mb-6 md:mb-8 relative z-10 flex-grow">
                      <div className="flex justify-between border-b border-white/5 pb-3 group/row hover:border-white/20 transition-colors">
                        <span>Compound</span> <span className="text-white">Standard Reference</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3 group/row hover:border-white/20 transition-colors">
                        <span>Purity (HPLC)</span> <span className="text-white">&ge;99.4%</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3 group/row hover:border-white/20 transition-colors">
                        <span>Mass (LC-MS)</span> <span className="text-white">Conforms</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 md:pt-8 border-t border-white/10 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 flex justify-between relative z-10">
                      <span>Independent Lab</span>
                      <span>Cross-Referenced</span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>

            {/* TEXT COLUMN (Right) */}
            <div className="w-full lg:w-1/2 lg:pl-8">
              <ScrollReveal direction="right">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-white/20"></div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Uncompromising Standards</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif tracking-wide mb-8 md:mb-10 text-white leading-[1.2]">
                  Absolute Data <br />
                  <span className="text-white/60 font-light">Transparency</span>
                </h2>
                <div className="space-y-6 font-light leading-relaxed text-sm md:text-base">
                  <p className="text-white/60">
                    We don't ask you to trust us blindly. Every single compound in our catalog is backed by a verifiable <strong className="text-white font-medium">Certificate of Analysis (COA)</strong> produced by an independent, US-based third-party testing facility — not an in-house lab.
                  </p>
                  <p className="text-white/60">
                    Each COA includes HPLC purity chromatograms confirming <span className="text-white font-medium">≥99% purity</span> and LC-MS data verifying the exact molecular identity of the compound. Batch numbers are cross-referenceable, so you can confirm your specific vial at any time.
                  </p>
                  <p className="text-white/60">
                    In peptide research, knowing precisely what you are working with isn't a luxury — it's a methodological requirement. That's why transparency is not a feature here; it's the foundation.
                  </p>
                </div>
                <div className="mt-8 md:mt-12">
                  <Link 
                    href="/about"
                    className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white group"
                  >
                    <span className="border-b border-white/30 pb-1 group-hover:border-white transition-colors">Learn About Our Protocol</span>
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 4.7 FAQ SEO BLOCK */}
      <section className="relative py-16 md:py-32 bg-[#020202]">
        {/* Ambient Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src="/images/img-4.webp"
            alt="Ambient lab background"
            fill
            className="object-cover opacity-50 mix-blend-luminosity"
          />
          {/* Gradient fade to seamlessly blend into top and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]"></div>
          {/* Gradient fade from left to right to push the image emphasis to the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT COLUMN (Sticky Text) */}
            <div className="lg:col-span-5 relative items-start">
              <div className="lg:sticky lg:top-40">
                <ScrollReveal direction="left">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-px bg-white/20"></div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Inquiries</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif tracking-wide mb-8 text-white leading-[1.2]">
                    Frequently Asked <br />
                    <span className="text-white/60 font-light">Questions</span>
                  </h2>
                  <p style={{ color: "rgba(255, 255, 255, 0.6)" }} className="font-light text-sm md:text-base leading-relaxed max-w-sm">
                    Everything you need to know about our research compounds, testing standards, and ordering process.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* RIGHT COLUMN (Scrolling Accordions) */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {[
                  {
                    q: "What are research peptides and how are they used in scientific research?",
                    a: "Research peptides are short-chain amino acid sequences synthesized in a laboratory setting for scientific investigation. They are used by researchers to study biological signaling, metabolic pathways, tissue repair mechanisms, hormonal interactions, and cellular aging processes. Unlike pharmaceutical drugs approved for clinical use, research peptides are classified as Research Use Only (RUO) — meaning their scientific potential is studied in controlled, in-vitro and preclinical environments."
                  },
                  {
                    q: "Are your research compounds third-party tested?",
                    a: "Yes — unconditionally. Every single batch in our catalog is tested by an independent, US-based third-party laboratory. We provide Certificates of Analysis (COAs) for every compound, which include HPLC chromatograms confirming ≥99% purity and LC-MS data verifying the exact molecular identity. You can cross-reference your batch number at any time."
                  },
                  {
                    q: "What does 'Research Use Only' (RUO) mean?",
                    a: "Research Use Only (RUO) is a regulatory classification indicating that a compound is intended strictly for laboratory and scientific research purposes — not for human consumption, veterinary use, diagnostic procedures, or cosmetic application. All compounds in the Scarlett Hawkins catalog carry this designation and must be used in full compliance with the applicable laws and regulations of your jurisdiction."
                  },
                  {
                    q: "What is Retatrutide and what is it studied for?",
                    a: "Retatrutide is a novel tri-agonist peptide that simultaneously targets GLP-1, GIP, and glucagon receptors. In research settings, it is being studied for its potential effects on metabolic regulation, adipose tissue dynamics, and energy homeostasis. It has been a compound of significant interest in the metabolic and obesity research space. Our Retatrutide is available in 10mg, 20mg, 30mg, and 100mg formats, all third-party verified to ≥99% purity."
                  },
                  {
                    q: "What is the difference between BPC-157 and TB500?",
                    a: "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide derived from a protective protein found in gastric juice, primarily studied for its role in tissue healing, gastric protection, and angiogenesis. TB500 (Thymosin Beta-4 fragment) is an actin-sequestering peptide researched for its role in cellular migration, wound healing, and inflammation modulation. They are often studied together due to their complementary mechanisms, though they are distinct molecular entities with different structures and receptor interactions."
                  },
                  {
                    q: "What is GHK-Cu and why is it relevant to longevity research?",
                    a: "GHK-Cu (Copper Peptide GHK-Cu) is a naturally occurring copper-chelating tripeptide — Glycyl-L-Histidyl-L-Lysine — found in human plasma, saliva, and urine. It has been studied extensively for its roles in stimulating collagen synthesis, activating antioxidant pathways, modulating gene expression related to aging, and promoting tissue repair. Its relevance to longevity research lies in its apparent ability to reset the gene expression patterns of aged cells toward a younger state, making it one of the most scientifically interesting compounds in the aging biology field."
                  },
                  {
                    q: "What are NAD+ and MOTS-C used to study?",
                    a: "NAD+ (Nicotinamide Adenine Dinucleotide) is a critical coenzyme involved in mitochondrial energy production, DNA repair, and sirtuin pathway activation. Research into NAD+ precursors and NAD+ itself is central to the longevity and cellular health field. MOTS-C is a mitochondria-derived peptide encoded within the mitochondrial genome, studied for its role in regulating insulin sensitivity, metabolic homeostasis, and stress responses. Both are key compounds in contemporary metabolic and longevity science."
                  },
                  {
                    q: "How does the ordering process work?",
                    a: <>The Scarlett Hawkins storefront is a curated boutique catalog. When you add compounds to your cart and proceed to checkout, you are seamlessly and securely redirected to our exclusive fulfillment partner, <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' className='underline hover:text-white transition-colors'>99 Purity Peptides</a>. You sign in or create an account on their platform, complete your secure payment, and your order ships directly from their dedicated laboratory facility — typically within 24 hours of order confirmation.</>
                  },
                  {
                    q: "How are the compounds shipped and stored?",
                    a: "All peptides are lyophilized (freeze-dried) prior to shipment, a process that stabilizes the molecular structure and extends shelf life without refrigeration during transit. Upon arrival, researchers should store lyophilized peptides at -20°C for long-term stability. Reconstitution should be performed using sterile bacteriostatic water; once reconstituted, vials should be stored at 2–8°C and used within the timeframes specified in the associated COA documentation."
                  },
                  {
                    q: "What makes Scarlett Hawkins different from other research peptide suppliers?",
                    a: "Most peptide suppliers are anonymous fulfillment operations. Scarlett Hawkins is a founder-curated catalog, built by Scarlett Hawkins — founder of Scarlett Hawkins Medspa in Charleston, SC — who applied the same standards she demands in a clinical medspa environment to this research catalog. Every compound was personally vetted. Every supplier relationship was personally established. The result is a boutique selection of only the most scientifically relevant, rigorously tested compounds — paired with full COA transparency and a checkout experience designed for serious researchers, not casual browsers."
                  }
                ].map((faq, i) => (
                  <ScrollReveal key={i} delay={i * 0.05} direction="up">
                    <FAQItem faq={faq} index={i} />
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-[#050505]">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-white/20"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">The Process</span>
                <div className="w-8 h-px bg-white/20"></div>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif tracking-wide text-white leading-[1.2]">
                Seamless <span className="font-light text-white/60">Logistics</span>
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Elegant glowing connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {[
              { step: "01", title: "Build Sequence", desc: "Curate your selection of premium peptides in our local boutique cart." },
              { step: "02", title: "Secure Hand-off", desc: "Proceed to checkout and be seamlessly redirected to our laboratory partner." },
              { step: "03", title: "Rapid Fulfillment", desc: "Sign in, complete your secure payment, and your materials ship immediately." }
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <TiltCard className="h-full">
                  <div className="relative z-10 flex flex-col items-center h-full bg-white/[0.02] backdrop-blur-3xl border border-white/5 hover:border-white/20 transition-all duration-700 rounded-[2rem] p-8 md:p-12 text-center group shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/50 border border-white/10 group-hover:border-white/30 flex items-center justify-center text-white font-serif text-xl md:text-2xl mb-6 md:mb-8 tracking-widest shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] transition-all duration-700">
                      {p.step}
                    </div>
                    <h3 className="text-lg md:text-xl font-serif tracking-wide text-white mb-3 md:mb-4 group-hover:text-white transition-colors duration-500">{p.title}</h3>
                    <p className="text-white/50 font-light text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUNDER ANIMATION (SCROLL-SCRUBBED) */}
      <section ref={founderRef} className="h-[250vh] relative bg-bg-base">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0 pointer-events-none">
            <Image 
              src="/images/flower-2.webp"
              alt="Flower Background"
              fill
              className="object-cover mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base"></div>
            <div className="absolute inset-0 bg-bg-base/60"></div>
          </motion.div>

          <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-4 sm:px-6 w-full text-center">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[10rem] md:text-[30rem] font-serif text-white/[0.03] leading-none pointer-events-none -rotate-6">
              "
            </div>
            
            <blockquote className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white leading-[1.3] md:leading-[1.4] font-serif font-light mb-16 text-balance tracking-wide relative z-10 flex flex-wrap justify-center gap-x-3 gap-y-2">
              {founderQuoteWords.map((word, i) => {
                const start = i / founderQuoteWords.length;
                const end = start + (1 / founderQuoteWords.length);
                return <ScrubWord key={i} progress={founderProgress} range={[start, end]}>{word}</ScrubWord>;
              })}
            </blockquote>
            
            <motion.div 
              style={{ opacity: useTransform(founderProgress, [0.6, 0.8], [0, 1]) }}
              className="flex flex-col items-center gap-3 relative z-10"
            >
              <div style={{ backgroundColor: '#ffffff' }} className="w-16 h-px mb-4"></div>
              <span style={{ color: '#ffffff' }} className="text-sm md:text-base tracking-[0.3em] uppercase font-medium">Scarlett Hawkins</span>
              <span className="text-xs md:text-sm tracking-[0.2em] text-white/50 uppercase">Founder & CEO</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6.5 JOURNAL / BLOG */}
      <section className="py-32 relative overflow-hidden bg-[#050505]">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-white/20"></div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">The Journal</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif tracking-wide text-white leading-[1.2]">
                  Recent Research & <span className="font-light text-white/60">Insights</span>
                </h2>
              </div>
              <Link href="/blog" className="text-xs uppercase tracking-[0.2em] text-white hover:text-white pb-2 border-b border-white/20 hover:border-white/50 transition-all flex items-center gap-2 group">
                Read All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {recentPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.15} direction="up">
                <TiltCard className="h-full">
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 hover:border-white/30 h-full flex flex-col transition-all duration-700 overflow-hidden rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                      
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-700"></div>
                        <Image 
                          src={post.coverImage} 
                          alt={post.title} 
                          fill 
                          className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <span className="bg-black/50 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-[0.2em] px-4 py-2 text-white rounded-full shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 md:p-10 flex flex-col flex-grow relative z-20">
                        <span className="text-[10px] text-white tracking-[0.3em] uppercase mb-4">{post.date}</span>
                        <h3 className="text-xl md:text-2xl font-serif text-white mb-4 group-hover:text-white transition-colors duration-500 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-white/50 font-light line-clamp-3 mb-8 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-xs uppercase tracking-[0.2em] text-white mt-auto group-hover:text-white transition-colors duration-500">
                          <span className="relative">
                            Read Article
                            <div className="absolute -bottom-2 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500"></div>
                          </span>
                          <ArrowRight className="w-3 h-3 ml-3 group-hover:translate-x-2 transition-transform duration-500" />
                        </div>
                      </div>
                      
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>



      {/* 8. FINAL CTA - CLASSIC LUXURY FULL BLEED */}
      <section ref={ctaRef} className="relative bg-[#050505] overflow-hidden min-h-[70vh] md:min-h-[90vh] flex items-center justify-center">
        
        <motion.div style={{ scale: ctaBgScale }} className="absolute inset-0 z-0">
          <Image 
            src="/images/img-8.webp"
            alt="Premium peptide selection"
            fill
            className="object-cover object-center"
          />
        </motion.div>
        
        {/* Elegant, simple darkening overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center justify-center text-center p-8 w-full max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col items-center w-full">
              
              <span style={{ color: '#e5e7eb' }} className="tracking-[0.3em] text-[10px] uppercase font-sans mb-6">
                A Commitment to Excellence
              </span>

              <h2 style={{ color: '#ffffff' }} className="text-4xl md:text-5xl lg:text-7xl font-serif tracking-wide mb-8 leading-tight">
                Elevate Your Laboratory Standards
              </h2>
              
              <p style={{ color: '#d1d5db' }} className="text-sm md:text-base md:text-lg font-light mb-12 leading-relaxed max-w-2xl mx-auto">
                Explore our curated collection of verified, absolute-purity research compounds.
              </p>
              
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center px-10 md:px-12 py-4 md:py-5 bg-white text-black hover:bg-white transition-colors duration-500 rounded-[2px] font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase"
              >
                Shop The Collection
              </Link>
              
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
