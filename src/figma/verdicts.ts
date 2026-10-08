import type { Tone } from "./ui"

export type VerdictId = "metropole" | "villeurbanne" | "lyon" | "hospices"
export type VerdictKind = "coup" | "foncez" | "renforcez" | "passez"

export interface Component {
  name: string
  detail: string
  weight: string
  score: string
}

export interface Requirement {
  state: "ok" | "warn" | "ko"
  name: string
  detail: string
}

export interface Lever {
  title: string
  text: string
}

export interface VerdictData {
  id: VerdictId
  kind: VerdictKind
  title: string
  context: string
  /** Position du repère dans la matrice 340 px (coin haut-gauche du halo de 40 px) */
  marker: { haloX: number; haloY: number; labelX: number; labelY: number; label: string }
  opening: number
  capacity: number
  summary: string
  openingComponents: Component[]
  eligibility: { ok: boolean; text: string }
  capacityComponents: Component[]
  /** La version complète (Métropole) contient la partie « Le marché est-il ouvert ? » */
  full: boolean
  partNumber: { canWin: string; strategy: string }
  canWinSubtitle: string
  eligibilityTitle: string
  requirements: Requirement[]
  lotWeight: string
  buyerView: string
  strategyTitle: string
  strategySubtitle: string
  levers: Lever[]
  primaryAction: string
  primaryIsAlert: boolean
}

export const verdictLabels: Record<VerdictKind, { label: string; icon: string; tone: Tone | "renforcez" }> = {
  coup: { label: "Coup à jouer", icon: "★", tone: "dispute" },
  foncez: { label: "Foncez", icon: "✓", tone: "ouvert" },
  renforcez: { label: "Renforcez-vous", icon: "+", tone: "renforcez" },
  passez: { label: "Passez votre tour", icon: "✕", tone: "verrouille" },
}

const financeComponent = (score: string): Component => ({
  name: "Santé financière",
  detail: "Marge 6,2 %, CA +14 % sur 2 ans, fonds propres 560 k€",
  weight: "35 %",
  score,
})

const openingNames = [
  ["Dispersion des gagnants", "35 %"],
  ["Concurrence réelle", "25 %"],
  ["Rotation des titulaires", "20 %"],
  ["Place des PME", "20 %"],
] as const

const opening = (details: string[], scores: string[]): Component[] =>
  openingNames.map(([name, weight], i) => ({ name, weight, detail: details[i], score: scores[i] }))

export const verdicts: Record<VerdictId, VerdictData> = {
  metropole: {
    id: "metropole",
    kind: "coup",
    title: "Nettoyage des bâtiments administratifs",
    context: "Métropole de Lyon  ·  Accord-cadre 4 ans  ·  3 lots  ·  2,4 M€ estimés",
    marker: { haloX: 123, haloY: 68, labelX: 157, labelY: 58, label: "Vous" },
    opening: 42,
    capacity: 74,
    summary:
      "Le marché est tenu par un sortant solide, mais votre entreprise coche toutes les exigences du lot 3 et votre santé financière est meilleure que la moyenne des PME du secteur. Ce lot pèserait 9 % de votre chiffre d’affaires : l’acheteur n’y verra aucun risque de dépendance.",
    openingComponents: opening(
      [
        "Les 3 premiers ont remporté 71 % des marchés",
        "3,0 offres reçues en moyenne",
        "Le titulaire le plus fréquent détient 36 % des marchés",
        "4 marchés sur 14 gagnés par des PME (< 250 salariés, Sirene)",
      ],
      ["36", "44", "45", "48"],
    ),
    eligibility: {
      ok: true,
      text: "Si une exigence obligatoire manque, le verdict devient « Renforcez-vous » ou « Passez votre tour », quel que soit le score.",
    },
    capacityComponents: [
      financeComponent("88"),
      { name: "Poids du lot", detail: "Lot 3 = 9 % de votre CA (zone idéale : 5 à 30 %)", weight: "25 %", score: "85" },
      { name: "Références publiques similaires", detail: "2 marchés comparables sur 3 demandés", weight: "25 %", score: "44" },
      { name: "Capacité opérationnelle", detail: "Environ 6 salariés mobilisables", weight: "15 %", score: "70" },
    ],
    full: true,
    partNumber: { canWin: "2.", strategy: "3." },
    canWinSubtitle: "Votre profil comparé aux exigences du lot 3 et à ce que l’acheteur regardera",
    eligibilityTitle: "Éligibilité au lot 3",
    requirements: [
      { state: "ok", name: "CA minimum exigé : 360 k€", detail: "Le vôtre : 2,1 M€" },
      { state: "ok", name: "Certification Qualipropre", detail: "Valide jusqu’en 2027" },
      { state: "ok", name: "Attestations fiscales et sociales", detail: "À jour" },
      { state: "ok", name: "Assurance responsabilité civile", detail: "Couverture suffisante" },
      { state: "warn", name: "3 références similaires", detail: "2 sur 3 : ajoutez la vitrerie de la Ville de Lyon" },
    ],
    lotWeight: "9 %",
    buyerView: "Une entreprise rentable, en croissance, sans dépendance à ce contrat : un partenaire fiable pour 4 ans.",
    strategyTitle: "Votre stratégie pour battre le sortant",
    strategySubtitle: "Face à Propreté Rhône Services (180 salariés, titulaire depuis 2017)",
    levers: [
      { title: "Visez le lot 3 seul", text: "Sites de moins de 1 000 m² : votre taille est un atout, pas un handicap. Les lots 1 et 2 exigent des références que vous n’avez pas encore." },
      { title: "Gagnez sur la technique", text: "La note technique pèse 60 %. Proposez un encadrant dédié, une intervention sous 4 h et un plan de remplacement : c’est là que le sortant a été le moins bien noté en 2025." },
      { title: "Montrez votre solidité", text: "Mettez en avant votre croissance et votre marge : l’acheteur cherche un partenaire stable pour 4 ans, sans risque de défaillance." },
      { title: "Complétez votre 3e référence", text: "Ajoutez la vitrerie des médiathèques de Lyon. Sinon, un groupement avec Éclat Services couvrirait l’exigence." },
    ],
    primaryAction: "Préparer ma réponse au lot 3",
    primaryIsAlert: false,
  },
  villeurbanne: {
    id: "villeurbanne",
    kind: "foncez",
    title: "Nettoyage des groupes scolaires",
    context: "Ville de Villeurbanne  ·  3 ans  ·  lot unique  ·  480 k€ estimés  ·  clôture J-12",
    marker: { haloX: 245, haloY: 17, labelX: 279, labelY: 7, label: "Vous" },
    opening: 78,
    capacity: 89,
    summary:
      "Sur 12 marchés comparables de cet acheteur depuis 2021, aucune entreprise n’en a remporté plus de 2, avec 5,8 offres reçues en moyenne. Votre entreprise coche toutes les exigences du lot unique, qui pèserait 8 % de votre chiffre d’affaires. Le marché est ouvert et votre profil est solide : c’est une opportunité à saisir.",
    openingComponents: opening(
      [
        "Les 3 premiers ont remporté 50 % des marchés",
        "5,8 offres reçues en moyenne",
        "Le titulaire le plus fréquent détient 17 % des marchés",
        "10 marchés sur 12 gagnés par des PME (< 250 salariés, Sirene)",
      ],
      ["50", "97", "83", "100"],
    ),
    eligibility: {
      ok: true,
      text: "Si une exigence obligatoire manque, le verdict devient « Renforcez-vous » ou « Passez votre tour », quel que soit le score.",
    },
    capacityComponents: [
      financeComponent("88"),
      { name: "Poids du lot", detail: "Lot unique = 8 % de votre CA (zone idéale : 5 à 30 %)", weight: "25 %", score: "82" },
      { name: "Références publiques similaires", detail: "2 marchés comparables sur 2 demandés", weight: "25 %", score: "100" },
      { name: "Capacité opérationnelle", detail: "Environ 6 salariés mobilisables", weight: "15 %", score: "84" },
    ],
    full: false,
    partNumber: { canWin: "1.", strategy: "2." },
    canWinSubtitle: "Votre profil comparé aux exigences du lot unique et à ce que l’acheteur regardera",
    eligibilityTitle: "Éligibilité · lot unique",
    requirements: [
      { state: "ok", name: "Chiffre d’affaires minimum : 320 k€", detail: "Le vôtre : 2,1 M€" },
      { state: "ok", name: "Certification Qualipropre", detail: "Détenue" },
      { state: "ok", name: "Attestations fiscales et sociales", detail: "À jour" },
      { state: "ok", name: "Aucun motif d’exclusion", detail: "BODACC et Sirene vérifiés" },
      { state: "ok", name: "2 références similaires", detail: "2 fournies" },
    ],
    lotWeight: "8 %",
    buyerView: "Une entreprise rentable, déjà connue de l’acheteur, sans dépendance à ce contrat : un partenaire fiable.",
    strategyTitle: "Votre stratégie pour gagner",
    strategySubtitle: "Un marché ouvert où vous avez déjà gagné : transformez l’essai",
    levers: [
      { title: "Répondez sans attendre", text: "Clôture dans 12 jours : lancez le dossier cette semaine, le marché est ouvert et l’acheteur change souvent de titulaire." },
      { title: "Montrez votre solidité", text: "Marge de 6,2 %, chiffre d’affaires en hausse de 14 % en 2 ans : mettez-le en avant, l’acheteur cherche un partenaire stable." },
      { title: "Valorisez vos victoires", text: "Vous avez déjà remporté 2 marchés de cet acheteur : citez-les en premier dans votre mémoire." },
      { title: "Soignez le prix", text: "Votre structure de coûts est plus légère que celle des grands groupes : restez compétitif sans brader la qualité." },
    ],
    primaryAction: "Préparer ma réponse",
    primaryIsAlert: false,
  },
  lyon: {
    id: "lyon",
    kind: "renforcez",
    title: "Vitrerie des équipements culturels",
    context: "Ville de Lyon  ·  2 ans  ·  lot unique  ·  210 k€ estimés  ·  clôture J-17",
    marker: { haloX: 221, haloY: 235, labelX: 181, labelY: 221, label: "Vous · non éligible" },
    opening: 71,
    capacity: 90,
    summary:
      "Sur 8 marchés comparables de cet acheteur depuis 2021, 3 entreprises en ont remporté 5, avec 5,5 offres reçues en moyenne. Le marché est ouvert, mais votre entreprise ne détient pas l’habilitation travaux en hauteur exigée : en l’état, votre offre serait écartée.",
    openingComponents: opening(
      [
        "Les 3 premiers ont remporté 63 % des marchés",
        "5,5 offres reçues en moyenne",
        "Le titulaire le plus fréquent détient 25 % des marchés",
        "7 marchés sur 8 gagnés par des PME (< 250 salariés, Sirene)",
      ],
      ["38", "90", "75", "100"],
    ),
    eligibility: {
      ok: false,
      text: "Exigence manquante : habilitation travaux en hauteur. Le verdict devient « Renforcez-vous », quel que soit le score.",
    },
    capacityComponents: [
      financeComponent("88"),
      { name: "Poids du lot", detail: "Lot unique = 5 % de votre CA (zone idéale : 5 à 30 %)", weight: "25 %", score: "75" },
      { name: "Références publiques similaires", detail: "2 marchés comparables sur 2 demandés", weight: "25 %", score: "100" },
      { name: "Capacité opérationnelle", detail: "Environ 6 salariés mobilisables", weight: "15 %", score: "100" },
    ],
    full: false,
    partNumber: { canWin: "1.", strategy: "2." },
    canWinSubtitle: "Votre profil comparé aux exigences du lot unique et à ce que l’acheteur regardera",
    eligibilityTitle: "Éligibilité · lot unique",
    requirements: [
      { state: "ok", name: "Chiffre d’affaires minimum : 210 k€", detail: "Le vôtre : 2,1 M€" },
      { state: "ko", name: "Habilitation travaux en hauteur", detail: "Manquante : exigence obligatoire" },
      { state: "ok", name: "Attestations fiscales et sociales", detail: "À jour" },
      { state: "ok", name: "Aucun motif d’exclusion", detail: "BODACC et Sirene vérifiés" },
      { state: "ok", name: "2 références similaires", detail: "2 fournies" },
    ],
    lotWeight: "5 %",
    buyerView: "Un prestataire solide, mais sans l’habilitation exigée : l’offre serait écartée avant d’être lue.",
    strategyTitle: "Avant de répondre",
    strategySubtitle: "Ce qu’il faut faire avant de pouvoir répondre",
    levers: [
      { title: "Levez le point bloquant", text: "Obtenez l’habilitation travaux en hauteur. Sans elle, votre offre sera déclarée irrecevable." },
      { title: "Envisagez un groupement", text: "Un cotraitant habilité permet de répondre ensemble : les capacités du groupement s’additionnent." },
      { title: "Préparez le prochain renouvellement", text: "Ce marché reviendra en 2028 : nous vous préviendrons 6 mois avant son échéance." },
    ],
    primaryAction: "Me prévenir du renouvellement",
    primaryIsAlert: true,
  },
  hospices: {
    id: "hospices",
    kind: "passez",
    title: "Nettoyage du centre hospitalier",
    context: "Hospices Civils de Lyon  ·  4 ans  ·  lot unique  ·  3,8 M€ estimés  ·  clôture J-9",
    marker: { haloX: 41, haloY: 170, labelX: 75, labelY: 160, label: "Vous" },
    opening: 18,
    capacity: 44,
    summary:
      "Sur 10 marchés comparables depuis 2021, Hygia Santé Services en a remporté 6, avec seulement 1,6 offre reçue en moyenne. Votre entreprise n’atteint pas le chiffre d’affaires minimum (2,5 M€) et ne détient pas la certification bionettoyage : en l’état, votre offre serait écartée.",
    openingComponents: opening(
      [
        "Les 3 premiers ont remporté 90 % des marchés",
        "1,6 offres reçues en moyenne",
        "Le titulaire le plus fréquent détient 60 % des marchés",
        "1 marchés sur 10 gagnés par des PME (< 250 salariés, Sirene)",
      ],
      ["10", "12", "40", "17"],
    ),
    eligibility: {
      ok: false,
      text: "Exigence manquante : chiffre d’affaires minimum : 2,5 m€, certification bionettoyage. Le verdict devient « Passez votre tour », quel que soit le score.",
    },
    capacityComponents: [
      financeComponent("88"),
      { name: "Poids du lot", detail: "Lot unique = 45 % de votre CA (zone idéale : 5 à 30 %)", weight: "25 %", score: "0" },
      { name: "Références publiques similaires", detail: "2 marchés comparables sur 3 demandés", weight: "25 %", score: "44" },
      { name: "Capacité opérationnelle", detail: "Environ 6 salariés mobilisables", weight: "15 %", score: "14" },
    ],
    full: false,
    partNumber: { canWin: "1.", strategy: "2." },
    canWinSubtitle: "Votre profil comparé aux exigences du lot unique et à ce que l’acheteur regardera",
    eligibilityTitle: "Éligibilité · lot unique",
    requirements: [
      { state: "ko", name: "Chiffre d’affaires minimum : 2,5 M€", detail: "Le vôtre : 2,1 M€" },
      { state: "ok", name: "Certification Qualipropre", detail: "Détenue" },
      { state: "ko", name: "Certification Bionettoyage", detail: "Manquante : exigence obligatoire" },
      { state: "ok", name: "Attestations fiscales et sociales", detail: "À jour" },
      { state: "warn", name: "3 références similaires", detail: "2 sur 3 : à compléter" },
    ],
    lotWeight: "45 %",
    buyerView: "Un contrat qui pèserait 45 % de votre activité : l’acheteur y verra un risque de dépendance.",
    strategyTitle: "Avant de répondre",
    strategySubtitle: "Ce qu’il faut faire avant de pouvoir répondre",
    levers: [
      { title: "Ne répondez pas cette fois", text: "Deux exigences obligatoires manquent : le temps de réponse serait perdu." },
      { title: "Envisagez un groupement", text: "Avec un spécialiste du bionettoyage, les capacités du groupement s’additionnent et le CA minimum peut être atteint." },
      { title: "Préparez le prochain renouvellement", text: "Ce marché reviendra en 2030 : nous vous préviendrons 6 mois avant son échéance." },
    ],
    primaryAction: "Me prévenir du renouvellement",
    primaryIsAlert: true,
  },
}
