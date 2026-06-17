import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd, localBusinessJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ContactClient from "./ContactClient";

export const metadata: Metadata = buildMetadata({
  title: "Contact Peptides 7 — Concierge Support for Research Peptides",
  description:
    "Get in touch with the Peptides 7 concierge team in Charleston, SC. Questions about peptide purity, compound selection, orders, or wholesale partnerships. Email, phone, and contact form available.",
  path: "/contact",
  keywords: [
    "contact Peptides 7",
    "peptide support",
    "research peptide help",
    "Charleston SC peptides",
    "Scarlett Hawkins MedSpa contact",
    "peptide order help",
  ],
});

export default function Contact() {
  return (
    <>
      <JsonLd data={[
        localBusinessJsonLd(),
        breadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]),
      ]} />
      <ContactClient />
    </>
  );
}
