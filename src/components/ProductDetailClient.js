"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./useCart";

// 간단 슬라이더
function ProductGallery({ images }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-neutral-100">
      <div className="aspect-[4/5] relative">
        <Image src={images[idx]} alt={`product-${idx}`} fill className="object-cover" priority />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-white/80 backdrop-blur border"
            aria-label="prev"
          >‹</button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-white/80 backdrop-blur border"
            aria-label="next"
          >›</button>
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i===idx?"bg-white":"bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ColorSwatches({ colors, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => {
        const active = value?.key === c.key;
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onChange(c)}
            className={`inline-flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-sm ${active ? "border-black" : "border-neutral-300 hover:bg-neutral-50"}`}
            aria-pressed={active}
            title={c.name}
          >
            <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
            <span className="text-[13px]">{c.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function SizePicker({ sizes, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const active = value === s;
        return (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={`px-3 py-1.5 rounded-xl border text-sm ${active ? "border-black" : "border-neutral-300 hover:bg-neutral-50"}`}
            aria-pressed={active}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

export default function ProductDetailClient({ product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors?.[0] || null);
  const [size, setSize] = useState(product.sizes?.[0] || null);
  const [qty, setQty] = useState(1);

  const canBuy = color && size;

  function onAddCart() {
    if (!canBuy) return alert("색상과 사이즈를 선택해주세요.");
    add({
      slug: product.slug,
      name: product.name,
      price: product.price * qty,
      color,
      size,
      qty,
      category: product.category,
    });
    alert("장바구니에 담겼습니다.");
  }

  function onBuyNow() {
    if (!canBuy) return alert("색상과 사이즈를 선택해주세요.");
    add({
      slug: product.slug,
      name: product.name,
      price: product.price * qty,
      color,
      size,
      qty,
      category: product.category,
    });
    window.location.href = "/cart";
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-14">
      <a href="/products" className="text-sm underline underline-offset-4 text-neutral-600">← 목록으로</a>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* 갤러리 */}
        <ProductGallery images={product.images} />

        {/* 정보/옵션 */}
        <div>
          <div className="text-[11px] tracking-widest text-neutral-500">{product.tag}</div>
          <h1 className="mt-1 text-2xl md:text-3xl font-extrabold">{product.name}</h1>
          <div className="mt-1 text-lg">{product.price.toLocaleString()}원</div>

          <p className="mt-4 text-[14px] text-neutral-700">{product.desc}</p>

          {/* 색상 */}
          {product.colors?.length ? (
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">색상</div>
              <ColorSwatches colors={product.colors} value={color} onChange={setColor} />
            </div>
          ) : null}

          {/* 사이즈 */}
          {product.sizes?.length ? (
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">사이즈</div>
              <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
            </div>
          ) : null}

          {/* 수량 */}
          <div className="mt-6">
            <div className="text-sm font-semibold mb-2">수량</div>
            <div className="inline-flex items-center gap-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5 rounded-lg border">-</button>
              <div className="w-10 text-center">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1.5 rounded-lg border">+</button>
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              onClick={onAddCart}
              className="rounded-xl border border-neutral-300 py-3 font-semibold hover:bg-neutral-50"
            >
              장바구니
            </button>
            <button
              onClick={onBuyNow}
              className="rounded-xl bg-black text-white py-3 font-semibold hover:opacity-90"
            >
              바로구매
            </button>
          </div>

          {/* 상세/디테일/FAQ (간단 예시) */}
          <div className="mt-10 grid gap-4">
            <section className="rounded-2xl border p-4">
              <h2 className="font-semibold">상세 설명</h2>
              <p className="mt-2 text-sm text-neutral-700">{product.desc}</p>
            </section>

            <section className="rounded-2xl border p-4">
              <h2 className="font-semibold">디테일</h2>
              <ul className="mt-2 text-sm text-neutral-700 list-disc pl-5 space-y-1">
                {product.details?.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </section>

            <section className="rounded-2xl border p-4">
              <h2 className="font-semibold">FAQ</h2>
              <p className="mt-2 text-sm text-neutral-700">교환/반품/배송 안내는 추후 업데이트 예정입니다.</p>
            </section>
          </div>
        </div>
      </div>

      {/* 모바일 하단 고정바 */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 p-3 md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onAddCart}
            className="rounded-xl border border-neutral-300 py-3 font-semibold hover:bg-neutral-50"
          >
            장바구니
          </button>
        <button
            onClick={onBuyNow}
            className="rounded-xl bg-black text-white py-3 font-semibold hover:opacity-90"
          >
            바로구매
          </button>
        </div>
      </div>
    </main>
  );
}
