import { Badge, Halos } from "./ui"

const card = "rounded-2xl border border-[var(--border)] bg-[var(--card)]"

const pillars = [
  { title: "Santé financière", value: "88", color: "var(--ouvert)", width: 194, text: "Rentable, en croissance, fonds propres solides" },
  { title: "Éligibilité (bloquant)", value: "Conforme", color: "var(--ouvert)", width: 217, text: "Certifications et attestations à jour", small: true },
  { title: "Capacité opérationnelle", value: "70", color: "var(--primary)", width: 154, text: "Environ 6 salariés mobilisables sur un nouveau contrat" },
  { title: "Références publiques", value: "44", color: "var(--dispute)", width: 95, text: "2 marchés publics similaires : c’est votre point faible" },
]

const finance = [
  ["Chiffre d’affaires", "1,84 M€", "1,97 M€", "2,10 M€"],
  ["Résultat net", "92 k€", "110 k€", "130 k€"],
  ["Marge nette", "5,0 %", "5,6 %", "6,2 %"],
  ["Fonds propres", "410 k€", "480 k€", "560 k€"],
  ["Premier client / CA", "22 %", "19 %", "17 %"],
]

const certifications = [
  "Qualipropre",
  "ISO 14001",
  "Écolabel produits",
  "Attestation URSSAF à jour",
  "Aucun motif d’exclusion (BODACC, Sirene)",
]

/** Écran Figma « 05 — Mon entreprise » (6:113). */
export default function MonEntreprise() {
  return (
    <div className="op-font relative min-h-screen bg-[var(--background)] text-[color:var(--foreground)]">
      <Halos />
      <main className="relative mx-auto flex max-w-[1100px] flex-col gap-7 px-5 pb-20 pt-8 lg:px-0">
        {/* Profil */}
        <section className="flex flex-col gap-10 rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-9 md:flex-row md:items-center">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h1 className="text-[32px] font-bold leading-[1.25]">Brillance Lyon PME</h1>
            <p className="text-[14px] text-[color:var(--muted-foreground)]">
              SIRET 812 345 678 00021&nbsp;&nbsp;·&nbsp;&nbsp;Nettoyage de locaux (NAF 81.21Z)&nbsp;&nbsp;·&nbsp;&nbsp;Villeurbanne
            </p>
            <div className="flex flex-wrap gap-2 pt-1.5">
              {["35 salariés", "Créée en 2011", "PME", "3 sites d’intervention dans le Rhône"].map((tag) => (
                <span key={tag} className="rounded-full bg-[var(--background)] px-3 py-1.5 text-[13px] font-medium">{tag}</span>
              ))}
            </div>
            <p className="text-[12px] text-[color:var(--muted-foreground)]">Identité préremplie à partir du SIRET (API Recherche d’entreprises)</p>
          </div>
          <div className="flex w-full flex-col gap-1.5 rounded-2xl bg-[var(--secondary)] p-6 text-[color:var(--primary)] md:w-[265px] md:shrink-0">
            <p className="text-[11px] font-semibold tracking-[0.66px]">CAPACITÉ À RÉPONDRE</p>
            <p className="flex items-baseline gap-0.5">
              <span className="text-[64px] font-bold leading-none">74</span>
              <span className="text-[18px]">/100</span>
            </p>
            <p className="text-[13px] font-medium">Bonne : marchés jusqu’à 700 k€/an</p>
          </div>
        </section>

        {/* Composantes du score */}
        <section className="flex flex-col gap-3.5">
          <h2 className="text-[22px] font-bold leading-[1.3]">Ce qui compose votre score</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className={`${card} flex flex-col gap-2.5 p-5`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[14px] font-semibold">{p.title}</p>
                  <p className={`${p.small ? "text-[14px] font-semibold" : "text-[22px] font-bold leading-[1.3]"}`} style={{ color: p.color }}>
                    {p.value}
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">
                  <div className="h-2 rounded-full" style={{ width: `${(p.width / 221) * 100}%`, background: p.color }} />
                </div>
                <p className="text-[13px] text-[color:var(--muted-foreground)]">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Détails */}
        <section className="grid items-start gap-4 lg:grid-cols-[571px_1fr]">
          <div className={`${card} flex flex-col gap-3 p-7`}>
            <h2 className="text-[16px] font-semibold">Santé financière</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left">
                <thead>
                  <tr className="text-[11px] font-semibold tracking-[0.66px] text-[color:var(--muted-foreground)]">
                    <th className="py-2 font-semibold" />
                    {["2022", "2023", "2024"].map((y) => (
                      <th key={y} className="w-20 py-2 font-semibold">{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {finance.map(([label, ...values], i) => (
                    <tr key={label} className={i ? "border-t border-[var(--border)]" : ""}>
                      <td className="py-2 text-[14px]">{label}</td>
                      {values.map((v, j) => (
                        <td key={j} className={`py-2 text-[14px] ${j === 2 ? "font-semibold" : ""}`}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-[color:var(--muted-foreground)]">
              Comptes 2024 saisis par l’entreprise. Aucune dépendance excessive à un client.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className={`${card} flex flex-col items-start gap-3 p-7`}>
              <h2 className="text-[16px] font-semibold">Certifications et références</h2>
              <div className="flex flex-wrap gap-2">
                {certifications.map((c) => (
                  <Badge key={c} tone="ouvert">{c}</Badge>
                ))}
              </div>
              {[
                ["Nettoyage des écoles (lot 2)", "Ville de Bron · 2025"],
                ["Vitrerie des médiathèques", "Ville de Lyon · 2025"],
              ].map(([title, meta]) => (
                <div key={title} className="flex flex-col gap-0.5">
                  <p className="text-[14px] font-medium">{title}</p>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">{meta}</p>
                </div>
              ))}
              <button type="button" className="rounded-xl border border-[var(--border)] px-3.5 py-2 text-[13px] font-semibold hover:bg-[var(--background)]">
                + Ajouter une référence
              </button>
            </div>
            <div className="flex flex-col gap-2.5 rounded-2xl bg-[var(--mistral-fond)] p-6">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.66px] text-[color:var(--mistral)]">
                <span className="size-2.5 bg-[var(--mistral)]" />
                COMMENT LES ACHETEURS VOUS VOIENT · MISTRAL
              </p>
              <p className="text-[14px] leading-[1.5]">
                Un prestataire local, rentable et certifié, crédible sur des marchés jusqu’à 700 k€ par an. Pour viser plus gros, il vous manque surtout des références publiques : visez 2 petits marchés cette année ou entrez en groupement.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
