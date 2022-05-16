import React from 'react'
import PaymentSelector from '../../components/PaymentSelector'
import s from './index.module.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { placeOrder } from '../../redux/actions/index'

export default function Payment () {
  const dispatch = useDispatch()

  function handleClick () {
    dispatch(placeOrder())
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
