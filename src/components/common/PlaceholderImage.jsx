export function PlaceholderImage({ label }) {
  return (
    <div className="placeholder-image" role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  )
}
