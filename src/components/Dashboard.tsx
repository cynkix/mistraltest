import {
  applications,
  dashboardKpis,
  marketNotices,
  sectors,
} from "../mockData"
import ProductHeader, { type ProductScreen } from "./ProductHeader"

interface DashboardProps {
  onNavigate: (screen: ProductScreen) => void
  onVerdict: () => void
}

const statusClass: Record<string, string> = {
  Ouvert: "bg-success-soft text-success",
  Disputé: "bg-warning-soft text-warning-dark",
  Verrouillé: "bg-danger-soft text-danger-dark",
}

export default function Dashboard({ onNavigate, onVerdict }: DashboardProps) {
  return (
    <main className="mx-auto min-h-screen max-w-[1260px] px-5 py-8 sm:px-8">
      <ProductHeader active="dashboard" onNavigate={onNavigate} />

      <section className="mt-7">
        <h1 className="text-[32px] font-bold leading-tight">Bonjour Karim</h1>
        <p className="mt-1.5 text-[15px] text-muted">
          Nettoyage de locaux · Rhône et Métropole de Lyon · Données mises à
          jour aujourd’hui
        </p>
      </section>

      <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {dashboardKpis.map((kpi) => (
          <article
            key={kpi.label}
            className={`min-h-40 rounded-2xl p-6 ${
              kpi.featured
                ? "bg-primary-soft text-primary"
                : "border border-line bg-white"
            }`}
          >
            <p
              className={`text-[13px] font-medium ${
                kpi.featured ? "" : "text-muted"
              }`}
            >
              {kpi.label}
            </p>
            <p
              className={`mt-1.5 text-[40px] font-bold leading-[1.1] ${
                kpi.positive ? "text-success" : ""
              }`}
            >
              {kpi.value}
            </p>
            <p
              className={`mt-2 text-[13px] ${kpi.featured ? "" : "text-muted"}`}
            >
              {kpi.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.75fr_1fr]">
        <article className="rounded-2xl border border-line bg-white p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">Évolution de mon marché</h2>
            <div className="flex flex-wrap gap-3 text-[11px] text-muted">
              <span>
                <i className="mr-1 inline-block size-2 rounded-sm bg-primary-soft" />
                Marchés publiés
              </span>
              <span>
                <i className="mr-1 inline-block size-2 rounded-sm bg-success" />
                Gagnés par des PME
              </span>
              <span>
                <i className="mr-1 inline-block size-2 rounded-sm bg-mistral" />
                Mes victoires
              </span>
            </div>
          </div>
          <div className="mt-8 flex h-44 items-end justify-around gap-5 border-b border-line px-3">
            {[72, 82, 90, 84, 105].map((height, index) => (
              <div
                key={height}
                className="flex h-full flex-1 items-end justify-center gap-1"
              >
                <span
                  className="w-5 rounded-t bg-primary-soft"
                  style={{ height }}
                />
                <span
                  className="w-5 rounded-t bg-success"
                  style={{ height: height * 0.28 }}
                />
                <span
                  className="w-5 rounded-t bg-mistral"
                  style={{ height: index > 0 ? 5 : 0 }}
                />
                <span className="absolute mt-7 translate-y-7 text-[11px] text-muted">
                  {2021 + index}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-mistral-soft p-4 text-[13px]">
            <span className="mr-2 inline-block size-2 bg-mistral" />
            <strong>Le marché grossit</strong> (+50 % depuis 2021) et s’ouvre :
            la part des 3 premiers est passée de 71 % à 64 %.
          </div>
        </article>

        <article className="rounded-2xl border border-line bg-white p-7">
          <h2 className="font-semibold">Mes secteurs</h2>
          <div className="mt-4 divide-y divide-line">
            {sectors.map((sector) => (
              <div
                key={sector.label}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{sector.label}</p>
                  <p className="text-xs text-muted">{sector.detail}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[sector.status]}`}
                >
                  {sector.status === "Ouvert"
                    ? "✓"
                    : sector.status === "Disputé"
                      ? "!"
                      : "×"}{" "}
                  {sector.status}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-7">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold">Annonces pour vous</h2>
          <button
            type="button"
            onClick={() => onNavigate("markets")}
            className="text-[13px] font-semibold text-primary"
          >
            Triées par vos chances réelles →
          </button>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {marketNotices.slice(0, 3).map((notice) => (
            <article
              key={notice.id}
              className="rounded-2xl border border-line bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[notice.status]}`}
                >
                  {notice.status} · {notice.score}/100
                </span>
                <span className="text-[11px] text-muted">Clôture J-21</span>
              </div>
              <h3 className="mt-4 font-semibold">{notice.title}</h3>
              <p className="mt-1 text-xs text-muted">
                {notice.meta.split("·").slice(0, 2).join("·")}
              </p>
              <div className="mt-4 rounded-xl bg-canvas px-3 py-2 text-xs">
                <span className="text-muted">Vos chances : </span>
                <strong
                  className={
                    notice.status === "Ouvert"
                      ? "text-success"
                      : "text-warning-dark"
                  }
                >
                  {notice.chance}
                </strong>
              </div>
              <button
                type="button"
                onClick={notice.id === "avis-lyon" ? onVerdict : undefined}
                className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
              >
                Voir le verdict
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-2xl bg-primary p-7 text-white sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_280px] md:items-center">
          <div>
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-primary">
              NOUVEAU SERVICE · VEILLE
            </span>
            <h2 className="mt-4 text-[22px] font-bold">
              Soyez prévenu quand un concurrent fragilise sa position
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              <li>✓ Procédures collectives, cessions et radiations</li>
              <li>✓ Dégradation des comptes annuels publiés</li>
              <li>✓ Vérification continue de vos propres motifs d’exclusion</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center text-ink">
            <p className="text-xs text-muted">Cette semaine pour vous</p>
            <p className="mt-2 text-[40px] font-bold text-mistral">2</p>
            <p className="text-xs text-muted">
              signaux sur le titulaire d’un marché que vous visez
            </p>
            <button
              type="button"
              className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              Activer Veille · 30 jours offerts
            </button>
          </div>
        </div>
      </section>

      <section id="applications" className="mt-7">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[22px] font-bold">Mes candidatures</h2>
          <button className="rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold">
            + Ajouter une lettre de rejet
          </button>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[850px] text-left text-[13px]">
            <thead className="bg-canvas text-[11px] uppercase tracking-wide text-muted">
              <tr>
                {[
                  "Marché",
                  "Acheteur",
                  "Déposé",
                  "Résultat",
                  "Attributaire",
                  "Pourquoi (Mistral)",
                ].map((heading) => (
                  <th key={heading} className="px-5 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.market} className="border-t border-line">
                  <td className="px-5 py-4 font-semibold">
                    {application.market}
                  </td>
                  <td className="px-5 py-4 text-muted">{application.buyer}</td>
                  <td className="px-5 py-4 text-muted">{application.date}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        application.result === "Gagné"
                          ? "bg-success-soft text-success"
                          : "bg-danger-soft text-danger-dark"
                      }`}
                    >
                      {application.result}
                    </span>
                  </td>
                  <td className="px-5 py-4">{application.winner}</td>
                  <td className="px-5 py-4">{application.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border-2 border-primary bg-white p-7">
        <h2 className="text-[22px] font-bold">
          Pourquoi j’ai perdu : Nettoyage des bureaux
        </h2>
        <p className="mt-1 text-sm text-muted">
          Grand Lyon Habitat · Attribué à Propreté Rhône Services, titulaire
          sortant
        </p>
        <div className="mt-6 grid gap-7 md:grid-cols-2">
          <div className="space-y-4">
            {[
              ["Note technique", "34 vs 44 /50", 68],
              ["Note prix", "44 vs 42 /50", 88],
              ["Note finale", "78 vs 86 /100", 78],
            ].map(([label, value, width]) => (
              <div key={String(label)}>
                <div className="flex justify-between text-sm font-medium">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-line">
                  <div
                    className="h-2 rounded-full bg-mistral"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4 text-sm leading-6">
            <p>
              <strong>Pourquoi :</strong> votre prix était meilleur, mais
              l’écart s’est fait sur la technique : méthodologie jugée «
              générique » et absence de plan de continuité.
            </p>
            <p>
              <strong>Comment le gagnant a fait :</strong> réactivité et
              planning site par site, proposés par le titulaire sortant.
            </p>
            <p className="text-primary">
              <strong>Pour la prochaine fois :</strong> ajoutez un mémoire
              technique adapté à chaque site.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
