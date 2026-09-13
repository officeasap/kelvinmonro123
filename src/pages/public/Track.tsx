import { useEffect, useState } from 'react'
import {
  getShipmentByTrackingNumber,
  type Shipment,
} from '../../services/shipment.service'
import {
  deriveTrackingState,
  formatTrackingStatus,
} from '../../services/tracking-state.service'
import { AircraftIcon } from '../../components/public/tracking/AircraftIcon'
import { CargoBoxIcon } from '../../components/public/tracking/CargoBoxIcon'
import { RouteProgressGraph } from '../../components/public/tracking/RouteProgressGraph'
import { ShipmentQrPanel } from '../../components/public/tracking/ShipmentQrPanel'

function getTrackingNumber(): string {
  const segments = window.location.pathname
    .split('/')
    .filter(Boolean)

  if (segments[0] !== 'track' || !segments[1]) {
    return ''
  }

  return decodeURIComponent(segments[1]).trim()
}

function formatDate(value: string | null): string {
  if (!value) return 'NOT RECORDED'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
    .format(new Date(value))
    .toUpperCase()
}

function formatWeight(value: number | null): string {
  if (value === null) return 'NOT RECORDED'
  return `${value} KG`
}

function formatMode(mode: string): string {
  return mode.replaceAll('_', ' ').toUpperCase()
}

function resolvePartyName(
  companyName: string | null | undefined,
  contactName: string | null | undefined,
): string {
  const company = companyName?.trim()
  const contact = contactName?.trim()

  if (company && contact && company !== contact) {
    return `${company} ${contact}`.toUpperCase()
  }

  if (company) return company.toUpperCase()
  if (contact) return contact.toUpperCase()

  return 'NOT RECORDED'
}

function formatPartyLocation(
  city: string | null | undefined,
  country: string | null | undefined,
): string {
  const c = city?.trim()
  const k = country?.trim()

  if (c && k) return `${c}, ${k}`.toUpperCase()
  if (c) return c.toUpperCase()
  if (k) return k.toUpperCase()
  return 'NOT RECORDED'
}

export function Track() {
  const trackingNumber = getTrackingNumber()

  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [loading, setLoading] = useState(Boolean(trackingNumber))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadShipment() {
      if (!trackingNumber) {
        setLoading(false)
        setShipment(null)
        setError(null)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const result =
          await getShipmentByTrackingNumber(trackingNumber)

        if (!cancelled) {
          setShipment(result)
        }
      } catch (cause) {
        if (!cancelled) {
          setError(
            cause instanceof Error
              ? cause.message
              : 'Unable to load shipment tracking.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadShipment()

    return () => {
      cancelled = true
    }
  }, [trackingNumber])

  if (!trackingNumber) {
    return (
      <section className="tracking-page">
        <div className="public-placeholder">
          <p className="eyebrow">SHIPMENT TRACE</p>
          <h1>Track your parcel</h1>
          <p>
            Enter a valid tracking number to retrieve shipment
            information from the SecureTraceLogistics network.
          </p>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="tracking-page">
        <div className="public-placeholder">
          <p className="eyebrow">SHIPMENT TRACE</p>
          <h1>Loading shipment</h1>
          <p>
            SecureTraceLogistics is retrieving the recorded
            shipment data.
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="tracking-page">
        <div className="public-placeholder">
          <p className="eyebrow">TRACKING ERROR</p>
          <h1>Tracking unavailable</h1>
          <p>{error}</p>
        </div>
      </section>
    )
  }

  if (!shipment) {
    return (
      <section className="tracking-page">
        <div className="public-placeholder">
          <p className="eyebrow">SHIPMENT TRACE</p>
          <h1>Shipment not found</h1>
          <p>
            No shipment was found for tracking number{' '}
            <strong>{trackingNumber}</strong>.
          </p>
        </div>
      </section>
    )
  }

  const trackingState = deriveTrackingState(shipment)
  const originNode = shipment.routeNodes[0] ?? null
  const destinationNode =
    trackingState.destinationNode ??
    shipment.routeNodes.at(-1) ??
    null

  return (
    <section className="tracking-page">
      {/* ── IDENTITY ─────────────────────────────────────── */}
      <header className="tracking-header">
        <div className="tracking-header-left">
          <p className="eyebrow">SHIPMENT TRACE</p>

          <h1 className="tracking-identity">
            {shipment.trackingNumber}
          </h1>

          <p className="tracking-waybill">
            WAYBILL <span>{shipment.waybillNumber}</span>
          </p>
        </div>

        <div className="tracking-header-right">
          <span className="tracking-status-badge">
            {formatTrackingStatus(trackingState.status)}
          </span>
        </div>
      </header>

      {/* ── CURRENT SHIPMENT STATE ───────────────────────── */}
      <section className="tracking-panel tracking-state-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">CURRENT SHIPMENT STATE</p>
          <h2>{formatTrackingStatus(trackingState.status)}</h2>
        </div>

        <div className="tracking-state-body">
          {trackingState.currentLeg ? (
            <div className="tracking-state-current">
              <span className="tracking-state-current-label">
                CURRENT MOVEMENT
              </span>

              <div className="tracking-state-current-value">
                {trackingState.currentLeg.mode === 'AIR' ? (
                  <AircraftIcon size={20} />
                ) : null}

                <span>
                  LEG {trackingState.currentLeg.legNumber} —{' '}
                  {formatMode(trackingState.currentLeg.mode)}
                </span>
              </div>
            </div>
          ) : (
            <p className="tracking-state-current-empty">
              Current movement is not recorded.
            </p>
          )}

          <dl className="tracking-facts">
            <div>
              <dt>SERVICE</dt>
              <dd>{shipment.serviceLevel}</dd>
            </div>

            <div>
              <dt>SHIPMENT TYPE</dt>
              <dd>{shipment.shipmentType}</dd>
            </div>

            <div>
              <dt>BOOKED</dt>
              <dd>{formatDate(shipment.bookingDate)}</dd>
            </div>

            <div>
              <dt>ESTIMATED DELIVERY</dt>
              <dd>
                {formatDate(shipment.estimatedDelivery)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── SHIPPER / CONSIGNEE ──────────────────────────── */}
      <section className="tracking-panel tracking-parties-panel">
        <div className="tracking-party">
          <p className="eyebrow">SHIPPER</p>

          <strong className="tracking-party-name">
            {resolvePartyName(
              shipment.shipper?.companyName,
              shipment.shipper?.contactName,
            )}
          </strong>

          <span className="tracking-party-location">
            {formatPartyLocation(
              shipment.shipper?.city,
              shipment.shipper?.country,
            )}
          </span>
        </div>

        <div
          className="tracking-party-divider"
          aria-hidden="true"
        />

        <div className="tracking-party tracking-party-right">
          <p className="eyebrow">CONSIGNEE</p>

          <strong className="tracking-party-name">
            {resolvePartyName(
              shipment.consignee?.companyName,
              shipment.consignee?.contactName,
            )}
          </strong>

          <span className="tracking-party-location">
            {formatPartyLocation(
              shipment.consignee?.city,
              shipment.consignee?.country,
            )}
          </span>
        </div>
      </section>

      {/* ── ROUTE INTELLIGENCE ───────────────────────────── */}
      <section className="tracking-panel tracking-route-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">ROUTE INTELLIGENCE</p>
          <h2>Shipment spine</h2>
        </div>

        <div className="tracking-route-summary">
          <div className="tracking-route-endpoint">
            <span>ORIGIN</span>
            <strong>
              {originNode
                ? (originNode.city ??
                  originNode.facilityName ??
                  'NOT RECORDED')
                : 'NOT RECORDED'}
            </strong>
            <small>{originNode?.country ?? ''}</small>
          </div>

          <div className="tracking-route-endpoint tracking-route-endpoint-right">
            <span>DESTINATION</span>
            <strong>
              {destinationNode
                ? (destinationNode.city ??
                  destinationNode.facilityName ??
                  'NOT RECORDED')
                : 'NOT RECORDED'}
            </strong>
            <small>{destinationNode?.country ?? ''}</small>
          </div>
        </div>

        <RouteProgressGraph
          routeNodes={shipment.routeNodes}
          transportLegs={shipment.transportLegs}
          completedLegs={trackingState.completedLegs}
          currentNodeId={trackingState.currentNode?.id ?? null}
        />
      </section>

      {/* ── AIR LOGISTICS / TRANSPORT PLAN ───────────────── */}
      <section className="tracking-panel tracking-transport-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">AIR LOGISTICS</p>
          <h2>Transport plan</h2>
        </div>

        {shipment.transportLegs.length === 0 ? (
          <div className="tracking-empty">
            <strong>No transport legs recorded</strong>
            <span>
              Transport movement has not yet been recorded for
              this shipment.
            </span>
          </div>
        ) : (
          <ol className="transport-leg-list">
            {shipment.transportLegs.map((leg) => (
              <li
                key={leg.id}
                className="transport-leg transport-leg-air"
              >
                <div className="transport-leg-icon">
                  {leg.mode === 'AIR' ? (
                    <AircraftIcon size={22} />
                  ) : (
                    <span className="transport-leg-icon-fallback">
                      {formatMode(leg.mode)}
                    </span>
                  )}
                </div>

                <div className="transport-leg-body">
                  <span className="transport-leg-number">
                    LEG {String(leg.legNumber).padStart(2, '0')}
                  </span>
                  <strong className="transport-leg-mode">
                    {formatMode(leg.mode)}
                  </strong>
                </div>

                <span
                  className={`status-badge status-${leg.status.toLowerCase()}`}
                >
                  {formatTrackingStatus(leg.status)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* ── CARGO MANIFEST ───────────────────────────────── */}
      <section className="tracking-panel tracking-cargo-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">CARGO MANIFEST</p>
          <h2>Packages</h2>
        </div>

        {shipment.packages.length === 0 ? (
          <div className="tracking-empty">
            <strong>No package records</strong>
            <span>
              Package information has not been recorded for this
              shipment.
            </span>
          </div>
        ) : (
          <ul className="cargo-list">
            {shipment.packages.map((pkg) => (
              <li key={pkg.id} className="cargo-item">
                <div className="cargo-item-icon">
                  <CargoBoxIcon size={26} />
                </div>

                <div className="cargo-item-body">
                  <span className="cargo-item-number">
                    PACKAGE{' '}
                    {String(pkg.packageNumber).padStart(2, '0')}
                  </span>

                  <strong className="cargo-item-description">
                    {(
                      pkg.description ??
                      pkg.commodity ??
                      'NOT RECORDED'
                    ).toUpperCase()}
                  </strong>
                </div>

                <dl className="cargo-item-facts">
                  <div>
                    <dt>GROSS WEIGHT</dt>
                    <dd>{formatWeight(pkg.grossWeightKg)}</dd>
                  </div>

                  {pkg.chargeableWeightKg !== null ? (
                    <div>
                      <dt>CHARGEABLE</dt>
                      <dd>
                        {formatWeight(pkg.chargeableWeightKg)}
                      </dd>
                    </div>
                  ) : null}

                  {pkg.packageType ? (
                    <div>
                      <dt>TYPE</dt>
                      <dd>{pkg.packageType.toUpperCase()}</dd>
                    </div>
                  ) : null}
                </dl>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── OPERATIONAL EVENT HISTORY ────────────────────── */}
      <section className="tracking-panel tracking-events-panel">
        <div className="tracking-panel-heading">
          <p className="eyebrow">OPERATIONAL EVENT HISTORY</p>
          <h2>No events recorded</h2>
        </div>

        <p className="tracking-events-note">
          SecureTraceLogistics currently has no timestamped
          operational event records associated with this
          shipment.
        </p>

        <p className="tracking-events-status">
          CURRENT STATUS:{' '}
          <strong>
            {formatTrackingStatus(trackingState.status)}
          </strong>{' '}
          — established from the active transport record, not
          from event history.
        </p>
      </section>

      {/* ── QR SHIPMENT REFERENCE ────────────────────────── */}
      <ShipmentQrPanel trackingNumber={shipment.trackingNumber} />
    </section>
  )
}