import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Button, Flex, useToast, Heading } from '@chakra-ui/react'
import { setUserAddress } from '../../redux/actions/index'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import AddressCard from '../../components/AddressCard'

const AddressSelector = () => {
  const userAddresses = useSelector(state => state.user.userAddresses)
  const selectedAddress = useSelector(state => state.order.userAddressId)
  const cartProducts = useSelector(state => state.cartProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const user = useSelector(state => state.user)

  const handleClick = (value) => {
    value.target.name === 'AddAddress' && navigate('/')
    if (selectedAddress) {
      navigate('/payment')
    } else if (selectedAddress && value.target.name === 'continuar') {
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
      {user.id !== undefined && cartProducts.length !== 0
        ? <Flex justifyContent='center' alignItems='center' h='80vh' w='100vw'>
          <Flex flexDirection='column' borderRadius={5} boxShadow='lg' bg='secondary' w='70vw' p={5}>
            <Text p={0} fontSize='2xl' fontWeight='500' mb={2}>¿Donde quieres recibir tu compra? </Text>
            {userAddresses && userAddresses.map(address => <AddressCard
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
            <Flex justifyContent='flex-end' mt={5}>
              {userAddresses.length !== 0 && <Button name='continuar' mr={3} colorScheme='blue' onClick={handleClick}>Continuar</Button>}
              <Button name='AddAddress' onClick={handleClick} colorScheme='blue'>Agregar dirección</Button>
            </Flex>
          </Flex>
          {/*  eslint-disable-next-line */}
        </Flex>
        : <Flex justifyContent='center'><Heading>Error 404</Heading></Flex>}
    </>
  )
}

export default AddressSelector
