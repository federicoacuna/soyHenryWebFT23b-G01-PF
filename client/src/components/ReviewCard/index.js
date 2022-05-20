import React from 'react'
import s from './index.module.css'

export default function ReviewCard ({ rating, review, productId, productName, productImage }) {
  console.log(rating, review, productId, productName, productImage)
  return (
    <div className={s.container}>
      <div>
        <p>{productName}</p>
        <p>{productImage}</p>
      </div>
      <div>
        <p>{review}</p>
        <p>{rating}</p>
      </div>
      <p>ID:{productId}</p>

    </div>
  )
}
