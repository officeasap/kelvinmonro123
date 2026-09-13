export function ShipmentTable() {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">SHIPMENT REGISTER</p>
          <h2>Operational shipment register</h2>
        </div>

        <span className="record-count">Live data</span>
      </div>

      <div className="coming-state">
        <strong>Shipment register ready</strong>
        <span>
          Live shipment records will appear here when the operations
          console is connected to the STL shipment service.
        </span>
      </div>
    </section>
  )
}