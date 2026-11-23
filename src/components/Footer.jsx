import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-black/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl font-bold">URBANNEST.</p>
          <p className="mt-3 max-w-xs text-sm text-muted">Shop smarter. Live better. Quality, style and value in one destination.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="mb-2 font-semibold">Explore</p>
          <Link to="/shop" className="hover:opacity-60">Shop</Link>
          <Link to="/about" className="hover:opacity-60">About</Link>
          <Link to="/contact" className="hover:opacity-60">Contact</Link>
        </div>
        <div className="text-sm text-muted">
          <p className="mb-2 font-semibold text-ink">Free delivery</p>
          <p>Orders over ৳3,000 across Bangladesh.</p>
        </div>
      </div>
      <div className="border-t border-black/5 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} URBANNEST. All rights reserved.
      </div>
    </footer>
  );
}
