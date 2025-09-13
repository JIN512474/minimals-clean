"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");

  // 최초 진입 시 저장값 복원
  useEffect(() => {
    const fromStorage = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (fromStorage === "ko" || fromStorage === "en") {
      setLang(fromStorage);
    }
  }, []);

  // 변경 시 저장 + <html lang="">
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // 번역 훅(필요하면 사전 연결)
  const t = (key) => key;

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
