import { useState } from 'react'
import { Box } from '@mui/material'
import { Header } from './components/common'
import VerbosReflexivosPage from './pages/VerbosReflexivosPage'

type PageId = 'verbos' | 'home'

const PAGES = [
  { id: 'home' as const, label: 'Home' },
  { id: 'verbos' as const, label: 'Verbos Reflexivos' },
]

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('verbos')

  const renderPage = () => {
    switch (currentPage) {
      case 'verbos':
        return <VerbosReflexivosPage />
      case 'home':
        return <Box sx={{ p: 4, textAlign: 'center' }}>Welcome to Coding Game</Box>
      default:
        return <VerbosReflexivosPage />
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page as PageId)}
        pages={PAGES}
      />
      <Box sx={{ flexGrow: 1 }}>
        {renderPage()}
      </Box>
    </Box>
  )
}

export default App
