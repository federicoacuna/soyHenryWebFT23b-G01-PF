import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, addRemoteCartItem } from '../../redux/actions/cart.actions'
import { Box } from '@chakra-ui/react'
import { BsCart } from 'react-icons/bs'

const CartButton = ({ product }) => {
  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  const cartItem = {
    ...product,
    quantity: 1
  }
  const handleClick = () => {
    if (user && user.id) {
      dispatch(addRemoteCartItem(product.id))
    } else {
      dispatch(addCartItem(cartItem))
    }
  }

  return (
    <Box ml='1rem' onClick={handleClick} cursor='pointer'>
      <BsCart fontSize='1.7rem' />
    </Box>
  )
}

export default CartButton
