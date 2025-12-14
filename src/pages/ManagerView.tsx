import React, { useEffect, useState } from 'react'
import { getOrders, setOrderState, subscribeManager } from '../services/BistrOSService'
import OrderCard from '../components/OrderCard'
import Loader from '../components/Loader'

export default function ManagerView() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const data = await getOrders()
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    load()

    const channel = subscribeManager((payload) => {
      load()
    })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function advance(order: any) {
    const next =
      order.state === 'pending'
        ? 'preparing'
        : order.state === 'preparing'
        ? 'ready'
        : 'delivered'

    await setOrderState(order.id, next)
  }

  if (loading) return <Loader />

  return (
    <div>
      <h2>Manager</h2>

      {orders.map((o) => (
        <div key={o.id} style={{ marginBottom: 20 }}>
          <OrderCard order={o} />
          <button onClick={() => advance(o)}>Avanzar estado</button>
        </div>
      ))}
    </div>
  )
}
