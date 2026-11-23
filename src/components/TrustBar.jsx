import Reveal from "./Reveal.jsx";

const items = [
  { title: "Clean ingredients", sub: "Safe & toxin-free" },
  { title: "Clinically proven", sub: "Dermatologically tested" },
  { title: "Cruelty free", sub: "We never test on animals" },
  { title: "Sustainable beauty", sub: "Good for you & the planet" },
];

export default function TrustBar() {
  return (
    <Reveal className="mx-auto -mt-12 max-w-6xl px-5 md:px-8">
      <div className="grid grid-cols-2 gap-6 rounded-2xl bg-cream p-8 shadow-[0_10px_40px_-15px_rgba(92,45,65,0.25)] md:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="text-center">
            <p className="font-display text-lg font-semibold text-plum">{i.title}</p>
            <p className="mt-1 text-xs text-muted">{i.sub}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
