import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  organizationJsonLd,
  localBusinessJsonLd,
  websiteSearchJsonLd,
} from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Premium Research Peptides - ≥99% Purity, Independently Verified`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "research peptides",
    "buy peptides online",
    "99% purity peptides",
    "HPLC verified peptides",
    "GHK-Cu",
    "NAD+",
    "Wolverine Stack",
    "peptide catalog",
    "research use only peptides",
    "lyophilized peptides",
    "peptide purity testing",
    "Certificate of Analysis peptides",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Premium Research Peptides, ≥99% Purity`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Premium Research Peptides`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  category: "science",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#050505] text-[#faf6f5] overflow-x-hidden" suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd(), websiteSearchJsonLd()]} />
        <CartProvider>
          <SmoothScroll>
            <div className="fixed top-0 w-full z-50 flex flex-col">
              {/* Header (Now includes Announcement Bar internally) */}
              <Header />
            </div>

           
            <main className="flex-1">
              {children}
            </main>

            {/* Premium Global Footer */}
            <footer className="relative bg-[#050505] border-t border-white/10 pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden">
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-white/[0.01] blur-[100px] rounded-full pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-16 md:mb-20">
                  <div className="lg:col-span-2">
                    <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity duration-300">
                      <Image 
                        src="/logo.png" 
                        alt="Peptides7" 
                        width={300} 
                        height={65} 
                        className="h-14 md:h-20 w-auto object-contain mix-blend-difference" 
                      />
                    </Link>
                    <p style={{ color: '#9ca3af' }} className="text-sm md:text-base max-w-sm leading-relaxed font-light">
                      A curated collection of premium research peptides with absolute purity for your laboratory needs.
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
                  <div>
                    <h4 className="text-white text-xs md:text-sm tracking-widest uppercase mb-6 font-medium">
                      Reach Us
                    </h4>
                    <div className="space-y-4 text-sm md:text-base font-light">
                      <a href="mailto:hello@peptides7.com" className="inline-flex items-center gap-2 text-white hover:text-white/70 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        hello@peptides7.com
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Disclaimer Section */}
              <div className="border-t border-[#1f2937] pt-12 mt-12">
                <div className="mb-10 max-w-4xl mx-auto md:mx-0 text-center md:text-left">
                  <h5 style={{ color: '#d1d5db' }} className="text-xs md:text-sm font-medium uppercase tracking-widest mb-4">Disclaimer</h5>
                  <p style={{ color: '#6b7280' }} className="text-[10px] md:text-xs leading-relaxed md:leading-loose font-light">
                    This site contains affiliate links. The owner of this site may earn a commission on purchases made through third-party sites at no cost to you. I am not the seller or fulfiller of any products. All content on this site is for informational purposes only, nothing here constitutes medical advice. We are not liable for any products, outcomes, or transactions on third-party websites.
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                  <div className="flex flex-col gap-2 md:gap-3 items-center md:items-start">
                    <p style={{ color: '#4b5563' }} className="text-[10px] md:text-xs tracking-widest uppercase">
                      &copy; {new Date().getFullYear()} Peptides7. All rights reserved.
                    </p>
                    <p style={{ color: '#4b5563' }} className="text-[10px] tracking-widest uppercase">
                      Design & Developed by <a href="https://belkdigital.com" target="_blank" rel="noopener noreferrer" className="text-[#8c8273] hover:text-[#b3a895] transition-colors">Belk Digital</a>
                    </p>
                  </div>
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
