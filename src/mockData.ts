export type Status = "open" | "contested" | "locked"
export type SourceCategory = "winners" | "competition" | "renewals" | "sme"

import type { DecisionAvis, Destinataire } from "./lib/note"

export interface Winner {
  name: string
  count: number
  share: number
}

export interface MarketSource {
  id: string
  categories: SourceCategory[]
  date: string
  buyer: string
  subject: string
  winner: string
  amount: string
  offers: number
}

export interface Verdict {
  status: Status
  score: number
  headline: string
  explanation: string
  recommendation: string
  scoreContext: string
}

export const exampleTender =
  "Avis de marché — Métropole de Lyon\n\nAccord-cadre de services pour le nettoyage courant et périodique des bâtiments administratifs de la Métropole de Lyon. Durée : 4 ans. Montant estimé : 2 400 000 € HT.\n\nLot 1 : bâtiments centraux et sites à forte fréquentation.\nLot 2 : sites techniques et industriels.\nLot 3 : sites administratifs de moins de 1 000 m².\n\nLes prestations comprennent l’entretien des sols, sanitaires, vitreries et espaces communs. Attribution selon la valeur technique (55 %) et le prix (45 %)."

export const analysisSteps = [
  "Lecture de l’avis BOAMP et du règlement de consultation",
  "Identification du secteur et de l’acheteur",
  "Recherche de 14 marchés similaires depuis 2021",
  "Rédaction du verdict",
]

export const extractedDetails = [
  { label: "Secteur", value: "Nettoyage de locaux" },
  { label: "Acheteur", value: "Métropole de Lyon" },
  { label: "Montant", value: "2,4 M€" },
  { label: "Durée", value: "4 ans" },
  { label: "Lots", value: "3" },
]

export const verdict: Verdict = {
  status: "contested",
  score: 42,
  headline: "Il reste une place, mais pas sur tous les lots.",
  explanation:
    "Sur 14 marchés de nettoyage de la Métropole depuis 2021, 3 entreprises en ont remporté 9. Le titulaire actuel a été reconduit 2 fois sur 3. Mais 4 lots ont été gagnés par des PME de moins de 50 salariés, et le lot 3 de ce marché (sites de moins de 1 000 m²) correspond à leur profil.",
  recommendation: "Répondez au lot 3, pas aux lots 1 et 2.",
  scoreContext:
    "Un score intermédiaire : le marché est concentré, mais les petits lots restent accessibles aux PME.",
}

export const decisionAvis: DecisionAvis & {
  subject: string
  buyer: string
  boamp: string
  closingDate: string
  durationYears: number
  annualRevenue: number
  certifications: string[]
} = {
  id: "avis-lyon",
  subject: "Nettoyage des bâtiments administratifs de la Métropole de Lyon",
  buyer: "Métropole de Lyon",
  boamp: "25-18472",
  closingDate: "18 décembre 2025",
  verdict: "Coup à jouer",
  lot: {
    number: 3,
    title: "Sites administratifs de moins de 1 000 m²",
    annualAmount: 190000,
    totalAmount: 760000,
    caShare: 9,
  },
  durationYears: 4,
  annualRevenue: 2110000,
  eligible: true,
  controls: [
    {
      label: "Chiffre d’affaires minimum",
      detail: "2,1 M€ ≥ 360 k€ minimum",
      status: "ok",
    },
    {
      label: "Références comparables",
      detail: "2 références comparables sur 3 demandées",
      status: "missing",
    },
    {
      label: "Certification Qualipropre",
      detail: "Certification à jour",
      status: "ok",
    },
    {
      label: "Attestations fiscales et sociales",
      detail: "À jour",
      status: "ok",
    },
  ],
  lotsCount: 3,
  openingScore: 42,
  dispersionScore: 39,
  operationalCapacity: 74,
  availableEmployees: 6,
  requiredEmployees: 4,
  referencesSufficient: false,
  daysBeforeClosing: 21,
  certifications: ["Qualipropre", "ISO 9001"],
}

export const textesMistral: Record<Destinataire, string> = {
  dirigeant:
    "Le contrat représente 190 k€ par an (760 k€ sur 4 ans), soit 9 % de notre chiffre d’affaires, sans créer de dépendance. Répondre demande environ 5 jours de travail. Le marché reste tenu par Propreté Rhône Services, mais notre santé financière nous rend crédibles face à lui.",
  commerce:
    "Le marché est disputé : Propreté Rhône Services a remporté 36 % des marchés comparables, avec 3 offres en moyenne. 4 marchés sur 14 sont allés à des PME, l’acheteur leur laisse donc une place. Nos arguments : proximité, solidité financière (marge de 6,2 %) et un encadrant dédié au site.",
  exploitation:
    "Le lot 3 représente environ 190 k€ par an, soit un besoin d’environ 4 équivalents temps plein. Nous avons 6 salariés mobilisables, ce qui couvre le besoin. Certification demandée : Qualipropre. Le mémoire technique devra détailler le plan de remplacement du personnel et les délais d’intervention.",
}

export const equipe = [
  { id: "karim", nom: "Karim Benali", role: "Dirigeant", initiales: "KB" },
  { id: "sophie", nom: "Sophie Martin", role: "Commerciale", initiales: "SM" },
  {
    id: "yanis",
    nom: "Yanis Ferhat",
    role: "Responsable d’exploitation",
    initiales: "YF",
  },
]

export const decisionProofs = [
  { value: "71 %", label: "des marchés comparables gagnés par les 3 premiers" },
  { value: "3", label: "offres reçues en moyenne, contre 5,1 pour le secteur" },
  { value: "4 / 14", label: "marchés gagnés par des PME" },
]

export const decisionRisks = [
  {
    label: "Sortant installé",
    detail: "Propreté Rhône Services a remporté 36 % des marchés comparables.",
    level: "Moyen",
  },
  {
    label: "Références insuffisantes",
    detail: "2 références sur 3 demandées.",
    level: "Moyen",
  },
  {
    label: "Capacité de démarrage",
    detail: "6 salariés mobilisables pour un besoin d’environ 4.",
    level: "Moyen",
  },
]

export const writeStrategy = [
  "Visez le lot 3 seul — 190 k€ par an, soit 9 % de votre activité.",
  "Gagnez sur la technique — encadrant dédié, intervention sous 4 h, plan de remplacement.",
  "Montrez votre solidité — marge de 6,2 %, chiffre d’affaires en hausse de 14 % sur 3 ans.",
  "Complétez vos références — invitez un client récent ou répondez en groupement.",
]

export const marketNotices = [
  {
    id: "groupes-scolaires",
    title: "Nettoyage des groupes scolaires",
    meta: "Ville de Villeurbanne · BOAMP 26-117902 · 480 k€ · 3 ans · Clôture J-12",
    status: "Ouvert",
    score: 78,
    chance: "Foncez",
  },
  {
    id: "avis-lyon",
    title: "Nettoyage des bâtiments administratifs",
    meta: "Métropole de Lyon · BOAMP 26-118342 · 2,4 M€ · 4 ans · 3 lots · Clôture J-21",
    status: "Disputé",
    score: 42,
    chance: "Coup à jouer (lot 3)",
  },
  {
    id: "vitrerie",
    title: "Vitrerie des équipements culturels",
    meta: "Ville de Lyon · BOAMP 26-118011 · 210 k€ · 2 ans · Clôture J-17",
    status: "Ouvert",
    score: 71,
    chance: "Foncez",
  },
  {
    id: "hopital",
    title: "Nettoyage du centre hospitalier",
    meta: "Hospices Civils de Lyon · BOAMP 26-116554 · 3,8 M€ · 4 ans · Clôture J-9",
    status: "Verrouillé",
    score: 16,
    chance: "Passez votre tour",
  },
]

export const dashboardKpis = [
  {
    label: "Capacité à répondre",
    value: "74/100",
    detail: "Santé financière solide",
    featured: true,
  },
  {
    label: "Candidatures déposées",
    value: "12",
    detail: "depuis janvier 2025",
  },
  {
    label: "Taux de réussite",
    value: "33 %",
    detail: "4 gagnées · +12 pts vs 2024",
    positive: true,
  },
  {
    label: "Montant remporté",
    value: "1,1 M€",
    detail: "sur 4 marchés",
  },
  {
    label: "Nouvelles annonces",
    value: "7",
    detail: "pour vos secteurs cette semaine",
    featured: true,
  },
]

export const sectors = [
  { label: "Nettoyage de bureaux", detail: "+3 suivre", status: "Disputé" },
  { label: "Nettoyage scolaire", detail: "+5 suivre", status: "Ouvert" },
  { label: "Vitrerie", detail: "+4 suivre", status: "Ouvert" },
  { label: "Nettoyage hospitalier", detail: "+2 suivre", status: "Verrouillé" },
  { label: "Collecte de déchets", detail: "+4 suivre", status: "Verrouillé" },
]

export const applications = [
  {
    market: "Nettoyage des bureaux",
    buyer: "Grand Lyon Habitat",
    date: "sept. 2025",
    result: "Perdu",
    winner: "Propreté Rhône Services",
    why: "Note technique trop basse : 34/50 contre 44/50.",
  },
  {
    market: "Vitrerie des médiathèques",
    buyer: "Ville de Lyon",
    date: "juil. 2025",
    result: "Gagné",
    winner: "Vous",
    why: "Meilleur prix et bonne note environnementale.",
  },
  {
    market: "Nettoyage des écoles (lot 2)",
    buyer: "Ville de Bron",
    date: "juin 2025",
    result: "Gagné",
    winner: "Vous",
    why: "Seule offre avec intervention en horaires décalés.",
  },
  {
    market: "Entretien des gymnases",
    buyer: "Ville de Vaulx-en-Velin",
    date: "mai 2025",
    result: "Perdu",
    winner: "Éclat Services",
    why: "Prix 11 % au-dessus de l’offre retenue.",
  },
]

export const proofData = {
  analyzedMarkets: 14,
  winners: [
    { name: "Propreté Rhône Services", count: 4, share: 29 },
    { name: "Nettoyage Lumière SA", count: 3, share: 21 },
    { name: "Groupe Clarté Industrie", count: 2, share: 14 },
    { name: "Brillance Lyon PME", count: 2, share: 14 },
    { name: "Éclat Services", count: 1, share: 7 },
  ] satisfies Winner[],
  competition: {
    average: "3,2",
    nationalAverage: "5,1",
  },
  renewals: [
    { year: "2024", winner: "Propreté Rhône Services", incumbent: true },
    { year: "2022", winner: "Propreté Rhône Services", incumbent: true },
    { year: "2021", winner: "Brillance Lyon PME", incumbent: false },
  ],
  sme: { won: 4, total: 14 },
}

export const marketSources: MarketSource[] = [
  {
    id: "m1",
    categories: ["winners", "competition", "renewals"],
    date: "12/02/2024",
    buyer: "Métropole de Lyon",
    subject: "Entretien des bâtiments administratifs — lot central",
    winner: "Propreté Rhône Services",
    amount: "680 000 €",
    offers: 3,
  },
  {
    id: "m2",
    categories: ["winners", "competition", "sme"],
    date: "08/09/2023",
    buyer: "Métropole de Lyon",
    subject: "Nettoyage des sites de proximité — lot Est",
    winner: "Brillance Lyon PME",
    amount: "218 000 €",
    offers: 5,
  },
  {
    id: "m3",
    categories: ["winners", "competition"],
    date: "21/03/2023",
    buyer: "Ville de Lyon",
    subject: "Propreté des locaux techniques",
    winner: "Nettoyage Lumière SA",
    amount: "442 000 €",
    offers: 3,
  },
  {
    id: "m4",
    categories: ["winners", "renewals"],
    date: "14/11/2022",
    buyer: "Métropole de Lyon",
    subject: "Entretien des bureaux métropolitains",
    winner: "Propreté Rhône Services",
    amount: "735 000 €",
    offers: 2,
  },
  {
    id: "m5",
    categories: ["competition", "sme"],
    date: "30/06/2022",
    buyer: "Métropole de Lyon",
    subject: "Nettoyage de cinq antennes administratives",
    winner: "Éclat Services",
    amount: "164 000 €",
    offers: 4,
  },
  {
    id: "m6",
    categories: ["winners", "competition", "renewals", "sme"],
    date: "18/05/2021",
    buyer: "Métropole de Lyon",
    subject: "Entretien des petits sites — lot 3",
    winner: "Brillance Lyon PME",
    amount: "196 000 €",
    offers: 5,
  },
]

export const sourceCategoryTitles: Record<SourceCategory, string> = {
  winners: "Marchés pris en compte — Qui gagne ?",
  competition: "Marchés pris en compte — Concurrence",
  renewals: "Marchés pris en compte — Renouvellements",
  sme: "Marchés pris en compte — Place des PME",
}

export const upcomingOpportunities = [
  {
    id: "o1",
    title: "Entretien des maisons de la Métropole",
    buyer: "Métropole de Lyon",
    endDate: "31 janvier 2026",
  },
  {
    id: "o2",
    title: "Nettoyage des locaux administratifs — secteur Sud",
    buyer: "Ville de Villeurbanne",
    endDate: "18 avril 2026",
  },
  {
    id: "o3",
    title: "Propreté des équipements publics de proximité",
    buyer: "Office Habitat Rhône Public",
    endDate: "30 septembre 2026",
  },
]
