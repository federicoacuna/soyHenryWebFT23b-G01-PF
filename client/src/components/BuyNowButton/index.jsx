import { Box, Flex } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderItems } from '../../redux/actions/orders.actions'
import { addBuyNowItem } from '../../redux/actions/buyNow.actions'
import { useNavigate } from 'react-router-dom'

const BuyNowButton = ({ product, setState, state }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector(state => state.users.token)

  const handleClick = () => {
    const buyNowItem = { ...product, quantity: 1 }
    // buyNowItem.quantity = 1
    dispatch(addBuyNowItem([buyNowItem]))
    dispatch(setOrderItems([buyNowItem]))
    token ? navigate('/addresses') : setState(true)
  }

  return (
    <Flex>
      <Flex alignItems='center'>
        <Box onClick={handleClick} width='10rem' height='2.5rem' display='flex' justifyContent='center' alignItems='center' cursor='pointer' p='0.5rem' bg='#0082E3' color='white'>Comprar ahora</Box>
      </Flex>
    </Flex>

  )
}

export default BuyNowButton
