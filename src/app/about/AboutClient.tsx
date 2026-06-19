"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Microscope, FlaskConical, Beaker, Truck, FileText, Lock, Award, HeartHandshake } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/animations/TiltCard";

export default function AboutClient() {
  return (
    <div className="flex flex-col w-full bg-[#050505] text-white">

      {/* 1. HERO - Cinematic Full Bleed */}
      <section className="relative pt-40 pb-32 md:pt-56 md:pb-48 px-4 text-center overflow-hidden min-h-[70vh] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/flower-1.webp"
            alt="Laboratory background"
            fill
            className="object-cover opacity-20 grayscale mix-blend-luminosity md:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] uppercase text-white/50 mb-6 block">
              Our Story
            </span>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-wide leading-[1.1]">
              Research-Grade Peptides,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#e5e5e5] font-light">
                Curated for Clarity
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto font-sans">
              Peptides7 brings uncompromising quality standards directly into the laboratory research supply chain. Every compound. Every batch. Every COA — verified.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. OUR STORY - Glassmorphism Stagger */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 -mt-10 md:-mt-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="w-full lg:w-5/12">
            <ScrollReveal direction="left" delay={0.2} className="w-full">
              <TiltCard className="w-full">
                <div className="aspect-[3/4] relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl group">
                  <Image
                    src="/images/img-2.webp"
                    alt="Peptides7"
                    fill
                    className="object-cover z-10 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 md:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent z-20 pointer-events-none" />
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
          
          {/* Text Side */}
          <div className="w-full lg:w-7/12">
            <ScrollReveal direction="up" delay={0.3}>
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4 block font-sans">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white mb-10 leading-tight">
                Why Seven? <br />
                <span className="text-white">Because thoughtful selection matters.</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-6 text-white/50 font-light leading-relaxed font-sans text-sm md:text-base">
              <ScrollReveal direction="up" delay={0.4}>
                <p className="text-white/70">
                  As the peptide landscape continued to expand, we found that more options often created more confusion. So we took a different approach: organizing our collection into seven foundational categories designed to simplify the discovery process.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.5}>
                <p className="text-white/70">
                  Peptides7 represents a philosophy of clarity over complexity, curation over clutter, and quality over quantity.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.6}>
              <div className="mt-12 border-t border-white/10 pt-8 flex items-center gap-6">
                <div className="w-12 h-px bg-white/50" />
                <div>
                  <p className="font-serif text-2xl text-white">Seven categories.</p>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white mt-1 block font-sans">One trusted destination.</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY / VALUES - Interactive Tilt Cards */}
      <section className="py-24 md:py-32 relative overflow-hidden clip-path-inset">
        {/* Subtle background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-full max-w-[800px] aspect-square bg-white/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4 block font-sans">What We Stand For</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Our Philosophy</h2>
              <p className="text-white/50 font-light text-sm md:text-base leading-relaxed font-sans">
                Four principles govern every compound we select, every supplier we engage, and every order we fulfill.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: <Microscope className="w-6 h-6 text-white" />,
                title: "Purity First",
                text: "Research is only as valid as the materials used. We accept nothing less than ≥99% verified purity across our entire catalog — confirmed by independent HPLC and LC-MS testing."
              },
              {
                num: "02",
                icon: <FileText className="w-6 h-6 text-white" />,
                title: "Radical Transparency",
                text: "No hidden sources. No ambiguous certificates. We provide accessible, batch-specific Certificates of Analysis from independent US-based laboratories for every compound."
              },
              {
                num: "03",
                icon: <Award className="w-6 h-6 text-white" />,
                title: "Curated Collection",
                text: "We don't stock every compound on the market. We stock the right compounds — hand-selected for documented scientific relevance and research-community demand."
              },
              {
                num: "04",
                icon: <HeartHandshake className="w-6 h-6 text-white" />,
                title: "Education Over Hype",
                text: "We prioritize accurate scientific context over marketing language. Our product descriptions are held to the same evidentiary standard as our compounds."
              }
            ].map((val, idx) => (
              <ScrollReveal key={idx} direction="up" delay={0.2 + idx * 0.1} className="h-full">
                <TiltCard className="h-full">
                  <div className="group relative p-6 sm:p-8 h-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl hover:bg-white/[0.05] transition-colors duration-500 flex flex-col">
                    <div className="flex justify-between items-start mb-10">
                      <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 group-hover:border-white/50/30 transition-colors">
                        {val.icon}
                      </div>
                      <span className="font-serif text-3xl text-white/10 group-hover:text-white/20 transition-colors">{val.num}</span>
                    </div>
                    <h3 className="font-serif text-xl text-white mb-4">{val.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed font-light font-sans mt-auto">{val.text}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTING METHODOLOGY - Side by Side Grid */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <ScrollReveal direction="up" delay={0.1}>
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4 block font-sans">Methodology</span>
                <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
                  What ≥99% Purity <br />
                  <span className="text-white">Actually Means</span>
                </h2>
              </ScrollReveal>
              
              <div className="space-y-6 text-white/50 font-light leading-relaxed text-sm md:text-base font-sans">
                <ScrollReveal direction="up" delay={0.2}>
                  <p className="text-white/70">
                    In the research peptide industry, &ldquo;high purity&rdquo; is a phrase deployed liberally and defined rarely. At Peptides7, purity is not a marketing claim — it is a measurable, documented, and independently verified standard.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  <p className="text-white/70">
                    Every compound in our catalog undergoes <strong className="text-white/80 font-normal">High-Performance Liquid Chromatography (HPLC)</strong> analysis. HPLC separates the components of a peptide sample across a chromatographic column, quantifying each peak by area to determine the relative percentage of the target compound.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.4}>
                  <p className="text-white/70">
                    HPLC purity alone, however, does not confirm molecular identity. For this, every batch also undergoes <strong className="text-white/80 font-normal">Liquid Chromatography–Mass Spectrometry (LC-MS)</strong>, which verifies the exact molecular mass of the compound.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "HPLC Purity Analysis",
                  desc: "Separates all molecular components and quantifies target compound purity. Every batch must report ≥99%.",
                  icon: <FlaskConical className="w-5 h-5 text-white" />
                },
                {
                  label: "LC-MS Identity Confirmation",
                  desc: "Verifies exact molecular weight, confirming correct peptide sequence and ruling out isomers.",
                  icon: <Microscope className="w-5 h-5 text-white" />
                },
                {
                  label: "TFA Residue Testing",
                  desc: "Trifluoroacetic acid is a standard synthesis solvent that must be removed. Our compounds undergo TFA exchange protocols.",
                  icon: <Beaker className="w-5 h-5 text-white" />
                },
                {
                  label: "Heavy Metal Screening",
                  desc: "Trace heavy metals from synthesis reagents can interfere with assays. Our testing screens for lead, arsenic, mercury, and cadmium.",
                  icon: <ShieldCheck className="w-5 h-5 text-white" />
                }
              ].map((item, i) => (
                <ScrollReveal key={i} direction="left" delay={0.3 + i * 0.1}>
                  <div className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-white/50/50 transition-all duration-500 mb-2 sm:mb-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-serif text-white mb-2 group-hover:text-white transition-colors">{item.label}</h3>
                      <p className="text-sm text-white/50 leading-relaxed font-light font-sans">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULFILLMENT PARTNER - Timeline Design */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/flower-3.webp"
            alt="Floral abstract"
            fill
            className="object-cover opacity-10 mix-blend-screen grayscale"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4 block font-sans">Fulfillment</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Our Partnership with <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300 transition-colors">99 Purity Peptides</a></h2>
              <p className="text-white/50 font-light text-sm md:text-base leading-relaxed font-sans">
                Maintaining catalog standards at scale requires the right laboratory infrastructure. That is why Peptides7 partners exclusively with <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a>, a premier US-based supplier recognized for their rigorous quality control.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                label: "Curate & Cart",
                desc: "Select compounds and build your research cart on the Peptides7 storefront.",
                icon: <Award className="w-5 h-5 text-white" />
              },
              {
                step: "02",
                label: "Secure Hand-off",
                desc: <>Proceed to checkout. You are seamlessly redirected to the <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' className='underline hover:text-white transition-colors'>99 Purity Peptides</a> secure payment platform.</>,
                icon: <Lock className="w-5 h-5 text-white" />
              },
              {
                step: "03",
                label: "Rapid Dispatch",
                desc: "Your compounds are packed under temperature-controlled conditions and ship within 24 hours.",
                icon: <Truck className="w-5 h-5 text-white" />
              }
            ].map((s, i) => (
              <ScrollReveal key={i} direction="up" delay={0.2 + i * 0.1} className="h-full">
                <div className="h-full p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ffffff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/10">
                      {s.icon}
                    </div>
                    <span className="font-serif text-2xl text-white/20">{s.step}</span>
                  </div>
                  
                  <h3 className="text-lg font-serif text-white mb-3">{s.label}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed font-sans">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPLIANCE - Clean Minimal Box */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] md:w-1/2 h-1/2 bg-white/5 blur-[40px] md:blur-[60px] pointer-events-none" />
              
              <Lock className="w-8 h-8 text-white/20 mx-auto mb-6" />
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">Research Use Classification</h2>
              
              <div className="space-y-4 text-white/50 text-sm font-light leading-relaxed font-sans max-w-2xl mx-auto">
                <p className="text-white/70">
                  All compounds in the Peptides7 catalog are classified as <strong className="text-white/80 font-normal">Research Use Only (RUO)</strong>. This is a regulatory designation indicating that these materials are intended exclusively for in-vitro laboratory testing, scientific research, and non-clinical development purposes.
                </p>
                <p className="text-white/70">
                  They are not intended for, and must not be used for, human consumption, injection, topical self-application, or any form of self-experimentation.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. FINAL CTA - CLASSIC LUXURY */}
      <section className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[400px] md:min-h-0 md:aspect-[24/9] w-full rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 md:p-20 text-center">
            
            {/* Dark Cinematic Background */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/flower-3.webp" 
                alt="Cinematic abstract texture" 
                fill 
                className="object-cover opacity-30 grayscale mix-blend-luminosity md:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/70 to-[#050505]/90" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/30" />
                  <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-sans">
                    The Final Step
                  </span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/30" />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-10 tracking-tight leading-[1.1]">
                  Elevate Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-light">
                    Laboratory Standards
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <Link 
                  href="/shop"
                  className="inline-flex items-center justify-center bg-white text-[#050505] px-12 py-5 font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#050505] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(227,181,164,0.15)] transition-all duration-500"
                >
                  Explore Catalog
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
