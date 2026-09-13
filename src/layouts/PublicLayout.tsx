
import type { ReactNode } from 'react'
import { PublicHeader } from '../components/public/navigation/PublicHeader'

interface PublicLayoutProps {
  children: ReactNode
  currentPath: string
}

export function PublicLayout({
  children,
  currentPath,
}: PublicLayoutProps) {
  return (
    <div className="public-shell">
      <PublicHeader currentPath={currentPath} />

      <main className="public-main">
        <div className="public-main-inner">
          {children}
        </div>
      </main>

      <footer className="public-footer">
        <img
          src="/stl-logo-footer.png"
          alt="SecureTraceLogistics"
          className="public-footer-logo"
          decoding="async"
        />

        <span className="public-footer-line">
          Copyright © 2021 STL All rights reserved.
          SecureTraceLogistics
        </span>
      </footer>
    </div>
  )
}

