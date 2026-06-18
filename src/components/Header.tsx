"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import HeaderCartIcon from "@/components/HeaderCartIcon";
import AnnouncementBar from "@/components/AnnouncementBar";

const NAV_ITEMS = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Journal", href: "/blog" }
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only hide the header on mobile screens
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setHidden(false);
      return;
    }
    const previous = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="pointer-events-none w-full relative z-50 flex flex-col"
      >
        <div className="pointer-events-auto w-full">
          <AnnouncementBar />
        </div>
        
        <div className="pt-4 pb-4 pl-4 pr-6 md:px-8 lg:px-12 flex items-center justify-between w-full">
        {/* Logo (Visible on all breakpoints) */}
        <Link 
          href="/" 
          className="pointer-events-auto shrink-0 relative z-50 flex items-center"
        >
          <Image 
            src="/logo.png" 
            alt="Peptides 7" 
            width={240} 
            height={60} 
            className="h-12 md:h-16 w-auto object-contain mix-blend-difference hover:opacity-80 transition-opacity" 
            priority
          />
        </Link>

        {/* Desktop Navigation Pill */}
        <div className="pointer-events-auto hidden md:flex items-center bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-xl h-14 pl-6 pr-2 py-1.5 gap-8 shadow-2xl">
          <div className="flex items-center h-full pr-8 border-r border-white/10">
            <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase">MENU</span>
          </div>

          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="group flex items-center gap-3">
                <span className="text-xs font-sans font-medium uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="h-full flex items-center bg-[#B3B3B3] hover:bg-[#D9D9D9] text-black px-6 rounded-lg transition-colors cursor-pointer ml-4">
            <HeaderCartIcon />
          </div>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex md:hidden items-center gap-4 pointer-events-auto relative z-50">
          {/* Mobile Cart */}
          <div className="h-10 flex items-center bg-[#B3B3B3] hover:bg-[#D9D9D9] text-black px-4 rounded-lg transition-colors cursor-pointer">
            <HeaderCartIcon />
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#111111]/80 backdrop-blur-xl border border-white/10 text-white"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none"></div>

            <nav className="flex flex-col items-center gap-10 relative z-10">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-3xl font-serif tracking-widest text-white hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-12 flex flex-col items-center gap-4 text-center"
            >
              <span className="text-[10px] tracking-widest uppercase text-white/30">
                PEPTIDES 7 COLLECTION
              </span>
              <div className="w-12 h-px bg-white/10"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
