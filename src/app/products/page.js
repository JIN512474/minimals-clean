"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useI18n } from "../../components/LanguageProvider";
import { CATEGORIES, PRODUCTS } from "../../data/products";
import AddToCartButton from "../../components/AddToCartButton";

export default function ProductsPage() {
  const { t } = useI18n();
  const sp = useSearchParams();
  const cat = (sp.get("cat") || "").toLowerCase();
  const sort = sp.get("sort") || "";
  const fit = sp.get("fit") || ""; // 카드 tag에 Fit 키워드가 들어감

  const list = useMemo(() => {
    let arr = PRODUCTS.slice();
    if (cat && CATEGORIES.some((c) => c.key === cat)) {
      arr = arr.filter((p) => p.category === cat);
    }
    if (fit) {
      arr = arr.filter((p) => (p.tag || "").toLowerCase().includes(fit.toLowerCase()));
    }
    if (sort === "best") {
      const order = ["denim-dark", "denim-black"];
      arr.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
    }
    return arr;
  }, [cat, sort, fit]);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* 상단바(간단) */}
      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-12 flex items-center gap-2 overflow-x-auto no-scrollbar text-sm">
          {CATEGORIES.map((c) => (
            <a
              key={c.key}
              href={`/products?cat=${c.key}`}
              className={`px-3 py-1.5 rounded-lg border whitespace-nowrap hover:bg-neutral-50 ${
                cat === c.key ? "border-black" : "border-neutral-200"
              }`}
            >
              {c.label}
            </a>
          ))}
          <a href="/products?sort=best" className="ml-auto text-sm underline underline-offset-4">Best</a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
        <h1 className="text-xl md:text-3xl font-extrabold">
          {t("products_title_all")}
          {cat ? ` · ${cat.toUpperCase()}` : ""}{fit ? ` · ${fit}` : ""}
        </h1>

        {(cat || fit) && (
          <div className="mt-3 text-sm">
            <a href="/products" className="underline underline-offset-4">{t("products_filter_reset")}</a>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {list.map((p) => (
            <a key={p.slug} href={`/products/${p.slug}`} className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm">
              <div className="aspect-[4/5] relative bg-neutral-100">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                <div className="font-semibold text-[15px]">{p.name}</div>
                <div className="text-[13px] text-neutral-700">{p.price}</div>
                <div className="mt-3">
                  <AddToCartButton product={p} label={t("add_to_cart")} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-8 text-sm text-neutral-500">{t("products_none")}</p>
        )}
      </div>
    </main>
  );
}
