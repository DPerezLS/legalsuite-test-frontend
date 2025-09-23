import React from 'react'
import { DemandProvider } from './contexts/DemandContext'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <DemandProvider>
      <Dashboard />
    </DemandProvider>
  )
}

export default App