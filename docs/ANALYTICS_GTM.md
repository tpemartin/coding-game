# Analytics (GTM)

## Setup

Set `VITE_GTM_ID` in `.env.local`.

## How it works

- `initGtm()` injects the GTM script once.
- `RouteTracker` sends `page_view` on route changes.

## Custom events

Push to `window.dataLayer` with your event payload.

Example:

```ts
window.dataLayer?.push({
  event: 'signup_complete',
  method: 'email',
})
```
