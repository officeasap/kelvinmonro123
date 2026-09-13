import { useEffect, useState } from 'react'
import { PublicLayout } from './layouts/PublicLayout'
import { Home } from './pages/public/Home'
import { Track } from './pages/public/Track'
import { Ship } from './pages/public/Ship'
import { Rates } from './pages/public/Rates'
import { Services } from './pages/public/Services'
import { About } from './pages/public/About'
import { Contact } from './pages/public/Contact'
import { Support } from './pages/public/Support'
import { Faq } from './pages/public/Faq'
import { PublicPlaceholder } from './pages/public/PublicPlaceholder'
import { normalizePath } from './lib/navigation'
import { STL_ROUTES } from './routes/routes'
import './App.css'

function App() {
  const [currentPath, setCurrentPath] = useState(() =>
    normalizePath(window.location.pathname),
  )

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(normalizePath(window.location.pathname))
    }

    window.addEventListener('popstate', handleNavigation)

    return () => {
      window.removeEventListener('popstate', handleNavigation)
    }
  }, [])

  function renderPage() {
    if (
      currentPath === STL_ROUTES.track ||
      currentPath.startsWith(`${STL_ROUTES.track}/`)
    ) {
      return <Track />
    }

    switch (currentPath) {
      case STL_ROUTES.ship:
        return <Ship />

      case STL_ROUTES.rates:
        return <Rates />

      case STL_ROUTES.services:
        return <Services />

      case STL_ROUTES.support:
        return <Support />

      case STL_ROUTES.faq:
        return <Faq />

      case STL_ROUTES.contact:
        return <Contact />

      case STL_ROUTES.about:
        return <About />

      case STL_ROUTES.locations:
        return (
          <PublicPlaceholder
            eyebrow="STL LOCATIONS"
            title="Locations"
            description="Find the places where STL parcel services connect with customers and shipment networks."
          />
        )

      case STL_ROUTES.help:
        return (
          <PublicPlaceholder
            eyebrow="STL SUPPORT"
            title="How can we help?"
            description="Shipment support, tracking assistance, and customer service will live here."
          />
        )

      case STL_ROUTES.signIn:
        return (
          <PublicPlaceholder
            eyebrow="CUSTOMER ACCOUNT"
            title="Sign in"
            description="Customer accounts will provide access to saved shipments and personalized shipment visibility."
          />
        )

      case STL_ROUTES.home:
      default:
        return <Home />
    }
  }

  return (
    <PublicLayout currentPath={currentPath}>
      {renderPage()}
    </PublicLayout>
  )
}

export default App