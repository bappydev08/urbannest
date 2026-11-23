import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty", "Accessories"];
const sorts = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("newest");
  const active = params.get("category") || "All";

  const list = useMemo(() => {
    const filtered = active === "All" ? products : products.filter((p) => p.category === active);
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [active, sort]);

  const setCategory = (c) => setParams(c === "All" ? {} : { category: c });

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.25em] text-muted">
        Our collection
      </motion.p>
      <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">Shop</h1>

      <div className="mt-10 flex flex-col gap-6 border-b border-black/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                active === c ? "text-cream" : "hover:bg-black/5"
              }`}
            >
              {active === c && (
                <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-black/15 bg-transparent px-4 py-2 text-sm outline-none"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <motion.div layout className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {list.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && <p className="mt-16 text-center text-muted">Ei category te ekhono product nei.</p>}
    </div>
  );
}
