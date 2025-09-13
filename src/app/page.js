"use client";

import Image from "next/image";
import { useI18n } from "../components/LanguageProvider";
import LangToggle from "../components/LangToggle";
import CompareSlider from "../components/CompareSlider";

/** 샘플 상품 (이미지는 /public 하위) */
const PRODUCTS = [
  {
    slug: "denim-dark",
    name: { ko: "데님 – 다크 인디고", en: "Denim – Dark Indigo" },
    price: "₩59,000",
    tag: "Fit 165",
    category: "bottoms",
    isBest: true,
    img: "/products/denim-dark/01.jpg",
  },
  {
    slug: "denim-black",
    name: { ko: "데님 – 블랙", en: "Denim – Black" },
    price: "₩59,000",
    tag: "Fit 170",
    category: "bottoms",
    isBest: true,
    img: "/products/denim-black/01.jpg",
  },
  {
    slug: "jacket-crop-black",
    name: { ko: "크롭 자켓 – 블랙", en: "Cropped Jacket – Black" },
    price: "₩79,000",
    tag: "OUTER",
    category: "outer",
    img: "/products/jacket-crop-black/01.jpg",
  },
  {
    slug: "tee-basic-white",
    name: { ko: "베이직 티셔츠 – 화이트", en: "Basic Tee – White" },
    price: "₩19,000",
    tag: "TOP",
    category: "tops",
    img: "/products/tee-basic-white/01.jpg",
  },
  {
    slug: "cap-minimals",
    name: { ko: "미니멀즈 캡", en: "Minimals Cap" },
    price: "₩29,000",
    tag: "ACC",
    category: "accessories",
    img: "/products/cap-minimals/01.jpg",
  },
  {
    slug: "loafers-black",
    name: { ko: "로퍼 – 블랙", en: "Loafers – Black" },
    price: "₩89,000",
    tag: "SHOES",
    category: "shoes",
    img: "/products/loafers-black/01.jpg",
  },
];

// 카테고리(영문 고정 상단바)
const CATEGORIES = [
  { key: "bottoms", label: "Bottoms" },
  { key: "tops", label: "Tops" },
  { key: "outer", label: "Outer" },
  { key: "accessories", label: "Accessories" },
  { key: "shoes", label: "Shoes" },
];

// 모바일 가로 스크롤 래퍼
function MobileRow({ children }) {
  return (
    <div className="-mx-4 px-4 overflow-x-auto no-scrollbar">
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

export default function Home() {
  const { lang } = useI18n();

  const best = PRODUCTS.filter((p) => p.isBest);
  const news = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* ============== HEADER ============== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-extrabold tracking-wide text-[18px]">MINIMALS</a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/products" className="hidden sm:inline-block px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
              {lang === "ko" ? "상품" : "Products"}
            </a>
            <a href="#size" className="hidden sm:inline-block px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
              {lang === "ko" ? "사이즈" : "Size"}
            </a>
            <a href="/products?sort=best" className="hidden sm:inline-block px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">
              {lang === "ko" ? "베스트" : "Best"}
            </a>
            <a
              href="https://smartstore.naver.com/내상점"
              className="px-3 py-1.5 rounded-lg bg-black text-white hover:opacity-90"
            >
              {lang === "ko" ? "구매" : "Buy"}
            </a>
            <LangToggle />
          </nav>
        </div>

        {/* 카테고리 바 (영문 고정) */}
        <div className="border-t border-neutral-200">
          <div className="mx-auto max-w-6xl px-4 h-12 flex items-center gap-2 overflow-x-auto no-scrollbar text-sm">
            {CATEGORIES.map((c) => (
              <a
                key={c.key}
                href={`/products?cat=${c.key}`}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 whitespace-nowrap hover:bg-neutral-50"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ============== HERO ============== */}
      <section className="relative border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[11px] tracking-widest text-neutral-500 font-medium">SMALL FRAME, BIG STYLE</p>
            <h1 className="mt-2 text-[26px] leading-[1.2] font-extrabold md:text-5xl">
              {lang === "ko" ? (
                <>비율이 완성되는 <span className="underline decoration-neutral-300">미니멀즈핏</span></>
              ) : (
                <>Perfect Proportion, <span className="underline decoration-neutral-300">Minimals Fit</span></>
              )}
            </h1>
            <p className="mt-3 text-[14px] text-neutral-600 md:text-base">
              {lang === "ko"
                ? "160~170cm 전용 설계. 수선 없이 바로 입는 완벽 비율."
                : "Designed for 160–170cm. Perfect proportion without tailoring."}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href="/products"
                className="rounded-2xl bg-black text-white px-5 py-3 text-base font-semibold text-center hover:opacity-90"
              >
                {lang === "ko" ? "상품 보기" : "See Products"}
              </a>
              <a
                href="#size"
                className="rounded-2xl border border-neutral-300 px-5 py-3 text-base font-semibold text-center hover:bg-neutral-50"
              >
                {lang === "ko" ? "사이즈" : "Size"}
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[12px] text-neutral-500">
              <span className="inline-flex items-center gap-2"><i className="w-2 h-2 rounded-full bg-black" /> 160·165·170</span>
              <span className="inline-flex items-center gap-2"><i className="w-2 h-2 rounded-full bg-black" /> {lang === "ko" ? "수선 없이 착용" : "No Hemming"}</span>
            </div>
          </div>

          <div className="grid gap-4 md:gap-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100">
              <Image src="/hero.jpg" alt="Hero" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 md:hidden">
              {/* 모바일에서는 이미지 1장 */}
              <Image src="/after.jpg" alt="After" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ============== BEST PRODUCTS ============== */}
      <section id="best" className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold md:text-3xl">{lang === "ko" ? "베스트" : "Best"}</h2>
            <a href="/products?sort=best" className="text-sm underline underline-offset-4 hidden sm:inline-block">
              {lang === "ko" ? "더 보기" : "View All"}
            </a>
          </div>

          {/* 모바일 가로 스크롤 */}
          <div className="mt-5 md:hidden">
            <MobileRow>
              {best.map((p) => (
                <a
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="min-w-[68%] rounded-2xl border border-neutral-200 overflow-hidden"
                >
                  <div className="relative aspect-[4/5] bg-neutral-100">
                    <Image src={p.img} alt={p.name[lang]} fill className="object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                    <div className="mt-0.5 font-semibold leading-tight text-[15px]">{p.name[lang]}</div>
                    <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
                    <div className="mt-3 w-full rounded-xl bg-black text-white py-3 text-[15px] font-semibold text-center">
                      {lang === "ko" ? "자세히 보기" : "View"}
                    </div>
                  </div>
                </a>
              ))}
            </MobileRow>
          </div>

          {/* 데스크톱 그리드 */}
          <div className="mt-6 hidden md:grid grid-cols-3 gap-6">
            {best.map((p) => (
              <a
                key={p.slug}
                href={`/products/${p.slug}`}
                className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm"
              >
                <div className="relative aspect-[4/5] bg-neutral-100">
                  <Image src={p.img} alt={p.name[lang]} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                  <div className="mt-0.5 font-semibold leading-tight text-[15px]">{p.name[lang]}</div>
                  <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
                  <div className="mt-3 w-full rounded-xl bg-black text-white py-3 text-[15px] font-semibold text-center">
                    {lang === "ko" ? "자세히 보기" : "View"}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============== NEW PRODUCTS ============== */}
      <section id="new" className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold md:text-3xl">{lang === "ko" ? "신상품" : "New"}</h2>
            <a href="/products" className="text-sm underline underline-offset-4 hidden sm:inline-block">
              {lang === "ko" ? "전체 보기" : "View All"}
            </a>
          </div>

          {/* 모바일 */}
          <div className="mt-5 md:hidden">
            <MobileRow>
              {news.map((p) => (
                <a
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="min-w-[68%] rounded-2xl border border-neutral-200 overflow-hidden"
                >
                  <div className="relative aspect-[4/5] bg-neutral-100">
                    <Image src={p.img} alt={p.name[lang]} fill className="object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                    <div className="mt-0.5 font-semibold leading-tight text-[15px]">{p.name[lang]}</div>
                    <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
                    <div className="mt-3 w-full rounded-xl border border-neutral-300 py-3 text-[15px] font-semibold text-center">
                      {lang === "코" ? "자세히 보기" : "View"}
                    </div>
                  </div>
                </a>
              ))}
            </MobileRow>
          </div>

          {/* 데스크톱 */}
          <div className="mt-6 hidden md:grid grid-cols-4 gap-6">
            {news.map((p) => (
              <a
                key={p.slug}
                href={`/products/${p.slug}`}
                className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm"
              >
                <div className="relative aspect-[4/5] bg-neutral-100">
                  <Image src={p.img} alt={p.name[lang]} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                  <div className="mt-0.5 font-semibold leading-tight text-[15px]">{p.name[lang]}</div>
                  <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
                </div>
              </a>
            ))}
          </div>

          <a
            href="/products"
            className="sm:hidden mt-4 inline-flex justify-center w-full rounded-xl border border-neutral-300 py-3 text-[15px] font-semibold"
          >
            {lang === "ko" ? "전체 상품 보기" : "View All"}
          </a>
        </div>
      </section>

      {/* ============== BEFORE / AFTER (슬라이드 비교) ============== */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14 grid gap-6 items-center">
          <div className="relative aspect-[4/5] md:aspect-[16/6]">
            <CompareSlider
              before="/before.jpg"
              after="/after.jpg"
              altBefore="일반핏"
              altAfter="미니멀즈핏"
              className="h-full w-full"
            />
          </div>
          <div>
            <h3 className="text-lg md:text-2xl font-extrabold">
              {lang === "ko" ? "일반핏 vs 미니멀즈핏" : "Regular vs Minimals Fit"}
            </h3>
            <p className="mt-1 text-[13px] md:text-sm text-neutral-600">
              {lang === "ko"
                ? "밑단 접힘 없이 깔끔한 기장, 길어 보이는 실루엣. 슬라이더로 직접 비교해 보세요."
                : "Clean length with no cuffing and a longer-looking silhouette. Drag the slider to compare."}
            </p>
          </div>
        </div>
      </section>

      {/* ============== SIZE GUIDE (홈 간단) ============== */}
      <section id="size" className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <h2 className="text-xl md:text-3xl font-extrabold">{lang === "ko" ? "사이즈 가이드" : "Size Guide"}</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { t: "Fit 160", d_ko: '총장 95cm · 허리 29~31" · 밑위 26cm', d_en: 'Length 95cm · Waist 29–31" · Rise 26cm' },
              { t: "Fit 165", d_ko: '총장 98cm · 허리 30~32" · 밑위 27cm', d_en: 'Length 98cm · Waist 30–32" · Rise 27cm' },
              { t: "Fit 170", d_ko: '총장 101cm · 허리 31~33" · 밑위 28cm', d_en: 'Length 101cm · Waist 31–33" · Rise 28cm' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-5">
                <div className="text-[11px] text-neutral-500">RECOMMENDED</div>
                <div className="mt-0.5 font-bold text-[16px]">{s.t}</div>
                <p className="mt-2 text-[13px] text-neutral-700">
                  {lang === "ko" ? s.d_ko : s.d_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 모바일 하단 탭 ============== */}
      <nav className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur border-t border-neutral-200 md:hidden">
        <div className="mx-auto max-w-6xl px-3">
          <div className="grid grid-cols-4 text-center text-[12px]">
            <a href="#top" className="py-3 font-semibold">{lang === "ко" ? "홈" : "Home"}</a>
            <a href="/products" className="py-3">{lang === "ко" ? "상품" : "Products"}</a>
            <a href="#size" className="py-3">{lang === "ко" ? "사이즈" : "Size"}</a>
            <a href="https://smartstore.naver.com/내상점" className="py-3 font-semibold text-white bg-black rounded-xl mx-2">
              {lang === "ко" ? "구매" : "Buy"}
            </a>
          </div>
        </div>
      </nav>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-500">
          © {new Date().getFullYear()} MINIMALS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
