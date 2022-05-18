import { Box, HStack, VStack } from '@chakra-ui/react'
import { MdCheckCircleOutline as CheckIcon } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function AddressCard ({ id, streetName, houseNumber, postalCode, city, state, country, onclick }) {
  const selectedId = useSelector(state => state.order.userAddressId)
  const imSelected = selectedId === id
  return (
    <Box onClick={onclick}>
      <HStack>
        <VStack>
          <h2>{`${streetName} ${houseNumber}`}</h2>
          <p>{`Codigo Postal: ${postalCode}`}</p>
          <p>{`Ciudad: ${city}`}</p>
          <p>{`Provincia / Estado: ${state}`}</p>
          <p>{`Pais: ${country}`}</p>
        </VStack>
        {imSelected && <CheckIcon />}
      </HStack>
    </Box>
  )
}
