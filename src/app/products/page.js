import Image from "next/image";
import { getAll } from "../../data/products";

const CATEGORIES = [
  { key: "bottoms", label: "Bottoms" },
  { key: "tops", label: "Tops" },
  { key: "outer", label: "Outer" },
  { key: "accessories", label: "Accessories" },
  { key: "shoes", label: "Shoes" },
];

export default function ProductsPage({ searchParams }) {
  const cat = (searchParams?.cat || "").toLowerCase();
  const fit = searchParams?.fit || "";
  const sort = searchParams?.sort || "";
  let list = getAll().slice();

  if (cat && ["bottoms", "tops", "outer", "accessories", "shoes"].includes(cat)) {
    list = list.filter((p) => p.category === cat);
  }
  if (fit) {
    list = list.filter((p) => (p.tag || "").toLowerCase().includes(fit.toLowerCase()));
  }
  if (sort === "best") {
    const order = ["denim-dark", "denim-black"];
    list.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-extrabold tracking-wide text-[18px]">MINIMALS</a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/products" className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">Products</a>
            <a href="/#size" className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">Size</a>
            <a href="/cart" className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">Cart</a>
            <a href="https://smartstore.naver.com/내상점" className="px-3 py-1.5 rounded-lg bg-black text-white hover:opacity-90">Buy</a>
          </nav>
        </div>
        <div className="border-t border-neutral-200">
          <div className="mx-auto max-w-6xl px-4 h-12 flex items-center gap-2 overflow-x-auto no-scrollbar text-sm">
            {CATEGORIES.map((c) => (
              <a
                key={c.key}
                href={`/products?cat=${c.key}`}
                className={`px-3 py-1.5 rounded-lg border whitespace-nowrap hover:bg-neutral-50 ${cat === c.key ? "border-black" : "border-neutral-200"}`}
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-14">
        <h1 className="text-xl md:text-3xl font-extrabold">
          전체 상품{cat ? ` · ${cat.toUpperCase()}` : ""}{fit ? ` · ${fit}` : ""}
        </h1>

        {(cat || fit) && (
          <div className="mt-3 text-sm">
            <a href="/products" className="underline underline-offset-4">필터 초기화</a>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {list.map((p) => (
            <a key={p.slug} href={`/products/${p.slug}`} className="rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-sm">
              <div className="aspect-[4/5] relative bg-neutral-100">
                <Image src={p.images?.[0] ?? "/products/placeholder.jpg"} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <div className="text-[10px] tracking-widest text-neutral-500">{p.tag}</div>
                <div className="font-semibold text-[15px]">{p.name}</div>
                <div className="text-[13px] text-neutral-700">{p.price.toLocaleString()}원</div>
              </div>
            </a>
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-8 text-sm text-neutral-500">해당 조건의 상품이 없습니다. 필터를 변경해 보세요.</p>
        )}
      </main>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-500">
          © {new Date().getFullYear()} MINIMALS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
