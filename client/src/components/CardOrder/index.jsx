import React from 'react'
import s from './index.module.css'
import {
  List, //eslint-disable-line
  ListItem,
  ListIcon, //eslint-disable-line
  OrderedList, //eslint-disable-line
  UnorderedList,
  Heading
} from '@chakra-ui/react'

export default function CardOrder ({ id, total, date, orderItems }) {
  return (
    <div className={s.container}>
      <UnorderedList>
        <Heading as='h5' size='sm'>Productos</Heading>
        {orderItems?.length && orderItems.map(e => {
          return <ListItem key={e.id}>{e.name} x{e.orderItem.quantity} ARS${e.price}</ListItem>
        })}
      </UnorderedList>
      <div className={s.div2}>
        <Heading as='h4' size='md'>Fecha: {date.slice(0, 10)}</Heading>
        <Heading as='h4' size='md'>Total: ${total}</Heading>
        <Heading as='h4' size='md'>N° de orden {id}</Heading>
      </div>

    </div>
  )
}
