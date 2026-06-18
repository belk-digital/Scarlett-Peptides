import type { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import { buildMetadata, collectionPageJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ShopClient from "./ShopClient";

export const metadata: Metadata = buildMetadata({
  title: "Shop Research Peptides — ≥99% Purity Catalog",
  description:
    "Browse our full catalog of research peptides: GHK-Cu, NAD+, Glutathione, MOTS-C, Wolverine Stack, and proprietary blends. Every compound independently verified at ≥99% HPLC purity with batch-specific COA.",
  path: "/shop",
  keywords: [
    "buy research peptides",
    "peptide catalog",
    "GHK-Cu",
    "NAD+",
    "Glutathione",
    "MOTS-C",
    "Wolverine Stack",
    "99% purity peptides",
    "HPLC verified",
    "research use only",
  ],
});

export default function Shop() {
  const allProducts = getAllProducts();
  const productListForSchema = allProducts.map((p) => ({
    name: p.name,
    slug: p.slug,
    image: p.image,
    price: p.isVariable ? Math.min(...(p.variants?.map((v) => v.price) || [0])) : p.price || 0,
  }));

  return (
    <>
      <JsonLd data={[
        collectionPageJsonLd(productListForSchema),
        breadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Shop", url: `${SITE_URL}/shop` },
        ]),
      ]} />
      <ShopClient />
    </>
  );
}
