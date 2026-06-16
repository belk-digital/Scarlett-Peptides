import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scarlett Hawkins | Curated Peptides",
  description: "A curated peptide catalog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#050505]" suppressHydrationWarning>
        <CartProvider>
          <SmoothScroll>
            <div className="fixed top-0 w-full z-50 flex flex-col">
              {/* Top Announcement Bar */}
              <AnnouncementBar />

              {/* Header */}
              <Header />
            </div>

            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Premium Global Footer */}
            <footer className="relative bg-[#050505] border-t border-white/10 pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden">
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-white/[0.01] blur-[100px] rounded-full pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16 md:mb-20">
                  <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="font-serif text-3xl md:text-4xl text-white tracking-widest block mb-6 hover:text-gray-300 transition-colors duration-300">
                      SCARLETT HAWKINS
                    </Link>
                    <p style={{ color: '#9ca3af' }} className="text-sm md:text-base max-w-sm leading-relaxed font-light">
                      A curated collection of premium research peptides. Elegance and absolute purity for your laboratory needs.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white text-xs md:text-sm tracking-widest uppercase mb-6 font-medium">
                      Explore
                    </h4>
                    <ul className="space-y-4 text-sm md:text-base font-light">
                      <li><Link href="/shop" style={{ color: '#9ca3af' }} className="hover:text-white transition-colors duration-300">Shop All</Link></li>
                      <li><Link href="/about" style={{ color: '#9ca3af' }} className="hover:text-white transition-colors duration-300">Our Story</Link></li>
                      <li><Link href="/blog" style={{ color: '#9ca3af' }} className="hover:text-white transition-colors duration-300">The Journal</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-xs md:text-sm tracking-widest uppercase mb-6 font-medium">
                      Support
                    </h4>
                    <ul className="space-y-4 text-sm md:text-base font-light">
                      <li><Link href="/faqs" style={{ color: '#9ca3af' }} className="hover:text-white transition-colors duration-300">FAQs</Link></li>
                      <li><Link href="/contact" style={{ color: '#9ca3af' }} className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
                      <li><Link href="/cart" style={{ color: '#9ca3af' }} className="hover:text-white transition-colors duration-300">View Cart</Link></li>
                    </ul>
                  </div>
                </div>
                
                {/* Disclaimer Section */}
              <div className="border-t border-[#1f2937] pt-12 mt-12">
                <div className="bg-white/[0.02] rounded-xl md:rounded-2xl p-6 md:p-8 mb-8 border border-[#1f2937]">
                  <h5 style={{ color: '#d1d5db' }} className="text-xs md:text-sm font-medium uppercase tracking-widest mb-4">Important Research Notice</h5>
                  <p style={{ color: '#6b7280' }} className="text-[10px] md:text-xs leading-relaxed md:leading-loose font-light">
                    The products offered by Scarlett Hawkins are intended strictly for in-vitro research and laboratory use only. They are not intended for human consumption, medical treatment, diagnostic purposes, or any veterinary use. All buyers must be qualified researchers handling materials in a sanctioned laboratory environment. By purchasing from Scarlett Hawkins, you acknowledge the risks associated with these compounds and agree to our Terms of Service.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                  <p style={{ color: '#4b5563' }} className="text-[10px] md:text-xs tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} Scarlett Hawkins. All rights reserved.
                  </p>
                  <div className="flex gap-6 text-[10px] md:text-xs tracking-widest uppercase">
                    <Link href="/terms" style={{ color: '#4b5563' }} className="hover:text-white transition-colors">Terms</Link>
                    <Link href="/privacy" style={{ color: '#4b5563' }} className="hover:text-white transition-colors">Privacy</Link>
                  </div>
                </div>
              </div>
              </div>
            </footer>
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
