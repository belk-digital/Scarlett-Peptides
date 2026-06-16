"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the Promise to access route parameters
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  
  const parsedVariants = product.variants?.map(v => {
    const parts = v.label.split(' - ');
    if (parts.length > 1) {
      return { ...v, concentration: parts[0], size: parts[1] };
    }
    return { ...v, concentration: "Standard", size: parts[0] };
  }) || [];

  const uniqueConcentrations = Array.from(new Set(parsedVariants.map(v => v.concentration)));

  const [selectedConcentration, setSelectedConcentration] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const availableVariants = selectedConcentration 
    ? parsedVariants.filter(v => v.concentration === selectedConcentration)
    : [];

  const selectedVariant = parsedVariants.find(v => v.concentration === selectedConcentration && v.size === selectedSize);

  const handleConcentrationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConcentration(e.target.value);
    setSelectedSize(""); // Reset size when concentration changes
  };

  const displayPrice = product.isVariable 
    ? (selectedVariant ? selectedVariant.price : Math.min(...(product.variants?.map(v => v.price) || [0])))
    : product.price;

  const displayRegularPrice = product.isVariable
    ? (selectedVariant ? selectedVariant.regularPrice : undefined)
    : product.regularPrice;

  const handleAddToCart = () => {
    if (product.isVariable && !selectedVariant) {
      alert("Please select an option first.");
      return;
    }
    
    addItem({
      slug: product.slug,
      name: product.name,
      wooProductId: product.wooProductId,
      variationId: selectedVariant?.variationId,
      attributes: selectedVariant?.attributes,
      label: selectedVariant?.label,
      price: displayPrice || 0,
      quantity,
      image: selectedVariant?.image || product.image,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/shop" className="text-textmuted hover:text-rosegold text-xs uppercase tracking-widest flex items-center gap-2 mb-10 transition-colors w-fit">
        <span>&larr;</span> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="relative w-full aspect-[4/5] bg-surface2 rounded-2xl overflow-hidden card-elevated">
          {/* Fallback styling for when images don't exist yet */}
          <div className="absolute inset-0 flex items-center justify-center text-textmuted bg-surface2 z-0">
            <span className="font-serif text-2xl opacity-30">{product.name}</span>
          </div>
          <Image 
            src={selectedVariant?.image || product.image}
            alt={product.name}
            fill
            className="object-cover z-10 opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <span className="text-xs text-mauve tracking-widest uppercase mb-4 block">
            {product.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-rosegold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <p className="text-2xl text-champagne font-light">
              {product.isVariable && !selectedVariant && "From "}${displayPrice?.toFixed(2)}
            </p>
            {displayRegularPrice && displayRegularPrice > (displayPrice || 0) && (
              <p className="text-lg text-textmuted line-through font-light">
                ${displayRegularPrice.toFixed(2)}
              </p>
            )}
          </div>
          
          <div className="prose prose-invert prose-rosegold text-textsub mb-10">
            <p className="leading-relaxed">{product.longDescription}</p>
          </div>

          <div className="border-t border-bordersub pt-8 mb-8">
            {/* Variant Selectors */}
            {product.isVariable && product.variants && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Concentration Column */}
                <div>
                  <label htmlFor="concentration-select" className="block text-xs uppercase tracking-widest text-textmuted mb-2">
                    Concentration
                  </label>
                  <div className="relative">
                    <select
                      id="concentration-select"
                      value={selectedConcentration}
                      onChange={handleConcentrationChange}
                      className="w-full appearance-none bg-surface2 border border-bordersub text-textmain px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-rosegold focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select Concentration</option>
                      {uniqueConcentrations.map(conc => (
                        <option key={conc} value={conc}>{conc}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-textmuted">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Size Column */}
                <div>
                  <label htmlFor="size-select" className="block text-xs uppercase tracking-widest text-textmuted mb-2">
                    Size / Quantity
                  </label>
                  <div className="relative">
                    <select
                      id="size-select"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      disabled={!selectedConcentration}
                      className="w-full appearance-none bg-surface2 border border-bordersub text-textmain px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-rosegold focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>Select Size</option>
                      {availableVariants.map(variant => (
                        <option key={variant.size} value={variant.size}>
                          {variant.size}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-textmuted">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-bordersub rounded-full bg-surface2 px-4 h-14 w-full sm:w-36 shrink-0">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-textmuted hover:text-rosegold px-3 h-full flex items-center text-xl transition-colors"
                >-</button>
                <span className="flex-1 text-center text-textmain font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-textmuted hover:text-rosegold px-3 h-full flex items-center text-xl transition-colors"
                >+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={product.isVariable && !selectedVariant}
                className="flex-1 bg-rosegold text-base h-14 rounded-full font-medium tracking-widest uppercase text-sm glow-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Add to Cart
              </button>
            </div>
            
            {/* Disclaimer */}
            <div className="bg-surface2 p-5 rounded-xl border border-bordersub flex gap-4 items-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-mauve shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xs text-textmuted leading-relaxed uppercase tracking-wider">
                <strong>Research Use Only.</strong> This product is intended strictly for laboratory research and development purposes. It is not for human or veterinary use.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {product.tabs && product.tabs.length > 0 && (
        <div className="mt-20 md:mt-28">
          <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-bordersub mb-10 overflow-x-auto">
            {product.tabs.map((tab, i) => (
              <button
                key={tab.title}
                onClick={() => setActiveTab(i)}
                className={`px-4 sm:px-6 py-4 text-xs sm:text-sm uppercase tracking-widest font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === i
                    ? "text-rosegold border-rosegold"
                    : "text-textmuted border-transparent hover:text-textmain"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="prose prose-invert prose-rosegold max-w-none text-textsub space-y-5">
            {product.tabs[activeTab].paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      )}

      {/* FAQs */}
      {product.faqs && product.faqs.length > 0 && (
        <div className="mt-20 md:mt-28 max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl text-rosegold mb-10">Frequently Asked Questions</h2>
          <div className="divide-y divide-bordersub border-t border-b border-bordersub">
            {product.faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-textmain font-medium text-sm sm:text-base">{faq.q}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-5 h-5 text-mauve shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openFaq === i && (
                  <p className="text-textmuted text-sm leading-relaxed pb-6 pr-10">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
