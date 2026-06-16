"use client";

import { useState } from "react";
import Link from "next/link";

// --- CONTENT CONSTANTS ---
const CONTACT_CONTENT = {
  hero: {
    headline: "Get in Touch",
    tagline: "Questions about a compound or your order? We're here to help."
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
    text: "For questions about curation, product specifics, or general inquiries, contact our concierge directly.",
    email: "concierge@scarletthawkins.com",
    phone: "1-800-555-0199",
    partnerHeadline: "Existing Orders & Payments",
    partnerText: "For existing order or payment questions, contact our fulfillment partner 99 Purity Peptides directly.",
    partnerEmail: "support@99puritypeptides.com"
  },
  location: {
    headline: "Boutique Location",
    text: "Scarlett Hawkins Medspa\n123 King Street\nCharleston, SC 29401",
    hours: "Mon - Fri: 9am - 5pm EST"
  },
  socials: {
    headline: "Social",
    links: [
      { name: "Instagram", url: "#" },
      { name: "Facebook", url: "#" },
      { name: "TikTok", url: "#" }
    ]
  },
  disclaimer: "All compounds featured in this catalog are intended strictly for in-vitro testing and laboratory research purposes. They are explicitly not for human consumption, diagnostic purposes, or veterinary use."
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // If endpoint is a placeholder, just simulate success for the demo
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
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. PAGE HERO */}
      <section className="py-24 px-4 text-center bg-surface2 border-b border-bordersub relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">Concierge Support</span>
          <h1 className="font-serif text-5xl md:text-7xl text-rosegold mb-6 tracking-wide drop-shadow-sm">
            {CONTACT_CONTENT.hero.headline}
          </h1>
          <p className="font-serif text-2xl text-champagne leading-relaxed max-w-2xl mx-auto">
            {CONTACT_CONTENT.hero.tagline}
          </p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* 2. CONTACT FORM */}
          <div className="card-elevated p-8 md:p-12">
            <h2 className="font-serif text-3xl text-rosegold mb-8">Send a Message</h2>
            
            {status === "success" ? (
              <div className="p-6 bg-surface2 border border-champagne/30 rounded-2xl text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-champagne mx-auto mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-textmain font-medium mb-2">Message Sent Successfully</p>
                <p className="text-sm text-textsub">{CONTACT_CONTENT.form.successMessage}</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-xs uppercase tracking-widest text-rosegold border border-rosegold px-6 py-2 rounded-full hover:bg-rosegold hover:text-base transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-widest text-textsub mb-2">Full Name</label>
                    <input type="text" id="name" name="name" required className="w-full bg-surface2 border border-bordersub text-textmain px-4 py-3 rounded-xl focus:outline-none focus:border-rosegold focus:shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-textsub mb-2">Email Address</label>
                    <input type="email" id="email" name="email" required className="w-full bg-surface2 border border-bordersub text-textmain px-4 py-3 rounded-xl focus:outline-none focus:border-rosegold focus:shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-textsub mb-2">Phone (Optional)</label>
                    <input type="tel" id="phone" name="phone" className="w-full bg-surface2 border border-bordersub text-textmain px-4 py-3 rounded-xl focus:outline-none focus:border-rosegold focus:shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-textsub mb-2">Subject</label>
                    <select id="subject" name="subject" required defaultValue="" className="w-full bg-surface2 border border-bordersub text-textmain px-4 py-3 rounded-xl focus:outline-none focus:border-rosegold focus:shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all appearance-none cursor-pointer">
                      <option value="" disabled>Select a reason...</option>
                      {CONTACT_CONTENT.form.subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-textsub mb-2">Message</label>
                  <textarea id="message" name="message" required rows={5} className="w-full bg-surface2 border border-bordersub text-textmain px-4 py-3 rounded-xl focus:outline-none focus:border-rosegold focus:shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all resize-none"></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input id="consent" name="consent" type="checkbox" required className="w-4 h-4 rounded border-bordersub bg-surface2 text-rosegold focus:ring-rosegold focus:ring-offset-base" />
                  </div>
                  <label htmlFor="consent" className="text-xs text-textmuted leading-relaxed">
                    {CONTACT_CONTENT.form.consentText}
                  </label>
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{CONTACT_CONTENT.form.errorMessage}</p>
                )}

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-rosegold text-base py-4 rounded-full font-medium tracking-widest uppercase text-xs transition-all flex items-center justify-center gap-2 glow-hover disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? CONTACT_CONTENT.form.submittingText : CONTACT_CONTENT.form.submitText}
                </button>
              </form>
            )}
          </div>

          {/* 3, 4, 5. DIRECT CONTACT & INFO PANELS */}
          <div className="flex flex-col gap-8">
            
            <div className="p-8 border border-bordersub rounded-2xl bg-surface2/50 relative overflow-hidden">
              <h3 className="font-serif text-2xl text-rosegold mb-3 relative z-10">{CONTACT_CONTENT.directContact.headline}</h3>
              <p className="text-sm text-textsub mb-6 leading-relaxed relative z-10">{CONTACT_CONTENT.directContact.text}</p>
              <div className="space-y-3 text-sm font-medium relative z-10">
                <a href={`mailto:${CONTACT_CONTENT.directContact.email}`} className="block text-champagne hover:text-rosegold transition-colors">{CONTACT_CONTENT.directContact.email}</a>
                <a href={`tel:${CONTACT_CONTENT.directContact.phone}`} className="block text-champagne hover:text-rosegold transition-colors">{CONTACT_CONTENT.directContact.phone}</a>
              </div>
            </div>

            <div className="p-8 border border-bordersub rounded-2xl bg-surface2 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-rosegold/50"></div>
              <h3 className="font-serif text-2xl text-rosegold mb-3 relative z-10">{CONTACT_CONTENT.directContact.partnerHeadline}</h3>
              <p className="text-sm text-textsub mb-6 leading-relaxed relative z-10">{CONTACT_CONTENT.directContact.partnerText}</p>
              <div className="space-y-3 text-sm font-medium relative z-10">
                <a href={`mailto:${CONTACT_CONTENT.directContact.partnerEmail}`} className="block text-champagne hover:text-rosegold transition-colors">{CONTACT_CONTENT.directContact.partnerEmail}</a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 border border-bordersub rounded-2xl bg-surface2/50">
                <h3 className="font-serif text-xl text-rosegold mb-4">{CONTACT_CONTENT.location.headline}</h3>
                <p className="text-sm text-textsub whitespace-pre-line leading-relaxed mb-4">
                  {CONTACT_CONTENT.location.text}
                </p>
                <p className="text-xs text-textmuted uppercase tracking-widest">{CONTACT_CONTENT.location.hours}</p>
              </div>

              <div className="p-8 border border-bordersub rounded-2xl bg-surface2/50">
                <h3 className="font-serif text-xl text-rosegold mb-4">{CONTACT_CONTENT.socials.headline}</h3>
                <div className="space-y-3 text-sm">
                  {CONTACT_CONTENT.socials.links.map(social => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="block text-textsub hover:text-rosegoldhi transition-colors">
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. RESEARCH USE DISCLAIMER */}
      <section className="py-16 px-4 text-center mt-auto">
        <p className="max-w-3xl mx-auto text-xs uppercase tracking-widest text-textmuted leading-loose border-t border-bordersub pt-16">
          {CONTACT_CONTENT.disclaimer}
        </p>
      </section>
    </div>
  );
}
