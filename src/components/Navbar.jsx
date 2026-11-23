import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import Logo from "./Logo.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-mauve py-2 text-center text-[11px] tracking-wide text-cream">
        Free delivery on orders over ৳3,000 · Code: GLOW15 for 15% off
      </div>
      <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" aria-label="UrbanNest home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-rose ${
                    isActive ? "text-rose" : "text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link to="/cart" className="relative text-xs font-semibold uppercase tracking-[0.15em] hover:text-rose">
              Cart
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-4 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose px-1 text-[10px] text-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button onClick={() => setOpen((v) => !v)} className="md:hidden" aria-label="Menu">
              <span className="block text-xl">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-line md:hidden"
            >
              <div className="flex flex-col gap-4 px-5 py-5">
                {links.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm font-semibold uppercase tracking-wider">
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
