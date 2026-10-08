import { useCallback, useEffect, useState } from "react"
import Accueil from "./figma/Accueil"
import AnalyseEnCours from "./figma/AnalyseEnCours"
import Candidatures from "./figma/Candidatures"
import ChoisirAvis from "./figma/ChoisirAvis"
import MonEntreprise from "./figma/MonEntreprise"
import NavBar, { type NavTarget } from "./figma/NavBar"
import NoteDecision from "./figma/NoteDecision"
import Veille from "./figma/Veille"
import Verdict from "./figma/Verdict"
import { verdicts, type VerdictId } from "./figma/verdicts"

/**
 * Routage par ancre (#/...) : fonctionne sur n'importe quel hébergeur statique,
 * garde le bouton « retour » du navigateur et permet de partager un lien vers un écran.
 */
type Route =
  | { screen: "dashboard" }
  | { screen: "markets" }
  | { screen: "analysis" }
  | { screen: "verdict"; id: VerdictId }
  | { screen: "note" }
  | { screen: "company" }
  | { screen: "veille" }
  | { screen: "applications" }

const paths: Record<Exclude<Route["screen"], "verdict">, string> = {
  dashboard: "",
  markets: "/marches",
  analysis: "/analyse",
  note: "/note",
  company: "/entreprise",
  veille: "/veille",
  applications: "/candidatures",
}

function parse(hash: string): Route {
  const path = hash.replace(/^#/, "")
  const verdict = path.match(/^\/verdict\/(\w+)$/)
  if (verdict && verdict[1] in verdicts) return { screen: "verdict", id: verdict[1] as VerdictId }
  const entry = Object.entries(paths).find(([, p]) => p === path && p !== "")
  return entry ? ({ screen: entry[0] } as Route) : { screen: "dashboard" }
}

const toHash = (r: Route) => (r.screen === "verdict" ? `#/verdict/${r.id}` : paths[r.screen] ? `#${paths[r.screen]}` : "#/")

const activeTab: Record<Route["screen"], NavTarget | null> = {
  dashboard: "dashboard",
  markets: "markets",
  analysis: "markets",
  verdict: "markets",
  note: "markets",
  company: "company",
  veille: "veille",
  applications: "applications",
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash))

  useEffect(() => {
    const onHash = () => {
      setRoute(parse(window.location.hash))
      window.scrollTo({ top: 0 })
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const go = useCallback((r: Route) => {
    const hash = toHash(r)
    if (window.location.hash === hash || (hash === "#/" && window.location.hash === "")) {
      setRoute(r)
      window.scrollTo({ top: 0 })
    } else {
      window.location.hash = hash
    }
  }, [])

  const verdict = (id: VerdictId) => go({ screen: "verdict", id })
  const note = () => go({ screen: "note" })
  const nav = (target: NavTarget) => go({ screen: target } as Route)
  const finishAnalysis = useCallback(() => go({ screen: "verdict", id: "metropole" }), [go])

  return (
    <>
      <NavBar active={activeTab[route.screen]} onNavigate={nav} />
      {route.screen === "dashboard" && (
        <Accueil
          onOpenVerdict={() => verdict("metropole")}
          onVillerbanneVerdict={() => verdict("villeurbanne")}
          onHospicesVerdict={() => verdict("hospices")}
          onMarkets={() => nav("markets")}
          onApplications={() => nav("applications")}
          onVeille={() => nav("veille")}
        />
      )}
      {route.screen === "markets" && (
        <ChoisirAvis onVerdict={verdict} onDecisionNote={note} onOffBoamp={() => go({ screen: "analysis" })} />
      )}
      {route.screen === "analysis" && <AnalyseEnCours onDone={finishAnalysis} />}
      {route.screen === "verdict" && (
        <Verdict
          key={route.id}
          id={route.id}
          onBack={() => nav("markets")}
          onDecisionNote={note}
          onVeille={() => nav("veille")}
        />
      )}
      {route.screen === "note" && <NoteDecision onBack={() => verdict("metropole")} />}
      {route.screen === "company" && <MonEntreprise />}
      {route.screen === "veille" && <Veille onVerdict={verdict} />}
      {route.screen === "applications" && (
        <Candidatures onDecisionNote={note} onVerdict={() => verdict("metropole")} />
      )}
    </>
  )
}
