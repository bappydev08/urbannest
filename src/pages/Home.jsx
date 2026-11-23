import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import TrustBar from "../components/TrustBar.jsx";

const categories = [
  { name: "Skincare", image: "/assets/category-skincare.svg", note: "Glow from within" },
  { name: "Makeup", image: "/assets/category-makeup.svg", note: "Your everyday palette" },
  { name: "Haircare", image: "/assets/category-haircare.svg", note: "Care for every strand" },
  { name: "Body Care", image: "/assets/category-body-care.svg", note: "A little daily luxury" },
  { name: "Sun Care", image: "/assets/category-sun-care.svg", note: "Everyday protection" },
  { name: "Gift Sets", image: "/assets/category-gift-sets.svg", note: "Made for sharing" },
];
export default function Home() {
  return <>
    <section className="hero-banner">
      <img className="hero-banner__image" src="/assets/hero-beauty.jpg" alt="UrbanNest Beauty skincare collection with branded cleanser, serum and moisturizer" />
      <div className="hero-banner__shade" />
      <div className="hero-banner__content">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <p className="eyebrow">New in · The daily glow edit</p>
          <h1>Radiant Skin.<br/>Real Confidence.</h1>
          <p className="hero-banner__copy">Clean beauty that nourishes,<br className="desktop-break"/> enhances and empowers you.</p>
          <Link to="/shop" className="button button--primary">Shop now <span>→</span></Link>
        </motion.div>
      </div>
    </section>
    <TrustBar />
    <section className="category-section section-wrap" id="categories">
      <div className="section-heading section-heading--center"><p className="eyebrow">Find your favourites</p><h2>Shop by category</h2><span className="heading-rule"/><p className="section-heading__copy">Thoughtful essentials for every part of your routine.</p></div>
      <div className="category-grid">{categories.map((category,i)=><Reveal key={category.name} delay={i*.05}><Link to={`/shop?category=${encodeURIComponent(category.name)}`} className="category-tile"><span className="category-tile__image"><img src={category.image} alt={`${category.name} products with UrbanNest Beauty branding`} loading="lazy"/></span><span className="category-tile__name">{category.name}</span><span className="category-tile__note">{category.note}</span></Link></Reveal>)}</div>
    </section>
    <section className="offer-section section-wrap"><Reveal><div className="offer-panel"><div className="offer-panel__copy"><p className="eyebrow">Limited time offer</p><h2>Up to 30% Off<br/>on Best Sellers</h2><p>Glow more, spend less.<br/>Treat your skin today.</p><Link to="/shop" className="button button--light">Shop the sale <span>→</span></Link></div><img className="offer-panel__image" src="/assets/offer-beauty.jpg" alt="UrbanNest Beauty products with branded packaging and rose petals" loading="lazy"/></div></Reveal></section>
    <section className="bestsellers-section section-wrap" id="best-sellers"><Reveal><div className="bestsellers-heading"><div><p className="eyebrow">Loved by our customers</p><h2>Best Sellers</h2></div><Link to="/shop" className="text-link">View all products →</Link></div></Reveal>
      <div className="product-grid product-grid--home">{products.map((product,i)=><Reveal key={product.id} delay={(i%5)*.025}><ProductCard product={product}/></Reveal>)}</div>
    </section>
    <section className="brand-story" id="beauty-journal"><div className="brand-story__inner"><p className="eyebrow">The UrbanNest Beauty point of view</p><h2>Beauty that feels like you.</h2><p>Thoughtful everyday essentials, uplifting textures and little moments of care—made to help you feel confident in your own glow.</p><Link to="/about" className="text-link">Discover our story →</Link></div></section>
  </>;
}
