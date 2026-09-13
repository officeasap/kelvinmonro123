interface PublicPlaceholderProps {
  eyebrow: string
  title: string
  description: string
}

export function PublicPlaceholder({
  eyebrow,
  title,
  description,
}: PublicPlaceholderProps) {
  return (
    <section className="public-placeholder">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}
