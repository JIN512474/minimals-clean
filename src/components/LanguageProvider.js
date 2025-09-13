"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");

  useEffect(() => {
    const fromStorage = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (fromStorage === "ko" || fromStorage === "en") setLang(fromStorage);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (k) => k; // 필요 시 사전 연결

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
