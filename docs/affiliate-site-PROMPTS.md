# Antigravity Build Prompts — Scarlett Hawkins Affiliate Store

Copy each prompt block **in order** into Antigravity. Each builds on the previous.
Replace anything in `<ANGLE_BRACKETS>` with your real values before sending.
Stack: **Next.js (App Router) + TypeScript + Tailwind CSS**, deploy on Vercel.

> Before Prompt 4, you MUST have gathered the real 99PP product IDs and variation IDs (see PLAN §7). Checkout will not work with placeholder IDs.

**Prompt order:**
0 — Project context · 1 — Scaffold + layout · 2 — Product data model · 3 — Shop grid + product detail · 4 — Local cart · 5 — Checkout hand-off · **6 — Homepage** · **7 — About** · **8 — FAQs** · **9 — Contact** · **10 — Blog** · 11 — Polish/deploy · 12 — QA test script

> **Design:** Apply `affiliate-site-DESIGN.md` (dark + feminine + rose-gold glow) to every visual prompt. The scaffold prompt below already bakes the palette/typography in; keep referencing it for consistency.

---

## PROMPT 0 — Project Context (paste once, at the very start)

```
You are building a Next.js affiliate storefront for "Scarlett Hawkins" — a curated
peptide catalog that hands its cart off to a parent WooCommerce store at
https://99puritypeptides.com.

CRITICAL ARCHITECTURE RULES — follow these for the entire project:
- The affiliate site does NOT process payments, hold inventory, or have a backend
  database. It is a catalog + a LOCAL cart.
- "Checkout" means: assemble a WooCommerce add-to-cart URL from the local cart and
  REDIRECT the user to 99puritypeptides.com with all items pre-filled, plus an
  affiliate referral tag.
- The WooCommerce multi-product cart URL format is:
  https://99puritypeptides.com/cart/?add-to-cart=ID:QTY,ID:QTY&ref=<REF>
- Variable products require variation_id, e.g.:
  ?add-to-cart=PARENT_ID&variation_id=VAR_ID&quantity=QTY&attribute_size=10mg
- Cart state lives in React Context + localStorage. No server, no DB, no Stripe.

Stack: Next.js App Router, TypeScript, Tailwind CSS. Deploy target: Vercel.
Design vibe: luxury, clean, feminine Charleston-boutique medspa aesthetic
(reference: scarletthawkinsmedspa.com), NOT a clinical lab look.

Acknowledge these rules. We will build in phases. Do not generate code yet —
just confirm you understand the architecture, especially the cart hand-off.
```

---

## PROMPT 1 — Scaffold + Layout

```
Scaffold the project.

1. Create a Next.js (App Router) + TypeScript + Tailwind CSS project.
2. Set up these routes (pages can be stubs for now):
   /            (Home)
   /shop        (All products grid)
   /product/[slug]   (Product detail)
   /cart        (Local cart review)
   /about
   /faqs
   /contact
   /blog and /blog/[slug]
3. Build a global layout with:
   - Header: logo placeholder, nav links to all pages, and a cart icon on the right
     that shows a live item-count badge.
   - Footer: nav links, social icon placeholders, and a Research-Use-Only disclaimer
     line: "Products are intended for research and laboratory use only. Not for human
     or veterinary use."
   - A slim top announcement bar.
4. Tailwind theme — apply the DESIGN system (dark + feminine + rose-gold glow):
   - Warm dark base: bg #1A1416, surfaces #221A1D / #2C2226, borders #3A2F33
     (warm espresso-charcoal with a faint rose undertone — NOT pure black or cold blue-grey).
   - Highlight accents: rose-gold #E8B4A0 (primary), champagne #E6CBA8 (secondary),
     mauve #C98BA6 (tags/feminine pop). Buttons use dark text (#1A1416) on rose-gold.
   - Text: #F5EDE8 primary, #C9BBB4 body, #8A7B75 muted.
   - Fonts via next/font: Cormorant Garamond (light/regular serif) for headings,
     Inter for body. Map to font-serif / font-sans.
   - Pill buttons with a soft warm glow on hover (box-shadow halo in rgba(232,180,160,0.25));
     rounded cards (16px) that lift + glow on hover; thin-stroke line icons; airy luxury
     spacing. Feminine, premium, candle-lit-boutique-at-night — never clinical or cyber.
   - Add the color tokens to tailwind.config theme.extend.colors (base, surface, surface2,
     elevated, bordersub, rosegold, rosegoldhi, champagne, mauve, blush, textmain, textsub,
     textmuted) so later prompts can use semantic class names.
5. Mobile-responsive throughout.

Give me the file tree and the layout/header/footer code.
```

---

## PROMPT 2 — Product Data Model

```
Create the product catalog data layer.

1. Make /data/products.ts exporting a typed `Product[]`.
2. Each product has this shape:

type Variant = {
  label: string;          // e.g. "10mg / 3ML"
  price: number;
  variationId: number;    // REAL 99PP WooCommerce variation ID
  attributes?: Record<string, string>; // e.g. { size: "10mg" }
};

type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;          // /public path
  category: string;
  wooProductId: number;   // REAL 99PP parent product ID
  isVariable: boolean;
  price?: number;         // for simple products
  variants?: Variant[];   // for variable products
};

3. Seed it with these 8 products as PLACEHOLDER entries (I will replace the IDs and
   prices with verified live values):
   Tesamorelin, TB-500/BPC-157, Semax/Selank (simple product, wooProductId 819),
   Semaglutide, Retatrutide, PT-141, KLOW, GLOW.
   Mark the multi-variant ones isVariable:true with 2 sample variants each.
4. Add a helper getProductBySlug(slug) and getAllProducts().

Leave clear // TODO: VERIFY ID comments on every wooProductId and variationId.
```

---

## PROMPT 3 — Shop Grid + Product Detail

```
Build the storefront browsing experience.

1. /shop : responsive product grid. Each card shows image, name, short description,
   price (or "From $X" for variable products), and an "Add to Cart" button.
   - For variable products, the card's button links to the detail page (since a
     variant must be chosen) instead of adding directly.
   - For simple products, the button adds straight to the local cart.
2. /product/[slug] : full detail page with large image, name, long description,
   category, price, and:
   - For variable products: a variant selector (dropdown or buttons). Price updates
     with the selected variant. Add-to-Cart is disabled until a variant is chosen.
   - A quantity stepper.
   - An "Add to Cart" button that adds the chosen variant + quantity to the cart.
   - A research-use-only note.
3. Use next/image for images.

Don't wire the cart logic yet if the cart context isn't built — stub the add
function and tell me what the cart context needs to expose.
```

---

## PROMPT 4 — Local Cart (Context + localStorage)

```
Build the cart system.

1. Create a CartContext (React Context) that:
   - Stores cart items: each item = { slug, name, wooProductId, variationId?, attributes?,
     label, price, quantity, image }.
   - Exposes: addItem(item), removeItem(key), updateQuantity(key, qty), clearCart(),
     items, itemCount, subtotal.
   - Use a stable composite key per line (wooProductId + variationId) so the same
     variant stacks quantity instead of duplicating.
   - Persist the whole cart to localStorage and rehydrate on load. Guard against SSR
     (only touch localStorage in useEffect / client components).
2. Wrap the app in the provider.
3. Wire the header cart badge to itemCount.
4. Wire the Add-to-Cart buttons (shop cards + product detail) to addItem.
5. Build /cart page: list line items with image, name, variant label, qty stepper,
   remove button, line totals, and a subtotal. Show an empty state with a link to /shop.
6. Add a prominent "Proceed to Checkout on 99 Purity Peptides" button (logic in next
   prompt). For now it can be a disabled placeholder.

Show me the CartContext code and the /cart page.
```

---

## PROMPT 5 — THE CHECKOUT HAND-OFF (most important)

```
Implement the checkout redirect to the parent WooCommerce store. This is the core
feature — be precise.

Build a function buildCheckoutUrl(items, ref) that returns a URL to
https://99puritypeptides.com/cart/ which pre-fills the WooCommerce cart with every
local cart item, then attach the affiliate referral.

Requirements:
1. Base: https://99puritypeptides.com/cart/
2. Multi-product format using comma separation:
   ?add-to-cart=ID:QTY,ID:QTY,ID:QTY
   - For SIMPLE products use wooProductId:quantity.
   - For VARIABLE products, WooCommerce needs variation data. Support BOTH of these
     and make the format easy to switch via a config constant CHECKOUT_MODE:
       (a) "multi" mode: wooProductId:quantity in the comma list (works if the parent
           site has the multi-product plugin AND variations are handled there), and
       (b) "single-variation" fallback: if there is exactly one item, build the native
           WooCommerce variable URL:
           ?add-to-cart=PARENT_ID&variation_id=VAR_ID&quantity=QTY&attribute_<attr>=<val>
3. Append the affiliate ref. Use a config constant:
   const AFFILIATE_REF_PARAM = "ref";   // TODO: confirm exact param with 99PP plugin
   const AFFILIATE_REF_VALUE = "<SCARLETT_REF_CODE>";
   Append &{AFFILIATE_REF_PARAM}={AFFILIATE_REF_VALUE}.
4. URL-encode attribute values.
5. Wire the /cart "Proceed to Checkout" button to: build the URL, then
   window.location.href = url (full redirect, not router push).
6. Optionally clear the local cart after redirect (config flag CLEAR_CART_ON_CHECKOUT).

Put all tunable constants (base URL, ref param/value, checkout mode, separators) at
the top of one config file /lib/checkout.ts so I can adjust without hunting.

Show me /lib/checkout.ts and the wired button. Then give me 3 example output URLs:
one simple single product, one variable single product, and one mixed multi-item cart.
```

---

## PROMPT 6 — Homepage (`/`)

```
Build the Homepage. Keep all copy in editable constants so I can swap it. Boutique
medspa aesthetic. Build these sections top to bottom:

1. ANNOUNCEMENT BAR (slim, top): rotating/dismissible line.
   Content ideas: "Curated research peptides, verified ≥99% purity" /
   "Free 2-day shipping on orders over $300 (via 99 Purity Peptides)."

2. HERO: full-width, elegant. Headline + subhead + primary CTA "Shop the Collection"
   and secondary "Learn More". Background image or soft video.
   Content ideas:
   - Headline: "Elevated Wellness, Backed by Science"
   - Subhead: "A curated selection of high-purity research peptides, hand-picked by
     Scarlett Hawkins."

3. INTRO / BRAND PROMISE band: 2–3 sentences on who she is and why this collection
   exists, tying her medspa/aesthetics authority to the catalog.
   Content idea: "From the founder of Scarlett Hawkins Medspa — a personally curated
   line of research-grade peptides, chosen for purity and transparency."

4. FEATURED PRODUCTS strip: 3–4 best-sellers pulled from the catalog (cards with
   image, name, From-$price, Add to Cart / View). CTA "Shop All".
   Content idea: feature KLOW, GLOW, Retatrutide, Tesamorelin.

5. WHY CHOOSE THIS COLLECTION — 3 trust blocks with icons.
   Content ideas:
   - "≥99% Verified Purity — every compound HPLC + LC-MS tested."
   - "Full COA Transparency — certificates of analysis on every batch."
   - "Curated, Not Cluttered — only the compounds worth your attention."

6. SHOP BY CATEGORY (optional): 3–4 category tiles (Recovery, Metabolic, Cognitive,
   Cellular Health) linking to filtered shop views.

7. HOW IT WORKS — 3-step explainer of the cart hand-off, framed as a feature, not a
   limitation.
   Content ideas: "1. Browse & build your cart  2. Checkout securely on our trusted
   partner 99 Purity Peptides  3. Sign in, pay, and your order ships fast."

8. FOUNDER / SOCIAL-PROOF band: short quote or note from Scarlett + photo, or a
   testimonial placeholder.

9. NEWSLETTER signup (email only) — placeholder endpoint constant.
   Content idea: "Join the list for new compound drops and research updates."

10. FINAL CTA band: "Ready to explore the collection?" + Shop button.

Include the research-use-only disclaimer in the footer. Mobile-responsive.
```

---

## PROMPT 7 — About Page (`/about`)

```
Build the About page. Warm, personal, Charleston-boutique tone. Editable copy
constants. Sections:

1. PAGE HERO: title "About" + one-line tagline + portrait image placeholder.
   Content idea: "Beauty, wellness, and science — curated with intention."

2. FOUNDER STORY: 2–3 paragraphs on Scarlett Hawkins — her medspa background in
   downtown Charleston, her eye for quality, and why she extended into curating
   research peptides. Placeholder copy I can replace.

3. OUR PHILOSOPHY / VALUES: 3–4 value cards.
   Content ideas: "Purity First", "Radical Transparency", "Curated Selection",
   "Education Over Hype".

4. WHY THESE PRODUCTS: explain the partnership with 99 Purity Peptides — that orders
   are fulfilled by a vetted research-grade supplier with HPLC/LC-MS verification and
   full COAs. Builds trust and explains the checkout hand-off naturally.

5. THE STANDARDS band: short bullets — ≥99% purity, HPLC chromatograms, LC-MS identity
   confirmation, certificates of analysis, research-use-only positioning.

6. A NOTE ON RESEARCH USE: brief, tasteful compliance paragraph (not for human/
   veterinary use; research and laboratory purposes only).

7. CTA: "Explore the Collection" → /shop, and "Have questions?" → /contact.

Keep it elegant, not clinical.
```

---

## PROMPT 8 — FAQs Page (`/faqs`)

```
Build the FAQs page as a clean accordion, grouped into categories with editable
copy. Sections/questions:

ORDERING & CHECKOUT
- "How do I place an order?" — Build your cart here, then checkout completes on our
  partner site 99 Purity Peptides where you sign in and pay.
- "Why am I redirected to 99 Purity Peptides at checkout?" — They're our vetted
  fulfillment and payment partner; your cart carries over automatically.
- "Will my cart items transfer?" — Yes, your selected products and quantities are
  pre-loaded on their cart page.
- "Do I need an account?" — You'll sign in or register on 99 Purity Peptides to
  complete payment.

PAYMENT & SECURITY
- "Is payment secure?" — Payment is processed entirely on 99 Purity Peptides' secure
  checkout. This site never handles your card details.
- "What payment methods are accepted?" — Handled on the 99 Purity Peptides checkout.

SHIPPING & RETURNS
- "How fast is shipping?" — Orders typically ship within 24 hours; free 2-day shipping
  over $300. Link out to the 99 Purity Peptides shipping policy.
- "Do you ship internationally?" — Per the partner store's shipping policy (link out).
- "What's the return policy?" — Link out to the 99 Purity Peptides refund policy.

PRODUCTS & QUALITY
- "How is purity verified?" — ≥99% via reversed-phase HPLC, identity confirmed by
  LC-MS, with a certificate of analysis (COA) per batch.
- "What is a COA?" — A document detailing purity %, impurity profile, and test methods.
- "How should peptides be stored?" — Lyophilized at −20°C with desiccant; general
  guidance only.

USING THIS SITE
- "Are prices final?" — Final pricing is confirmed at checkout on 99 Purity Peptides.
- "What does Research Use Only mean?" — Products are for research and laboratory
  purposes only; not for human or veterinary use.

End with a "Still have questions?" block linking to /contact with email + phone.
Make it accordion-style, one open at a time, anchor-linkable, mobile-friendly.
```

---

## PROMPT 9 — Contact Page (`/contact`)

```
Build the Contact page. No backend — form posts to Formspree (FORM_ENDPOINT
constant). Sections:

1. PAGE HERO: "Get in Touch" + warm one-liner.
   Content idea: "Questions about a compound or your order? We're here to help."

2. CONTACT FORM: fields — Full Name, Email, Phone (optional), Subject/Reason
   (dropdown: General, Product question, Order help, Wholesale/Partnership), Message.
   Consent checkbox. Submit posts to FORM_ENDPOINT; show success + error states.
   NOTE: do NOT use an HTML <form> if this is a React artifact context — use onClick
   handlers; in a real Next.js app a normal form with fetch to Formspree is fine.

3. DIRECT CONTACT panel: email, phone, and a line directing order/payment issues to
   99 Purity Peptides support (orders@99puritypeptides.com / support@99puritypeptides.com).
   Content idea: "For existing order or payment questions, contact our fulfillment
   partner 99 Purity Peptides directly."

4. HOURS + LOCATION (optional): Charleston, SC reference; embedded map placeholder.

5. SOCIAL LINKS: Instagram, Facebook, TikTok placeholders (mirror the medspa's socials).

6. RESEARCH-USE-ONLY disclaimer line at the bottom.

Keep copy in editable constants.
```

---

## PROMPT 10 — Blog (`/blog` + `/blog/[slug]`)

```
Add a lightweight blog using MDX files in /content/blog (frontmatter: title, slug,
date, excerpt, coverImage, category, readingTime).

PAGES:
1. /blog (index):
   - Hero: "Research & Insights" + one-line subhead.
   - Optional featured/most-recent post highlight at top.
   - Category filter chips (e.g. Recovery, Metabolic, Cognitive, Guides).
   - Grid of post cards: cover image, category tag, title, excerpt, date, reading time.
   - Newest first. Newsletter signup band at the bottom.

2. /blog/[slug] (post):
   - Cover image + title + meta (date, category, reading time).
   - Clean reading layout (max-width prose, good typography).
   - Body rendered from MDX.
   - "Shop the products mentioned" CTA box linking to relevant catalog items.
   - Prev/next post links + back-to-blog link.
   - Research-use-only disclaimer in footer.

SAMPLE POSTS (create 3 so I can see layout + categories). Content ideas/titles:
   - "What 'Research Use Only' Actually Means" (Guides) — explains RUO, COAs, why it
     matters, how to read an HPLC chromatogram.
   - "Understanding the KLOW Blend: A Curated Recovery Stack" (Recovery) — overview of
     the four-component blend, links to the KLOW product.
   - "How to Read a Certificate of Analysis (COA)" (Guides) — purity %, impurity
     profile, LC-MS identity, what to look for.
   (Adapt from 99 Purity Peptides' existing research articles where appropriate;
   keep it educational, never medical advice.)

If MDX setup is heavy in App Router, propose the simplest reliable approach and
implement it.
```

---

## PROMPT 11 — Polish, Compliance, Deploy

```
Final pass.

1. Add a persistent but tasteful Research-Use-Only disclaimer (footer + a dismissible
   note on product pages). Mirror this language: "Products are offered for research and
   laboratory purposes only and are not intended to diagnose, treat, cure, or prevent
   any disease. Not for human or veterinary use."
2. SEO basics: per-page <title>/<meta description> via Next metadata, Open Graph tags,
   favicon, sitemap, robots.txt.
3. Accessibility + mobile QA pass (focus states, alt text, tap targets).
4. Add GA4 (or Plausible) with a placeholder ID, and track a "checkout_handoff" event
   when the user clicks Proceed to Checkout.
5. Give me a Vercel deploy checklist and the env vars / config constants I still need
   to fill in (AFFILIATE_REF_VALUE, FORM_ENDPOINT, analytics ID, verified product IDs).
6. Produce a short README explaining the cart hand-off mechanism and how to update the
   product catalog.
```

---

## PROMPT 12 — End-to-End Test Script

```
Write me a manual QA checklist to verify the cart hand-off works against the live
99 Purity Peptides store:

- Add a simple product, go to cart, click checkout, confirm it lands on the 99PP cart
  with the correct product + quantity.
- Repeat for a variable product, confirming the correct variation (size/price) appears.
- Add a multi-item cart and confirm ALL items + quantities arrive.
- Confirm the affiliate referral is attributed (a test order should credit the client).
- Note any WooCommerce settings that may need changing on 99PP (e.g. "redirect to cart
  after add to cart"), and what to do if variations don't carry over.
```

---

## Quick Reference — Values You Must Fill In

| Constant | Where | What |
|---|---|---|
| `wooProductId` / `variationId` | `/data/products.ts` | Real live IDs from 99PP |
| `AFFILIATE_REF_PARAM` | `/lib/checkout.ts` | The query key 99PP's affiliate plugin reads |
| `AFFILIATE_REF_VALUE` | `/lib/checkout.ts` | The client's referral code |
| `CHECKOUT_MODE` | `/lib/checkout.ts` | `"multi"` or `"single-variation"` |
| `FORM_ENDPOINT` | contact page | Formspree (or similar) endpoint |
| Analytics ID | layout | GA4 / Plausible |

Also confirm on the **99PP side**: multi-product add-to-cart enabled (plugin or snippet),
and which referral mechanism the affiliate plugin uses (query param vs. cookie).
