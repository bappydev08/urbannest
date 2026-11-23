import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { formatTaka } from "../lib.js";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <motion.article whileHover="hover" className="group relative">
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl bg-white">
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cream">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-muted">{product.category}</p>
        <Link to={`/product/${product.id}`} className="mt-1 block text-sm font-medium hover:opacity-60">
          {product.name}
        </Link>
        <p className="mt-1 text-sm">
          {formatTaka(product.price)}
          {product.oldPrice && <span className="ml-2 text-muted line-through">{formatTaka(product.oldPrice)}</span>}
        </p>
      </div>

      <motion.button
        onClick={() => addItem(product)}
        whileTap={{ scale: 0.97 }}
        className="mt-4 w-full rounded-full border border-ink py-2.5 text-sm font-medium transition-colors hover:bg-ink hover:text-cream"
      >
        Add to cart
      </motion.button>
    </motion.article>
  );
}
