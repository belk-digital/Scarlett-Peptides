import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions | Peptides7",
  description: "Review the Terms and Conditions for using Peptides7 services, including purchasing guidelines, user responsibilities, and research-use-only policies.",
  path: "/terms",
  noIndex: true,
});

export default function Terms() {
  return (
    <>
      <JsonLd data={[
        breadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Terms and Conditions", url: `${SITE_URL}/terms` },
        ]),
      ]} />
      <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide mb-4">Terms and Conditions</h1>
            <p className="text-white/50 text-sm tracking-widest uppercase">Effective Date: January 2026</p>
          </div>

          <div className="prose prose-invert prose-p:text-white/70 prose-li:text-white/70 prose-headings:font-serif prose-headings:text-white prose-headings:font-normal max-w-none space-y-8 text-sm md:text-base leading-relaxed">
            <p>
              Welcome to Peptides7. By accessing or using our website, purchasing products or interacting with our services, you agree to be bound by the following Terms and Conditions. If you do not agree, please do not use our website or services.
            </p>

            <section>
              <h2 className="text-2xl mb-4">1. Purpose</h2>
              <p>
                Peptides7 provides research-grade peptides, small molecules and related compounds. All products are intended for laboratory and research purposes only. They are not for human or veterinary use, diagnosis or treatment. These Terms govern your access, use, and purchase of our products and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">2. Research-Use Only Products</h2>
              <p>All products sold through our website are strictly for research purposes. By purchasing or using our products, you confirm that:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>You understand and accept that products are not intended for consumption or medical use.</li>
                <li>You will use all products solely in approved laboratory or experimental models.</li>
                <li>You accept full responsibility for the safe handling, storage and disposal of products.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">3. Account & User Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Users must be 18 years or older or of legal age in their jurisdiction.</li>
                <li>Accurate and up-to-date personal and billing information must be provided.</li>
                <li>You are responsible for safeguarding your account credentials and activity.</li>
                <li>Any misuse of your account or unauthorized purchases must be reported immediately.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">4. Ordering & Payment</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders are processed once payment is successfully completed.</li>
                <li>We accept payment methods as listed on the checkout page.</li>
                <li>All prices are in USD unless otherwise stated.</li>
                <li>Orders may be canceled or modified before shipment, subject to approval.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">5. Shipping & Delivery</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>We ship to approved regions only. Certain products may have restrictions due to local laws.</li>
                <li>Shipping timelines are estimates and may vary due to logistics or customs processing.</li>
                <li>Peptides7 is not responsible for delays or damages during transit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">6. Product Liability & Safety</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Products are not approved for human or veterinary use.</li>
                <li>Users assume all risks associated with storage, handling and research applications.</li>
                <li>Peptides7 is not liable for misuse, accidental ingestion or unapproved applications.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">7. Intellectual Property</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All website content, images, product descriptions, branding and designs are the property of Peptides7.</li>
                <li>Unauthorized reproduction, distribution or commercial use is strictly prohibited.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">8. User Conduct</h2>
              <p>By using our website, you agree not to:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Engage in illegal activities using our products.</li>
                <li>Distribute, sell or apply research products for unapproved purposes.</li>
                <li>Violate any applicable laws or regulations in your jurisdiction.</li>
              </ul>
              <p className="mt-4">Violations may result in order cancellation, account suspension or legal action.</p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">9. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Peptides7 is not liable for damages resulting from misuse, unauthorized applications or website errors.</li>
                <li>Liability for product issues is limited to the purchase price of the product.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">10. Indemnification</h2>
              <p>You agree to indemnify and hold harmless Peptides7, its employees and affiliates from any claims, damages or expenses arising from:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Improper use of products.</li>
                <li>Violation of Terms and Conditions.</li>
                <li>Breach of local or federal laws related to product use.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction in which Peptides7 operates. Any disputes will be resolved under these laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">12. Privacy & Data Use</h2>
              <p>
                Your use of Peptides7 is also subject to our Privacy Policy, which outlines how we collect, use and protect your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">13. Changes to Terms</h2>
              <p>
                Peptides7 reserves the right to update or modify these Terms at any time. Changes will be effective upon posting on the website. Your continued use of our website or products constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="pt-8 mt-12 border-t border-white/10">
              <h2 className="text-2xl mb-4">Customer Support</h2>
              <p>
                If you have questions about these Terms and Conditions, please reach out to us via our <a href="/contact" className="underline hover:text-white transition-colors">Contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
