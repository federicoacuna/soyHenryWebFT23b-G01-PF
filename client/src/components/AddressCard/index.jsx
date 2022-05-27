import { Box, Flex, VStack, Text, Circle } from '@chakra-ui/react'
import { BsFillCheckCircleFill as CheckIcon } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function AddressCard ({ id, streetName, houseNumber, postalCode, city, state, country, onclick }) {
  const selectedAddress = useSelector(state => state.orders.order.address)
  const imSelected = selectedAddress ? selectedAddress.id === id : false
  return (
    <Flex boxShadow='md' w='100%' alignItems='center' bg='white' borderRadius={3} mt={2} mb={2} onClick={onclick}>
      <Flex w='100%' alignItems='center'>
        <Box m={4}>
          <Circle opacity='0.5' size='40px' bg='accent' color='white'><FaMapMarkerAlt size={20} /></Circle>
        </Box>
        <VStack pt={3} pb={3} alignItems='flex-start'>
          <Text>{`Calle ${streetName} # ${houseNumber}, ${postalCode}.`}</Text>
          <Text>{`${city}, ${state} - ${country}.`}</Text>
        </VStack>
      </Flex>
      <Flex m={5} justifyContent='center'>
        {imSelected && <CheckIcon size={20} color='#38A169' />}
      </Flex>
    </Flex>
  )
}
