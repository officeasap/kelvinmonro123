export const STL_ROUTES = {
  home: '/',
  ship: '/ship',
  track: '/track',
  rates: '/rates',
  services: '/services',
  support: '/support',
  faq: '/faq',
  contact: '/contact',

  // Preserved routes — not in the public navigation
  about: '/about',
  locations: '/locations',
  help: '/help',
  signIn: '/sign-in',

  // Operations console (existing, unaffected)
  operations: '/operations',
  operationsShipments: '/operations/shipments',
  operationsTracking: '/operations/tracking',
  operationsRoutes: '/operations/routes',
  operationsAlerts: '/operations/alerts',
  operationsSettings: '/operations/settings',
} as const

export type STLRoute = (typeof STL_ROUTES)[keyof typeof STL_ROUTES]

export interface NavigationItem {
  label: string
  path: STLRoute
  description: string
}

/**
 * PUBLIC NAVIGATION — the ONLY public navigation system.
 * Eight items. HOME first. Order is authoritative.
 * Secondary navigation is architecturally retired.
 */
export const PUBLIC_NAVIGATION: NavigationItem[] = [
  {
    label: 'HOME',
    path: STL_ROUTES.home,
    description: 'Secure Trace Logistics home',
  },
  {
    label: 'SHIP',
    path: STL_ROUTES.ship,
    description: 'Create a shipment',
  },
  {
    label: 'TRACK',
    path: STL_ROUTES.track,
    description: 'Track a shipment',
  },
  {
    label: 'RATES',
    path: STL_ROUTES.rates,
    description: 'Rates and transit times',
  },
  {
    label: 'SERVICES',
    path: STL_ROUTES.services,
    description: 'Parcel services',
  },
  {
    label: 'SUPPORT',
    path: STL_ROUTES.support,
    description: 'Customer support',
  },
  {
    label: 'FAQ',
    path: STL_ROUTES.faq,
    description: 'Frequently asked questions',
  },
  {
    label: 'CONTACT',
    path: STL_ROUTES.contact,
    description: 'Contact Secure Trace Logistics',
  },
]