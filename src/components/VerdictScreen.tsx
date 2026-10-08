import { useState } from "react"
import {
  ArrowRight,
  Check,
  CircleAlert,
  FileText,
  ShieldCheck,
} from "lucide-react"
import {
  decisionAvis,
  marketSources,
  proofData,
  upcomingOpportunities,
  writeStrategy,
  type SourceCategory,
} from "../mockData"
import MistralBadge from "./MistralBadge"
import SourcesPanel from "./SourcesPanel"
import BrandLogo from "./BrandLogo"

interface VerdictScreenProps {
  onAnother: () => void
  onDecisionNote: () => void
}

export default function VerdictScreen({
  onAnother,
  onDecisionNote,
}: VerdictScreenProps) {
  const [sources, setSources] = useState<SourceCategory | null>(null)
  const [alerts, setAlerts] = useState<string[]>([])

  return (
    <main className="mx-auto min-h-screen max-w-[1196px] px-5 py-8 sm:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onAnother}
          className="mr-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BrandLogo />
        </button>
        <button
          type="button"
          onClick={onAnother}
          className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-semibold"
        >
          ← Analyser un autre marché
        </button>
        <button
          type="button"
          onClick={onDecisionNote}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
        >
          <FileText size={16} />
          Note de décision
        </button>
      </header>

      <section className="mt-7">
        <p className="text-xs font-semibold uppercase text-muted">
          Appel d’offres analysé
        </p>
        <h1 className="mt-1 text-[32px] font-bold leading-tight">
          Nettoyage des bâtiments administratifs
        </h1>
        <p className="mt-1 text-sm text-muted">
          Métropole de Lyon · BOAMP 26-118342 · Lot 3 · 190 k€ estimés
        </p>
      </section>

      <section className="mt-6 grid gap-8 rounded-[20px] border border-line bg-white p-6 shadow-card lg:grid-cols-[390px_1fr] lg:items-center lg:p-10">
        <div>
          <div className="flex gap-2">
            <p className="origin-bottom-left -rotate-90 self-end whitespace-nowrap text-[11px] text-muted">
              Capacité à répondre →
            </p>
            <div className="relative grid size-[340px] max-w-full grid-cols-2 gap-1 overflow-hidden rounded-2xl text-[11px] font-semibold">
              <div className="bg-warning-soft p-4 text-warning-dark">
                Coup à jouer
              </div>
              <div className="bg-success-soft p-4 text-success">Foncez</div>
              <div className="flex items-end bg-danger-soft p-4 text-danger-dark">
                Passez votre tour
              </div>
              <div className="flex items-end bg-primary-soft p-4 text-primary">
                Renforcez-vous
              </div>
              <img
                src="/assets/bc3ca.svg"
                width="40"
                height="40"
                alt=""
                className="absolute left-[36%] top-[20%]"
              />
              <img
                src="/assets/8e342.svg"
                width="18"
                height="18"
                alt="Votre position"
                className="absolute left-[39%] top-[23%]"
              />
              <span className="absolute left-[46%] top-[17%] rounded-lg bg-primary px-2 py-1 text-[10px] text-white">
                Vous
              </span>
            </div>
          </div>
          <p className="mt-2 pl-8 text-center text-[11px] text-muted">
            Ouverture du marché →
          </p>
        </div>

        <div>
          <MistralBadge label="Rédigé par Mistral" />
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-warning-soft px-4 py-2.5 text-lg font-bold text-warning-dark">
              <CircleAlert size={20} />
              Coup à jouer
            </span>
            <div>
              <strong className="text-[26px]">42/100</strong>
              <p className="text-[11px] text-muted">Ouverture du marché</p>
            </div>
            <div>
              <strong className="text-[26px]">74/100</strong>
              <p className="text-[11px] text-muted">
                Capacité de votre entreprise
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6">
            <strong>Le marché est tenu par un sortant solide</strong>, mais
            votre entreprise coche toutes les exigences du lot 3 et votre santé
            financière est meilleure que la moyenne des PME du secteur. Ce lot
            pèserait 9 % de votre chiffre d’affaires : l’acheteur n’y verra
            aucun risque de dépendance.
          </p>
          <p className="mt-4 rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">
            Répondez au lot 3, pas aux lots 1 et 2.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-white p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Comment ces scores sont calculés</h2>
            <p className="mt-1 text-xs text-muted">
              Calcul déterministe sur les données publiques. Mistral classe les
              marchés et rédige, il ne calcule pas les scores.
            </p>
          </div>
          <span className="text-xs text-muted">DECP · BOAMP · Sirene</span>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl bg-canvas p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold">Ouverture du marché</p>
                <p className="mt-2 text-[40px] font-bold">
                  42<span className="text-lg text-muted">/100</span>
                </p>
              </div>
              <div className="text-right text-xs text-muted">
                <p>Concentration des gagnants 28 %</p>
                <p>Concurrence 31 %</p>
                <p>PME 41 %</p>
              </div>
            </div>
          </article>
          <article className="rounded-2xl bg-canvas p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Capacité de votre entreprise
                </p>
                <p className="mt-2 text-[40px] font-bold text-primary">
                  74<span className="text-lg">/100</span>
                </p>
              </div>
              <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
                Conforme
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <p>
                Santé financière <strong className="float-right">88</strong>
              </p>
              <p>
                Capacité opérationnelle{" "}
                <strong className="float-right">70</strong>
              </p>
              <p>
                Références publiques <strong className="float-right">44</strong>
              </p>
              <p>
                Éligibilité <strong className="float-right">100</strong>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-[26px] font-bold">1. Le marché est-il ouvert ?</h2>
        <p className="mt-1 text-[15px] text-muted">
          Ce que disent 5 ans d’attributions sur ce type de marché
        </p>
        <div className="mt-5 rounded-2xl border border-line bg-white p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-warning-soft px-3 py-1.5 text-sm font-semibold text-warning-dark">
              ! Disputé · 42/100
            </span>
            <MistralBadge label="Rédigé par Mistral" />
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-6">
            Sur 14 marchés de nettoyage de la Métropole depuis 2021, 3
            entreprises en ont remporté 10. Le titulaire actuel a été reconduit
            2 fois sur 3. Mais 4 lots ont été gagnés par des PME, et le lot 3 de
            ce marché correspond à leur profil.
          </p>
          <p className="mt-4 rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">
            Répondez au lot 3, pas aux lots 1 et 2.
          </p>
        </div>

        <h3 className="mt-6 font-semibold">Les preuves côté marché</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-line bg-white p-6">
            <h4 className="font-semibold">Qui gagne ?</h4>
            <div className="mt-5 space-y-4">
              {proofData.winners.slice(0, 4).map((winner) => (
                <div key={winner.name}>
                  <div className="flex justify-between text-xs">
                    <span>{winner.name}</span>
                    <strong>{winner.share} %</strong>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-line">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${winner.share * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSources("winners")}
              className="mt-6 text-xs font-semibold text-primary"
            >
              Voir les marchés sources →
            </button>
          </article>

          <article className="rounded-2xl border border-line bg-white p-6">
            <h4 className="font-semibold">Combien de concurrents ?</h4>
            <p className="mt-5 text-[40px] font-bold">
              3,0
              <span className="text-sm font-medium text-muted">
                {" "}
                offres en moyenne
              </span>
            </p>
            <p className="mt-5 text-sm text-muted">
              Ce type de marché : 3,0 · moyenne nationale : 5,1
            </p>
            <div className="mt-5 h-2 rounded-full bg-line">
              <div className="h-2 w-[59%] rounded-full bg-primary" />
            </div>
            <button
              onClick={() => setSources("competition")}
              className="mt-6 text-xs font-semibold text-primary"
            >
              Voir les marchés sources →
            </button>
          </article>

          <article className="rounded-2xl border border-line bg-white p-6">
            <h4 className="font-semibold">Le sortant gagne-t-il encore ?</h4>
            <div className="mt-5 space-y-4">
              {[
                ["/assets/dbab8.svg", "2021", "Brillance Lyon PME", "Nouveau"],
                [
                  "/assets/5ff4c.svg",
                  "2022",
                  "Propreté Rhône Services",
                  "Reconduit",
                ],
                [
                  "/assets/1d7bb.svg",
                  "2024",
                  "Propreté Rhône Services",
                  "Reconduit",
                ],
              ].map(([asset, year, name, result]) => (
                <div key={year} className="flex items-center gap-3 text-sm">
                  <img src={asset} width="12" height="12" alt="" />
                  <strong>{year}</strong>
                  <span className="flex-1">{name}</span>
                  <span className="text-xs text-muted">{result}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSources("renewals")}
              className="mt-6 text-xs font-semibold text-primary"
            >
              Voir les marchés sources →
            </button>
          </article>

          <article className="overflow-hidden rounded-2xl border border-line bg-white p-6">
            <h4 className="font-semibold">Place des PME</h4>
            <p className="mt-5 text-[40px] font-bold text-success">
              4
              <span className="text-sm font-medium text-muted">
                {" "}
                marchés sur 14
              </span>
            </p>
            <img
              src="/assets/59873.svg"
              width="438"
              height="22"
              alt="Répartition des marchés remportés par les PME"
              className="mt-5 max-w-none"
            />
            <div className="mt-3 flex gap-4 text-xs text-muted">
              <span className="flex items-center gap-1">
                <img src="/assets/28128.svg" width="10" height="10" alt="" />
                PME
              </span>
              <span className="flex items-center gap-1">
                <img src="/assets/82239.svg" width="10" height="10" alt="" />
                Grands groupes
              </span>
            </div>
            <p className="mt-4 text-sm text-muted">
              Les PME gagnent surtout les petits lots, comme le lot 3.
            </p>
            <button
              onClick={() => setSources("sme")}
              className="mt-5 text-xs font-semibold text-primary"
            >
              Voir les marchés sources →
            </button>
          </article>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-[26px] font-bold">2. Pouvez-vous le gagner ?</h2>
        <p className="mt-1 text-[15px] text-muted">
          Votre profil comparé aux exigences et au sortant
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-semibold">Éligibilité au lot 3</h3>
            <div className="mt-5 space-y-4">
              {decisionAvis.controls.map((control) => (
                <div key={control.label} className="flex items-start gap-3">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 rounded-full bg-success text-white"
                  />
                  <div>
                    <p className="text-sm font-semibold">{control.label}</p>
                    <p className="text-xs text-muted">{control.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-semibold">Santé financière</h3>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["CA 2024", "2,1 M€"],
                ["Marge nette", "6,2 %"],
                ["Part du lot", "9 %"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted">{label}</p>
                  <p className="mt-1 text-xl font-bold">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-xl bg-primary-soft p-4 text-sm text-primary">
              Le lot reste à votre taille : aucune dépendance excessive.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-10 rounded-[20px] bg-primary p-7 text-white sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[26px] font-bold">
              3. Votre stratégie pour battre le sortant
            </h2>
            <p className="mt-1 text-sm text-white/75">
              Faites ce que votre taille permet de mieux faire.
            </p>
          </div>
          <MistralBadge label="Rédigé par Mistral" />
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {writeStrategy.map((item, index) => (
            <article key={item} className="rounded-2xl bg-white p-5 text-ink">
              <span className="text-xs font-semibold text-mistral">
                {index + 1}
              </span>
              <p className="mt-2 text-sm font-semibold leading-5">{item}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={onDecisionNote}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary"
          >
            Préparer ma réponse au lot 3
          </button>
          <button
            onClick={onDecisionNote}
            className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold"
          >
            Préparer une note de décision
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold">Prochaines occasions</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
          {upcomingOpportunities.map((item, index) => {
            const active = alerts.includes(item.id)
            return (
              <div
                key={item.id}
                className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center ${
                  index ? "border-t border-line" : ""
                }`}
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted">
                    {item.buyer} · Fin : {item.endDate}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
                  ✓ Ouvert
                </span>
                <button
                  onClick={() =>
                    setAlerts((items) =>
                      active
                        ? items.filter((id) => id !== item.id)
                        : [...items, item.id],
                    )
                  }
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {active ? "Alerte créée" : "Me prévenir"}
                </button>
              </div>
            )
          })}
        </div>
      </section>
      <SourcesPanel category={sources} onClose={() => setSources(null)} />
    </main>
  )
}
