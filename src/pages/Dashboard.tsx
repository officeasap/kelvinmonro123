import { ShipmentTable } from '../components/logistics/ShipmentTable'

export function Dashboard() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">SECURE TRACE LOGICTICS</p>
          <h1>Track every movement.<br />Know where it stands.</h1>
          <p className="hero-copy">
            A controlled logistics intelligence foundation for shipment
            visibility, traceability, and operational decision-making.
          </p>
        </div>

        <div className="hero-stamp">
          <span>STL</span>
          <small>CONTROL<br />CENTER</small>
        </div>
      </section>

      <section className="metric-grid">
        <div className="metric-card">
          <span>ACTIVE SHIPMENTS</span>
          <strong>01</strong>
        </div>

        <div className="metric-card">
          <span>PENDING</span>
          <strong>01</strong>
        </div>

        <div className="metric-card">
          <span>DELIVERED</span>
          <strong>01</strong>
        </div>

        <div className="metric-card">
          <span>ALERTS</span>
          <strong>00</strong>
        </div>
      </section>

      <ShipmentTable />
    </>
  )
}
