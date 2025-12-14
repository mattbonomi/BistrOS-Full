import React from 'react'

export default function MenuItem({ item }) {
  return (
    <div style={{
      padding: 10,
      marginBottom: 10,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
    }}>
      <strong>{item.name}</strong>
      <div>${item.price}</div>
    </div>
  )
}
