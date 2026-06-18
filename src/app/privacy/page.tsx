import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Peptides 7",
  description: "Learn how Peptides 7 collects, uses, and protects your personal and browsing information. Review our data security practices and user privacy rights.",
  path: "/privacy",
  noIndex: true,
});

export default function Privacy() {
  return (
    <>
      <JsonLd data={[
        breadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
        ]),
      ]} />
      <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide mb-4">Privacy Policy</h1>
            <p className="text-white/50 text-sm tracking-widest uppercase">Effective Date: January 2026</p>
          </div>

          <div className="prose prose-invert prose-p:text-white/70 prose-li:text-white/70 prose-headings:font-serif prose-headings:text-white prose-headings:font-normal max-w-none space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              At Peptides 7, your privacy is important to us. This Privacy Policy explains how we collect, use and protect your personal information when you interact with our website and services. By using our website, you consent to the practices described below.
            </p>

            <section>
              <h2 className="text-2xl mb-4">Information We Collect</h2>
              <p>We collect information to provide you with our services efficiently and securely. Types of information we may collect include:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><strong className="text-white/90">Personal Information:</strong> Name, email address, phone number, billing/shipping address.</li>
                <li><strong className="text-white/90">Account Information:</strong> Login credentials, order history and account preferences (handled securely via our fulfillment network).</li>
                <li><strong className="text-white/90">Financial Information:</strong> Payment details. Payment is processed entirely and securely within our fulfillment partner 99 Purity Peptides' secure checkout infrastructure. Peptides 7 does not directly handle, process, or store your payment data.</li>
                <li><strong className="text-white/90">Website Usage & Technical Data:</strong> IP address, browser type, pages visited, device information and website interactions.</li>
                <li><strong className="text-white/90">Cookies & Tracking:</strong> Cookies and similar technologies to enhance your browsing experience, analyze website performance and provide targeted content.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">How We Use Your Information</h2>
              <p>Your information is used for:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Processing and fulfilling orders, including shipping and payment via our fulfillment partner.</li>
                <li>Communicating order updates, customer support and account notifications.</li>
                <li>Improving website functionality and user experience.</li>
                <li>Sending promotional emails and marketing communications (with opt-out options).</li>
                <li>Compliance with legal obligations and protection of our rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Sharing Your Information</h2>
              <p>We respect your privacy and do not sell your personal data. Information may be shared only in limited situations:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><strong className="text-white/90">Service Providers:</strong> Trusted partners such as 99 Purity Peptides for payment processing, order fulfillment, shipping and technical support.</li>
                <li><strong className="text-white/90">Legal Requirements:</strong> When required by law, court order or regulatory authority.</li>
                <li><strong className="text-white/90">Protection of Rights:</strong> To prevent fraud, enforce terms or protect safety and property.</li>
                <li><strong className="text-white/90">Third-Party Links:</strong> Our website may include links to external sites. We are not responsible for the privacy practices of these third-party websites.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information. These include encryption, secure servers and restricted access.
                However, no system is completely secure. By using our services, you acknowledge the inherent risks of online data transmission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Access, update or correct your personal information.</li>
                <li>Request deletion of your information from our records.</li>
                <li>Opt-out of marketing and promotional communications.</li>
                <li>Restrict or object to the processing of your data.</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please reach out via our <Link href="/contact" className="underline hover:text-white transition-colors">Contact page</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Research-Use Products Disclaimer</h2>
              <p>All products curated by Peptides 7 are strictly for research use only:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Not for human or veterinary use.</li>
                <li>Not intended for diagnosis, treatment or therapeutic purposes.</li>
                <li>Users are responsible for handling and complying with all applicable laws and safety regulations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. We encourage you to review this policy regularly to stay informed about how we protect your information.
              </p>
            </section>

            <section className="pt-8 mt-12 border-t border-white/10">
              <h2 className="text-2xl mb-4">Customer Support</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us via our <Link href="/contact" className="underline hover:text-white transition-colors">Contact page</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
