export function About() {
  return (
    <section className="tracking-page about-page">
      <div className="tracking-heading">
        <div>
          <p className="eyebrow">ABOUT</p>
          <h1>About Secure Trace Logistics</h1>
          <p className="tracking-waybill">
            Secure shipment visibility. Global logistics
            coordination. Operational transparency.
          </p>
        </div>
      </div>

      <section className="public-panel about-panel">
        <p className="eyebrow">IDENTITY</p>
        <h2>Who we are</h2>
        <p className="about-copy">
          Secure Trace Logistics is a shipment-tracking and
          logistics intelligence platform. The platform is
          built around one authoritative tracking engine and
          one authoritative rate engine, so that every
          customer-visible event, status, and shipment
          reference is drawn from the same source of truth.
        </p>
      </section>

      <section className="public-panel about-panel">
        <p className="eyebrow">MISSION</p>
        <h2>Why we exist</h2>
        <p className="about-copy">
          Our mission is to make shipment movement
          understandable. Customers should be able to open the
          tracking view and read, at a glance, where their
          shipment is, what the current operational state is,
          and when it is expected to arrive.
        </p>
      </section>

      <div className="about-grid">
        <section className="public-panel about-panel">
          <p className="eyebrow">VISIBILITY</p>
          <h2>Secure shipment visibility</h2>
          <p className="about-copy">
            Shipment information is presented around a single
            canonical tracking identity, timestamped events,
            and a clear operational state. Public tracking
            protects personal information while still
            returning the information a customer needs.
          </p>
        </section>

        <section className="public-panel about-panel">
          <p className="eyebrow">TRANSPARENCY</p>
          <h2>Logistics transparency</h2>
          <p className="about-copy">
            We distinguish between what the platform knows and
            what it does not. If no event records exist for a
            shipment, the interface says so directly instead
            of implying that nothing has happened.
          </p>
        </section>

        <section className="public-panel about-panel">
          <p className="eyebrow">RELIABILITY</p>
          <h2>Operational reliability</h2>
          <p className="about-copy">
            Holds carry reasons. Events carry timestamps.
            Route nodes are recorded in sequence. The tracking
            engine is designed so that the operational record
            can be audited.
          </p>
        </section>

        <section className="public-panel about-panel">
          <p className="eyebrow">TRUST</p>
          <h2>Customer trust</h2>
          <p className="about-copy">
            Every customer-visible status is drawn from the
            authoritative tracking event system. Public
            tracking surfaces only the shipment information
            that is necessary to follow a shipment.
          </p>
        </section>

        <section className="public-panel about-panel">
          <p className="eyebrow">SUSTAINABILITY</p>
          <h2>Responsibility</h2>
          <p className="about-copy">
            Logistics efficiency and environmental
            responsibility are connected concerns.
            Consolidation, accurate dimension capture, and
            responsive routing reduce wasted movement.
          </p>
        </section>

        <section className="public-panel about-panel">
          <p className="eyebrow">TECHNOLOGY</p>
          <h2>Technology-enabled visibility</h2>
          <p className="about-copy">
            Secure Trace Logistics is built as a modern web
            application with a component-driven interface, a
            normalized tracking data model, and an
            authoritative event pipeline.
          </p>
        </section>
      </div>
    </section>
  )
}