import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { formatTaka } from "../lib.js";

const FREE_OVER = 2500;
const FEE = 120;

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart();
  const delivery = total === 0 || total >= FREE_OVER ? 0 : FEE;
  return (
    <div className="cart-page">
      <div className="cart-heading"><p className="eyebrow">Your UrbanNest Beauty bag</p><h1>Good things, gathered.</h1><p>Review your pieces before checking out.</p></div>
      {items.length === 0 ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cart-empty"><div className="cart-empty-icon">♡</div><h2>Your bag is taking a little rest.</h2><p>Explore the collection and find a new favourite for your daily beauty ritual.</p><Link to="/shop" className="button button--primary">Explore the shop</Link></motion.div> : (
        <div className="cart-layout">
          <ul className="cart-items"><AnimatePresence>{items.map((item) => <motion.li key={item.id} layout exit={{ opacity: 0, x: -24 }} className="cart-line"><img src={item.image} alt={item.name} /><div className="cart-line-info"><div className="cart-line-top"><div><p className="cart-line-name">{item.name}</p><p className="cart-line-price">{formatTaka(item.price)}</p></div><button onClick={() => removeItem(item.id)} className="remove-button">Remove</button></div><div className="quantity-control"><button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity">−</button><span>{item.qty}</span><button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity">+</button></div></div><strong className="cart-line-total">{formatTaka(item.price * item.qty)}</strong></motion.li>)}</AnimatePresence></ul>
          <aside className="cart-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{formatTaka(total)}</strong></div><div><span>Delivery</span><strong>{delivery === 0 ? "Free" : formatTaka(delivery)}</strong></div><div className="cart-summary-total"><span>Total</span><strong>{formatTaka(total + delivery)}</strong></div>{total < FREE_OVER && <p className="cart-delivery-note">Add {formatTaka(FREE_OVER - total)} more to unlock free delivery.</p>}<button className="button button--primary checkout-button" type="button" onClick={() => alert("Checkout demo: connect your preferred payment and order service to accept orders.")}>Continue to checkout</button><p className="cart-secure-note">Secure checkout · Carefully packed · Easy returns</p></aside>
        </div>
      )}
    </div>
  );
}
