export default function Stars({ rating, reviews }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted">
      <span className="text-mauve">{"★".repeat(full)}{"☆".repeat(5 - full)}</span>
      <span>({reviews})</span>
    </div>
  );
}
