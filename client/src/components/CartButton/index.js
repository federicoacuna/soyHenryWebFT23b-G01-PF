import React from 'react'
import s from './index.module.css'

const CartButton = ({ id }) => {
  function addToCart () {
    // placeholder function until cart functionality is added
  }

  return (
    <div className={s.container}>
      <button onClick={() => addToCart(id)}>AddToCarrito</button>
    </div>
  )
}

export default CartButton
