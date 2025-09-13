"use client";

import Image from "next/image";
import { useI18n } from "../components/LanguageProvider";
import CompareSlider from "../components/CompareSlider";
import AddToCartButton from "../components/AddToCartButton";
import { CATEGORIES, PRODUCTS } from "../data/products";

function MobileRow({ children }) {
  return <div className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory">{children}</div>;
}

export default function Home() {
  const { t } = useI18n();
  const best = PRODUCTS.filter(p => p.isBest);
  const news = PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* 카테고리 상단바 */}
      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-12 flex items-center gap-2 overflow-x-auto no-scrollbar text-sm">
          {CATEGORIES.map(c => (
            <a key={c.key} href={`/products?cat=${c.key}`} className="px-3 py-1.5 rounded-lg border border-neutral-200 whitespace-nowrap hover:bg-neutral-50">
              {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* HERO (세로) */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* 텍스트 */}
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

          {/* 이미지 (모바일 4/5, 데스크탑 3/4) */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-100">
            <div className="w-full md:hidden" style={{ aspectRatio: "4/5" }}>
              <Image src="/hero.jpg" alt="메인 히어로 모바일" fill className="object-cover" priority />
            </div>
            <div className="w-full hidden md:block" style={{ aspectRatio: "3/4" }}>
              <Image src="/hero.jpg" alt="메인 히어로 데스크탑" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER — 슬라이드 비교 (작게) */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 grid gap-6 items-center">
          <CompareSlider
            before="/before.jpg"
            after="/after.jpg"
            mobileMaxH={320}     // 모바일 최대 높이 (기본 360보다 더 작게)
            desktopMaxH={460}    // 데스크탑 최대 높이 (기본 520보다 작게)
            mobileAspect="3/4"   // 모바일 비율
            desktopAspect="16/7" // 데스크탑 비율(가로로 넓게)
            initial={55}
          />
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-2xl font-extrabold">일반핏 vs 미니멀즈핏</h3>
            <p className="mt-1 text-[13px] md:text-sm text-neutral-600">
              슬라이더를 좌우로 움직여 전/후를 비교해 보세요. 밑단 접힘 없이 깔끔한 기장, 길어 보이는 실루엣을 확인할 수 있어요.
            </p>
          </div>
        </div>
      </section>

      {/* BEST */}
      <section id="best" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-extrabold md:text-3xl">{t("sec_best")}</h2>
            <a href="/products?sort=best" className="text-sm underline underline-offset-4 hidden sm:inline-block">
              더 보기
            </a>
          </div>

          {/* 모바일 캐러셀 */}
          <div className="mt-5 md:hidden">
            <MobileRow>
              {best.map((p) => (
                <div key={p.slug} className="snap-start min-w-[72%] rounded-2xl border border-neutral-200 overflow-hidden">
                  <a href={`/products/${p.slug}`}>
                    <div className="aspect-[4/5] relative bg-neutral-100">
                      <Image src={p.img} alt={p.name} fill className="object-cover" />
                    </div>
                  </a>
                  <div className="p-3">
                    <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                    <div className="mt-0.5 font-semibold leading-tight text-[15px]">{p.name}</div>
                    <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a href={`/products/${p.slug}`} className="rounded-xl bg-black text-white py-2.5 text-[14px] font-semibold text-center hover:opacity-90">자세히</a>
                      <AddToCartButton product={p} label="담기" />
                    </div>
                  </div>
                </div>
              ))}
            </MobileRow>
          </div>

          {/* 데스크탑 그리드 */}
          <div className="mt-5 hidden md:grid grid-cols-3 gap-4 md:gap-6">
            {best.map((p) => (
              <div key={p.slug} className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm">
                <a href={`/products/${p.slug}`}>
                  <div className="aspect-[4/5] relative bg-neutral-100">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                  </div>
                </a>
                <div className="p-3">
                  <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                  <div className="font-semibold text-[15px]">{p.name}</div>
                  <div className="text-[13px] text-neutral-700">{p.price}</div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a href={`/products/${p.slug}`} className="rounded-xl bg-black text-white py-2.5 text-[14px] font-semibold text-center hover:opacity-90">자세히</a>
                    <AddToCartButton product={p} label="담기" />
                  </div>
                </div>
              </div>
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
              더 보기
            </a>
          </div>

          <div className="mt-5 md:hidden">
            <MobileRow>
              {news.map((p) => (
                <div key={p.slug} className="snap-start min-w-[72%] rounded-2xl border border-neutral-200 overflow-hidden">
                  <a href={`/products/${p.slug}`}>
                    <div className="aspect-[4/5] relative bg-neutral-100">
                      <Image src={p.img} alt={p.name} fill className="object-cover" />
                    </div>
                  </a>
                  <div className="p-3">
                    <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                    <div className="mt-0.5 font-semibold leading-tight text-[15px]">{p.name}</div>
                    <div className="mt-1 text-[13px] text-neutral-700">{p.price}</div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a href={`/products/${p.slug}`} className="rounded-xl bg-black text-white py-2.5 text-[14px] font-semibold text-center hover:opacity-90">자세히</a>
                      <AddToCartButton product={p} label="담기" />
                    </div>
                  </div>
                </div>
              ))}
            </MobileRow>
          </div>

          <div className="mt-5 hidden md:grid grid-cols-3 gap-4 md:gap-6">
            {news.map((p) => (
              <div key={p.slug} className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm">
                <a href={`/products/${p.slug}`}>
                  <div className="aspect-[4/5] relative bg-neutral-100">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                  </div>
                </a>
                <div className="p-3">
                  <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                  <div className="font-semibold text-[15px]">{p.name}</div>
                  <div className="text-[13px] text-neutral-700">{p.price}</div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a href={`/products/${p.slug}`} className="rounded-xl bg-black text-white py-2.5 text-[14px] font-semibold text-center hover:opacity-90">자세히</a>
                    <AddToCartButton product={p} label="담기" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a href="/products" className="sm:hidden mt-4 inline-flex justify-center w-full rounded-xl border border-neutral-300 py-3 text-[15px] font-semibold">
            더 보기
          </a>
        </div>
      </section>

      {/* SIZE GUIDE */}
      <section id="size" className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className="text-xl md:text-3xl font-extrabold">{t("sec_size")}</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { t1: "Fit 160", d: '총장 95cm · 허리 29~31" · 밑위 26cm' },
              { t1: "Fit 165", d: '총장 98cm · 허리 30~32" · 밑위 27cm' },
              { t1: "Fit 170", d: '총장 101cm · 허리 31~33" · 밑위 28cm' },
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
          <div className="grid grid-cols-3 text-center text-[12px]">
            <a href="#top" className="py-3 font-semibold">Home</a>
            <a href="/products" className="py-3">{t("nav_products")}</a>
            <a href="/cart" className="py-3 font-semibold">Cart</a>
          </div>
        </div>
      </nav>
    </div>
  );
}
