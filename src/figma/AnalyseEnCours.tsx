import { useEffect, useState } from "react"
import { Halos, MistralBadge } from "./ui"

const steps = [
  "Lecture de l’avis BOAMP et du règlement de consultation",
  "Identification du secteur et de l’acheteur",
  "Recherche de 14 marchés similaires depuis 2021",
  "Rédaction du verdict",
]
const extracted = [
  ["Secteur", "Nettoyage de locaux"],
  ["Acheteur", "Métropole de Lyon"],
  ["Montant", "2,4 M€"],
  ["Durée", "4 ans"],
  ["Lots", "3"],
]

/** Écran Figma « 03 — Analyse en cours » (1:218). Prototype : passe au verdict après 2,5 s. */
export default function AnalyseEnCours({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (step > steps.length) {
      onDone()
      return
    }
    const timer = window.setTimeout(() => setStep((s) => s + 1), 2500 / (steps.length + 1))
    return () => window.clearTimeout(timer)
  }, [step, onDone])

  return (
    <div className="op-font relative min-h-screen bg-[var(--background)] text-[color:var(--foreground)]">
      <Halos />
      <main className="relative mx-auto flex max-w-[640px] flex-col items-start gap-6 px-5 pb-20 pt-[140px] sm:px-0" aria-live="polite">
        <MistralBadge>Mistral analyse l’avis BOAMP n° 26-118342</MistralBadge>
        <ol className="flex w-full flex-col gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-8">
          {steps.map((label, i) => {
            const n = i + 1
            const done = n < step
            const active = n === step
            return (
              <li key={label} className="flex items-center gap-3.5">
                {done ? (
                  <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[var(--ouvert)] text-[14px] font-semibold text-[color:var(--card)]">✓</span>
                ) : (
                  <span
                    className={`size-[26px] shrink-0 rounded-full border-2 ${
                      active ? "op-pulse border-[var(--mistral)] bg-[var(--mistral-fond)]" : "border-[var(--border)] bg-[var(--background)]"
                    }`}
                  />
                )}
                <span className={`text-[16px] ${done || active ? "" : "text-[color:var(--muted-foreground)]"}`}>{label}</span>
              </li>
            )
          })}
        </ol>
        <section className="flex w-full flex-col gap-3">
          <p className="text-[12px] font-semibold text-[color:var(--muted-foreground)]">CE QUE MISTRAL A EXTRAIT</p>
          <div className="flex flex-wrap gap-2">
            {extracted.map(([label, value]) => (
              <span key={label} className="flex gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-[13px]">
                <span className="text-[color:var(--muted-foreground)]">{label}</span>
                <strong className="font-semibold">{value}</strong>
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
