import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Button, Flex, Box, Select } from '@chakra-ui/react'
import { setUserAddresses } from '../../redux/actions/index'

const AddressSelector = () => {
  const userAddresses = useSelector(state => state.user.userAddresses)
  const [address, setAddress] = useState({
    value: ''
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setAddress({ value: e.target.value })
  }
  return (
    <Flex justifyContent='center' alignItems='center' h='80vh' w='100vw'>
      <Box borderRadius={5} boxShadow='lg' bg='#E5E5EA' w='70vw' p={5}>
        <Text fontSize='lg' fontWeight='bold'>Domicilio: </Text>
        <Select bg='white' mt={3} value={address.value} onChange={handleChange} placeholder='Selecciona un domicilio'>
          {userAddresses
            ? userAddresses.map((a, i) => (
              <option key={i} value={a.id}>{a.city}, {a.streetName}, {a.postalCode}</option>
            ))
            : 'Agrega un domicilio.'}
        </Select>

        <Button colorScheme='blue' onClick={() => dispatch(setUserAddresses(address.value))}>Continuar</Button>

      </Box>

    </Flex>
  )
}

export default AddressSelector
