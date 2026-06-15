import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import HeaderCartIcon from "@/components/HeaderCartIcon";
import AnnouncementBar from "@/components/AnnouncementBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <CartProvider>
          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Header */}
          <header className="sticky top-0 z-50 bg-base/90 backdrop-blur-md border-b border-bordersub">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              {/* Logo Placeholder */}
              <Link href="/" className="font-serif text-2xl text-rosegold tracking-wider">
                SCARLETT HAWKINS
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-textsub">
                <Link href="/shop" className="hover:text-rosegoldhi transition-colors">Shop</Link>
                <Link href="/about" className="hover:text-rosegoldhi transition-colors">About</Link>
                <Link href="/faqs" className="hover:text-rosegoldhi transition-colors">FAQs</Link>
                <Link href="/blog" className="hover:text-rosegoldhi transition-colors">Journal</Link>
                <Link href="/contact" className="hover:text-rosegoldhi transition-colors">Contact</Link>
              </nav>

              {/* Cart Icon */}
              <HeaderCartIcon />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-surface border-t border-bordersub mt-20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                  <Link href="/" className="font-serif text-2xl text-rosegold tracking-wider block mb-4">
                    SCARLETT HAWKINS
                  </Link>
                  <p className="text-textmuted text-sm max-w-sm">
                    A curated collection of premium research peptides. Elegance and purity for your laboratory needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-rosegold text-lg mb-4">Explore</h4>
                  <ul className="space-y-2 text-sm text-textsub">
                    <li><Link href="/shop" className="hover:text-rosegoldhi">Shop All</Link></li>
                    <li><Link href="/about" className="hover:text-rosegoldhi">Our Story</Link></li>
                    <li><Link href="/blog" className="hover:text-rosegoldhi">The Journal</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-rosegold text-lg mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-textsub">
                    <li><Link href="/faqs" className="hover:text-rosegoldhi">FAQs</Link></li>
                    <li><Link href="/contact" className="hover:text-rosegoldhi">Contact Us</Link></li>
                    <li><Link href="/cart" className="hover:text-rosegoldhi">View Cart</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-bordersub pt-8 text-center">
                <p className="text-textmuted text-xs uppercase tracking-widest max-w-2xl mx-auto mb-4 leading-relaxed">
                  Products are intended for research and laboratory use only. Not for human or veterinary use.
                </p>
                <p className="text-textmuted text-xs">
                  &copy; {new Date().getFullYear()} Scarlett Hawkins. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
