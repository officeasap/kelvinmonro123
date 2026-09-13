
import { TrackingSearch } from '../../components/public/tracking/TrackingSearch'
import { FloatingCard } from '../../components/ui/FloatingCard'

export function Home() {
  return (
    <>
      <section className="public-hero">
        <div className="public-hero-copy">
          <p className="eyebrow">SECURETRACELOGISTICS</p>

          <h1>
            Move with confidence.
            <br />
            Know where it is.
          </h1>

          <p className="public-hero-description">
            Intelligent shipment visibility built for clarity,
            confidence, and control. Track the recorded movement
            of your shipment from origin through destination and
            know its latest operational status.
          </p>

          <TrackingSearch />

          <p className="public-hero-support">
            One tracking number. One clear view of your shipment's
            journey.
          </p>
        </div>

        <div className="hero-route-card" aria-hidden="true">
          <span className="route-label">GLOBAL SHIPMENT VISIBILITY</span>

          <div className="route-line">
            <span className="route-node route-node-origin" />
            <span className="route-track" />
            <span className="route-node route-node-destination" />
          </div>

          <div className="route-cities">
            <span>ORIGIN</span>
            <span>DESTINATION</span>
          </div>

          <div className="route-status">
            <span className="state-dot" />
            REAL-TIME CLARITY
          </div>
        </div>
      </section>

      <section className="floating-card-grid">
        <FloatingCard
          number="01"
          title="Track"
          body="Enter your unique STL tracking number and establish a clear view of your shipment."
        />

        <FloatingCard
          number="02"
          title="Trace"
          body="Understand the recorded route, movement stages, and latest operational status."
        />

        <FloatingCard
          number="03"
          title="Deliver"
          body="Move with greater confidence through dependable visibility from origin to destination."
        />
      </section>
    </>
  )
}

