import Image from "next/image";
import Link from "next/link";

// --- CONTENT CONSTANTS ---
const ABOUT_CONTENT = {
  hero: {
    title: "About",
    tagline: "Beauty, wellness, and science — curated with intention.",
    image: "/images/about-hero.jpg" // Placeholder
  },
  story: {
    headline: "The Founder's Story",
    paragraphs: [
      "Nestled in the heart of downtown Charleston, Scarlett Hawkins Medspa was built on a singular vision: to merge the warmth of Southern hospitality with the precision of modern aesthetics. For years, Scarlett has guided her clients through transformative wellness journeys, earning a reputation for her uncompromising standards and meticulous eye for quality.",
      "As the aesthetic and anti-aging landscape evolved, Scarlett noticed a growing gap in the market. While clinical research advanced rapidly, finding a reliable, transparent source for research-grade materials remained a daunting challenge. The industry was saturated with opaque suppliers, confusing terminology, and a distinct lack of elegance.",
      "Scarlett curated this peptide collection to change that narrative. Drawing on her extensive background and deep industry connections, she sought out the purest, most rigorously tested compounds available. The result is a boutique catalog that brings medspa-level standards to the world of laboratory research."
    ],
    signature: "Scarlett Hawkins"
  },
  philosophy: {
    headline: "Our Philosophy",
    values: [
      {
        title: "Purity First",
        text: "We believe that research is only as good as the materials used. We accept nothing less than ≥99% verified purity."
      },
      {
        title: "Radical Transparency",
        text: "No hidden sources or ambiguous claims. We demand complete visibility into the testing and manufacturing process."
      },
      {
        title: "Curated Selection",
        text: "We don't sell everything; we sell the best. Every compound in our catalog was hand-selected for its specific research potential."
      },
      {
        title: "Education Over Hype",
        text: "We prioritize clarity and accurate scientific data over marketing buzzwords, empowering you to make informed decisions."
      }
    ]
  },
  partnership: {
    headline: "Why These Products?",
    subhead: "Our Partnership with 99 Purity Peptides",
    paragraphs: [
      "To ensure that our uncompromising standards are met at scale, we have partnered exclusively with 99 Purity Peptides for our catalog fulfillment. They are a premier, vetted research-grade supplier known for their rigorous quality control.",
      "When you curate your cart on our site, you aren't just browsing; you are accessing a pipeline directly to one of the most trusted laboratories in the industry. Your checkout is securely handed off to 99 Purity Peptides, ensuring that your order is processed, fulfilled, and shipped by a dedicated facility capable of maintaining the strict environmental controls these compounds require."
    ]
  },
  standards: {
    headline: "The Standards",
    bullets: [
      "≥99% Verified Purity",
      "HPLC Chromatograms for every batch",
      "LC-MS Identity Confirmation",
      "Independent Certificates of Analysis (COAs)",
      "Strict Research-Use-Only Positioning"
    ]
  },
  compliance: {
    headline: "A Note on Research Use",
    text: "All compounds featured in this catalog are intended strictly for in-vitro testing and laboratory research purposes. They are not for human consumption, diagnostic purposes, or veterinary use. By engaging with our collection, you agree to uphold these standards within your own research facility."
  },
  cta: {
    headline: "Ready to elevate your research?",
    primary: { text: "Explore the Collection", link: "/shop" },
    secondary: { text: "Have questions?", link: "/contact" }
  }
};

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. PAGE HERO */}
      <section className="py-24 md:py-32 px-4 text-center bg-surface2 border-b border-bordersub relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">Our Story</span>
          <h1 className="font-serif text-5xl md:text-7xl text-rosegold mb-6 tracking-wide drop-shadow-sm">
            {ABOUT_CONTENT.hero.title}
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-champagne leading-relaxed max-w-2xl mx-auto">
            {ABOUT_CONTENT.hero.tagline}
          </p>
        </div>
      </section>

      {/* 2. FOUNDER STORY */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-5/12 aspect-[3/4] relative rounded-2xl overflow-hidden card-elevated">
            <div className="absolute inset-0 flex items-center justify-center text-textmuted bg-surface2 z-0">
              <span className="font-serif opacity-30">Portrait Placeholder</span>
            </div>
            <Image 
              src={ABOUT_CONTENT.hero.image} 
              alt="Scarlett Hawkins" 
              fill 
              className="object-cover z-10 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
          </div>
          <div className="w-full md:w-7/12">
            <h2 className="font-serif text-4xl text-rosegold mb-8">{ABOUT_CONTENT.story.headline}</h2>
            <div className="space-y-6 text-textsub font-light leading-relaxed text-sm md:text-base">
              {ABOUT_CONTENT.story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <p className="mt-10 font-serif text-2xl text-champagne italic">
              {ABOUT_CONTENT.story.signature}
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR PHILOSOPHY / VALUES */}
      <section className="py-24 md:py-32 bg-surface2 border-y border-bordersub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-rosegold">{ABOUT_CONTENT.philosophy.headline}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_CONTENT.philosophy.values.map((val, idx) => (
              <div key={idx} className="card-elevated p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-base border border-rosegold flex items-center justify-center text-champagne font-serif mb-6 shadow-[0_0_15px_rgba(232,180,160,0.1)]">
                  {idx + 1}
                </div>
                <h3 className="font-serif text-xl text-rosegoldhi mb-4">{val.title}</h3>
                <p className="text-sm text-textsub leading-relaxed">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY THESE PRODUCTS */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">Fulfillment Partner</span>
        <h2 className="font-serif text-4xl text-rosegold mb-2">{ABOUT_CONTENT.partnership.headline}</h2>
        <h3 className="font-serif text-2xl text-champagne mb-8">{ABOUT_CONTENT.partnership.subhead}</h3>
        <div className="space-y-6 text-textsub font-light leading-relaxed text-sm md:text-base">
          {ABOUT_CONTENT.partnership.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>

      {/* 5. THE STANDARDS */}
      <section className="py-20 bg-base border-y border-bordersub relative">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
          <h2 className="font-serif text-3xl text-rosegold shrink-0">{ABOUT_CONTENT.standards.headline}</h2>
          <div className="hidden md:block w-px h-24 bg-bordersub"></div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-textsub text-sm">
            {ABOUT_CONTENT.standards.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne block shrink-0"></span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. A NOTE ON RESEARCH USE */}
      <section className="py-24 px-4 max-w-3xl mx-auto text-center">
        <div className="p-8 border border-bordersub bg-surface2/50 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <h3 className="font-serif text-2xl text-rosegold mb-4 relative z-10">{ABOUT_CONTENT.compliance.headline}</h3>
          <p className="text-xs uppercase tracking-widest leading-loose text-textmuted relative z-10">
            {ABOUT_CONTENT.compliance.text}
          </p>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-24 md:py-32 bg-[url('/images/noise.png')] bg-surface2 mix-blend-normal text-center px-4 border-t border-bordersub relative">
        <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent z-0"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl text-rosegold mb-10">{ABOUT_CONTENT.cta.headline}</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href={ABOUT_CONTENT.cta.primary.link}
              className="bg-rosegold text-base px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm glow-hover transition-all w-full sm:w-auto"
            >
              {ABOUT_CONTENT.cta.primary.text}
            </Link>
            <Link 
              href={ABOUT_CONTENT.cta.secondary.link}
              className="bg-transparent border border-rosegold text-rosegold px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm hover:bg-rosegold/10 transition-all w-full sm:w-auto"
            >
              {ABOUT_CONTENT.cta.secondary.text}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
