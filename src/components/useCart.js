"use client";

import { useEffect, useState } from "react";

const KEY = "cart";

export function useCart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  function add(item) {
    setItems((prev) => [...prev, item]);
  }
  function remove(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }
  function clear() {
    setItems([]);
  }

  const total = items.reduce((sum, it) => sum + (it.price || 0), 0);

  return { items, add, remove, clear, total };
}
