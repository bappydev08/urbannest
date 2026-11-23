import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";

const categories = ["All", "Skincare", "Makeup", "Haircare", "Bodycare", "Sun Care", "Gift Sets"];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const active = params.get("category") || "All";
  const query = params.get("q") || "";

  const list = useMemo(() => {
    const term = query.trim().toLowerCase();
    const base = products.filter((product) => (active === "All" || product.category === active) && (!term || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term)));
    const arr = [...base];
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [active, sort, query]);

  return (
    <div className="shop-page">
      <div className="shop-page__intro"><p className="eyebrow">The Velvetique edit</p><h1>Shop beauty</h1><p>Everyday favourites, thoughtfully selected.</p></div>
      <div className="shop-toolbar"><div className="category-filters">{categories.map((category) => <button key={category} onClick={() => setParams((current) => { const next = new URLSearchParams(current); if (category === "All") next.delete("category"); else next.set("category", category); return next; })} className={active === category ? "is-selected" : ""}>{category}</button>)}</div><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div>
      {query && <p className="search-result-label">Search results for “{query}”</p>}
      <motion.div layout className="product-grid shop-product-grid">{list.map((product) => <ProductCard key={product.id} product={product} />)}</motion.div>
      {list.length === 0 && <p className="empty-state">No products found. Try another search or category.</p>}
    </div>
  );
}
