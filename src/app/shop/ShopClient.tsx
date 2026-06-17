"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { getAllProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";

function ShopContent() {
  const products = getAllProducts();
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredProducts = categoryFilter
    ? products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
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
        {filteredProducts.map((product) => {
          const minPrice = product.isVariable
            ? Math.min(...(product.variants?.map(v => v.price) || [0]))
            : product.price;

          return (
            <div key={product.slug} className="group relative w-full max-w-[380px] mx-auto md:max-w-none h-full bg-white rounded-[2rem] p-6 pb-8 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.7)]">
              {/* Full Card Clickable Link */}
              <Link href={`/product/${product.slug}`} className="absolute inset-0 z-10 rounded-[2rem]" aria-label={`View ${product.name}`} />

              {/* Subtle Background Elements to match reference */}
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
                <div className="absolute -left-6 top-1/4 w-16 h-32 border-[1.5px] border-gray-200 rounded-full opacity-50"></div>
                <div className="absolute -right-8 bottom-1/3 w-20 h-40 border-[1.5px] border-gray-200 rounded-full opacity-50"></div>
                <div className="absolute right-6 top-1/4 text-gray-200 text-xl">✦</div>
                <div className="absolute left-8 bottom-1/4 text-gray-200 text-sm">✦</div>
              </div>

              {/* Floating Image with Split Gradient Border */}
              <div className="absolute -top-16 w-32 h-32 p-[6px] rounded-[64px] bg-gradient-to-b from-white from-50% to-[#111] to-50% shadow-2xl transition-all duration-500 ease-out z-20 group-hover:scale-[1.6] group-hover:rounded-[20px] group-hover:p-[3px] origin-center pointer-events-none">
                <div className="relative w-full h-full rounded-[58px] overflow-hidden group-hover:rounded-[17px] transition-all duration-500">
                  <Image
                    src={product.image}
                    alt={`${product.name} — ${product.category} research peptide`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Content */}
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

                {/* Space filler so button aligns at bottom */}
                <div className="flex-grow"></div>

                {/* Price Circle */}
                <div className="w-16 h-16 rounded-full bg-gray-100 flex flex-col items-center justify-center mb-8 shadow-inner border border-gray-200 group-hover:bg-black transition-colors duration-500">
                  {product.isVariable && (
                    <span className="text-[8px] font-medium uppercase tracking-widest text-gray-500 group-hover:text-gray-400 -mb-1 transition-colors duration-500">From</span>
                  )}
                  <span className="text-lg font-bold text-black font-sans group-hover:text-white transition-colors duration-500">
                    ${minPrice?.toFixed(0)}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    if (!product.isVariable) {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!product.price) return;
                      addItem({
                        slug: product.slug,
                        name: product.name,
                        wooProductId: product.wooProductId,
                        price: product.price,
                        quantity: 1,
                        image: product.image,
                      });

                      setAddedItems(prev => ({ ...prev, [product.slug]: true }));
                      setTimeout(() => {
                        setAddedItems(prev => ({ ...prev, [product.slug]: false }));
                      }, 2000);
                    } else {
                      window.location.href = `/product/${product.slug}`;
                    }
                  }}
                  className={`w-full py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl z-20 relative cursor-pointer pointer-events-auto ${addedItems[product.slug] ? 'bg-green-600 text-white scale-[1.02]' : 'bg-black text-white hover:bg-white hover:text-black'}`}
                >
                  {product.isVariable ? "Select Options" : addedItems[product.slug] ? "Added to Cart ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ShopClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading catalog...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
