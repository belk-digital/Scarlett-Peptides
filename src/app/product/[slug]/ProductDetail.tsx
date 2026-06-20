"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/animations/TiltCard";
import { ArrowLeft, ShieldAlert, ChevronDown, Check } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductDetail({ product }: { product: Product }) {
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
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const availableVariants = selectedConcentration
    ? parsedVariants.filter(v => v.concentration === selectedConcentration)
    : [];

  const selectedVariant = parsedVariants.find(v => v.concentration === selectedConcentration && v.size === selectedSize);

  const handleConcentrationChange = (conc: string) => {
    setSelectedConcentration(conc);
    setSelectedSize("");
  };

  const displayPrice = product.isVariable
    ? (selectedVariant ? selectedVariant.price : Math.min(...(product.variants?.map(v => v.price) || [0])))
    : product.price;

  const displayRegularPrice = product.isVariable
    ? (selectedVariant ? selectedVariant.regularPrice : undefined)
    : product.regularPrice;

  const handleAddToCart = () => {
    if (product.isVariable && !selectedVariant) {
      alert("Please select a format first.");
      return;
    }

    setIsAdding(true);

    setTimeout(() => {
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

      setIsAdding(false);
      setJustAdded(true);

      setTimeout(() => {
        setJustAdded(false);
      }, 2500);
    }, 600);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 md:pt-40 pb-32 overflow-hidden relative">

      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-square bg-white/[0.015] blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <ScrollReveal direction="up" delay={0.1}>
          <Link href="/shop" className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-12 font-sans border border-white/10 bg-white/[0.02] backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/5 hover:border-white/20">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT: PRODUCT IMAGE */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="up" delay={0.2} className="sticky top-32">
              <TiltCard className="w-full">
                <div className="relative w-full aspect-[4/5] bg-black rounded-[2rem] overflow-hidden border border-white/10 group shadow-[0_20px_60px_rgba(0,0,0,0.8)] [transform:translateZ(0)]">
                  {/* Subtle shine effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-20 pointer-events-none"></div>

                  <Image
                    src={selectedVariant?.image || product.image}
                    alt={`${product.name}, ${product.category} research peptide, ≥99% HPLC purity`}
                    fill
                    className="object-cover rounded-[2rem] z-10 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    priority
                  />
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-6 left-6 z-30">
                    <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg font-sans">
                      {product.category}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-7 flex flex-col justify-start pt-4 lg:pt-8">

            <ScrollReveal direction="up" delay={0.3}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight tracking-wide">
                {product.name}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex items-end gap-4 mb-10">
                <p className="text-3xl text-white font-serif">
                  {product.isVariable && !selectedVariant && <span className="text-lg text-white/50 font-sans mr-2">From</span>}
                  ${displayPrice?.toFixed(2)}
                </p>
                {displayRegularPrice && displayRegularPrice > (displayPrice || 0) && (
                  <p className="text-lg text-white/30 line-through font-light mb-1">
                    ${displayRegularPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="text-sm md:text-base text-white/60 mb-12 font-light leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: product.longDescription }} />
              </div>
            </ScrollReveal>

            {/* ACTION AREA (GLASS CONTAINER) */}
            <ScrollReveal direction="up" delay={0.6}>
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

                {/* Variant Selectors */}
                {product.isVariable && product.variants && (
                  <div className="mb-8 relative z-10">

                    {/* Concentration Selection (Pills) */}
                    <div className="mb-8">
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-4 font-sans ml-1">
                        1. Select Concentration
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {uniqueConcentrations.map(conc => (
                          <button
                            key={conc}
                            onClick={() => handleConcentrationChange(conc)}
                            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                              selectedConcentration === conc
                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
                            }`}
                          >
                            {selectedConcentration === conc && <Check className="w-4 h-4" />}
                            {conc}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selection (Pills) */}
                    <div className={`transition-opacity duration-500 ${!selectedConcentration ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-4 font-sans ml-1">
                        2. Select Size / Format
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {availableVariants.map(variant => (
                          <button
                            key={variant.size}
                            onClick={() => setSelectedSize(variant.size)}
                            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                              selectedSize === variant.size
                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
                            }`}
                          >
                            {selectedSize === variant.size && <Check className="w-4 h-4" />}
                            {variant.size}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* Quantity Stepper & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 relative z-10 pt-4 border-t border-white/10">
                  <div className="flex items-center border border-white/20 rounded-xl bg-black/50 px-4 h-14 w-full sm:w-36 shrink-0 shadow-inner">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="text-white/50 hover:text-white px-3 h-full flex items-center text-xl transition-colors"
                    >-</button>
                    <span className="flex-1 text-center text-white font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="text-white/50 hover:text-white px-3 h-full flex items-center text-xl transition-colors"
                    >+</button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={(product.isVariable && !selectedVariant) || isAdding || justAdded}
                    className={`w-full sm:flex-1 shrink-0 h-14 rounded-xl font-bold tracking-widest uppercase text-xs transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 ${
                      justAdded
                        ? "bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                        : "bg-white text-black hover:bg-gray-200 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
                    }`}
                  >
                    {isAdding ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    ) : justAdded ? (
                      <>
                        <Check className="w-5 h-5" /> Added to Cart
                      </>
                    ) : (
                      <>
                        Add to Cart <span className="font-serif font-light lowercase text-lg leading-none -mt-1 hidden sm:inline">&rarr;</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Disclaimer */}
            <ScrollReveal direction="up" delay={0.7}>
              <div className="mt-8 bg-red-500/5 p-5 rounded-2xl border border-red-500/10 flex gap-4 items-start">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-[11px] text-white/50 leading-relaxed uppercase tracking-wider font-sans">
                  <strong className="text-red-400">Research Use Only.</strong> This compound is intended strictly for laboratory research and development purposes. It is explicitly not for human consumption, diagnostic purposes, or veterinary use.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* TABS SECTION */}
        {product.tabs && product.tabs.length > 0 && (
          <ScrollReveal direction="up" delay={0.2}>
            <div className="mt-32 max-w-4xl border border-white/10 bg-white/[0.02] backdrop-blur-lg rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Subtle top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              <div className="flex flex-wrap gap-2 md:gap-4 border-b border-white/10 pb-6 mb-8">
                {product.tabs.map((tab, i) => (
                  <button
                    key={tab.title}
                    onClick={() => setActiveTab(i)}
                    className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs uppercase tracking-widest font-sans transition-all duration-300 border ${
                      activeTab === i
                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        : "bg-transparent text-white/50 border-transparent hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              <div className="text-sm md:text-base text-white/60 font-light leading-relaxed space-y-6">
                {product.tabs[activeTab].paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* FAQS SECTION */}
        {product.faqs && product.faqs.length > 0 && (
          <div className="mt-32 max-w-4xl">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-white/20"></div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Documentation</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-12">Compound FAQs</h2>
            </ScrollReveal>

            <div className="space-y-4">
              {product.faqs.map((faq, i) => (
                <ScrollReveal key={i} direction="up" delay={0.1 + i * 0.05}>
                  <TiltCard className="w-full">
                    <div className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden group transition-colors duration-500 hover:bg-white/[0.05] hover:border-white/20">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left relative"
                      >
                        {/* Hover shine */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <span className="font-serif text-lg md:text-xl text-white pr-4">{faq.q}</span>
                        <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-500 ${openFaq === i ? "bg-white text-black border-white" : "bg-white/5 text-white/50"}`}>
                          <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      <div className={`grid transition-all duration-500 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="text-white/60 font-light text-sm md:text-base leading-relaxed p-6 md:p-8 pt-0 border-t border-white/10 mt-2" dangerouslySetInnerHTML={{ __html: faq.a }} />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
