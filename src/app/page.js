"use client";

import Image from "next/image";
import { useI18n } from "../components/LanguageProvider";
import CompareSlider from "../components/CompareSlider";

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
  return <div className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory">{children}</div>;
}

export default function Home() {
  const { t } = useI18n();
  const best = PRODUCTS.filter(p => p.isBest);
  const news = PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* 카테고리 상단바 (영문 고정) */}
      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-12 flex items-center gap-2 overflow-x-auto no-scrollbar text-sm">
          {CATEGORIES.map(c => (
            <a key={c.key} href={`/products?cat=${c.key}`} className="px-3 py-1.5 rounded-lg border border-neutral-200 whitespace-nowrap hover:bg-neutral-50">
              {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* HERO (세로 버전: 모바일 4/5, 데스크탑 3/4) */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* 텍스트 영역 */}
          <div>
            <p className="text-[12px] md:text-[13px] tracking-widest text-neutral-500 font-medium">
              {t("hero_kicker")}
            </p>
            <h1 className="mt-2 text-[28px] md:text-[44px] leading-[1.15] font-extrabold">
              {t("hero_title")}
            </h1>
            <p className="mt-4 text-[14px] md:text-[16px] text-neutral-600">
              {t("hero_desc")}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href="/products"
                className="rounded-2xl bg-black text-white px-5 py-3 text-base font-semibold text-center hover:opacity-90"
              >
                {t("btn_products")}
              </a>
              <a
                href="#size"
                className="rounded-2xl border border-neutral-300 px-5 py-3 text-base font-semibold text-center hover:bg-neutral-50"
              >
                {t("btn_size")}
              </a>
            </div>
          </div>

          {/* 이미지 영역 (반응형 비율 분리) */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-100">
            {/* 모바일 4/5 */}
            <div className="w-full md:hidden" style={{ aspectRatio: "4/5" }}>
              <Image src="/hero.jpg" alt="메인 히어로 모바일" fill className="object-cover" priority />
            </div>
            {/* 데스크탑 3/4 */}
            <div className="w-full hidden md:block" style={{ aspectRatio: "3/4" }}>
              <Image src="/hero.jpg" alt="메인 히어로 데스크탑" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER (컴팩트) */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 grid gap-6 items-center">
          <CompareSlider before="/before.jpg" after="/after.jpg" />
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-2xl font-extrabold">일반핏 vs 미니멀즈핏</h3>
            <p className="mt-1 text-[13px] md:text-sm text-neutral-600">
              밑단 접힘 없이 깔끔한 기장, 길어 보이는 실루엣. 슬라이더로 전후를 비교해 보세요.
            </p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className="text-xl font-extrabold md:text-3xl">{t("sec_why")}</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { t1: t("why_1_t"), d: t("why_1_d") },
              { t1: t("why_2_t"), d: t("why_2_d") },
              { t1: t("why_3_t"), d: t("why_3_d") },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-5">
                <div className="text-[11px] text-neutral-500">FEATURE {i + 1}</div>
                <div className="mt-1 text-[16px] font-bold">{f.t1}</div>
                <p className="mt-2 text-[13px] text-neutral-600">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST */}
      <section id="best" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold md:text-3xl">{t("sec_best")}</h2>
            <a href="/products?sort=best" className="text-sm underline underline-offset-4 hidden sm:inline-block">
              {t("view_more")}
            </a>
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
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold md:text-3xl">{t("sec_new")}</h2>
            <a href="/products" className="text-sm underline underline-offset-4 hidden sm:inline-block">
              {t("view_more")}
            </a>
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

          <a href="/products" className="sm:hidden mt-4 inline-flex justify-center w-full rounded-xl border border-neutral-300 py-3 text-[15px] font-semibold">
            {t("view_more")}
          </a>
        </div>
      </section>

      {/* SIZE GUIDE */}
      <section id="size" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className="text-xl md:text-3xl font-extrabold">{t("sec_size")}</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { t1: t("fit160"), d: t("fit160_d") },
              { t1: t("fit165"), d: t("fit165_d") },
              { t1: t("fit170"), d: t("fit170_d") },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-5">
                <div className="text-[11px] text-neutral-500">RECOMMENDED</div>
                <div className="mt-0.5 font-bold text-[16px]">{s.t1}</div>
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
            <a href="#size" className="py-3">{t("nav_size")}</a>
            <a href="https://smartstore.naver.com/내상점" className="py-3 font-semibold text-white bg-black rounded-xl mx-2">
              {t("nav_buy")}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
