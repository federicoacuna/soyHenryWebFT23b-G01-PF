import React, { useEffect, useState } from 'react'
import s from './index.module.css'
import { Select, Tooltip, Box, TableCaption, TableContainer, Td, Tr, Th, Thead, Table, Tbody, Stack, Heading, InputGroup, Input, Button, Flex, Text, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react' //eslint-disable-line
import { AiOutlineClose, AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import InventoryFilterContainer from '../InventoryFilterContainer'
import InventoryPagination from '../InventoryPagination'
import { clearProductFilter, getProductsList } from '../../redux/actions/products.actions'
import { getAllInventory, postStock } from '../../redux/actions/inventories.actions' //eslint-disable-line

export const InventoryModal = ({ state, setState, InventoryItems }) => {
  const product = useSelector(state => state.products.data)
  const options = useSelector(state => state.products.filter)
  const dispatch = useDispatch()
  const [isPosting, setIsPosting] = useState(false)
  const [errorInput, setErrorInput] = useState({ input: '', branch: '' }) //eslint-disable-line
  const branches = useSelector(state => state.branches.data)
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    branch: '',
    stock: ''
  })//eslint-disable-line
  const { currentPage, hasNext, hasPrevious } = useSelector(state => state.products.pagination) //eslint-disable-line

  useEffect(() => {
    dispatch(getProductsList(options))
  }, [options])//eslint-disable-line
  const toast = useToast()
  const handleClick = (e) => {
    setState(false)
    dispatch(clearProductFilter())
    dispatch(getAllInventory())
  }

  const handlePost = (id, name) => {
    const productoYaExiste = InventoryItems.length > 0 && InventoryItems.find(item => item.id === id) !== undefined
    console.log(productoYaExiste)
    if (productoYaExiste) {
      toast({
        description: 'Este producto ya está en el inventario',
        status: 'info',
        duration: 9000,
        isClosable: true
      })
    } else if (!productoYaExiste) {
      setIsPosting(true)
      setCurrentProduct({
        ...currentProduct,
        id,
        name,
        stock: 0
      })
    }
  }//eslint-disable-line
  // console.log(branches)

  const handleStockChange = (e) => {
    setCurrentProduct({ ...currentProduct, stock: e.target.value })
  }
  const handleSucursalChange = (e) => {
    setCurrentProduct({ ...currentProduct, branch: e.target.value })
  }
  const handleCreateItem = () => {
    dispatch(postStock({ branchId: currentProduct.branch, productId: currentProduct.id, quantity: currentProduct.stock }))
    toast({
      title: 'Item agregado.',
      description: 'Se agregó el item al inventario 😎',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
    setIsPosting(false)
    setState(false)
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
              {!isPosting && <TableContainer>
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
                          <Td><Tooltip label='Agregar al inventario'><Button onClick={() => handlePost(product.id, product.name)} bg='primary' color='white'><AiOutlinePlus /></Button></Tooltip></Td>
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
                {/* eslint-disable-next-line */}
              </TableContainer>}
              {!isPosting && <InventoryPagination />}
              {isPosting && <><TableContainer>
                <Table variant='simple'>
                  <TableCaption color='red'>{errorInput && errorInput.input}</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Nombre</Th>
                      <Th isNumeric>Stock</Th>
                      <Th isNumeric>Sucursal</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{currentProduct.id}</Td>
                      <Td maxWidth='2xs' overflowX='hidden' textOverflow='ellipsis'>{currentProduct.name}</Td>
                      <Td display='flex' flexDirection='column' isNumeric><Input placeholder='Stock...' onChange={handleStockChange} /></Td>
                      <Td isNumeric>
                        <Select value={currentProduct.branch} onChange={handleSucursalChange} color='black'>
                          <option key='Selecciona una sucursal' value='Selecciona una sucursal'>Selecciona una sucursal</option>
                          {Array.isArray(branches) && branches.map(branch => (
                            <option
                              key={branch.id + branch.city}
                              value={branch.id}
                            >
                              {branch.city}
                            </option>
                          ))}
                        </Select>
                      </Td>

                    </Tr>
                  </Tbody>
                </Table>
                {/* eslint-disable-next-line */}
                              </TableContainer>
                <Flex justifyContent='flex-end' mt='1rem'>
                  <Button disabled={!/^[0-9]*$/.test(currentProduct.stock) || !currentProduct.stock.length || isNaN(parseInt(currentProduct.branch))} bg='success' color='white' w='70px' mr='1rem' onClick={handleCreateItem}><AiOutlineCheck /></Button>
                  <Button bg='error' color='white' w='70px' onClick={() => setIsPosting(false)}><AiOutlineClose /></Button>
                </Flex>
                {/* eslint-disable-next-line */}
                            </>}
            </Flex>
          </Box>
        </div>}
    </>
  )
}

export default InventoryModal
