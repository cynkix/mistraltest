import { useEffect, useState } from "react"
import { Badge, Button, MistralBadge } from "./ui"

const steps = [
  "Lecture du règlement de consultation",
  "Rapprochement avec les marchés passés (DECP)",
  "Contrôle de votre éligibilité",
  "Rédaction du verdict",
]

/** 0 = Repos, 1-4 = Étape n en cours, 5 = Résultat */
type CardState = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Composant Figma « Accueil · Carte annonce analysée » (2014:515).
 * Prototype : clic sur « Voir le verdict » → Étape 1, puis une étape toutes les 550 ms → Résultat.
 */
export default function AnalyzedCard({ onOpenVerdict }: { onOpenVerdict: () => void }) {
  const [state, setState] = useState<CardState>(0)

  useEffect(() => {
    if (state === 0 || state === 5) return
    const timer = window.setTimeout(() => setState((s) => (s + 1) as CardState), 550)
    return () => window.clearTimeout(timer)
  }, [state])

  if (state === 0) {
    return (
      <article className="flex w-full flex-col items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex w-full items-center justify-between gap-3">
          <Badge tone="dispute">Disputé · 42/100</Badge>
          <span className="text-[12px] font-semibold leading-[1.4] whitespace-nowrap text-[color:var(--muted-foreground)]">
            Clôture J-21
          </span>
        </div>
        <h3 className="text-[16px] font-semibold leading-[1.4] text-[color:var(--foreground)]">
          Nettoyage des bâtiments administratifs
        </h3>
        <p className="text-[13px] leading-[1.45] whitespace-pre text-[color:var(--muted-foreground)]">
          {"Métropole de Lyon  ·  2,4 M€"}
        </p>
        <Chances label="Coup à jouer" color="#c2410c" detail="Éligible au lot 3 · 1 référence à compléter" />
        <Button onClick={() => setState(1)}>Voir le verdict</Button>
      </article>
    )
  }

  const done = state === 5
  return (
    <article
      className="op-voile-carte flex w-full flex-col items-start gap-3 rounded-2xl border-2 border-[var(--primary)] p-6"
      aria-live="polite"
    >
      <div className="flex w-full items-center justify-between gap-3">
        <MistralBadge>{done ? "Analysé par Mistral" : "Mistral analyse cet avis"}</MistralBadge>
        <span className="text-[12px] leading-[1.4] whitespace-nowrap text-[color:var(--muted-foreground)]">
          BOAMP 26-118342
        </span>
      </div>
      <h3 className="text-[16px] font-semibold leading-[1.4] text-[color:var(--foreground)]">
        Nettoyage des bâtiments administratifs
      </h3>
      <div className="flex gap-2.5">
        <Score value={done ? "42" : "–"} label="Ouverture" filled={done} />
        <Score value={done ? "74" : "–"} label="Capacité" filled={done} />
      </div>
      <ol className="flex w-full flex-col gap-2">
        {steps.map((step, index) => {
          const number = index + 1
          const isDone = done || number < state
          const isActive = !done && number === state
          return (
            <li key={step} className="flex w-full items-center gap-2.5">
              {isDone ? (
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--ouvert)] text-[12px] font-semibold leading-[1.4] text-[color:var(--card)]">
                  ✓
                </span>
              ) : (
                <span
                  className={`size-5 shrink-0 rounded-full border-2 ${
                    isActive ? "op-pulse border-[var(--mistral)]" : "border-[var(--border)]"
                  }`}
                />
              )}
              <span
                className={`flex-1 text-[13px] leading-[1.45] ${
                  isDone || isActive ? "text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)]"
                }`}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ol>
      {done && (
        <>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--dispute-fond)] px-4 py-2.5">
            <span className="grid size-6 place-items-center rounded-full bg-[var(--dispute)] text-[13px] font-semibold leading-[1.4] text-[color:var(--card)]">
              ★
            </span>
            <span className="text-[26px] font-bold leading-[1.25] whitespace-nowrap text-[color:var(--dispute)]">
              Coup à jouer
            </span>
          </span>
          <Button onClick={onOpenVerdict}>Ouvrir le verdict →</Button>
        </>
      )}
    </article>
  )
}

function Score({ value, label, filled }: { value: string; label: string; filled: boolean }) {
  return (
    <div className="flex w-[120px] flex-col items-start rounded-xl bg-[var(--background)] px-3.5 py-2.5 whitespace-nowrap">
      <span
        className={`text-[26px] font-bold leading-[1.25] ${
          filled ? "text-[color:var(--primary)]" : "text-[color:var(--muted-foreground)]"
        }`}
      >
        {value}
      </span>
      <span className="text-[12px] leading-[1.4] text-[color:var(--muted-foreground)]">{label}</span>
    </div>
  )
}

export function Chances({ label, color, detail }: { label: string; color: string; detail: string }) {
  return (
    <div className="flex w-full flex-col gap-0.5 rounded-xl bg-[var(--background)] px-3 py-2 text-[color:var(--muted-foreground)]">
      <p className="text-[13px] font-medium">
        Vos chances : <strong className="font-bold" style={{ color }}>{label}</strong>
      </p>
      <p className="text-[12px] leading-[1.4]">{detail}</p>
    </div>
  )
}
