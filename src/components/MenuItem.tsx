import React from 'react'

export default function MenuItem({ item }) {
  return <div>{item.name} - ${item.price}</div>
}
