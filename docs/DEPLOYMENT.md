# Deployment

## Static hosting

This app is a static SPA. Your host must rewrite unknown routes to `index.html`.

## Base path

`vite.config.ts` sets `base = '/coding-game/'` and the router uses the same basename.

If you deploy to a different subpath, update both:
- `vite.config.ts`
- `src/main.tsx`

## GitHub Pages

Use a repo name that matches the `base` value or update `base` to match your repo.
