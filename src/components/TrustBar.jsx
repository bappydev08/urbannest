import Reveal from "./Reveal.jsx";

const items = [
  { icon: "leaf", title: "Clean ingredients", sub: "Safe & toxin-free" },
  { icon: "flask", title: "Clinically proven", sub: "Dermatologically tested" },
  { icon: "bunny", title: "Cruelty free", sub: "We never test on animals" },
  { icon: "globe", title: "Sustainable beauty", sub: "Good for you & the planet" },
];

function TrustIcon({ type }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "leaf") return <svg viewBox="0 0 40 40" {...common}><path d="M30 8C16 7 8 14 9 25c1 6 7 8 12 5 7-4 9-13 9-22Z"/><path d="M8 34c5-9 11-14 20-20"/><path d="M18 26c-1-4-1-7-1-10"/></svg>;
  if (type === "flask") return <svg viewBox="0 0 40 40" {...common}><path d="M15 5h10M17 5v10L8 31c-1 2 0 4 3 4h18c3 0 4-2 3-4L23 15V5"/><path d="M12 27h16M15 22h10"/></svg>;
  if (type === "bunny") return <svg viewBox="0 0 40 40" {...common}><path d="M13 15C7 7 9 2 12 3c4 1 5 8 6 12M24 15c0-8 3-13 6-11 3 2 0 9-2 13"/><path d="M9 17c-5 2-6 10-2 14 4 4 10 2 13 0 4 3 11 4 15-1 3-5 0-12-5-14-7-3-15-2-21 1Z"/><path d="M16 23h.1M26 23h.1M19 28c2 2 4 2 6 0"/></svg>;
  return <svg viewBox="0 0 40 40" {...common}><circle cx="20" cy="20" r="15"/><path d="M5 20h30M20 5c5 5 7 10 7 15s-2 10-7 15c-5-5-7-10-7-15s2-10 7-15Z"/><path d="M8 11h24M8 29h24"/></svg>;
}

export default function TrustBar() {
  return (
    <Reveal className="trustbar-wrap">
      <div className="trustbar">
        {items.map((item) => (
          <div className="trustbar__item" key={item.title}>
            <span className="trustbar__icon"><TrustIcon type={item.icon} /></span>
            <span className="trustbar__text"><strong>{item.title}</strong><small>{item.sub}</small></span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
