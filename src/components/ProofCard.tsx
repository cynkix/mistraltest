import type { ReactNode } from "react"
import { ExternalLink } from "lucide-react"
import type { SourceCategory } from "../mockData"

interface ProofCardProps {
  title: string
  description: string
  category: SourceCategory
  onOpenSources: (category: SourceCategory) => void
  children: ReactNode
}

export default function ProofCard({
  title,
  description,
  category,
  onOpenSources,
  children,
}: ProofCardProps) {
  return (
    <article className="flex min-h-[360px] flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-extrabold tracking-[-0.02em]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
      </div>
      <div className="flex-1">{children}</div>
      <button
        type="button"
        onClick={() => onOpenSources(category)}
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        Voir les marchés sources
        <ExternalLink size={14} />
      </button>
    </article>
  )
}
