"use client";

import { useRef, useState, useEffect } from "react";

export default function CompareSlider({
  before = "/before.jpg",
  after = "/after.jpg",
  altBefore = "Before",
  altAfter = "After",
  className = "",
}) {
  const wrapRef = useRef(null);
  const [pct, setPct] = useState(50);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let dragging = false;
    const getPct = (clientX) => {
      const rect = el.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      return Math.round((x / rect.width) * 100);
    };

    const onDown = (e) => {
      dragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPct(getPct(clientX));
    };
    const onMove = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPct(getPct(clientX));
    };
    const onUp = () => (dragging = false);

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative select-none overflow-hidden rounded-2xl bg-neutral-100 ${className}`}
      aria-label="Before/After Slider"
    >
      <img src={after} alt={altAfter} className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        aria-hidden="true"
      >
        <img src={before} alt={altBefore} className="h-full w-full object-cover" />
      </div>

      <div
        className="absolute inset-y-0 w-[2px] bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,.15)]"
        style={{ left: `calc(${pct}% - 1px)` }}
        aria-hidden="true"
      />
      <button
        type="button"
        aria-label="슬라이더 핸들"
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white/95 border border-black/10 shadow"
        style={{ left: `${pct}%` }}
      >
        <span className="sr-only">Drag</span>
      </button>

      <div className="absolute left-2 top-2 text-[12px] px-2 py-1 rounded bg-black/60 text-white">BEFORE</div>
      <div className="absolute right-2 top-2 text-[12px] px-2 py-1 rounded bg-black/60 text-white">AFTER</div>
    </div>
  );
}
