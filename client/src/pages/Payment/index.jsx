import React from 'react'
import PaymentSelector from '../../components/PaymentSelector'
import s from './index.module.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../../redux/actions/index'

export default function Payment () {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.id)
  const userAddressId = useSelector(state => state.userAddressId)
  const userPaymentId = useSelector(state => state.userPaymentId)
  const orderItems = useSelector(state => state.cartProducts)

  function handleClick (e) {
    e.preventDefault()
    dispatch(placeOrder({
      userId,
      userAddressId,
      userPaymentId,
      orderItems
    }))

    alert('Su compra ha sido exitosa')
  }

  return (
    <div className={s.containerAll}>
      <Link to='/addresses' className={s.arrow}><IoMdArrowRoundBack size={30} _hover={{ bg: 'black' }} /></Link>
      <div className={s.container}>
        <PaymentSelector />
        <button onClick={handleClick} className={s.btnCheckout}>Comprar</button>
      </div>

    </div>
  )
}
