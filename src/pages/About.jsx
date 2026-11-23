import Reveal from "../components/Reveal.jsx";
import { productImg } from "../lib.js";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="grid items-center gap-16 md:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mauve">About UrbanNest</p>
          <h1 className="mt-4 font-display text-6xl font-semibold leading-[1.05] text-plum">Clean beauty, made gently.</h1>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            UrbanNest ekta skincare brand, jeta shohoj, nirapod ar kaajer formula toiri kore. Amader
            shob product clinically tested ar cruelty free.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <img src={productImg("skincare,spa", 55, 900, 1100)} alt="UrbanNest about" className="aspect-[4/5] w-full rounded-3xl object-cover" />
        </Reveal>
      </div>
      <div className="mt-28 grid gap-12 border-t border-line pt-16 md:grid-cols-3">
        {[
          ["100%", "Cruelty free"],
          ["8", "Skincare essentials"],
          ["15 days", "Easy returns"],
        ].map(([v, l], i) => (
          <Reveal key={l} delay={i * 0.1}>
            <p className="font-display text-6xl font-semibold text-rose">{v}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{l}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
