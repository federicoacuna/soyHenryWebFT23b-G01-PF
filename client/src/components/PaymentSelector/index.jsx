import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserPayment } from '../../redux/actions'
import PaymentCard from '../PaymentCard'

export default function PaymentSelector () {
  const userPayments = useSelector(state => state.user.userPayments)
  const dispatch = useDispatch()

  return (
    <div>{userPayments &&
      userPayments.map((payment) => (
        <PaymentCard
          key={payment.id}
          onclick={() => dispatch(setUserPayment(payment.id))}
          paymentType={payment.paymentType}
          cardNumber={payment.cardNumber}
          expirationDate={payment.expirationDate}
          provider={payment.provider}
          id={payment.id}
        />
      ))}
    </div>
  )
}
