import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { formatTaka } from "../lib.js";

const FREE_DELIVERY_OVER = 3000;
const DELIVERY_FEE = 120;

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart();
  const delivery = total === 0 || total >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold">Your cart</h1>

      {items.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 text-center">
          <p className="text-muted">Cart ekhono khali.</p>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-ink px-8 py-3 text-sm text-cream">
            Shopping shuru koro
          </Link>
        </motion.div>
      ) : (
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          <ul className="space-y-6 md:col-span-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="flex gap-5 rounded-2xl bg-white p-4"
                >
                  <img src={item.image} alt={item.name} className="h-28 w-24 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="mt-1 text-sm text-muted">{formatTaka(item.price)}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-sm text-muted hover:text-ink">
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-8 w-8 rounded-full border border-black/15">−</button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-8 w-8 rounded-full border border-black/15">+</button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <motion.aside layout className="h-fit rounded-2xl bg-white p-6">
            <h2 className="font-semibold">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatTaka(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Delivery</span><span>{delivery === 0 ? "Free" : formatTaka(delivery)}</span></div>
              <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
                <span>Total</span><span>{formatTaka(total + delivery)}</span>
              </div>
            </div>
            {total < FREE_DELIVERY_OVER && (
              <p className="mt-4 text-xs text-muted">Aro ৳{(FREE_DELIVERY_OVER - total).toLocaleString("en-US")} hole free delivery.</p>
            )}
            <button className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-medium text-cream transition-transform hover:scale-[1.02]">
              Checkout
            </button>
          </motion.aside>
        </div>
      )}
    </div>
  );
}
