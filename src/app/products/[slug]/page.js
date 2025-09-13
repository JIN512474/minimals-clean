"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useI18n } from "../../../components/LanguageProvider";
import { PRODUCTS } from "../../../data/products";
import ProductGallery from "../../../components/ProductGallery";
import AddToCartButton from "../../../components/AddToCartButton";

export default function ProductDetail({ params }) {
  const { slug } = params || {};
  const { t } = useI18n();

  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);
  const [color, setColor] = useState(product?.colors?.[0]?.key || "");
  const [size, setSize] = useState(product?.sizes?.[0] || "");

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p>상품을 찾을 수 없습니다.</p>
        <a href="/products" className="underline underline-offset-4 mt-3 inline-block">{t("back_to_list")}</a>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <a href="/products" className="text-sm underline underline-offset-4">{t("back_to_list")}</a>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 갤러리 */}
        <ProductGallery images={product.images?.length ? product.images : [product.img]} />

        {/* 정보/옵션 */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">{product.name}</h1>
          <div className="mt-1 text-neutral-700">{product.price}</div>
          <div className="mt-1 text-[11px] tracking-widest text-neutral-500">{product.tag}</div>

          {/* 색상 */}
          {product.colors?.length ? (
            <div className="mt-5">
              <div className="text-sm font-semibold">{t("color_label")}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => {
                  const active = c.key === color;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setColor(c.key)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-sm
                        ${active ? "border-black" : "border-neutral-300 hover:bg-neutral-50"}`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[13px]">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* 사이즈 */}
          {product.sizes?.length ? (
            <div className="mt-5">
              <div className="text-sm font-semibold">{t("size_label")}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const active = s === size;
                  return (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-xl border px-3 py-1.5 text-sm ${
                        active ? "border-black" : "border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* 담기 */}
          <div className="mt-6">
            <AddToCartButton
              product={{
                slug: product.slug,
                name: product.name,
                price: product.price,
                img: product.img,
              }}
              options={{ color, size }}
              label={t("add_to_cart")}
            />
          </div>

          {/* 상세 */}
          <div className="mt-8">
            <h2 className="text-lg font-bold">{t("details")}</h2>
            <p className="mt-2 text-sm text-neutral-700">{product.details || "-"}</p>
          </div>

          {/* 디테일 컷 (갤러리 아래 별도 섹션) */}
          {product.images?.length ? (
            <div className="mt-8">
              <h2 className="text-lg font-bold">{t("cuts")}</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {product.images.slice(0, 6).map((src, i) => (
                  <div key={src} className="relative w-full rounded-xl overflow-hidden bg-neutral-100" style={{ aspectRatio: "4/5" }}>
                    <Image src={src} alt={`detail-${i+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
