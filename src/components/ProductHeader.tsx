import NavBar, { type NavTarget } from "../figma/NavBar"

export type ProductScreen = NavTarget

interface ProductHeaderProps {
  active: ProductScreen
  onNavigate: (screen: ProductScreen) => void
}

/** Barre de navigation Figma, en pleine largeur au-dessus des écrans existants. */
export default function ProductHeader({ active, onNavigate }: ProductHeaderProps) {
  return (
    <div className="relative left-1/2 -mt-8 w-screen -translate-x-1/2">
      <NavBar active={active} onNavigate={onNavigate} />
    </div>
  )
}
