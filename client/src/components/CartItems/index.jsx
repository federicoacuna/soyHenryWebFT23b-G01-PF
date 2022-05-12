import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../CartItem'
import s from './index.module.css'

export const CartItems = () => {
  const cartProducts = useSelector(state => state.cartProducts)

  if (cartProducts.length === 0) return <div>No hay productos en el carrito</div>

  return (
    <div className={s.container}>
      {cartProducts.map((p) => (
        <CartItem key={p.id + p.name} product={p} />))}
    </div>
  )
}

export default CartItems
