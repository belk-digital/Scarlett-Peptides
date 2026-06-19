"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/animations/TiltCard";
import { Mail, Phone, MapPin, Share2, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";

// --- CONTENT CONSTANTS ---
const CONTACT_CONTENT = {
  hero: {
    headline: "Concierge Support",
    tagline: "Questions about a compound or your order? Our expert team is here to help."
  },
  form: {
    endpoint: "https://formspree.io/f/placeholder", // Replace with actual Formspree endpoint
    subjects: [
      "General Inquiry",
      "Product Question",
      "Order Help",
      "Wholesale / Partnership"
    ],
    consentText: "I understand that products are for research purposes only and not for human or veterinary use.",
    successMessage: "Thank you for reaching out. A member of our concierge team will respond within 24 hours.",
    errorMessage: "Something went wrong sending your message. Please try again or email us directly.",
    submitText: "Send Message",
    submittingText: "Sending..."
  },
  directContact: {
    headline: "Concierge Contact",
    text: "For questions about curation, product specifics, or general inquiries, please use the form to contact our concierge directly.",
    partnerHeadline: "Existing Orders",
    partnerText: "For existing order or payment questions, contact our fulfillment partner 99 Purity Peptides directly.",
    partnerEmail: "support@99puritypeptides.com",
    partnerEmail2: "orders@99puritypeptides.com",
    partnerLink: "http://99puritypeptides.com/"
  },
  location: {
    headline: "Boutique Location",
    text: "Peptides7 Medspa\n148 Line St. Suite D\nCharleston, SC 29403",
    mapUrl: "https://goo.gl/maps/xaFMjHw2aHf7ReRv7",
    hours: "Monday - Friday: 9am-7pm"
  },
  socials: {
    headline: "Connect",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/scarletthawkinschs" },
      { name: "Facebook", url: "https://www.facebook.com/Scarlett-Hawkins-MedSpa-101224386084392/" },
      { name: "TikTok", url: "https://www.tiktok.com/@scarletthawkins.medspa" }
    ]
  },
  disclaimer: "All compounds featured in this catalog are intended strictly for in-vitro testing and laboratory research purposes. They are explicitly not for human consumption, diagnostic purposes, or veterinary use."
};

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (CONTACT_CONTENT.form.endpoint.includes("placeholder")) {
      setTimeout(() => {
        setStatus("success");
        form.reset();
      }, 800);
      return;
    }

    try {
      const response = await fetch(CONTACT_CONTENT.form.endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-40 pb-48 md:pt-56 md:pb-64 px-4 text-center overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/img-7.webp"
            alt="Laboratory background"
            fill
            className="object-cover opacity-40 grayscale mix-blend-luminosity scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/70 to-[#050505] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-[9px] md:text-[10px] font-sans tracking-[0.3em] uppercase text-white/50 mb-6 block">
              Get in Touch
            </span>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.3}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-wide leading-[1.1]">
              {CONTACT_CONTENT.hero.headline}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto font-sans">
              {CONTACT_CONTENT.hero.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. MAIN CONTENT - Split Layout */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full -mt-32 md:-mt-48 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* LEFT: GLASSMORPHISM CONTACT FORM */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.2} className="h-full">
              <div className="h-full relative rounded-3xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-8 md:p-12 lg:p-16 overflow-hidden">
                {/* Subtle shine effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
                
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">Send a Message</h2>
                
                {status === "success" ? (
                  <div className="p-10 bg-white/[0.02] border border-white/10 rounded-3xl text-center h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"></div>
                    <CheckCircle2 className="w-16 h-16 text-white/80 mx-auto mb-6" strokeWidth={1} />
                    <p className="font-serif text-2xl text-white mb-4">Message Received</p>
                    <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto mb-10 font-light">
                      {CONTACT_CONTENT.form.successMessage}
                    </p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-[10px] uppercase tracking-widest text-white border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-white/50 mb-3 ml-1 font-sans">Full Name</label>
                        <input type="text" id="name" name="name" required className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-white/50 focus:bg-white/[0.05] transition-all font-light text-sm" placeholder="Dr. Jane Doe" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-white/50 mb-3 ml-1 font-sans">Email Address</label>
                        <input type="email" id="email" name="email" required className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-white/50 focus:bg-white/[0.05] transition-all font-light text-sm" placeholder="jane@laboratory.edu" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <label htmlFor="phone" className="block text-[10px] uppercase tracking-widest text-white/50 mb-3 ml-1 font-sans">Phone (Optional)</label>
                        <input type="tel" id="phone" name="phone" className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-white/50 focus:bg-white/[0.05] transition-all font-light text-sm" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-[10px] uppercase tracking-widest text-white/50 mb-3 ml-1 font-sans">Subject</label>
                        <div className="relative">
                          <select id="subject" name="subject" required defaultValue="" className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-white/50 focus:bg-white/[0.05] transition-all font-light text-sm appearance-none cursor-pointer">
                            <option value="" disabled className="bg-[#111]">Select a reason...</option>
                            {CONTACT_CONTENT.form.subjects.map(subject => (
                              <option key={subject} value={subject} className="bg-[#111]">{subject}</option>
                            ))}
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white/50">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-white/50 mb-3 ml-1 font-sans">Message</label>
                      <textarea id="message" name="message" required rows={5} className="w-full bg-white/[0.03] border border-white/10 text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-white/50 focus:bg-white/[0.05] transition-all resize-none font-light text-sm" placeholder="How can we assist your research?"></textarea>
                    </div>

                    <div className="flex items-start gap-4 bg-white/[0.02] border border-white/5 p-4 md:p-5 rounded-2xl">
                      <div className="flex items-center h-5 mt-0.5 shrink-0">
                        <input id="consent" name="consent" type="checkbox" required className="w-4 h-4 rounded border-white/20 bg-transparent text-white focus:ring-white focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" />
                      </div>
                      <label htmlFor="consent" className="text-xs text-white/50 leading-relaxed font-light cursor-pointer">
                        {CONTACT_CONTENT.form.consentText}
                      </label>
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 p-4 rounded-xl">{CONTACT_CONTENT.form.errorMessage}</p>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === "submitting"}
                      className="w-full bg-white text-black py-5 rounded-full font-bold tracking-widest uppercase text-[11px] font-sans hover:bg-gray-200 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {status === "submitting" ? CONTACT_CONTENT.form.submittingText : CONTACT_CONTENT.form.submitText}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT: CONTACT CARDS & EDITORIAL IMAGE */}
          <div className="lg:col-span-5 flex flex-col gap-6 relative">
            
            {/* Background Editorial Image for the right column */}
            <div className="absolute inset-0 -mx-4 sm:mx-0 sm:rounded-3xl overflow-hidden z-0 hidden lg:block opacity-40">
               <Image 
                src="/images/img-8.webp" 
                alt="Laboratory abstract" 
                fill 
                className="object-cover mix-blend-luminosity grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#050505]"></div>
            </div>

            <ScrollReveal direction="up" delay={0.3} className="relative z-10 mt-8 lg:mt-0">
              <TiltCard className="w-full">
                <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.08] transition-colors duration-500 group overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <Mail className="w-5 h-5 text-white/50 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-3">{CONTACT_CONTENT.directContact.headline}</h3>
                  <p className="text-sm text-white/50 mb-6 leading-relaxed font-light">{CONTACT_CONTENT.directContact.text}</p>

                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4} className="relative z-10">
              <TiltCard className="w-full">
                <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl hover:bg-white/[0.06] transition-colors duration-500 group overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <ShieldCheck className="w-5 h-5 text-white/50 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-3">{CONTACT_CONTENT.directContact.partnerHeadline}</h3>
                  <p className="text-sm text-white/50 mb-6 leading-relaxed font-light">
                    {CONTACT_CONTENT.directContact.partnerText}
                  </p>
                  <div className="space-y-4">
                    <a href={CONTACT_CONTENT.directContact.partnerLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white hover:text-white/70 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                      99 Purity Peptides Portal
                    </a>
                    <a href={`mailto:${CONTACT_CONTENT.directContact.partnerEmail}`} className="flex items-center gap-3 text-sm text-white hover:text-white/70 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                      {CONTACT_CONTENT.directContact.partnerEmail}
                    </a>
                    <a href={`mailto:${CONTACT_CONTENT.directContact.partnerEmail2}`} className="flex items-center gap-3 text-sm text-white hover:text-white/70 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                      {CONTACT_CONTENT.directContact.partnerEmail2}
                    </a>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 h-full">
              <ScrollReveal direction="up" delay={0.5} className="h-full">
                <TiltCard className="w-full h-full">
                  <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl hover:bg-white/[0.06] transition-colors duration-500 group h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <Building2 className="w-5 h-5 text-white/30 mb-5 group-hover:text-white/70 transition-colors" />
                    <h3 className="font-serif text-xl text-white mb-3">{CONTACT_CONTENT.location.headline}</h3>
                    <a href={CONTACT_CONTENT.location.mapUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 whitespace-pre-line leading-relaxed mb-6 font-light flex-grow hover:text-white transition-colors">
                      {CONTACT_CONTENT.location.text}
                    </a>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">{CONTACT_CONTENT.location.hours}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.6} className="h-full">
                <TiltCard className="w-full h-full">
                  <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl hover:bg-white/[0.06] transition-colors duration-500 group h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <Share2 className="w-5 h-5 text-white/30 mb-5 group-hover:text-white/70 transition-colors" />
                    <h3 className="font-serif text-xl text-white mb-4">{CONTACT_CONTENT.socials.headline}</h3>
                    <div className="space-y-3 text-xs mt-auto">
                      {CONTACT_CONTENT.socials.links.map(social => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-white transition-colors">
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. RESEARCH USE DISCLAIMER */}
      <section className="py-16 px-4 text-center mt-auto border-t border-white/5 relative z-20 bg-[#050505]">
        <p className="max-w-4xl mx-auto text-[10px] uppercase tracking-[0.25em] text-white/30 leading-loose">
          {CONTACT_CONTENT.disclaimer}
        </p>
      </section>
    </div>
  );
}
