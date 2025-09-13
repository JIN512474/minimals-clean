"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }) {
  const [idx, setIdx] = useState(0);
  const cur = images[idx] || images[0];

  return (
    <div>
      <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-100" style={{ aspectRatio: "4/5" }}>
        {cur && <Image src={cur} alt={`image-${idx+1}`} fill className="object-cover" />}
      </div>
      <div className="mt-3 no-scrollbar flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIdx(i)}
            className={`relative h-20 w-16 rounded-lg overflow-hidden border ${i===idx? "border-black":"border-neutral-200"}`}
          >
            <Image src={src} alt={`thumb-${i+1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
