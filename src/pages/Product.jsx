import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import { useCart } from "../context/CartContext.jsx";
import { formatTaka } from "../lib.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Product paoa jayni</h1>
        <Link to="/shop" className="mt-8 inline-block underline">Shop e fire jao</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl bg-white"
        >
          <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-muted">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{product.name}</h1>
          <p className="mt-6 text-2xl">
            {formatTaka(product.price)}
            {product.oldPrice && <span className="ml-3 text-lg text-muted line-through">{formatTaka(product.oldPrice)}</span>}
          </p>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 rounded-full bg-ink py-4 text-sm font-medium text-cream"
          >
            {added ? "Cart e joog hoyeche ✓" : "Add to cart"}
          </motion.button>
          <Link to="/cart" className="mt-4 text-center text-sm underline underline-offset-4">Cart dekho</Link>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-32">
          <h2 className="font-display text-3xl font-bold">Related products</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
