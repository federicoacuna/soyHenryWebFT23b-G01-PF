import React, { useEffect } from 'react' // eslint.disable-line
import './orderFilter.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  UnorderedList,
  Heading
} from '@chakra-ui/react'
import OrderCard from '../AdmOrderCard'
import { getAllOrdersForAdm } from '../../redux/actions/orders.actions'

export default function AdmOrderPanel () {
  const dispatch = useDispatch() //eslint-disable-line
  const orders = useSelector(state => state.orders)
  // const orders = [{ id: 1, status: 'CREADA', total: 200, userId: 2, userPaymentId: 1 }]

  useEffect(() => {
    dispatch(getAllOrdersForAdm())
  }, [orders]) //eslint-disable-line

  return (
    <div className='div0'>
      <Heading>Ordenes</Heading>
      <div className='div'>
        <UnorderedList className='orList'>
          {orders.length
            ? orders.map(or => <OrderCard
                key={or.id}
                ordenN={or.id}
                status={or.status}
                total={or.total}
                idUsuario={or.userId}
                idPago={or.userPaymentId}
               />) //eslint-disable-line
            : <Heading as='h4' size='md'>Pronto habra mas ordenes!</Heading>}
        </UnorderedList>
      </div>
    </div>
  )
}
//   <ListItem key={or.id}>
//     <Box bg='grey' w='100%' p={4} color='white'>N°{or.id} Estado:{or.status}</Box>
//   </ListItem>

// <Button onClick={() => handleClick()} leftIcon={<MdBuild />} colorScheme='pink' variant='solid'>
//                 Settings
//               </Button>
