import { useEffect } from "react"
import { Database, X } from "lucide-react"
import {
  marketSources,
  sourceCategoryTitles,
  type SourceCategory,
} from "../mockData"

interface SourcesPanelProps {
  category: SourceCategory | null
  onClose: () => void
}

export default function SourcesPanel({ category, onClose }: SourcesPanelProps) {
  useEffect(() => {
    if (!category) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [category, onClose])

  const sources = category
    ? marketSources.filter((source) => source.categories.includes(category))
    : []

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        category ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!category}
    >
      <button
        type="button"
        aria-label="Fermer le panneau"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity ${
          category ? "opacity-100" : "opacity-0"
        }`}
        tabIndex={category ? 0 : -1}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Marchés sources"
        className={`absolute bottom-0 right-0 top-0 w-full max-w-2xl overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          category ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-line bg-white/95 p-6 backdrop-blur sm:p-8">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.13em] text-primary">
              <Database size={14} />
              Données DECP
            </span>
            <h2 className="text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">
              {category ? sourceCategoryTitles[category] : "Marchés sources"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Extrait des marchés publics utilisés dans l’analyse.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-muted transition hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4 p-6 sm:p-8">
          {sources.map((source) => (
            <article
              key={source.id}
              className="rounded-2xl border border-line p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <span className="rounded-md bg-canvas px-2 py-1 text-xs font-bold text-muted">
                  {source.date}
                </span>
                <strong className="text-sm text-primary">
                  {source.amount}
                </strong>
              </div>
              <h3 className="font-extrabold leading-6">{source.subject}</h3>
              <p className="mt-1 text-sm text-muted">{source.buyer}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
                <div>
                  <dt className="text-xs text-muted">Titulaire</dt>
                  <dd className="mt-1 font-bold">{source.winner}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Offres reçues</dt>
                  <dd className="mt-1 font-bold">{source.offers}</dd>
                </div>
              </dl>
            </article>
          ))}
          <p className="px-2 pt-2 text-xs leading-5 text-muted">
            Données fictives présentées au format des données essentielles de la
            commande publique (DECP).
          </p>
        </div>
      </aside>
    </div>
  )
}
