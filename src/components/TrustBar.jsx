import Reveal from "./Reveal.jsx";
const items = [
  { icon: "leaf", title: "Clean ingredients", sub: "Safe & toxin-free" },
  { icon: "flask", title: "Clinically tested", sub: "Dermatologically tested" },
  { icon: "bunny", title: "Cruelty free", sub: "Never tested on animals" },
  { icon: "globe", title: "Sustainable beauty", sub: "Good for you & the planet" },
];
function TrustIcon({ type }) {
  const props = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "leaf") return <svg viewBox="0 0 40 40" {...props}><path d="M33 6C17 7 8 14 9 26c1 7 8 9 14 5 7-5 9-14 10-25Z"/><path d="M7 35c7-11 13-17 23-24M17 27c-1-5-1-8 0-11"/></svg>;
  if (type === "flask") return <svg viewBox="0 0 40 40" {...props}><path d="M15 5h10M17 5v11L7 32a3 3 0 0 0 3 4h20a3 3 0 0 0 3-4L23 16V5M12 27h16"/><path d="M16 30h8"/></svg>;
  if (type === "bunny") return <svg viewBox="0 0 40 40" {...props}><path d="M12 18c-2-8 0-13 4-13 4 0 5 8 5 12M22 17c0-9 2-14 6-13 4 2 2 10-1 15M10 20c-4 3-5 8-2 12 4 5 20 5 24 0 3-4 1-10-4-13-5-3-13-2-18 1Z"/><path d="M16 25h.1M25 25h.1M18 30c2 2 4 2 6 0"/></svg>;
  return <svg viewBox="0 0 40 40" {...props}><circle cx="20" cy="20" r="15"/><path d="M5 20h30M20 5c5 5 7 10 7 15s-2 10-7 15c-5-5-7-10-7-15s2-10 7-15Z"/><path d="M8 11h24M8 29h24"/></svg>;
}
export default function TrustBar() {
  return <Reveal className="trustbar-wrap"><div className="trustbar">{items.map((item) => <div className="trustbar__item" key={item.title}><span className="trustbar__icon"><TrustIcon type={item.icon}/></span><span className="trustbar__text"><strong>{item.title}</strong><small>{item.sub}</small></span></div>)}</div></Reveal>;
}
