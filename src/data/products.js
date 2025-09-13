// src/data/products.js
export const PRODUCTS = [
  {
    slug: "denim-dark",
    name: "다크 인디고 데님",
    price: 59000,
    tag: "Fit 165",
    category: "bottoms",
    images: ["/products/denim-dark/01.jpg", "/products/denim-dark/02.jpg"],
    colors: [
      { key: "indigo", name: "Indigo", hex: "#1d2733" },
      { key: "navy", name: "Navy", hex: "#0a2540" },
    ],
    sizes: ["S", "M", "L"],
    desc: "160~170 전용 기장/밑위/밑단 재설계. 수선 없이 입는 완벽 비율 데님.",
    details: ["코튼 100%", "논스트레치", "버튼 플라이"],
  },
  {
    slug: "denim-black",
    name: "블랙 데님",
    price: 59000,
    tag: "Fit 170",
    category: "bottoms",
    images: ["/products/denim-black/01.jpg", "/products/denim-black/02.jpg"],
    colors: [
      { key: "black", name: "Black", hex: "#111111" },
      { key: "charcoal", name: "Charcoal", hex: "#2b2b2b" },
      { key: "faded", name: "Faded", hex: "#5a5a5a" },
    ],
    sizes: ["S", "M", "L"],
    desc: "스트레이트 실루엣의 블랙 데님. 무엇과도 잘 어울리는 미니멀 워싱.",
    details: ["코튼 100%", "지퍼 플라이", "세미 하이라이즈"],
  },
  {
    slug: "jacket-crop-black",
    name: "크롭 자켓 – 블랙",
    price: 89000,
    tag: "OUTER",
    category: "outer",
    images: ["/products/jacket-crop-black/01.jpg"],
    colors: [{ key: "black", name: "Black", hex: "#111111" }],
    sizes: ["S", "M", "L"],
    desc: "비율이 좋아 보이는 크롭 기장. 셔츠/티 모두와 매칭 우수.",
    details: ["폴리 혼방", "안감 있음", "드라이 클리닝 권장"],
  },
  {
    slug: "tee-basic-white",
    name: "베이직 티셔츠 – 화이트",
    price: 19000,
    tag: "TOP",
    category: "tops",
    images: ["/products/tee-basic-white/01.jpg"],
    colors: [{ key: "white", name: "White", hex: "#ffffff" }],
    sizes: ["S", "M", "L"],
    desc: "적당한 두께감의 베이직 티. 단품/이너 모두 추천.",
    details: ["코튼 100%", "세탁기 사용 가능", "리브 넥"],
  },
];

export function getAll() {
  return PRODUCTS;
}

export function findBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}
