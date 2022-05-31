import React, { useEffect } from 'react'
import CardOrder from '../CardOrder'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../../redux/actions/orders.actions'
import s from './index.module.css'

export default function MyShopping () {
  const dispatch = useDispatch()

  const token = useSelector(state => state.token)
  const orders = useSelector(state => state.orders.data)

  useEffect(() => {
    dispatch(getUserOrders(token))
  }, [])//eslint-disable-line

  return (
    <div className={s.container}>{orders.length > 0
      ? orders.map(p => (
        <CardOrder key={p.id} id={p.id} total={p.total} date={p.createdAt} orderItems={p.products} />
      ))
      : 'No has realizado ninguna compra.'}
    </div>
  )
}
