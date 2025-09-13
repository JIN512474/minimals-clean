"use client";

import Image from "next/image";
import { useCart } from "../../components/CartContext";
import { useI18n } from "../../components/LanguageProvider";

function formatKRW(n) {
  try {
    return new Intl.NumberFormat("ko-KR").format(n);
  } catch {
    return String(n);
  }
}

export default function CartPage() {
  const { t } = useI18n();
  const { items, updateQty, removeItem, clearCart, totalCount, totalPrice } = useCart();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="text-2xl md:text-3xl font-extrabold">{t("cart_title")}</h1>

      {items.length === 0 ? (
        <p className="mt-6 text-neutral-600">{t("cart_empty")}</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 리스트 */}
            <div className="md:col-span-2 space-y-4">
              {items.map((p) => {
                const num = Number(String(p.price).replace(/[^\d]/g, "")) || 0;
                return (
                  <div key={p.slug} className="flex gap-4 rounded-2xl border border-neutral-200 p-3">
                    <div className="relative w-[92px] h-[115px] rounded-xl overflow-hidden bg-neutral-100">
                      <Image src={p.img} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-neutral-600">{p.price}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          className="w-7 h-7 rounded border"
                          onClick={() => updateQty(p.slug, p.qty - 1)}
                          aria-label="decrease"
                        >
                          -
                        </button>
                        <div className="px-2">{p.qty}</div>
                        <button
                          className="w-7 h-7 rounded border"
                          onClick={() => updateQty(p.slug, p.qty + 1)}
                          aria-label="increase"
                        >
                          +
                        </button>
                        <button
                          className="ml-3 text-sm underline underline-offset-4"
                          onClick={() => removeItem(p.slug)}
                        >
                          {t("cart_remove")}
                        </button>
                      </div>
                    </div>
                    <div className="min-w-[90px] text-right font-semibold">
                      ₩{formatKRW(num * p.qty)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 합계 */}
            <aside className="rounded-2xl border border-neutral-200 p-5 h-fit">
              <div className="flex justify-between text-sm">
                <span>{t("cart_items")}</span>
                <span>{totalCount}</span>
              </div>
              <div className="mt-2 flex justify-between text-base font-bold">
                <span>{t("cart_total")}</span>
                <span>₩{formatKRW(totalPrice)}</span>
              </div>
              <button
                className="mt-4 w-full rounded-xl bg-black text-white py-3 font-semibold disabled:opacity-50"
                disabled
                title="결제 연동 전 (아웃링크 제외)"
              >
                {t("cart_checkout")}
              </button>
              <button
                className="mt-2 w-full rounded-xl border border-neutral-300 py-3 font-semibold hover:bg-neutral-50"
                onClick={clearCart}
              >
                {t("cart_clear")}
              </button>
            </aside>
          </div>
        </>
      )}
    </main>
  );
}
