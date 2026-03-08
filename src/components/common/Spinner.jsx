export function Spinner({ label = 'Enviando...' }) {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  )
}
