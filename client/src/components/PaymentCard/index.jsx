import { Box, Flex, VStack, Text, Circle, Icon } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { MdCheckCircleOutline as CheckIcon } from 'react-icons/md'
import { FaCreditCard } from 'react-icons/fa'
import { ReactComponent as MercadoPagoIcon } from '../../assets/logo/mercadoPago.svg'

export default function PaymentCard ({ id, paymentTypeId, cardNumber, expirationDate, provider, onclick }) {
  const cardNumberHidden = cardNumber && `****-****-****-${cardNumber.slice(-4)}`
  const selectedId = useSelector(state => state.orders.userPayment)
  const imSelected = selectedId === id

  return (
    <Flex alignItems='center' bg='white' borderRadius={3} mt={2} mb={2} onClick={onclick}>
      <Flex w='100%' alignItems='center'>
        <Box m={4}>
          {cardNumber &&
            <Circle size='40px' bg='secondary' color='white'>
              <FaCreditCard />
            </Circle>}
          {paymentTypeId === 3 && <Icon as={MercadoPagoIcon} w='10rem' h='2.5rem' />}
        </Box>
        <VStack pt={3} pb={3} alignItems='flex-start'>
          {paymentTypeId !== 3 ? <Text>{`${provider} ${cardNumberHidden}`}</Text> : <Text>{`${provider}`}</Text>}
        </VStack>
      </Flex>
      <Flex m={5} justifyContent='center'>
        {imSelected && <CheckIcon size={20} color='#3182ce' />}
      </Flex>
    </Flex>
  )
}
