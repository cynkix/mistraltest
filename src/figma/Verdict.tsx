import { useState } from "react"
import { Badge, Button, Halos, MistralBadge } from "./ui"
import { verdictLabels, verdicts, type Component, type Requirement, type VerdictId } from "./verdicts"

export interface VerdictActions {
  onBack: () => void
  onDecisionNote: () => void
  onVeille: () => void
}

const card = "rounded-2xl border border-[var(--border)] bg-[var(--card)]"
const label11 = "text-[11px] font-semibold leading-[1.3] tracking-[0.66px] text-[color:var(--muted-foreground)]"
const sourceLink = "text-[13px] font-medium leading-[1.45] text-[color:var(--primary)] hover:underline"

const kindColors = {
  coup: { bg: "var(--dispute-fond)", fg: "var(--dispute)" },
  foncez: { bg: "var(--ouvert-fond)", fg: "var(--ouvert)" },
  renforcez: { bg: "var(--secondary)", fg: "var(--primary)" },
  passez: { bg: "var(--verrouille-fond)", fg: "var(--verrouille)" },
}

/** Écrans Figma « 04 — Verdict » (1:18) et ses trois variantes (2025:429, 2025:911, 2025:1393). */
export default function Verdict({ id, ...actions }: { id: VerdictId } & VerdictActions) {
  const v = verdicts[id]
  const kind = verdictLabels[v.kind]
  const colors = kindColors[v.kind]

  return (
    <div className="op-font relative min-h-screen bg-[var(--background)] text-[color:var(--foreground)]">
      <Halos bottomHaloTop={v.full ? 2525.2 : 1393.85} />
      <main className="relative mx-auto flex max-w-[1100px] flex-col gap-8 px-5 pb-20 pt-8 lg:px-0">
        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={actions.onBack}>← Analyser un autre marché</Button>
          <Button onClick={actions.onDecisionNote}>Note de décision</Button>
        </div>

        {/* Contexte */}
        <section className="flex flex-col gap-1.5">
          <p className="text-[12px] font-semibold leading-[1.4] text-[color:var(--muted-foreground)]">APPEL D’OFFRES ANALYSÉ</p>
          <h1 className="text-[32px] font-bold leading-[1.25]">{v.title}</h1>
          <p className="text-[16px] leading-[1.5] whitespace-pre-wrap text-[color:var(--muted-foreground)]">{v.context}</p>
        </section>

        {/* Double verdict */}
        <section
          className="op-voile-carte flex flex-col items-center gap-12 rounded-[20px] border border-[var(--border)] p-6 md:p-10 lg:flex-row"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22), 0 18px 40px -24px rgba(20,41,110,0.3)" }}
        >
          <Matrix marker={v.marker} />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
            <p className="text-[12px] font-semibold leading-[1.4] text-[color:var(--muted-foreground)]">NOTRE VERDICT</p>
            <span className="inline-flex items-center gap-2.5 rounded-full px-4 py-2.5" style={{ background: colors.bg }}>
              <span
                className="grid size-6 place-items-center rounded-full text-[13px] font-semibold leading-[1.4] text-[color:var(--card)]"
                style={{ background: colors.fg }}
              >
                {kind.icon}
              </span>
              <span className="text-[26px] font-bold leading-[1.25] whitespace-nowrap" style={{ color: colors.fg }}>
                {kind.label}
              </span>
            </span>
            <div className="flex flex-wrap gap-8">
              {[
                [v.opening, "Ouverture du marché"],
                [v.capacity, "Capacité de votre entreprise"],
              ].map(([value, text]) => (
                <div key={text} className="flex flex-col gap-0.5">
                  <span className="text-[26px] font-bold leading-[1.25]">{value}/100</span>
                  <span className="text-[13px] font-medium leading-[1.45] text-[color:var(--muted-foreground)]">{text}</span>
                </div>
              ))}
            </div>
            <MistralBadge>Rédigé par Mistral</MistralBadge>
            <p className="text-[18px] leading-[1.5]">{v.summary}</p>
          </div>
        </section>

        {/* Comment ces scores sont calculés */}
        <section className={`${card} flex flex-col gap-5 p-6 md:p-8`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h2 className="text-[18px] font-bold leading-[1.35]">Comment ces scores sont calculés</h2>
              <p className="text-[13px] leading-[1.45] text-[color:var(--muted-foreground)]">
                Calcul déterministe sur les données publiques. Mistral classe les marchés et rédige, il ne calcule pas les scores.
              </p>
            </div>
            <div className="flex gap-1.5">
              {["DECP 2021-2025", "BOAMP", "Sirene"].map((source) => (
                <span key={source} className={`${label11} rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 whitespace-nowrap`}>
                  {source}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ScoreColumn title="Ouverture du marché" score={v.opening} components={v.openingComponents}>
              <div className="flex flex-col gap-1 text-[12px] font-medium leading-[1.4] text-[color:var(--muted-foreground)]">
                <p>Seuils : moins de 35 = Verrouillé · 35 à 65 = Disputé · plus de 65 = Ouvert</p>
                <p>Périmètre : même acheteur, même famille d’achats, 2021-2025</p>
              </div>
            </ScoreColumn>
            <ScoreColumn
              title="Capacité de votre entreprise"
              score={v.capacity}
              components={v.capacityComponents}
              before={
                <div
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5"
                  style={{ background: v.eligibility.ok ? "var(--ouvert-fond)" : "var(--verrouille-fond)" }}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-[1.4]">
                    <p
                      className="text-[13px] font-semibold"
                      style={{ color: v.eligibility.ok ? "var(--ouvert)" : "var(--verrouille)" }}
                    >
                      Éligibilité : critère bloquant
                    </p>
                    <p className="text-[12px]">{v.eligibility.text}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold leading-[1.4] text-[color:var(--card)]"
                    style={{ background: v.eligibility.ok ? "var(--ouvert)" : "var(--verrouille)" }}
                  >
                    {v.eligibility.ok ? "Conforme" : "Bloquant"}
                  </span>
                </div>
              }
            >
              <p className="text-[12px] font-medium leading-[1.4] text-[color:var(--muted-foreground)]">Matrice : seuil à 50 sur chaque axe</p>
            </ScoreColumn>
          </div>
        </section>

        {v.full && <MarketPart onVeille={actions.onVeille} />}

        {/* Pouvez-vous le gagner ? */}
        <section className="flex flex-col gap-4">
          <div className={`flex flex-col gap-1 ${v.full ? "pt-4" : ""}`}>
            <h2 className="text-[26px] font-bold leading-[1.25]">{v.partNumber.canWin} Pouvez-vous le gagner ?</h2>
            <p className="text-[15px] leading-[1.5] text-[color:var(--muted-foreground)]">{v.canWinSubtitle}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className={`${card} flex flex-col gap-3.5 p-7 lg:min-h-[426px]`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[16px] font-semibold leading-[1.4]">{v.eligibilityTitle}</h3>
                <MistralBadge>Extrait du règlement par Mistral</MistralBadge>
              </div>
              {v.requirements.map((req) => (
                <RequirementRow key={req.name} req={req} />
              ))}
            </div>
            <div className={`${card} flex flex-col gap-4 p-7 lg:min-h-[426px]`}>
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold leading-[1.4]">Santé financière</h3>
                <Badge tone="ouvert">Solide</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Chiffre d’affaires", "2,1 M€", "+14 % sur 2 ans", "var(--ouvert)"],
                  ["Marge nette", "6,2 %", "secteur : 3,5 %", "var(--ouvert)"],
                  ["Poids du lot", v.lotWeight, "de votre CA", v.kind === "passez" ? "var(--verrouille)" : "var(--ouvert)"],
                ].map(([title, value, note, color]) => (
                  <div key={title} className="flex min-w-0 flex-col gap-0.5 rounded-xl bg-[var(--background)] p-3.5">
                    <p className="text-[12px] font-medium leading-[1.4] text-[color:var(--muted-foreground)]">{title}</p>
                    <p className="text-[22px] font-bold leading-[1.3]">{value}</p>
                    <p className="text-[12px] leading-[1.4]" style={{ color }}>{note}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[12px] font-medium leading-[1.4] text-[color:var(--muted-foreground)]">Chiffre d’affaires 2022 → 2024</p>
                <div className="flex items-end gap-2.5">
                  {[
                    ["2022", 55],
                    ["2023", 59],
                    ["2024", 63],
                  ].map(([year, height]) => (
                    <div key={year} className="flex flex-col items-center gap-1">
                      <span className="w-14 rounded-t bg-[var(--primary)]" style={{ height }} />
                      <span className="text-[12px] font-medium leading-[1.4] text-[color:var(--muted-foreground)]">{year}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-[var(--secondary)] p-4 text-[color:var(--primary)]">
                <p className="text-[11px] font-semibold leading-[1.3] tracking-[0.66px]">CE QUE L’ACHETEUR VERRA</p>
                <p className="text-[14px] font-medium leading-[1.45]">{v.buyerView}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stratégie */}
        <Strategy
          number={v.partNumber.strategy}
          title={v.strategyTitle}
          subtitle={v.strategySubtitle}
          levers={v.levers}
          primaryAction={v.primaryAction}
          primaryIsAlert={v.primaryIsAlert}
        />

        {v.full && <NextOpportunities />}
      </main>
    </div>
  )
}

function Matrix({ marker }: { marker: { haloX: number; haloY: number; labelX: number; labelY: number; label: string } }) {
  const quadrants = [
    { label: "Coup à jouer", bg: "var(--dispute-fond)", fg: "var(--dispute)", pos: "left-0 top-0", text: "top-3" },
    { label: "Foncez", bg: "var(--ouvert-fond)", fg: "var(--ouvert)", pos: "left-[172px] top-0", text: "top-3" },
    { label: "Passez votre tour", bg: "var(--verrouille-fond)", fg: "var(--verrouille)", pos: "left-0 top-[172px]", text: "top-[140px]" },
    { label: "Renforcez-vous", bg: "var(--secondary)", fg: "var(--primary)", pos: "left-[172px] top-[172px]", text: "top-[140px]" },
  ]
  return (
    <div className="flex shrink-0 flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-[180px] w-[17px] items-center justify-center">
          <p className="-rotate-90 whitespace-nowrap text-[12px] font-semibold leading-[1.4] text-[color:var(--muted-foreground)]">
            Capacité de votre entreprise →
          </p>
        </div>
        <div className="relative size-[340px] overflow-hidden rounded-2xl" role="img" aria-label={`Matrice de décision : ${marker.label}`}>
          {quadrants.map((q) => (
            <div key={q.label} className={`absolute size-[168px] ${q.pos}`} style={{ background: q.bg }}>
              <p className={`absolute left-3 ${q.text} whitespace-nowrap text-[13px] font-semibold leading-[1.4]`} style={{ color: q.fg }}>
                {q.label}
              </p>
            </div>
          ))}
          <img src="/figma/matrice-halo.svg" width="40" height="40" alt="" className="absolute" style={{ left: marker.haloX, top: marker.haloY }} />
          <img src="/figma/matrice-vous.svg" width="18" height="18" alt="" className="absolute" style={{ left: marker.haloX + 11, top: marker.haloY + 11 }} />
          <span
            className="absolute whitespace-nowrap rounded-lg bg-[var(--primary)] px-2 py-1 text-[11px] font-semibold leading-[1.3] tracking-[0.66px] text-[color:var(--card)]"
            style={{ left: marker.labelX, top: marker.labelY }}
          >
            {marker.label}
          </span>
        </div>
      </div>
      <p className="pl-6 text-[12px] font-semibold leading-[1.4] text-[color:var(--muted-foreground)]">Ouverture du marché →</p>
    </div>
  )
}

function ScoreColumn({
  title,
  score,
  components,
  before,
  children,
}: {
  title: string
  score: number
  components: Component[]
  before?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[var(--background)] p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[14px] font-semibold leading-[1.45]">{title}</p>
        <p className="text-[22px] font-bold leading-[1.3] text-[color:var(--primary)]">{score}/100</p>
      </div>
      {before}
      <div className="flex gap-2">
        <p className={`${label11} flex-1`}>COMPOSANTE · DONNÉE RÉELLE</p>
        <p className={`${label11} w-11 text-right`}>POIDS</p>
        <p className={`${label11} w-11 text-right`}>NOTE</p>
      </div>
      {components.map((c) => (
        <div key={c.name} className="flex items-center gap-2 rounded-xl bg-[var(--card)] px-3 py-2.5">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-[1.4]">
            <p className="text-[13px] font-semibold">{c.name}</p>
            <p className="text-[12px] text-[color:var(--muted-foreground)]">{c.detail}</p>
          </div>
          <p className="w-11 text-right text-[13px] font-medium leading-[1.45] whitespace-nowrap">{c.weight}</p>
          <p className="w-11 text-right text-[13px] font-semibold leading-[1.4]">{c.score}</p>
        </div>
      ))}
      {children}
      <button type="button" className={`${sourceLink} self-start`}>Voir les marchés et données sources →</button>
    </div>
  )
}

function RequirementRow({ req }: { req: Requirement }) {
  const style = {
    ok: { bg: "var(--ouvert)", icon: "✓", detail: "var(--muted-foreground)" },
    warn: { bg: "var(--dispute)", icon: "!", detail: "var(--dispute)" },
    ko: { bg: "var(--verrouille)", icon: "✕", detail: "var(--verrouille)" },
  }[req.state]
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid size-[22px] shrink-0 place-items-center rounded-full text-[12px] font-semibold leading-[1.4] text-[color:var(--card)]"
        style={{ background: style.bg }}
      >
        {style.icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-[1.45]">
        <p className="text-[14px] font-medium">{req.name}</p>
        <p className="text-[13px]" style={{ color: style.detail }}>{req.detail}</p>
      </div>
    </div>
  )
}

function Bar({ width, color }: { width: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
      <div className="h-2 rounded-full" style={{ width: `${width}%`, background: color }} />
    </div>
  )
}

/** Partie « 1. Le marché est-il ouvert ? » + preuves + signaux Veille+ (version Métropole uniquement). */
function MarketPart({ onVeille }: { onVeille: () => void }) {
  // Largeurs Figma rapportées à la piste de 484 px
  const winners = [
    ["Propreté Rhône Services", "36 %", 484, "var(--primary)"],
    ["Nettoyage Lumière SA", "21 %", 282, "var(--primary)"],
    ["Éclat Services", "14 %", 188, "var(--ouvert)"],
    ["Brillance Lyon PME", "14 %", 188, "var(--ouvert)"],
    ["Groupe Clarté Industrie", "7 %", 94, "var(--primary)"],
  ] as const
  const timeline = [
    ["2017", "Propreté Rhône Services", "primary", null],
    ["2021", "Propreté Rhône Services", "dispute", "Reconduit"],
    ["2025", "Propreté Rhône Services", "dispute", "Reconduit"],
    ["2026", "Ce marché", "ouvert", "À prendre ?"],
  ] as const
  const signals = [
    { tone: "dispute" as const, label: "Signal", who: "Propreté Rhône Services  ·  Titulaire sortant", what: "Cession de son établissement de Vénissieux", source: "BODACC · mai 2026  ↗" },
    { tone: "dispute" as const, label: "Signal", who: "Propreté Rhône Services  ·  Titulaire sortant", what: "Fonds propres en baisse de 18 %", source: "Comptes annuels 2025 publiés  ↗" },
    { tone: "ouvert" as const, label: "RAS", who: "Nettoyage Lumière SA  ·  Concurrent", what: "Aucun événement sur 24 mois", source: "BODACC · Sirene  ↗" },
  ]
  const proof = `${card} flex flex-col gap-4 p-7`

  return (
    <>
      <section className="flex flex-col gap-1">
        <h2 className="text-[26px] font-bold leading-[1.25]">1. Le marché est-il ouvert ?</h2>
        <p className="text-[15px] leading-[1.5] text-[color:var(--muted-foreground)]">Ce que disent 5 ans d’attributions sur ce type de marché</p>
      </section>

      <section className="flex flex-col gap-12 rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_8px_24px_rgba(18,23,38,0.06)] md:p-10 lg:flex-row">
        <div className="flex w-full flex-col gap-5 lg:w-[300px] lg:shrink-0">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--dispute-fond)] px-4 py-2">
            <span className="grid size-[22px] place-items-center rounded-full bg-[var(--dispute)] text-[14px] font-semibold leading-[1.45] text-[color:var(--card)]">!</span>
            <span className="text-[18px] font-bold leading-[1.35] text-[color:var(--dispute)]">Disputé</span>
          </span>
          <p className="flex items-baseline gap-1">
            <span className="text-[64px] font-bold leading-none">42</span>
            <span className="text-[24px] font-medium leading-[1.2] text-[color:var(--muted-foreground)]">/100</span>
          </p>
          <p className="text-[14px] font-medium leading-[1.45] text-[color:var(--muted-foreground)]">Indice d’ouverture</p>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--border)]">
              <div className="h-3 rounded-full bg-[var(--dispute)]" style={{ width: "42%" }} />
            </div>
            <div className="flex justify-between text-[12px] font-medium leading-[1.4]">
              <span className="text-[color:var(--verrouille)]">Verrouillé</span>
              <span className="text-[color:var(--dispute)]">Disputé</span>
              <span className="text-[color:var(--ouvert)]">Ouvert</span>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
          <MistralBadge>Rédigé par Mistral</MistralBadge>
          <p className="text-[18px] leading-[1.5]">
            Sur 14 marchés de nettoyage de la Métropole depuis 2021, 3 entreprises en ont remporté 10. Le titulaire actuel a été reconduit 2 fois sur 3. Mais 4 lots ont été gagnés par des PME (moins de 250 salariés), et le lot 3 de ce marché (sites de moins de 1 000 m²) correspond à leur profil.
          </p>
          <div className="flex w-full flex-col gap-1.5 rounded-2xl bg-[var(--secondary)] p-5 text-[color:var(--primary)]">
            <p className="text-[12px] font-semibold leading-[1.4]">NOTRE CONSEIL</p>
            <p className="text-[22px] font-bold leading-[1.3]">Répondez au lot 3, pas aux lots 1 et 2.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[18px] font-bold leading-[1.35]">Les preuves côté marché</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={`${proof} lg:min-h-[372px]`}>
            <h3 className="text-[16px] font-semibold leading-[1.4]">Qui gagne ?</h3>
            <div className="flex flex-col gap-3">
              {winners.map(([name, share, width, color]) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[14px]">
                    <span className="leading-[1.5]">{name}</span>
                    <span className="font-semibold leading-[1.45]">{share}</span>
                  </div>
                  <Bar width={(width / 484) * 100} color={color} />
                </div>
              ))}
            </div>
            <div className="flex-1" />
            <button type="button" className={`${sourceLink} self-start text-[14px]`}>Voir les marchés sources →</button>
          </div>

          <div className={`${proof} lg:min-h-[372px]`}>
            <h3 className="text-[16px] font-semibold leading-[1.4]">Combien de concurrents ?</h3>
            <p className="flex items-baseline gap-1.5">
              <span className="text-[64px] font-bold leading-none">3,0</span>
              <span className="text-[16px] leading-[1.5] text-[color:var(--muted-foreground)]">offres en moyenne</span>
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col gap-1.5">
                <p className="text-[14px] leading-[1.5]">Ce type de marché : 3,0</p>
                <Bar width={(245 / 484) * 100} color="var(--dispute)" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-[14px] leading-[1.5]">Moyenne nationale du secteur : 5,1</p>
                <Bar width={(391 / 484) * 100} color="var(--muted-foreground)" />
              </div>
            </div>
            <p className="text-[14px] leading-[1.5] text-[color:var(--muted-foreground)]">Moins de concurrence que la moyenne : vos chances sont réelles.</p>
            <div className="flex-1" />
            <button type="button" className={`${sourceLink} self-start text-[14px]`}>Voir les marchés sources →</button>
          </div>

          <div className={`${proof} lg:min-h-[346px]`}>
            <h3 className="text-[16px] font-semibold leading-[1.4]">Le sortant gagne-t-il encore ?</h3>
            <div className="flex flex-col gap-3">
              {timeline.map(([year, who, color, tag]) => (
                <div key={year} className="flex items-center gap-3.5">
                  <img src={`/figma/frise-${color}.svg`} width="12" height="12" alt="" />
                  <span className="text-[14px] font-semibold leading-[1.45]">{year}</span>
                  <span className="flex-1 text-[14px] leading-[1.5]">{who}</span>
                  {tag === null ? (
                    <span className="rounded-full bg-[var(--secondary)] px-2.5 py-1 text-[12px] font-semibold leading-[1.4] text-[color:var(--primary)]">Attribué</span>
                  ) : (
                    <Badge tone={color === "ouvert" ? "ouvert" : "dispute"}>{tag}</Badge>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[14px] leading-[1.5] text-[color:var(--muted-foreground)]">
              Le titulaire actuel a été reconduit 2 fois sur 3 : il faudra un dossier nettement mieux disant.
            </p>
            <div className="flex-1" />
            <button type="button" className={`${sourceLink} self-start text-[14px]`}>Voir les marchés sources →</button>
          </div>

          <div className={`${proof} lg:min-h-[346px]`}>
            <h3 className="text-[16px] font-semibold leading-[1.4]">Place des PME</h3>
            <p className="flex items-baseline gap-1.5">
              <span className="text-[64px] font-bold leading-none text-[color:var(--ouvert)]">4</span>
              <span className="text-[16px] leading-[1.5] text-[color:var(--muted-foreground)]">lots sur 14 remportés par des PME</span>
            </p>
            <img src="/figma/pastilles-pme.svg" width="438" height="22" alt="4 lots sur 14 remportés par des PME" className="max-w-full" />
            <div className="flex gap-4">
              {[
                ["pme", "PME (< 250 salariés)"],
                ["grand", "Grandes entreprises"],
              ].map(([key, text]) => (
                <span key={key} className="flex items-center gap-1.5 text-[12px] leading-[1.4] text-[color:var(--muted-foreground)]">
                  <img src={`/figma/legende-${key}.svg`} width="10" height="10" alt="" />
                  {text}
                </span>
              ))}
            </div>
            <p className="text-[14px] leading-[1.5] text-[color:var(--muted-foreground)]">Les PME gagnent surtout les petits lots, comme le lot 3 de ce marché.</p>
            <div className="flex-1" />
            <button type="button" className={`${sourceLink} self-start text-[14px]`}>Voir les marchés sources →</button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border-[1.5px] border-dashed border-[var(--primary)] bg-[var(--card)] p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 className="text-[18px] font-bold leading-[1.35]">Signaux officiels sur les concurrents</h2>
            <p className="text-[13px] leading-[1.45] text-[color:var(--muted-foreground)]">
              Événements publics et datés sur les entreprises, jamais sur les personnes. Aucune presse, aucun score de réputation.
            </p>
          </div>
          <button
            type="button"
            onClick={onVeille}
            className="self-start rounded-full bg-[var(--primary)] px-3 py-1.5 text-[12px] font-semibold leading-[1.4] whitespace-nowrap text-[color:var(--card)] md:self-auto"
          >
            + Service Veille+
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          {signals.map((s) => (
            <div key={s.what} className="flex flex-col gap-2 rounded-xl bg-[var(--background)] px-4 py-3 sm:flex-row sm:items-center sm:gap-3.5">
              <Badge tone={s.tone}>{s.label}</Badge>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="text-[12px] font-medium leading-[1.4] whitespace-pre-wrap text-[color:var(--muted-foreground)]">{s.who}</p>
                <p className="text-[14px] font-semibold leading-[1.45]">{s.what}</p>
              </div>
              <p className="text-[12px] font-medium leading-[1.4] whitespace-pre text-[color:var(--primary)]">{s.source}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-[var(--mistral-fond)] px-4 py-3">
          <span className="size-2.5 shrink-0 bg-[var(--mistral)]" />
          <p className="flex-1 text-[14px] leading-[1.5]">
            Le sortant réduit sa présence locale. Mettez en avant votre proximité et vos délais d’intervention dans le mémoire technique.
          </p>
        </div>
      </section>
    </>
  )
}

function AlertButton({ label, variant }: { label: string; variant: "primary" | "white" }) {
  const [scheduled, setScheduled] = useState(false)
  if (scheduled) {
    return (
      <Button variant="outline" onClick={() => setScheduled(false)}>
        Alerte programmée ✓
      </Button>
    )
  }
  if (variant === "white") {
    return (
      <button
        type="button"
        onClick={() => setScheduled(true)}
        className="rounded-xl bg-[var(--card)] px-5 py-3 text-[14px] font-semibold leading-[1.45] whitespace-nowrap text-[color:var(--primary)]"
      >
        {label}
      </button>
    )
  }
  return <Button onClick={() => setScheduled(true)}>{label}</Button>
}

function Strategy(props: {
  number: string
  title: string
  subtitle: string
  levers: { title: string; text: string }[]
  primaryAction: string
  primaryIsAlert: boolean
}) {
  return (
    <section className="op-bloc-fort flex flex-col gap-6 rounded-[20px] p-6 md:p-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h2 className="text-[26px] font-bold leading-[1.25] text-[color:var(--sur-grad)]">
            {props.number} {props.title}
          </h2>
          <p className="text-[15px] leading-[1.5] text-[color:var(--secondary)]">{props.subtitle}</p>
        </div>
        <MistralBadge>Rédigé par Mistral</MistralBadge>
      </div>
      <div className={`grid gap-4 sm:grid-cols-2 ${props.levers.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {props.levers.map((lever, i) => (
          <div key={lever.title} className="flex flex-col gap-2.5 rounded-2xl bg-[var(--card)] p-5 lg:min-h-[252px]">
            <span className="grid size-[30px] place-items-center rounded-full bg-[var(--secondary)] text-[14px] font-semibold leading-[1.45] text-[color:var(--primary)]">
              {i + 1}
            </span>
            <p className="text-[18px] font-bold leading-[1.35]">{lever.title}</p>
            <p className="text-[13px] leading-[1.45] text-[color:var(--muted-foreground)]">{lever.text}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {props.primaryIsAlert ? (
          <AlertButton label={props.primaryAction} variant="white" />
        ) : (
          <button type="button" className="rounded-xl bg-[var(--card)] px-5 py-3 text-[14px] font-semibold leading-[1.45] whitespace-nowrap text-[color:var(--primary)]">
            {props.primaryAction}
          </button>
        )}
        <button type="button" className="rounded-xl border border-[var(--secondary)] px-5 py-3 text-[14px] font-semibold leading-[1.45] whitespace-nowrap text-[color:var(--sur-grad)]">
          Trouver un partenaire de groupement
        </button>
      </div>
    </section>
  )
}

function NextOpportunities() {
  const items = [
    { title: "Nettoyage des groupes scolaires", meta: "Ville de Villeurbanne  ·  Fin : mars 2027", tone: "ouvert" as const },
    { title: "Entretien des locaux du SDIS", meta: "SDIS du Rhône  ·  Fin : juin 2027", tone: "dispute" as const },
    { title: "Nettoyage des équipements sportifs", meta: "Ville de Vénissieux  ·  Fin : sept. 2027", tone: "ouvert" as const },
  ]
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-[22px] font-bold leading-[1.3]">Prochaines occasions</h2>
        <p className="text-[14px] leading-[1.5] text-[color:var(--muted-foreground)]">Marchés similaires dont l’échéance arrive dans les 12 mois</p>
      </div>
      <div className={`${card} flex flex-col overflow-hidden`}>
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:gap-5 ${i ? "border-t border-[var(--border)]" : ""}`}
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-[16px] font-semibold leading-[1.4]">{item.title}</p>
              <p className="text-[14px] leading-[1.5] whitespace-pre-wrap text-[color:var(--muted-foreground)]">{item.meta}</p>
            </div>
            <Badge tone={item.tone}>{item.tone === "ouvert" ? "Ouvert" : "Disputé"}</Badge>
            <AlertButton label="Me prévenir" variant="primary" />
          </div>
        ))}
      </div>
    </section>
  )
}
