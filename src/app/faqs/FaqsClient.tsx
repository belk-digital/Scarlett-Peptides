"use client";

import { useState } from "react";
import Link from "next/link";

type FaqItem = {
  q: React.ReactNode;
  a: React.ReactNode;
};

type FaqCategory = {
  id: string;
  title: string;
  faqs: FaqItem[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "ordering",
    title: "Ordering & Checkout",
    faqs: [
      {
        q: "How do I place an order?",
        a: <>Browse the catalog here and add your chosen products and variants to your cart. When ready, click Checkout — you will be securely redirected to our fulfillment partner, <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a>, where your cart loads automatically and you can complete your order.</>
      },
      {
        q: <>Why am I redirected to <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a> at checkout?</>,
        a: <><a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a> is our exclusive manufacturing and fulfillment partner. Peptides 7 curates the catalog, sets the purity standards, and selects every compound — 99 Purity Peptides handles synthesis, testing, payment processing, and dispatch. This structure lets us focus on curation while you benefit from their lab-grade logistics infrastructure.</>
      },
      {
        q: "Will my cart items transfer when I click Checkout?",
        a: "Yes. Your selected products, variant options, and quantities are pre-loaded into the partner cart automatically. You will not need to rebuild your order."
      },
      {
        q: "Do I need an account to order?",
        a: <>You will need to sign in or create an account on <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a> to complete your purchase, track your order, and access your batch Certificate of Analysis.</>
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: <>Order modifications must be submitted as quickly as possible after placing your order, since fulfillment begins promptly. Contact the support team directly at <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a> to request any changes before your order ships.</>
      },
      {
        q: "What if a product I want is out of stock?",
        a: "Inventory reflects live stock levels at our fulfillment partner. If a product is temporarily unavailable, sign up for our newsletter to be notified when it restocks, or contact us and we will do our best to provide an estimated restock timeline."
      },
      {
        q: "Can I order multiple products in the same transaction?",
        a: "Absolutely. Add as many products and quantities as your research requires to your cart before checking out. All items from a single session will transfer to a single order on the partner site."
      }
    ]
  },
  {
    id: "payment",
    title: "Payment & Security",
    faqs: [
      {
        q: "Is my payment information secure?",
        a: <>Payment is processed entirely within <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a>' secure checkout infrastructure. Peptides 7 does not handle, process, or store any payment data. Their checkout uses industry-standard SSL encryption.</>
      },
      {
        q: "What payment methods are accepted?",
        a: <>Payment options are determined by the <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a> checkout system, which typically accepts major credit cards and select alternative payment methods. Check their checkout page for currently active payment options.</>
      },
      {
        q: "Are prices shown on this site final?",
        a: <>Prices shown in the Peptides 7 catalog are accurate to our current data and reflect the pricing at <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a>. Final totals — including any applicable shipping charges, taxes, or discounts — are confirmed at checkout on the partner site.</>
      },
      {
        q: "Can I use a discount code or promo?",
        a: <>Discount codes and promotions are managed by <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a>. Any valid codes can be entered during their checkout process. Follow their store communications or ours for active promotions.</>
      },
      {
        q: "What currency are prices listed in?",
        a: "All prices on this site are listed in USD (US Dollars)."
      }
    ]
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    faqs: [
      {
        q: "How quickly will my order ship?",
        a: <>Orders are typically processed and dispatched within 24 hours of purchase. Complimentary 2-day shipping is available on qualifying orders over $300. Please review the <a href="https://99puritypeptides.com/shipping-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides Shipping Policy</a> for full details and carrier information.</>
      },
      {
        q: "How are peptides packaged for shipping?",
        a: "Lyophilized peptides are packaged to maintain integrity during transit, with temperature-appropriate protective packaging. Our fulfillment partner prioritizes maintaining cold-chain handling standards throughout the shipping process."
      },
      {
        q: "Do you ship internationally?",
        a: <>International shipping availability and restrictions are determined by our fulfillment partner. Please review the <a href="https://99puritypeptides.com/shipping-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides Shipping Policy</a> for active international regions. Note that import regulations for research compounds vary by country — buyers are responsible for understanding the applicable regulations in their jurisdiction.</>
      },
      {
        q: "How should I store my order upon arrival?",
        a: "Upon arrival, lyophilized peptide vials should be promptly placed in a freezer (ideally −20°C) and protected from light and humidity. Do not leave vials at room temperature for extended periods before reconstitution. Refer to each individual product's storage guidance in the Product Details tab on its page."
      },
      {
        q: "What should I do if my package arrives damaged?",
        a: <>If your order arrives with visible damage, photograph the package and vials immediately and contact <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a>' support team with your order details and photos. Do not use any product that may have been compromised during transit.</>
      },
      {
        q: "What is the return and refund policy?",
        a: <>Due to the nature of research-grade compounds, returns are strictly regulated. Please review the <a href="https://99puritypeptides.com/refund-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides Refund Policy</a> for eligibility criteria and procedures.</>
      }
    ]
  },
  {
    id: "quality",
    title: "Quality & Purity Standards",
    faqs: [
      {
        q: "What purity standard do Peptides 7 products meet?",
        a: "Every compound in the Peptides 7 catalog is independently verified to a minimum of ≥99% purity by HPLC (High-Performance Liquid Chromatography), with molecular identity confirmed by LC-MS (Liquid Chromatography–Mass Spectrometry). These standards apply to every batch, without exception."
      },
      {
        q: "What is a Certificate of Analysis (COA)?",
        a: <>A COA is a formal laboratory document issued by an independent testing facility that details the exact purity percentage of a compound, the testing method used, the impurity profile, and confirmation of molecular identity. Every Peptides 7 product ships with a batch-specific COA, identifiable by the batch number printed on your vial. All COAs are published at <a href="https://99puritypeptides.com/certificates" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99puritypeptides.com/certificates</a>.</>
      },
      {
        q: "What is HPLC and what does it measure?",
        a: "High-Performance Liquid Chromatography (HPLC) is a chromatographic technique that separates the components of a compound mixture and quantifies each as a percentage of total peak area. For peptide purity testing, the target peptide's peak area is expressed as a percentage of all detected peaks — our standard requires the target compound to represent ≥99% of total peak area, meaning synthesis byproducts and impurities collectively total less than 1%."
      },
      {
        q: "What is LC-MS and why is it used in addition to HPLC?",
        a: "Liquid Chromatography–Mass Spectrometry (LC-MS) confirms the exact molecular mass of the compound, distinguishing it from structural isomers, sequence deletions, or substitution errors that HPLC purity testing cannot detect on its own. HPLC tells you how pure something is; LC-MS confirms what it actually is. Both tests together provide a complete identity and purity verification."
      },
      {
        q: "What is TFA, and why does it matter in peptide research?",
        a: "TFA (trifluoroacetic acid) is a solvent commonly used in the reversed-phase HPLC purification of peptides. Residual TFA in a finished peptide product can disrupt cellular assays, affect viability measurements, and confound research data — particularly in in-vitro work. Peptides 7 requires that TFA residue levels be reduced via ion-exchange protocols and verified in each COA."
      },
      {
        q: "Are heavy metals tested?",
        a: "Yes. Every production batch is screened for heavy metal contamination including lead, arsenic, mercury, and cadmium. Results are documented in the batch-specific Certificate of Analysis."
      },
      {
        q: "Who conducts the third-party testing?",
        a: "Testing is performed by an independent, US-based third-party laboratory with no commercial affiliation to the manufacturer or to Peptides 7. This independence is a core requirement of our purity standard — we do not accept self-reported or manufacturer-conducted test results."
      },
      {
        q: "How do I access the COA for my specific batch?",
        a: <>Every vial is labeled with a unique batch number. Use that number to retrieve your batch-specific Certificate of Analysis at <a href="https://99puritypeptides.com/certificates" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99puritypeptides.com/certificates</a>.</>
      }
    ]
  },
  {
    id: "compliance",
    title: "Research & Compliance",
    faqs: [
      {
        q: "What does 'Research Use Only' (RUO) mean?",
        a: "Research Use Only is a regulatory classification indicating that a compound is intended and authorized solely for laboratory research, in-vitro testing, and preclinical scientific development. RUO products have not been evaluated by the FDA or equivalent international bodies for human or veterinary safety and efficacy. They are not drugs, supplements, cosmetics, or food ingredients."
      },
      {
        q: "Who is legally permitted to purchase these products?",
        a: "These products are intended for qualified researchers, laboratory professionals, and scientists operating in compliance with all applicable local, state, and federal laws governing the purchase, possession, handling, and use of research-grade compounds. By purchasing, buyers represent that they meet this qualification."
      },
      {
        q: "Are these products FDA-approved?",
        a: "No. The compounds in this catalog are Research Use Only products that have not been evaluated or approved by the U.S. Food and Drug Administration, or any equivalent international regulatory body, for safety or efficacy in human or animal subjects."
      },
      {
        q: "Can these products be used on myself or administered to another person?",
        a: "No. Self-injection, self-administration, or administration to any other person — regardless of the purpose — is strictly prohibited. These compounds are synthesized for controlled laboratory environments, not for personal wellness or therapeutic use."
      },
      {
        q: "What is the difference between in-vitro and in-vivo research?",
        a: "In-vitro research refers to experiments conducted in a controlled environment outside a living organism — typically in cell culture dishes, test tubes, or laboratory equipment. In-vivo research involves experiments conducted in a living organism. All products sold here are designated for in-vitro laboratory use only."
      },
      {
        q: "Can I resell these products?",
        a: "Redistribution of Peptides 7 products for non-research purposes is strictly prohibited. These compounds are sold under Research Use Only classification and may only change hands in compliance with applicable research compound regulations."
      },
      {
        q: "What happens if my country has restrictions on importing research peptides?",
        a: "Import regulations for research compounds vary significantly by country. Buyers are solely responsible for understanding and complying with the applicable laws in their jurisdiction. Peptides 7 and 99 Purity Peptides are not responsible for any customs delays, seizures, or regulatory complications resulting from international orders."
      }
    ]
  },
  {
    id: "calculator",
    title: "Peptide Calculator & Reconstitution",
    faqs: [
      {
        q: "How do I reconstitute a lyophilized peptide?",
        a: "Lyophilized (freeze-dried) peptides must be reconstituted before use in solution-based assays. Using standard aseptic technique, add bacteriostatic water (or sterile water) slowly to the vial using a syringe, directing the liquid down the side of the vial rather than directly onto the powder. Gently swirl — do not shake vigorously. Allow the powder to dissolve completely before use."
      },
      {
        q: "What is bacteriostatic water and why is it preferred?",
        a: "Bacteriostatic water is sterile water containing 0.9% benzyl alcohol, which inhibits microbial growth and extends the usable life of a reconstituted peptide solution under refrigeration. For research use, it is generally preferred over plain sterile water when the reconstituted solution needs to be stored for more than a single use, as it helps preserve solution integrity over days to weeks."
      },
      {
        q: "How do I calculate the correct concentration after reconstitution?",
        a: <>Concentration (mg/mL) = Amount of peptide (mg) ÷ Volume of solvent added (mL). For example, reconstituting a 10mg vial with 2mL of bacteriostatic water yields a 5mg/mL solution. Use the <a href="http://99puritypeptides.com/peptide-calculator" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides Peptide Calculator</a> to calculate concentrations, volumes, and molar quantities with precision for your specific protocol.</>
      },
      {
        q: "Is there a tool to help me calculate peptide reconstitution volumes?",
        a: <><a href="http://99puritypeptides.com/peptide-calculator" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Yes — use the 99 Purity Peptides Peptide Calculator</a> for precise reconstitution calculations. Enter the peptide amount (mg), desired concentration (mg/mL or μg/mL), or molecular weight for molar conversions. It is free to use and available to all researchers.</>
      },
      {
        q: "How long does reconstituted peptide remain stable?",
        a: "Stability after reconstitution varies by compound, storage conditions, and assay environment. As a general guideline, reconstituted peptides stored refrigerated (2–8°C) in bacteriostatic water are typically stable for several weeks; frozen storage extends this further. Avoid repeated freeze-thaw cycles, which degrade peptide integrity. Always consult compound-specific stability data for your research protocol."
      },
      {
        q: "Can I use sterile water instead of bacteriostatic water?",
        a: "Sterile water may be used for single-use reconstitution — where the entire volume is used immediately in one experiment. If you need the reconstituted solution to remain stable for multiple uses over time, bacteriostatic water is recommended to inhibit microbial contamination during refrigerated storage."
      },
      {
        q: "How do I convert mg to micrograms (mcg) or micromoles (μmol) for my assay?",
        a: <><a href="http://99puritypeptides.com/peptide-calculator" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">The 99 Purity Peptides Peptide Calculator</a> handles unit conversions including mg-to-mcg and mass-to-molar (μmol/nmol) calculations when you enter the compound's molecular weight. Each product's molecular weight is specified in its Certificate of Analysis.</>
      }
    ]
  },

  {
    id: "longevity",
    title: "Longevity Peptides — GHK-Cu, MOTS-C, NAD+, Glutathione",
    faqs: [
      {
        q: "What is GHK-Cu and why does it appear blue when reconstituted?",
        a: "GHK-Cu (Glycyl-L-Histidyl-L-Lysine, CAS 49557-75-7) is a copper-binding tripeptide studied in dermal regeneration, collagen synthesis, and antioxidant enzyme research. The characteristic blue or blue-green color when reconstituted is the result of the copper ion complexed within the peptide structure — this coloration is expected and indicates authentic GHK-Cu, not contamination."
      },
      {
        q: "What is MOTS-C and why is it unique among research peptides?",
        a: "MOTS-C is a 16-amino-acid peptide encoded within mitochondrial DNA — making it one of a rare class of mitochondrially-derived peptides. It is studied for its reported ability to translocate to the cell nucleus under metabolic stress and activate the AMPK pathway, a master regulator of cellular energy balance. Its mitochondrial origin gives it a mechanistic profile distinct from nuclear-encoded research peptides."
      },
      {
        q: "What is NAD+ and how is it different from NMN or NR?",
        a: "NAD+ (Nicotinamide Adenine Dinucleotide) is the terminal coenzyme required for sirtuin activation, PARP enzyme function, and cellular energy metabolism. NMN and NR are precursor molecules that must be converted through the salvage biosynthesis pathway before becoming functional NAD+. This product supplies NAD+ directly, allowing researchers to study the active coenzyme without relying on precursor-to-NAD+ conversion efficiency."
      },
      {
        q: "What is Glutathione and what does the GSH:GSSG ratio measure?",
        a: "Glutathione is a tripeptide (γ-glutamyl-cysteinyl-glycine) that serves as the body's primary endogenous antioxidant. GSH is the reduced, active antioxidant form; GSSG is its oxidized form produced after neutralizing reactive oxygen species. The GSH:GSSG ratio is a standard biomarker used in oxidative stress research — a lower ratio indicates greater oxidative burden in a cellular model."
      },
      {
        q: "Why is NAD+ relevant to aging research?",
        a: "NAD+ levels are reported to decline with age in numerous research models, and this decline is associated with reduced sirtuin activity and impaired DNA repair capacity. Because sirtuins require NAD+ as a cofactor, declining NAD+ availability is considered a mechanism of interest in cellular aging models — making NAD+ one of the most studied molecules in longevity research."
      },
      {
        q: "Are these the same compounds used in IV wellness clinics?",
        a: "The base molecular compound is the same; however, Peptides 7 products are Research Use Only laboratory materials synthesized and tested under research-grade standards — not clinical-grade, pharmaceutical-grade, or human-administrable formulations. They are not intended for infusion, injection, or any form of personal administration."
      },
      {
        q: "What research area is Glutathione's connection to GPx4 and ferroptosis?",
        a: "Glutathione is a required cofactor for glutathione peroxidase 4 (GPx4), an enzyme that protects cells from ferroptosis — an iron-dependent form of regulated cell death. GPx4 uses glutathione to reduce lipid peroxides; when intracellular glutathione is depleted, ferroptosis can be triggered. This relationship makes glutathione availability a key variable in ferroptosis and redox biology research."
      },
      {
        q: "How should longevity peptides be stored?",
        a: "All lyophilized longevity peptides (GHK-Cu, MOTS-C, NAD+, Glutathione) should be stored frozen at −20°C and protected from light until reconstitution. NAD+ and Glutathione are particularly light- and oxidation-sensitive and should be handled accordingly. After reconstitution, refrigerate and use within your protocol's validated stability window."
      }
    ]
  },
  {
    id: "recovery",
    title: "Recovery & Repair Peptides — Wolverine Stack",
    faqs: [
      {
        q: "What is the Wolverine Stack?",
        a: "The Wolverine Stack is a specialized combination product supplying both BPC-157 and TB-500. This combination is one of the most widely referenced pairs in preclinical musculoskeletal, tendon, and ligament repair models. While BPC-157 is studied primarily for its influence on angiogenesis and the nitric oxide pathway, TB-500 (a Thymosin Beta-4 fragment) is studied for its role in actin sequestration and cell migration. Together, they offer a multi-pathway approach to tissue regeneration research."
      },
      {
        q: "Are the two peptides mixed in one vial?",
        a: "No. The stack provides distinct vials of BPC-157 and TB-500. This ensures maximum stability and allows researchers precise control over the dosing and administration of each compound."
      }
    ]
  },
  {
    id: "proprietary",
    title: "Proprietary Blends — GLOW & KLOW",
    faqs: [
      {
        q: "What are GLOW and KLOW?",
        a: <>GLOW and KLOW are proprietary multi-peptide research blends exclusive to the Peptides 7 catalog, manufactured by <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a>. Each is a curated combination of well-characterized peptide fragments formulated to allow researchers to study synergistic multi-peptide interactions in a single vial, rather than sourcing and combining individual compounds separately.</>
      },
      {
        q: "What peptides are in GLOW and KLOW?",
        a: "The precise peptide ratios and component identities in GLOW and KLOW are proprietary formulations developed in partnership with our manufacturing lab and are not published in granular detail. However, every individual peptide component and the finished blend undergo independent third-party purity and identity testing before release, with results documented in a batch-specific Certificate of Analysis."
      },
      {
        q: "How are GLOW and KLOW different from each other?",
        a: "GLOW's formulation draws on peptide fragments studied in dermal repair, collagen signaling, and fibroblast-related research pathways. KLOW's formulation emphasizes peptide fragments studied in connective tissue repair, inflammation-resolution, and cellular regeneration. They are distinct blends designed for different research angles — not duplicates."
      },
      {
        q: "Are proprietary blends tested to the same standard as single-compound products?",
        a: "Yes. GLOW and KLOW are held to identical quality standards: each constituent peptide is independently verified for identity and purity before blending, and the finished blend is retested post-formulation. HPLC purity, LC-MS identity, TFA residue levels, and heavy metal screening are all performed and documented in the batch COA."
      },
      {
        q: "Who decides what goes into the proprietary blends?",
        a: <>The formulations are curated by Peptides 7 in direct partnership with the research and formulation team at <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a>. The selection is driven by research relevance — each blend was created because it solves a specific combinatorial research design challenge, not for marketing reasons.</>
      },
      {
        q: "Are GLOW and KLOW suitable for single-variable dose-response studies?",
        a: "Because GLOW and KLOW are blends of multiple peptide fragments, they are best suited to exploratory or combinatorial research designs rather than single-variable dose-response work. Researchers who require strict single-compound isolation should use the individual compounds in the catalog (e.g., GHK-Cu, NAD+) for controlled mechanistic studies."
      },
      {
        q: "Can I request a custom proprietary blend?",
        a: <>For custom blend inquiries, please reach out via the <Link href="/contact" className="underline hover:text-white transition-colors">Contact page</Link>. Custom formulation requests are evaluated case by case in partnership with <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">99 Purity Peptides</a> based on research justification and minimum order requirements.</>
      }
    ]
  }
];

export default function FaqsClient() {
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

  const toggleItem = (categoryId: string, index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index
    }));
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* HERO */}
      <section className="pt-40 pb-20 px-4 text-center bg-[#050505] border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-xs text-gray-500 tracking-[0.3em] uppercase mb-6 block">Support & Research Guidance</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-wide">
            Frequently Asked Questions
          </h1>
          <p className="text-textsub text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Answers on ordering, purity standards, individual compounds, reconstitution, and research compliance — all in one place.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {FAQ_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-full transition-all duration-300"
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS CALLOUT */}
      <section className="bg-white/[0.02] border-b border-white/10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-400 font-light text-center sm:text-left">
            Need help calculating reconstitution volumes or peptide concentrations?
          </p>
          <a
            href="http://99puritypeptides.com/peptide-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-xs uppercase tracking-widest border border-white/20 hover:border-white/50 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap"
          >
            Use the Peptide Calculator &rarr;
          </a>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16">
        {/* SIDEBAR (Desktop Only) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-32 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-6 pb-4 border-b border-white/10">Categories</h3>
            <nav className="flex flex-col space-y-1">
              {FAQ_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-textsub hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {cat.title}
                </button>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-500 text-xs leading-relaxed mb-3">Reconstitution help</p>
              <a
                href="http://99puritypeptides.com/peptide-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xs underline hover:text-gray-400 transition-colors"
              >
                Peptide Calculator &rarr;
              </a>
            </div>
          </div>
        </aside>

        {/* ACCORDIONS */}
        <div className="flex-1 space-y-20">
          {FAQ_CATEGORIES.map(category => (
            <div key={category.id} id={category.id} className="scroll-mt-32">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">{category.title}</h2>
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {category.faqs.map((faq, idx) => {
                  const isOpen = openItems[category.id] === idx;
                  return (
                    <div key={idx}>
                      <button
                        onClick={() => toggleItem(category.id, idx)}
                        className="w-full px-0 py-5 md:py-6 flex items-start justify-between gap-4 md:gap-6 text-left group"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm md:text-base font-medium transition-colors duration-200 text-white">
                          {faq.q}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-5 h-5 text-gray-500 shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="text-textsub text-sm leading-relaxed pb-6 pr-10 font-light">
                          {faq.a}
                        </p>
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
      <section className="py-24 border-t border-white/10 text-center px-4 bg-white/[0.01]">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs text-gray-500 uppercase tracking-widest mb-4 block">Still have questions?</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">We&apos;re here to help.</h2>
          <p className="text-gray-400 mb-10 leading-relaxed font-light">
            Our team is available for questions about the catalog, purity standards, specific compounds, or ordering. You can also visit{" "}
            <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-gray-400 transition-colors">
              99 Purity Peptides
            </a>{" "}
            directly for order and shipping inquiries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-black px-10 py-4 rounded-full font-medium tracking-widest uppercase text-xs inline-block hover:bg-white/90 transition-all"
            >
              Contact Us
            </Link>
            <a
              href="http://99puritypeptides.com/peptide-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-10 py-4 rounded-full font-medium tracking-widest uppercase text-xs inline-block hover:border-white/50 transition-all"
            >
              Peptide Calculator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
