import type {
  RouteNode,
  TransportLeg,
} from '../../../services/shipment.service'
import { AircraftIcon } from './AircraftIcon'

interface RouteProgressGraphProps {
  routeNodes: RouteNode[]
  transportLegs: TransportLeg[]
  completedLegs: number
  currentNodeId: string | null
}

const NODE_TYPE_LABELS: Record<string, string> = {
  ORIGIN: 'Origin',
  PROCESSING_HUB: 'Processing Hub',
  TRANSIT_HUB: 'Transit Hub',
  DESTINATION_HUB: 'Destination Hub',
  FINAL_DELIVERY: 'Final Delivery',
}

function formatNodeTypeLabel(nodeType: string): string {
  return (
    NODE_TYPE_LABELS[nodeType] ??
    nodeType.replaceAll('_', ' ')
  )
}

function formatNodeLabel(node: RouteNode): string {
  return (
    node.city ??
    node.facilityName ??
    node.nodeType.replaceAll('_', ' ')
  )
}

function formatNodeSubLabel(
  node: RouteNode,
  isDuplicateCity: boolean,
): string {
  if (isDuplicateCity) {
    return formatNodeTypeLabel(node.nodeType)
  }

  if (node.country) return node.country
  if (node.facilityName && node.city) return node.facilityName
  return ''
}

export function RouteProgressGraph({
  routeNodes,
  transportLegs,
  completedLegs,
  currentNodeId,
}: RouteProgressGraphProps) {
  if (routeNodes.length === 0) {
    return (
      <div className="route-graph-empty">
        <strong>No route recorded</strong>
        <span>
          Route information has not been recorded for this
          shipment.
        </span>
      </div>
    )
  }

  const sortedLegs = [...transportLegs].sort(
    (a, b) => a.legNumber - b.legNumber,
  )

  return (
    <ol className="route-graph" aria-label="Shipment route">
      {routeNodes.map((node, index) => {
        const isLast = index === routeNodes.length - 1
        const isCurrent = node.id === currentNodeId
        const isCompleted = index <= completedLegs && !isCurrent

        const legAfter = sortedLegs[index] ?? null
        const legStatus = legAfter?.status ?? null

        const nodeState = isCurrent
          ? 'active'
          : isCompleted
            ? 'complete'
            : 'pending'

        const cityLabel = node.city ?? node.facilityName ?? ''
        const isDuplicateCity =
          cityLabel !== '' &&
          routeNodes.some(
            (other, otherIndex) =>
              otherIndex !== index &&
              (other.city ?? other.facilityName ?? '') ===
                cityLabel,
          )

        const subLabel = formatNodeSubLabel(
          node,
          isDuplicateCity,
        )

        return (
          <li
            key={node.id}
            className={`route-graph-node route-graph-node-${nodeState}`}
          >
            <div className="route-graph-marker">
              <span className="route-graph-dot" />
            </div>

            <div className="route-graph-body">
              <span className="route-graph-label">
                {formatNodeLabel(node)}
              </span>

              {subLabel ? (
                <span className="route-graph-sublabel">
                  {subLabel}
                </span>
              ) : null}
            </div>

            {!isLast ? (
              <div className="route-graph-edge">
                <span className="route-graph-edge-line" />

                {legAfter && legAfter.mode === 'AIR' ? (
                  <span className="route-graph-edge-icon">
                    <AircraftIcon size={16} />
                  </span>
                ) : null}

                {legStatus ? (
                  <span className="route-graph-edge-status">
                    {legStatus.replaceAll('_', ' ')}
                  </span>
                ) : null}
              </div>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}