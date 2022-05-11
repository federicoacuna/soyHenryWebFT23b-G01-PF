import React from 'react'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../../redux/actions'
import s from './index.module.css'

const CartButton = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className={s.container}>
      <button onClick={() => dispatch(addProductToCart(product))}>AgregarAlCarrito</button>
    </div>
  )
}

export default CartButton
