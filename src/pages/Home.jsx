import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import TrustBar from "../components/TrustBar.jsx";
import { productImg } from "../lib.js";

const categoryCircles = [
  { name: "Cleansers", kw: "cleanser,face" },
  { name: "Serums", kw: "serum,skincare" },
  { name: "Moisturizers", kw: "moisturizer,cream" },
  { name: "Body Care", kw: "lotion,body" },
  { name: "Sun Care", kw: "sunscreen,beach" },
  { name: "Gift Sets", kw: "skincare,gift" },
];

const bestSellers = products.filter((p) => p.badge === "Best Seller" || p.badge === "Sale" || p.id <= 4).slice(0, 4);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-blush">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose">New in</p>
            </Reveal>
            <h1 className="mt-5 font-display text-6xl font-semibold leading-[1.02] text-plum md:text-7xl">
              {["Radiant Skin.", "Real Confidence."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <Reveal delay={0.4}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Clean beauty that nourishes, enhances and empowers you. Gentle formulas for every skin type.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <Link
                to="/shop"
                className="mt-10 inline-block rounded-md bg-mauve px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-plum"
              >
                Shop now
              </Link>
            </Reveal>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl"
          >
            <img src={productImg("skincare,bottle", 77, 1000, 1000)} alt="UrbanNest skincare collection" className="aspect-square w-full object-cover" />
          </motion.div>
        </div>
      </section>

      <TrustBar />

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-mauve">Shop by category</p>
          <div className="mx-auto mt-3 h-px w-10 bg-rose" />
        </Reveal>
        <div className="mt-14 grid grid-cols-3 gap-6 md:grid-cols-6">
          {categoryCircles.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.07}>
              <Link to={`/shop?category=${encodeURIComponent(c.name)}`} className="group block text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-full bg-blush transition-transform duration-500 group-hover:-translate-y-1">
                  <img src={productImg(c.kw, i + 20, 400, 400)} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em]">{c.name}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Offer */}
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
            <div className="flex flex-col justify-center bg-mauve px-10 py-16 text-cream md:px-16">
              <p className="text-xs uppercase tracking-[0.3em] text-blush/80">Limited time offer</p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-6xl">
                Up to 30% off on best sellers
              </h2>
              <p className="mt-5 max-w-sm text-blush/90">Glow more, spend less. Treat your skin today.</p>
              <Link to="/shop" className="mt-10 inline-block w-fit rounded-md bg-cream px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-plum transition-transform hover:scale-105">
                Shop the sale
              </Link>
            </div>
            <img src={productImg("skincare,cream,flowers", 99, 1000, 900)} alt="Offer" className="h-full min-h-[380px] w-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mauve">Our favourites</p>
              <h2 className="mt-3 font-display text-5xl font-semibold text-plum">Best sellers</h2>
            </div>
            <Link to="/shop" className="text-xs font-semibold uppercase tracking-[0.2em] text-rose underline underline-offset-8">
              View all
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {bestSellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brand story */}
      <section className="bg-blush">
        <Reveal className="mx-auto max-w-3xl px-5 py-24 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose">Our promise</p>
          <h2 className="mt-4 font-display text-5xl font-semibold text-plum">Beauty that feels like self-care.</h2>
          <p className="mt-6 leading-relaxed text-muted">
            Every UrbanNest formula is tested for safety and made with ingredients we would use on our own skin.
          </p>
        </Reveal>
      </section>
    </>
  );
}
