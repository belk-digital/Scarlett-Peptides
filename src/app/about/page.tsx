import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Scarlett Hawkins | Research-Grade Peptides, Curated by a Medspa Founder",
  description:
    "Learn how Scarlett Hawkins — founder of Scarlett Hawkins Medspa in Charleston, SC — built a boutique catalog of ≥99% purity research peptides, exclusively fulfilled through 99 Purity Peptides. Radical transparency. Medspa standards.",
};

export default function About() {
  return (
    <div className="flex flex-col w-full bg-base text-textmain">

      {/* ── 1. HERO ── */}
      <section className="py-32 md:py-48 px-4 text-center bg-surface2 border-b border-bordersub relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-transparent to-base/60 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-6 block">Our Story</span>
          <h1 className="font-serif text-5xl md:text-7xl text-rosegold mb-6 tracking-wide leading-tight">
            Research-Grade Peptides,<br />Curated by a Medspa Founder
          </h1>
          <p className="text-lg md:text-xl text-textsub font-light leading-relaxed max-w-2xl mx-auto">
            Scarlett Hawkins brings the uncompromising quality standards of her Charleston medspa directly into the laboratory research supply chain. Every compound. Every batch. Every COA — verified.
          </p>
        </div>
      </section>

      {/* ── 2. FOUNDER STORY ── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="w-full md:w-5/12 aspect-[3/4] relative rounded-2xl overflow-hidden shrink-0">
            <div className="absolute inset-0 flex items-center justify-center text-textmuted bg-surface2 z-0">
              <span className="font-serif opacity-30">Portrait</span>
            </div>
            <Image
              src="/images/about-hero.jpg"
              alt="Scarlett Hawkins — founder of Scarlett Hawkins Medspa and research peptide curator"
              fill
              className="object-cover z-10 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
          </div>
          <div className="w-full md:w-7/12 pt-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block">The Founder</span>
            <h2 className="font-serif text-4xl md:text-5xl text-rosegold mb-10 leading-tight">
              A Medspa Standard Applied to Research Supply
            </h2>
            <div className="space-y-6 text-textsub font-light leading-relaxed">
              <p>
                Nestled in the heart of downtown Charleston, South Carolina, <strong>Scarlett Hawkins Medspa</strong> was built on a singular vision: to merge the warmth of Southern hospitality with the precision of modern aesthetic medicine. For over a decade, Scarlett has guided her clients through transformative wellness journeys — anti-aging protocols, regenerative treatments, and evidence-based aesthetics — earning a reputation for her uncompromising standards and meticulous eye for clinical quality.
              </p>
              <p>
                As the aesthetic and anti-aging landscape evolved, so did Scarlett&apos;s exposure to the research compounds underpinning it. <strong>Peptides</strong> — short-chain amino acid sequences with extraordinary biological specificity — were becoming central to the most cutting-edge conversations in longevity science, metabolic research, and cellular repair. But finding a truly reliable, transparent source for research-grade peptides was, in her words, &ldquo;the most frustrating gap in the entire industry.&rdquo;
              </p>
              <p>
                The market was saturated with anonymous suppliers, ambiguous purity claims, and a complete absence of verifiable documentation. There was no standard. There was no elegance. There was certainly no accountability. For someone who had spent years demanding the highest standards for her clients, it was unacceptable.
              </p>
              <p>
                Scarlett built this catalog to change that narrative. Drawing on deep industry connections and her clinical background in aesthetic medicine, she personally vetted compounds, established an exclusive fulfillment partnership with <strong>99 Purity Peptides</strong>, and created a boutique research catalog that delivers medspa-level standards to the world of laboratory research supply.
              </p>
            </div>
            <p className="mt-10 font-serif text-2xl text-champagne italic">Scarlett Hawkins</p>
            <span className="text-[10px] tracking-[0.2em] uppercase text-textmuted mt-1 block">Founder &amp; CEO</span>
          </div>
        </div>
      </section>

      {/* ── 3. PHILOSOPHY / VALUES ── */}
      <section className="py-24 md:py-32 bg-surface2 border-y border-bordersub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block">What We Stand For</span>
            <h2 className="font-serif text-4xl md:text-5xl text-rosegold mb-4">Our Philosophy</h2>
            <p className="text-textsub font-light text-sm leading-relaxed">
              Four principles govern every compound we select, every supplier we engage, and every order we fulfill.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Purity First",
                text: "Research is only as valid as the materials used. We accept nothing less than ≥99% verified purity across our entire catalog — confirmed by independent HPLC and LC-MS testing, not manufacturer claims."
              },
              {
                num: "02",
                title: "Radical Transparency",
                text: "No hidden sources. No ambiguous certificates. We provide accessible, batch-specific Certificates of Analysis from independent US-based laboratories for every single compound in our collection."
              },
              {
                num: "03",
                title: "Curated, Not Comprehensive",
                text: "We don't stock every compound on the market. We stock the right compounds — hand-selected for documented scientific relevance, manufacturing consistency, and research-community demand."
              },
              {
                num: "04",
                title: "Education Over Hype",
                text: "We prioritize accurate scientific context over marketing language. Our product descriptions, blog content, and customer communications are held to the same evidentiary standard as our compounds."
              }
            ].map((val, idx) => (
              <div key={idx} className="border border-bordersub bg-base p-8 flex flex-col hover:border-textsub transition-colors duration-500">
                <span className="font-serif text-5xl text-rosegold/20 mb-6 leading-none">{val.num}</span>
                <h3 className="font-serif text-xl text-rosegoldhi mb-4">{val.title}</h3>
                <p className="text-sm text-textsub leading-relaxed font-light">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE TEST FOR ── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block">Testing Methodology</span>
              <h2 className="font-serif text-4xl md:text-5xl text-rosegold mb-8 leading-tight">
                What ≥99% Purity Actually Means
              </h2>
              <div className="space-y-6 text-textsub font-light leading-relaxed text-sm md:text-base">
                <p>
                  In the research peptide industry, &ldquo;high purity&rdquo; is a phrase deployed liberally and defined rarely. At Scarlett Hawkins, purity is not a marketing claim — it is a measurable, documented, and independently verified standard.
                </p>
                <p>
                  Every compound in our catalog undergoes <strong>High-Performance Liquid Chromatography (HPLC)</strong> analysis. HPLC separates the components of a peptide sample across a chromatographic column, quantifying each peak by area to determine the relative percentage of the target compound versus any impurities, synthesis byproducts, or residual solvents.
                </p>
                <p>
                  HPLC purity alone, however, does not confirm molecular identity. For this, every batch also undergoes <strong>Liquid Chromatography–Mass Spectrometry (LC-MS)</strong>, which verifies the exact molecular mass of the compound — confirming you have the correct peptide sequence, not a structural isomer or degradation product.
                </p>
                <p>
                  A third concern is <strong>TFA (trifluoroacetic acid)</strong> — a common solvent in peptide synthesis that, if not removed, can interfere with biological assays and compromise research validity. Our compounds are TFA-reduced during purification.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "HPLC Purity Analysis",
                  desc: "High-Performance Liquid Chromatography separates all molecular components and quantifies target compound purity by peak area. Every batch must report ≥99% purity before approval."
                },
                {
                  label: "LC-MS Identity Confirmation",
                  desc: "Liquid Chromatography–Mass Spectrometry verifies exact molecular weight, confirming correct peptide sequence and ruling out isomers, deletions, or synthesis errors."
                },
                {
                  label: "TFA Residue Testing",
                  desc: "Trifluoroacetic acid is a standard synthesis solvent that must be removed. Our compounds undergo TFA exchange protocols verified in each COA."
                },
                {
                  label: "Heavy Metal Screening",
                  desc: "Trace heavy metals from synthesis reagents can interfere with cellular assays. Our testing protocol screens for lead, arsenic, mercury, and cadmium."
                },
                {
                  label: "Independent Batch COA",
                  desc: "Certificates of Analysis are issued by a US-based independent laboratory — not by the manufacturer — and are cross-referenceable by batch number."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-6 border border-bordersub bg-surface2 hover:border-textsub transition-colors duration-300">
                  <div className="w-1.5 shrink-0 bg-rosegold/40 rounded-full mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-textmain mb-2">{item.label}</h3>
                    <p className="text-xs text-textsub leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. THE CATALOG PHILOSOPHY ── */}
      <section className="py-24 md:py-32 bg-surface2 border-y border-bordersub">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block">Curation Criteria</span>
            <h2 className="font-serif text-4xl md:text-5xl text-rosegold mb-4">Why These Compounds?</h2>
            <p className="text-textsub font-light text-sm leading-relaxed">
              Every compound in the Scarlett Hawkins catalog was selected against a strict scientific and commercial criteria — not because it is trending, but because it is genuinely relevant to active research fields.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: "Metabolic Research",
                compounds: "Retatrutide, Tesamorelin",
                desc: "The metabolic peptide space has seen extraordinary scientific interest, driven by research into GLP-1 receptor agonism, adipose tissue dynamics, and growth hormone modulation. Retatrutide — a GLP-1/GIP/glucagon tri-agonist — and Tesamorelin — a GHRH analogue — represent two of the most scientifically significant compounds in this category. Both are stocked in multiple dose formats to support varied research protocols."
              },
              {
                category: "Recovery & Cellular Repair",
                compounds: "BPC-157, TB500, KPV",
                desc: "Research into tissue healing, inflammation modulation, and cellular protection has converged on a core set of peptides. BPC-157 (Body Protection Compound) and TB500 (Thymosin Beta-4) have generated extensive preclinical literature on healing cascades, angiogenesis, and cytoprotection. KPV, a tripeptide fragment of alpha-MSH, has emerged in gut-tissue and inflammation research. Each is available in single-vial and multi-kit formats."
              },
              {
                category: "Longevity & Mitochondrial Health",
                compounds: "NAD+, GHK-Cu, MOTS-C, Glutathione",
                desc: "The longevity research field has identified a set of compounds central to cellular aging, mitochondrial function, and antioxidant capacity. NAD+ supports sirtuin pathway activation and DNA repair research. GHK-Cu (copper peptide) is studied for its role in gene expression modulation and collagen regulation. MOTS-C, a mitochondria-derived peptide, is at the frontier of metabolic homeostasis research. Glutathione rounds out the antioxidant category."
              }
            ].map((cat, i) => (
              <div key={i} className="bg-base border border-bordersub p-8 hover:border-textsub transition-colors duration-500">
                <span className="text-[10px] tracking-[0.2em] uppercase text-textmuted mb-3 block">{cat.category}</span>
                <h3 className="font-serif text-xl text-rosegoldhi mb-2">{cat.compounds}</h3>
                <div className="w-8 h-px bg-rosegold/30 mb-6" />
                <p className="text-textsub text-sm leading-relaxed font-light">{cat.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-base border border-bordersub p-8 hover:border-textsub transition-colors duration-500">
            <span className="text-[10px] tracking-[0.2em] uppercase text-textmuted mb-3 block">Proprietary Blends</span>
            <h3 className="font-serif text-xl text-rosegoldhi mb-2">GLOW &amp; KLOW — Exclusive Scarlett Hawkins Formulations</h3>
            <div className="w-8 h-px bg-rosegold/30 mb-6" />
            <p className="text-textsub text-sm leading-relaxed font-light max-w-3xl">
              GLOW and KLOW are proprietary multi-compound research blends developed exclusively under the Scarlett Hawkins brand. These formulations are not available elsewhere and represent Scarlett&apos;s personal synthesis of the most complementary compounds in the catalog. Each proprietary blend is held to the same independent HPLC and LC-MS verification standard as every individual compound — and each ships with its own Certificate of Analysis.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. PARTNERSHIP WITH 99 PURITY ── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block">Fulfillment Partner</span>
              <h2 className="font-serif text-4xl md:text-5xl text-rosegold mb-8 leading-tight">
                Our Partnership with<br />99 Purity Peptides
              </h2>
              <div className="space-y-6 text-textsub font-light leading-relaxed text-sm md:text-base">
                <p>
                  Maintaining catalog standards at scale requires more than good intentions — it requires the right laboratory infrastructure. That is why Scarlett Hawkins partners exclusively with <strong>99 Purity Peptides</strong>, a premier US-based research-grade peptide supplier recognized in the research community for their rigorous quality control and manufacturing consistency.
                </p>
                <p>
                  The relationship is not a standard dropship arrangement. Scarlett personally established the partnership after an extensive vetting process — auditing their testing protocols, reviewing historical COA documentation, and confirming their environmental controls meet pharmaceutical-grade storage and handling standards.
                </p>
                <p>
                  When you build your cart on the Scarlett Hawkins storefront, you are accessing a direct pipeline to one of the most trusted laboratories in the independent research supply industry. At checkout, you are seamlessly redirected to the 99 Purity Peptides platform to complete your secure payment. Your order is then processed, packed under temperature-controlled conditions, and shipped within 24 hours of confirmation.
                </p>
              </div>
            </div>
            <div className="bg-surface2 border border-bordersub p-10 flex flex-col gap-8">
              <h3 className="font-serif text-2xl text-rosegold">The Fulfillment Process</h3>
              <div className="space-y-6">
                {[
                  { step: "01", label: "Browse & Curate", desc: "Select compounds and build your research cart on the Scarlett Hawkins storefront." },
                  { step: "02", label: "Secure Hand-off", desc: "Proceed to checkout. You are seamlessly redirected to the 99 Purity Peptides secure payment platform." },
                  { step: "03", label: "Order Confirmation", desc: "Sign in or create an account with 99 Purity Peptides, complete secure payment, and receive confirmation." },
                  { step: "04", label: "Rapid Dispatch", desc: "Your lyophilized compounds are packed under temperature-controlled conditions and ship within 24 hours." },
                  { step: "05", label: "COA Access", desc: "Certificates of Analysis for your batch are available for download and cross-reference by batch ID." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-5">
                    <span className="font-serif text-rosegold/40 text-lg shrink-0 w-8">{s.step}</span>
                    <div>
                      <p className="text-sm font-medium text-textmain mb-1">{s.label}</p>
                      <p className="text-xs text-textsub font-light leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. THE STANDARDS (Visual Checklist) ── */}
      <section className="py-20 bg-surface2 border-y border-bordersub">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block">Non-Negotiables</span>
            <h2 className="font-serif text-3xl md:text-4xl text-rosegold">The Standards Checklist</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "≥99% Verified Purity — confirmed by HPLC chromatogram",
              "LC-MS Molecular Identity Verification — every batch",
              "Independent US-Based Third-Party Testing — not manufacturer self-certification",
              "TFA Residue Removal — verified in COA documentation",
              "Heavy Metal Screening — lead, arsenic, mercury, cadmium",
              "Batch-Specific Certificates of Analysis — cross-referenceable by batch ID",
              "Lyophilized Format — for maximum shelf stability and transit integrity",
              "Temperature-Controlled Storage & Dispatch — maintained throughout fulfillment",
              "Research Use Only Classification — strict RUO positioning across all products",
              "No Human or Veterinary Use Claims — ever",
              "Proprietary Blend Documentation — GLOW & KLOW include full COA",
              "Secure Checkout via 99 Purity Peptides — encrypted payment processing"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-base border border-bordersub hover:border-textsub transition-colors duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rosegold shrink-0 mt-2" />
                <span className="text-sm text-textsub font-light leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. WHY PURITY MATTERS ── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block text-center">Scientific Integrity</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rosegold mb-12 text-center leading-tight">
            Why Peptide Purity Is a Research Variable, Not a Marketing Claim
          </h2>
          <div className="space-y-8 text-textsub font-light leading-relaxed">
            <p>
              In any research context, the quality of your source material is a confounding variable. A peptide with 90% purity contains 10% unknown compounds — potentially other peptide sequences, synthesis intermediates, solvent residues, or degradation products. Each of these can produce biological effects that corrupt your data, generate false positives, or — critically — prevent reproducibility by other researchers using cleaner material.
            </p>
            <p>
              The consequences are not merely academic. Research built on impure materials produces unpublishable data at best and misleading conclusions at worst. In the growing field of peptide research — where compounds like <strong>BPC-157</strong>, <strong>Retatrutide</strong>, <strong>GHK-Cu</strong>, and <strong>MOTS-C</strong> are being studied with serious scientific intent — the integrity of the supply chain is inseparable from the integrity of the science.
            </p>
            <p>
              This is why Scarlett Hawkins was built on a single non-negotiable: <strong>every compound in our catalog must achieve ≥99% purity by independent HPLC analysis, confirmed by LC-MS molecular identity verification.</strong> Not 95%. Not &ldquo;pharmaceutical grade&rdquo; as self-defined by the manufacturer. 99%, confirmed by a laboratory with no commercial relationship to the supplier.
            </p>
            <p>
              When you order from Scarlett Hawkins, you are not purchasing a commodity. You are purchasing a research input with a verifiable chain of custody — from synthesis, through third-party testing, through COA documentation, to your laboratory bench.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. RESEARCH USE COMPLIANCE ── */}
      <section className="py-20 bg-surface2 border-y border-bordersub px-4">
        <div className="max-w-4xl mx-auto">
          <div className="border border-bordersub bg-base p-10 md:p-14">
            <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block">Legal &amp; Ethical Positioning</span>
            <h2 className="font-serif text-3xl text-rosegold mb-8">A Note on Research Use Classification</h2>
            <div className="space-y-5 text-textsub text-sm font-light leading-relaxed">
              <p>
                All compounds in the Scarlett Hawkins catalog are classified as <strong>Research Use Only (RUO)</strong>. This is a regulatory designation indicating that these materials are intended exclusively for in-vitro laboratory testing, scientific research, and non-clinical development purposes.
              </p>
              <p>
                Our products are <strong>not</strong> dietary supplements, pharmaceutical drugs, food ingredients, cosmetics, or veterinary medicines. They have not been evaluated by the FDA or any equivalent regulatory body for safety or efficacy in human or animal subjects. They are not intended for, and must not be used for, human consumption, injection, topical self-application, or any form of self-experimentation.
              </p>
              <p>
                By engaging with our catalog, you represent that you are a qualified researcher or laboratory professional operating within the applicable laws and regulations of your jurisdiction. It is the sole responsibility of the purchaser to ensure compliance with all local, state, and federal regulations governing the purchase, possession, and use of research-grade compounds.
              </p>
              <p className="text-textmuted text-xs uppercase tracking-widest leading-loose border-t border-bordersub pt-5 mt-5">
                Scarlett Hawkins provides this catalog in good faith for legitimate scientific and research purposes. Misuse of these compounds is neither condoned nor supported.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. MEDSPA CREDENTIALS / TRUST ── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-4 block">Credentials &amp; Trust</span>
              <h2 className="font-serif text-3xl md:text-4xl text-rosegold leading-tight">
                Why Researchers Trust Scarlett Hawkins
              </h2>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Medspa-Grade Standards",
                  desc: "Scarlett's background in clinical aesthetic medicine established a non-negotiable standard for material quality that most commodity peptide suppliers simply cannot meet."
                },
                {
                  title: "Personally Curated Catalog",
                  desc: "Every compound was hand-selected by Scarlett herself — not by a purchasing department or algorithm. If it's in our catalog, she stood behind it personally."
                },
                {
                  title: "Exclusive Lab Partnership",
                  desc: "Our exclusive fulfillment relationship with 99 Purity Peptides was established after a rigorous vetting process, not a cost-per-unit negotiation."
                },
                {
                  title: "Full COA Transparency",
                  desc: "We publish or provide on-request the independent Certificates of Analysis for every batch. You can verify every number, every peak, every mass reading."
                },
                {
                  title: "No Proprietary Ambiguity",
                  desc: "We don't hide behind &lsquo;proprietary blends&rsquo; without documentation. Even our exclusive GLOW and KLOW formulations ship with full COA paperwork."
                },
                {
                  title: "Researcher-First Communication",
                  desc: "Our team communicates in the language of science, not marketing. Questions about purity, reconstitution, storage, or documentation get straight, accurate answers."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-bordersub bg-surface2 hover:border-textsub transition-colors duration-300">
                  <h3 className="text-sm font-medium text-textmain mb-3">{item.title}</h3>
                  <p className="text-xs text-textsub leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. CTA ── */}
      <section className="py-24 md:py-32 bg-surface2 border-t border-bordersub text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-transparent to-base/60 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.25em] uppercase text-textmuted mb-6 block">Begin Your Research</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rosegold mb-6 leading-tight">
            Ready to Elevate Your Research Standard?
          </h2>
          <p className="text-textsub font-light mb-12 leading-relaxed">
            Browse the catalog of independently verified, ≥99% purity research peptides — curated by a medspa founder, fulfilled by a trusted laboratory partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/shop"
              className="bg-rosegold text-base px-10 py-4 font-medium tracking-widest uppercase text-sm hover:bg-rosegoldhi transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Explore the Collection
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-bordersub text-textsub px-10 py-4 font-medium tracking-widest uppercase text-sm hover:border-textsub hover:text-textmain transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
