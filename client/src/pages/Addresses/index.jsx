import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Button, Flex, useToast, Heading } from '@chakra-ui/react'
import { setUserAddress } from '../../redux/actions/index'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getUserAddresses } from '../../redux/actions/addresses.actions'
import AddressCard from '../../components/AddressCard'

const AddressSelector = () => {
  const userAddresses = useSelector(state => state.addresses)
  const orderStatus = useSelector(state => state.order)
  const selectedAddress = useSelector(state => state.order.userAddressId)
  const cartProducts = useSelector(state => state.cartProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const user = useSelector(state => state.user)

  useEffect(() => {
    orderStatus.orderItems || navigate('/')
    orderStatus.orderItems && dispatch(getUserAddresses())
  }, [])//eslint-disable-line

  const handleClick = (value) => {
    if (value.target.name === 'AddAddress') {
      navigate('/createaddress')
    }
    if (value.target.name === 'continuar' && selectedAddress) {
      navigate('/payment')
    }
    if (value.target.name === 'continuar' && !selectedAddress) {
      toast({
        title: 'No podemos continuar',
        description: 'Debe seleccionar una direccion para su envio.',
        status: 'error',
        duration: 3500,
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
            {Array.isArray(userAddresses) && userAddresses.map(address => <AddressCard
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
              <Button name='AddAddress' onClick={handleClick} colorScheme='blue'>Agregar dirección</Button>
              <Button name='continuar' mr={3} colorScheme='blue' onClick={handleClick}>Continuar</Button>
            </Flex>
          </Flex>
          {/*  eslint-disable-next-line */}
        </Flex>
        : <Flex justifyContent='center'><Heading>Error 404</Heading></Flex>}
    </>
  )
}

export default AddressSelector
