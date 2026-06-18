import type { Metadata } from "next";
import { buildMetadata, faqPageJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqsClient from "./FaqsClient";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions — Ordering, Purity, Compliance & Research",
  description:
    "Answers about ordering research peptides, ≥99% purity standards, HPLC and LC-MS testing, reconstitution protocols, research compliance, BPC-157, GHK-Cu, GLOW, KLOW, and more from Peptides 7.",
  path: "/faqs",
  keywords: [
    "peptide FAQ",
    "research peptide questions",
    "peptide purity standards",
    "HPLC testing FAQ",
    "peptide reconstitution",
    "BPC-157 FAQ",
    "Certificate of Analysis",
    "research use only",
    "peptide ordering help",
  ],
});

const FAQ_STRUCTURED_DATA = [
  { question: "How do I place an order?", answer: "Browse the catalog and add products to your cart. At checkout you are securely redirected to our fulfillment partner 99 Purity Peptides, where your cart loads automatically." },
  { question: "What purity standard do Peptides 7 products meet?", answer: "Every compound is independently verified to ≥99% purity by HPLC with molecular identity confirmed by LC-MS. These standards apply to every batch without exception." },
  { question: "What is a Certificate of Analysis (COA)?", answer: "A COA is a laboratory document from an independent testing facility detailing purity percentage, testing method, impurity profile, and molecular identity confirmation. Every product ships with a batch-specific COA." },
  { question: "What does Research Use Only (RUO) mean?", answer: "RUO is a regulatory classification indicating compounds are intended solely for laboratory research, in-vitro testing, and preclinical scientific development. They are not drugs, supplements, or food ingredients." },
  { question: "How do I reconstitute a lyophilized peptide?", answer: "Add bacteriostatic water slowly using aseptic technique, directing liquid down the side of the vial. Gently swirl — do not shake. Allow the powder to dissolve completely before use." },
  { question: "Is my payment information secure?", answer: "Payment is processed entirely within 99 Purity Peptides secure checkout infrastructure. Peptides 7 does not handle or store any payment data. Their checkout uses industry-standard SSL encryption." },
  { question: "How quickly will my order ship?", answer: "Orders are typically processed and dispatched within 24 hours. Complimentary 2-day shipping is available on qualifying orders over $300." },
  { question: "What are GLOW and KLOW?", answer: "GLOW and KLOW are proprietary multi-peptide research blends exclusive to the Peptides 7 catalog. Each combines well-characterized peptide fragments for studying synergistic multi-peptide interactions in a single vial." },
  { question: "What is BPC-157?", answer: "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide derived from human gastric juice, one of the most extensively referenced peptides in preclinical repair research." },
];

export default function FAQs() {
  return (
    <>
      <JsonLd data={[
        faqPageJsonLd(FAQ_STRUCTURED_DATA),
        breadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "FAQs", url: `${SITE_URL}/faqs` },
        ]),
      ]} />
      <FaqsClient />
    </>
  );
}
