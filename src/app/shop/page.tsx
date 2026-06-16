"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getAllProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";

function ShopContent() {
  const products = getAllProducts();
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const filteredProducts = categoryFilter 
    ? products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-rosegold mb-4 tracking-wide">
          {categoryFilter ? `${categoryFilter} Research` : "The Collection"}
        </h1>
        <p className="text-textsub max-w-2xl mx-auto">
          Explore our premium selection of research peptides, carefully synthesized for unparalleled purity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const minPrice = product.isVariable 
            ? Math.min(...(product.variants?.map(v => v.price) || [0]))
            : product.price;

          return (
            <div key={product.slug} className="card-elevated group flex flex-col overflow-hidden">
              <Link href={`/product/${product.slug}`} className="block relative w-full h-72 bg-surface2 overflow-hidden">
                {/* Fallback styling for when images don't exist yet */}
                <div className="absolute inset-0 flex items-center justify-center text-textmuted bg-surface2 z-0">
                  <span className="font-serif text-xl opacity-30">{product.name}</span>
                </div>
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 z-10 opacity-70 mix-blend-luminosity hover:mix-blend-normal"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-surface/80 backdrop-blur-sm text-mauve text-xs tracking-widest uppercase px-3 py-1 rounded-full border border-bordersub">
                    {product.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-serif text-2xl text-rosegold mb-2 hover:text-rosegoldhi transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-textsub mb-6 flex-grow line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-bordersub">
                  <div className="flex items-center gap-2">
                    <span className="text-champagne font-medium text-lg">
                      {product.isVariable ? "From " : ""}${minPrice?.toFixed(2)}
                    </span>
                    {!product.isVariable && product.regularPrice && product.regularPrice > (product.price || 0) && (
                      <span className="text-sm text-textmuted line-through">
                        ${product.regularPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {product.isVariable ? (
                    <Link 
                      href={`/product/${product.slug}`}
                      className="text-xs uppercase tracking-widest text-rosegold border border-rosegold px-5 py-2.5 rounded-full hover:bg-rosegold hover:text-base transition-colors"
                    >
                      Select Options
                    </Link>
                  ) : (
                    <button 
                      onClick={() => {
                        if (!product.price) return;
                        addItem({
                          slug: product.slug,
                          name: product.name,
                          wooProductId: product.wooProductId,
                          price: product.price,
                          quantity: 1,
                          image: product.image,
                        });
                      }}
                      className="text-xs uppercase tracking-widest bg-rosegold text-base px-5 py-2.5 rounded-full glow-hover transition-all"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-rosegold">
        Loading catalog...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
