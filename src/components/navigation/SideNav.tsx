import { STL_ROUTES, type STLRoute } from '../../routes/routes'
import { navigateTo } from '../../lib/navigation'

interface SideNavProps {
  currentPath: string
}

interface OperationsNavigationItem {
  label: string
  path: STLRoute
  description: string
}

const OPERATIONS_NAVIGATION: OperationsNavigationItem[] = [
  {
    label: 'Operations',
    path: STL_ROUTES.operations,
    description: 'Operational overview',
  },
  {
    label: 'Shipments',
    path: STL_ROUTES.operationsShipments,
    description: 'Shipment register',
  },
  {
    label: 'Tracking',
    path: STL_ROUTES.operationsTracking,
    description: 'Movement visibility',
  },
  {
    label: 'Routes',
    path: STL_ROUTES.operationsRoutes,
    description: 'Route intelligence',
  },
  {
    label: 'Alerts',
    path: STL_ROUTES.operationsAlerts,
    description: 'Operational exceptions',
  },
  {
    label: 'Settings',
    path: STL_ROUTES.operationsSettings,
    description: 'System configuration',
  },
]

export function SideNav({ currentPath }: SideNavProps) {
  return (
    <aside className="side-nav">
      <div className="side-nav-heading">
        <span className="nav-kicker">STL SYSTEM</span>
        <strong>Operations</strong>
      </div>

      <nav aria-label="Operations navigation">
        {OPERATIONS_NAVIGATION.map((item) => {
          const active =
            item.path === STL_ROUTES.operations
              ? currentPath === STL_ROUTES.operations
              : currentPath.startsWith(item.path)

          return (
            <button
              className={`nav-item${active ? ' nav-item-active' : ''}`}
              key={item.path}
              type="button"
              onClick={() => navigateTo(item.path)}
            >
              <span className="nav-item-label">{item.label}</span>
              <span className="nav-item-description">
                {item.description}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="side-nav-footer">
        <span className="state-dot" />

        <div>
          <strong>System Ready</strong>
          <span>Cathedral Core</span>
        </div>
      </div>
    </aside>
  )
}
