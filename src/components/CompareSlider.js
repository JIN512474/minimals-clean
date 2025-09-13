"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/**
 * 슬라이드 비교 컴포넌트 (Before/After)
 * - 크기 조절 props:
 *   mobileMaxH: 모바일 최대 높이(px) 기본 360
 *   desktopMaxH: 데스크탑 최대 높이(px) 기본 520
 *   mobileAspect: 모바일 비율 문자열 ex) "3/4"
 *   desktopAspect: 데스크탑 비율 문자열 ex) "16/7"
 */
export default function CompareSlider({
  before = "/before.jpg",
  after = "/after.jpg",
  mobileMaxH = 360,
  desktopMaxH = 520,
  mobileAspect = "3/4",
  desktopAspect = "16/7",
  initial = 55, // 시작 퍼센트
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState(initial); // %

  function onMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = (clientX - rect.left) / rect.width;
    setPos(Math.min(100, Math.max(0, x * 100)));
  }

  return (
    <div className="w-full">
      {/* 모바일용 (aspect + max-height) */}
      <div
        className="relative rounded-2xl overflow-hidden bg-neutral-100 select-none md:hidden"
        style={{ aspectRatio: mobileAspect, maxHeight: mobileMaxH }}
        ref={ref}
        onMouseMove={(e) => e.buttons === 1 && onMove(e)}
        onTouchMove={onMove}
      >
        {/* after (full) */}
        <Image src={after} alt="after" fill className="object-cover" priority />
        {/* before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <Image src={before} alt="before" fill className="object-cover" />
        </div>
        {/* handle */}
        <SliderHandle pos={pos} />
      </div>

      {/* 데스크탑용 */}
      <div
        className="relative rounded-2xl overflow-hidden bg-neutral-100 select-none hidden md:block"
        style={{ aspectRatio: desktopAspect, maxHeight: desktopMaxH }}
        ref={ref}
        onMouseMove={(e) => e.buttons === 1 && onMove(e)}
        onTouchMove={onMove}
      >
        <Image src={after} alt="after" fill className="object-cover" priority />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <Image src={before} alt="before" fill className="object-cover" />
        </div>
        <SliderHandle pos={pos} />
      </div>
    </div>
  );
}

function SliderHandle({ pos }) {
  return (
    <div className="absolute inset-y-0" style={{ left: `calc(${pos}% - 1px)` }}>
      <div className="w-0.5 h-full bg-white/80" />
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow border flex items-center justify-center text-xs">
        ⇆
      </div>
    </div>
  );
}
