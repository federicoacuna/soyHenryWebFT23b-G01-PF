import React from 'react'
import { removeCartItem } from '../../redux/actions'
// import s from './index.module.css'
import { useDispatch } from 'react-redux'
// import { AiFillDelete } from 'react-icons/ai'
import { Text } from '@chakra-ui/react' //eslint-disable-line

export default function CartItemRemove ({ product }) {
  const dispatch = useDispatch()

  return (
    <Text cursor='pointer' onClick={() => dispatch(removeCartItem(product))}>Eliminar</Text>
  )
}
