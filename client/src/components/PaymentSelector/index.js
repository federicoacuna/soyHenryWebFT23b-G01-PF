import React from 'react'
import s from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setUserPayments } from '../../redux/actions'

export default function PaymentSelector () {
  const paymentSelector = useSelector(state => state.user.payments)
  const dispatch = useDispatch()

  return (
    <div>{paymentSelector
      ? paymentSelector.map((p, i) => (
        <div key={i} className={s.container}>
          <p>{p.provider}</p>
          <p>{p.cardNumber}</p>
          <button onClick={dispatch(setUserPayments(p.id))}>Seleccionar</button>
        </div>
      ))
      : <p>No hay metodos de pagos</p>}
    </div>
  )
}
