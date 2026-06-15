"use client";

import { useState, useEffect } from "react";

export const ANNOUNCEMENT_MESSAGES = [
  "Curated research peptides, verified ≥99% purity",
  "Complimentary 2-day shipping on orders over $300 (via 99 Purity Peptides)",
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
    <div className="bg-rosegold text-base text-center py-2 text-xs sm:text-sm font-medium tracking-wide relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 transition-opacity duration-500">
        {ANNOUNCEMENT_MESSAGES[currentIndex]}
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
