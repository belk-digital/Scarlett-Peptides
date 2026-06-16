import { CartItem } from "@/context/CartContext";

// --- CONFIGURATION CONSTANTS ---

// 1. Base URL for WooCommerce Cart
export const WOO_BASE_URL = "https://99puritypeptides.com/cart/";

// 2. Checkout Mode
// "multi" uses comma-separated ?add-to-cart=ID:QTY
// "single-variation" uses native Woo fallback for exactly 1 variable item
export type CheckoutMode = "multi" | "single-variation";
export const CHECKOUT_MODE: CheckoutMode = "single-variation";

// 3. Affiliate Referral Config
// Removed for now per request.


// 4. Cart Behavior
export const CLEAR_CART_ON_CHECKOUT = true;

// --- URL BUILDER FUNCTION ---

export function buildCheckoutUrl(items: CartItem[]): string {
  if (items.length === 0) return WOO_BASE_URL;

  const url = new URL(WOO_BASE_URL);

  if (items.length === 1) {
    // Single item native Add-to-Cart
    const item = items[0];
    const id = item?.variationId || item?.wooProductId;
    const qty = item?.quantity || 1;
    
    if (id) {
      url.searchParams.append("add-to-cart", id.toString());
      url.searchParams.append("quantity", qty.toString());
    }
  } else {
    // Multi-product format: ?add-to-cart=ID:QTY,ID:QTY
    const cartString = items.map(item => {
      const id = item?.variationId || item?.wooProductId || "";
      const qty = item?.quantity || 1;
      return `${id}:${qty}`;
    }).filter(str => str && !str.startsWith(':')).join(',');

    url.searchParams.append("add-to-cart", cartString);
  }

  // Attempt to clear the WooCommerce cart before adding new items.
  // Note: This requires the parent WooCommerce site to have a snippet intercepting ?clear-cart=1
  if (CLEAR_CART_ON_CHECKOUT) {
    url.searchParams.append("clear-cart", "1");
    url.searchParams.append("empty-cart", "1"); // Adding both common parameters just in case
  }

  // --- ORIGIN TRACKING ---
  // Append explicit origin for custom snippets
  url.searchParams.append("origin", "scarlett");
  
  // Append standard UTM parameters for built-in WooCommerce Order Attribution and Analytics
  url.searchParams.append("utm_source", "scarlett_peptides");
  url.searchParams.append("utm_medium", "referral");
  url.searchParams.append("utm_campaign", "storefront");

  return url.toString();
}
