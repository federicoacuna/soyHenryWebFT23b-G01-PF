import { addProductToCart, removeProductFromCart } from '../../redux/actions'
import { useDispatch } from 'react-redux'
// import s from './index.module.css'
import { Flex, Box, Text } from '@chakra-ui/react' //eslint-disable-line
import { HiPlusSm, HiMinus } from 'react-icons/hi'

export default function CartItemQuantity ({ product }) {
  const dispatch = useDispatch()

  return (
    <Flex justifyContent='center' w='7.5rem' h='2.7rem' mr='5.4rem' border='1px' borderColor='secondary' borderRadius='5px'>
      <Flex color='accent' justifyContent='space-between' alignItems='center' w='5.5rem'>
        <button onClick={() => dispatch(removeProductFromCart(product))}><HiMinus size={25} /></button>
        <Text color='primary'>{product.quantity}</Text>
        <button onClick={() => dispatch(addProductToCart(product))}><HiPlusSm size={25} /></button>
      </Flex>

    </Flex>
  )
}
