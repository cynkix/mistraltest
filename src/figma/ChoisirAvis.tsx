import { useEffect, useState } from "react"
import { Badge, Button, Halos, MistralBadge, type Tone } from "./ui"
import type { VerdictId } from "./verdicts"

export interface ChoisirAvisActions {
  onVerdict: (id: VerdictId) => void
  onDecisionNote: () => void
  onOffBoamp: () => void
}

const stats = [
  { title: "Nouveaux avis", value: "14", note: "cette semaine, +3 sur 7 jours", picto: "avis", tint: "#7c9cf5", spark: true },
  { title: "Montant en jeu", value: "8,2 M€", note: "sur 6 avis en cours", picto: "montant", tint: "#b79cf5" },
  { title: "Marchés ouverts", value: "3 sur 6", note: "concurrence faible", picto: "ouverts", tint: "#7fd1c4" },
  { title: "Clôtures proches", value: "2", note: "sous 15 jours", picto: "clotures", tint: "#fdb38c" },
]
const spark = [15, 19, 14, 21, 17, 22, 19, 24]

const recents: { id: VerdictId; title: string; buyer: string; tone: Tone; verdict: string; when: string; dot: [number, number] }[] = [
  { id: "metropole", title: "Nettoyage des bâtiments administratifs", buyer: "Métropole de Lyon", tone: "dispute", verdict: "Coup à jouer", when: "Analyse complète · hier", dot: [10, 8] },
  { id: "hospices", title: "Nettoyage du centre hospitalier", buyer: "Hospices Civils de Lyon", tone: "verrouille", verdict: "Passez votre tour", when: "Analyse rapide · il y a 3 jours", dot: [4, 26] },
  { id: "villeurbanne", title: "Nettoyage des groupes scolaires", buyer: "Ville de Villeurbanne", tone: "ouvert", verdict: "Foncez", when: "Analyse complète · il y a 5 jours", dot: [26, 4] },
]

type Notice = {
  id: VerdictId
  title: string
  meta: string
  tone: Tone
  opening: string
  chance: string
  chanceColor: string
}
const notices: Notice[] = [
  { id: "villeurbanne", title: "Nettoyage des groupes scolaires", meta: "Ville de Villeurbanne · BOAMP 26-117902  ·  480 k€ · 3 ans  ·  Clôture J-12", tone: "ouvert", opening: "Ouvert · 78", chance: "Foncez", chanceColor: "var(--ouvert)" },
  { id: "metropole", title: "Nettoyage des bâtiments administratifs", meta: "Métropole de Lyon · BOAMP 26-118342  ·  2,4 M€ · 4 ans · 3 lots  ·  Clôture J-21", tone: "dispute", opening: "Disputé · 42", chance: "Coup à jouer (lot 3)", chanceColor: "var(--dispute)" },
  { id: "lyon", title: "Vitrerie des équipements culturels", meta: "Ville de Lyon · BOAMP 26-118011  ·  210 k€ · 2 ans  ·  Clôture J-17", tone: "ouvert", opening: "Ouvert · 71", chance: "Renforcez-vous", chanceColor: "var(--primary)" },
  { id: "hospices", title: "Nettoyage du centre hospitalier", meta: "Hospices Civils de Lyon · BOAMP 26-116554  ·  3,8 M€ · 4 ans  ·  Clôture J-9", tone: "verrouille", opening: "Verrouillé · 16", chance: "Passez votre tour", chanceColor: "var(--verrouille)" },
]

const panelSteps = [
  "Lecture du règlement de consultation",
  "Rapprochement avec les marchés passés (DECP)",
  "Contrôle de votre éligibilité",
  "Rédaction du verdict",
]

const card = "rounded-2xl border border-[var(--border)] bg-[var(--card)]"

/**
 * Écrans Figma « 02 — Choisir un avis » (1:198), « 02b — analyse en panneau » (2015:343)
 * et « 02c — verdict rapide » (2015:404).
 */
export default function ChoisirAvis(actions: ChoisirAvisActions) {
  // null = panneau fermé ; 1-4 = étape en cours ; 5 = verdict rapide
  const [panelStep, setPanelStep] = useState<number | null>(null)

  useEffect(() => {
    if (panelStep === null || panelStep >= 5) return
    // Prototype : 1,8 s entre 02b et 02c, réparties sur les 4 étapes
    const timer = window.setTimeout(() => setPanelStep((s) => (s === null ? s : s + 1)), 450)
    return () => window.clearTimeout(timer)
  }, [panelStep])

  useEffect(() => {
    if (panelStep === null) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanelStep(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [panelStep])

  const analyze = (id: VerdictId) => (id === "metropole" ? setPanelStep(1) : actions.onVerdict(id))

  return (
    <div className="op-font relative min-h-screen bg-[var(--background)] text-[color:var(--foreground)]">
      <Halos />
      <main className="relative mx-auto flex max-w-[1100px] flex-col gap-7 px-5 pb-20 pt-8 lg:px-0">
        <section className="flex flex-col gap-1.5">
          <h1 className="text-[32px] font-bold leading-[1.25]">Quel marché voulez-vous analyser ?</h1>
          <p className="text-[15px] leading-[1.5] text-[color:var(--muted-foreground)]">
            Les avis publiés au BOAMP, filtrés pour votre entreprise. Aucune saisie : les données viennent directement des sources officielles.
          </p>
        </section>

        {/* Activité du marché */}
        <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.title} className="relative flex items-start gap-3.5 overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)] px-[18px] py-4">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-[130px] rounded-full blur-2xl"
                style={{ background: s.tint, opacity: 0.45 }}
              />
              <span className="relative grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: `${s.tint}47` }}>
                <img src={`/figma/picto-${s.picto}.svg`} width="20" height="20" alt="" />
              </span>
              <div className="relative flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="text-[12px] font-semibold text-[color:var(--muted-foreground)]">{s.title}</p>
                <div className="flex items-center justify-between gap-2.5">
                  <p className="text-[26px] font-bold leading-[1.25]">{s.value}</p>
                  {s.spark && (
                    <span className="flex h-[26px] items-end gap-[3px]" aria-hidden>
                      {spark.map((h, i) => (
                        <span key={i} className="w-1.5 rounded-sm bg-[var(--primary)]" style={{ height: h }} />
                      ))}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-[color:var(--muted-foreground)]">{s.note}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Repris récemment */}
        <section className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[18px] font-bold leading-[1.35]">Repris récemment</h2>
            <p className="text-[12px] text-[color:var(--muted-foreground)]">Les avis que vous avez ouverts, pour y revenir en un clic</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(3,268px)]">
            {recents.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => actions.onVerdict(r.id)}
                className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5 text-left transition hover:border-[var(--primary)]"
              >
                <MiniMatrix dot={r.dot} />
                <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <p className="text-[14px] font-semibold">{r.title}</p>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">{r.buyer}</p>
                  <div className="pt-1.5">
                    <Badge tone={r.tone}>{r.verdict}</Badge>
                  </div>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">{r.when}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Filtres */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["Secteur", "Nettoyage de locaux"],
            ["Territoire", "Rhône (69)"],
            ["Acheteur", "Tous"],
            ["Montant", "Tous"],
          ].map(([label, value]) => (
            <button key={label} type="button" className="flex flex-col items-start gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-left">
              <span className="text-[12px] font-medium text-[color:var(--muted-foreground)]">{label}</span>
              <span className="text-[14px] font-semibold">{value}&nbsp;&nbsp;▾</span>
            </button>
          ))}
        </section>

        <p className="-my-2 flex items-center gap-2 text-[13px] font-medium text-[color:var(--muted-foreground)]">
          <span className="size-2 rounded-full bg-[var(--ouvert)]" />
          BOAMP synchronisé il y a 2 h&nbsp;&nbsp;·&nbsp;&nbsp;12 avis correspondent&nbsp;&nbsp;·&nbsp;&nbsp;triés par vos chances
        </p>

        {/* Liste des avis */}
        <section className={`${card} overflow-hidden`}>
          {notices.map((n, i) => (
            <div
              key={n.id}
              className={`flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:gap-5 ${i ? "border-t border-[var(--border)]" : ""} ${
                n.id === "metropole" ? "bg-[var(--secondary)]" : ""
              }`}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-[16px] font-semibold leading-[1.4]">{n.title}</p>
                <p className="text-[13px] leading-[1.45] whitespace-pre-wrap text-[color:var(--muted-foreground)]">{n.meta}</p>
              </div>
              <div className="md:w-[126px]">
                <Badge tone={n.tone}>{n.opening}</Badge>
              </div>
              <div className="flex flex-col md:w-[170px]">
                <span className="text-[12px] font-medium text-[color:var(--muted-foreground)]">Vos chances</span>
                <span className="text-[13px] font-semibold" style={{ color: n.chanceColor }}>{n.chance}</span>
              </div>
              <Button onClick={() => analyze(n.id)} className="self-start md:self-auto">Analyser</Button>
            </div>
          ))}
        </section>

        <p className="flex flex-wrap gap-1.5 text-[13px]">
          <span className="text-[color:var(--muted-foreground)]">Marché absent du BOAMP ?</span>
          <button type="button" onClick={actions.onOffBoamp} className="font-semibold text-[color:var(--primary)] hover:underline">
            Analyser un avis hors BOAMP
          </button>
        </p>
      </main>

      {panelStep !== null && (
        <QuickPanel
          step={panelStep}
          onClose={() => setPanelStep(null)}
          onFull={() => actions.onVerdict("metropole")}
          onNote={actions.onDecisionNote}
        />
      )}
    </div>
  )
}

function MiniMatrix({ dot }: { dot: [number, number] }) {
  return (
    <span className="relative grid size-9 shrink-0 grid-cols-2 gap-0.5" aria-hidden>
      <span className="rounded-[3px] bg-[var(--dispute-fond)]" />
      <span className="rounded-[3px] bg-[var(--ouvert-fond)]" />
      <span className="rounded-[3px] bg-[var(--verrouille-fond)]" />
      <span className="rounded-[3px] bg-[var(--secondary)]" />
      <span
        className="absolute size-2 rounded-full border-2 border-white bg-[var(--primary)] box-content"
        style={{ left: dot[0], top: dot[1] }}
      />
    </span>
  )
}

function QuickPanel({ step, onClose, onFull, onNote }: { step: number; onClose: () => void; onFull: () => void; onNote: () => void }) {
  const done = step >= 5
  const iconBtn = "grid size-10 place-items-center rounded-[10px] border border-[var(--border)] text-[14px] font-semibold hover:bg-[var(--background)]"
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Analyse de l’avis">
      <button type="button" aria-label="Fermer" onClick={onClose} className="absolute inset-0 bg-black/35" />
      <aside className="op-font absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col gap-3.5 overflow-y-auto bg-[var(--card)] p-7 text-[color:var(--foreground)] shadow-2xl">
        <div className="flex items-center gap-1.5">
          <p className="flex-1 text-[11px] font-semibold tracking-[0.66px] text-[color:var(--muted-foreground)]">BOAMP 26-118342 · CLÔTURE J-21</p>
          <button type="button" className={iconBtn} aria-label="Avis précédent">←</button>
          <button type="button" className={iconBtn} aria-label="Avis suivant">→</button>
          <button type="button" className={iconBtn} aria-label="Fermer" onClick={onClose}>✕</button>
        </div>
        <h2 className="text-[22px] font-bold leading-[1.3]">Nettoyage des bâtiments administratifs</h2>
        <p className="text-[13px] text-[color:var(--muted-foreground)]">Métropole de Lyon · 2,4 M€ · 4 ans · 3 lots</p>
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-[var(--border)] p-[18px]" aria-live="polite">
          <div className="flex gap-2.5">
            {[
              [done ? "42" : "–", "Ouverture du marché"],
              [done ? "74" : "–", "Capacité de votre entreprise"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col rounded-xl bg-[var(--background)] px-3.5 py-2.5">
                <span className={`text-[26px] font-bold leading-[1.25] ${done ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"}`}>{value}</span>
                <span className="text-[12px] text-[color:var(--muted-foreground)]">{label}</span>
              </div>
            ))}
          </div>
          {done ? (
            <>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--dispute-fond)] px-4 py-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-[var(--dispute)] text-[13px] font-semibold text-[color:var(--card)]">★</span>
                <span className="text-[26px] font-bold leading-[1.25] text-[color:var(--dispute)]">Coup à jouer</span>
              </span>
              <MistralBadge>Rédigé par Mistral</MistralBadge>
              <p className="text-[13px] leading-[1.45]">
                Sur 14 marchés comparables depuis 2021, 3 entreprises en ont remporté 10, avec 3 offres en moyenne. Vous cochez les exigences du lot 3, qui pèserait 9 % de votre chiffre d’affaires. Le marché reste tenu par Propreté Rhône Services, mais votre santé financière vous rend crédible face à lui.
              </p>
              <div className="grid w-full grid-cols-3 gap-2">
                {[
                  ["71 %", "gagnés par le top 3"],
                  ["3", "offres en moyenne"],
                  ["4/14", "pour des PME"],
                ].map(([value, label]) => (
                  <div key={label} className="flex flex-col rounded-xl bg-[var(--background)] px-3 py-2.5">
                    <span className="text-[18px] font-bold leading-[1.35]">{value}</span>
                    <span className="text-[12px] text-[color:var(--muted-foreground)]">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] font-medium text-[color:var(--muted-foreground)]">Titulaire le plus fréquent : Propreté Rhône Services</p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={onFull}>Voir l’analyse complète</Button>
                <Button variant="outline" onClick={onNote}>Note de décision</Button>
              </div>
            </>
          ) : (
            <>
              <MistralBadge>Mistral analyse cet avis</MistralBadge>
              <ol className="flex flex-col gap-2.5">
                {panelSteps.map((label, i) => {
                  const n = i + 1
                  const isDone = n < step
                  const isActive = n === step
                  return (
                    <li key={label} className="flex items-center gap-2.5">
                      {isDone ? (
                        <span className="grid size-5 place-items-center rounded-full bg-[var(--ouvert)] text-[12px] font-semibold text-[color:var(--card)]">✓</span>
                      ) : (
                        <span className={`size-5 rounded-full border-2 ${isActive ? "op-pulse border-[var(--mistral)]" : "border-[var(--border)]"}`} />
                      )}
                      <span className={`text-[13px] ${isDone || isActive ? "" : "text-[color:var(--muted-foreground)]"}`}>{label}</span>
                    </li>
                  )
                })}
              </ol>
            </>
          )}
        </div>
        <p className="text-[12px] text-[color:var(--muted-foreground)]">3 sur 6 · ← → pour parcourir</p>
      </aside>
    </div>
  )
}
