"use client";

import LangToggle from "./LangToggle";
import { useI18n } from "./LanguageProvider";
import { useCart } from "./CartContext";

export default function HeaderClient() {
  const { t } = useI18n();
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="font-extrabold tracking-wide text-[18px]">MINIMALS</a>
        <nav className="flex items-center gap-2 text-sm">
          <a href="/products" className="hidden sm:inline-block px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
            {t("nav_products")}
          </a>
          <a href="/#size" className="hidden sm:inline-block px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
            {t("nav_size")}
          </a>
          <a href="/cart" className="relative px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
            {t("nav_cart")}
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black text-white text-[11px] px-1">
                {totalCount}
              </span>
            )}
          </a>
          <LangToggle />
        </nav>
      </div>
    </header>
  );
}
