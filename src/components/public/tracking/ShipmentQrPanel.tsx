import { QRCodeSVG } from 'qrcode.react'

interface ShipmentQrPanelProps {
  trackingNumber: string
}

const LIVE_REFERENCE_BASE = 'https://securetracelogistics.com/track/'

export function ShipmentQrPanel({
  trackingNumber,
}: ShipmentQrPanelProps) {
  const liveUrl = `${LIVE_REFERENCE_BASE}${encodeURIComponent(trackingNumber)}`

  return (
    <section className="qr-panel">
      <header className="qr-panel-header">
        <p className="eyebrow">SECURE SHIPMENT REFERENCE</p>
        <h2>STL QR</h2>
      </header>

      <div className="qr-panel-body">
        <div className="qr-frame">
          <QRCodeSVG
            value={liveUrl}
            size={220}
            level="H"
            bgColor="#f0ede8"
            fgColor="#292824"
            marginSize={4}
            imageSettings={{
              src: '/stl-logo.png',
              height: 44,
              width: 44,
              excavate: true,
            }}
          />
        </div>

        <div className="qr-panel-meta">
          <span className="qr-panel-kind">
            LIVE SHIPMENT REFERENCE
          </span>

          <p className="qr-panel-instruction">
            Scan to open the live tracking record for this
            shipment.
          </p>

          <p className="qr-panel-url">
            {liveUrl}
          </p>

          <p className="qr-panel-note">
            This QR resolves to the current tracking view and
            reflects live data when scanned with an active
            connection.
          </p>
        </div>
      </div>
    </section>
  )
}