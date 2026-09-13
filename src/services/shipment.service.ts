
import { supabase } from '../lib/supabase'

export type ShipmentStatus =
  | 'BOOKED'
  | 'RECEIVED'
  | 'PROCESSING'
  | 'DISPATCHED'
  | 'IN_TRANSIT'
  | 'DESTINATION'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'CANCELLED'

export type ServiceLevel =
  | 'EXPRESS'
  | 'STANDARD'
  | 'ECONOMY'

export type TransportMode =
  | 'TRUCK'
  | 'AIR'
  | 'VAN'
  | 'SEA'
  | 'RAIL'
  | 'OTHER'

export type LegStatus =
  | 'PENDING'
  | 'IN_TRANSIT'
  | 'COMPLETED'
  | 'EXCEPTION'
  | 'CANCELLED'

export type PartyRole = 'SHIPPER' | 'CONSIGNEE'

export type RouteNodeType =
  | 'ORIGIN'
  | 'PROCESSING_HUB'
  | 'TRANSIT_HUB'
  | 'DESTINATION_HUB'
  | 'FINAL_DELIVERY'

export interface ShipmentParty {
  id: string
  role: PartyRole
  companyName: string | null
  contactName: string | null
  phone: string | null
  email: string | null
  addressLine: string | null
  city: string | null
  stateProvince: string | null
  country: string | null
  postalCode: string | null
}

export interface ShipmentPackage {
  id: string
  packageNumber: number
  description: string | null
  packageType: string | null
  grossWeightKg: number | null
  chargeableWeightKg: number | null
  volumeM3: number | null
  lengthCm: number | null
  widthCm: number | null
  heightCm: number | null
  commodity: string | null
  hsCode: string | null
  declaredValue: number | null
  currency: string | null
}

export interface RouteNode {
  id: string
  sequenceNumber: number
  nodeType: RouteNodeType
  facilityName: string | null
  city: string | null
  country: string | null
}

export interface TransportLeg {
  id: string
  legNumber: number
  mode: TransportMode
  status: LegStatus
  fromNodeId: string
  toNodeId: string
  departedAt: string | null
  arrivedAt: string | null
}

export interface Shipment {
  id: string
  waybillNumber: string
  trackingNumber: string
  shipmentType: string
  serviceLevel: ServiceLevel
  status: ShipmentStatus
  bookingDate: string
  estimatedDelivery: string | null
  actualDelivery: string | null
  referenceNumber: string | null
  customerAccount: string | null
  createdAt: string
  updatedAt: string
  shipper: ShipmentParty | null
  consignee: ShipmentParty | null
  packages: ShipmentPackage[]
  routeNodes: RouteNode[]
  transportLegs: TransportLeg[]
}

interface WaybillRow {
  id: string
  waybill_number: string
  tracking_number: string
  shipment_type: string
  service_level: ServiceLevel
  status: ShipmentStatus
  booking_date: string
  estimated_delivery: string | null
  actual_delivery: string | null
  reference_number: string | null
  customer_account: string | null
  created_at: string
  updated_at: string
}

interface PartyRow {
  id: string
  company_name: string | null
  contact_name: string | null
  phone: string | null
  email: string | null
  address_line: string | null
  city: string | null
  state_province: string | null
  country: string | null
  postal_code: string | null
}

interface WaybillPartyRow {
  waybill_id: string
  party_id: string
  party_role: PartyRole
}

interface PackageRow {
  id: string
  waybill_id: string
  package_number: number
  description: string | null
  package_type: string | null
  gross_weight_kg: number | null
  chargeable_weight_kg: number | null
  volume_m3: number | null
  length_cm: number | null
  width_cm: number | null
  height_cm: number | null
  commodity: string | null
  hs_code: string | null
  declared_value: number | null
  currency: string | null
}

interface RouteNodeRow {
  id: string
  waybill_id: string
  sequence_number: number
  node_type: RouteNodeType
  facility_name: string | null
  city: string | null
  country: string | null
}

interface TransportLegRow {
  id: string
  waybill_id: string
  leg_number: number
  mode: TransportMode
  status: LegStatus
  from_node_id: string
  to_node_id: string
  departed_at: string | null
  arrived_at: string | null
}

function assertNoError(
  error: { message?: string } | null,
  operation: string,
) {
  if (error) {
    throw new Error(
      `Supabase ${operation} failed: ${error.message ?? 'Unknown error'}`,
    )
  }
}

function mapParty(
  row: PartyRow,
  role: PartyRole,
): ShipmentParty {
  return {
    id: row.id,
    role,
    companyName: row.company_name,
    contactName: row.contact_name,
    phone: row.phone,
    email: row.email,
    addressLine: row.address_line,
    city: row.city,
    stateProvince: row.state_province,
    country: row.country,
    postalCode: row.postal_code,
  }
}

function mapPackage(row: PackageRow): ShipmentPackage {
  return {
    id: row.id,
    packageNumber: row.package_number,
    description: row.description,
    packageType: row.package_type,
    grossWeightKg: row.gross_weight_kg,
    chargeableWeightKg: row.chargeable_weight_kg,
    volumeM3: row.volume_m3,
    lengthCm: row.length_cm,
    widthCm: row.width_cm,
    heightCm: row.height_cm,
    commodity: row.commodity,
    hsCode: row.hs_code,
    declaredValue: row.declared_value,
    currency: row.currency,
  }
}

function mapRouteNode(row: RouteNodeRow): RouteNode {
  return {
    id: row.id,
    sequenceNumber: row.sequence_number,
    nodeType: row.node_type,
    facilityName: row.facility_name,
    city: row.city,
    country: row.country,
  }
}

function mapTransportLeg(row: TransportLegRow): TransportLeg {
  return {
    id: row.id,
    legNumber: row.leg_number,
    mode: row.mode,
    status: row.status,
    fromNodeId: row.from_node_id,
    toNodeId: row.to_node_id,
    departedAt: row.departed_at,
    arrivedAt: row.arrived_at,
  }
}

export async function getShipmentByTrackingNumber(
  trackingNumber: string,
): Promise<Shipment | null> {
  const normalizedTrackingNumber = trackingNumber.trim().toUpperCase()

  if (!normalizedTrackingNumber) {
    return null
  }

  const {
    data: waybill,
    error: waybillError,
  } = await supabase
    .from('stl_waybills')
    .select(
      `
        id,
        waybill_number,
        tracking_number,
        shipment_type,
        service_level,
        status,
        booking_date,
        estimated_delivery,
        actual_delivery,
        reference_number,
        customer_account,
        created_at,
        updated_at
      `,
    )
    .eq('tracking_number', normalizedTrackingNumber)
    .maybeSingle()

  assertNoError(waybillError, 'waybill lookup')

  if (!waybill) {
    return null
  }

  const typedWaybill = waybill as WaybillRow

  const [
    { data: waybillParties, error: waybillPartiesError },
    { data: packages, error: packagesError },
    { data: routeNodes, error: routeNodesError },
    { data: transportLegs, error: transportLegsError },
  ] = await Promise.all([
    supabase
      .from('stl_waybill_parties')
      .select(
        `
          waybill_id,
          party_id,
          party_role
        `,
      )
      .eq('waybill_id', typedWaybill.id),

    supabase
      .from('stl_packages')
      .select(
        `
          id,
          waybill_id,
          package_number,
          description,
          package_type,
          gross_weight_kg,
          chargeable_weight_kg,
          volume_m3,
          length_cm,
          width_cm,
          height_cm,
          commodity,
          hs_code,
          declared_value,
          currency
        `,
      )
      .eq('waybill_id', typedWaybill.id)
      .order('package_number', { ascending: true }),

    supabase
      .from('stl_route_nodes')
      .select(
        `
          id,
          waybill_id,
          sequence_number,
          node_type,
          facility_name,
          city,
          country
        `,
      )
      .eq('waybill_id', typedWaybill.id)
      .order('sequence_number', { ascending: true }),

    supabase
      .from('stl_transport_legs')
      .select(
        `
          id,
          waybill_id,
          leg_number,
          mode,
          status,
          from_node_id,
          to_node_id,
          departed_at,
          arrived_at
        `,
      )
      .eq('waybill_id', typedWaybill.id)
      .order('leg_number', { ascending: true }),
  ])

  assertNoError(waybillPartiesError, 'party relationship lookup')
  assertNoError(packagesError, 'package lookup')
  assertNoError(routeNodesError, 'route lookup')
  assertNoError(transportLegsError, 'transport-leg lookup')

  const typedWaybillParties =
    (waybillParties ?? []) as WaybillPartyRow[]

  const partyIds = typedWaybillParties.map(
    (relationship) => relationship.party_id,
  )

  let partyRows: PartyRow[] = []

  if (partyIds.length > 0) {
    const {
      data,
      error,
    } = await supabase
      .from('stl_parties')
      .select(
        `
          id,
          company_name,
          contact_name,
          phone,
          email,
          address_line,
          city,
          state_province,
          country,
          postal_code
        `,
      )
      .in('id', partyIds)

    assertNoError(error, 'party lookup')
    partyRows = (data ?? []) as PartyRow[]
  }

  const partyById = new Map(
    partyRows.map((party) => [party.id, party]),
  )

  let shipper: ShipmentParty | null = null
  let consignee: ShipmentParty | null = null

  for (const relationship of typedWaybillParties) {
    const party = partyById.get(relationship.party_id)

    if (!party) {
      continue
    }

    if (relationship.party_role === 'SHIPPER') {
      shipper = mapParty(party, 'SHIPPER')
    }

    if (relationship.party_role === 'CONSIGNEE') {
      consignee = mapParty(party, 'CONSIGNEE')
    }
  }

  return {
    id: typedWaybill.id,
    waybillNumber: typedWaybill.waybill_number,
    trackingNumber: typedWaybill.tracking_number,
    shipmentType: typedWaybill.shipment_type,
    serviceLevel: typedWaybill.service_level,
    status: typedWaybill.status,
    bookingDate: typedWaybill.booking_date,
    estimatedDelivery: typedWaybill.estimated_delivery,
    actualDelivery: typedWaybill.actual_delivery,
    referenceNumber: typedWaybill.reference_number,
    customerAccount: typedWaybill.customer_account,
    createdAt: typedWaybill.created_at,
    updatedAt: typedWaybill.updated_at,
    shipper,
    consignee,
    packages: ((packages ?? []) as PackageRow[]).map(mapPackage),
    routeNodes: ((routeNodes ?? []) as RouteNodeRow[]).map(
      mapRouteNode,
    ),
    transportLegs: (
      (transportLegs ?? []) as TransportLegRow[]
    ).map(mapTransportLeg),
  }
}



