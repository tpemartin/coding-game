# Routing

## Where routes live

Define routes in `src/App.tsx` using `react-router-dom`.

## Basename

`BrowserRouter` is configured with `basename="/coding-game/"` in `src/main.tsx` to support subpath hosting (e.g. GitHub Pages).

Update it if your deploy path changes.

## Page view tracking

`src/RouteTracker.tsx` listens to location changes and calls `trackPageView()`.
