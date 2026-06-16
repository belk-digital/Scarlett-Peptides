"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function HeaderCartIcon() {
  const { itemCount } = useCart();
  const [isBumping, setIsBumping] = useState(false);
  const prevCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 300);
      prevCount.current = itemCount;
      return () => clearTimeout(timer);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  return (
    <Link href="/cart" className="flex items-center gap-2 group w-full h-full">
      <motion.div
        animate={
          isBumping
            ? { scale: [1, 1.3, 1] }
            : itemCount > 0
            ? { scale: [1, 1.05, 1] }
            : { scale: 1 }
        }
        transition={
          isBumping
            ? { duration: 0.3, ease: "easeOut" }
            : itemCount > 0
            ? { repeat: Infinity, duration: 2, ease: "easeInOut" }
            : {}
        }
      >
        <ShoppingBag className="w-4 h-4 text-black" strokeWidth={1.5} />
      </motion.div>
      <span className="text-xs font-sans font-medium uppercase tracking-widest whitespace-nowrap">
        Cart {itemCount > 0 && `(${itemCount})`}
      </span>
    </Link>
  );
}
