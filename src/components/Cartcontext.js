"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "minimals_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  function addItem(product, qty = 1, options = {}) {
    setItems((prev) => {
      const key = product.slug + "|" + (options.color || "") + "|" + (options.size || "");
      const i = prev.findIndex((p) => p.key === key);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { key, ...product, qty, ...options }];
    });
  }

  function removeItem(key) {
    setItems((prev) => prev.filter((p) => p.key !== key));
  }

  function updateQty(key, qty) {
    setItems((prev) =>
      prev.map((p) => (p.key === key ? { ...p, qty: Math.max(1, qty) } : p))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalCount = items.reduce((s, p) => s + p.qty, 0);
  const totalPrice = items.reduce((s, p) => {
    const num = Number(String(p.price).replace(/[^\d]/g, "")) || 0;
    return s + num * p.qty;
  }, 0);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clearCart, totalCount, totalPrice }),
    [items, totalCount, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
