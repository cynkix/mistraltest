export default function ScoreGauge({ score }: { score: number }) {
  return (
    <div>
      <div className="mb-2.5 flex items-end justify-between gap-4">
        <span className="text-sm font-bold text-muted">Indice d’ouverture</span>
        <span className="text-3xl font-extrabold tracking-[-0.05em] text-ink">
          {score}
          <span className="text-base text-muted">/100</span>
        </span>
      </div>
      <div
        className="h-3 overflow-hidden rounded-full bg-gradient-to-r from-danger-soft via-warning-soft to-success-soft"
        role="progressbar"
        aria-label="Indice d’ouverture"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <div
          className="h-full animate-fill rounded-full bg-warning"
          style={{ "--score": `${score}%` } as React.CSSProperties}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-wide text-muted">
        <span>Verrouillé</span>
        <span>Ouvert</span>
      </div>
    </div>
  )
}
