import { STL_ROUTES, type STLRoute } from '../routes/routes'

export function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (
    path === STL_ROUTES.track ||
    path.startsWith(`${STL_ROUTES.track}/`)
  ) {
    return path
  }

  const validRoutes = Object.values(STL_ROUTES)

  if (validRoutes.includes(path as STLRoute)) {
    return path
  }

  return STL_ROUTES.home
}

export function navigateTo(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
