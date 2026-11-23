import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="mt-24 bg-plum text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-blush/80">
            Skincare that nourishes. Clinically proven and cruelty free, for every skin, every day.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blush">Quick links</p>
          <div className="flex flex-col gap-2.5 text-blush/80">
            <Link to="/shop" className="hover:text-cream">Shop</Link>
            <Link to="/about" className="hover:text-cream">About</Link>
            <Link to="/contact" className="hover:text-cream">Contact</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blush">Customer care</p>
          <div className="flex flex-col gap-2.5 text-blush/80">
            <span>Track your order</span>
            <span>Returns: 15 days</span>
            <span>Privacy policy</span>
          </div>
        </div>
        <div className="text-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blush">Newsletter</p>
          <p className="text-blush/80">Offer ar notun product er khobor peye jaan.</p>
          <div className="mt-4 flex overflow-hidden rounded-md">
            <input placeholder="Email address" className="min-w-0 flex-1 bg-cream px-3 py-2.5 text-sm text-ink outline-none" />
            <button className="bg-rose px-4 text-xs font-semibold uppercase tracking-wider">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-blush/60">
        © {new Date().getFullYear()} UrbanNest Beauty. All rights reserved.
      </div>
    </footer>
  );
}
