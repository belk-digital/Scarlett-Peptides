# Scarlett Hawkins Affiliate Store — Design System

**Theme:** Dark, luxury, feminine — boutique medspa elegance translated to a dark UI.
**Reference brand:** `scarletthawkinsmedspa.com` (Charleston, SC boutique medspa — soft, premium, feminine, Instagram-forward).
**Goal:** A dark website with glowing highlight accents that feels refined, warm, and welcoming to a female audience — *not* clinical, not "tech-dark," not the scientific look of the parent 99PP site.
**Last updated:** June 16, 2026

---

## 1. Design Direction (Read First)

The medspa brand is light, airy, and feminine. The client wants this affiliate store to be **dark with highlighting elements**. The trick is to keep the *spirit* of the medspa — softness, luxury, femininity — while inverting the canvas to dark.

We achieve "feminine + dark + premium" through:

- **Warm dark base** (charcoal/espresso with a faint rose undertone), never cold pure black or blue-grey.
- **Soft metallic + blush highlights** (rose gold, champagne, muted mauve-pink) that glow against the dark.
- **Elegant serif display type** paired with a clean, light sans body.
- **Generous whitespace, soft rounded corners, gentle glows** instead of hard tech edges.
- **Subtle gradients and a faint grain/noise** to avoid flat, harsh darkness.

Think: *a candle-lit luxury boutique at night*, not a developer dashboard.

---

## 2. Color Palette

### 2.1 Core dark base (warm, not cold)

| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#1A1416` | Page background (warm espresso-charcoal) |
| `--bg-surface` | `#221A1D` | Cards, sections, raised surfaces |
| `--bg-surface-2` | `#2C2226` | Hover states, nested surfaces |
| `--bg-elevated` | `#332A2E` | Modals, dropdowns, drawers |
| `--border-subtle` | `#3A2F33` | Hairline borders, dividers |

> Note the faint warm/rose undertone in every dark value — this is what keeps it feminine instead of corporate.

### 2.2 Highlight / accent (the "glow")

| Token | Hex | Use |
|---|---|---|
| `--accent-rosegold` | `#E8B4A0` | Primary accent — buttons, links, active states |
| `--accent-rosegold-bright` | `#F4C9B8` | Hover / glow highlight |
| `--accent-champagne` | `#E6CBA8` | Secondary accent, premium tags, "From $" labels |
| `--accent-mauve` | `#C98BA6` | Tertiary accent, category tags, feminine pop |
| `--accent-blush-soft` | `#D9A5A5` | Soft fills, badges |

### 2.3 Text

| Token | Hex | Use |
|---|---|---|
| `--text-primary` | `#F5EDE8` | Headings, primary copy (warm off-white) |
| `--text-secondary` | `#C9BBB4` | Body, descriptions |
| `--text-muted` | `#8A7B75` | Captions, meta, disclaimers |
| `--text-on-accent` | `#1A1416` | Text on rose-gold buttons (dark for contrast) |

### 2.4 Functional

| Token | Hex | Use |
|---|---|---|
| `--success` | `#9FD0A8` | Cart added, form success |
| `--error` | `#E39595` | Form errors |
| `--cart-badge` | `--accent-mauve` | Cart count badge |

### 2.5 Gradients & glows

- **Hero overlay:** `linear-gradient(180deg, rgba(26,20,22,0) 0%, rgba(26,20,22,0.85) 100%)` over imagery so text stays legible.
- **Accent glow (CTAs, featured cards):** soft `box-shadow: 0 0 32px rgba(232,180,160,0.25)` — a warm halo, used sparingly.
- **Section accent band:** `linear-gradient(135deg, #2C2226 0%, #332A2E 100%)` with a faint mauve edge light.
- **Rose-gold gradient (premium accents/dividers):** `linear-gradient(90deg, #E8B4A0, #E6CBA8, #C98BA6)`.

> Accessibility: always verify `--text-primary` / `--text-secondary` on dark surfaces meet WCAG AA (4.5:1). Rose-gold buttons use **dark** text, not white.

---

## 3. Typography

Pairing: an elegant high-contrast serif for display, a clean humanist sans for everything else — mirrors the boutique-luxury feel.

| Role | Font | Notes |
|---|---|---|
| Display / H1–H2 | **Cormorant Garamond** (or Playfair Display) | Elegant serif, light/medium weight, generous letter-spacing on hero |
| Subheads / H3–H4 | Same serif, medium | Or switch to the sans for a cleaner hierarchy |
| Body / UI | **Inter** (or Mont, Jost, or Figtree) | Light–regular weight, comfortable line-height (1.6–1.7) |
| Accent label / eyebrow | Sans, uppercase, letter-spaced | Small "WHY CHOOSE US" style eyebrows above section titles, in `--accent-champagne` |

Scale (desktop, fluid down on mobile):
- H1 hero: 56–72px, serif, weight 300–400, line-height 1.1
- H2 section: 36–44px, serif
- H3: 24–28px
- Body: 16–18px sans
- Eyebrow/label: 12–13px, uppercase, +0.15em tracking
- Caption/meta: 13–14px, `--text-muted`

Use **light serif weights** for that delicate, feminine elegance — avoid heavy bold serifs.

---

## 4. Feminine Aesthetic Elements

Use these to signal femininity without being heavy-handed:

- **Soft rounded corners:** 12–20px radius on cards, 9999px (pill) on buttons and tags.
- **Thin elegant dividers:** 1px rose-gold gradient lines or small ornamental separators (a centered dot/diamond flanked by thin lines).
- **Botanical / organic accents:** faint line-art florals, leaves, or abstract soft blobs as section backgrounds at low opacity (5–10%) in rose-gold.
- **Glow halos** behind featured products and CTAs (warm, soft, blurred).
- **Delicate iconography:** thin-stroke (1.5px) line icons, rounded caps — never chunky filled icons.
- **Imagery treatment:** warm-toned, soft-focus, premium lifestyle/product photography; apply a subtle warm duotone or dark gradient so images blend into the dark canvas.
- **Micro-motion:** gentle fade-ups on scroll, slow shimmer on the rose-gold gradient, soft hover lift on cards (translateY -4px + glow). Keep it calm and elegant, not bouncy.
- **Generous spacing:** airy section padding (96–128px desktop) — luxury reads as "room to breathe."

---

## 5. Component Styling

### Buttons
- **Primary:** rose-gold fill (`--accent-rosegold`), dark text, pill shape, soft glow on hover (`--accent-rosegold-bright` + halo).
- **Secondary:** transparent with 1px rose-gold border, rose-gold text; fills softly on hover.
- **Tertiary / text link:** champagne text with an animated thin underline.

### Cards (product & content)
- `--bg-surface`, 16px radius, 1px `--border-subtle`.
- Hover: lift + warm glow + border shifts to rose-gold.
- Featured cards: faint rose-gold gradient border or glow halo.

### Product cards specifically
- Image top (rounded), category tag (mauve pill, top-left over image), name (serif), price/"From $X" in champagne, pill "Add to Cart" / "View" button.

### Header / nav
- Sticky, translucent dark (`rgba(26,20,22,0.8)` + backdrop blur), thin bottom border.
- Logo left, nav center/right in light sans, cart icon with mauve count badge.
- Mobile: elegant slide-in drawer, dark, with the same accents.

### Footer
- Darkest surface, rose-gold gradient hairline at top, columns of links in `--text-secondary`, socials as thin-line icons, RUO disclaimer in `--text-muted`.

### Forms
- Dark inputs (`--bg-surface-2`), 1px subtle border, rose-gold focus ring + faint glow, pill submit button, inline success/error in functional colors.

### Accordion (FAQ)
- Dark surface rows, rose-gold "+"/"–" indicator, smooth expand, champagne question text.

### Tags / badges
- Pills; categories in mauve, "premium"/"verified" in champagne, sale in soft blush.

---

## 6. Imagery & Iconography

- **Photography:** warm, soft, premium — product shots on dark/moody backgrounds, plus aspirational lifestyle imagery that fits a female wellness audience. Apply a subtle dark gradient/duotone for cohesion.
- **Icons:** thin-stroke line set (Lucide / Phosphor "thin"), rose-gold or champagne on dark.
- **Backgrounds:** faint botanical line-art or soft gradient blobs at low opacity; optional very subtle grain to soften flat dark areas.
- **Logo:** if a dark-mode/light version of the Scarlett Hawkins mark exists, use it; otherwise present the wordmark in warm off-white with a rose-gold accent.

---

## 7. Page-Level Mood Notes

- **Homepage:** cinematic dark hero with a soft-focus warm image, glowing rose-gold CTA, generous spacing; featured products float on the dark with gentle halos.
- **Shop:** calm dark grid, lots of breathing room, mauve category chips for filtering.
- **Product detail:** large moody product image left, elegant serif name, champagne price, variant pills, glowing Add-to-Cart.
- **About:** warm and personal — founder portrait with a soft rose-gold frame/glow, serif headings, intimate tone.
- **FAQ:** quiet, readable dark accordion.
- **Blog:** editorial — large serif titles, comfortable prose width, warm imagery.
- **Cart:** clear, calm, with a prominent glowing "Proceed to Checkout on 99 Purity Peptides" button.

---

## 8. Tailwind Token Mapping (for the build)

Add to `tailwind.config` `theme.extend.colors` so prompts can reference semantic names:

```js
colors: {
  base:        '#1A1416',
  surface:     '#221A1D',
  surface2:    '#2C2226',
  elevated:    '#332A2E',
  bordersub:   '#3A2F33',
  rosegold:    '#E8B4A0',
  rosegoldhi:  '#F4C9B8',
  champagne:   '#E6CBA8',
  mauve:       '#C98BA6',
  blush:       '#D9A5A5',
  textmain:    '#F5EDE8',
  textsub:     '#C9BBB4',
  textmuted:   '#8A7B75',
}
```

Fonts: load **Cormorant Garamond** (display) + **Inter** (body) via `next/font`. Map to `font-serif` / `font-sans`.

Global defaults: `bg-base text-textsub`, headings `font-serif text-textmain`, links `text-rosegold hover:text-rosegoldhi`.

---

## 9. Do / Don't

**Do:** warm darks, soft rose-gold glows, elegant light serifs, airy spacing, delicate thin icons, gentle motion, feminine organic accents.

**Don't:** pure black `#000`, cold blue-grey darks, neon/cyber accents, heavy bold fonts, harsh shadows, cramped layouts, the clinical lab aesthetic of the parent 99PP site.

---

## 10. Hand-off Note for Antigravity

When building, reference this file alongside the prompts. Add a short **Prompt 1.5 / design directive** before building pages:

> "Apply the DESIGN.md system: warm dark base (#1A1416) with rose-gold (#E8B4A0), champagne (#E6CBA8), and mauve (#C98BA6) highlights; Cormorant Garamond serif headings + Inter body; pill buttons with soft glow; rounded cards with hover lift + warm halo; thin-line icons; airy luxury spacing; feminine organic accents. Dark, premium, feminine — never clinical or cyber."
