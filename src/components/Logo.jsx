export default function Logo({ light = false }) {
  return (
    <span className={`brand-logo${light ? " brand-logo--light" : ""}`}>
      <svg viewBox="0 0 48 38" className="brand-logo__mark" aria-hidden="true">
        <path d="M24 31C11 29 6 20 10 11c8 1 13 8 14 17 1-11 7-18 15-19 2 10-3 19-15 22Z" fill="currentColor" opacity=".88" />
        <path d="M24 31c-1-11-1-19 0-27M24 22c-5-4-9-6-14-7M24 18c4-5 8-7 13-8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <span className="brand-logo__word">VELVETIQUE</span>
      <span className="brand-logo__sub">BEAUTY</span>
    </span>
  );
}
