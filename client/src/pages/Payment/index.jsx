import React from 'react'
import PaymentSelector from '../../components/PaymentSelector'
import s from './index.module.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../../redux/actions/index'
import { useToast } from '@chakra-ui/react'

export default function Payment () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const paymentID = useSelector(state => state.order.userPaymentId)
  const toast = useToast()

  function handleClick () {
    if (paymentID) {
      dispatch(placeOrder())
      navigate('/confirmation')
    } else {
      toast({
        description: 'Debe seleccionar un metodo de pago.',
        status: 'error',
        duration: 2500,
        isClosable: true
      })
    }
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
