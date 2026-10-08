import { CheckCircle2, CircleAlert, LockKeyhole } from "lucide-react"
import type { Status } from "../mockData"

const statusConfig = {
  open: {
    label: "Ouvert",
    className: "bg-success-soft text-success-dark border-success/20",
    icon: CheckCircle2,
  },
  contested: {
    label: "Disputé",
    className: "bg-warning-soft text-warning-dark border-warning/20",
    icon: CircleAlert,
  },
  locked: {
    label: "Verrouillé",
    className: "bg-danger-soft text-danger-dark border-danger/20",
    icon: LockKeyhole,
  },
}

export default function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-extrabold ${config.className}`}
    >
      <Icon size={17} strokeWidth={2.5} />
      {config.label}
    </span>
  )
}
