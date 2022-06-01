import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../Pagination'
import ProductCard from '../ProductCard'
import { clearProductFilter, getProductsList } from '../../redux/actions/products.actions'
import styles from './index.module.css'
import { Box, Heading, Text } from '@chakra-ui/react'
import SortingSelector from '../SortingSelector'
import ModalLogin from '../ModalLogin'

function ProductList () {
  const products = useSelector(state => state.products.data)
  const token = useSelector(state => state.users.token)
  const options = useSelector(state => state.products.filter)
  const dispatch = useDispatch()
  const shouldDisplay = !!token
  const [modal, setModal] = useState(false)

  useEffect(() => {
    dispatch(getProductsList(options))
  }, [options])//eslint-disable-line

  if (products.message !== undefined) return <div>{products.message}</div>

  return (
    <Box display='flex' flexDirection='column' width='70%'>
      <Box alignSelf='flex-end' display='flex' gap='1rem' mb='1rem' mr='3rem'>
        <Box display='flex' gap='1rem' justifyContent='center' alignItems='center'>Ordenar por <SortingSelector /></Box>
        <Box cursor='pointer' bg='#333333' height='2.45rem' pl='0.5rem' pr='0.5rem' pt='0.5rem' pb='0.8rem' color='white' px='2rem' onClick={() => dispatch(clearProductFilter())} name='Clean'>Limpiar</Box>
      </Box>
      <Box display='flex' flexWrap='wrap' alignSelf='flex-end'>
        {Array.isArray(products) && products.map(product => (
          <ProductCard
            state={modal}
            setState={setModal}
            key={product.id + product.name}
            product={product}
            shouldDisplay={shouldDisplay}
          />
        ))}
      </Box>
      <Pagination className={styles.pagination} />
      <ModalLogin state={modal} setState={setModal}>
        <Heading color='black' textAlign='center'>No has iniciado sesión</Heading>
        <Text color='black' mt={2} textAlign='center'>Para seguir con tu compra debes registrarte o iniciar sesión.</Text>
      </ModalLogin>
    </Box>
  )
}

export default ProductList
