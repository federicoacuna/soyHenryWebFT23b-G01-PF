import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserPayment } from '../../redux/actions'
import PaymentCard from '../PaymentCard'
import { Text, Flex } from '@chakra-ui/react'
import { getUserPayments } from '../../redux/actions/payments.actions'

export default function PaymentSelector ({ children }) {
  const userPayments = useSelector(state => state.payments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserPayments())
  }, [])//eslint-disable-line

  return (
    <Flex justifyContent='center' alignItems='center' h='80vh' w='100vw'>
      <Flex flexDirection='column' borderRadius={5} boxShadow='lg' bg='secondary' w='70vw' p={5}>
        <Text p={0} fontSize='2xl' fontWeight='500' mb={2}>Métodos de pago </Text>
        {userPayments && userPayments.map((payment) => (
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
        <Flex justifyContent='flex-end' mt={5}>
          {children}
        </Flex>
      </Flex>

    </Flex>
  )
}
