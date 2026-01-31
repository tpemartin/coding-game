import { registerSW } from 'virtual:pwa-register'

let swRegistration: ServiceWorkerRegistration | undefined

export const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) return

  registerSW({
    immediate: true,
    onRegistered(registration) {
      swRegistration = registration
    },
    onRegisterError(error) {
      console.error('Service worker registration failed', error)
    },
  })
}

export const getServiceWorkerRegistration = () => swRegistration

// TODO: Use getServiceWorkerRegistration()?.sync and .pushManager when enabling background sync and push.
