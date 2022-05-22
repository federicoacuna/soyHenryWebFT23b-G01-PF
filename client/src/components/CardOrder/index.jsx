import React from 'react'
import s from './index.module.css'

export default function CardOrder ({ id, total, date, orderItems }) {
  return (
    <div className={s.container}>
      <div>
        <p>ID: {id}</p>
        <p>${total}</p>
        <p>{date}</p>
      </div>
      {orderItems.length && orderItems.map(e => {
        return <p key={e.id}>{e.name}</p>
      })}
    </div>
  )
}
