export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
        <circle cx="24" cy="24" r="23" fill={light ? "#F3E3E5" : "#9C5A6E"} />
        <path d="M24 11c-7 4-9.5 11.5-6.5 19 2.2-6.2 5-10 6.5-13.5 1.5 3.5 4.3 7.3 6.5 13.5 3-7.5.5-15-6.5-19z" fill={light ? "#5C2D41" : "#F3E3E5"} />
        <path d="M24 34v4" stroke={light ? "#5C2D41" : "#F3E3E5"} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="leading-none">
        <p className={`font-display text-2xl font-semibold tracking-wide ${light ? "text-cream" : "text-plum"}`}>UrbanNest</p>
        <p className={`mt-0.5 text-[9px] tracking-[0.35em] ${light ? "text-blush/80" : "text-mauve"}`}>BEAUTY</p>
      </div>
    </div>
  );
}
