import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import AboutClient from "./AboutClient";

export const metadata: Metadata = buildMetadata({
  title: "About Peptides 7 — Research-Grade Peptides, Curated by a Medspa Founder",
  description:
    "Learn how Peptides 7 Medspa in Charleston, SC built a boutique catalog of ≥99% purity research peptides, exclusively fulfilled through 99 Purity Peptides. Radical transparency. Medspa standards. Independent third-party lab testing.",
  path: "/about",
  keywords: [
    "Peptides 7",
    "about Peptides 7",
    "research peptides Charleston SC",
    "medspa peptides",
    "99 Purity Peptides",
    "peptide purity standards",
    "Scarlett Hawkins MedSpa",
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
