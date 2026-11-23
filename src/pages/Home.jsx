import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";

const categories = ["Electronics", "Fashion", "Home", "Beauty", "Accessories"];
const headline = ["Shop", "smarter.", "Live", "better."];

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      {/* Hero */}
      <section className="grid min-h-[85vh] items-center gap-12 py-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">Discover your next favorite</p>
          </Reveal>
          <h1 className="mt-6 font-display text-6xl font-bold leading-[1.02] md:text-8xl">
            {headline.map((word, i) => (
              <span key={i} className="mr-4 inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-md text-lg text-muted">
              Premium products for everyday life. Quality, style and value in one destination.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <Link
              to="/shop"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-cream transition-transform hover:scale-[1.03]"
            >
              Explore collection
              <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
          </Reveal>
        </div>

        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.1 }}
          animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <img src="https://picsum.photos/seed/un-hero/1000/1250" alt="UrbanNest collection" className="h-full w-full object-cover" />
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <Reveal>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Shop by category</h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((c, i) => (
            <Reveal key={c} delay={i * 0.06} y={20}>
              <Link
                to={`/shop?category=${c}`}
                className="inline-block rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-cream"
              >
                {c}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">Our collection</p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Featured products</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Offer banner */}
      <Reveal>
        <section className="my-16 overflow-hidden rounded-3xl bg-ink px-8 py-20 text-center text-cream md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] opacity-70">Free delivery</p>
          <h2 className="mt-4 font-display text-5xl font-bold md:text-7xl">Style meets value.</h2>
          <p className="mx-auto mt-6 max-w-md opacity-70">On every order over ৳3,000 across Bangladesh.</p>
          <Link
            to="/shop"
            className="mt-10 inline-block rounded-full bg-cream px-8 py-4 text-sm font-medium text-ink transition-transform hover:scale-105"
          >
            Shop now →
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
