import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './gtm'

let lastTrackedPath: string | null = null

export function RouteTracker() {
  const location = useLocation()

  useEffect(() => {
    if (lastTrackedPath === location.pathname) return
    lastTrackedPath = location.pathname
    trackPageView()
  }, [location.pathname])

  return null
}
