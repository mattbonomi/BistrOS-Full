import React, { useState } from 'react'
import ClientView from './pages/ClientView'
import ManagerView from './pages/ManagerView'
import TableView from './pages/TableView'

export default function App() {
  const [view, setView] = useState<'client' | 'manager' | 'table' | null>(null)

  if (!view) {
    return (
      <div style={{ padding: 20 }}>
        <h1>BistrOS</h1>

        <button onClick={() => setView('client')}>
          Vista Cliente
        </button>

        <button onClick={() => setView('manager')}>
          Vista Manager
        </button>

        <button onClick={() => setView('table')}>
          Vista Mesa
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setView(null)} style={{ marginBottom: 20 }}>
        ← Volver
      </button>

      {view === 'client' && <ClientView />}
      {view === 'manager' && <ManagerView />}
      {view === 'table' && <TableView />}
    </div>
  )
}
