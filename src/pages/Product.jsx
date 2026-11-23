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
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div className="not-found"><h1>Product not found</h1><p>This product may have moved or is no longer available.</p><Link to="/shop" className="button button--primary">Back to shop</Link></div>;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const handleAdd = () => {
    for (let i = 0; i < quantity; i += 1) addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-grid">
        <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} className="product-detail-visual"><img src={product.image} alt={`${product.name} product photo`} className="product-detail-image" /></motion.div>
        <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} className="product-detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <Stars rating={product.rating} reviews={product.reviews} />
          <p className="product-detail-price">{formatTaka(product.price)}{product.oldPrice && <del>{formatTaka(product.oldPrice)}</del>}</p>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-meta"><span>✓ UrbanNest Beauty selected essentials</span><span>✓ Branded packaging, packed with care</span><span>✓ Easy 15-day returns</span></div>
          <div className="product-purchase-row"><div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity((value) => Math.min(10, value + 1))} aria-label="Increase quantity">+</button></div><button onClick={handleAdd} className="button button--primary product-detail-add">{added ? "Added to bag ✓" : "Add to bag"}</button></div>
          <Link to="/cart" className="product-detail-cart-link">View your bag →</Link>
        </motion.div>
      </div>
      {related.length > 0 && <section className="related-products"><div className="bestsellers-heading"><div><p className="eyebrow">Complete your routine</p><h2>You may also like</h2></div></div><div className="product-grid related-grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>}
    </div>
  );
}
