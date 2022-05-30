import React, { useEffect } from 'react'
import s from './index.module.css'
import { Tooltip, Box, TableContainer, Td, Tr, Th, Thead, Table, Tbody, Stack, Heading, InputGroup, Input, Button, Flex, Text, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react' //eslint-disable-line
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import InventoryFilterContainer from '../InventoryFilterContainer'
import InventoryPagination from '../InventoryPagination'
import { clearProductFilter, getProductsList } from '../../redux/actions/products.actions'

export const InventoryModal = ({ state, setState }) => {
  const product = useSelector(state => state.products.data)
  const options = useSelector(state => state.products.filter)
  const dispatch = useDispatch()
  const { currentPage, hasNext, hasPrevious } = useSelector(state => state.products.pagination) //eslint-disable-line

  useEffect(() => {
    dispatch(getProductsList(options))
  }, [options])//eslint-disable-line

  const handleClick = () => {
    setState(false)
    dispatch(clearProductFilter())
  }

  return (
    <>
      {state &&
        <div className={s.overlay}>
          <Box className={s.container}>
            <Flex borderRadius='none' flexDirection='column' w='900px'>
              <Flex cursor='pointer' justifyContent='flex-end'>
                <AiOutlineClose color='black' onClick={handleClick} size={30} />
              </Flex>
              <Heading mb='1rem'>Agrega productos al inventario</Heading>
              <Flex flexDirection='column' mt='1rem' mb='1rem'>
                <InventoryFilterContainer />
              </Flex>
              <TableContainer>
                <Table variant='striped'>
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead>
                    <Tr>
                      <Th isNumeric>ID</Th>
                      <Th>Producto</Th>
                      <Th>Categoría</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {product && product.map(product => {
                      return (
                        <Tr key={product.id}>
                          <Td>{product.id}</Td>
                          <Td maxWidth='2xs' overflowX='hidden' textOverflow='ellipsis'>{product.name}</Td>
                          <Td>{product.category.name}</Td>
                          <Td><Tooltip label='Agregar al inventario'><Button onClick={() => alert('aun no hace nada')} bg='primary' color='white'><AiOutlinePlus /></Button></Tooltip></Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                  {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
                </Table>
              </TableContainer>
              <InventoryPagination />
            </Flex>
          </Box>
        </div>}
    </>
  )
}

export default InventoryModal
