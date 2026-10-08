import ProductHeader, { type ProductScreen } from "./ProductHeader"
import { marketNotices } from "../mockData"

interface MarketListProps {
  onNavigate: (screen: ProductScreen) => void
  onAnalyze: () => void
}

const statusClasses: Record<string, string> = {
  Ouvert: "bg-success-soft text-success",
  Disputé: "bg-warning-soft text-warning-dark",
  Verrouillé: "bg-danger-soft text-danger-dark",
}

export default function MarketList({ onNavigate, onAnalyze }: MarketListProps) {
  return (
    <main className="mx-auto min-h-screen max-w-[1260px] px-5 py-8 sm:px-8">
      <ProductHeader active="markets" onNavigate={onNavigate} />
      <section className="mt-7">
        <h1 className="text-[32px] font-bold leading-tight">
          Quel marché voulez-vous analyser ?
        </h1>
        <p className="mt-1.5 text-[15px] text-muted">
          Les avis publiés au BOAMP, filtrés pour votre entreprise. Aucune
          saisie : les données viennent directement des sources officielles.
        </p>
      </section>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Secteur", "Nettoyage de locaux"],
          ["Territoire", "Rhône (69)"],
          ["Acheteur", "Tous"],
          ["Montant", "Tous"],
        ].map(([label, value]) => (
          <button
            key={label}
            type="button"
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-left"
          >
            <span className="block text-xs font-medium text-muted">
              {label}
            </span>
            <span className="mt-0.5 block text-sm font-semibold">
              {value} <span className="text-xs">⌄</span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-muted">
        <img src="/assets/68838.svg" width="8" height="8" alt="" />
        BOAMP synchronisé il y a 2 h · 12 avis correspondent · triés par vos
        chances
      </div>
      <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-white">
        {marketNotices.map((notice, index) => (
          <article
            key={notice.id}
            className={`flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center ${
              index ? "border-t border-line" : ""
            } ${notice.id === "avis-lyon" ? "bg-primary-soft" : ""}`}
          >
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold">{notice.title}</h2>
              <p className="mt-1 text-[13px] text-muted">{notice.meta}</p>
            </div>
            <span
              className={`w-fit rounded-full px-3 py-1 text-[13px] font-semibold ${statusClasses[notice.status]}`}
            >
              {notice.status === "Ouvert"
                ? "✓"
                : notice.status === "Disputé"
                  ? "!"
                  : "×"}{" "}
              {notice.status} · {notice.score}
            </span>
            <div className="w-44">
              <p className="text-xs font-medium text-muted">Vos chances</p>
              <p
                className={`text-[13px] font-semibold ${
                  notice.status === "Ouvert"
                    ? "text-success"
                    : notice.status === "Disputé"
                      ? "text-warning-dark"
                      : "text-danger-dark"
                }`}
              >
                {notice.chance}
              </p>
            </div>
            <button
              type="button"
              onClick={notice.id === "avis-lyon" ? onAnalyze : undefined}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              Analyser
            </button>
          </article>
        ))}
      </div>
      <p className="mt-7 text-center text-[13px] text-muted">
        Marché absent du BOAMP ?{" "}
        <button type="button" className="font-semibold text-primary">
          Analyser un avis hors BOAMP
        </button>
      </p>
    </main>
  )
}
