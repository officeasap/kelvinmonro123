import type { ShipmentStatus } from '../../types/stl'

interface StatusBadgeProps {
  status: ShipmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-${status.toLowerCase().replace('_', '-')}`}>
      {status.replace('_', ' ')}
    </span>
  )
}
