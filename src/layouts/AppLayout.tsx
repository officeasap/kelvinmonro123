import type { ReactNode } from 'react'
import { SideNav } from '../components/navigation/SideNav'
import { TopBar } from '../components/navigation/TopBar'

interface AppLayoutProps {
  children: ReactNode
  currentPath: string
}

export function AppLayout({ children, currentPath }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <TopBar />

      <div className="app-body">
        <SideNav currentPath={currentPath} />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
