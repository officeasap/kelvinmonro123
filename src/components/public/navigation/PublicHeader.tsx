import { PUBLIC_NAVIGATION, STL_ROUTES } from '../../../routes/routes'
import { navigateTo } from '../../../lib/navigation'

interface PublicHeaderProps {
  currentPath: string
}

function isActive(currentPath: string, path: string): boolean {
  if (path === '/') {
    return currentPath === '/'
  }
  return (
    currentPath === path ||
    currentPath.startsWith(`${path}/`)
  )
}

export function PublicHeader({ currentPath }: PublicHeaderProps) {
  return (
    <header className="public-header">
      <div className="public-header-primary">
        <button
          className="public-brand"
          type="button"
          onClick={() => navigateTo(STL_ROUTES.home)}
          aria-label="Secure Trace Logistics home"
        >
          <img
            src="/stl-logo.png"
            alt="Secure Trace Logistics"
            className="public-brand-logo"
            width="40"
            height="40"
            decoding="async"
          />
        </button>

        <nav
          className="public-nav"
          aria-label="Primary navigation"
        >
          {PUBLIC_NAVIGATION.map((item) => {
            const active = isActive(currentPath, item.path)
            return (
              <button
                key={item.path}
                className={`public-nav-item${
                  active ? ' public-nav-item-active' : ''
                }`}
                type="button"
                onClick={() => navigateTo(item.path)}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}