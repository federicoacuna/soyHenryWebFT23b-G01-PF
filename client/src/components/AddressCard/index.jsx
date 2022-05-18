import { Box } from '@chakra-ui/react'

export default function AddressCard ({ streetName, houseNumber, postalCode, city, state, country }) {
  return (
    <Box>
      <h2>{`${streetName} ${houseNumber}`}</h2>
      <p>{`Codigo Postal: ${postalCode}`}</p>
      <p>{`Ciudad: ${city}`}</p>
      <p>{`Provincia / Estado: ${state}`}</p>
      <p>{`Pais: ${country}`}</p>
    </Box>
  )
}
