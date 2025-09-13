"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function CompareSlider({ before="/before.jpg", after="/after.jpg" }) {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(50); // 0~100 %

  function onMove(clientX) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPos(Math.round((x / rect.width) * 100));
  }

  return (
    <div
      ref={wrapRef}
      className="
        relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 select-none
        mx-auto md:max-w-5xl
      "
      style={{ aspectRatio: "16/9" }}  // 기본: 가로형(덜 큼)
      onMouseMove={(e) => e.buttons === 1 && onMove(e.clientX)}
      onMouseDown={(e) => onMove(e.clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
      onTouchStart={(e) => onMove(e.touches[0].clientX)}
    >
      {/* after(기준) */}
      <Image src={after} alt="after" fill className="object-cover" priority />
      {/* before(마스크) */}
      <div className="absolute inset-0" style={{ width: `${pos}%`, overflow: "hidden" }}>
        <Image src={before} alt="before" fill className="object-cover" />
      </div>

      {/* 핸들 */}
      <div className="absolute top-0 bottom-0" style={{ left: `calc(${pos}% - 1px)` }}>
        <div className="h-full w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs border">
          drag
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="aspect-ratio"] {
            aspect-ratio: 5 / 6; /* 모바일: 세로 느낌 조금 더 */
          }
        }
      `}</style>
    </div>
  );
}
