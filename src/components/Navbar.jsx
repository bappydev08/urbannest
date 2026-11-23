import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import Logo from "./Logo.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=Skincare", label: "Collections" },
  { to: "/about", label: "About Us" },
  { to: "/about#beauty-notes", label: "Blog" },
  { to: "/contact", label: "Contact" },
];
function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7"/><path d="m16 16 4.2 4.2"/></svg>; }
function BagIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16l-1 13H5L4 8Z"/><path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3"/></svg>; }

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false); setOpen(false); setQuery("");
  };
  const isActive = (label) => {
    if (label === "Home") return location.pathname === "/";
    if (label === "Shop") return location.pathname === "/shop" && !location.search;
    if (label === "Collections") return location.pathname === "/shop" && location.search.includes("category=");
    if (label === "About Us") return location.pathname === "/about" && !location.hash;
    if (label === "Blog") return location.pathname === "/about" && location.hash.includes("beauty-notes");
    return location.pathname === "/contact";
  };
  return <>
    <div className="announcement-bar">
      <p>Free Shipping on orders over ৳999 <span>•</span> Use code: <strong>GLOW15</strong> for 15% OFF</p>
      <div className="announcement-bar__social" aria-label="Social media"><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://instagram.com" aria-label="Instagram">◎</a><a href="https://youtube.com" aria-label="YouTube">▶</a></div>
    </div>
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="UrbanNest Beauty home"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <NavLink key={link.label} to={link.to} end={link.label === "Home"} className={isActive(link.label) ? "is-active" : ""}>{link.label}{(link.label === "Shop" || link.label === "Collections") && <span className="nav-chevron">⌄</span>}</NavLink>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen((v) => !v)}><SearchIcon /></button>
          <Link to="/contact" className="icon-button account-button" aria-label="Customer care"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="4"/><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2"/></svg></Link>
          <Link to="/cart" className="icon-button bag-button" aria-label={`Shopping bag, ${count} items`}><BagIcon />{count > 0 && <span className="bag-count">{count}</span>}</Link>
          <button className="mobile-menu-button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"}>{open ? "✕" : "☰"}</button>
        </div>
      </div>
      <AnimatePresence>{searchOpen && <motion.form initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} onSubmit={submitSearch} className="search-panel"><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search beauty essentials..." aria-label="Search products" /><button type="submit">Search</button></motion.form>}</AnimatePresence>
      <AnimatePresence>{open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mobile-nav"><div>{links.map((link) => <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>)}<button onClick={() => { setSearchOpen(true); setOpen(false); }}>Search products</button></div></motion.nav>}</AnimatePresence>
    </header>
  </>;
}
