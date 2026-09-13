interface AircraftIconProps {
  size?: number
  className?: string
  color?: string
}

export function AircraftIcon({
  size = 20,
  className,
  color = 'var(--stl-aircraft-sky)',
}: AircraftIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3.2c-.9 0-1.6 1.1-1.6 2.4v3.1L4 12.1v1.9l6.4-2v3.6L7.9 17.4v1.3L11 17.6l1 2.2 1-2.2 3.1 1.1v-1.3l-2.5-1.8v-3.6l6.4 2v-1.9l-6.4-3.4V5.6c0-1.3-.7-2.4-1.6-2.4Z" />
    </svg>
  )
}