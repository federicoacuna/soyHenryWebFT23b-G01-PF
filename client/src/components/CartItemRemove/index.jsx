import React from 'react'
import { removeCartItem } from '../../redux/actions'
import s from './index.module.css'
import { useDispatch } from 'react-redux'

export default function CartItemRemove ({ product }) {
  const dispatch = useDispatch()

  return (
    <div className={s.container}>
      <button onClick={() => dispatch(removeCartItem(product))}>eliminar</button>
    </div>
  )
}
