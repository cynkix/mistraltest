import ProductHeader, { type ProductScreen } from "./ProductHeader"

interface CompanyProfileProps {
  onNavigate: (screen: ProductScreen) => void
}

const scoreParts = [
  {
    label: "Santé financière",
    value: "88",
    width: "88%",
    color: "bg-success",
    text: "text-success",
    detail: "Rentable, en croissance, fonds propres solides",
  },
  {
    label: "Éligibilité (bloquant)",
    value: "Conforme",
    width: "100%",
    color: "bg-success",
    text: "text-success",
    detail: "Certifications et attestations à jour",
  },
  {
    label: "Capacité opérationnelle",
    value: "70",
    width: "70%",
    color: "bg-primary",
    text: "text-primary",
    detail: "Environ 6 salariés mobilisables sur un nouveau contrat",
  },
  {
    label: "Références publiques",
    value: "44",
    width: "44%",
    color: "bg-mistral",
    text: "text-mistral",
    detail: "2 marchés publics similaires : c’est votre point faible",
  },
]

export default function CompanyProfile({ onNavigate }: CompanyProfileProps) {
  return (
    <main className="mx-auto min-h-screen max-w-[1260px] px-5 pb-20 pt-8 sm:px-8">
      <ProductHeader active="company" onNavigate={onNavigate} />
      <div className="mt-8">
        <section className="flex flex-col gap-7 rounded-[20px] border border-line bg-white p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-[32px] font-bold leading-tight">
              Brillance Lyon PME
            </h1>
            <p className="mt-2 text-[15px] text-muted">
              SIRET 812 345 678 00021 · Nettoyage de locaux (NAF 81.21Z) ·
              Villeurbanne
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "35 salariés",
                "Créée en 2011",
                "PME",
                "3 sites d’intervention dans le Rhône",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-canvas px-3 py-1.5 text-[13px] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              Identité préremplie à partir du SIRET (API Recherche
              d’entreprises)
            </p>
          </div>
          <div className="rounded-2xl bg-primary-soft px-7 py-6 text-center text-primary">
            <p className="text-xs font-semibold uppercase tracking-wide">
              Capacité à répondre
            </p>
            <p className="mt-1 text-6xl font-bold leading-none">
              74<span className="text-xl font-medium">/100</span>
            </p>
            <p className="mt-3 text-sm">Bonne : marchés jusqu’à 700 k€/an</p>
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-[22px] font-bold">Ce qui compose votre score</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {scoreParts.map((part) => (
              <article
                key={part.label}
                className="rounded-2xl border border-line bg-white p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">{part.label}</h3>
                  <strong className={`text-[22px] ${part.text}`}>
                    {part.value}
                  </strong>
                </div>
                <div className="mt-3 h-2 rounded-full bg-line">
                  <div
                    className={`h-2 rounded-full ${part.color}`}
                    style={{ width: part.width }}
                  />
                </div>
                <p className="mt-3 text-[13px] leading-5 text-muted">
                  {part.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-7 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <article className="rounded-2xl border border-line bg-white p-7">
            <h2 className="font-semibold">Santé financière</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[460px] text-sm">
                <thead className="text-xs text-muted">
                  <tr>
                    <th className="py-2 text-left font-medium" />
                    <th className="py-2 text-right font-medium">2022</th>
                    <th className="py-2 text-right font-medium">2023</th>
                    <th className="py-2 text-right font-medium">2024</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Chiffre d’affaires", "1,84 M€", "1,97 M€", "2,10 M€"],
                    ["Résultat net", "92 k€", "110 k€", "130 k€"],
                    ["Marge nette", "5,0 %", "5,6 %", "6,2 %"],
                    ["Fonds propres", "410 k€", "480 k€", "560 k€"],
                    ["Premier client / CA", "22 %", "19 %", "17 %"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-line">
                      <td className="py-4">{row[0]}</td>
                      {row.slice(1).map((value, index) => (
                        <td
                          key={value}
                          className={`py-4 text-right ${
                            index === 2 ? "font-semibold" : ""
                          }`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              Comptes 2024 saisis par l’entreprise. Aucune dépendance excessive
              à un client.
            </p>
          </article>

          <div className="space-y-4">
            <article className="rounded-2xl border border-line bg-white p-7">
              <h2 className="font-semibold">Certifications et références</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "✓ Qualipropre",
                  "✓ ISO 14001",
                  "✓ Écolabel produits",
                  "✓ Attestation URSSAF à jour",
                  "✓ Aucun motif d’exclusion (BODACC, Sirene)",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-success-soft px-3 py-1 text-[13px] font-semibold text-success"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <p>
                  <strong>Nettoyage des écoles (lot 2)</strong>
                  <br />
                  <span className="text-xs text-muted">
                    Ville de Bron · 2025
                  </span>
                </p>
                <p>
                  <strong>Vitrerie des médiathèques</strong>
                  <br />
                  <span className="text-xs text-muted">
                    Ville de Lyon · 2025
                  </span>
                </p>
              </div>
              <button className="mt-4 rounded-xl border border-line px-4 py-2 text-[13px] font-semibold">
                + Ajouter une référence
              </button>
            </article>
            <article className="rounded-2xl bg-mistral-soft p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-mistral">
                <span className="mr-2 inline-block size-2.5 bg-mistral" />
                Comment les acheteurs vous voient · Mistral
              </p>
              <p className="mt-3 text-sm leading-6">
                Un prestataire local, rentable et certifié, crédible sur des
                marchés jusqu’à 700 k€ par an. Pour viser plus gros, il vous
                manque surtout des références publiques : visez 2 petits marchés
                cette année ou entrez en groupement.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
