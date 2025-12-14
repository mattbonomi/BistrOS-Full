import React from 'react'

export default function TableCard({ table }) {
  return (
    <div style={{
      padding: 12,
      borderRadius: 8,
      background: '#fff',
      marginBottom: 20,
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      <h3>Mesa {table.id}</h3>

      <p><strong>Estado:</strong> {table.status || 'sin estado'}</p>

      <p><strong>Carrito:</strong></p>
      <pre>{JSON.stringify(table.cart || [], null, 2)}</pre>

      {table.waiter_requested && <p>🛎️ Llamó al mozo</p>}
      {table.bill_requested && <p>💵 Pidió la cuenta</p>}
    </div>
  )
}
