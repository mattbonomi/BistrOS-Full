import React from 'react'

export default function OrderCard({ order }) {
  return (
    <div style={{
      padding: 12,
      borderRadius: 8,
      background: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      <h3>Orden #{order.id}</h3>
      <p><strong>Mesa:</strong> {order.table_id}</p>
      <p><strong>Estado:</strong> {order.state}</p>

      <h4>Items</h4>
      <ul>
        {order.items?.map((i, idx) => (
          <li key={idx}>{i.name} — ${i.price}</li>
        ))}
      </ul>

      <p><strong>Total:</strong> ${order.total}</p>
    </div>
  )
}
