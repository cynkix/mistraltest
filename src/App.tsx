import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { analyze } from "./analyze"
import AnalysisSteps from "./components/AnalysisSteps"
import BrandLogo from "./components/BrandLogo"
import CompanyProfile from "./components/CompanyProfile"
import Dashboard from "./components/Dashboard"
import DecisionNote from "./components/DecisionNote"
import MarketList from "./components/MarketList"
import MistralBadge from "./components/MistralBadge"
import type { ProductScreen } from "./components/ProductHeader"
import VerdictScreen from "./components/VerdictScreen"
import { analysisSteps, decisionAvis, extractedDetails } from "./mockData"
import { createInitialNoteState, type NoteState } from "./lib/note"

type Screen = ProductScreen | "analysis" | "verdict"

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [route, setRoute] = useState(window.location.pathname)
  const [completedSteps, setCompletedSteps] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const [noteStates, setNoteStates] = useState<Record<string, NoteState>>({
    [decisionAvis.id]: createInitialNoteState(decisionAvis),
  })

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.pathname)
    window.addEventListener("popstate", updateRoute)
    return () => window.removeEventListener("popstate", updateRoute)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const navigate = (target: ProductScreen) => {
    if (target === "applications") {
      setScreen("dashboard")
      window.setTimeout(
        () =>
          document
            .getElementById("applications")
            ?.scrollIntoView({ behavior: "smooth" }),
        0,
      )
      return
    }
    setScreen(target)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const startAnalysis = async () => {
    setCompletedSteps(0)
    setScreen("analysis")
    window.scrollTo({ top: 0 })
    await analyze("BOAMP 26-118342", setCompletedSteps)
    setScreen("verdict")
    window.scrollTo({ top: 0 })
  }

  const openDecisionNote = () => {
    const path = `/note/${decisionAvis.id}`
    window.history.pushState({}, "", path)
    setRoute(path)
    window.scrollTo({ top: 0 })
  }

  const returnToVerdict = () => {
    window.history.pushState({}, "", "/")
    setRoute("/")
    setScreen("verdict")
    window.scrollTo({ top: 0 })
  }

  if (route.startsWith("/note/")) {
    const noteState =
      noteStates[decisionAvis.id] ?? createInitialNoteState(decisionAvis)
    return (
      <div className="min-h-screen bg-canvas text-ink">
        <DecisionNote
          state={noteState}
          onStateChange={(state) =>
            setNoteStates((states) => ({
              ...states,
              [decisionAvis.id]: state,
            }))
          }
          onBack={returnToVerdict}
          onToast={setToast}
        />
        {toast && (
          <div
            role="status"
            className="print-hidden fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-card"
          >
            <CheckCircle2 size={17} className="text-success" />
            {toast}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {screen === "dashboard" && (
        <Dashboard
          onNavigate={navigate}
          onVerdict={() => setScreen("verdict")}
        />
      )}
      {screen === "markets" && (
        <MarketList onNavigate={navigate} onAnalyze={startAnalysis} />
      )}
      {screen === "company" && <CompanyProfile onNavigate={navigate} />}
      {screen === "analysis" && (
        <main className="mx-auto min-h-screen max-w-[1196px] px-5 py-8 sm:px-8">
          <button
            type="button"
            onClick={() => setScreen("dashboard")}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <BrandLogo />
          </button>
          <section className="mx-auto mt-28 max-w-[640px]">
            <MistralBadge label="Mistral analyse l’avis BOAMP n° 26-118342" />
            <div className="mt-6">
              <AnalysisSteps
                steps={analysisSteps}
                completedSteps={completedSteps}
              />
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase text-muted">
                Ce que Mistral a extrait
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {extractedDetails.map((detail) => (
                  <span
                    key={detail.label}
                    className="rounded-full border border-line bg-white px-3.5 py-2 text-[13px]"
                  >
                    <span className="text-muted">{detail.label}</span>{" "}
                    <strong>{detail.value}</strong>
                  </span>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
      {screen === "verdict" && (
        <VerdictScreen
          onAnother={() => navigate("markets")}
          onDecisionNote={openDecisionNote}
        />
      )}
    </div>
  )
}
