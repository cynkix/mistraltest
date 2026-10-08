import { useState } from "react"
import { Badge, Button, Halos, MistralBadge, type Tone } from "./ui"

type Group = "prep" | "attente" | "gagnees" | "perdues"

interface Application {
  title: string
  meta: string
  amount: string
  note: string
  details?: "plan" | "defaite"
}

const groups: { id: Group; label: string; tone: Tone | "attente"; icon: string; text: string; items: Application[] }[] = [
  {
    id: "prep",
    label: "En préparation",
    tone: "dispute",
    icon: "!",
    text: "Vous avez décidé d’y aller : le dossier est en cours.",
    items: [{ title: "Nettoyage des bâtiments administratifs, lot 3", meta: "Métropole de Lyon · clôture 28 oct. 2026", amount: "760 k€", note: "J-21 avant la clôture", details: "plan" }],
  },
  {
    id: "attente",
    label: "En attente de résultat",
    tone: "attente",
    icon: "+",
    text: "Déposées, en cours d’analyse par l’acheteur.",
    items: [
      { title: "Nettoyage du siège", meta: "SYTRAL Mobilités · déposée le 2 sept. 2026", amount: "420 k€", note: "Résultat attendu fin novembre." },
      { title: "Entretien des locaux techniques", meta: "Eau du Grand Lyon · déposée le 18 sept. 2026", amount: "180 k€", note: "Audition prévue le 15 octobre." },
    ],
  },
  {
    id: "gagnees",
    label: "Gagnées",
    tone: "ouvert",
    icon: "✓",
    text: "Ce qui a fait la différence, pour le refaire.",
    items: [
      { title: "Vitrerie des médiathèques", meta: "Ville de Lyon · notifiée le 12 juin 2026", amount: "150 k€", note: "Meilleur prix et bonne note environnementale." },
      { title: "Nettoyage des écoles, lot 2", meta: "Ville de Bron · notifiée le 3 avril 2026", amount: "390 k€", note: "Seule offre avec des horaires décalés." },
      { title: "Nettoyage de la mairie annexe", meta: "Ville de Villeurbanne · notifiée le 20 févr. 2026", amount: "240 k€", note: "Encadrant dédié apprécié par l’acheteur." },
      { title: "Entretien des crèches", meta: "Ville de Vénissieux · notifiée le 9 janv. 2026", amount: "310 k€", note: "Références petite enfance déterminantes." },
    ],
  },
  {
    id: "perdues",
    label: "Perdues",
    tone: "verrouille",
    icon: "✕",
    text: "Analysées par Mistral à partir des lettres de rejet.",
    items: [
      { title: "Nettoyage des bureaux", meta: "Grand Lyon Habitat · rejet reçu le 4 juil. 2026", amount: "520 k€", note: "Attribué à Propreté Rhône Services", details: "defaite" },
      { title: "Entretien des gymnases", meta: "Ville de Vaulx-en-Velin · rejet reçu le 22 mai 2026", amount: "260 k€", note: "Attribué à Éclat Services" },
      { title: "Nettoyage des locaux sociaux", meta: "Métropole de Lyon · rejet reçu le 14 mars 2026", amount: "610 k€", note: "Attribué à Propreté Rhône Services" },
      { title: "Entretien des équipements culturels", meta: "Ville de Lyon · rejet reçu le 30 janv. 2026", amount: "200 k€", note: "Attribué à Cristal Lyon" },
      { title: "Nettoyage des parkings", meta: "Lyon Parc Auto · rejet reçu le 8 janv. 2026", amount: "330 k€", note: "Attribué à Nettoyage Lumière SA" },
    ],
  },
]

const filters: { id: Group | "all"; label: string }[] = [
  { id: "all", label: "Toutes" },
  { id: "prep", label: "En préparation" },
  { id: "attente", label: "En attente" },
  { id: "gagnees", label: "Gagnées" },
  { id: "perdues", label: "Perdues" },
]

const plan = [
  ["Visez le lot 3 seul", "190 k€ par an, soit 9 % de votre activité."],
  ["Gagnez sur la technique", "Encadrant dédié, intervention sous 4 h, plan de remplacement."],
  ["Montrez votre solidité", "Marge de 6,2 %, chiffre d’affaires en hausse de 14 % en 2 ans."],
  ["Complétez vos références", "Il vous en faut 3, vous en avez 2."],
]

/** Écran Figma « 08 — Mes candidatures » (2052:674). */
export default function Candidatures({ onDecisionNote, onVerdict }: { onDecisionNote: () => void; onVerdict: () => void }) {
  const [filter, setFilter] = useState<Group | "all">("all")
  const [open, setOpen] = useState<Record<string, boolean>>({
    "Nettoyage des bâtiments administratifs, lot 3": true,
    "Nettoyage des bureaux": true,
  })
  const [done, setDone] = useState<boolean[]>([true, false, false, false])

  return (
    <div className="op-font relative min-h-screen bg-[var(--background)] text-[color:var(--foreground)]">
      <Halos bottomHaloTop={1322.35} />
      <main className="relative mx-auto flex max-w-[1100px] flex-col gap-7 px-5 pb-20 pt-8 lg:px-0">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <h1 className="text-[32px] font-bold leading-[1.25]">Mes candidatures</h1>
            <p className="text-[15px] leading-[1.5] text-[color:var(--muted-foreground)]">
              Suivez vos réponses, comprenez vos résultats, préparez les prochaines.
            </p>
          </div>
          <Button variant="outline">Ajouter une lettre de rejet</Button>
        </section>

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ["12", "candidatures depuis janvier", "var(--foreground)"],
            ["33 %", "taux de réussite", "var(--ouvert)"],
            ["1,1 M€", "remportés sur 4 marchés", "var(--foreground)"],
            ["2", "résultats attendus", "var(--foreground)"],
          ].map(([v, l, c]) => (
            <div key={l} className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              <span className="text-[40px] font-bold leading-[1.1]" style={{ color: c }}>{v}</span>
              <span className="text-[13px] text-[color:var(--muted-foreground)]">{l}</span>
            </div>
          ))}
        </section>

        <section className="flex flex-col items-start gap-2 rounded-2xl bg-[var(--mistral-fond)] p-5">
          <MistralBadge>Ce que disent vos résultats</MistralBadge>
          <p className="text-[15px] leading-[1.5]">
            Vous perdez surtout sur la note technique (3 fois sur 5), presque jamais sur le prix seul. Vos victoires viennent d’un détail concret : horaires décalés, encadrant dédié, références ciblées. Un mémoire technique par site ferait la différence sur la Métropole de Lyon.
          </p>
        </section>

        <div role="radiogroup" aria-label="Filtrer les candidatures" className="inline-flex flex-wrap gap-0.5 self-start rounded-full border border-[var(--border)] bg-[var(--card)] p-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-[14px] font-medium ${
                filter === f.id ? "bg-[var(--primary)] text-white" : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {groups
          .filter((g) => filter === "all" || filter === g.id)
          .map((g) => (
            <section key={g.id} className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-3">
                {g.tone === "attente" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)] px-3 py-1 font-semibold text-[color:var(--primary)]">
                    <span className="text-[12px]">+</span>
                    <span className="text-[13px]">{g.label}</span>
                  </span>
                ) : (
                  <Badge tone={g.tone}>{g.label}</Badge>
                )}
                <span className="text-[14px] font-semibold">{g.items.length}</span>
                <span className="text-[13px] text-[color:var(--muted-foreground)]">{g.text}</span>
              </div>
              {g.items.map((item) => {
                const expandable = Boolean(item.details) || g.id === "perdues"
                const isOpen = Boolean(open[item.title])
                return (
                  <article
                    key={item.title}
                    className={`overflow-hidden rounded-2xl border bg-[var(--card)] ${isOpen && item.details ? "border-[var(--primary)]" : "border-[var(--border)]"}`}
                  >
                    <button
                      type="button"
                      disabled={!expandable}
                      aria-expanded={expandable ? isOpen : undefined}
                      onClick={() => setOpen((o) => ({ ...o, [item.title]: !o[item.title] }))}
                      className="flex w-full flex-col gap-2 px-5 py-4 text-left md:flex-row md:items-center md:gap-5"
                    >
                      <span className="flex flex-col gap-0.5 md:w-[330px] md:shrink-0">
                        <span className="text-[14px] font-semibold">{item.title}</span>
                        <span className="text-[12px] text-[color:var(--muted-foreground)]">{item.meta}</span>
                      </span>
                      <span className="flex flex-col gap-0.5 md:w-[110px] md:shrink-0">
                        <span className="text-[14px] font-semibold">{item.amount}</span>
                        <span className="text-[12px] text-[color:var(--muted-foreground)]">sur la durée</span>
                      </span>
                      <span className="flex-1 text-[13px]">{item.note}</span>
                      {expandable && <span className="text-[13px] text-[color:var(--muted-foreground)]">{isOpen ? "▴" : "▾"}</span>}
                    </button>
                    {isOpen && item.details === "plan" && (
                      <div className="flex flex-col gap-3 border-t border-[var(--border)] px-5 pb-5 pt-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[14px] font-semibold">Plan d’action</p>
                          <p className="text-[12px] text-[color:var(--muted-foreground)]">{done.filter(Boolean).length} sur 4 faits</p>
                        </div>
                        <div className="h-2 w-full max-w-[420px] overflow-hidden rounded-full bg-[var(--border)]">
                          <div className="h-2 rounded-full bg-[var(--ouvert)] transition-all" style={{ width: `${(done.filter(Boolean).length / 4) * 100}%` }} />
                        </div>
                        {plan.map(([t, s], i) => (
                          <label key={t} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] px-3 py-2.5">
                            <input
                              type="checkbox"
                              checked={done[i]}
                              onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                              className="size-[18px] shrink-0 accent-[var(--primary)]"
                            />
                            <span className="flex flex-col gap-0.5">
                              <span className={`text-[14px] font-semibold ${done[i] ? "text-[color:var(--muted-foreground)] line-through" : ""}`}>{t}</span>
                              <span className="text-[12px] text-[color:var(--muted-foreground)]">{s}</span>
                            </span>
                          </label>
                        ))}
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" onClick={onDecisionNote}>Note de décision</Button>
                          <Button variant="outline" onClick={onVerdict}>Analyse complète</Button>
                        </div>
                      </div>
                    )}
                    {isOpen && item.details === "defaite" && <DefeatDetails />}
                    {isOpen && !item.details && (
                      <p className="border-t border-[var(--border)] px-5 py-4 text-[13px] text-[color:var(--muted-foreground)]">
                        Ajoutez la lettre de rejet pour que Mistral analyse cette défaite.
                      </p>
                    )}
                  </article>
                )
              })}
            </section>
          ))}
      </main>
    </div>
  )
}

function DefeatDetails() {
  const notes = [
    ["Note technique", "34 contre 44 sur 50", "var(--verrouille)", 286, 370],
    ["Note prix", "44 contre 42 sur 50", "var(--ouvert)", 370, 353],
  ] as const
  return (
    <div className="flex flex-col gap-8 border-t border-[var(--border)] px-5 pb-5 pt-4 md:flex-row">
      <div className="flex w-full flex-col gap-2.5 md:w-[420px] md:shrink-0">
        {notes.map(([label, value, color, you, winner]) => (
          <div key={label} className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3 text-[13px]">
              <span>{label}</span>
              <span className="font-semibold" style={{ color }}>{value}</span>
            </div>
            {[
              [you, "var(--mistral)"],
              [winner, "var(--primary)"],
            ].map(([w, c], i) => (
              <div key={i} className="h-2 overflow-hidden rounded-full bg-[var(--border)]">
                <div className="h-2 rounded-full" style={{ width: `${((w as number) / 420) * 100}%`, background: c as string }} />
              </div>
            ))}
          </div>
        ))}
        <p className="text-[12px] text-[color:var(--muted-foreground)]">Orange : vous. Bleu : Propreté Rhône Services.</p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <MistralBadge>Analysé par Mistral à partir de la lettre de rejet</MistralBadge>
        {[
          ["Pourquoi", "Votre prix était meilleur, mais la méthodologie a été jugée générique et il manquait un plan de continuité."],
          ["Comment le gagnant a fait", "Un planning site par site, des produits écolabellisés et sa connaissance des bâtiments."],
          ["Pour la prochaine fois", "Un mémoire technique par site et un plan de remplacement. Le marché revient en 2029."],
        ].map(([t, s]) => (
          <div key={t} className="flex flex-col gap-0.5">
            <p className="text-[12px] font-semibold text-[color:var(--muted-foreground)]">{t}</p>
            <p className="text-[13px]">{s}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
