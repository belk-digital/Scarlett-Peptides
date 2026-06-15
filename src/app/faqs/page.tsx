"use client";

import { useState } from "react";
import Link from "next/link";

// --- CONTENT CONSTANTS ---
const FAQ_CATEGORIES = [
  {
    id: "ordering",
    title: "Ordering & Checkout",
    faqs: [
      {
        q: "How do I place an order?",
        a: "Build your cart here in our boutique storefront. When you're ready, click checkout to be securely redirected to our partner site, 99 Purity Peptides, where you can sign in and complete payment."
      },
      {
        q: "Why am I redirected to 99 Purity Peptides at checkout?",
        a: "99 Purity Peptides is our vetted fulfillment and payment partner. We curate the catalog; they handle the secure logistics and lab-grade fulfillment. Your cart carries over automatically."
      },
      {
        q: "Will my cart items transfer?",
        a: "Yes, your selected products, variations, and quantities are pre-loaded on their cart page instantly."
      },
      {
        q: "Do I need an account?",
        a: "You will need to sign in or register an account on 99 Purity Peptides during checkout to complete your payment and track your order."
      }
    ]
  },
  {
    id: "payment",
    title: "Payment & Security",
    faqs: [
      {
        q: "Is payment secure?",
        a: "Absolutely. Payment is processed entirely on 99 Purity Peptides' secure checkout infrastructure. This boutique site never handles or stores your payment details."
      },
      {
        q: "What payment methods are accepted?",
        a: "All payment methods and gateways are handled securely on the 99 Purity Peptides checkout page. They typically accept major credit cards and alternative secure payment methods."
      }
    ]
  },
  {
    id: "shipping",
    title: "Shipping & Returns",
    faqs: [
      {
        q: "How fast is shipping?",
        a: "Orders typically ship within 24 hours. Complimentary 2-day shipping is provided on orders over $300. Please view the [99 Purity Peptides Shipping Policy](https://99puritypeptides.com/shipping) for full details."
      },
      {
        q: "Do you ship internationally?",
        a: "International shipping is subject to our fulfillment partner's capabilities. Please refer to the [partner store's shipping policy](https://99puritypeptides.com/shipping) for active regions."
      },
      {
        q: "What's the return policy?",
        a: "Due to the nature of research compounds, returns are strictly regulated. Please view the [99 Purity Peptides Refund Policy](https://99puritypeptides.com/refunds) for eligibility and procedures."
      }
    ]
  },
  {
    id: "quality",
    title: "Products & Quality",
    faqs: [
      {
        q: "How is purity verified?",
        a: "Every batch must achieve ≥99% purity via reversed-phase HPLC. Identity is independently confirmed by LC-MS, and a certificate of analysis (COA) is provided for every batch."
      },
      {
        q: "What is a COA?",
        a: "A Certificate of Analysis (COA) is a laboratory document detailing the exact purity percentage, the impurity profile, and the testing methodologies used to verify the compound."
      },
      {
        q: "How should peptides be stored?",
        a: "As a general guideline, lyophilized peptides should be stored at −20°C with desiccant to maintain integrity. Reconstituted peptides require specific handling based on the compound."
      }
    ]
  },
  {
    id: "usage",
    title: "Using This Site",
    faqs: [
      {
        q: "Are prices final?",
        a: "Pricing shown here is accurate based on our catalog, but final pricing, including any applicable shipping or taxes, is confirmed during checkout on 99 Purity Peptides."
      },
      {
        q: "What does Research Use Only mean?",
        a: "Products featured in this catalog are strictly for in-vitro research and laboratory purposes only. They are explicitly not for human consumption, therapeutic diagnostic purposes, or veterinary use."
      }
    ]
  }
];

const CONTACT_INFO = {
  headline: "Still have questions?",
  text: "Our concierge team is available to assist you with inquiries about our curation, standards, or partnerships.",
  email: "concierge@scarletthawkins.com",
  phone: "1-800-555-0199",
  ctaText: "Contact Us",
  ctaLink: "/contact"
};

export default function FAQs() {
  // Store the currently open FAQ index per category. 
  // e.g., { "ordering": 1, "payment": 0 }
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

  const toggleItem = (categoryId: string, index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index
    }));
  };

  // Helper to safely parse markdown-like links [text](url) in answers
  const renderAnswer = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <a 
          key={match.index} 
          href={match[2]} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-rosegold underline hover:text-rosegoldhi transition-colors"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* HEADER */}
      <section className="py-24 px-4 text-center bg-surface2 border-b border-bordersub relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">Support & Details</span>
          <h1 className="font-serif text-5xl md:text-7xl text-rosegold mb-6 tracking-wide drop-shadow-sm">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-1/4 shrink-0">
          <div className="sticky top-32 card-elevated p-6">
            <h3 className="font-serif text-xl text-rosegold mb-6 border-b border-bordersub pb-4">Categories</h3>
            <nav className="flex flex-col space-y-3 text-sm">
              {FAQ_CATEGORIES.map(cat => (
                <a 
                  key={cat.id} 
                  href={`#${cat.id}`}
                  className="text-textsub hover:text-rosegold transition-colors"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ACCORDIONS */}
        <div className="w-full md:w-3/4 space-y-16">
          {FAQ_CATEGORIES.map(category => (
            <div key={category.id} id={category.id} className="scroll-mt-32">
              <h2 className="font-serif text-3xl text-rosegold mb-8">{category.title}</h2>
              <div className="card-elevated rounded-2xl overflow-hidden divide-y divide-bordersub">
                {category.faqs.map((faq, idx) => {
                  const isOpen = openItems[category.id] === idx;
                  return (
                    <div key={idx} className="group">
                      <button
                        onClick={() => toggleItem(category.id, idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-surface2/50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className={`font-serif text-xl ${isOpen ? 'text-rosegold' : 'text-textmain group-hover:text-rosegold'} transition-colors`}>
                          {faq.q}
                        </span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth={1.5} 
                          stroke="currentColor" 
                          className={`w-5 h-5 text-champagne transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="px-6 pb-6 text-textsub leading-relaxed font-light text-sm md:text-base border-t border-transparent">
                          {renderAnswer(faq.a)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 bg-surface2 border-t border-bordersub text-center px-4">
        <div className="max-w-2xl mx-auto card-elevated p-12">
          <h2 className="font-serif text-4xl text-rosegold mb-6">{CONTACT_INFO.headline}</h2>
          <p className="text-textsub mb-8 leading-relaxed">
            {CONTACT_INFO.text}
          </p>
          <div className="flex flex-col items-center gap-2 mb-10 text-sm text-champagne tracking-wider">
            <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-rosegoldhi transition-colors">{CONTACT_INFO.email}</a>
            <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-rosegoldhi transition-colors">{CONTACT_INFO.phone}</a>
          </div>
          <Link 
            href={CONTACT_INFO.ctaLink}
            className="bg-rosegold text-base px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm glow-hover transition-all inline-block"
          >
            {CONTACT_INFO.ctaText}
          </Link>
        </div>
      </section>
    </div>
  );
}
