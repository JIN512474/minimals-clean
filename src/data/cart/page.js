"use client";

import { useCart } from "../../components/useCart";

export default function CartPage() {
  const { items, remove, clear, total } = useCart();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-extrabold mb-6">장바구니</h1>

      {items.length === 0 ? (
        <p className="text-neutral-500">담긴 상품이 없습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((it, i) => (
              <li key={i} className="border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-neutral-500">{it.category?.toUpperCase()} · {it.color?.name} · {it.size}</div>
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-sm">{it.price?.toLocaleString()}원</div>
                </div>
                <button
                  onClick={() => remove(i)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-50 text-sm"
                >
                  제거
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-lg font-bold">합계: {total.toLocaleString()}원</div>
            <div className="flex gap-2">
              <button
                onClick={clear}
                className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50"
              >
                모두 비우기
              </button>
              <a
                href="https://smartstore.naver.com/내상점"
                className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
              >
                결제하기
              </a>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
