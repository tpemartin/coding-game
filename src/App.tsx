import { useState } from 'react'
import { Button, Container, Typography } from '@mui/material'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth="sm">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Typography variant="h4" component="h1" gutterBottom>
        Vite + React
      </Typography>
      <div className="card">
        <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </Button>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </div>
      <Typography variant="body2" className="read-the-docs">
        Click on the Vite and React logos to learn more
      </Typography>
    </Container>
  )
}

export default App
