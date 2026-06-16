"use client";

import { FormEvent } from "react";

export default function NewsletterForm({ ctaText }: { ctaText: string }) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Stub: Thanks for subscribing to the journal!");
  };

  return (
    <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Your email address" 
        className="bg-surface2 border border-bordersub text-textmain px-6 py-3 rounded-full flex-1 focus:outline-none focus:border-white/50 focus:shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all"
        required
      />
      <button type="submit" className="bg-white text-black text-base px-8 py-3 rounded-full font-medium uppercase tracking-widest text-xs glow-hover transition-all">
        {ctaText}
      </button>
    </form>
  );
}
