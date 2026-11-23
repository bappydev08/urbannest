import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import TrustBar from "../components/TrustBar.jsx";

const categories = [
  { name: "Skincare", image: "/assets/category-skincare.jpg" },
  { name: "Makeup", image: "/assets/category-makeup.jpg" },
  { name: "Haircare", image: "/assets/category-haircare.jpg" },
  { name: "Bodycare", image: "/assets/category-bodycare.jpg" },
  { name: "Sun Care", image: "/assets/category-sun-care.jpg" },
  { name: "Gift Sets", image: "/assets/category-gift-sets.jpg" },
];

const bestSellers = products.slice(0, 4);

export default function Home() {
  return (
    <>
      <section className="hero-banner">
        <div className="hero-banner__image" aria-hidden="true" />
        <div className="hero-banner__content">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="eyebrow">New in</p>
            <h1>Radiant Skin.<br />Real Confidence.</h1>
            <p className="hero-banner__copy">Clean beauty that nourishes,<br className="desktop-break" /> enhances and empowers you.</p>
            <Link to="/shop" className="button button--rose">Shop now</Link>
          </motion.div>
        </div>
        <Link to="/shop" className="hero-arrow hero-arrow--left" aria-label="Previous collection">‹</Link>
        <Link to="/shop" className="hero-arrow hero-arrow--right" aria-label="Next collection">›</Link>
      </section>

      <TrustBar />

      <section className="category-section section-wrap">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">Explore the edit</p>
          <h2>Shop by category</h2>
          <span className="heading-rule" />
        </div>
        <div className="category-grid">
          {categories.map((category, i) => (
            <Reveal key={category.name} delay={i * 0.06}>
              <Link to={`/shop?category=${encodeURIComponent(category.name)}`} className="category-tile">
                <span className="category-tile__image">
                  <img src={category.image} alt={`${category.name} collection`} loading="lazy" />
                </span>
                <span className="category-tile__name">{category.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="offer-section section-wrap">
        <Reveal>
          <div className="offer-panel">
            <div className="offer-panel__copy">
              <p className="eyebrow">Limited time offer</p>
              <h2>Up to 30% Off<br />on Best Sellers</h2>
              <p>Glow more, spend less.<br />Treat your skin today!</p>
              <Link to="/shop" className="button button--light">Shop the sale</Link>
            </div>
            <img className="offer-panel__image" src="/assets/offer-body-care.jpg" alt="Nourishing body care and moisturizer" loading="lazy" />
          </div>
        </Reveal>
      </section>

      <section className="bestsellers-section section-wrap" id="best-sellers">
        <Reveal>
          <div className="bestsellers-heading">
            <h2>Best sellers</h2>
            <Link to="/shop" className="text-link">View all</Link>
          </div>
        </Reveal>
        <div className="product-grid product-grid--home">
          {bestSellers.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="brand-story" id="brand-story">
        <div className="brand-story__inner">
          <p className="eyebrow">The Velvetique promise</p>
          <h2>Thoughtful beauty for every day.</h2>
          <p>Discover considered essentials for your skincare, makeup and everyday beauty ritual.</p>
          <Link to="/about" className="text-link">Our story</Link>
        </div>
      </section>
    </>
  );
}
