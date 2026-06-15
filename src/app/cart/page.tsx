"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { buildCheckoutUrl, CLEAR_CART_ON_CHECKOUT } from "@/lib/checkout";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    const checkoutUrl = buildCheckoutUrl(items);
    
    if (CLEAR_CART_ON_CHECKOUT) {
      clearCart();
    }
    
    // Full redirect to WooCommerce Parent Site
    window.location.href = checkoutUrl;
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="font-serif text-4xl text-rosegold mb-8 text-center">Your Cart</h1>
        <div className="card-elevated p-16 text-center text-textsub flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-bordersub mb-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <p className="mb-8 text-lg font-light">Your cart is currently empty.</p>
          <Link 
            href="/shop"
            className="bg-transparent text-rosegold border border-rosegold px-10 py-3 rounded-full font-medium tracking-widest uppercase text-sm hover:bg-rosegold hover:text-base transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-4xl md:text-5xl text-rosegold mb-12">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.key} className="card-elevated p-6 flex flex-col sm:flex-row gap-6 relative">
              <button 
                onClick={() => removeItem(item.key)}
                className="absolute top-4 right-4 text-textmuted hover:text-rosegold transition-colors p-2"
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <Link href={`/product/${item.slug}`} className="relative w-24 h-24 sm:w-32 sm:h-32 bg-surface2 rounded-xl overflow-hidden shrink-0 block">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all"
                />
              </Link>
              
              <div className="flex flex-col flex-1 justify-between py-1">
                <div>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-serif text-2xl text-rosegold mb-1 pr-8">{item.name}</h3>
                  </Link>
                  {item.label && (
                    <p className="text-sm text-champagne mb-4 tracking-wide">{item.label}</p>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center border border-bordersub rounded-full bg-surface2 px-2 h-10 w-28">
                    <button 
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="text-textmuted hover:text-rosegold px-2 h-full flex items-center text-lg"
                    >-</button>
                    <span className="flex-1 text-center text-textmain text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="text-textmuted hover:text-rosegold px-2 h-full flex items-center text-lg"
                    >+</button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-textmuted text-xs mb-1">${item.price.toFixed(2)} each</p>
                    <p className="text-rosegoldhi font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card-elevated p-8 sticky top-32">
            <h2 className="font-serif text-2xl text-rosegold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-textsub mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-bordersub pt-4 mt-4 flex justify-between text-base">
                <span className="text-rosegold">Estimated Total</span>
                <span className="text-champagne font-medium">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={items.length === 0}
              className={`w-full bg-rosegold text-base py-4 rounded-full font-medium tracking-widest uppercase text-xs transition-all flex flex-col items-center gap-1 ${
                items.length === 0 ? "opacity-50 cursor-not-allowed" : "glow-hover hover:scale-[1.02]"
              }`}
            >
              <span>Proceed to Checkout on</span>
              <span>99 Purity Peptides</span>
            </button>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-textmuted leading-relaxed">
                You will be securely redirected to our parent laboratory to complete your research order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
