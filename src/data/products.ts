export type Variant = {
  label: string;
  price: number;
  regularPrice?: number;
  variationId: number;    // Unique product ID for this variant (WooCommerce)
  attributes?: Record<string, string>;
  image?: string;         // Variant-specific image
};

export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;          // Default/Parent image
  category: string;
  wooProductId?: number;  // For simple products
  isVariable: boolean;
  price?: number;         // Sale price for simple products
  regularPrice?: number;  // Regular price for simple products
  variants?: Variant[];
};

export const products: Product[] = [
  {
    slug: "glow",
    name: "GLOW",
    shortDescription: "Premium proprietary research blend.",
    longDescription: "Detailed laboratory information and compound overview for GLOW.",
    image: "/images/products/glow.jpg",
    category: "Proprietary",
    isVariable: true,
    variants: [
      { label: "Single", price: 115.0, regularPrice: 130.0, variationId: 3808 },
      { label: "5 Kit (Save 10%)", price: 500.0, regularPrice: 650.0, variationId: 3809 },
      { label: "10 Kit (Best Value)", price: 1000.0, regularPrice: 1300.0, variationId: 3810 },
    ],
  },
  {
    slug: "klow",
    name: "KLOW",
    shortDescription: "Premium proprietary research blend.",
    longDescription: "Detailed laboratory information and compound overview for KLOW.",
    image: "/images/products/klow.jpg",
    category: "Proprietary",
    isVariable: true,
    variants: [
      { label: "Single", price: 100.0, regularPrice: 110.0, variationId: 3803 },
      { label: "5 Kit (Save 10%)", price: 450.0, regularPrice: 550.0, variationId: 3804 },
      { label: "10 Kit (Best Value)", price: 900.0, regularPrice: 1100.0, variationId: 3805 },
    ],
  },
  {
    slug: "ghkcu",
    name: "GhkCU",
    shortDescription: "Copper peptide.",
    longDescription: "Detailed laboratory information and compound overview for GhkCU.",
    image: "/images/products/ghk-cu-100mg.jpg",
    category: "Longevity",
    isVariable: true,
    variants: [
      { label: "50mg - Single", price: 60.0, regularPrice: 60.0, variationId: 990, image: "/images/products/ghk-cu-50mg.jpg" },
      { label: "50mg - 10 Kit", price: 400.0, regularPrice: 600.0, variationId: 3858, image: "/images/products/ghk-cu-50mg.jpg" },
      { label: "100mg - Single", price: 75.0, regularPrice: 75.0, variationId: 991, image: "/images/products/ghk-cu-100mg.jpg" },
      { label: "100mg - 10 Kit", price: 650.0, regularPrice: 750.0, variationId: 3860, image: "/images/products/ghk-cu-100mg.jpg" },
      { label: "200mg - Single", price: 135.0, regularPrice: 135.0, variationId: 3857, image: "/images/products/ghk-cu-200mg.jpg" },
      { label: "200mg - 10 Kit", price: 1000.0, regularPrice: 1350.0, variationId: 3862, image: "/images/products/ghk-cu-200mg.jpg" },
    ],
  },
  {
    slug: "mots-c",
    name: "MOTS-C",
    shortDescription: "Mitochondrial-derived peptide.",
    longDescription: "Detailed laboratory information and compound overview for MOTS-C.",
    image: "/images/products/mots-c-10mg.jpg",
    category: "Longevity",
    isVariable: true,
    variants: [
      { label: "10mg - Single", price: 65.0, regularPrice: 70.0, variationId: 2816, image: "/images/products/mots-c-10mg.jpg" },
      { label: "10mg - 5 Kit", price: 320.0, regularPrice: 350.0, variationId: 3768, image: "/images/products/mots-c-10mg.jpg" },
      { label: "10mg - 10 Kit", price: 600.0, regularPrice: 700.0, variationId: 3767, image: "/images/products/mots-c-10mg.jpg" },
      { label: "40mg - Single", price: 95.0, regularPrice: 110.0, variationId: 2815, image: "/images/products/mots-c-40mg.jpg" },
      { label: "40mg - 5 Kit", price: 470.0, regularPrice: 550.0, variationId: 3770, image: "/images/products/mots-c-40mg.jpg" },
      { label: "40mg - 10 Kit", price: 900.0, regularPrice: 1100.0, variationId: 3769, image: "/images/products/mots-c-40mg.jpg" },
    ],
  },
  {
    slug: "retatrutide",
    name: "Retatrutide",
    shortDescription: "Tri-agonist research peptide.",
    longDescription: "Detailed laboratory information and compound overview for Retatrutide.",
    image: "/images/products/retatrutide-10mg.jpg",
    category: "Metabolic",
    isVariable: true,
    variants: [
      { label: "10mg - Single", price: 90.0, regularPrice: 110.0, variationId: 1136, image: "/images/products/retatrutide-10mg.jpg" },
      { label: "10mg - 5 Kit", price: 450.0, regularPrice: 500.0, variationId: 3756, image: "/images/products/retatrutide-10mg.jpg" },
      { label: "10mg - 10 Kit", price: 850.0, regularPrice: 1000.0, variationId: 3755, image: "/images/products/retatrutide-10mg.jpg" },
      { label: "20mg - Single", price: 130.0, regularPrice: 165.0, variationId: 1137, image: "/images/products/retatrutide-20mg.jpg" },
      { label: "20mg - 5 Kit", price: 650.0, regularPrice: 775.0, variationId: 3758, image: "/images/products/retatrutide-20mg.jpg" },
      { label: "20mg - 10 Kit", price: 1300.0, regularPrice: 1400.0, variationId: 3757, image: "/images/products/retatrutide-20mg.jpg" },
      { label: "30mg - Single", price: 160.0, regularPrice: 195.0, variationId: 1138, image: "/images/products/retatrutide-30mg.jpg" },
      { label: "30mg - 5 Kit", price: 800.0, regularPrice: 925.0, variationId: 3760, image: "/images/products/retatrutide-30mg.jpg" },
      { label: "30mg - 10 Kit", price: 1600.0, regularPrice: 1750.0, variationId: 3759, image: "/images/products/retatrutide-30mg.jpg" },
      { label: "100mg - Single", price: 380.0, regularPrice: 450.0, variationId: 3544, image: "/images/products/retatrutide-100mg.jpg" },
    ],
  },
  {
    slug: "nad",
    name: "NAD+",
    shortDescription: "Nicotinamide Adenine Dinucleotide.",
    longDescription: "Detailed laboratory information and compound overview for NAD+.",
    image: "/images/products/nadplus-500mg.jpg",
    category: "Longevity",
    isVariable: true,
    variants: [
      { label: "500mg - Single", price: 80.0, regularPrice: 90.0, variationId: 976, image: "/images/products/nadplus-500mg.jpg" },
      { label: "500mg - 5 Kit", price: 375.0, regularPrice: 450.0, variationId: 3836, image: "/images/products/nadplus-500mg.jpg" },
      { label: "500mg - 10 Kit", price: 700.0, regularPrice: 900.0, variationId: 3835, image: "/images/products/nadplus-500mg.jpg" },
      { label: "1000mg - Single", price: 100.0, regularPrice: 125.0, variationId: 975, image: "/images/products/nad-1000mg.jpg" },
      { label: "1000mg - 5 Kit", price: 450.0, regularPrice: 625.0, variationId: 3838, image: "/images/products/nad-1000mg.jpg" },
    ],
  },
  {
    slug: "glutathione",
    name: "Glutathione",
    shortDescription: "Potent antioxidant.",
    longDescription: "Detailed laboratory information and compound overview for Glutathione.",
    image: "/images/products/glutathione-200mg.jpg",
    category: "Longevity",
    wooProductId: 1176,
    isVariable: false,
    price: 60.0,
    regularPrice: 80.0,
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    shortDescription: "Body Protection Compound.",
    longDescription: "Detailed laboratory information and compound overview for BPC-157.",
    image: "/images/products/bpc-157-10mg.jpg",
    category: "Recovery & Repair",
    isVariable: true,
    variants: [
      { label: "10mg - Single", price: 65.0, regularPrice: 65.0, variationId: 2839, image: "/images/products/bpc-157-10mg.jpg" },
      { label: "10mg - 5 Kit", price: 300.0, regularPrice: 325.0, variationId: 3822, image: "/images/products/bpc-157-10mg.jpg" },
      { label: "10mg - 10 Kit", price: 525.0, regularPrice: 650.0, variationId: 3825, image: "/images/products/bpc-157-10mg.jpg" },
      { label: "20mg - Single", price: 80.0, regularPrice: 80.0, variationId: 2840, image: "/images/products/bpc-157-20mg.jpg" },
      { label: "20mg - 5 Kit", price: 375.0, regularPrice: 400.0, variationId: 3823, image: "/images/products/bpc-157-20mg.jpg" },
      { label: "20mg - 10 Kit", price: 675.0, regularPrice: 800.0, variationId: 3824, image: "/images/products/bpc-157-20mg.jpg" },
    ],
  },
  {
    slug: "kpv",
    name: "KPV",
    shortDescription: "Anti-inflammatory peptide.",
    longDescription: "Detailed laboratory information and compound overview for KPV.",
    image: "/images/products/kpv-10mg.jpg",
    category: "Recovery & Repair",
    wooProductId: 986,
    isVariable: false,
    price: 55.0,
    regularPrice: 55.0,
  },
  {
    slug: "tb500",
    name: "TB500",
    shortDescription: "Actin regulating peptide.",
    longDescription: "Detailed laboratory information and compound overview for TB500.",
    image: "/images/products/tb-500-10mg.jpg",
    category: "Recovery & Repair",
    isVariable: true,
    variants: [
      { label: "10/10mg - Single", price: 105.0, regularPrice: 105.0, variationId: 3813, image: "/images/products/tb-500-10mg.jpg" },
      { label: "10/10mg - 5 Kit", price: 475.0, regularPrice: 525.0, variationId: 3814, image: "/images/products/tb-500-10mg.jpg" },
      { label: "10/10mg - 10 Kit", price: 800.0, regularPrice: 1050.0, variationId: 3815, image: "/images/products/tb-500-10mg.jpg" },
    ],
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
