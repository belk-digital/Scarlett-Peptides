import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import AboutClient from "./AboutClient";

export const metadata: Metadata = buildMetadata({
  title: "About Peptides7 - Research-Grade Peptides, Curated for Clarity",
  description:
    "Discover how Peptides7 built a boutique catalog of ≥99% purity research peptides, exclusively fulfilled through 99 Purity Peptides. Radical transparency. Rigorous standards. Independent third-party lab testing.",
  path: "/about",
  keywords: [
    "Peptides7",
    "about Peptides7",
    "research peptides",
    "99 Purity Peptides",
    "peptide purity standards",
  ],
});

export default function About() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "About", url: `${SITE_URL}/about` },
      ])]} />
      <AboutClient />
    </>
  );
}
