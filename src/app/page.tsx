import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata, collectionPageJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} | Premium Research Peptides — ≥99% Purity, Independently Verified`,
  description:
    "Shop curated research peptides with ≥99% HPLC purity, LC-MS identity verification, and batch-specific Certificates of Analysis. BPC-157, GHK-Cu, NAD+, and more. Fulfilled by 99 Purity Peptides.",
  path: "",
  keywords: [
    "research peptides",
    "buy peptides online",
    "99% purity peptides",
    "BPC-157",
    "GHK-Cu",
    "NAD+",
    "TB-500",
    "peptide catalog",
    "HPLC verified peptides",
    "Certificate of Analysis",
    "lyophilized peptides",
  ],
});

const FEATURED_SLUGS = ["klow", "glow", "tesamorelin"];

export default function Home() {
  const allProducts = getAllProducts();
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredProducts = FEATURED_SLUGS
    .map(slug => allProducts.find(p => p.slug === slug))
    .filter(Boolean) as typeof allProducts;

  const productListForSchema = allProducts.map((p) => ({
    name: p.name,
    slug: p.slug,
    image: p.image,
    price: p.isVariable ? Math.min(...(p.variants?.map((v) => v.price) || [0])) : p.price || 0,
  }));

  return (
    <>
      <JsonLd data={[collectionPageJsonLd(productListForSchema)]} />
      <HomeClient
        allProducts={allProducts}
        featuredProducts={featuredProducts}
        recentPosts={recentPosts}
      />
    </>
  );
}
