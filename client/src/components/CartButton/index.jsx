import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from '../../redux/actions'
import s from './index.module.css'
import { Button, useToast } from '@chakra-ui/react'
import { BsFillCartPlusFill } from 'react-icons/bs'

const CartButton = ({ product }) => {
  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cartProducts)
  const exist = cartProducts.filter(p => parseInt(p.id) === parseInt(product.id))
  const toast = useToast()

  const handleClick = () => {
    dispatch(addProductToCart(product))
  }

  const toastAdd = () => {
    toast({
      title: 'Producto Agregado al Carrito.',
      status: 'success',
      duration: 2000,
      isClosable: true
    })
  }

  return (
    <div className={s.container}>
      <Button leftIcon={<BsFillCartPlusFill />} bg='#2C2C2E' _hover={{ bg: 'black' }} color='white' onClick={!isNaN(exist) ? handleClick : toastAdd}>Agregar al carrito</Button>
    </div>
  )
}

export default CartButton
