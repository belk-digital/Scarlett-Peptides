import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/data/products";
import NewsletterForm from "@/components/NewsletterForm";

// --- CONTENT CONSTANTS ---
const HOME_CONTENT = {
  hero: {
    headline: "Elevated Wellness, Backed by Science",
    subhead: "A curated selection of high-purity research peptides, hand-picked by Scarlett Hawkins.",
    primaryCTA: "Shop the Collection",
    secondaryCTA: "Learn More",
    image: "/images/hero-bg.jpg", // Placeholder
  },
  intro: {
    text: "From the founder of Scarlett Hawkins Medspa — a personally curated line of research-grade peptides, chosen for uncompromising purity and absolute transparency. We bridge the gap between clinical precision and boutique elegance.",
  },
  featuredSlugs: ["klow", "glow", "retatrutide", "tesamorelin"],
  whyChoose: [
    {
      title: "≥99% Verified Purity",
      text: "Every compound is strictly HPLC + LC-MS tested to ensure the highest grade possible.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-champagne mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      )
    },
    {
      title: "Full COA Transparency",
      text: "Certificates of analysis are available for every single batch in our catalog.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-champagne mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    {
      title: "Curated, Not Cluttered",
      text: "We filter out the noise, providing only the compounds truly worth your research attention.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-champagne mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      )
    }
  ],
  categories: [
    { name: "Recovery", slug: "recovery", image: "/images/cat-recovery.jpg" },
    { name: "Metabolic", slug: "metabolic", image: "/images/cat-metabolic.jpg" },
    { name: "Cognitive", slug: "cognitive", image: "/images/cat-cognitive.jpg" },
    { name: "Cellular Health", slug: "cellular", image: "/images/cat-cellular.jpg" },
  ],
  howItWorks: [
    { step: "1", title: "Browse & Build", text: "Curate your selection of premium peptides in our local boutique cart." },
    { step: "2", title: "Secure Hand-off", text: "Proceed to checkout and be seamlessly redirected to our trusted fulfillment partner, 99 Purity Peptides." },
    { step: "3", title: "Fast Shipping", text: "Sign in, complete your secure payment, and your research materials ship fast." },
  ],
  founder: {
    quote: "\"I built this collection because I couldn't find a peptide source that met my standards for both absolute purity and an elegant, trustworthy experience.\"",
    name: "Scarlett Hawkins",
    title: "Founder, Scarlett Hawkins Medspa",
    image: "/images/founder.jpg"
  },
  newsletter: {
    headline: "Join the Journal",
    subhead: "Join the list for new compound drops, purity reports, and research updates.",
    endpoint: "/api/newsletter-placeholder",
    cta: "Subscribe"
  },
  finalCTA: {
    headline: "Ready to explore the collection?",
    cta: "Shop All Peptides"
  }
};

export default function Home() {
  const allProducts = getAllProducts();
  const featuredProducts = HOME_CONTENT.featuredSlugs
    .map(slug => allProducts.find(p => p.slug === slug))
    .filter(Boolean) as typeof allProducts;

  return (
    <div className="flex flex-col w-full">
      {/* 2. HERO */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Fallback dark bg if image fails */}
        <div className="absolute inset-0 bg-base z-0"></div>
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(26,20,22,0.2)_0%,rgba(26,20,22,0.95)_100%)]"></div>
        
        <Image 
          src={HOME_CONTENT.hero.image} 
          alt="Hero Background" 
          fill 
          priority
          className="object-cover z-0 opacity-60 mix-blend-luminosity"
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-rosegold mb-6 tracking-wide drop-shadow-lg">
            {HOME_CONTENT.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-textsub max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {HOME_CONTENT.hero.subhead}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/shop"
              className="bg-rosegold text-base px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm glow-hover transition-all w-full sm:w-auto"
            >
              {HOME_CONTENT.hero.primaryCTA}
            </Link>
            <Link 
              href="/about"
              className="bg-transparent border border-rosegold text-rosegold px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm hover:bg-rosegold/10 transition-all w-full sm:w-auto"
            >
              {HOME_CONTENT.hero.secondaryCTA}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. INTRO / BRAND PROMISE */}
      <section className="py-24 bg-surface2 border-y border-bordersub relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="font-serif text-2xl md:text-3xl text-champagne leading-relaxed">
            {HOME_CONTENT.intro.text}
          </p>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">Curated Selection</span>
            <h2 className="font-serif text-4xl text-rosegold">Featured Compounds</h2>
          </div>
          <Link href="/shop" className="text-sm text-champagne hover:text-rosegoldhi uppercase tracking-widest transition-colors pb-1 border-b border-champagne/30 hover:border-rosegoldhi">
            Shop All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => {
            const minPrice = product.isVariable 
              ? Math.min(...(product.variants?.map(v => v.price) || [0]))
              : product.price;

            return (
              <div key={product.slug} className="card-elevated group flex flex-col overflow-hidden">
                <Link href={`/product/${product.slug}`} className="block relative w-full aspect-[4/5] bg-surface2 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-textmuted bg-surface2 z-0">
                    <span className="font-serif text-lg opacity-30 px-4 text-center">{product.name}</span>
                  </div>
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 z-10 opacity-80 mix-blend-luminosity hover:mix-blend-normal"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-surface/80 backdrop-blur-sm text-mauve text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-bordersub">
                      {product.category}
                    </span>
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-serif text-xl text-rosegold mb-1 hover:text-rosegoldhi transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-bordersub">
                    <span className="text-champagne font-medium text-sm">
                      {product.isVariable ? "From " : ""}${minPrice?.toFixed(2)}
                    </span>
                    <Link 
                      href={`/product/${product.slug}`}
                      className="text-[10px] uppercase tracking-widest text-rosegold border border-rosegold px-3 py-1.5 rounded-full hover:bg-rosegold hover:text-base transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHY CHOOSE THIS COLLECTION */}
      <section className="py-32 bg-surface2 border-t border-bordersub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">The Standard</span>
            <h2 className="font-serif text-4xl text-rosegold">Why Choose Our Collection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {HOME_CONTENT.whyChoose.map((block, i) => (
              <div key={i} className="flex flex-col items-center p-6">
                {block.icon}
                <h3 className="font-serif text-2xl text-rosegold mb-4">{block.title}</h3>
                <p className="text-textsub text-sm leading-relaxed max-w-sm">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SHOP BY CATEGORY */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-rosegold">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_CONTENT.categories.map(cat => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="group relative w-full aspect-square rounded-2xl overflow-hidden card-elevated flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center text-textmuted bg-surface2 z-0">
                <span className="font-serif text-lg opacity-30">{cat.name}</span>
              </div>
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700 mix-blend-luminosity z-10"
              />
              <div className="absolute inset-0 bg-base/40 group-hover:bg-base/20 transition-colors z-20"></div>
              <h3 className="relative z-30 font-serif text-2xl text-rosegoldhi tracking-wide group-hover:scale-105 transition-transform duration-500">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-32 bg-surface2 border-y border-bordersub relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">The Process</span>
            <h2 className="font-serif text-4xl text-rosegold">How It Works</h2>
            <p className="text-textsub mt-4 max-w-2xl mx-auto">A seamless boutique experience powered by robust fulfillment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-rosegold/30 to-transparent"></div>
            
            {HOME_CONTENT.howItWorks.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-base border border-rosegold flex items-center justify-center text-champagne font-serif text-xl mb-6 shadow-[0_0_15px_rgba(232,180,160,0.15)]">
                  {step.step}
                </div>
                <h3 className="font-serif text-xl text-rosegold mb-3">{step.title}</h3>
                <p className="text-textsub text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOUNDER / SOCIAL PROOF */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="card-elevated p-10 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden shrink-0 border-2 border-bordersub shadow-[0_0_30px_rgba(232,180,160,0.1)]">
            <div className="absolute inset-0 bg-surface2 flex items-center justify-center z-0 text-textmuted">Photo</div>
            <Image 
              src={HOME_CONTENT.founder.image} 
              alt={HOME_CONTENT.founder.name} 
              fill 
              className="object-cover opacity-90 mix-blend-luminosity z-10" 
            />
          </div>
          <div>
            <blockquote className="font-serif text-2xl md:text-3xl text-rosegold leading-relaxed mb-6">
              {HOME_CONTENT.founder.quote}
            </blockquote>
            <p className="text-champagne uppercase tracking-widest text-sm font-medium">{HOME_CONTENT.founder.name}</p>
            <p className="text-textmuted text-sm mt-1">{HOME_CONTENT.founder.title}</p>
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER */}
      <section className="py-24 bg-base border-t border-bordersub text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl text-rosegold mb-4">{HOME_CONTENT.newsletter.headline}</h2>
          <p className="text-textsub mb-10">{HOME_CONTENT.newsletter.subhead}</p>
          <NewsletterForm ctaText={HOME_CONTENT.newsletter.cta} />
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-32 bg-[url('/images/noise.png')] bg-surface2 mix-blend-normal text-center px-4 border-t border-bordersub relative">
        <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent z-0"></div>
        <div className="relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl text-rosegold mb-10">{HOME_CONTENT.finalCTA.headline}</h2>
          <Link 
            href="/shop"
            className="bg-rosegold text-base px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm glow-hover transition-all inline-block"
          >
            {HOME_CONTENT.finalCTA.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
