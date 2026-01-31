# React MUI Router GTM Template

Minimal Vite + React + TypeScript template with MUI, React Router, and Google Tag Manager.

## Quick start

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env.local` and set your values.

Required:
- `VITE_GTM_ID` (example: `GTM-XXXXXXX`)

## Project structure

```
src/
  App.tsx
  main.tsx
  RouteTracker.tsx
  gtm.ts
  theme.ts
  analytics/
  assets/
```

## Routing

Routes live in `src/App.tsx`. The `RouteTracker` component hooks into React Router and fires page_view events.

Details: `docs/ROUTING.md`

## MUI theme

Theme config is in `src/theme.ts`. Update palette, typography, and component overrides there.

Details: `docs/MUI_THEME.md`

## Analytics (GTM)

GTM bootstrap lives in `src/gtm.ts`. Route changes trigger a `page_view` event.

Details: `docs/ANALYTICS_GTM.md`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Docs

- `docs/SETUP.md`
- `docs/ARCHITECTURE.md`
- `docs/ROUTING.md`
- `docs/MUI_THEME.md`
- `docs/ANALYTICS_GTM.md`
- `docs/DEPLOYMENT.md`
- `docs/FAQ.md`

## License

MIT. See `LICENSE`.
