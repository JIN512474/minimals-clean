export const CATEGORIES = [
  { key: "bottoms", label: "Bottoms" },
  { key: "tops", label: "Tops" },
  { key: "outer", label: "Outer" },
  { key: "accessories", label: "Accessories" },
  { key: "shoes", label: "Shoes" },
];

/** 카드/상세 공통으로 쓰는 간단 카탈로그 */
export const PRODUCTS = [
  {
    slug: "denim-dark",
    name: "다크 인디고 데님",
    price: "₩59,000",
    tag: "Fit 165",
    category: "bottoms",
    img: "/products/denim-dark/01.jpg",
    images: ["/products/denim-dark/01.jpg", "/products/denim-dark/02.jpg"],
    colors: [
      { key: "indigo", name: "Indigo", hex: "#1d2733" }
    ],
    sizes: ["S", "M", "L"],
    isBest: true,
    details: "160~170cm 전용 기장/밑위 설계. 미니멀 워싱으로 어떤 룩에도 조화.",
  },
  {
    slug: "denim-black",
    name: "블랙 데님",
    price: "₩59,000",
    tag: "Fit 170",
    category: "bottoms",
    img: "/products/denim-black/01.jpg",
    images: [
      "/products/denim-black/01.jpg",
      "/products/denim-black/02.jpg",
      "/products/denim-black/03.jpg",
      "/products/denim-black/04.jpg",
      "/products/denim-black/05.jpg"
    ],
    colors: [
      { key: "black", name: "Black", hex: "#111111" },
      { key: "charcoal", name: "Charcoal", hex: "#2b2b2b" },
      { key: "faded", name: "Faded", hex: "#5a5a5a" }
    ],
    sizes: ["S", "M", "L"],
    isBest: true,
    details: "스트레이트 실루엣, 밑단 수선 없이 바로 입는 기장.",
  },
  {
    slug: "jacket-crop-black",
    name: "크롭 자켓 – 블랙",
    price: "₩89,000",
    tag: "OUTER",
    category: "outer",
    img: "/products/jacket-crop-black/01.jpg",
    images: ["/products/jacket-crop-black/01.jpg", "/products/jacket-crop-black/02.jpg"],
    colors: [{ key: "black", name: "Black", hex: "#111111" }],
    sizes: ["S", "M"],
    details: "비율 보정에 특화된 크롭 길이. 레이어링 용이.",
  },
];
