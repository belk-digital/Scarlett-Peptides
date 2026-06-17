import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CartClient from "./CartClient";

export const metadata: Metadata = buildMetadata({
  title: "Shopping Cart",
  description: "Review your selected research peptides before checkout.",
  path: "/cart",
  noIndex: true,
});

export default function Cart() {
  return <CartClient />;
}
