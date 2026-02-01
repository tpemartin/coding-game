type DataLayerEvent = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[]
  }
}

const gtmId = import.meta.env.VITE_GTM_ID
let gtmInitialized = false

/**
 * Extract app name from the current base path.
 * Examples: '/coding-game/' -> 'coding-game', '/my-app/' -> 'my-app'
 */
const getAppName = (): string => {
  const basePath = import.meta.env.VITE_BASE_PATH || '/coding-game/'
  const appName = basePath.split('/').filter(Boolean)[0] || 'root'
  return appName
}

const ensureDataLayer = () => {
  if (!window.dataLayer) {
    window.dataLayer = []
  }
}

const hasGtmScript = () =>
  Boolean(document.querySelector(`script[src*="gtm.js?id=${gtmId}"]`))

const injectGtmScript = () => {
  if (!gtmId || hasGtmScript()) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(script)
}

export const initGtm = (): void => {
  if (gtmInitialized || typeof window === 'undefined') return
  gtmInitialized = true

  ensureDataLayer()
  injectGtmScript()

  // Push app identification to data layer for GTM/GA4 custom dimension
  window.dataLayer?.push({
    app_name: getAppName(),
  })
}

export function trackPageView(): void {
  if (typeof window === 'undefined') return

  ensureDataLayer()
  // Router owns SPA pageviews; keep this a single GA4-native event per path change.
  window.dataLayer?.push({
    event: 'page_view',
    page_location: window.location.href,
    page_title: document.title,
    app_name: getAppName(),
  })
}
