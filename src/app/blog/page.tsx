import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import BlogClient from "./BlogClient";

export const metadata: Metadata = buildMetadata({
  title: "Research Journal — Peptide Purity, Compounding Science & Lab Best Practices",
  description:
    "Deep dives into peptide purity testing, HPLC analysis, reconstitution protocols, Certificate of Analysis guides, and laboratory best practices from the Peptides 7 research team.",
  path: "/blog",
  keywords: [
    "peptide research journal",
    "peptide purity testing",
    "HPLC analysis",
    "Certificate of Analysis guide",
    "peptide reconstitution",
    "research peptide blog",
    "compounding science",
  ],
});

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Journal", url: `${SITE_URL}/blog` },
      ])]} />
      <BlogClient posts={posts} />
    </>
  );
}
