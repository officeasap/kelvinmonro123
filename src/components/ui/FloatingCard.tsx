import type { ReactNode } from 'react'

interface FloatingCardProps {
  number: string
  title: string
  body: string
  children?: ReactNode
}

export function FloatingCard({
  number,
  title,
  body,
  children,
}: FloatingCardProps) {
  return (
    <article className="card-floating">
      <span className="card-floating-number">
        {number}
      </span>

      <span
        className="card-floating-rule"
        aria-hidden="true"
      />

      <h2 className="card-floating-title">
        {title}
      </h2>

      <p className="card-floating-body">
        {body}
      </p>

      {children}
    </article>
  )
}