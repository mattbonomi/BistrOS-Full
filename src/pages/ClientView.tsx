import React, { useEffect, useState } from 'react'
import { scanQR, updateCart, placeOrder, subscribeToTable } from '../services/BistrOSService'
import TableCard from '../components/TableCard'
import MenuItem from '../components/MenuItem'
import Loader from '../components/Loader'

export default function ClientView() {
  const [tableId, setTableId] = useState<string | null>(null)
  const [table, setTable] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function handleScan() {
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

  async function addToCart(item: any) {
    if (!tableId) return
    const newCart = [...(table.cart || []), item]
    await updateCart(tableId, newCart)
  }

  async function sendOrder() {
    if (!tableId || !table?.cart?.length) return

    await placeOrder({
      table_id: tableId,
      items: table.cart,
      state: 'pending',
      total: table.cart.reduce((acc: number, i: any) => acc + i.price, 0)
    })

    await updateCart(tableId, [])
    alert('Pedido enviado')
  }

  if (loading) return <Loader />

  if (!tableId) {
    return (
      <div>
        <h2>Cliente</h2>
        <button onClick={handleScan}>Escanear QR</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Mesa {tableId}</h2>

      <TableCard table={table} />

      <h3>Menú</h3>
      <MenuItem item={{ name: 'Pizza', price: 3000 }} />
      <button onClick={() => addToCart({ name: 'Pizza', price: 3000 })}>Agregar Pizza</button>

      <MenuItem item={{ name: 'Pasta', price: 2500 }} />
      <button onClick={() => addToCart({ name: 'Pasta', price: 2500 })}>Agregar Pasta</button>

      <h3>Carrito</h3>
      <pre>{JSON.stringify(table?.cart || [], null, 2)}</pre>

      <button onClick={sendOrder}>Enviar pedido</button>
    </div>
  )
}    const newCart = [...(table.cart || []), item]
    await updateCart(tableId, newCart)
  }

  async function sendOrder() {
    if (!tableId || !table?.cart?.length) return

    await placeOrder({
      table_id: tableId,
      items: table.cart,
      state: 'pending',
      total: table.cart.reduce((acc: number, i: any) => acc + i.price, 0)
    })

    await updateCart(tableId, [])
    alert('Pedido enviado')
  }

  if (loading) return <Loader />

  if (!tableId) {
    return (
      <div>
        <h2>Cliente</h2>
        <button onClick={handleScan}>Escanear QR</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Mesa {tableId}</h2>

      <TableCard table={table} />

      <h3>Menú</h3>
      <MenuItem item={{ name: 'Pizza', price: 3000 }} />
      <button onClick={() => addToCart({ name: 'Pizza', price: 3000 })}>
        Agregar Pizza
      </button>

      <MenuItem item={{ name: 'Pasta', price: 2500 }} />
      <button onClick={() => addToCart({ name: 'Pasta', price: 2500 })}>
        Agregar Pasta
      </button>

      <h3>Carrito</h3>
      <pre>{JSON.stringify(table?.cart || [], null, 2)}</pre>

      <button onClick={sendOrder}>Enviar pedido</button>
    </div>
  )
}
