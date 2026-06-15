# Scarlett Hawkins Affiliate Store — Full Website Plan

**Project owner:** Belk Digital
**Parent store:** 99 Purity Peptides (`https://99puritypeptides.com`) — WooCommerce / WordPress
**Affiliate client:** Scarlett Hawkins (medspa owner — reference: `scarletthawkinsmedspa.com`)
**Stack for new site:** Next.js (App Router) + Tailwind CSS, deployed on Vercel
**Last updated:** June 16, 2026

---

## 1. The Big Picture (Read This First)

The affiliate site is a **storefront skin** — it looks and feels like a real store with products, a cart, and an "add to cart" experience. But it does **not** process payments, hold inventory, manage stock, or handle shipping. It is a **curated catalog + cart-builder** whose only job is to hand a fully-populated cart over to the parent 99 Purity Peptides store, where the actual sign-in, payment, and fulfillment happen.

This matters because it keeps the build cheap, fast, and low-liability for the client:

- No payment gateway, no PCI compliance, no Stripe/PayPal account needed on the affiliate site.
- No inventory sync headaches — the source of truth for stock and price stays on 99PP.
- The affiliate just needs traffic and a referral tag; 99PP does the heavy lifting.

The site is **traffic-gated for now** — it's only reached via links the client shares (her medspa, social, email). It does not need to rank in Google on day one, so we can skip aggressive SEO at launch and add it later if she wants public discovery.

---

## 2. How the Cart Hand-off Works (The Core Mechanism)

This is the technical heart of the project. Here is the confirmed, working approach.

### 2.1 WooCommerce already supports cart-via-URL natively

99 Purity Peptides runs **WooCommerce**. WooCommerce natively accepts a URL that adds a product to the cart:

```
https://99puritypeptides.com/cart/?add-to-cart=819
```

That single-product URL works **out of the box** with zero changes to the parent site (the homepage crawl confirmed live `?add-to-cart=819` links already in use on 99PP for the Semax/Selank blend).

### 2.2 Multiple products in one link

To send a **whole cart** (multiple products + quantities), WooCommerce needs a tiny extension on the parent site. There are two equivalent ways to enable it — pick one:

**Option A — Free plugin (no code):**
Install *"Add Multiple Products to Cart via URL for WooCommerce"* on 99PP. Then this format works:

```
https://99puritypeptides.com/cart/?add-to-cart=12:2,34:1,56:5
```
(product 12 × 2, product 34 × 1, product 56 × 5)

**Option B — Code snippet (no plugin):**
Paste a ~20-line function into the 99PP child theme's `functions.php` (or a code-snippets plugin) that parses a comma-separated `add-to-cart` list and adds each item. This is the most maintainable if you don't want another plugin.

> Either way, **the only change required on 99PP is enabling multi-product URLs.** The affiliate site just builds the right link.

### 2.3 Handling variable products (important)

Many 99PP products are **variable** (e.g. KLOW, Retatrutide, Semaglutide have size/price variants — confirmed on the live homepage with "Select options"). Variable products need the **variation ID**, not just the parent product ID:

```
?add-to-cart=PARENT_ID&variation_id=VARIATION_ID&attribute_size=10mg
```

This means the affiliate site's product catalog must store, **per purchasable item, the exact 99PP variation ID** — not just the product. Simple (non-variable) products like Semax/Selank just use the product ID.

### 2.4 Attaching the affiliate referral tag

So the client gets credit for the sale, append her affiliate ref to the hand-off URL. 99PP already runs an **affiliate program** (confirmed: `/affiliate-registration` exists). Match whatever query key their affiliate system uses — commonly:

```
https://99puritypeptides.com/cart/?add-to-cart=12:2,34:1&ref=SCARLETT
```

> **ACTION:** Confirm with the 99PP affiliate plugin which referral parameter it reads (`?ref=`, `?aff=`, coupon auto-apply, or a cookie). The hand-off URL must carry it. If 99PP uses cookie-based referral, the affiliate site should first fire a hidden hit to the ref link to set the cookie, then redirect to the cart link.

### 2.5 The full user flow

1. Visitor lands on affiliate site (from client's link).
2. Browses 10–15 curated products, opens product detail pages.
3. Clicks "Add to Cart" → item stored in **local cart** (browser state on the affiliate site — nothing hits 99PP yet).
4. Adjusts quantities, reviews cart.
5. Clicks **"Checkout"** → affiliate site assembles the WooCommerce multi-product URL from the local cart, with the referral tag attached.
6. Visitor is **redirected to `99puritypeptides.com/cart/?add-to-cart=...&ref=...`**.
7. 99PP receives them with the **exact same products and quantities already in their WooCommerce cart**.
8. They sign in / register **on 99PP**, pay, and 99PP fulfills. Client gets affiliate credit.

```
[Affiliate Site]  build cart locally  ──►  [Redirect with cart URL + ref]  ──►  [99PP cart, pre-filled]  ──►  [99PP login + pay + ship]
```

---

## 3. Site Architecture & Pages

| Page | Route | Purpose |
|---|---|---|
| Homepage | `/` | Hero, brand intro, featured products, trust signals, CTA to shop |
| Shop / All Products | `/shop` | Grid of all 10–15 curated products with Add-to-Cart |
| Product Detail | `/product/[slug]` | Full description, image, variant selector, price, Add-to-Cart |
| Cart | `/cart` | Local cart review, qty edit, remove, "Checkout on 99PP" button |
| About | `/about` | Client's story / brand bio (mirror tone of medspa site) |
| FAQs | `/faqs` | Ordering, shipping (link to 99PP policy), research-use disclaimer |
| Contact | `/contact` | Form + email/phone, social links |
| Blog | `/blog` and `/blog/[slug]` | Optional educational posts (can reuse/adapt 99PP research content) |

**Global components:** Header (logo, nav, cart icon w/ live count), Footer (links, disclaimer, socials), Cart drawer/badge, Research-Use-Only disclaimer banner.

---

## 4. The Product Catalog (Data Model)

Products live in a simple **local data file** on the affiliate site (`/data/products.ts` or a JSON file) — no database needed for a 10–15 SKU catalog. Each product entry:

```ts
{
  slug: "klow",
  name: "KLOW Peptide Blend",
  shortDescription: "Branded joint & soft-tissue recovery blend (BPC-157, TB-500, KPV, GHK-Cu).",
  longDescription: "...",          // full copy for the detail page
  image: "/images/klow.webp",
  category: "Recovery Research",
  // The hand-off identity — THIS is what makes checkout work:
  wooProductId: 0,                  // parent product ID on 99PP
  variants: [                       // omit if simple product
    { label: "10mg / 3ML", price: 115, variationId: 0, attributes: { size: "10mg" } },
    { label: "Kit",        price: 1000, variationId: 0, attributes: { size: "kit" } }
  ],
  // For simple products instead:
  price: 100,
  isVariable: true
}
```

> **CRITICAL (matches your no-placeholder standard):** Every `wooProductId` and `variationId` must be the **real, live ID from 99PP** — verified before launch. A wrong ID = broken checkout. See §7 for how to pull them.

### Suggested starter catalog (from live 99PP best-sellers)
Tesamorelin, TB-500/BPC-157, Semax/Selank, Semaglutide, Retatrutide, PT-141, KLOW, GLOW — plus 2–7 more the client wants to feature. Final list = client's pick.

---

## 5. Tech Stack & Key Decisions

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | Client requirement; great DX, fast static pages |
| Styling | Tailwind CSS | Fast, matches a clean medspa aesthetic |
| Cart state | React Context + `localStorage` | No backend needed; cart persists across pages |
| Catalog | Static TS/JSON file | 10–15 SKUs don't justify a CMS or DB |
| Blog (optional) | MDX files **or** lightweight CMS | MDX if few posts; Sanity/Contentlayer if she'll write often |
| Hosting | Vercel | Native Next.js, free tier fine for this traffic |
| Forms | Formspree / Resend / Vercel form | No backend; contact form emails the client |
| Analytics | GA4 or Plausible | Track which products drive 99PP clicks |

**No backend server, no database, no payment integration on the affiliate site.** That's the whole point.

---

## 6. Design Direction

Mirror the **Scarlett Hawkins medspa aesthetic** (luxury, clean, feminine, Charleston boutique feel) rather than the clinical/scientific 99PP look — this is *her* brand to her audience. Pull palette and typography cues from `scarletthawkinsmedspa.com`. Keep the research-use-only disclaimer present but tasteful. Product photography should feel premium; reuse 99PP's product imagery where licensed.

---

## 7. Pre-Launch Data Gathering (Do Before Coding the Catalog)

1. **Confirm multi-product cart URL is enabled on 99PP** (plugin or snippet — §2.2).
2. **Pull every product ID + variation ID** for the curated SKUs from 99PP:
   - Easiest: WooCommerce REST API (`/wp-json/wc/v3/products`) with read keys, or
   - Admin: edit each product, read `post=ID` from the URL; for variants, inspect the variations.
3. **Confirm the affiliate referral parameter** the 99PP affiliate plugin expects (§2.4).
4. **Confirm checkout target** — cart page (`/cart/`) vs. straight to checkout (`/checkout/`). Cart page is safer (lets buyer review).
5. Get the **client's final product list, brand assets** (logo, colors, copy, photos), and **About/contact details**.

---

## 8. Build Phases

| Phase | Deliverable |
|---|---|
| 0 | Confirm 99PP multi-cart URL + referral param + pull all IDs (§7) |
| 1 | Next.js scaffold, Tailwind, layout (header/footer/cart badge), routing |
| 2 | Product data file with **verified** Woo IDs; Shop grid + Product detail pages |
| 3 | Local cart (Context + localStorage), cart page, qty/remove |
| 4 | **Checkout hand-off**: build multi-product URL + ref tag, redirect to 99PP, end-to-end test |
| 5 | Home, About, FAQs, Contact (+ form), optional Blog |
| 6 | Design polish to match medspa brand, mobile QA, disclaimer/compliance copy |
| 7 | Analytics, deploy to Vercel, connect client's domain, live cart-handoff test |

---

## 9. Risks & Watch-Outs

- **Variable products need variation IDs** — the #1 thing that breaks checkout. Verify each.
- **Referral attribution** — if 99PP uses cookie-based affiliate tracking, a single redirect may not set the cookie; you may need to bounce through the ref link first. Test that a sale actually credits the client.
- **Price drift** — the affiliate site shows prices from your static file. If 99PP changes prices, yours go stale. Either (a) periodically sync, (b) pull live via the Woo REST API, or (c) show "price confirmed at checkout."
- **Stock** — affiliate site can't see 99PP stock. An out-of-stock item will only reveal itself on 99PP's cart. Acceptable for v1; note it in FAQ.
- **Compliance** — keep the RUO / not-for-human-use disclaimer that 99PP uses; the affiliate site inherits the same legal posture.

---

## 10. Deliverables From You → Antigravity

Use the companion file **`affiliate-site-PROMPTS.md`** — copy each prompt block in order into Antigravity to scaffold and build the site.
