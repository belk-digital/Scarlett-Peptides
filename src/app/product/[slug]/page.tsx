import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/data/products";
import { buildMetadata, productJsonLd, breadcrumbJsonLd, faqPageJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ProductDetail from "./ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const price = product.isVariable
    ? Math.min(...(product.variants?.map((v) => v.price) || [0]))
    : product.price || 0;

  return buildMetadata({
    title: `${product.name} - ${product.category} Research Peptide | ≥99% Purity`,
    description: product.shortDescription,
    path: `/product/${product.slug}`,
    ogType: "website",
    ogImage: `${SITE_URL}${product.image}`,
    keywords: [
      product.name,
      `buy ${product.name}`,
      `${product.name} peptide`,
      product.category,
      "research peptide",
      "99% purity",
      "HPLC verified",
      "Certificate of Analysis",
      `${product.name} price $${price}`,
    ],
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const price = product.isVariable
    ? Math.min(...(product.variants?.map((v) => v.price) || [0]))
    : product.price || 0;

  const schemas: Record<string, unknown>[] = [
    productJsonLd({
      name: product.name,
      slug: product.slug,
      description: product.shortDescription,
      image: product.image,
      category: product.category,
      price,
    }),
    breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Shop", url: `${SITE_URL}/shop` },
      { name: product.name, url: `${SITE_URL}/product/${product.slug}` },
    ]),
  ];

  if (product.faqs && product.faqs.length > 0) {
    schemas.push(
      faqPageJsonLd(
        product.faqs.map((f) => ({
          question: f.q,
          answer: f.a.replace(/<[^>]*>/g, ""),
        })),
      ),
    );
  }

  return (
    <>
      <JsonLd data={schemas} />
      <ProductDetail product={product} />
    </>
  );
}
