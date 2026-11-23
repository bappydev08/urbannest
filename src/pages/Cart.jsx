import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { formatTaka } from "../lib.js";

const FREE_OVER = 999;
const FEE = 120;

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart();
  const delivery = total === 0 || total >= FREE_OVER ? 0 : FEE;

  return (
    <div className="mx-auto max-w-5xl px-5 py-20 md:px-8">
      <h1 className="font-display text-6xl font-semibold text-plum">Your cart</h1>

      {items.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 text-center">
          <p className="text-muted">Your shopping bag is empty.</p>
          <Link to="/shop" className="mt-8 inline-block rounded-md bg-mauve px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream">
            Shop now
          </Link>
        </motion.div>
      ) : (
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          <ul className="space-y-5 md:col-span-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.li key={item.id} layout exit={{ opacity: 0, x: -30 }} className="flex gap-5 rounded-2xl bg-blush/40 p-4">
                  <img src={item.image || `/assets/product-${item.id}.jpg`} alt={item.name} className="h-32 w-28 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="mt-1 text-sm text-muted">{formatTaka(item.price)}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-xs uppercase tracking-wider text-muted hover:text-rose">Remove</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-8 w-8 rounded-full border border-line hover:border-mauve">−</button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-8 w-8 rounded-full border border-line hover:border-mauve">+</button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <aside className="h-fit rounded-2xl bg-cream p-7 shadow-[0_10px_40px_-15px_rgba(92,45,65,0.25)]">
            <h2 className="font-display text-2xl font-semibold text-plum">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatTaka(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Delivery</span><span>{delivery === 0 ? "Free" : formatTaka(delivery)}</span></div>
              <div className="flex justify-between border-t border-line pt-4 text-base font-semibold text-plum"><span>Total</span><span>{formatTaka(total + delivery)}</span></div>
            </div>
            {total < FREE_OVER && (
              <p className="mt-4 text-xs text-muted">Aro ৳{(FREE_OVER - total).toLocaleString("en-US")} hole free delivery.</p>
            )}
            <button className="mt-7 w-full rounded-md bg-mauve py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-plum">
              Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
