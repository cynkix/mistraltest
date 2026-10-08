export type NavTarget = "dashboard" | "markets" | "applications" | "company" | "veille"

const tabs: { id: NavTarget; label: string; icon: string }[] = [
  { id: "dashboard", label: "Accueil", icon: "/figma/nav-accueil.svg" },
  { id: "markets", label: "Analyser un marché", icon: "/figma/nav-marche.svg" },
  { id: "applications", label: "Mes candidatures", icon: "/figma/nav-candidatures.svg" },
  { id: "company", label: "Mon entreprise", icon: "/figma/nav-entreprise.svg" },
]

/** Composant Figma « Barre de navigation » (2013:244). */
export default function NavBar({
  active,
  onNavigate,
}: {
  active: NavTarget | null
  onNavigate: (target: NavTarget) => void
}) {
  return (
    <header className="op-nav op-font sticky top-0 z-40 h-[68px] w-full text-[color:var(--nav-foreground)]">
      <div className="mx-auto flex h-full max-w-[1100px] items-center gap-4 px-5 lg:gap-7 lg:px-0">
        <button
          type="button"
          onClick={() => onNavigate("dashboard")}
          className="flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span className="grid size-[34px] place-items-center rounded-[10px] bg-[var(--nav-foreground)] text-[12px] font-semibold leading-[1.4] text-[color:var(--nav)]">
            OP
          </span>
          <span className="hidden whitespace-nowrap text-[18px] font-bold leading-[1.35] sm:inline">
            Offre Public
          </span>
        </button>
        <nav aria-label="Navigation principale" className="flex h-full min-w-0 gap-0.5 overflow-x-auto xl:shrink-0 xl:overflow-visible">
          {tabs.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-full shrink-0 items-center gap-2 border-b-[3px] px-4 text-[14px] leading-[1.45] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white ${
                  isActive
                    ? "border-[var(--nav-foreground)] bg-white/12 font-semibold"
                    : "border-transparent font-medium [&>span]:opacity-78 hover:bg-white/6"
                }`}
              >
                <img
                  src={tab.icon}
                  width="18"
                  height="18"
                  alt=""
                  className={isActive ? "" : "opacity-78"}
                />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
        <div className="min-w-px flex-1" />
        <button
          type="button"
          onClick={() => onNavigate("veille")}
          className={`shrink-0 rounded-full border px-3 py-2 text-[13px] font-semibold leading-[1.4] whitespace-nowrap ${
            active === "veille" ? "border-white bg-white/12" : "border-white/35"
          }`}
        >
          + Veille+
        </button>
        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <span className="grid size-9 place-items-center rounded-full bg-[var(--nav-foreground)] text-[12px] font-semibold leading-[1.4] text-[color:var(--nav)]">
            KB
          </span>
          <span className="flex flex-col leading-[1.4] whitespace-nowrap">
            <span className="text-[13px] font-semibold">Karim Benali</span>
            <span className="text-[12px] opacity-72">Brillance Lyon PME</span>
          </span>
        </div>
      </div>
    </header>
  )
}
