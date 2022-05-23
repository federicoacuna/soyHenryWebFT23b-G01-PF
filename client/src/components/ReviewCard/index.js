import React from 'react'
import s from './index.module.css'
import { AiFillStar } from 'react-icons/ai'
import { Flex, Heading } from '@chakra-ui/react'

export default function ReviewCard ({ rating, review, productId, productName, productImage }) {
  return (
    <div className={s.container}>
      <div>
        <Heading as='h4' size='md'>{productName}</Heading>
        <br />
        <Heading as='h5' size='sm'>{review}</Heading>
        <br />
      </div>
      <div className={s.div}>
        <Flex className={s.rat} alignItems='center' justifyContent='center'>{rating} <AiFillStar size={50} className={s.star} /></Flex>
      </div>
      <div />
      <p>ID:{productId}</p>

    </div>
  )
}
