import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserPayment } from '../../redux/actions'
import PaymentCard from '../PaymentCard'
import { getUserPayments } from '../../redux/actions/payments.actions'

export default function PaymentSelector ({ children }) {
  const userPayments = useSelector(state => state.payments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserPayments())
  }, [])//eslint-disable-line

  return (
    <>{userPayments && userPayments.map((payment) => (
      <PaymentCard
        key={payment.id}
        onclick={() => dispatch(setUserPayment(payment.id, payment.paymentTypeId))}
        paymentTypeId={payment.paymentTypeId}
        cardNumber={payment.cardNumber}
        expirationDate={payment.expirationDate}
        provider={payment.provider}
        id={payment.id}
      />
    ))}

    </>
  )
}
