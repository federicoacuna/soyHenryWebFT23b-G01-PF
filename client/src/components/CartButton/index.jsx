import React from 'react'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../../redux/actions/cart.actions'
import { Box } from '@chakra-ui/react'
import { BsCart } from 'react-icons/bs'

const CartButton = ({ product }) => {
  const dispatch = useDispatch()
  const cartItem = {
    ...product,
    quantity: 1
  }
  const handleClick = () => {
    dispatch(addCartItem(cartItem))
  }

  return (
    <Box ml='1rem' onClick={handleClick} cursor='pointer'>
      <BsCart fontSize='1.7rem' />
    </Box>
  )
}

export default CartButton
