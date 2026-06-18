"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { buildCheckoutUrl, CLEAR_CART_ON_CHECKOUT } from "@/lib/checkout";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Lock, X, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartClient() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsRedirecting(true);
    
    const checkoutUrl = buildCheckoutUrl(items);
    
    // Full redirect to WooCommerce Parent Site
    window.location.href = checkoutUrl;

    // Clear the cart locally after a short delay. 
    // This ensures the visual UI doesn't jarringly empty before the redirect completes,
    // but ensures the cart is empty if the user later returns to the site.
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.015] blur-[150px] rounded-full pointer-events-none z-0"></div>
        
        <ScrollReveal direction="up" delay={0.1} className="relative z-10 w-full max-w-2xl px-4">
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-12 md:p-20 text-center flex flex-col items-center shadow-2xl">
            <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 shadow-inner">
              <ShoppingBag className="w-10 h-10 text-white/20" strokeWidth={1} />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white mb-6 tracking-wide">Your Cart is Empty</h1>
            <p className="mb-10 text-white/50 text-sm md:text-base font-light leading-relaxed max-w-sm">
              You haven't added any compounds to your research catalog yet.
            </p>
            <Link 
              href="/shop"
              className="group inline-flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-gray-200 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:-translate-y-1"
            >
              Explore Catalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-32 overflow-hidden relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.015] blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex items-center justify-between mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-white tracking-wide">Your Cart</h1>
            <Link href="/shop" className="hidden md:inline-flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors font-sans border border-white/10 bg-white/[0.02] backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/5 hover:border-white/20 group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {items.map((item, i) => (
              <ScrollReveal key={item.key} delay={0.1 + (i * 0.1)} direction="up">
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl sm:rounded-[2rem] p-4 sm:p-8 flex flex-row gap-4 sm:gap-8 relative group hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden">
                  
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <button 
                    onClick={() => removeItem(item.key)}
                    className="absolute top-2 right-2 sm:top-6 sm:right-6 text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all p-2 rounded-full z-20"
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                  </button>
                  
                  <Link href={`/product/${item.slug}`} className="relative w-20 h-28 sm:w-32 sm:h-32 bg-black rounded-xl overflow-hidden shrink-0 block border border-white/5">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover opacity-70 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-50" />
                  </Link>
                  
                  <div className="flex flex-col flex-1 justify-between">
                    <div className="mb-4 sm:mb-0">
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="font-serif text-lg sm:text-2xl md:text-3xl text-white mb-1 pr-6 sm:pr-8 group-hover:text-white transition-colors leading-tight">{item.name}</h3>
                      </Link>
                      {item.label && (
                        <p className="text-[10px] sm:text-xs md:text-sm text-white/50 tracking-wide font-light">{item.label}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mt-auto">
                      
                      {/* Quantity Stepper */}
                      <div>
                        <label className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-white/30 mb-1.5 sm:mb-2 font-sans ml-1">Quantity</label>
                        <div className="flex items-center border border-white/20 rounded-lg sm:rounded-xl bg-black/50 px-2 h-8 sm:h-10 w-24 sm:w-28 shadow-inner">
                          <button 
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="text-white/50 hover:text-white px-2 h-full flex items-center text-base sm:text-lg transition-colors"
                          >-</button>
                          <span className="flex-1 text-center text-white text-xs sm:text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="text-white/50 hover:text-white px-2 h-full flex items-center text-base sm:text-lg transition-colors"
                          >+</button>
                        </div>
                      </div>
                      
                      <div className="text-left sm:text-right mt-1 sm:mt-0">
                        <p className="text-white/30 text-[9px] sm:text-[10px] mb-0.5 sm:mb-1 tracking-widest uppercase">${item.price.toFixed(2)} each</p>
                        <p className="text-white font-serif text-lg sm:text-xl md:text-2xl leading-none">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ScrollReveal direction="up" delay={0.3} className="sticky top-32">
              <div className="w-full bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  
                  <h2 className="font-serif text-2xl md:text-3xl text-white mb-8">Order Summary</h2>
                  
                  <div className="space-y-5 text-sm text-white/60 mb-8 font-light">
                    <div className="flex justify-between items-center pb-5 border-b border-white/5">
                      <span className="tracking-wide">Subtotal</span>
                      <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-5 border-b border-white/5">
                      <span className="tracking-wide">Shipping</span>
                      <span className="text-white/40 italic">Calculated at checkout</span>
                    </div>
                    <div className="pt-2 flex justify-between items-end">
                      <span className="text-white font-serif text-xl">Estimated Total</span>
                      <span className="text-white font-serif text-3xl">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={items.length === 0 || isRedirecting}
                    className="w-full bg-white text-black h-16 rounded-2xl font-bold tracking-widest uppercase text-[11px] sm:text-xs hover:bg-gray-200 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    {!isRedirecting && (
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                    )}
                    
                    {isRedirecting ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  
                  <div className="mt-8 text-center flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-white/40">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase tracking-widest">Secure Checkout</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-white/30 leading-relaxed max-w-xs font-light">
                      You will be securely redirected to our parent laboratory, <a href="http://99puritypeptides.com/" target="_blank" rel="noopener noreferrer" className="text-white/60 underline hover:text-white transition-colors">99 Purity Peptides</a>, to complete your research order.
                    </p>
                  </div>
                </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
}
