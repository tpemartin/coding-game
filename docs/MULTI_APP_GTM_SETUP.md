# Multi-App GTM and GA4 Setup Guide

This project is configured to work as part of a multi-app ecosystem where all apps share the same Google Tag Manager container and Google Analytics 4 property, but are deployed to different subpaths under `https://tpemartin.github.io`.

## Configuration

### 1. Environment Variables

Each app repo specifies its own base path in `.env.production`:

```
VITE_BASE_PATH=/coding-game/
```

For a new app, update this value to your app's subpath (e.g., `/my-new-app/`).

The GTM ID is shared across all apps and should be set as `VITE_GTM_ID` in your CI/CD environment or `.env` file.

### 2. Base Path Setup

- **[vite.config.ts](vite.config.ts)**: Uses `VITE_BASE_PATH` from environment to set Vite base directory
- **[src/main.tsx](src/main.tsx)**: Uses the same variable for React Router's `BrowserRouter` basename
- Both must match for proper routing and asset loading

### 3. App Name Extraction

The [src/gtm.ts](src/gtm.ts) file automatically extracts the app name from the base path:

- Base path `/coding-game/` → app name `coding-game`
- Base path `/my-app/` → app name `my-app`
- Default fallback → app name `root`

The app name is pushed to the GTM data layer in two places:
1. **Initialization**: When GTM is first loaded, `app_name` is added to the data layer
2. **Page Views**: Every page view event includes `app_name` for proper segmentation

## Google Analytics 4 Setup

### Create Shared GA4 Property

1. Go to [Google Analytics 4](https://analytics.google.com)
2. Create a new property for domain `tpemartin.github.io`
3. Note the Measurement ID (e.g., `G-XXXXXXXXXX`)
4. Create a custom dimension:
   - **Dimension Name**: `app_name`
   - **Scope**: Event
   - **Description**: "Name of the app that generated the event"

### Google Tag Manager Configuration

1. Create or use an existing GTM container
2. Note the Container ID (e.g., `GTM-XXXXXX`)
3. Set up the following tags:

#### GA4 Configuration Tag
- **Type**: Google Analytics: GA4 Configuration
- **Measurement ID**: Your GA4 Measurement ID
- **Triggering**: All Pages

#### GA4 Page View Tag
- **Type**: Google Analytics: GA4 Event
- **Configuration Tag**: Select the GA4 Configuration Tag above
- **Event Name**: `page_view`
- **Event Parameters**:
  - `page_title`: Variable → Page Title
  - `page_location`: Variable → Page Location
  - `app_name`: Data Layer Variable → `app_name`
- **Triggering**: All Pages (or custom trigger for page views)

#### GA4 Custom Events (Optional)
For any custom events pushed to the data layer, create a GA4 Event tag that includes `app_name`:
- **Type**: Google Analytics: GA4 Event
- **Configuration Tag**: Select the GA4 Configuration Tag above
- **Event Name**: `{{Event}}` (event variable from data layer)
- **Event Parameters**:
  - `app_name`: Data Layer Variable → `app_name`
- **Triggering**: Custom Event trigger matching your event names

### Data Layer Variables in GTM

Add a Data Layer Variable:
- **Variable Name**: `app_name`
- **Data Layer Variable Name**: `app_name`
- **Data Layer Version**: Version 2

This allows all tags to reference `{{app_name}}` when you need the app name.

## Tracking Custom Events

To push custom events with app context, use:

```typescript
import { trackPageView } from './gtm'

// Push a custom event to GTM
window.dataLayer?.push({
  event: 'user_interaction',
  interaction_type: 'button_click',
  // app_name is automatically included if initialized
})
```

Custom events can now be reported in GA4 and filtered by `app_name` dimension.

## Deployment to Multiple Subpaths

For each new app:

1. Clone or create a new repo (or branch) with this codebase
2. Update `.env.production` with the new base path:
   ```
   VITE_BASE_PATH=/my-new-app/
   ```
3. Ensure `VITE_GTM_ID` environment variable is set (shared across all apps)
4. Deploy to GitHub Pages at the corresponding subpath
5. Events will automatically be tagged with the correct `app_name` in GA4

## Verification

After deployment, you can verify the setup is working:

1. Open the app at its GitHub Pages URL (e.g., `https://tpemartin.github.io/coding-game/`)
2. Open Developer Tools → Network tab
3. Look for requests to `www.googletagmanager.com`
4. In GA4, create a real-time report filtered by `app_name` dimension
5. Events should appear with the correct app name within seconds

## Troubleshooting

- **Events not showing in GA4**: Verify GTM container is published and `VITE_GTM_ID` is correct
- **Wrong app name**: Check `.env.production` has correct `VITE_BASE_PATH`
- **Router not working**: Ensure both `vite.config.ts` and `main.tsx` use the same base path value
- **Custom dimension missing**: Create the `app_name` custom dimension in GA4 property settings
