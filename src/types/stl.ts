export type ShipmentStatus =
  | 'PENDING'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'DELAYED'

export interface Shipment {
  id: string
  trackingNumber: string
  origin: string
  destination: string
  status: ShipmentStatus
}
