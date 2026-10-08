import AnalyzedCard, { Chances } from "./AnalyzedCard"
import { Badge, Button, Halos, MistralBadge, type Tone } from "./ui"

export interface AccueilActions {
  onOpenVerdict: () => void
  onVillerbanneVerdict: () => void
  onHospicesVerdict: () => void
  onMarkets: () => void
  onApplications: () => void
  onVeille: () => void
}

const kpis = [
  { label: "Candidatures déposées", value: "12", detail: "depuis janvier 2025", color: "var(--foreground)" },
  { label: "Taux de réussite", value: "33 %", detail: "4 gagnées · +12 pts vs 2024", color: "var(--ouvert)" },
  { label: "Montant remporté", value: "1,1 M€", detail: "sur 4 marchés", color: "var(--foreground)" },
  { label: "Nouvelles annonces", value: "7", detail: "pour vos secteurs cette semaine", color: "var(--primary)" },
]

// Hauteurs des barres en px (graphique Figma de 190 px)
const years = [
  { year: "2021", bars: [99, 16.5, 2] },
  { year: "2022", bars: [115.5, 22, 5.5] },
  { year: "2023", bars: [132, 33, 2] },
  { year: "2024", bars: [121, 38.5, 5.5] },
  { year: "2025", bars: [148.5, 49.5, 11] },
]
const barColors = ["var(--secondary)", "var(--ouvert)", "var(--mistral)"]

const sectors: { name: string; trend: string; tone: Tone; label: string }[] = [
  { name: "Nettoyage de bureaux", trend: "↗ s’ouvre", tone: "dispute", label: "Disputé" },
  { name: "Nettoyage scolaire", trend: "↗ s’ouvre", tone: "ouvert", label: "Ouvert" },
  { name: "Vitrerie", trend: "→ stable", tone: "ouvert", label: "Ouvert" },
  { name: "Nettoyage hospitalier", trend: "↘ se ferme", tone: "verrouille", label: "Verrouillé" },
  { name: "Collecte de déchets", trend: "→ stable", tone: "verrouille", label: "Verrouillé" },
]

const applications: {
  market: string
  buyer: string
  date: string
  tone: Tone
  result: string
  winner: string
  winnerIsYou?: boolean
  why: string
  highlighted?: boolean
}[] = [
  { market: "Nettoyage des bureaux", buyer: "Grand Lyon Habitat", date: "sept. 2025", tone: "verrouille", result: "Perdu", winner: "Propreté Rhône Services", why: "Note technique trop basse : 34/50 contre 44/50.", highlighted: true },
  { market: "Vitrerie des médiathèques", buyer: "Ville de Lyon", date: "juil. 2025", tone: "ouvert", result: "Gagné", winner: "Vous", winnerIsYou: true, why: "Meilleur prix et bonne note environnementale." },
  { market: "Nettoyage des écoles (lot 2)", buyer: "Ville de Bron", date: "juin 2025", tone: "ouvert", result: "Gagné", winner: "Vous", winnerIsYou: true, why: "Seule offre avec intervention en horaires décalés." },
  { market: "Entretien des gymnases", buyer: "Ville de Vaulx-en-Velin", date: "mai 2025", tone: "verrouille", result: "Perdu", winner: "Éclat Services", why: "Prix 11 % au-dessus de l’offre retenue." },
  { market: "Nettoyage du siège", buyer: "SYTRAL Mobilités", date: "oct. 2025", tone: "dispute", result: "En attente", winner: "—", why: "Résultat attendu fin novembre." },
]

const comparison = [
  { label: "Note technique", value: "34 vs 44 /50", tone: "var(--verrouille)", you: 286, winner: 370 },
  { label: "Note prix", value: "44 vs 42 /50", tone: "var(--ouvert)", you: 370, winner: 353 },
  { label: "Note finale", value: "78 vs 86 /100", tone: "var(--verrouille)", you: 328, winner: 361 },
]

const cardBase = "rounded-2xl border border-[var(--border)] bg-[var(--card)]"

/** Écran Figma « 01 — Accueil · Tableau de bord » (4:2). */
export default function Accueil(actions: AccueilActions) {
  return (
    <div className="op-font relative min-h-screen bg-[var(--background)] text-[color:var(--foreground)]">
      <Halos bottomHaloTop={1292.65} />
      <main className="relative mx-auto flex max-w-[1100px] flex-col gap-7 px-5 pb-20 pt-8 lg:px-0">
        {/* En-tête */}
        <section className="flex flex-col gap-1.5">
          <h1 className="text-[32px] font-bold leading-[1.25]">Bonjour Karim</h1>
          <p className="text-[15px] leading-[1.5] text-[color:var(--muted-foreground)]">
            Nettoyage de locaux&nbsp;&nbsp;·&nbsp;&nbsp;Rhône et Métropole de Lyon&nbsp;&nbsp;·&nbsp;&nbsp;Données mises à jour aujourd’hui
          </p>
        </section>

        {/* Indicateurs */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <div className="op-voile-carte flex min-h-[163px] flex-col gap-1.5 rounded-2xl p-6 text-[color:var(--primary)]">
            <p className="text-[13px] font-medium leading-[1.45]">Capacité à répondre</p>
            <p className="text-[40px] font-bold leading-[1.1]">74/100</p>
            <p className="text-[13px] leading-[1.45]">Santé financière solide</p>
          </div>
          {kpis.map((kpi) => (
            <div key={kpi.label} className={`${cardBase} flex min-h-[163px] flex-col gap-1.5 p-6`}>
              <p className="text-[13px] font-medium leading-[1.45] text-[color:var(--muted-foreground)]">{kpi.label}</p>
              <p className="text-[40px] font-bold leading-[1.1]" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
              <p className="text-[13px] leading-[1.45] text-[color:var(--muted-foreground)]">{kpi.detail}</p>
            </div>
          ))}
        </section>

        {/* Marché et secteurs */}
        <section className="flex flex-col gap-4 lg:flex-row">
          <div className={`${cardBase} flex min-w-0 flex-1 flex-col gap-4 p-7`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[16px] font-semibold leading-[1.4]">Évolution de mon marché</h2>
              <div className="flex flex-wrap gap-3.5">
                {["Marchés publiés", "Gagnés par des PME", "Mes victoires"].map((label, i) => (
                  <span key={label} className="flex items-center gap-1.5 text-[12px] leading-[1.4] text-[color:var(--muted-foreground)]">
                    <span className="size-2.5 rounded-[3px]" style={{ background: barColors[i] }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex h-[190px] items-end justify-between px-1">
              {years.map(({ year, bars }) => (
                <div key={year} className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1">
                    {bars.map((height, i) => (
                      <span
                        key={i}
                        className="w-[18px] rounded-t"
                        style={{ height, background: barColors[i] }}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] font-medium leading-[1.4] text-[color:var(--muted-foreground)]">{year}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-[var(--mistral-fond)] px-3.5 py-3">
              <span className="size-2.5 shrink-0 bg-[var(--mistral)]" />
              <p className="flex-1 text-[14px] leading-[1.5]">
                Le marché grossit (+50 % depuis 2021) et s’ouvre : la part des 3 premiers est passée de 71 % à 64 %.
              </p>
            </div>
          </div>
          <div className={`${cardBase} flex w-full flex-col gap-1 p-7 lg:w-[380px] lg:shrink-0`}>
            <h2 className="text-[16px] font-semibold leading-[1.4]">Mes secteurs</h2>
            {sectors.map((sector, i) => (
              <div
                key={sector.name}
                className={`flex items-center gap-2.5 py-3 ${i ? "border-t border-[var(--border)]" : ""}`}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="text-[14px] font-medium leading-[1.45]">{sector.name}</p>
                  <p className="text-[12px] leading-[1.4] text-[color:var(--muted-foreground)]">{sector.trend}</p>
                </div>
                <Badge tone={sector.tone}>{sector.label}</Badge>
              </div>
            ))}
          </div>
        </section>

        {/* Annonces pour vous */}
        <section className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[22px] font-bold leading-[1.3]">Annonces pour vous</h2>
            <button
              type="button"
              onClick={actions.onMarkets}
              className="text-[14px] font-medium leading-[1.45] text-[color:var(--primary)] hover:underline"
            >
              Triées par vos chances réelles →
            </button>
          </div>
          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_356px_minmax(0,1fr)]">
            <article className={`${cardBase} flex flex-col items-start gap-3 p-6 lg:min-h-[256px]`}>
              <div className="flex w-full items-center justify-between gap-3">
                <Badge tone="ouvert">Ouvert · 78/100</Badge>
                <span className="text-[12px] font-semibold leading-[1.4] whitespace-nowrap text-[color:var(--muted-foreground)]">Clôture J-12</span>
              </div>
              <h3 className="text-[16px] font-semibold leading-[1.4]">Nettoyage des groupes scolaires</h3>
              <p className="text-[13px] leading-[1.45] whitespace-pre text-[color:var(--muted-foreground)]">{"Ville de Villeurbanne  ·  480 k€"}</p>
              <Chances label="Foncez" color="#15803d" detail="Éligible · lot à votre taille" />
              <Button onClick={actions.onVillerbanneVerdict}>Voir le verdict</Button>
            </article>

            <AnalyzedCard onOpenVerdict={actions.onOpenVerdict} />

            <article className={`${cardBase} flex flex-col items-start gap-3 p-6 lg:min-h-[256px]`}>
              <div className="flex w-full items-center justify-between gap-3">
                <Badge tone="verrouille">Verrouillé · 16/100</Badge>
                <span className="text-[12px] font-semibold leading-[1.4] whitespace-nowrap text-[color:var(--muted-foreground)]">Clôture J-9</span>
              </div>
              <h3 className="text-[16px] font-semibold leading-[1.4]">Nettoyage du centre hospitalier</h3>
              <p className="text-[13px] leading-[1.45] whitespace-pre text-[color:var(--muted-foreground)]">{"Hospices Civils de Lyon  ·  3,8 M€"}</p>
              <Chances label="Passez votre tour" color="#b91c1c" detail="CA exigé supérieur au vôtre" />
              <Button variant="soft" onClick={actions.onHospicesVerdict}>Voir pourquoi</Button>
            </article>
          </div>
        </section>

        {/* Encart service — Veille+ */}
        <section className="op-bloc-fort flex flex-col items-stretch gap-8 rounded-[20px] p-8 md:flex-row md:items-center">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
            <span className="rounded-full bg-[var(--secondary)] px-2.5 py-1 text-[11px] font-semibold leading-[1.3] tracking-[0.66px] text-[color:var(--primary)]">
              NOUVEAU SERVICE · VEILLE+
            </span>
            <h2 className="text-[22px] font-bold leading-[1.3] text-[color:var(--sur-grad)]">
              Soyez prévenu quand un concurrent fragilise sa position
            </h2>
            {[
              "Procédures collectives, cessions et radiations de vos concurrents (BODACC)",
              "Dégradation des comptes annuels publiés",
              "Vérification continue de vos propres motifs d’exclusion",
            ].map((item) => (
              <p key={item} className="flex w-full items-center gap-2.5 text-[14px]">
                <span className="font-semibold leading-[1.45] text-[color:var(--ouvert-fond)]">✓</span>
                <span className="flex-1 leading-[1.5] text-[color:var(--secondary)]">{item}</span>
              </p>
            ))}
            <p className="text-[12px] leading-[1.4] text-[color:var(--secondary)]">
              Uniquement des sources officielles, au niveau des entreprises. Jamais de données sur les personnes.
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-3 rounded-2xl bg-[var(--card)] p-6 md:w-[280px] md:shrink-0">
            <p className="text-[12px] font-medium leading-[1.4] text-[color:var(--muted-foreground)]">Cette semaine pour vous</p>
            <p className="flex items-baseline gap-1.5">
              <span className="text-[40px] font-bold leading-[1.1] text-[color:var(--dispute)]">2</span>
              <span className="text-[14px] font-medium leading-[1.45] text-[color:var(--muted-foreground)]">signaux</span>
            </p>
            <p className="text-center text-[13px] leading-[1.45] text-[color:var(--muted-foreground)]">
              sur le titulaire d’un marché que vous visez
            </p>
            <Button onClick={actions.onVeille} className="w-full">
              Activer Veille+ · 30 jours offerts
            </Button>
          </div>
        </section>

        {/* Mes candidatures */}
        <section className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[22px] font-bold leading-[1.3]">Mes candidatures</h2>
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={actions.onApplications}
                className="text-[14px] font-medium leading-[1.45] text-[color:var(--primary)] underline"
              >
                Voir les 12 candidatures →
              </button>
              <Button variant="outline">+ Ajouter une lettre de rejet</Button>
            </div>
          </div>
          <div className={`${cardBase} overflow-x-auto`}>
            <table className="w-full min-w-[960px] border-collapse text-left">
              <thead className="bg-[var(--background)]">
                <tr className="text-[11px] font-semibold leading-[1.3] tracking-[0.66px] text-[color:var(--muted-foreground)]">
                  <th className="w-[270px] py-3 pl-5 pr-4 font-semibold">MARCHÉ</th>
                  <th className="w-[176px] py-3 pr-4 font-semibold">ACHETEUR</th>
                  <th className="w-[106px] py-3 pr-4 font-semibold">DÉPOSÉE</th>
                  <th className="w-[126px] py-3 pr-4 font-semibold">RÉSULTAT</th>
                  <th className="w-[206px] py-3 pr-4 font-semibold">ATTRIBUTAIRE</th>
                  <th className="py-3 pr-5 font-semibold">POURQUOI (MISTRAL)</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((row) => (
                  <tr
                    key={row.market}
                    className={`border-t border-[var(--border)] align-middle ${row.highlighted ? "bg-[var(--secondary)]" : ""}`}
                  >
                    <td className="py-4 pl-5 pr-4 text-[14px] font-semibold leading-[1.45]">{row.market}</td>
                    <td className="py-4 pr-4 text-[13px] leading-[1.45] text-[color:var(--muted-foreground)]">{row.buyer}</td>
                    <td className="py-4 pr-4 text-[13px] leading-[1.45] whitespace-nowrap text-[color:var(--muted-foreground)]">{row.date}</td>
                    <td className="py-4 pr-4"><Badge tone={row.tone}>{row.result}</Badge></td>
                    <td
                      className={`py-4 pr-4 text-[13px] ${
                        row.winnerIsYou ? "font-semibold leading-[1.4] text-[color:var(--ouvert)]" : "leading-[1.45]"
                      }`}
                    >
                      {row.winner}
                    </td>
                    <td className="py-4 pr-5 text-[13px] leading-[1.45]">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Analyse de défaite */}
          <article className="flex flex-col gap-5 rounded-2xl border-2 border-[var(--primary)] bg-[var(--card)] p-8">
            <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-[22px] font-bold leading-[1.3]">Pourquoi j’ai perdu : Nettoyage des bureaux</h3>
                <p className="text-[14px] leading-[1.5] text-[color:var(--muted-foreground)]">
                  Grand Lyon Habitat&nbsp;&nbsp;·&nbsp;&nbsp;Attribué à Propreté Rhône Services, titulaire sortant
                </p>
              </div>
              <MistralBadge>Analysé par Mistral à partir de la lettre de rejet</MistralBadge>
            </div>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex w-full flex-col gap-3.5 md:w-[420px] md:shrink-0">
                <div className="flex gap-4">
                  {[
                    ["Vous", "var(--mistral)"],
                    ["Gagnant", "var(--primary)"],
                  ].map(([label, color]) => (
                    <span key={label} className="flex items-center gap-1.5 text-[12px] font-medium leading-[1.4] text-[color:var(--muted-foreground)]">
                      <span className="size-2.5 rounded-[3px]" style={{ background: color }} />
                      {label}
                    </span>
                  ))}
                </div>
                {comparison.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[14px] leading-[1.45] whitespace-nowrap">
                      <span className="font-medium">{item.label}</span>
                      <span className="font-semibold" style={{ color: item.tone }}>{item.value}</span>
                    </div>
                    {[
                      [item.you, "var(--mistral)"],
                      [item.winner, "var(--primary)"],
                    ].map(([width, color], i) => (
                      <div key={i} className="h-2 overflow-hidden rounded-full bg-[var(--border)]">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${((width as number) / 420) * 100}%`, background: color as string }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                {[
                  ["POURQUOI", "var(--muted-foreground)", "Votre prix était meilleur (+2 points), mais l’écart s’est fait sur la technique : méthodologie jugée « générique » et absence de plan de continuité en cas d’absence du personnel."],
                  ["COMMENT LE GAGNANT A FAIT", "var(--muted-foreground)", "Il a détaillé un planning site par site, proposé des produits écolabellisés et s’est appuyé sur sa connaissance des bâtiments en tant que titulaire sortant."],
                  ["POUR LA PROCHAINE FOIS", "var(--primary)", "Ajoutez un mémoire technique adapté à chaque site et un plan de remplacement. Le marché revient en 2029 : nous vous préviendrons 6 mois avant."],
                ].map(([title, color, text]) => (
                  <div key={title} className="flex flex-col gap-1">
                    <p className="text-[11px] font-semibold leading-[1.3] tracking-[0.66px]" style={{ color }}>{title}</p>
                    <p className="text-[15px] leading-[1.5]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}
