# FAQ

## My env vars are not loading

Make sure you use `.env.local` and restart the dev server after changes.

## I get 404s on refresh

Your host needs an SPA fallback to `index.html`.

## GTM events are missing

Check `VITE_GTM_ID`, ad blockers, and confirm `RouteTracker` is mounted.
