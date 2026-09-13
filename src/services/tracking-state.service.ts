import type {
  LegStatus,
  RouteNode,
  Shipment,
  ShipmentStatus,
  TransportLeg,
} from './shipment.service'

export interface TrackingProgress {
  journey: number
  transport: number
  delivery: number
}

export interface TrackingState {
  status: ShipmentStatus
  currentLeg: TransportLeg | null
  nextLeg: TransportLeg | null
  currentNode: RouteNode | null
  destinationNode: RouteNode | null
  completedLegs: number
  totalLegs: number
  progress: TrackingProgress
  hasTrackingEvents: boolean
  timelineState: 'EMPTY'
}

function clamp(value: number): number {
  return Math.min(100, Math.max(0, value))
}

function findCurrentLeg(
  legs: TransportLeg[],
): TransportLeg | null {
  return (
    legs.find((leg) => leg.status === 'IN_TRANSIT') ??
    legs.find((leg) => leg.status === 'EXCEPTION') ??
    null
  )
}

function findNextLeg(
  legs: TransportLeg[],
  currentLeg: TransportLeg | null,
): TransportLeg | null {
  if (!currentLeg) {
    return (
      legs.find((leg) => leg.status === 'PENDING') ??
      null
    )
  }

  return (
    legs.find(
      (leg) =>
        leg.legNumber > currentLeg.legNumber &&
        leg.status === 'PENDING',
    ) ?? null
  )
}

function findCurrentNode(
  shipment: Shipment,
  currentLeg: TransportLeg | null,
): RouteNode | null {
  if (!currentLeg) {
    return (
      shipment.routeNodes.find(
        (node) => node.nodeType === 'ORIGIN',
      ) ??
      shipment.routeNodes[0] ??
      null
    )
  }

  return (
    shipment.routeNodes.find(
      (node) => node.id === currentLeg.fromNodeId,
    ) ?? null
  )
}

function findDestinationNode(
  shipment: Shipment,
): RouteNode | null {
  return (
    shipment.routeNodes.find(
      (node) => node.nodeType === 'FINAL_DELIVERY',
    ) ??
    shipment.routeNodes.at(-1) ??
    null
  )
}

function countCompletedLegs(
  legs: TransportLeg[],
): number {
  return legs.filter(
    (leg) => leg.status === 'COMPLETED',
  ).length
}

function calculateJourneyProgress(
  completedLegs: number,
  totalLegs: number,
  currentLeg: TransportLeg | null,
): number {
  if (totalLegs === 0) {
    return 0
  }

  const activeContribution = currentLeg ? 0.5 : 0

  return clamp(
    ((completedLegs + activeContribution) / totalLegs) *
      100,
  )
}

function calculateTransportProgress(
  completedLegs: number,
  totalLegs: number,
  currentLeg: TransportLeg | null,
): number {
  if (totalLegs === 0) {
    return 0
  }

  const activeContribution =
    currentLeg?.status === 'IN_TRANSIT' ? 0.5 : 0

  return clamp(
    ((completedLegs + activeContribution) / totalLegs) *
      100,
  )
}

function calculateDeliveryProgress(
  shipmentStatus: ShipmentStatus,
  completedLegs: number,
  totalLegs: number,
): number {
  if (shipmentStatus === 'DELIVERED') {
    return 100
  }

  if (totalLegs === 0) {
    return 0
  }

  if (shipmentStatus === 'OUT_FOR_DELIVERY') {
    return clamp(
      75 + (completedLegs / totalLegs) * 25,
    )
  }

  if (shipmentStatus === 'DESTINATION') {
    return clamp(
      60 + (completedLegs / totalLegs) * 15,
    )
  }

  return clamp(
    (completedLegs / totalLegs) * 60,
  )
}

export function deriveTrackingState(
  shipment: Shipment,
): TrackingState {
  const legs = [...shipment.transportLegs].sort(
    (a, b) => a.legNumber - b.legNumber,
  )

  const completedLegs = countCompletedLegs(legs)
  const totalLegs = legs.length
  const currentLeg = findCurrentLeg(legs)
  const nextLeg = findNextLeg(legs, currentLeg)
  const currentNode = findCurrentNode(
    shipment,
    currentLeg,
  )
  const destinationNode =
    findDestinationNode(shipment)

  return {
    status: shipment.status,
    currentLeg,
    nextLeg,
    currentNode,
    destinationNode,
    completedLegs,
    totalLegs,
    progress: {
      journey: calculateJourneyProgress(
        completedLegs,
        totalLegs,
        currentLeg,
      ),
      transport: calculateTransportProgress(
        completedLegs,
        totalLegs,
        currentLeg,
      ),
      delivery: calculateDeliveryProgress(
        shipment.status,
        completedLegs,
        totalLegs,
      ),
    },
    hasTrackingEvents: false,
    timelineState: 'EMPTY',
  }
}

export function formatTrackingStatus(
  status: ShipmentStatus | LegStatus,
): string {
  return status.replaceAll('_', ' ')
}