import React from 'react'
import s from './index.module.css'
import { AiFillStar } from 'react-icons/ai'
import { Flex } from '@chakra-ui/react'

export default function ReviewCard ({ rating, review, productId, productName, productImage }) {
  console.log(rating, review, productId, productName, productImage)
  return (
    <div className={s.container}>
      <div>
        <p>{productName}</p>
        <p>{productImage}</p>
      </div>
      <div>
        <p>{review}</p>
        <Flex alignItems='center' justifyContent='center'>{rating} <AiFillStar className={s.star} /></Flex>
      </div>
      <p>ID:{productId}</p>

    </div>
  )
}
