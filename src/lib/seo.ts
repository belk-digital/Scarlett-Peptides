import type { Metadata } from "next";

export const SITE_URL = "https://peptides7.com";
export const SITE_NAME = "Peptides7";
export const SITE_DESCRIPTION =
  "A curated catalog of ≥99% purity research peptides, independently verified by third-party US labs. Fulfilled exclusively through 99 Purity Peptides.";
export const SITE_LOCALE = "en_US";

export const BUSINESS_INFO = {
  name: "Peptides7",
  legalName: "Peptides7",
  email: "hello@peptides7.com",
  phone: "+1-843-998-1172",
};

export function buildMetadata(overrides: {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}): Metadata {
  const url = overrides.path ? `${SITE_URL}${overrides.path}` : SITE_URL;
  const baseMetadata: Metadata = {
    title: overrides.title,
    description: overrides.description,
    keywords: overrides.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: overrides.title,
      description: overrides.description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: (overrides.ogType || "website") as "website",
      ...(overrides.ogImage && {
        images: [{ url: overrides.ogImage, width: 1200, height: 630, alt: overrides.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: overrides.title,
      description: overrides.description,
      ...(overrides.ogImage && {
        images: [overrides.ogImage],
      }),
    },
    robots: overrides.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };

  return baseMetadata;
}

// --- JSON-LD Structured Data Helpers ---

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: BUSINESS_INFO.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/p7-mark.png`,
    description: SITE_DESCRIPTION,
    email: BUSINESS_INFO.email,
    telephone: BUSINESS_INFO.phone,
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    logo: `${SITE_URL}/p7-mark.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description: SITE_DESCRIPTION,
    email: BUSINESS_INFO.email,
    telephone: BUSINESS_INFO.phone,
  };
}

export function websiteSearchJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/p7-mark.png` },
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productJsonLd(product: {
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  price: number;
  priceCurrency?: string;
  availability?: string;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE_URL}${product.image}`,
    url: `${SITE_URL}/product/${product.slug}`,
    brand: { "@type": "Brand", name: product.brand || SITE_NAME },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: product.priceCurrency || "USD",
      price: product.price,
      availability:
        product.availability || "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  coverImage: string;
  category: string;
  readingTime: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/p7-mark.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    wordCount: parseInt(post.readingTime) * 200 || 1000,
  };
}

export function collectionPageJsonLd(products: {
  name: string;
  slug: string;
  image: string;
  price: number;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Research Peptide Catalog - Peptides7",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/shop`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/product/${p.slug}`,
        name: p.name,
        image: `${SITE_URL}${p.image}`,
      })),
    },
  };
}
