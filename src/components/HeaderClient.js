"use client";

import LangToggle from "./LangToggle";
import { useI18n } from "./LanguageProvider";

export default function HeaderClient() {
  const { t } = useI18n();

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
          <a href="/cart" className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
            {t("nav_cart")}
          </a>
          <a href="https://smartstore.naver.com/내상점" className="px-3 py-1.5 rounded-lg bg-black text-white hover:opacity-90">
            {t("nav_buy")}
          </a>
          <LangToggle />
        </nav>
      </div>
    </header>
  );
}
