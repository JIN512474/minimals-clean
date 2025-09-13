import LangToggle from "../components/LangToggle";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-extrabold tracking-wide text-[18px]">MINIMALS</a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/products" className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">Products</a>
            <a href="#size" className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50">Size</a>
            <a href="https://smartstore.naver.com/내상점" className="px-3 py-1.5 rounded-lg bg-black text-white hover:opacity-90">Buy</a>
            <LangToggle />
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="bg-black text-white rounded-2xl p-6">
          <div className="text-xs opacity-70">TAILWIND STATUS</div>
          <div className="text-2xl font-extrabold mt-1">Tailwind 활성화됨 ✅</div>
        </div>
      </section>
    </main>
  );
}
