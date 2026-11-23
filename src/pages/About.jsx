import Reveal from "../components/Reveal.jsx";

const stats = [
  { value: "8+", label: "Categories" },
  { value: "500+", label: "Products" },
  { value: "৳3,000", label: "Free delivery above" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-20 md:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">About us</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">We believe in quiet quality.</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-10 text-lg leading-relaxed text-muted">
          UrbanNest ekta premium e-commerce destination, jekhane fashion, electronics, beauty ar home products ek jaygay.
          Amader lokkho: pochondoshoi product, sothik daam, ar sohoj kena-kata.
        </p>
      </Reveal>
      <div className="mt-20 grid gap-10 border-t border-black/10 pt-16 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <p className="font-display text-5xl font-bold">{s.value}</p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
