export default function Stars({ rating, reviews }) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="rating" aria-label={`${rating} out of 5 stars, ${reviews} reviews`}>
      <span className="rating__stars" aria-hidden="true">{"★".repeat(rounded)}{"☆".repeat(5 - rounded)}</span>
      <span>({reviews})</span>
    </span>
  );
}
