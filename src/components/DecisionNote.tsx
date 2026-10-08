import { useEffect, useMemo, useState } from "react"
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Copy,
  Euro,
  FileCheck2,
  MessageSquarePlus,
  Printer,
  ShieldAlert,
  Target,
  Users,
  XCircle,
} from "lucide-react"
import { writeDecisionNote } from "../analyze"
import {
  decisionAvis,
  decisionProofs,
  decisionRisks,
  equipe,
  writeStrategy,
} from "../mockData"
import {
  effort,
  reco,
  votesInitiaux,
  type ControlStatus,
  type Destinataire,
  type NoteState,
  type VoteValue,
} from "../lib/note"
import MistralBadge from "./MistralBadge"
import BrandLogo from "./BrandLogo"

interface Recipient {
  id: Destinataire
  label: string
}

const recipients: Recipient[] = [
  { id: "dirigeant", label: "Dirigeant" },
  { id: "commerce", label: "Commerce" },
  { id: "exploitation", label: "Exploitation" },
]

const voteOptions: VoteValue[] = ["Go", "Go sous conditions", "No go"]

const voteStyles: Record<VoteValue, string> = {
  Go: "border-success/20 bg-success-soft text-success-dark",
  "Go sous conditions": "border-warning/20 bg-warning-soft text-warning-dark",
  "No go": "border-danger/20 bg-danger-soft text-danger-dark",
}

const controlIcons: Record<ControlStatus, {
  icon: typeof CheckCircle2
  className: string
}> = {
  ok: { icon: CheckCircle2, className: "text-success" },
  missing: { icon: CircleAlert, className: "text-warning" },
  blocking: { icon: XCircle, className: "text-danger" },
}

interface DecisionNoteProps {
  state: NoteState
  onStateChange: (state: NoteState) => void
  onBack: () => void
  onToast: (message: string) => void
}

export default function DecisionNote({
  state,
  onStateChange,
  onBack,
  onToast,
}: DecisionNoteProps) {
  const [mistralText, setMistralText] = useState("")
  const [isWriting, setIsWriting] = useState(true)
  const effortEstimate = useMemo(() => effort(decisionAvis), [])
  const initialVotes = useMemo(() => votesInitiaux(decisionAvis), [])
  const today = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date())

  useEffect(() => {
    let active = true
    setIsWriting(true)
    void writeDecisionNote(decisionAvis, state.destinataire).then((text) => {
      if (active) {
        setMistralText(text)
        setIsWriting(false)
      }
    })
    return () => {
      active = false
    }
  }, [state.destinataire])

  const counts = voteOptions.reduce(
    (result, vote) => {
      result[vote] = Object.values(state.votes).filter(
        (value) => value === vote,
      ).length
      return result
    },
    { Go: 0, "Go sous conditions": 0, "No go": 0 } as Record<VoteValue, number>,
  )
  const pendingVotes = equipe.length - Object.keys(state.votes).length

  const updateState = (patch: Partial<NoteState>) => {
    onStateChange({ ...state, ...patch })
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      // The preview may not grant clipboard permissions; the toast still
      // confirms that the sharing action is available in the prototype.
    }
    onToast("Lien de la note copié")
  }

  return (
    <main className="note-page mx-auto max-w-[964px] px-4 py-8 sm:px-8 sm:py-12">
      <nav className="print-hidden mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <BrandLogo />
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <ArrowLeft size={17} />
            Retour au verdict
          </button>
        </div>
        <div className="flex flex-col gap-2 xs:flex-row">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Copy size={16} />
            Partager le lien
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-button transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Printer size={16} />
            Imprimer ou PDF
          </button>
        </div>
      </nav>

      <article className="note-card overflow-hidden rounded-3xl border border-line bg-white shadow-card">
        <header className="border-b border-line p-6 sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
            Note de décision · Go / No go
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
            {decisionAvis.subject}
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            {decisionAvis.buyer} · n° BOAMP {decisionAvis.boamp} · Lot{" "}
            {decisionAvis.lot.number} analysé · Clôture J-
            {decisionAvis.daysBeforeClosing}
          </p>
          <div className="mt-7 flex items-center gap-3 border-t border-line pt-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-white">
              KB
            </span>
            <p className="text-sm leading-6">
              <strong>Préparée par Karim Benali</strong>
              <br />
              <span className="text-muted">Brillance Lyon PME · {today}</span>
            </p>
          </div>
        </header>

        <div className="space-y-10 p-6 sm:p-10">
          <section className="print-break-avoid rounded-2xl bg-canvas p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-2.5">
              <p className="text-[13px] text-muted">Rédigée pour</p>
              <div
                role="radiogroup"
                aria-label="Destinataire de la note"
                className="print-hidden grid flex-1 grid-cols-3 rounded-full border border-line bg-canvas p-1 sm:flex sm:flex-none"
              >
                {recipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    type="button"
                    role="radio"
                    aria-checked={state.destinataire === recipient.id}
                    onClick={() => updateState({ destinataire: recipient.id })}
                    className={`rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                      state.destinataire === recipient.id
                        ? "bg-primary text-white"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {recipient.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-warning-soft px-4 py-2 text-[26px] font-bold leading-tight text-warning-dark">
                <span className="grid size-6 place-items-center rounded-full bg-warning text-[13px] text-white">
                  ★
                </span>
                {decisionAvis.verdict}
              </span>
              <div>
                <p className="text-[26px] font-bold leading-tight">
                  {decisionAvis.openingScore}/100
                </p>
                <p className="text-xs text-muted">Ouverture · Disputé</p>
              </div>
              <div>
                <p className="text-[26px] font-bold leading-tight">
                  {decisionAvis.operationalCapacity}/100
                </p>
                <p className="text-xs text-muted">Capacité</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-primary">
                Recommandation
              </p>
              <p className="mt-1 text-[22px] font-bold leading-[1.3]">
                {reco(
                  decisionAvis.verdict,
                  decisionAvis.lot,
                  decisionAvis.controls,
                )}
              </p>
              <div className="mt-3">
                <MistralBadge
                  label={`Rédigé par Mistral pour : ${state.destinataire}`}
                />
              </div>
              <p
                className={`mt-4 text-lg leading-7 transition-opacity ${
                  isWriting ? "opacity-50" : "opacity-100"
                }`}
                aria-live="polite"
              >
                {isWriting
                  ? "Mistral adapte la note au destinataire…"
                  : mistralText}
              </p>
            </div>
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            <section className="print-break-avoid rounded-2xl border border-line p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-success-soft text-success">
                  <Euro size={19} />
                </span>
                <h2 className="text-lg font-extrabold">Ce que ça rapporte</h2>
              </div>
              <dl className="grid grid-cols-2 gap-x-5 gap-y-6">
                {[
                  [
                    "Par an",
                    `${decisionAvis.lot.annualAmount.toLocaleString("fr-FR")} €`,
                  ],
                  [
                    "Sur la durée",
                    `${decisionAvis.lot.totalAmount.toLocaleString("fr-FR")} €`,
                  ],
                  ["Part du CA", `${decisionAvis.lot.caShare} %`],
                  ["Lots visés", `Lot ${decisionAvis.lot.number} seul`],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd className="mt-1 font-extrabold">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="print-break-avoid rounded-2xl border border-line p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary">
                  <Clock3 size={19} />
                </span>
                <h2 className="text-lg font-extrabold">Ce que ça coûte</h2>
              </div>
              <dl className="grid grid-cols-2 gap-x-5 gap-y-6">
                <div>
                  <dt className="text-xs text-muted">Jours de travail</dt>
                  <dd className="mt-1 font-extrabold">
                    {effortEstimate.days} jours
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Temps interne</dt>
                  <dd className="mt-1 font-extrabold">≈ 2 k€</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Mémoire technique</dt>
                  <dd className="mt-1 font-extrabold">2 à 3 jours</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Dossier administratif</dt>
                  <dd className="mt-1 font-extrabold">1 jour</dd>
                </div>
              </dl>
              <p className="mt-5 text-xs text-muted">Estimation indicative</p>
            </section>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <section className="print-break-avoid rounded-2xl border border-line p-6">
              <div className="mb-5 flex items-center gap-3">
                <Target size={20} className="text-primary" />
                <h2 className="text-lg font-extrabold">Pourquoi ce verdict</h2>
              </div>
              <div className="space-y-4">
                {decisionProofs.map((proof) => (
                  <div key={proof.label} className="flex items-start gap-4">
                    <img
                      src="/assets/6808f.svg"
                      width="8"
                      height="8"
                      alt=""
                      className="mt-2"
                    />
                    <strong className="min-w-14 text-xl tracking-[-0.04em] text-primary">
                      {proof.value}
                    </strong>
                    <p className="pt-1 text-sm leading-5 text-muted">
                      {proof.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="print-break-avoid rounded-2xl border border-line p-6">
              <div className="mb-5 flex items-center gap-3">
                <FileCheck2 size={20} className="text-primary" />
                <h2 className="text-lg font-extrabold">Conditions à remplir</h2>
              </div>
              <div className="space-y-4">
                {decisionAvis.controls.map((control) => {
                  const iconConfig = controlIcons[control.status]
                  const Icon = iconConfig.icon
                  return (
                    <div key={control.label} className="flex items-start gap-3">
                      <Icon
                        size={19}
                        className={`mt-0.5 shrink-0 ${iconConfig.className}`}
                      />
                      <div>
                        <p className="text-sm font-bold">{control.label}</p>
                        <p className="mt-0.5 text-xs leading-5 text-muted">
                          {control.detail}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          <section className="print-break-avoid border-t border-line pt-9">
            <div className="mb-5 flex items-center gap-3">
              <ShieldAlert size={20} className="text-warning" />
              <h2 className="text-xl font-extrabold">Risques à arbitrer</h2>
            </div>
            <div className="divide-y divide-line rounded-2xl border border-line">
              {decisionRisks.map((risk) => (
                <div
                  key={risk.label}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold">{risk.label}</p>
                    <p className="mt-0.5 text-xs text-muted">{risk.detail}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-semibold text-warning-dark">
                    {risk.level}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="print-break-avoid border-t border-line pt-9">
            <div className="mb-5 flex items-center gap-3">
              <BriefcaseBusiness size={20} className="text-primary" />
              <h2 className="text-xl font-extrabold">
                Plan d’action si on y va
              </h2>
            </div>
            <ol className="space-y-4">
              {writeStrategy.map((action, index) => (
                <li key={action} className="flex items-start gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-extrabold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-6">{action}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-t border-line pt-9">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-primary" />
                <h2 className="text-xl font-extrabold">Avis de l’équipe</h2>
              </div>
              <p className="text-xs text-muted">
                {counts.Go} go · {counts["Go sous conditions"]} sous conditions
                · {pendingVotes} en attente
              </p>
            </div>

            <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
              <div className="flex flex-col gap-4 p-5 md:flex-row md:items-start">
                <div className="flex shrink-0 items-center gap-3 md:w-60">
                  <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-extrabold text-white">
                    KB
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">
                      Karim Benali <span className="text-muted">(vous)</span>
                    </p>
                    <p className="text-xs text-muted">Dirigeant</p>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="print-hidden inline-grid grid-cols-3 rounded-full border border-line bg-canvas p-1">
                    {voteOptions.map((vote) => (
                      <button
                        key={vote}
                        type="button"
                        onClick={() =>
                          updateState({
                            votes: { ...state.votes, karim: vote },
                          })
                        }
                        className={`rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                          state.votes.karim === vote
                            ? "bg-primary text-white"
                            : "text-muted hover:text-ink"
                        }`}
                      >
                        {vote}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={state.comment}
                    onChange={(event) =>
                      updateState({ comment: event.target.value })
                    }
                    placeholder="Votre commentaire (facultatif)"
                    className="print-hidden mt-2 min-h-14 w-full resize-y rounded-xl border border-line bg-white px-3 py-2.5 text-[13px] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </div>

              {initialVotes.map((teamVote) => {
                const member = equipe.find(
                  (person) => person.id === teamVote.memberId,
                )
                if (!member) return null
                return (
                  <div
                    key={member.id}
                    className="flex flex-col gap-4 p-5 md:flex-row md:items-start"
                  >
                    <div className="flex shrink-0 items-center gap-3 md:w-60">
                      <span className="grid size-9 place-items-center rounded-full bg-canvas text-xs font-extrabold text-primary">
                        {member.initiales}
                      </span>
                      <div>
                        <p className="text-sm font-extrabold">{member.nom}</p>
                        <p className="text-xs text-muted">{member.role}</p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-extrabold ${voteStyles[state.votes[member.id] ?? teamVote.vote]}`}
                      >
                        {state.votes[member.id] ?? teamVote.vote}
                      </span>
                      <blockquote className="mt-2 text-[13px] leading-5">
                        « {teamVote.comment} »
                      </blockquote>
                    </div>
                  </div>
                )
              })}
            </div>
            <button
              type="button"
              onClick={() => onToast("Invitation prête à être envoyée")}
              className="print-hidden mt-4 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <MessageSquarePlus size={16} />+ Inviter un collègue à donner son
              avis
            </button>
          </section>

          <section className="print-break-avoid border-t border-line pt-9">
            {state.decision ? (
              <div
                className={`flex flex-col gap-4 rounded-2xl border-2 p-5 sm:flex-row sm:items-center ${
                  state.decision === "go"
                    ? "border-success bg-success-soft"
                    : "border-danger bg-danger-soft"
                }`}
              >
                <span
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    state.decision === "go"
                      ? "text-success"
                      : "text-danger-dark"
                  }`}
                >
                  {state.decision === "go" ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <XCircle size={16} />
                  )}
                  Décision : {state.decision === "go" ? "on y va" : "on passe"}
                </span>
                <p className="text-[13px] text-muted">
                  Décidé par Karim Benali le {today}
                </p>
                <button
                  type="button"
                  onClick={() => updateState({ decision: null })}
                  className="print-hidden text-left text-[13px] font-medium text-primary underline sm:ml-1"
                >
                  Modifier
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5 rounded-2xl border-2 border-dashed border-line p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold">Décision finale</h2>
                  <p className="mt-1 text-[13px] text-muted">
                    Karim Benali, dirigeant, tranche après avoir lu les avis.
                  </p>
                </div>
                <div className="print-hidden flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => updateState({ decision: "no-go" })}
                    className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-semibold hover:bg-canvas"
                  >
                    On passe
                  </button>
                  <button
                    type="button"
                    onClick={() => updateState({ decision: "go" })}
                    className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
                  >
                    On y va
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        <footer className="border-t border-line bg-canvas px-6 py-5 text-xs leading-5 text-muted sm:px-10">
          Scores calculés à partir des DECP 2021-2025, du BOAMP et de Sirene.
          Textes rédigés par Mistral à partir de ces chiffres.
        </footer>
      </article>
    </main>
  )
}
