import { useState } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import ModalLogin from '../ModalLogin'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderItems } from '../../redux/actions/orders.actions'
import { addBuyNowItem } from '../../redux/actions/buyNow.actions'
import { useNavigate } from 'react-router-dom'

const BuyNowButton = ({ product }) => {
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector(state => state.users.token)

  const handleClick = () => {
    const buyNowItem = { ...product, quantity: 1 }
    // buyNowItem.quantity = 1
    dispatch(addBuyNowItem([buyNowItem]))
    dispatch(setOrderItems([buyNowItem]))
    token ? navigate('/addresses') : setModal(true)
  }

  return (
    <Flex>
      <Flex alignItems='center'>
        <Box onClick={handleClick} width='10rem' height='2.5rem' display='flex' justifyContent='center' alignItems='center' cursor='pointer' p='0.5rem' bg='#0082E3' color='white'>Comprar ahora</Box>
      </Flex>
      <ModalLogin state={modal} setState={setModal}>
        <Heading color='black' textAlign='center'>No has iniciado sesión</Heading>
        <Text color='black' mt={2} textAlign='center'>Para seguir con tu compra debes registrarte o iniciar sesión.</Text>
      </ModalLogin>
    </Flex>

  )
}

export default BuyNowButton
