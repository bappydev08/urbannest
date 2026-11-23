export default function Logo({ light = false }) {
  return (
    <span className={`brand-logo${light ? " brand-logo--light" : ""}`}>
      <svg viewBox="0 0 48 44" className="brand-logo__mark" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 38V17" />
          <path d="M23 26C10 26 5 17 8 7c10 0 17 6 15 19Z" fill="currentColor" opacity=".92" />
          <path d="M25 26C38 26 43 17 40 7c-10 0-17 6-15 19Z" fill="currentColor" opacity=".72" />
          <path d="M24 17C17 10 19 4 24 2c6 3 7 9 0 15Z" fill="currentColor" />
          <path d="M13 35c4-4 7-5 11-5s7 1 11 5" />
        </g>
      </svg>
      <span className="brand-logo__word">UrbanNest</span>
      <span className="brand-logo__sub">BEAUTY</span>
    </span>
  );
}
