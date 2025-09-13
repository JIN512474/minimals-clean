"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LangContext = createContext(null);

const DICT = {
  // HERO
  hero_kicker: { ko: "SMALL FRAME, BIG STYLE", en: "SMALL FRAME, BIG STYLE" },
  hero_title: { ko: "비율이 완성되는 미니멀즈핏", en: "Perfect Proportion, Minimals Fit" },
  hero_desc: {
    ko: "160~170cm 전용 총장/밑위/밑단 설계. 수선 없이 입는 완벽 비율.",
    en: "Designed length/rise/hem for 160–170cm. Perfect proportion—no hemming.",
  },
  btn_products: { ko: "상품 보기", en: "See Products" },
  btn_size: { ko: "사이즈", en: "Size" },

  // NAV / FOOTER
  nav_products: { ko: "상품", en: "Products" },
  nav_size: { ko: "사이즈", en: "Size" },
  nav_cart: { ko: "장바구니", en: "Cart" },
  nav_buy: { ko: "구매", en: "Buy" },

  // 섹션 타이틀
  sec_why: { ko: "왜 미니멀즈핏인가요?", en: "Why Minimals Fit?" },
  sec_best: { ko: "베스트", en: "Best" },
  sec_new: { ko: "신상품", en: "New" },
  sec_size: { ko: "사이즈 가이드", en: "Size Guide" },
  view_more: { ko: "더 보기", en: "View More" },

  // WHY 카드
  why_1_t: { ko: "전용 기장 설계", en: "Tailored Length" },
  why_1_d: { ko: "160·165·170 총장으로 비율 최적화.", en: "160/165/170cm options for better proportion." },
  why_2_t: { ko: "밑위/허벅지 최적화", en: "Rise/Thigh Balance" },
  why_2_d: { ko: "앉아도 편안, 서면 더 길게.", en: "Comfort seated, longer lines standing." },
  why_3_t: { ko: "미니멀 워싱", en: "Minimal Wash" },
  why_3_d: { ko: "어떤 코디에도 어울리는 컬러.", en: "Clean tones for any look." },

  // SIZE 카드
  fit160: { ko: "Fit 160", en: "Fit 160" },
  fit165: { ko: "Fit 165", en: "Fit 165" },
  fit170: { ko: "Fit 170", en: "Fit 170" },
  fit160_d: { ko: '총장 95cm · 허리 29~31" · 밑위 26cm', en: 'Length 95cm · Waist 29–31" · Rise 26cm' },
  fit165_d: { ko: '총장 98cm · 허리 30~32" · 밑위 27cm', en: 'Length 98cm · Waist 30–32" · Rise 27cm' },
  fit170_d: { ko: '총장 101cm · 허리 31~33" · 밑위 28cm', en: 'Length 101cm · Waist 31–33" · Rise 28cm' },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    setLang(stored || "ko");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (k) => DICT[k]?.[lang] ?? "";
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
