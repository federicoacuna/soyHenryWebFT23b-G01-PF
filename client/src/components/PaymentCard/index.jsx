import { Box } from '@chakra-ui/react'

export default function PaymentCard ({ paymentType, cardNumber, expirationDate, provider }) {
  const cardNumberHidden = `****-****-****-${cardNumber.slice(-4)}`

  return (
    <Box>
      <h2>{`${paymentType} ${provider}`}</h2>
      <p>{`Nro. de Tarjeta: ${cardNumberHidden}`}</p>
      <p>{`Fecha de vencimiento: ${expirationDate}`}</p>
    </Box>
  )
}
