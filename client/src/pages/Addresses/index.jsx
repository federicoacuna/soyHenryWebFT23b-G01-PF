import { useDispatch, useSelector } from 'react-redux'
import { Text, Button, Flex, Box, useToast } from '@chakra-ui/react'
import { setUserAddress } from '../../redux/actions/index'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import AddressCard from '../../components/AddressCard'

const AddressSelector = () => {
  const userAddresses = useSelector(state => state.user.userAddresses)
  const selectedAddress = useSelector(state => state.order.userAddressId)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const handleClick = (value) => {
    if (selectedAddress) {
      navigate('/payment')
    } else {
      toast({
        description: 'Debe seleccionar una direccion para su envio.',
        status: 'error',
        duration: 2500,
        isClosable: true
      })
    }
  }

  return (
    <><Link to='/cart'><IoMdArrowRoundBack size={30} _hover={{ bg: 'black' }} /></Link>
      <Flex justifyContent='center' alignItems='center' h='80vh' w='100vw'>
        <Box borderRadius={5} boxShadow='lg' bg='#E5E5EA' w='70vw' p={5}>
          <Text fontSize='lg' fontWeight='bold'>Seleccion donde se enviara: </Text>
          {userAddresses?.map(address => <AddressCard
            key={address.id}
            id={address.id}
            postalCode={address.postalCode}
            streetName={address.streetName}
            houseNumber={address.houseNumber}
            city={address.city}
            state={address.state}
            country={address.country}
            onclick={() => dispatch(setUserAddress(address.id))}
                                         />)}
          <Button colorScheme='blue' onClick={handleClick}>Continuar</Button>

        </Box>

      </Flex>
    </>
  )
}

export default AddressSelector
