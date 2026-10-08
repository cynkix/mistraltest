import type { ReactNode } from "react"

export type Tone = "ouvert" | "dispute" | "verrouille"

const toneClasses: Record<Tone, string> = {
  ouvert: "bg-[var(--ouvert-fond)] text-[color:var(--ouvert)]",
  dispute: "bg-[var(--dispute-fond)] text-[color:var(--dispute)]",
  verrouille: "bg-[var(--verrouille-fond)] text-[color:var(--verrouille)]",
}

const toneIcons: Record<Tone, string> = {
  ouvert: "✓",
  dispute: "!",
  verrouille: "✕",
}

/** Composant Figma « Badge » (14:282) : toujours icône + texte. */
export function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 font-semibold leading-[1.4] ${toneClasses[tone]}`}
    >
      <span className="text-[12px]" aria-hidden>
        {toneIcons[tone]}
      </span>
      <span className="text-[13px]">{children}</span>
    </span>
  )
}

/** Composant Figma « Badge Mistral » (14:288). */
export function MistralBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--mistral-fond)] px-3 py-1.5">
      <span className="size-2.5 shrink-0 bg-[var(--mistral)]" aria-hidden />
      <span className="text-[13px] font-semibold leading-[1.4] text-[color:var(--mistral)]">
        {children}
      </span>
    </span>
  )
}

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "outline" | "soft"
  className?: string
}

/** Composant Figma « Button » (14:287). */
export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "op-btn-primary px-4 py-3 text-[14px] leading-[1.45] text-[color:var(--primary-foreground)]",
    outline:
      "border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[14px] leading-[1.45] text-[color:var(--foreground)]",
    soft: "bg-[var(--background)] px-3.5 py-2 text-[13px] leading-[1.4] text-[color:var(--foreground)]",
  }[variant]
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl font-semibold transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${styles} ${className}`}
    >
      {children}
    </button>
  )
}

/** Halos de fond (2045:633 / 634 / 635), positionnés comme dans la frame 1440 px. */
export function Halos({ bottomHaloTop }: { bottomHaloTop?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 bottom-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-0 h-full w-[1440px] -translate-x-1/2">
        <img src="/figma/halo-haut-droite.svg" width="560" height="580" alt="" className="absolute left-[880px] top-0" />
        <img src="/figma/halo-gauche.svg" width="380" height="640" alt="" className="absolute left-0 top-[340px]" />
        {bottomHaloTop !== undefined && (
          <img
            src="/figma/halo-bas-droite.svg"
            width="616"
            height="720"
            alt=""
            className="absolute left-[824px]"
            style={{ top: bottomHaloTop }}
          />
        )}
      </div>
    </div>
  )
}
