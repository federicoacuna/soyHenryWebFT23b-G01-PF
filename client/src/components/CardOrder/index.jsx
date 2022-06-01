import React from 'react'
import s from './index.module.css'
import {
  List, //eslint-disable-line
  ListItem,
  ListIcon, //eslint-disable-line
  OrderedList, //eslint-disable-line
  UnorderedList,
  Box,
  Text
} from '@chakra-ui/react'

export default function CardOrder ({ id, total, date, orderItems }) {
  return (
    <Box width='100%' boxShadow='md' minHeight='150px' display='flex' justifyContent='space-between'>
      <UnorderedList>
        <Text>Productos</Text>
        {orderItems?.length && orderItems.map(e => {
          return <ListItem key={e.id}>{e.name} x{e.orderItem.quantity} ARS${e.price}</ListItem>
        })}
      </UnorderedList>
      <div className={s.div2}>
        <Text>Fecha: {date.slice(0, 10)}</Text>
        <Text>Total: ${total}</Text>
        <Text>N° de orden {id}</Text>
      </div>
    </Box>

  )
}
