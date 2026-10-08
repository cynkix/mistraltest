import BrandLogo from "./BrandLogo"

export type ProductScreen = "dashboard" | "markets" | "applications" | "company"

interface ProductHeaderProps {
  active: ProductScreen
  onNavigate: (screen: ProductScreen) => void
}

interface NavigationItem {
  id: ProductScreen
  label: string
}

const items: NavigationItem[] = [
  { id: "dashboard", label: "Tableau de bord" },
  { id: "markets", label: "Analyser un marché" },
  { id: "company", label: "Mon entreprise" },
]

const icons: Record<"dashboard" | "markets" | "company", string> = {
  dashboard: "/assets/13b35.svg",
  markets: "/assets/f4097.svg",
  company: "/assets/402a3.svg",
}

export default function ProductHeader({
  active,
  onNavigate,
}: ProductHeaderProps) {
  return (
    <header className="relative left-1/2 -mt-8 h-[68px] w-screen -translate-x-1/2 bg-primary text-white shadow-[0_2px_6px_rgba(10,20,51,0.18)]">
      <div className="mx-auto flex h-full max-w-[1260px] items-center gap-4 overflow-hidden px-5 sm:px-8 lg:gap-7">
        <button
          type="button"
          onClick={() => onNavigate("dashboard")}
          className="flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <BrandLogo variant="navigation" />
        </button>
        <nav
          aria-label="Navigation principale"
          className="flex h-full min-w-0 flex-1 overflow-x-auto"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active === item.id ? "page" : undefined}
              className={`flex h-full shrink-0 items-center gap-2 border-b-[3px] px-4 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white ${
                active === item.id
                  ? "border-white bg-white/10 font-semibold text-white"
                  : "border-transparent font-medium text-white/80 hover:text-white"
              }`}
            >
              <img
                src={icons[(item.id as keyof typeof icons)]}
                width="18"
                height="18"
                alt=""
              />
              {item.label === "Tableau de bord" ? "Accueil" : item.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="hidden shrink-0 rounded-full border border-white/35 px-3 py-2 text-[13px] font-semibold sm:block"
        >
          + Veille+
        </button>
        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <span className="grid size-9 place-items-center rounded-full bg-white text-xs font-semibold text-primary">
            KB
          </span>
          <div>
            <p className="text-[13px] font-semibold">Karim Benali</p>
            <p className="text-xs text-white/70">Brillance Lyon PME</p>
          </div>
        </div>
      </div>
    </header>
  )
}
