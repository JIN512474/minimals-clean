// src/app/page.js
import Image from "next/image";

const PRODUCTS = [
  { slug: "denim-dark",  name: "다크 인디고 데님", price: "₩59,000", tag: "Fit 165", category: "bottoms", img: "/products/denim-dark/01.jpg", isBest: true },
  { slug: "denim-black", name: "블랙 데님",         price: "₩59,000", tag: "Fit 170", category: "bottoms", img: "/products/denim-black/01.jpg", isBest: true },
  { slug: "jacket-crop-black", name: "크롭 자켓 – 블랙", price: "₩89,000", tag: "OUTER", category: "outer", img: "/products/jacket-crop-black/01.jpg" },
];

const CATEGORIES = [
  { key: "bottoms", label: "Bottoms" },
  { key: "tops", label: "Tops" },
  { key: "outer", label: "Outer" },
  { key: "accessories", label: "Accessories" },
  { key: "shoes", label: "Shoes" },
];

function MobileRow({ children }) {
  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory">
      {children}
    </div>
  );
}

export default function Home() {
  const best = PRODUCTS.filter(p => p.isBest);
  const news = PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-extrabold tracking-wide text-[18px]">MINIMALS</a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/products" className="hidden sm:inline-block px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">Products</a>
            <a href="#size" className="hidden sm:inline-block px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">Size</a>
            <a href="/cart" className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">Cart</a>
            <a href="https://smartstore.naver.com/내상점" className="px-3 py-1.5 rounded-lg bg-black text-white hover:opacity-90">Buy</a>
          </nav>
        </div>
        {/* 카테고리(영문 고정) */}
        <div className="border-t border-neutral-200">
          <div className="mx-auto max-w-6xl px-4 h-12 flex items-center gap-2 overflow-x-auto no-scrollbar text-sm">
            {CATEGORIES.map(c => (
              <a key={c.key} href={`/products?cat=${c.key}`} className="px-3 py-1.5 rounded-lg border border-neutral-200 whitespace-nowrap hover:bg-neutral-50">
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[11px] tracking-widest text-neutral-500 font-medium">SMALL FRAME, BIG STYLE</p>
            <h1 className="mt-2 text-[26px] leading-[1.2] font-extrabold md:text-5xl">
              비율이 완성되는 <span className="underline decoration-neutral-300">미니멀즈핏</span>
            </h1>
            <p className="mt-3 text-[14px] text-neutral-600 md:text-base">
              160~170cm 전용 총장/밑위/밑단 설계. 수선 없이 입는 완벽 비율.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href="/products" className="rounded-2xl bg-black text-white px-5 py-3 text-base font-semibold text-center hover:opacity-90">상품 보기</a>
              <a href="#size" className="rounded-2xl border border-neutral-300 px-5 py-3 text-base font-semibold text-center hover:bg-neutral-50">사이즈</a>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 md:aspect-[16/6]">
            <Image src="/hero.jpg" alt="메인 히어로" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <h2 className="text-xl font-extrabold md:text-3xl">왜 미니멀즈핏인가요?</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { t: "전용 기장 설계", d: "160·165·170 총장으로 비율 최적화." },
              { t: "밑위/허벅지 최적화", d: "앉아도 편안, 서면 더 길게." },
              { t: "미니멀 워싱", d: "어떤 코디에도 어울리는 컬러." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-5">
                <div className="text-[11px] text-neutral-500">FEATURE {i + 1}</div>
                <div className="mt-1 text-[16px] font-bold">{f.t}</div>
                <p className="mt-2 text-[13px] text-neutral-600">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST */}
      <section id="best" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold md:text-3xl">베스트</h2>
            <a href="/products?sort=best" className="text-sm underline underline-offset-4 hidden sm:inline-block">더 보기</a>
          </div>

          {/* 모바일 캐러셀 */}
          <div className="mt-5 md:hidden">
            <MobileRow>
              {best.map((p) => (
                <a key={p.slug} href={`/products/${p.slug}`} className="snap-start min-w-[72%] rounded-2xl border border-neutral-200 overflow-hidden">
                  <div className="aspect-[4/5] relative bg-neutral-100">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                    <div className="mt-0.5 font-semibold leading-tight text-[15px]">{p.name}</div>
                    <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
                    <div className="mt-3 w-full rounded-xl bg-black text-white py-3 text-[15px] font-semibold text-center">자세히 보기</div>
                  </div>
                </a>
              ))}
            </MobileRow>
          </div>

          {/* 데스크탑 그리드 */}
          <div className="mt-5 hidden md:grid grid-cols-3 gap-4 md:gap-6">
            {best.map((p) => (
              <a key={p.slug} href={`/products/${p.slug}`} className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm">
                <div className="aspect-[4/5] relative bg-neutral-100">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                  <div className="font-semibold text-[15px]">{p.name}</div>
                  <div className="text-[13px] text-neutral-700">{p.price}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEW */}
      <section id="products" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold md:text-3xl">신상품</h2>
            <a href="/products" className="text-sm underline underline-offset-4 hidden sm:inline-block">전체 보기</a>
          </div>

          <div className="mt-5 md:hidden">
            <MobileRow>
              {news.map((p) => (
                <a key={p.slug} href={`/products/${p.slug}`} className="snap-start min-w-[72%] rounded-2xl border border-neutral-200 overflow-hidden">
                  <div className="aspect-[4/5] relative bg-neutral-100">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                    <div className="mt-0.5 font-semibold leading-tight text-[15px]">{p.name}</div>
                    <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
                    <div className="mt-3 w-full rounded-xl bg-black text-white py-3 text-[15px] font-semibold text-center">자세히 보기</div>
                  </div>
                </a>
              ))}
            </MobileRow>
          </div>

          <div className="mt-5 hidden md:grid grid-cols-3 gap-4 md:gap-6">
            {news.map((p) => (
              <a key={p.slug} href={`/products/${p.slug}`} className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm">
                <div className="aspect-[4/5] relative bg-neutral-100">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                  <div className="font-semibold text-[15px]">{p.name}</div>
                  <div className="text-[13px] text-neutral-700">{p.price}</div>
                </div>
              </a>
            ))}
          </div>

          <a href="/products" className="sm:hidden mt-4 inline-flex justify-center w-full rounded-xl border border-neutral-300 py-3 text-[15px] font-semibold">전체 상품 보기</a>
        </div>
      </section>

      {/* SIZE GUIDE (홈 간단) */}
      <section id="size" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <h2 className="text-xl md:text-3xl font-extrabold">사이즈 가이드</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { t: "Fit 160", d: '총장 95cm · 허리 29~31" · 밑위 26cm' },
              { t: "Fit 165", d: '총장 98cm · 허리 30~32" · 밑위 27cm' },
              { t: "Fit 170", d: '총장 101cm · 허리 31~33" · 밑위 28cm' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-5">
                <div className="text-[11px] text-neutral-500">RECOMMENDED</div>
                <div className="mt-0.5 font-bold text-[16px]">{s.t}</div>
                <p className="mt-2 text-[13px] text-neutral-700">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 모바일 하단바 */}
      <nav className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
        <div className="mx-auto max-w-6xl px-3">
          <div className="grid grid-cols-4 text-center text-[12px]">
            <a href="#top" className="py-3 font-semibold">Home</a>
            <a href="/products" className="py-3">Products</a>
            <a href="#size" className="py-3">Size</a>
            <a href="https://smartstore.naver.com/내상점" className="py-3 font-semibold text-white bg-black rounded-xl mx-2">Buy</a>
          </div>
        </div>
      </nav>
    </div>
  );
}
