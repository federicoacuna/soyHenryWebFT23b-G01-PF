import { Box, HStack, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { MdCheckCircleOutline as CheckIcon } from 'react-icons/md'

export default function PaymentCard ({ id, paymentType, cardNumber, expirationDate, provider, onclick }) {
  const cardNumberHidden = `****-****-****-${cardNumber.slice(-4)}`
  const selectedId = useSelector(state => state.order.userPaymentId)
  const imSelected = selectedId === id

  return (
    <Box onClick={onclick}>
      <HStack>
        <VStack>
          <h2>{`${paymentType} ${provider}`}</h2>
          <p>{`Nro. de Tarjeta: ${cardNumberHidden}`}</p>
          <p>{`Fecha de vencimiento: ${expirationDate}`}</p>
        </VStack>
        {imSelected && <CheckIcon />}
      </HStack>
    </Box>
  )
}
