import React, { useState } from 'react'
import { scanQR, updateCart, subscribeToTable } from '../services/BistrOSService'
import TableCard from '../components/TableCard'
import Loader from '../components/Loader'

export default function TableView() {
  const [tableId, setTableId] = useState<string | null>(null)
  const [table, setTable] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function loadTable() {
    const id = prompt('Ingresá el ID de la mesa')
    if (!id) return

    setLoading(true)
    const t = await scanQR(id)
    setLoading(false)

    if (!t) return alert('Mesa no encontrada')

    setTableId(id)
    setTable(t)

    subscribeToTable(id, (payload) => setTable(payload.new))
  }

  async function clearCart() {
    if (!tableId) return
    await updateCart(tableId, [])
  }

  if (loading) return <Loader />

  if (!tableId) {
    return (
      <div>
        <h2>Vista de Mesa</h2>
        <button onClick={loadTable}>Cargar mesa</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Mesa {tableId}</h2>

      <TableCard table={table} />

      <h3>Carrito actual</h3>
      <pre>{JSON.stringify(table?.cart || [], null, 2)}</pre>

      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  )
}  if (loading) return <Loader />

  if (!tableId) {
    return (
      <div>
        <h2>Vista de Mesa</h2>
        <button onClick={loadTable}>Cargar mesa</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Mesa {tableId}</h2>

      <TableCard table={table} />

      <h3>Carrito actual</h3>
      <pre>{JSON.stringify(table?.cart || [], null, 2)}</pre>

      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  )
}
