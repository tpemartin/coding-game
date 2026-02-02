import { Box } from '@mui/material'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Header } from './components/common'
import VerbosReflexivosPage from './pages/VerbosReflexivosPage'

type PageId = 'home' | 'verbos'

const PAGES = [
  { id: 'home' as const, label: 'Home', path: '/' },
  { id: 'verbos' as const, label: 'Verbos Reflexivos', path: '/verbos-reflexivos' },
]

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const currentPage = (PAGES.find((page) => page.path === location.pathname)?.id ?? 'home') as PageId

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        currentPage={currentPage}
        onPageChange={(path) => navigate(path)}
        pages={PAGES}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/"
            element={<Box sx={{ p: 4, textAlign: 'center' }}>Welcome to Coding Game</Box>}
          />
          <Route path="/verbos-reflexivos" element={<VerbosReflexivosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
