import React from 'react'
import ClientView from './pages/ClientView'
import ManagerView from './pages/ManagerView'

export default function App() {
  return (
    <div>
      <h1>BistrOS</h1>
      <ClientView />
      <ManagerView />
    </div>
  )
}
