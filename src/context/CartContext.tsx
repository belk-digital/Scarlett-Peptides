"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  key: string;            // wooProductId-variationId
  slug: string;
  name: string;
  sku: string;
  attributes?: Record<string, string>;
  label?: string;
  price: number;
  quantity: number;
  image: string;
};

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Rehydrate from localStorage
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("peptides7_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("peptides7_cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const generateKey = (sku: string) => {
    return sku;
  };

  const addItem = (item: Omit<CartItem, "key">) => {
    setItems((prevItems) => {
      const key = generateKey(item.sku);
      const existingItem = prevItems.find((i) => i.key === key);

      if (existingItem) {
        return prevItems.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, { ...item, key }];
      }
    });
  };

  const removeItem = (key: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.key !== key));
  };

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(key);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) => (i.key === key ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: isMounted ? items : [],
        itemCount: isMounted ? itemCount : 0,
        subtotal: isMounted ? subtotal : 0,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
