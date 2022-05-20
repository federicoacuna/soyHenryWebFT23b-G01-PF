import React from 'react'

export default function CardOrder ({ id, total, date, orderItems }) {
  return (
    <div><p>{id}</p>
      <p>{total}</p>
      <p>{date}</p>
      {orderItems.length && orderItems.map(e => {
        return <p key={e.id}>{e.name}</p>
      })}
    </div>
  )
}