interface CargoBoxIconProps {
  size?: number
  className?: string
  color?: string
}

export function CargoBoxIcon({
  size = 22,
  className,
  color = 'var(--stl-text-inverse)',
}: CargoBoxIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" />
      <path d="M3.5 7.5 12 12l8.5-4.5" />
      <path d="M12 12v9" />
      <path d="M7.75 5.25 16.25 9.75" />
    </svg>
  )
}