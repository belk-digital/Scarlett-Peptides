import { CartItem } from "@/context/CartContext";

// --- CONFIGURATION CONSTANTS ---

// 1. Base URL for Cart
export const NEXTJS_BASE_URL = "http://localhost:3000/cart"; // Update this to production URL when deployed

// 2. Affiliate Referral Config
// Removed for now per request.


// 4. Cart Behavior
export const CLEAR_CART_ON_CHECKOUT = true;

// --- URL BUILDER FUNCTION ---

export function buildCheckoutUrl(items: CartItem[]): string {
  // Use production URL in production, local for testing
  const baseUrl = typeof window !== "undefined" && window.location.hostname === "localhost" 
    ? "http://localhost:3000/cart" 
    : "https://99puritypeptides.com/cart";

  if (items.length === 0) return baseUrl;

  const url = new URL(baseUrl);

  // Format: slug:sku:qty,slug:sku:qty
  const cartEntries: string[] = items.map(item => {
    return `${item.slug}:${item.sku}:${item.quantity}`;
  });

  url.searchParams.append("affiliate-cart", cartEntries.join(','));

  // Attempt to clear the WooCommerce cart before adding new items.
  // Note: This requires the parent WooCommerce site to have a snippet intercepting ?clear-cart=1
  if (CLEAR_CART_ON_CHECKOUT) {
    url.searchParams.append("clear-cart", "1");
    url.searchParams.append("empty-cart", "1"); // Adding both common parameters just in case
  }

  // --- ORIGIN TRACKING ---
  // Append explicit origin for custom snippets
  url.searchParams.append("origin", "peptides7");

  // Append standard UTM parameters for built-in WooCommerce Order Attribution and Analytics
  url.searchParams.append("utm_source", "peptides7");
  url.searchParams.append("utm_medium", "referral");
  url.searchParams.append("utm_campaign", "storefront");

  return url.toString();
}
