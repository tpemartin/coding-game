import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { RouteTracker } from './RouteTracker'
import theme from './theme'
import { initGtm } from './gtm'
import { registerServiceWorker } from './pwa'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/usrsoc-3/">
        <RouteTracker />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

initGtm()
registerServiceWorker()
