import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), "src", "data", "products.ts");
let content = fs.readFileSync(productsPath, 'utf-8');

// 1. Replace all .jpg with .webp
content = content.replace(/\.jpg/g, '.webp');

// 2. Fix specific image name mismatches
content = content.replace(/\/images\/products\/nad-1000mg\.webp/g, '/images/products/nadplus-1000mg.webp');
content = content.replace(/\/images\/products\/glutathione-200mg\.webp/g, '/images/products/glutathione-600mg.webp');
content = content.replace(/\/images\/products\/retatrutide-50mg\.webp/g, '/images/products/retatrutide-60mg.webp');

// 3. Add the two new products at the end of the array
const newProducts = `
  {
    slug: "10-needles",
    name: "10 Needles",
    shortDescription: "Pack of 10 sterile insulin syringes for laboratory research.",
    longDescription: "High-quality, individually wrapped sterile insulin syringes suitable for precise measurement and reconstitution of research peptides. Pack includes 10 single-use syringes.",
    image: "/images/products/10-needles.webp",
    category: "Lab Supplies",
    isVariable: false,
    price: 7.5,
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "Pack of 10 sterile insulin syringes.",
          "Ideal for use with bacteriostatic water for peptide reconstitution."
        ]
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What are these needles used for?",
        a: "They are intended for laboratory use, specifically for drawing and measuring bacteriostatic water during the reconstitution of research peptides."
      }
    ]
  },
  {
    slug: "bac-water",
    name: "BAC Water (Bacteriostatic Water)",
    shortDescription: "Bacteriostatic Water (BAC Water) for research peptide reconstitution. Contains 0.9% benzyl alcohol as a preservative.",
    longDescription: "Bacteriostatic water is sterile water formulated with 0.9% benzyl alcohol. This acts as a bacteriostatic preservative, allowing for repeated withdrawals from a single vial while inhibiting bacterial growth. It is the standard diluent for multi-use research peptide vials.",
    image: "/images/products/bac-water.webp",
    category: "Lab Supplies",
    isVariable: true,
    variants: [
      { label: "3ML", price: 9.0, sku: "BAC-WATER-3ML", image: "/images/products/bac-water-3ml.webp" },
      { label: "10ML", price: 15.0, sku: "BAC-WATER-10ML", image: "/images/products/bac-water-10ml.webp" },
      { label: "30ML", price: 25.0, sku: "BAC-WATER-30ML", image: "/images/products/bac-water-30ml.webp" }
    ],
    tabs: [
      {
        title: "Product Details",
        paragraphs: [
          "Bacteriostatic Water contains 0.9% benzyl alcohol added as a bacteriostatic preservative.",
          "Supplied in multi-dose plastic or glass vials depending on volume."
        ]
      },
      QUALITY_TAB,
      COMPLIANCE_TAB,
    ],
    faqs: [
      {
        q: "What is Bacteriostatic Water?",
        a: "It is sterile water containing 0.9% benzyl alcohol, used to dissolve or dilute research peptides."
      },
      {
        q: "How long does it last after opening?",
        a: "Once opened, bacteriostatic water is generally recommended to be discarded after 28-30 days to ensure sterility."
      }
    ]
  }
];`;

// Remove the final `];` and append the new products
content = content.replace(/\n\];\s*$/, ',\n' + newProducts);

fs.writeFileSync(productsPath, content, 'utf-8');
console.log("Updated products.ts");
