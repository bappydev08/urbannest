import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";

const categories = ["All", "Cleansers", "Serums", "Moisturizers", "Sun Care", "Body Care", "Gift Sets"];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const active = params.get("category") || "All";

  const list = useMemo(() => {
    const base = active === "All" ? products : products.filter((p) => p.category === active);
    const arr = [...base];
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [active, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mauve">Our collection</p>
        <h1 className="mt-3 font-display text-6xl font-semibold text-plum">Shop</h1>
      </motion.div>

      <div className="mt-12 flex flex-col gap-6 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setParams(c === "All" ? {} : { category: c })}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                active === c ? "border-mauve bg-mauve text-cream" : "border-line hover:border-mauve"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-mauve"
        >
          <option value="featured">Featured</option>
          <option value="rating">Top rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
      {list.length === 0 && <p className="mt-20 text-center text-muted">Ei category te ekhono product nei.</p>}
    </div>
  );
}
