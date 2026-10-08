import { useState } from "react"
import { Badge, Button, Halos, MistralBadge, type Tone } from "./ui"
import type { VerdictId } from "./verdicts"

const card = "rounded-2xl border border-[var(--border)] bg-[var(--card)]"

type Market = { id: VerdictId; buyer: string; title: string; tone: Tone; verdict: string }
const metropole: Market = { id: "metropole", buyer: "Métropole de Lyon", title: "Nettoyage des bâtiments administratifs", tone: "dispute", verdict: "Coup à jouer" }
const hospices: Market = { id: "hospices", buyer: "Hospices Civils de Lyon", title: "Nettoyage du centre hospitalier", tone: "verrouille", verdict: "Passez votre tour" }

const alerts = [
  { tone: "ouvert" as Tone, tag: "Opportunité", who: "Propreté Rhône Services", source: "BODACC · 14 mai 2026", title: "Cession de son établissement de Vénissieux", impact: "Le titulaire sortant réduit sa présence dans l’Est lyonnais. Sur la Métropole, mettez en avant votre proximité et un délai d’intervention sous 4 h.", markets: [metropole, hospices] },
  { tone: "dispute" as Tone, tag: "À surveiller", who: "Propreté Rhône Services", source: "Comptes annuels 2025 · juil. 2026", title: "Fonds propres en baisse de 18 %", impact: "Sa capacité à porter plusieurs lots diminue : le lot 3 de la Métropole devient plus accessible.", markets: [metropole] },
  { tone: "ouvert" as Tone, tag: "RAS", who: "Hygia Santé Services", source: "BODACC · Sirene · vérifié aujourd’hui", title: "Aucun événement depuis 24 mois", impact: "Le titulaire reste solide : ce marché restera difficile à prendre au prochain renouvellement.", markets: [hospices] },
]

const competitors: [string, string, Tone, string][] = [
  ["Propreté Rhône Services", "14 marchés gagnés chez 6 de vos acheteurs", "dispute", "2 signaux"],
  ["Éclat Services", "9 marchés gagnés chez 5 de vos acheteurs", "ouvert", "RAS"],
  ["Nettoyage Lumière SA", "7 marchés gagnés chez 4 de vos acheteurs", "ouvert", "RAS"],
  ["Hygia Santé Services", "6 marchés gagnés chez 1 de vos acheteurs", "ouvert", "RAS"],
]

const renewals: [string, string, Tone, string][] = [
  ["Nettoyage des groupes scolaires", "Ville de Villeurbanne · fin mars 2027", "ouvert", "Ouvert"],
  ["Entretien des locaux du SDIS", "SDIS du Rhône · fin juin 2027", "dispute", "Disputé"],
  ["Nettoyage des équipements sportifs", "Ville de Vénissieux · fin sept. 2027", "ouvert", "Ouvert"],
]

function NotifyButton() {
  const [on, setOn] = useState(false)
  return on ? (
    <Button variant="outline" onClick={() => setOn(false)}>Alerte programmée ✓</Button>
  ) : (
    <Button onClick={() => setOn(true)}>Me prévenir</Button>
  )
}

/** Écran Figma « 07 — Veille+ » (2031:537). */
export default function Veille({ onVerdict }: { onVerdict: (id: VerdictId) => void }) {
  const [active, setActive] = useState(false)

  return (
    <div className="op-font relative min-h-screen bg-[var(--background)] text-[color:var(--foreground)]">
      <Halos bottomHaloTop={976.4} />
      <main className="relative mx-auto flex max-w-[1100px] flex-col gap-7 px-5 pb-20 pt-8 lg:px-0">
        <section className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
            <Badge tone="ouvert">Service Veille+</Badge>
            <h1 className="text-[32px] font-bold leading-[1.25]">Vos concurrents sous surveillance</h1>
            <p className="text-[15px] leading-[1.5] text-[color:var(--muted-foreground)]">
              Signaux officiels (BODACC, comptes annuels publiés) sur les titulaires des marchés que vous visez. Uniquement des entreprises, jamais de données sur les personnes.
            </p>
          </div>
          {active ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2.5 rounded-[14px] border border-[var(--border)] bg-[var(--card)] px-4 py-2.5" aria-live="polite">
              <Badge tone="ouvert">Activée</Badge>
              <span className="text-[13px] text-[color:var(--muted-foreground)]">Alertes par e-mail chaque lundi</span>
              <button type="button" onClick={() => setActive(false)} className="text-[13px] font-medium text-[color:var(--primary)] hover:underline">
                Désactiver
              </button>
            </div>
          ) : (
            <Button onClick={() => setActive(true)}>Activer Veille+ · 30 jours offerts</Button>
          )}
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            ["2", "nouveaux signaux cette semaine", "var(--dispute)"],
            ["4", "concurrents surveillés", "var(--foreground)"],
            ["3", "renouvellements dans les 12 mois", "var(--foreground)"],
          ].map(([v, l, c]) => (
            <div key={l} className={`${card} flex flex-col gap-1 p-5`}>
              <span className="text-[40px] font-bold leading-[1.1]" style={{ color: c }}>{v}</span>
              <span className="text-[13px] text-[color:var(--muted-foreground)]">{l}</span>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-[26px] font-bold leading-[1.25]">Alertes</h2>
          {alerts.map((a) => (
            <article key={a.title} className="flex flex-col gap-3 rounded-2xl border border-[var(--primary)] bg-[var(--card)] p-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge tone={a.tone}>{a.tag}</Badge>
                <span className="text-[14px] font-semibold">{a.who}</span>
                <span className="text-[12px] text-[color:var(--muted-foreground)]">{a.source}</span>
              </div>
              <h3 className="text-[22px] font-bold leading-[1.3]">{a.title}</h3>
              <div className="flex flex-col items-start gap-1.5 rounded-xl bg-[var(--mistral-fond)] px-3.5 py-3">
                <MistralBadge>Ce que ça change pour vous</MistralBadge>
                <p className="text-[15px] leading-[1.5]">{a.impact}</p>
              </div>
              <p className="text-[11px] font-semibold tracking-[0.66px] text-[color:var(--muted-foreground)]">MARCHÉS CONCERNÉS</p>
              <div className="grid gap-2 md:grid-cols-2">
                {a.markets.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onVerdict(m.id)}
                    className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 py-2.5 text-left transition hover:border-[var(--primary)]"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-[14px] font-semibold">{m.buyer}</span>
                      <span className="text-[12px] text-[color:var(--muted-foreground)]">{m.title}</span>
                    </span>
                    <Badge tone={m.tone}>{m.verdict}</Badge>
                    <span className="text-[14px] font-semibold text-[color:var(--primary)]">→</span>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="grid items-start gap-4 lg:grid-cols-2">
          <div className={`${card} flex flex-col p-6`}>
            <h2 className="text-[18px] font-bold leading-[1.35]">Concurrents surveillés</h2>
            <p className="text-[13px] text-[color:var(--muted-foreground)]">Titulaires rencontrés chez vos acheteurs, DECP 2021-2025.</p>
            {competitors.map(([name, detail, tone, tag]) => (
              <div key={name} className="flex items-center gap-2.5 border-b border-[var(--border)] py-3 last:border-b-0">
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="text-[14px] font-semibold">{name}</p>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">{detail}</p>
                </div>
                <Badge tone={tone}>{tag}</Badge>
              </div>
            ))}
          </div>
          <div className={`${card} flex flex-col p-6`}>
            <h2 className="text-[18px] font-bold leading-[1.35]">Renouvellements à venir</h2>
            <p className="text-[13px] text-[color:var(--muted-foreground)]">Prévenu 6 mois avant la publication de l’avis.</p>
            {renewals.map(([title, meta, tone, tag]) => (
              <div key={title} className="flex flex-wrap items-center gap-2.5 border-b border-[var(--border)] py-3 last:border-b-0">
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="text-[14px] font-semibold">{title}</p>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">{meta}</p>
                </div>
                <Badge tone={tone}>{tag}</Badge>
                <NotifyButton />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
