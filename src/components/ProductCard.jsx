import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { formatTaka, productImg } from "../lib.js";
import Stars from "./Stars.jsx";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);

  return (
    <motion.article whileHover="hover" className="group">
      <div className="relative overflow-hidden rounded-2xl bg-blush/50">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-[4/5] overflow-hidden">
            <motion.img
              src={productImg(product.kw, product.id)}
              alt={product.name}
              loading="lazy"
              variants={{ hover: { scale: 1.05 } }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-mauve px-3 py-1 text-[11px] font-medium text-cream">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setLiked((v) => !v)}
          aria-label="Wishlist"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-mauve"
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link to={`/product/${product.id}`} className="font-medium leading-snug hover:text-mauve">
          {product.name}
        </Link>
        <div className="mt-1 flex justify-center">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>
        <p className="mt-1.5 text-sm">
          <span className="font-semibold text-plum">{formatTaka(product.price)}</span>
          {product.oldPrice && <span className="ml-2 text-muted line-through">{formatTaka(product.oldPrice)}</span>}
        </p>
      </div>

      <button
        onClick={() => addItem(product)}
        className="mt-4 w-full rounded-md bg-mauve py-2.5 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-plum"
      >
        Add to cart
      </button>
    </motion.article>
  );
}
