export type VerdictLabel = "Foncez" | "Coup à jouer" | "Renforcez-vous" | "Passez votre tour"

export type ControlStatus = "ok" | "missing" | "blocking"
export type RiskLevel = "Élevé" | "Moyen" | "Faible"
export type VoteValue = "Go" | "Go sous conditions" | "No go"
export type Destinataire = "dirigeant" | "commerce" | "exploitation"

export interface EligibilityControl {
  label: string
  detail: string
  status: ControlStatus
}

export interface DecisionAvis {
  id: string
  verdict: VerdictLabel
  lot: {
    number: number
    title: string
    annualAmount: number
    totalAmount: number
    caShare: number
  }
  eligible: boolean
  controls: EligibilityControl[]
  lotsCount: number
  openingScore: number
  dispersionScore: number
  operationalCapacity: number
  availableEmployees: number
  requiredEmployees: number
  referencesSufficient: boolean
  daysBeforeClosing: number
}

export interface Risk {
  label: string
  level: RiskLevel
}

export interface TeamVote {
  memberId: string
  vote: VoteValue
  comment: string
}

export interface NoteState {
  destinataire: Destinataire
  votes: Record<string, VoteValue>
  comment: string
  decision: "go" | "no-go" | null
}

export function reco(
  verdict: VerdictLabel,
  lot: DecisionAvis["lot"] | null,
  controls: EligibilityControl[],
): string {
  if (verdict === "Foncez") return "On répond."
  if (verdict === "Coup à jouer" && lot) {
    return `On répond au lot ${lot.number} seul, en jouant la qualité technique face au sortant.`
  }
  if (verdict === "Renforcez-vous") {
    const missing = controls
      .filter((control) => control.status !== "ok")
      .map((control) => control.label.toLowerCase())
      .join(", ")
    return `On ne répond pas en l’état : lever ${missing || "les exigences manquantes"} ou répondre en groupement.`
  }
  return "On passe notre tour et on prépare le renouvellement."
}

export function effort(
  avis: DecisionAvis,
): {
  days: number
  cost: number
} {
  const days =
    3 +
    (avis.referencesSufficient ? 0 : 1) +
    (avis.lotsCount > 1 ? 1 : 0) +
    (avis.eligible ? 0 : 1)
  return { days, cost: days * 450 }
}

export function risques(avis: DecisionAvis): Risk[] {
  const items: Risk[] = []
  const blocking = avis.controls.find(
    (control) => control.status === "blocking",
  )

  if (blocking) {
    items.push({
      label: `Exigence bloquante : ${blocking.label}`,
      level: "Élevé",
    })
  }
  if (avis.lot.caShare > 30) {
    items.push({
      label: `Le lot représente ${avis.lot.caShare} % du chiffre d’affaires`,
      level: "Élevé",
    })
  } else if (avis.lot.caShare > 20) {
    items.push({
      label: `Le lot représente ${avis.lot.caShare} % du chiffre d’affaires`,
      level: "Moyen",
    })
  }
  if (avis.dispersionScore < 45) {
    items.push({
      label: "Le marché reste concentré autour de quelques titulaires",
      level: avis.openingScore < 35 ? "Élevé" : "Moyen",
    })
  }
  if (!avis.referencesSufficient) {
    items.push({
      label: "Références comparables insuffisantes",
      level: "Moyen",
    })
  }
  if (avis.operationalCapacity < 60) {
    items.push({ label: "Capacité opérationnelle limitée", level: "Élevé" })
  }
  if (avis.daysBeforeClosing < 15) {
    items.push({
      label: `Clôture proche : J-${avis.daysBeforeClosing}`,
      level: "Moyen",
    })
  }

  return items.length
    ? items
    : [{ label: "Aucun risque majeur", level: "Faible" }]
}

export function votesInitiaux(avis: DecisionAvis): TeamVote[] {
  const sophieNoGo = !avis.eligible || avis.verdict === "Passez votre tour"
  const hires = Math.max(1, avis.requiredEmployees - avis.availableEmployees)

  return [
    {
      memberId: "sophie",
      vote: sophieNoGo ? "No go" : "Go",
      comment: sophieNoGo
        ? "Les conditions commerciales ne sont pas réunies."
        : "Le lot 3 est à notre taille et je connais l’acheteur.",
    },
    {
      memberId: "yanis",
      vote: avis.operationalCapacity < 75 ? "Go sous conditions" : "Go",
      comment:
        avis.operationalCapacity < 75
          ? `OK si on recrute ${hires} agent${
              hires > 1 ? "s" : ""
            } avant le démarrage.`
          : "La capacité actuelle permet d’absorber le démarrage.",
    },
  ]
}

export function createInitialNoteState(avis: DecisionAvis): NoteState {
  const initialVotes = votesInitiaux(avis)
  return {
    destinataire: "dirigeant",
    votes: {
      ...Object.fromEntries(
        initialVotes.map((vote) => [vote.memberId, vote.vote]),
      ),
    },
    comment: "",
    decision: null,
  }
}
