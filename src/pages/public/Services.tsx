
import { FloatingCard } from '../../components/ui/FloatingCard'

export function Services() {
  return (
    <section className="tracking-page services-page">
      <div className="tracking-heading">
        <div>
          <p className="eyebrow">SERVICES</p>

          <h1>
            Logistics built around
            <br />
            movement you can trust.
          </h1>

          <p className="tracking-waybill">
            From time-sensitive parcels to larger consignments,
            SecureTraceLogistics brings disciplined movement,
            structured handling, and clear shipment visibility
            together in one dependable logistics experience.
          </p>
        </div>
      </div>

      <section className="floating-card-grid">
        <FloatingCard
          number="01"
          title="Express"
          body="When time matters, priority movement demands precision. Express service is designed for time-sensitive shipments requiring focused handling and clear visibility across their recorded journey."
        />

        <FloatingCard
          number="02"
          title="Standard"
          body="A dependable choice for planned shipment movement. Standard service balances practical transit expectations with structured handling and transparent shipment visibility from origin to destination."
        />

        <FloatingCard
          number="03"
          title="Economy"
          body="Efficient movement without losing sight of the shipment. Economy service is built for cost-conscious logistics while preserving the visibility needed to understand where your consignment is in its journey."
        />
      </section>

      <section className="floating-card-grid">
        <FloatingCard
          number="04"
          title="International"
          body="Cross-border movement requires discipline beyond transportation. International service supports structured shipment handling, documentation awareness, and visibility across the recorded stages of an international journey."
        />

        <FloatingCard
          number="05"
          title="Freight"
          body="For shipments that demand greater scale, Freight provides a structured movement framework for larger consignments, anchored by the same clear tracking spine that keeps shipment progress understandable."
        />

        <FloatingCard
          number="06"
          title="Last-Mile"
          body="The final movement carries the promise of the entire journey. Last-Mile service focuses attention on the closing stage of delivery, giving you clearer visibility as the shipment approaches its destination."
        />
      </section>

      <section className="floating-card-grid">
        <FloatingCard
          number="07"
          title="Shipment Visibility"
          body="Know more than a tracking number. Access the recorded movement of your shipment, understand its current status, and see the journey that brought it there."
        />

        <FloatingCard
          number="08"
          title="Trace Intelligence"
          body="Turn shipment movement into understandable information. Trace the recorded route, identify movement stages, and maintain a clearer operational picture from origin through destination."
        />

        <FloatingCard
          number="09"
          title="Delivery Confidence"
          body="Confidence begins with visibility. SecureTraceLogistics keeps shipment information clear and accessible so decisions can be made with a better understanding of the journey."
        />
      </section>
    </section>
  )
}

