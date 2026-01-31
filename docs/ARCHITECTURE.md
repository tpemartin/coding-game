# Architecture

## Entry

- `src/main.tsx` wires providers (MUI, Router) and initializes GTM + PWA.

## Routing

- Routes are defined in `src/App.tsx`.
- `src/RouteTracker.tsx` hooks into the router and fires page views.

## Analytics

- `src/gtm.ts` loads the GTM script and pushes `page_view` to `dataLayer`.

## Theme

- `src/theme.ts` holds the MUI theme and defaults.

## PWA

- `src/pwa.ts` registers the service worker.
- PWA config lives in `vite.config.ts`.
