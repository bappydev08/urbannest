import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import { useCart } from "../context/CartContext.jsx";
import { formatTaka } from "../lib.js";
import ProductCard from "../components/ProductCard.jsx";
import Stars from "../components/Stars.jsx";

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-5xl font-semibold text-plum">Product paoa jayni</h1>
        <Link to="/shop" className="mt-8 inline-block text-xs font-semibold uppercase tracking-wider text-rose underline">Shop e jao</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-14 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden rounded-3xl bg-blush/60">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mauve">{product.category}</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-tight text-plum">{product.name}</h1>
          <div className="mt-4"><Stars rating={product.rating} reviews={product.reviews} /></div>
          <p className="mt-6 text-2xl font-semibold text-plum">
            {formatTaka(product.price)}
            {product.oldPrice && <span className="ml-3 text-base font-normal text-muted line-through">{formatTaka(product.oldPrice)}</span>}
          </p>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          <button onClick={handleAdd} className="mt-10 rounded-md bg-mauve py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-plum">
            {added ? "Added to cart ✓" : "Add to cart"}
          </button>
          <Link to="/cart" className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-rose underline underline-offset-4">View cart</Link>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="font-display text-4xl font-semibold text-plum">You may also like</h2>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
