"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ANNOUNCEMENT_MESSAGES = [
  "Curated research peptides, verified ≥99% purity",
  "Free delivery on orders above $300 (via 99 Purity Peptides)",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="bg-[#0A0A0A] text-textsub border-b border-white/5 text-center min-h-[40px] py-2 md:py-0 px-8 text-[9px] sm:text-[10px] md:text-xs font-medium tracking-widest uppercase relative flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full relative flex items-center justify-center min-h-[40px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:whitespace-nowrap leading-relaxed"
          >
            {ANNOUNCEMENT_MESSAGES[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-textmuted hover:text-white transition-colors z-10"
        aria-label="Dismiss announcement"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
