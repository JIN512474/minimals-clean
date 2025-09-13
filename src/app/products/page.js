"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ALL_PRODUCTS, CATEGORIES } from "../../data/products";
import { useI18n } from "../../components/LanguageProvider";

export default function ProductsPage() {
  const { t, lang } = useI18n();
  const searchParams = useSearchParams();
  const cat = (searchParams.get("cat") || "").toLowerCase();

  const list = useMemo(() => {
    if (!cat || !["tops","bottoms","outer","accessories","shoes"].includes(cat)) return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.category === cat);
  }, [cat]);

  const catLabel = CATEGORIES.find(c => c.key === cat)?.[lang] || (cat ? cat.toUpperCase() : "");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-14">
      <div className="flex items-end justify-between">
        <h1 className="text-xl md:text-3xl font-extrabold">
          {t("prod_all")} {cat ? `· ${catLabel}` : ""}
        </h1>
        <a href="/products" className="text-sm underline underline-offset-4 hidden sm:inline-block">
          {t("reset_filter")}
        </a>
      </div>

      {/* 모바일 보조 카테고리 바 */}
      <div className="mt-3 -mx-4 px-4 overflow-x-auto no-scrollbar sm:hidden">
        <div className="flex gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.key}
              href={`/products?cat=${c.key}`}
              className={`px-3 py-1.5 rounded-lg border whitespace-nowrap ${
                cat === c.key ? "border-black" : "border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {lang === "ko" ? c.ko : c.en}
            </a>
          ))}
          <a href="/products" className="px-3 py-1.5 rounded-lg border border-neutral-200 whitespace-nowrap">
            {t("reset_filter")}
          </a>
        </div>
      </div>

      {/* 목록 */}
      {list.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500">{t("prod_none")}</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {list.map((p) => (
            <a key={p.slug} href={`/products/${p.slug}`} className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm">
              <div className="relative aspect-[4/5] bg-neutral-100">
                <img
                  src={p.img}
                  alt={lang === "ko" ? p.name_ko : p.name_en}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                <div className="mt-0.5 font-semibold leading-tight text-[15px]">
                  {lang === "ko" ? p.name_ko : p.name_en}
                </div>
                <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
