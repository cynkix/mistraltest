import { useState } from "react"
import { Badge, Button, Halos, MistralBadge, type Tone } from "./ui"

type Recipient = "Dirigeant" | "Commerce" | "Exploitation"
type Vote = "Go" | "Go sous conditions" | "No go"
type Decision = "En attente" | "On y va" | "On passe"

const recipientText: Record<Recipient, string> = {
  Dirigeant:
    "Le contrat représente 190 k€ par an (760 k€ sur 4 ans), soit 9 % de notre chiffre d’affaires, sans créer de dépendance. Répondre demande environ 5 jours de travail. Le marché reste tenu par Propreté Rhône Services, mais notre santé financière nous rend crédibles face à lui.",
  Commerce:
    "Le marché est disputé : Propreté Rhône Services a remporté 36 % des marchés comparables, avec 3 offres en moyenne. 4 marchés sur 14 sont allés à des PME, l’acheteur leur laisse donc une place. Nos arguments : proximité, solidité financière (marge de 6,2 %) et un encadrant dédié au site.",
  Exploitation:
    "Le lot 3 représente environ 190 k€ par an, soit un besoin d’environ 4 équivalents temps plein. Nous avons 6 salariés mobilisables, ce qui couvre le besoin. Certification demandée : Qualipropre. Le mémoire technique devra détailler le plan de remplacement du personnel et les délais d’intervention.",
}

const voteTone: Record<Vote, Tone> = { Go: "ouvert", "Go sous conditions": "dispute", "No go": "verrouille" }

const section = "flex flex-col gap-3 border-t border-[var(--border)] py-6"
const h3 = "text-[16px] font-semibold"

function Segmented<T extends string>({ options, value, onChange, label }: { options: T[]; value: T | null; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-0.5 rounded-full border border-[var(--border)] bg-[var(--background)] p-1">
      {options.map((o) => {
        const active = o === value
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o)}
            className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition ${
              active ? "bg-[var(--primary)] text-[color:var(--primary-foreground)]" : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
            }`}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl bg-[var(--background)] p-3">
      <span className="text-[12px] text-[color:var(--muted-foreground)]">{label}</span>
      <span className="text-[22px] font-bold leading-[1.3]">{value}</span>
    </div>
  )
}

/** Écran Figma « 06 — Note de décision » (24:90) avec ses composants interactifs. */
export default function NoteDecision({ onBack }: { onBack: () => void }) {
  const [recipient, setRecipient] = useState<Recipient>("Dirigeant")
  const [myVote, setMyVote] = useState<Vote | null>(null)
  const [comment, setComment] = useState("")
  const [decision, setDecision] = useState<Decision>("En attente")
  const [copied, setCopied] = useState(false)

  const votes: Vote[] = ["Go", "Go sous conditions", ...(myVote ? [myVote] : [])]
  const count = (v: Vote) => votes.filter((x) => x === v).length
  const pending = myVote ? 0 : 1
  const summary = [
    count("Go") && `${count("Go")} go`,
    count("Go sous conditions") && `${count("Go sous conditions")} sous conditions`,
    count("No go") && `${count("No go")} no go`,
    pending && `${pending} en attente`,
  ]
    .filter(Boolean)
    .join(" · ")

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt("Copiez ce lien :", window.location.href)
    }
  }

  return (
    <div className="op-font relative min-h-screen bg-[var(--background)] text-[color:var(--foreground)]">
      <Halos bottomHaloTop={1381.75} />
      <main className="relative mx-auto flex max-w-[900px] flex-col gap-5 px-5 pb-20 pt-12 lg:px-0">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button type="button" onClick={onBack} className="text-[14px] font-medium text-[color:var(--primary)] hover:underline">
            ← Retour au verdict
          </button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={share}>{copied ? "Lien copié ✓" : "Partager le lien"}</Button>
            <Button onClick={() => window.print()}>Imprimer ou PDF</Button>
          </div>
        </div>

        <article className="flex flex-col rounded-[20px] bg-[var(--card)] p-6 md:p-10">
          <header className="flex flex-col gap-1.5 pb-6">
            <p className="text-[11px] font-semibold tracking-[0.66px] text-[color:var(--muted-foreground)]">NOTE DE DÉCISION · GO / NO GO</p>
            <h1 className="text-[32px] font-bold leading-[1.25]">Nettoyage des bâtiments administratifs</h1>
            <p className="text-[15px] leading-[1.5] text-[color:var(--muted-foreground)]">
              Métropole de Lyon · BOAMP 26-118342 · Lot 3 · Sites de moins de 1 000 m² · clôture J-21
            </p>
            <div className="flex items-center gap-2.5 pt-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-[var(--primary)] text-[12px] font-semibold text-white">KB</span>
              <p className="text-[13px] text-[color:var(--muted-foreground)]">Préparée par Karim Benali, Brillance Lyon PME · 7 octobre 2026</p>
            </div>
          </header>

          {/* Bloc verdict par destinataire */}
          <section className="flex flex-col items-start gap-2.5 rounded-2xl bg-[var(--background)] p-6">
            <div className="flex flex-wrap items-center gap-2.5 pb-1.5">
              <span className="text-[13px] text-[color:var(--muted-foreground)]">Rédigée pour</span>
              <Segmented label="Destinataire de la note" options={["Dirigeant", "Commerce", "Exploitation"] as Recipient[]} value={recipient} onChange={setRecipient} />
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-[var(--dispute-fond)] px-4 py-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-[var(--dispute)] text-[13px] font-semibold text-white">★</span>
                <span className="text-[26px] font-bold leading-[1.25] text-[color:var(--dispute)]">Coup à jouer</span>
              </span>
              {[
                ["42/100", "Ouverture · Disputé"],
                ["74/100", "Capacité"],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col gap-0.5">
                  <span className="text-[26px] font-bold leading-[1.25]">{v}</span>
                  <span className="text-[12px] text-[color:var(--muted-foreground)]">{l}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-semibold tracking-[0.66px] text-[color:var(--primary)]">RECOMMANDATION</p>
            <p className="text-[22px] font-bold leading-[1.3]">On répond au lot 3 seul, en jouant la qualité technique face au sortant.</p>
            <MistralBadge>Rédigé par Mistral pour : {recipient.toLowerCase()}</MistralBadge>
            <p className="text-[18px] leading-[1.5]" aria-live="polite">{recipientText[recipient]}</p>
          </section>

          <div className="h-11" />

          <section className="grid gap-6 border-t border-[var(--border)] py-6 md:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <h3 className={h3}>Ce que ça rapporte</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <Figure label="Par an" value="190 k€" />
                <Figure label="Sur 4 ans" value="760 k€" />
                <Figure label="Part de notre CA" value="9 %" />
                <Figure label="Lots visés" value="1 sur 3" />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className={h3}>Ce que ça coûte</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <Figure label="Travail de réponse" value="5 jours" />
                <Figure label="Temps interne" value="≈ 2 k€" />
                <Figure label="Mémoire technique" value="2 à 3 jours" />
                <Figure label="Dossier administratif" value="1 jour" />
              </div>
              <p className="text-[12px] text-[color:var(--muted-foreground)]">Estimation indicative, à ajuster par l’équipe.</p>
            </div>
          </section>

          <section className="grid gap-6 border-t border-[var(--border)] py-6 md:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <h3 className={h3}>Pourquoi ce verdict</h3>
              {[
                ["71 % des marchés comparables gagnés par les 3 premiers", "Dispersion · DECP 2021-2025"],
                ["3 offres reçues en moyenne (secteur : 5,1)", "Concurrence · DECP 2021-2025"],
                ["4 marchés sur 14 gagnés par des PME", "Place des PME · DECP 2021-2025"],
              ].map(([t, s]) => (
                <div key={t} className="flex gap-2.5">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[var(--primary)]" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[14px] font-medium">{t}</p>
                    <p className="text-[12px] text-[color:var(--muted-foreground)]">{s}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <h3 className={h3}>Conditions à remplir</h3>
              {[
                [true, "Chiffre d’affaires minimum : 360 k€", "Le vôtre : 2,1 M€"],
                [true, "Certification Qualipropre", "Détenue"],
                [true, "Attestations fiscales et sociales", "À jour"],
                [true, "Aucun motif d’exclusion", "BODACC et Sirene vérifiés"],
                [false, "3 références similaires", "2 sur 3 : à compléter"],
              ].map(([ok, t, s]) => (
                <div key={t as string} className="flex gap-2.5">
                  <span
                    className="grid size-[22px] shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white"
                    style={{ background: ok ? "var(--ouvert)" : "var(--dispute)" }}
                  >
                    {ok ? "✓" : "!"}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[14px] font-medium">{t}</p>
                    <p className="text-[12px] text-[color:var(--muted-foreground)]">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={section}>
            <h3 className={h3}>Risques à arbitrer</h3>
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              {[
                ["Sortant installé", "Propreté Rhône Services a remporté 36 % des marchés comparables."],
                ["Références insuffisantes", "2 références sur 3 demandées."],
                ["Capacité de démarrage", "6 salariés mobilisables pour un besoin d’environ 4."],
              ].map(([t, s], i) => (
                <div key={t} className={`flex items-center gap-4 px-4 py-3.5 ${i ? "border-t border-[var(--border)]" : ""}`}>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="text-[14px] font-semibold">{t}</p>
                    <p className="text-[12px] text-[color:var(--muted-foreground)]">{s}</p>
                  </div>
                  <Badge tone="dispute">Moyen</Badge>
                </div>
              ))}
            </div>
          </section>

          <section className={section}>
            <h3 className={h3}>Plan d’action si on y va</h3>
            {[
              ["Visez le lot 3 seul", "190 k€ par an, soit 9 % de votre activité."],
              ["Gagnez sur la technique", "Encadrant dédié, intervention sous 4 h, plan de remplacement du personnel."],
              ["Montrez votre solidité", "Marge de 6,2 %, chiffre d’affaires en hausse de 14 % en 2 ans."],
              ["Complétez vos références", "Il vous en faut 3, vous en avez 2 : prestation récente ou groupement."],
            ].map(([t, s], i) => (
              <div key={t} className="flex gap-3">
                <span className="text-[14px] font-semibold text-[color:var(--primary)]">{i + 1}.</span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[14px] font-semibold">{t}</p>
                  <p className="text-[12px] text-[color:var(--muted-foreground)]">{s}</p>
                </div>
              </div>
            ))}
          </section>

          <section className={section}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className={h3}>Avis de l’équipe</h3>
              <p className="text-[12px] text-[color:var(--muted-foreground)]" aria-live="polite">{summary}</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              <div className="flex flex-col gap-4 p-4 md:flex-row">
                <Member initials="KB" name="Karim Benali (vous)" role="Dirigeant" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <Segmented
                    label="Votre avis"
                    options={["Go", "Go sous conditions", "No go"] as Vote[]}
                    value={myVote}
                    onChange={(v) => setMyVote((cur) => (cur === v ? null : v))}
                  />
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Votre commentaire (facultatif)"
                    rows={2}
                    className="w-full resize-y rounded-xl border border-[var(--border)] px-3 py-2.5 text-[13px] outline-none placeholder:text-[color:var(--muted-foreground)] focus:border-[var(--primary)]"
                  />
                </div>
              </div>
              {[
                { initials: "SM", name: "Sophie Martin", role: "Commerciale", vote: "Go" as Vote, quote: "« Le lot 3 est à notre taille et je connais l’acheteur. »" },
                { initials: "YF", name: "Yanis Ferhat", role: "Responsable d’exploitation", vote: "Go sous conditions" as Vote, quote: "« OK si on recrute 1 agent avant le démarrage. »" },
              ].map((m) => (
                <div key={m.name} className="flex flex-col gap-4 border-t border-[var(--border)] p-4 md:flex-row">
                  <Member initials={m.initials} name={m.name} role={m.role} />
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                    <Badge tone={voteTone[m.vote]}>{m.vote}</Badge>
                    <p className="text-[13px]">{m.quote}</p>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="self-start text-[14px] font-medium text-[color:var(--primary)] hover:underline print:hidden">
              + Inviter un collègue à donner son avis
            </button>
          </section>

          <FinalDecision decision={decision} onChange={setDecision} />

          <p className="pt-6 text-[12px] text-[color:var(--muted-foreground)]">
            Scores calculés à partir des DECP 2021-2025, du BOAMP et de Sirene. Textes rédigés par Mistral à partir de ces chiffres.
          </p>
        </article>
      </main>
    </div>
  )
}

function Member({ initials, name, role }: { initials: string; name: string; role: string }) {
  return (
    <div className="flex w-[240px] shrink-0 items-start gap-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-[12px] font-semibold text-white">{initials}</span>
      <div className="flex flex-col">
        <p className="text-[14px] font-semibold">{name}</p>
        <p className="text-[12px] text-[color:var(--muted-foreground)]">{role}</p>
      </div>
    </div>
  )
}

function FinalDecision({ decision, onChange }: { decision: Decision; onChange: (d: Decision) => void }) {
  if (decision === "En attente") {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] p-5 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-[18px] font-bold leading-[1.35]">Décision finale</h3>
          <p className="text-[13px] text-[color:var(--muted-foreground)]">Karim Benali, dirigeant, tranche après avoir lu les avis.</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" onClick={() => onChange("On passe")}>On passe</Button>
          <Button onClick={() => onChange("On y va")}>On y va</Button>
        </div>
      </section>
    )
  }
  const go = decision === "On y va"
  return (
    <section
      className="flex flex-wrap items-center gap-4 rounded-2xl border p-5"
      style={{ background: go ? "var(--ouvert-fond)" : "var(--verrouille-fond)", borderColor: go ? "var(--ouvert)" : "var(--verrouille)" }}
      aria-live="polite"
    >
      <Badge tone={go ? "ouvert" : "verrouille"}>{decision}</Badge>
      <p className="flex-1 text-[13px]">Décidé par Karim Benali le 7 octobre 2026</p>
      <button type="button" onClick={() => onChange("En attente")} className="text-[13px] font-medium text-[color:var(--primary)] hover:underline print:hidden">
        Modifier
      </button>
    </section>
  )
}
