"use client";

import { useCart } from "./CartContext";

export default function AddToCartButton({ product, options = {}, label = "장바구니 담기" }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, 1, options);
      }}
      className="w-full rounded-xl border border-neutral-300 py-2.5 text-[14px] font-semibold hover:bg-neutral-50"
    >
      {label}
    </button>
  );
}
