import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { formatTaka } from "../lib.js";
import Stars from "./Stars.jsx";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);

  return (
    <motion.article whileHover={{ y: -3 }} transition={{ duration: 0.22 }} className="product-card">
      <div className="product-card__visual">
        <Link to={`/product/${product.id}`} className="product-card__image-link">
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        <button onClick={() => setLiked((value) => !value)} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"} className={`wishlist-button${liked ? " is-liked" : ""}`}>
          {liked ? "♥" : "♡"}
        </button>
      </div>
      <div className="product-card__details">
        <Link to={`/product/${product.id}`} className="product-card__name">{product.name}</Link>
        <Stars rating={product.rating} reviews={product.reviews} />
        <p className="product-card__price">
          <span>{formatTaka(product.price)}</span>
          {product.oldPrice && <del>{formatTaka(product.oldPrice)}</del>}
        </p>
        <button onClick={() => addItem(product)} className="button button--product">Add to cart</button>
      </div>
    </motion.article>
  );
}
