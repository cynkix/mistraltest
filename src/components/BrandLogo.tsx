interface BrandLogoProps {
  variant?: "navigation" | "page"
}

export default function BrandLogo({ variant = "page" }: BrandLogoProps) {
  const isNavigation = variant === "navigation"

  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`grid size-[34px] place-items-center rounded-[10px] text-xs font-semibold ${
          isNavigation ? "bg-white text-primary" : "bg-primary text-white"
        }`}
      >
        OP
      </span>
      <span
        className={`text-lg font-bold ${
          isNavigation ? "text-white" : "text-primary"
        }`}
      >
        Offres Public
      </span>
    </span>
  )
}
