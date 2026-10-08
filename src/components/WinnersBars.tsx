import type { Winner } from "../mockData"

export default function WinnersBars({ winners }: { winners: Winner[] }) {
  return (
    <div className="space-y-4">
      {winners.map((winner) => (
        <div key={winner.name}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
            <span className="truncate font-bold text-ink">{winner.name}</span>
            <span className="shrink-0 font-extrabold text-muted">
              {winner.share} %
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <div
              className="h-full animate-fill rounded-full bg-primary"
              style={{ "--score": `${winner.share}%` } as React.CSSProperties}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
