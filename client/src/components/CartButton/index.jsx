import React from 'react'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../../redux/actions'
import s from './index.module.css'
import { Button } from '@chakra-ui/react'
import { BsFillCartPlusFill } from 'react-icons/bs'

const CartButton = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className={s.container}>
      <Button leftIcon={<BsFillCartPlusFill />} bg='#2C2C2E' _hover={{ bg: 'black' }} color='white' onClick={() => dispatch(addProductToCart(product))}>Agregar al carrito</Button>
    </div>
  )
}

export default CartButton
