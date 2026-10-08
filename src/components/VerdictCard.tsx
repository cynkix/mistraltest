import { ArrowRight, FileText, Quote, RotateCcw } from "lucide-react"
import type { Verdict } from "../mockData"
import MistralBadge from "./MistralBadge"
import ScoreGauge from "./ScoreGauge"
import StatusBadge from "./StatusBadge"

interface VerdictCardProps {
  verdict: Verdict
  onDecisionNote: () => void
  onAnotherTender: () => void
}

export default function VerdictCard({
  verdict,
  onDecisionNote,
  onAnotherTender,
}: VerdictCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <div className="grid lg:grid-cols-[1fr_0.42fr]">
        <div className="p-6 sm:p-9 lg:p-11">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={verdict.status} />
              <MistralBadge label="Verdict Mistral" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onAnotherTender}
                className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs font-bold text-primary transition hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <RotateCcw size={14} />
                Autre avis
              </button>
              <button
                type="button"
                onClick={onDecisionNote}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white shadow-button transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FileText size={14} />
                Note de décision
              </button>
            </div>
          </div>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
            {verdict.headline}
          </h1>
          <div className="relative mt-7 max-w-3xl pl-7">
            <Quote
              size={18}
              className="absolute left-0 top-1 text-mistral"
              fill="currentColor"
            />
            <p className="text-base leading-8 text-ink/85">
              {verdict.explanation}
            </p>
            <div className="mt-4">
              <MistralBadge label="Rédigé par Mistral" />
            </div>
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary-soft p-5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-white">
              <ArrowRight size={17} />
            </span>
            <p className="pt-1 text-base leading-6">
              <strong>Notre conseil :</strong> {verdict.recommendation}
            </p>
          </div>
        </div>
        <aside className="flex flex-col justify-center border-t border-line bg-canvas/70 p-6 sm:p-9 lg:border-l lg:border-t-0">
          <p className="mb-7 text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
            Signal de marché
          </p>
          <ScoreGauge score={verdict.score} />
          <p className="mt-7 border-t border-line pt-5 text-sm leading-6 text-muted">
            {verdict.scoreContext}
          </p>
        </aside>
      </div>
    </article>
  )
}
