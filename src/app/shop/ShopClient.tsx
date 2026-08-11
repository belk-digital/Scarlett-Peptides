"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { QrCode, ShieldCheck, Flag } from "lucide-react";
import { getShopCatalog } from "@/data/products";
import { useCart } from "@/context/CartContext";

function ShopContent() {
  const products = getShopCatalog();
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredProducts = categoryFilter
    ? products.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase())
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 tracking-wide">
          {categoryFilter ? `${categoryFilter} Research` : "The Collection"}
        </h1>
        <p className="text-textsub max-w-2xl mx-auto">
          Explore our premium selection of research peptides, carefully synthesized for unparalleled purity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 pt-24 pb-16">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative w-full max-w-[380px] mx-auto md:max-w-none h-full bg-white rounded-[2rem] p-6 pb-8 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
          >
            <Link
              href={`/product/${product.slug}`}
              className="absolute inset-0 z-10 rounded-[2rem]"
              aria-label={`View ${product.name}`}
            />

            <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
              <div className="absolute -left-6 top-1/4 w-16 h-32 border-[1.5px] border-gray-200 rounded-full opacity-50"></div>
              <div className="absolute -right-8 bottom-1/3 w-20 h-40 border-[1.5px] border-gray-200 rounded-full opacity-50"></div>
              <div className="absolute right-6 top-1/4 text-gray-200 text-xl">✦</div>
              <div className="absolute left-8 bottom-1/4 text-gray-200 text-sm">✦</div>
            </div>

            <div className="absolute -top-16 w-32 h-32 p-[6px] rounded-[64px] bg-gradient-to-b from-white from-50% to-[#111] to-50% shadow-2xl transition-all duration-500 ease-out z-20 group-hover:scale-[1.6] group-hover:rounded-[20px] group-hover:p-[3px] origin-center pointer-events-none">
              <div className="relative w-full h-full rounded-[58px] overflow-hidden group-hover:rounded-[17px] transition-all duration-500">
                <Image
                  src={product.image}
                  alt={`${product.name}, ${product.category} research peptide`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            <div className="mt-20 flex flex-col items-center w-full relative z-10 flex-grow pointer-events-none">
              <span className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2 font-sans font-bold block">
                {product.category}
              </span>
              <h3 className="text-xl font-black mb-3 text-black font-sans uppercase tracking-tight">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-medium line-clamp-2 h-8 px-2">
                {product.shortDescription}
              </p>

              <div className="flex-grow"></div>

              <div className="w-16 h-16 rounded-full bg-gray-100 flex flex-col items-center justify-center mb-8 shadow-inner border border-gray-200 group-hover:bg-black transition-colors duration-500">
                {product.isVariable && (
                  <span className="text-[8px] font-medium uppercase tracking-widest text-gray-500 group-hover:text-gray-400 -mb-1 transition-colors duration-500">
                    From
                  </span>
                )}
                <span className="text-lg font-bold text-black font-sans group-hover:text-white transition-colors duration-500">
                  ${product.price.toFixed(0)}
                </span>
              </div>

              <button
                onClick={(e) => {
                  if (!product.isVariable) {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem({
                      slug: product.slug,
                      name: product.name,
                      sku: product.slug,
                      price: product.price,
                      quantity: 1,
                      image: product.image,
                    });

                    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
                    setTimeout(() => {
                      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
                    }, 2000);
                  } else {
                    window.location.href = `/product/${product.slug}`;
                  }
                }}
                className={`w-full py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl z-20 relative cursor-pointer pointer-events-auto ${addedItems[product.id] ? "bg-green-600 text-white scale-[1.02]" : "bg-black text-white hover:bg-white hover:text-black"}`}
              >
                {product.isVariable
                  ? "Select Options"
                  : addedItems[product.id]
                    ? "Added to Cart ✓"
                    : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* COA Showcase Block — end of shop */}
      {!categoryFilter && (
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/4 w-[420px] h-[420px] rounded-full bg-white/[0.04] blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full bg-white/[0.03] blur-[80px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_55%)]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[420px] md:min-h-[480px]">
            <div className="relative order-1 lg:order-1 min-h-[320px] lg:min-h-full">
              <Image
                src="/images/coa-vial-showcase.png"
                alt="P7 Research vial with QR code for Certificate of Analysis — Made in USA"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0a0a0a]/80" />
            </div>

            <div className="relative order-2 flex flex-col justify-center px-8 py-12 md:px-12 lg:px-16 lg:py-16">
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-5 font-sans">
                Transparency Standard
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-tight tracking-wide mb-5">
                Scan for COAs.<br />
                <span className="text-white/70">Every batch. Every vial.</span>
              </h2>
              <p className="text-sm md:text-base text-white/50 font-light leading-relaxed max-w-md mb-10">
                Each vial carries a QR code linked to its independent Certificate of Analysis — so purity, identity, and lot data stay one scan away from your research bench.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs tracking-widest uppercase">QR-Linked COA</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs tracking-widest uppercase">≥99% Verified</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0">
                    <Flag className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs tracking-widest uppercase">Made in USA</span>
                </div>
              </div>

              <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-sans">
                Life&apos;s short. Biohack it.
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}

export default function ShopClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading catalog...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
