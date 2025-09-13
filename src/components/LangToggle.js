"use client";

import { useI18n } from "./LanguageProvider";

export default function LangToggle() {
  const { lang, setLang } = useI18n();
  const next = lang === "ko" ? "en" : "ko";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-sm"
      aria-label="언어 변경"
      title="언어 변경"
    >
      {lang === "ko" ? "한국어 · English" : "English · 한국어"}
    </button>
  );
}
