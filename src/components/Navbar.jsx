import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import Logo from "./Logo.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Collections" },
  { to: "/about", label: "About us" },
  { to: "/#best-sellers", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7"/><path d="m16 16 4.2 4.2"/></svg>; }
function UserIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5"/><path d="M4.8 20c.5-4 3-6 7.2-6s6.7 2 7.2 6"/></svg>; }
function BagIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16l-1 13H5L4 8Z"/><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"/></svg>; }

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      <div className="announcement-bar">
        <p>✦ Free Shipping on orders over ৳999 <span>|</span> Use code: GLOW15 for 15% OFF</p>
        <div className="announcement-bar__social" aria-label="Social media"><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://instagram.com" aria-label="Instagram">◎</a><a href="https://youtube.com" aria-label="YouTube">▶</a></div>
      </div>
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand" aria-label="Velvetique Beauty home"><Logo /></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link, index) => (
              <NavLink key={`${link.label}-${index}`} to={link.to} end={link.to === "/"} className={({ isActive }) => `${isActive ? "is-active" : ""} ${link.label === "Collections" ? "nav-collections" : ""}`}>{link.label}{(link.label === "Shop" || link.label === "Collections") && <span className="nav-chevron">⌄</span>}</NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen((value) => !value)}><SearchIcon /></button>
            <Link to="/contact" className="icon-button" aria-label="Customer support"><UserIcon /></Link>
            <Link to="/cart" className="icon-button bag-button" aria-label={`Shopping bag, ${count} items`}><BagIcon />{count > 0 && <span className="bag-count">{count}</span>}</Link>
            <button className="mobile-menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? "✕" : "☰"}</button>
          </div>
        </div>
        <AnimatePresence>
          {searchOpen && <motion.form initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} onSubmit={submitSearch} className="search-panel"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search beauty essentials..." aria-label="Search products" /><button type="submit">Search</button></motion.form>}
        </AnimatePresence>
        <AnimatePresence>
          {open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mobile-nav"><div>{links.filter((link) => link.label !== "Collections").map((link) => <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>)}</div></motion.nav>}
        </AnimatePresence>
      </header>
    </>
  );
}
