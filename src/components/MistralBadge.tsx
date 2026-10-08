export default function MistralBadge({
  label = "Mistral",
}: {
  label?: string
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-mistral-soft px-3 py-1.5 text-[13px] font-semibold text-mistral">
      <span className="size-2.5 bg-mistral" />
      {label}
    </span>
  )
}
