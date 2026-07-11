export type Variant = {
  label: string;
  price: number;
  regularPrice?: number;
  sku: string;
  attributes?: Record<string, string>;
  image?: string;         // Variant-specific image
};

export type Tab = {
  title: string;
  paragraphs: string[];
};

export type ProductFAQ = {
  q: string;
  a: string;
};

export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;          // Default/Parent image
  category: string;
  isVariable: boolean;
  price?: number;         // Sale price for simple products
  regularPrice?: number;  // Regular price for simple products
  variants?: Variant[];
  tabs?: Tab[];
  faqs?: ProductFAQ[];
};

const QUALITY_TAB: Tab = {
  title: "Quality & Purity Standard",
  paragraphs: [
    "Every compound in the Peptides7 catalog, including this product, is tested by an independent, US-based third-party laboratory prior to release. Testing is never conducted by the manufacturer or any commercially affiliated entity.",
    "Purity is verified by High-Performance Liquid Chromatography (HPLC) to a confirmed minimum of ≥99%. The HPLC chromatogram quantifies the target compound as a percentage of total peak area, confirming that synthesis byproducts, degradation products, and residual impurities fall below the 1% threshold.",
    "Molecular identity is confirmed by Liquid Chromatography–Mass Spectrometry (LC-MS), which verifies the exact molecular mass of the compound and rules out structural isomers, sequence deletions, or substitution errors that HPLC alone cannot detect.",
    "TFA (trifluoroacetic acid), a common solvent used in reversed-phase HPLC purification of peptides, is reduced to minimal levels via exchange protocols and verified in each Certificate of Analysis. Residual TFA can disrupt cellular assays and confound biological data; its control is a non-negotiable element of our standard.",
    "Heavy metal contamination (lead, arsenic, mercury, and cadmium) is screened for in every production batch. A batch-specific Certificate of Analysis (COA) is available for all purchases and is cross-referenceable by the unique batch number printed on your vial.",
  ],
};

const COMPLIANCE_TAB: Tab = {
  title: "Compliance Notice",
  paragraphs: [
    "This product is classified as Research Use Only (RUO). It is synthesized exclusively for in-vitro laboratory testing, preclinical research, and scientific development purposes. It is not a dietary supplement, pharmaceutical drug, cosmetic, food ingredient, or veterinary medicine.",
    "This product has not been evaluated by the U.S. Food and Drug Administration or any equivalent international regulatory body for safety or efficacy in human or animal subjects. It is not intended for, and must not be used for, human consumption, self-injection, topical self-application, veterinary administration, or any form of self-experimentation.",
    "By purchasing this product, the buyer represents that they are a qualified researcher or laboratory professional operating in full compliance with all applicable local, state, and federal laws and regulations governing the purchase, possession, handling, and use of research-grade chemical compounds.",
    "Peptides7 and its fulfillment partner <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a> provide this product in good faith for legitimate scientific and research purposes. Any misuse of this compound is neither condoned nor supported. Redistribution of this product for non-research purposes is strictly prohibited.",
  ],
};

export const products: Product[] = [
  {
    slug: "glow",
    name: "GLOW",
    shortDescription:
      "A proprietary multi-peptide blend formulated for skin-quality, anti-aging, and cellular repair research. ≥99% HPLC purity, independently verified.",
    longDescription:
      "GLOW is a proprietary research blend combining several well-characterized peptide fragments selected for their reported roles in dermal repair, collagen signaling, and tissue regeneration pathways. Formulated as part of the Peptides7 curated catalog, GLOW is intended to give researchers a single, convenient vial to study synergistic effects between complementary peptide mechanisms rather than sourcing and combining individual compounds themselves. Each batch is synthesized via solid-phase peptide synthesis, purified by reversed-phase HPLC, and independently verified at ≥99% purity with a published Certificate of Analysis. GLOW reflects Peptides7' philosophy of curation over volume: it exists because it solves a specific research formulation problem, not because it is trending.",
    image: "/images/products/glow.jpg",
    category: "Glow Research",
    isVariable: true,
    variants: [
      { label: "Single", price: 110.0, regularPrice: 125.0, sku: "GLOW" },
      { label: "5 Kit (Save 10%)", price: 450.0, regularPrice: 550.0, sku: "GLOW-K5" },
      { label: "10 Kit (Best Value)", price: 900.0, regularPrice: 1100.0, sku: "GLOW-K10" },
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "GLOW is supplied as a lyophilized (freeze-dried) powder in a sealed glass vial, packaged for stability during shipping and long-term cold storage. Each vial is labeled with a unique batch number that corresponds to its individual Certificate of Analysis.",
          "As a proprietary blend, GLOW's exact peptide ratios are formulated by Peptides7 in partnership with <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a> and are not published in granular detail; however, every component is independently tested for identity and purity prior to blending, and the finished blend is tested again post-formulation.",
          "GLOW is supplied for laboratory reconstitution using bacteriostatic water or sterile water for research purposes, following standard aseptic technique appropriate for in-vitro and preclinical research environments.",
        ],
      },
      {
        title: "Research Focus & Mechanism Overview",
        paragraphs: [
          "GLOW's formulation draws on peptide fragments studied for their roles in fibroblast signaling, collagen synthesis pathways, and dermal matrix remodeling, areas of active interest in cosmetic and regenerative peptide research.",
          "Researchers studying skin-aging models, wound-healing assays, or extracellular matrix dynamics may use GLOW to explore how multiple peptide mechanisms interact when introduced together, rather than evaluating each compound in isolation.",
          "Because GLOW is a blend, it is best suited to exploratory and combinatorial research designs. Researchers requiring strict single-compound dose-response data should consider Peptides7' individual compounds (such as GHK-Cu) instead.",
        ],
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is GLOW exactly?",
        a: "GLOW is a proprietary multi-peptide research blend curated by Peptides7 and manufactured by <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a>. It combines several peptide fragments associated with dermal and cellular repair research into a single vial for combinatorial research use.",
      },
      {
        q: "Why doesn't Peptides7 publish the exact ratio of peptides in GLOW?",
        a: "The specific formulation ratio is proprietary intellectual property developed in partnership with our manufacturing lab. While the exact blend ratio is not published, every individual component and the finished blend are independently tested for identity and purity, and a Certificate of Analysis is provided with every batch.",
      },
      {
        q: "Is GLOW tested the same way as single-compound products?",
        a: "Yes. GLOW undergoes the same HPLC purity verification and LC-MS identity confirmation as every other product in the catalog, performed by an independent third-party laboratory unaffiliated with the manufacturer.",
      },
      {
        q: "How should GLOW be reconstituted?",
        a: "GLOW is supplied as a lyophilized powder and should be reconstituted with bacteriostatic water or sterile water using standard aseptic laboratory technique. Reconstitution volume depends on your specific research protocol and concentration requirements.",
      },
      {
        q: "How should GLOW be stored before and after reconstitution?",
        a: "Prior to reconstitution, store the lyophilized vial in a freezer or refrigerator away from light. After reconstitution, peptide blends are generally more stable when refrigerated and used within the timeframe established by your own research protocol's stability testing.",
      },
      {
        q: "What is the difference between GLOW and KLOW?",
        a: "GLOW and KLOW are distinct proprietary blends formulated for different research applications. Each is built from a different selection of peptide fragments. See each product's Research Focus tab for details on their respective areas of interest.",
      },
      {
        q: "Can I get the Certificate of Analysis for my specific batch?",
        a: "Yes. Every vial is printed with a unique batch number, which can be cross-referenced against the COA library to retrieve the exact test results for the batch you received.",
      },
      {
        q: "Is bulk pricing available for GLOW?",
        a: "Yes, GLOW is available in Single, 5-Kit, and 10-Kit configurations, with the 10-Kit offering the largest per-unit savings for ongoing research programs.",
      },
    ],
  },
  {
    slug: "klow",
    name: "KLOW",
    shortDescription:
      "A proprietary peptide blend curated for skin, recovery, and cellular signaling research. Independently verified to ≥99% purity with full COA transparency.",
    longDescription:
      "KLOW is a second proprietary peptide blend in the Peptides7 catalog, formulated with a distinct selection of peptide fragments from GLOW to support a different angle of dermal, repair, and cellular signaling research. Like every product in this catalog, KLOW is manufactured exclusively by <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a> and tested by an independent third-party laboratory before release. KLOW was added to the catalog to give researchers a second combinatorial option when GLOW's specific composition does not align with their study design, not as a duplicate, but as a complementary formulation with its own mechanistic focus.",
    image: "/images/products/klow.jpg",
    category: "Vitality Research",
    isVariable: true,
    variants: [
      { label: "Single", price: 125.0, regularPrice: 130.0, sku: "KLOW" },
      { label: "5 Kit (Save 10%)", price: 500.0, regularPrice: 650.0, sku: "KLOW-K5" },
      { label: "10 Kit (Best Value)", price: 1000.0, regularPrice: 1300.0, sku: "KLOW-K10" },
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "KLOW is supplied as a lyophilized powder in a sealed glass vial with a unique batch number tied to its own Certificate of Analysis. Packaging and cold-chain handling follow the same protocol used across the Peptides7 catalog.",
          "As with GLOW, the precise blend ratio is proprietary, but each constituent peptide and the finished formulation are independently verified for identity and purity prior to release.",
          "KLOW is intended for laboratory reconstitution with bacteriostatic or sterile water, prepared using standard aseptic technique appropriate to in-vitro and preclinical research settings.",
        ],
      },
      {
        title: "Research Focus & Mechanism Overview",
        paragraphs: [
          "KLOW's formulation draws on peptide fragments studied in connective tissue repair, anti-inflammatory signaling, and cellular regeneration models, offering researchers a complementary combinatorial profile to GLOW.",
          "Researchers working on recovery, inflammation-resolution, or tissue-remodeling assays may find KLOW's blend useful for exploring multi-pathway interactions in a single formulation.",
          "As with any blend, KLOW is best suited to exploratory or combinatorial study designs rather than single-variable dose-response work.",
        ],
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is KLOW?",
        a: "KLOW is a proprietary multi-peptide research blend curated by Peptides7 and manufactured by <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a>, formulated around peptide fragments studied for repair and inflammation-resolution research.",
      },
      {
        q: "How is KLOW different from GLOW?",
        a: "GLOW and KLOW use different peptide selections aimed at different research angles. GLOW leans toward dermal and collagen-signaling research, while KLOW leans toward connective tissue repair and inflammation-resolution research. Review each product's Research Focus tab to determine which aligns with your study.",
      },
      {
        q: "Is the exact composition of KLOW published?",
        a: "The specific blend ratio is proprietary. However, every individual peptide component and the finished blend undergo independent third-party testing for identity and purity, with results available via batch-specific COA.",
      },
      {
        q: "How do I reconstitute KLOW?",
        a: "KLOW ships as a lyophilized powder intended for reconstitution with bacteriostatic or sterile water under standard aseptic laboratory conditions.",
      },
      {
        q: "What purity standard does KLOW meet?",
        a: "KLOW is verified to ≥99% purity via HPLC and confirmed by LC-MS identity testing, with heavy metal and TFA residue screening performed on every batch.",
      },
      {
        q: "Can I purchase KLOW in bulk for an ongoing study?",
        a: "Yes, KLOW is available as a Single vial, 5-Kit, or 10-Kit, with increasing per-unit savings at higher quantities.",
      },
      {
        q: "Where can I find the COA for my KLOW batch?",
        a: "Each vial carries a unique batch number that can be used to retrieve that specific batch's Certificate of Analysis.",
      },
    ],
  },
  {
    slug: "ghk-cu",
    name: "GhkCU",
    shortDescription:
      "GHK-Cu copper peptide studied for gene expression, collagen synthesis, and wound-healing research. ≥99% pure, third-party verified.",
    longDescription:
      "GHK-Cu (Glycyl-L-Histidyl-L-Lysine copper complex, CAS 49557-75-7) is a naturally occurring copper-binding tripeptide first identified in human plasma and widely studied in dermatological and regenerative research for its reported influence on gene expression, collagen and elastin synthesis, and antioxidant enzyme activity. Its copper-chelating structure is central to its proposed mechanism, facilitating interactions with copper-dependent enzymatic pathways implicated in tissue remodeling. Peptides7 sources GHK-Cu exclusively through <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a>, with every batch independently verified by HPLC and LC-MS prior to release and accompanied by a Certificate of Analysis.",
    image: "/images/products/ghk-cu-100mg.jpg",
    category: "Longevity Research",
    isVariable: true,
    variants: [
      { label: "50mg - Single", price: 50.0, regularPrice: 70.0, sku: "GHKCU-50", image: "/images/products/ghk-cu-50mg.jpg" },
      { label: "50mg - 5 Kit", price: 210.0, regularPrice: 300.0, sku: "GHKCU-50-K5", image: "/images/products/ghk-cu-50mg.jpg" },
      { label: "50mg - 10 Kit", price: 400.0, regularPrice: 600.0, sku: "GHKCU-50-K10", image: "/images/products/ghk-cu-50mg.jpg" },
      { label: "100mg - Single", price: 67.5, regularPrice: 90.0, sku: "GHKCU-100", image: "/images/products/ghk-cu-100mg.jpg" },
      { label: "100mg - 5 Kit", price: 330.0, regularPrice: 400.0, sku: "GHKCU-100-K5", image: "/images/products/ghk-cu-100mg.jpg" },
      { label: "100mg - 10 Kit", price: 650.0, regularPrice: 750.0, sku: "GHKCU-100-K10", image: "/images/products/ghk-cu-100mg.jpg" },
      // 200mg commented out per user instructions
      // { label: "200mg - Single", price: 135.0, regularPrice: 150.0, sku: "GHKCU-200", image: "/images/products/ghk-cu-200mg.jpg" },
      // { label: "200mg - 10 Kit", price: 1000.0, regularPrice: 1350.0, sku: "GHKCU-200-K10", image: "/images/products/ghk-cu-200mg.jpg" },
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "GHK-Cu is supplied as a lyophilized powder, available in 50mg, 100mg, and 200mg vial sizes to support a range of research protocol concentrations. Each vial displays a unique batch number tied to its Certificate of Analysis.",
          "The copper-complexed structure gives GHK-Cu solutions a characteristic pale blue to blue-green tint when reconstituted, a visual indicator consistent with the compound's copper content, not an impurity.",
          "GHK-Cu should be reconstituted with bacteriostatic or sterile water under standard aseptic technique and is intended strictly for in-vitro laboratory research applications.",
        ],
      },
      {
        title: "Research Focus & Mechanism Overview",
        paragraphs: [
          "GHK-Cu has been studied for its reported ability to modulate the expression of genes involved in collagen, elastin, and matrix metalloproteinase regulation, making it a frequent subject of dermal regeneration and anti-aging research models.",
          "Its copper-binding capacity is thought to be central to its activity, supporting interactions with copper-dependent enzymes such as lysyl oxidase and superoxide dismutase, both implicated in tissue remodeling and antioxidant defense pathways.",
          "Research models exploring wound healing, hair follicle biology, and skin matrix aging frequently reference GHK-Cu due to its broad reported activity across multiple cellular repair pathways.",
        ],
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is GHK-Cu?",
        a: "GHK-Cu is a copper-binding tripeptide (Glycyl-L-Histidyl-L-Lysine, CAS 49557-75-7) studied in research contexts for its reported roles in gene expression modulation, collagen synthesis, and wound-healing pathways.",
      },
      {
        q: "Why is the reconstituted solution blue or blue-green?",
        a: "The blue-green tint comes from the copper ion complexed within the peptide structure. This coloration is expected and consistent with authentic GHK-Cu. It is not a sign of contamination.",
      },
      {
        q: "What vial sizes are available?",
        a: "GHK-Cu is available in 50mg, 100mg, and 200mg vials, each offered as a single unit or a 10-kit for larger research programs.",
      },
      {
        q: "How is GHK-Cu purity verified?",
        a: "Each batch is tested by an independent third-party laboratory using HPLC for purity quantification and LC-MS for molecular identity confirmation, with results published in a batch-specific COA.",
      },
      {
        q: "How should GHK-Cu be reconstituted and stored?",
        a: "Reconstitute with bacteriostatic or sterile water using standard aseptic technique. Store the lyophilized vial refrigerated or frozen and away from light; once reconstituted, refrigerate and use according to your protocol's stability requirements.",
      },
      {
        q: "What research areas commonly use GHK-Cu?",
        a: "GHK-Cu is frequently referenced in dermal regeneration, collagen synthesis, antioxidant enzyme activity, and wound-healing research models.",
      },
      {
        q: "Is GHK-Cu the same as copper peptide products sold in cosmetics?",
        a: "No. This product is a Research Use Only laboratory compound intended for in-vitro study, not a finished cosmetic formulation, and is not intended for topical application outside a research setting.",
      },
      {
        q: "Can I request the COA for a specific GHK-Cu batch?",
        a: "Yes. Every vial is labeled with a unique batch number that corresponds to its own published Certificate of Analysis.",
      },
    ],
  },
  {
    slug: "mots-c",
    name: "MOTS-C",
    shortDescription:
      "Mitochondrial-derived peptide studied for AMPK activation and metabolic/exercise-mimetic research. ≥99% verified purity.",
    longDescription:
      "MOTS-C (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a 16-amino-acid peptide encoded within mitochondrial DNA and studied for its reported role as a regulator of cellular metabolic homeostasis. Research interest in MOTS-C centers on its ability to translocate to the nucleus under metabolic stress and activate the AMPK (AMP-activated protein kinase) pathway, a mechanism frequently associated with exercise-mimetic and metabolic-adaptation research models. Peptides7 sources MOTS-C exclusively from <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a>, with independent third-party testing confirming ≥99% purity on every batch.",
    image: "/images/products/mots-c-10mg.jpg",
    category: "Metabolic Research",
    isVariable: true,
    variants: [
      { label: "10mg - Single", price: 55.0, regularPrice: 70.0, sku: "MOTS-C-10", image: "/images/products/mots-c-10mg.jpg" },
      { label: "10mg - 5 Kit", price: 320.0, regularPrice: 350.0, sku: "MOTS-C-10-K5", image: "/images/products/mots-c-10mg.jpg" },
      { label: "10mg - 10 Kit", price: 600.0, regularPrice: 700.0, sku: "MOTS-C-10-K10", image: "/images/products/mots-c-10mg.jpg" },
      { label: "40mg - Single", price: 110.0, regularPrice: 120.0, sku: "MOTS-C-40", image: "/images/products/mots-c-40mg.jpg" },
      { label: "40mg - 5 Kit", price: 470.0, regularPrice: 550.0, sku: "MOTS-C-40-K5", image: "/images/products/mots-c-40mg.jpg" },
      { label: "40mg - 10 Kit", price: 900.0, regularPrice: 1100.0, sku: "MOTS-C-40-K10", image: "/images/products/mots-c-40mg.jpg" },
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "MOTS-C is supplied as a lyophilized powder in 10mg and 40mg vial sizes, each carrying a unique batch number tied to an independently issued Certificate of Analysis.",
          "Reconstitution should be performed with bacteriostatic or sterile water under standard aseptic laboratory technique, consistent with handling protocols for other research peptides in this catalog.",
          "As a mitochondrially-encoded micropeptide, MOTS-C is supplied in relatively small molar quantities per milligram; researchers should account for its low molecular weight (~2174 Da) when calculating molar concentrations for assay design.",
        ],
      },
      {
        title: "Research Focus & Mechanism Overview",
        paragraphs: [
          "MOTS-C is studied as a mitochondrial-derived signaling peptide capable of nuclear translocation under metabolic or oxidative stress, where it is reported to influence nuclear gene expression related to metabolic adaptation.",
          "A central area of research interest is MOTS-C's activation of AMPK, a master regulator of cellular energy balance, positioning it as a peptide of interest in exercise-mimetic and metabolic stress-adaptation models.",
          "Because MOTS-C levels have been observed to decline with age in some research models, it is also frequently referenced in studies examining the relationship between mitochondrial signaling and age-related metabolic decline.",
        ],
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is MOTS-C?",
        a: "MOTS-C is a 16-amino-acid peptide encoded by mitochondrial DNA, studied for its reported role in activating the AMPK pathway and regulating cellular metabolic homeostasis.",
      },
      {
        q: "Why is MOTS-C of interest in exercise and metabolic research?",
        a: "Research models report that MOTS-C levels increase with exercise and that the peptide can activate AMPK signaling, a pathway central to cellular energy regulation, making it a peptide of interest in exercise-mimetic research.",
      },
      {
        q: "What vial sizes are available for MOTS-C?",
        a: "MOTS-C is available in 10mg and 40mg vials, each offered as a Single unit, 5-Kit, or 10-Kit.",
      },
      {
        q: "How is MOTS-C purity verified?",
        a: "Every batch is tested by an independent third-party laboratory using HPLC for purity and LC-MS for molecular identity, with results documented in a batch-specific Certificate of Analysis.",
      },
      {
        q: "How should MOTS-C be reconstituted and stored?",
        a: "Reconstitute with bacteriostatic or sterile water using standard aseptic technique. Store the lyophilized vial frozen or refrigerated away from light, and refrigerate after reconstitution per your protocol's stability requirements.",
      },
      {
        q: "Why does mitochondrial origin matter for this peptide's research relevance?",
        a: "Because MOTS-C is encoded within mitochondrial rather than nuclear DNA, it is studied as a unique signaling link between mitochondrial function and nuclear gene expression, a mechanism distinct from most nuclear-encoded research peptides.",
      },
      {
        q: "Can I get the COA for my specific MOTS-C batch?",
        a: "Yes. Each vial is printed with a unique batch number that can be cross-referenced to retrieve that batch's specific test results.",
      },
    ],
  },

  {
    slug: "nad",
    name: "NAD+",
    shortDescription:
      "Nicotinamide Adenine Dinucleotide studied for sirtuin activation, cellular energy, and longevity research. ≥99% pure, COA-verified.",
    longDescription:
      "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme essential to cellular energy metabolism and a central molecule of interest in longevity and mitochondrial-health research. It serves as a required cofactor for sirtuins, PARP enzymes, and CD38, all pathways implicated in DNA repair, metabolic regulation, and cellular aging research models. Because NAD+ levels are reported to decline with age in numerous research contexts, it remains one of the most actively studied molecules in longevity science. Peptides7 offers NAD+ exclusively through <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a>, manufactured and independently tested to ≥99% purity with a published Certificate of Analysis per batch.",
    image: "/images/products/nadplus-500mg.jpg",
    category: "Cognitive Research",
    isVariable: true,
    variants: [
      { label: "500mg - Single", price: 60.0, regularPrice: 100.0, sku: "NAD-500", image: "/images/products/nadplus-500mg.jpg" },
      { label: "500mg - 5 Kit", price: 375.0, regularPrice: 450.0, sku: "NAD-500-K5", image: "/images/products/nadplus-500mg.jpg" },
      { label: "500mg - 10 Kit", price: 700.0, regularPrice: 900.0, sku: "NAD-500-K10", image: "/images/products/nadplus-500mg.jpg" },
      { label: "1000mg - Single", price: 100.0, regularPrice: 125.0, sku: "NAD-1000", image: "/images/products/nad-1000mg.jpg" },
      { label: "1000mg - 5 Kit", price: 450.0, regularPrice: 625.0, sku: "NAD-1000-K5", image: "/images/products/nad-1000mg.jpg" },
      { label: "1000mg - 10 Kit", price: 800.0, regularPrice: 1250.0, sku: "NAD-1000-K10", image: "/images/products/nad-1000mg.jpg" },
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "NAD+ is supplied as a lyophilized powder in 500mg and 1000mg vial sizes, each labeled with a unique batch number tied to its own Certificate of Analysis.",
          "NAD+ is a light- and temperature-sensitive molecule; vials should be stored frozen and protected from light prior to reconstitution to preserve molecular integrity.",
          "Reconstitution should be performed with bacteriostatic or sterile water under standard aseptic technique, with prepared solution used promptly per your research protocol given NAD+'s relative instability once in solution.",
        ],
      },
      {
        title: "Research Focus & Mechanism Overview",
        paragraphs: [
          "NAD+ functions as an essential cofactor for sirtuins (SIRT1-7), a family of enzymes widely studied for their roles in DNA repair, metabolic regulation, and cellular stress resistance, core mechanisms in longevity research.",
          "NAD+ is also consumed by PARP enzymes during DNA damage repair and by CD38, an enzyme whose activity is reported to increase with age and contribute to NAD+ depletion in various research models.",
          "Researchers distinguish NAD+ from its precursors NMN and NR, which require conversion through the salvage pathway; NAD+ itself is the terminal coenzyme studied directly in mitochondrial function and cellular energy assays.",
        ],
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is NAD+?",
        a: "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme central to cellular energy metabolism, serving as a required cofactor for sirtuins, PARP enzymes, and CD38, pathways widely studied in longevity and metabolic research.",
      },
      {
        q: "How is NAD+ different from NMN or NR?",
        a: "NMN and NR are precursor molecules that must be converted through the NAD+ salvage pathway before becoming functional NAD+. This product supplies NAD+ directly, allowing researchers to study the terminal coenzyme without relying on precursor conversion efficiency.",
      },
      {
        q: "Why is NAD+ relevant to aging research?",
        a: "NAD+ levels have been reported to decline with age across multiple research models, and this decline is linked to reduced sirtuin activity and impaired DNA repair capacity, making NAD+ a focal molecule in cellular aging research.",
      },
      {
        q: "What vial sizes are available?",
        a: "NAD+ is available in 500mg and 1000mg vials, offered as a Single unit or 5-Kit.",
      },
      {
        q: "How should NAD+ be stored?",
        a: "Store the lyophilized vial frozen and protected from light prior to use. NAD+ is relatively unstable once reconstituted, so prepared solutions should be used promptly according to your protocol's stability data.",
      },
      {
        q: "How is NAD+ purity verified?",
        a: "Each batch is independently tested via HPLC for purity and LC-MS for molecular identity confirmation, with a Certificate of Analysis published for every batch.",
      },
      {
        q: "Can I access the COA for my specific NAD+ batch?",
        a: "Yes. Every vial is labeled with a unique batch number that corresponds to its own published Certificate of Analysis.",
      },
    ],
  },
  {
    slug: "glutathione-600-1500",
    name: "Glutathione",
    shortDescription:
      "Tripeptide antioxidant studied for redox balance and oxidative stress research. ≥99% purity, independently verified by COA.",
    longDescription:
      "Glutathione (GSH) is a tripeptide composed of glutamine, cysteine, and glycine, recognized as one of the body's principal endogenous antioxidants. Research interest centers on its central role in maintaining cellular redox balance, detoxifying reactive oxygen species, and regenerating other antioxidants such as vitamins C and E. The ratio of reduced glutathione (GSH) to its oxidized form (GSSG) is a commonly studied biomarker of oxidative stress in laboratory research. Peptides7 sources Glutathione exclusively from <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a>, with each batch independently verified to ≥99% purity and accompanied by a published Certificate of Analysis.",
    image: "/images/products/glutathione-200mg.jpg",
    category: "Recovery Research",
    isVariable: true,
    variants: [
      { label: "600mg", price: 65.0, sku: "GLUTATHIONE-600" },
      { label: "1500mg", price: 95.0, sku: "GLUTATHIONE-1500" },
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "Glutathione is supplied as a lyophilized powder in a sealed glass vial, labeled with a unique batch number corresponding to its individual Certificate of Analysis.",
          "Glutathione is a relatively oxidation-sensitive molecule; vials should be stored frozen and protected from light to preserve the reduced (GSH) form prior to reconstitution.",
          "Reconstitution should be performed with bacteriostatic or sterile water under standard aseptic technique, consistent with handling protocols across the Peptides7 catalog.",
        ],
      },
      {
        title: "Research Focus & Mechanism Overview",
        paragraphs: [
          "Glutathione is studied extensively for its role in maintaining intracellular redox homeostasis, acting as a primary substrate for glutathione peroxidase (GPx) enzymes that neutralize reactive oxygen species.",
          "The GSH:GSSG ratio is a widely used biomarker in oxidative stress research, with a lower ratio generally associated with greater oxidative burden in cellular models.",
          "Glutathione's relationship to GPx4 and ferroptosis, an iron-dependent form of regulated cell death, has made it a molecule of growing interest in cellular death pathway and redox biology research.",
        ],
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is Glutathione?",
        a: "Glutathione (GSH) is a tripeptide composed of glutamine, cysteine, and glycine, functioning as one of the body's primary endogenous antioxidants and a key regulator of cellular redox balance.",
      },
      {
        q: "What is the difference between GSH and GSSG?",
        a: "GSH is the reduced, active antioxidant form of glutathione, while GSSG is its oxidized form produced after neutralizing reactive oxygen species. The GSH:GSSG ratio is a commonly studied marker of oxidative stress.",
      },
      {
        q: "Why is Glutathione relevant to ferroptosis research?",
        a: "Glutathione is a required cofactor for glutathione peroxidase 4 (GPx4), an enzyme that protects cells from ferroptosis, an iron-dependent form of regulated cell death, making glutathione availability a key variable in ferroptosis research models.",
      },
      {
        q: "How should Glutathione be stored?",
        a: "Store the lyophilized vial frozen and protected from light. Glutathione is oxidation-sensitive, so reconstituted solutions should be used promptly per your research protocol's stability requirements.",
      },
      {
        q: "How is Glutathione purity verified?",
        a: "Each batch is tested by an independent third-party laboratory using HPLC for purity and LC-MS for identity confirmation, with results published in a batch-specific Certificate of Analysis.",
      },
      {
        q: "Is this the same Glutathione used in IV wellness clinics?",
        a: "This product is the same base compound but is supplied strictly as a Research Use Only laboratory material, not as a clinical-grade or human-administrable product.",
      },
      {
        q: "Can I retrieve the COA for my Glutathione batch?",
        a: "Yes. Every vial carries a unique batch number that can be used to look up that specific batch's published test results.",
      },
    ],
  },
  {
    slug: "bpc-tb-500-research-peptide-blend",
    name: "Wolverine Stack",
    shortDescription:
      "A synergistic research stack combining BPC-157 and TB-500. Formulated for advanced tissue repair, angiogenesis, and structural remodeling research.",
    longDescription:
      "The Wolverine Stack is a specialized combination product supplying both BPC-157 and TB-500. This combination is one of the most widely referenced pairs in preclinical musculoskeletal, tendon, and ligament repair models. While BPC-157 is studied primarily for its influence on angiogenesis and the nitric oxide pathway, TB-500 (a Thymosin Beta-4 fragment) is studied for its role in actin sequestration and cell migration. Together, they offer a multi-pathway approach to tissue regeneration research. Peptides7 sources both compounds exclusively from <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a>, with every batch independently verified to ≥99% purity and accompanied by full Certificates of Analysis.",
    image: "/images/products/wolverine-10-10-mg.jpg",
    category: "Performance Research",
    isVariable: true,
    variants: [
      { label: "5/5mg - Single", price: 70.0, regularPrice: 80.0, sku: "BPCTB-0505", image: "/images/products/wolverine-5-5-mg.jpg" },
      { label: "5/5mg - 5 Kit", price: 315.0, regularPrice: 350.0, sku: "BPCTB-0505-K5", image: "/images/products/wolverine-5-5-mg.jpg" },
      { label: "5/5mg - 10 Kit", price: 550.0, regularPrice: 600.0, sku: "BPCTB-0505-K10", image: "/images/products/wolverine-5-5-mg.jpg" },
      { label: "10/10mg - Single", price: 95.0, regularPrice: 110.0, sku: "BPCTB-1010", image: "/images/products/wolverine-10-10-mg.jpg" },
      { label: "10/10mg - 5 Kit", price: 475.0, regularPrice: 525.0, sku: "BPCTB-1010-K5", image: "/images/products/wolverine-10-10-mg.jpg" },
      { label: "10/10mg - 10 Kit (Best Value)", price: 800.0, regularPrice: 1050.0, sku: "BPCTB-1010-K10", image: "/images/products/wolverine-10-10-mg.jpg" },
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "The Wolverine Stack provides two distinct lyophilized vials (one BPC-157 and one TB-500) per unit purchased, allowing researchers to control reconstitution and administration parameters for each compound independently.",
          "Each vial carries its own unique batch number corresponding to its respective Certificate of Analysis.",
          "Reconstitution should be performed with bacteriostatic or sterile water under standard aseptic technique, consistent with handling protocols across the Peptides7 catalog."
        ],
      },
      {
        title: "Research Focus & Mechanism Overview",
        paragraphs: [
          "BPC-157 is studied for its reported ability to promote angiogenesis and modulate the nitric oxide system, mechanisms considered central to vascularization during tissue repair.",
          "TB-500 is studied for its reported role in regulating actin dynamics, a mechanism associated with promoting cell migration and structural remodeling.",
          "Because these mechanisms are non-overlapping and complementary, their combination is frequently evaluated in research models examining accelerated wound healing and complex musculoskeletal repair."
        ],
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is the Wolverine Stack?",
        a: "The Wolverine Stack is a combination offering of two distinct synthetic peptides: BPC-157 and TB-500, widely studied together in tissue repair and musculoskeletal regeneration research.",
      },
      {
        q: "Are the two peptides mixed in one vial?",
        a: "No. The stack provides distinct vials of BPC-157 and TB-500. This ensures maximum stability and allows researchers precise control over the dosing and administration of each compound.",
      },
      {
        q: "Why are these two compounds studied together?",
        a: "They possess complementary, non-overlapping mechanisms. BPC-157 primarily targets angiogenesis and vascularization, while TB-500 targets actin regulation and cellular migration. Together, they address multiple distinct pathways involved in tissue repair.",
      },
      {
        q: "Can I retrieve the COA for the peptides in this stack?",
        a: "Yes. Every individual vial carries a unique batch number that can be cross-referenced to retrieve its specific Certificate of Analysis.",
      }
    ],
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    shortDescription:
      "Retatrutide (LY3437943) triple-agonist peptide studied for GLP-1, GIP, and GCGR receptor activation in metabolic research. ≥99% HPLC verified purity.",
    longDescription:
      "Retatrutide (LY3437943) is a novel synthetic peptide functioning as a triple hormone receptor agonist, targeting the GLP-1 (glucagon-like peptide-1), GIP (glucose-dependent insulinotropic polypeptide), and GCGR (glucagon receptor) pathways. In preclinical and clinical research models, this tri-agonist mechanism has been extensively studied for its synergistic effects on metabolic regulation, energy expenditure, and lipid metabolism. Peptides7 sources Retatrutide exclusively through <a href='http://99puritypeptides.com/' target='_blank' rel='noopener noreferrer' class='underline hover:text-white transition-colors'>99 Purity Peptides</a>, ensuring that every batch is independently verified by HPLC and LC-MS prior to release and accompanied by a comprehensive Certificate of Analysis.",
    image: "/images/products/retatrutide-10mg.jpg",
    category: "Metabolic Research",
    isVariable: true,
    variants: [
      { label: "10mg - Single", price: 100.0, sku: "RETATRUTIDE-10", image: "/images/products/retatrutide-10mg.jpg" },
      { label: "10mg - 5 Kit", price: 500.0, sku: "RETATRUTIDE-10-K5", image: "/images/products/retatrutide-10mg.jpg" },
      { label: "10mg - 10 Kit", price: 950.0, sku: "RETATRUTIDE-10-K10", image: "/images/products/retatrutide-10mg.jpg" },
      { label: "20mg - Single", price: 140.0, sku: "RETATRUTIDE-20", image: "/images/products/retatrutide-20mg.jpg" },
      { label: "20mg - 5 Kit", price: 700.0, sku: "RETATRUTIDE-20-K5", image: "/images/products/retatrutide-20mg.jpg" },
      { label: "20mg - 10 Kit", price: 1400.0, sku: "RETATRUTIDE-20-K10", image: "/images/products/retatrutide-20mg.jpg" },
      { label: "30mg - Single", price: 170.0, sku: "RETATRUTIDE-30", image: "/images/products/retatrutide-30mg.jpg" },
      { label: "30mg - 5 Kit", price: 850.0, sku: "RETATRUTIDE-30-K5", image: "/images/products/retatrutide-30mg.jpg" },
      { label: "30mg - 10 Kit", price: 1700.0, sku: "RETATRUTIDE-30-K10", image: "/images/products/retatrutide-30mg.jpg" },
      { label: "60mg - Single", price: 280.0, sku: "RETATRUTIDE-60", image: "/images/products/retatrutide-50mg.jpg" },
      { label: "60mg - 5 Kit", price: 1400.0, sku: "RETATRUTIDE-60-K5", image: "/images/products/retatrutide-50mg.jpg" },
      { label: "60mg - 10 Kit", price: 2800.0, sku: "RETATRUTIDE-60-K10", image: "/images/products/retatrutide-50mg.jpg" },
      // { label: "50mg - Single", price: 240.0, sku: "RETATRUTIDE-50", image: "/images/products/retatrutide-50mg.jpg" },
      // { label: "100mg - Single", price: 390.0, sku: "RETATRUTIDE-100", image: "/images/products/retatrutide-100mg.jpg" },
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "Retatrutide is supplied as a lyophilized powder across various vial sizes (10mg, 20mg, 30mg, 50mg, and 100mg) to accommodate diverse research protocols. Each vial displays a unique batch number tied to its Certificate of Analysis.",
          "Reconstitution should be performed with bacteriostatic or sterile water under standard aseptic technique. The compound is intended strictly for in-vitro laboratory research applications.",
        ],
      },
      {
        title: "Research Focus & Mechanism Overview",
        paragraphs: [
          "Retatrutide's primary research interest lies in its unique triple-agonist profile, simultaneously activating GLP-1, GIP, and glucagon receptors. This synergistic approach is studied for its potential to amplify metabolic responses compared to single or dual agonists.",
          "In research models, GLP-1 and GIP activation are primarily associated with glucose-dependent insulin secretion and satiety signaling, while glucagon receptor activation is investigated for its role in increasing hepatic glucose output and enhancing energy expenditure.",
          "Researchers frequently utilize Retatrutide in studies examining complex metabolic disorders, lipid metabolism, and the physiological mechanisms underlying weight regulation and energy homeostasis.",
        ],
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is Retatrutide?",
        a: "Retatrutide (LY3437943) is a triple hormone receptor agonist peptide that targets GLP-1, GIP, and glucagon receptors. It is widely studied in research contexts for its reported roles in comprehensive metabolic regulation and energy homeostasis.",
      },
      {
        q: "How does the triple-agonist mechanism of Retatrutide work?",
        a: "Retatrutide is studied for its simultaneous activation of three key metabolic receptors: GLP-1, GIP, and GCGR (glucagon receptor). This combined activation is theorized in research models to produce synergistic effects on lipid metabolism and energy expenditure beyond what single or dual agonists achieve.",
      },
      {
        q: "What vial sizes are available for Retatrutide?",
        a: "Retatrutide is available in a wide range of vial sizes including 10mg, 20mg, 30mg, 50mg, and 100mg to accommodate varying concentration requirements in research protocols.",
      },
      {
        q: "How is Retatrutide purity verified?",
        a: "Each batch is rigorously tested by an independent third-party laboratory using HPLC for precise purity quantification and LC-MS for molecular identity confirmation, with results published in a batch-specific COA.",
      },
      {
        q: "How should Retatrutide be reconstituted and stored?",
        a: "Reconstitute with bacteriostatic or sterile water using standard aseptic technique. Unreconstituted lyophilized vials should be stored refrigerated or frozen away from light. Once reconstituted, solutions should be refrigerated and used according to your protocol's specific stability requirements.",
      },
      {
        q: "Is Retatrutide intended for human use?",
        a: "No. Retatrutide is classified as a Research Use Only (RUO) laboratory compound. It is strictly intended for in-vitro testing and preclinical research, and is not for human consumption or self-administration.",
      },
    ],
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
