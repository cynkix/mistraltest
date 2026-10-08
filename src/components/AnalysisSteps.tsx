import { Check, LoaderCircle } from "lucide-react"

interface AnalysisStepsProps {
  steps: string[]
  completedSteps: number
}

export default function AnalysisSteps({
  steps,
  completedSteps,
}: AnalysisStepsProps) {
  return (
    <div
      className="rounded-[20px] border border-line bg-white p-8"
      aria-live="polite"
    >
      {steps.map((step, index) => {
        const isComplete = index < completedSteps
        const isActive = index === completedSteps
        return (
          <div
            key={step}
            className={`flex items-center gap-3.5 transition-colors ${
              index > 0 ? "mt-4" : ""
            }`}
          >
            <span
              className={`grid size-[26px] shrink-0 place-items-center rounded-full border-2 transition-all ${
                isComplete
                  ? "border-success bg-success text-white"
                  : isActive
                    ? "border-mistral bg-mistral-soft text-mistral"
                    : "border-line bg-canvas text-muted"
              }`}
            >
              {isComplete ? (
                <Check size={17} strokeWidth={3} />
              ) : isActive ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <span className="sr-only">{index + 1}</span>
              )}
            </span>
            <span
              className={`flex-1 text-base ${
                isComplete || isActive ? "text-ink" : "text-muted"
              }`}
            >
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}
