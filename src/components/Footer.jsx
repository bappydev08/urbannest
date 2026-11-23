import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const benefits = [
  ["♧", "Free shipping", "On orders over ৳999"],
  ["◉", "Easy returns", "15 days return policy"],
  ["♢", "Secure payment", "100% secure checkout"],
  ["◌", "24/7 support", "We're here to help"],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="service-strip" aria-label="Shopping benefits">
        <div className="service-strip__inner">{benefits.map(([icon, title, sub]) => <div className="service-strip__item" key={title}><span>{icon}</span><div><strong>{title}</strong><small>{sub}</small></div></div>)}</div>
      </section>
      <footer className="site-footer">
        <div className="site-footer__grid">
          <div className="footer-brand"><Logo light /><p>Thoughtful beauty for every skin, every day.</p><div className="footer-social"><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://instagram.com" aria-label="Instagram">◎</a><a href="https://youtube.com" aria-label="YouTube">▶</a><a href="https://pinterest.com" aria-label="Pinterest">p</a></div></div>
          <div className="footer-column"><h3>Quick links</h3><Link to="/">Home</Link><Link to="/shop">Shop</Link><Link to="/shop">Collections</Link><Link to="/about">About us</Link><Link to="/#best-sellers">Blog</Link><Link to="/contact">Contact us</Link></div>
          <div className="footer-column"><h3>Customer care</h3><Link to="/contact">Track your order</Link><Link to="/contact">Shipping policy</Link><Link to="/contact">Returns & refunds</Link><Link to="/contact">Terms & conditions</Link><Link to="/contact">Privacy policy</Link><Link to="/contact">FAQs</Link></div>
          <div className="footer-newsletter"><h3>Newsletter</h3><p>Subscribe to get special offers, beauty tips and more.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Enter your email address" aria-label="Email address" required /><button type="submit">Subscribe</button></form><div className="payment-methods" aria-label="Payment methods"><span>VISA</span><span>●●</span><span>RuPay</span><span>UPI</span></div></div>
        </div>
        <div className="footer-bottom"><span>© {year} Velvetique Beauty. All rights reserved.</span><span>Made for your everyday glow.</span></div>
      </footer>
    </>
  );
}
