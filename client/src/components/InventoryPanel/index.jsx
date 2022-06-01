import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { useToast, EditableInput, EditablePreview, IconButton, ButtonGroup, Editable, useEditableControls, Tooltip, Select, Input, Flex, Button, Box, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react' //eslint-disable-line
import { FiEdit, FiX, FiCheck } from 'react-icons/fi' //eslint-disable-line
import InventoryModal from '../InventoryModal'
import { addProductFilter } from '../../redux/actions/products.actions'
import { useDispatch, useSelector } from 'react-redux'
import { getAllInventory, putStock } from '../../redux/actions/inventories.actions'
import InventoryStockBranchFilter from '../InventoryStockBranchFilter'

const InventoryPanel = () => {
  const inventoryTotal = useSelector(state => state.inventories.inventoryTotal)
  const inventoryBranchTotal = useSelector(state => state.inventories.inventoryBranchTotal) //eslint-disable-line
  const inventoryProductExist = useSelector(state => state.inventories.inventoryProductExist) //eslint-disable-line
  const [isEditing, setIsEditing] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const toast = useToast()

  useEffect(() => {
    dispatch(getAllInventory())
  }, [isEditing]) // eslint-disable-line

  const dispatch = useDispatch()
  const [currentItem, setCurrentItem] = useState({
    id: '',
    name: '',
    branch: '',
    stock: ''
  })//eslint-disable-line

  const [modal, setModal] = useState(false) //eslint-disable-line
  const handleClick = (e) => {
    setModal(true)
    dispatch(addProductFilter({
      name: 'page',
      value: parseInt(1)
    }))
  }

  const InventoryItems = []
  const productsByName = []
  inventoryTotal && inventoryTotal.map(array => array.map(item => InventoryItems.push(item)))
  inventoryProductExist.length && inventoryProductExist.map(array => array.map(item => productsByName.push(item)))

  const handleEdit = (id, name, branch) => {
    setIsEditing(true)
    setCurrentItem({
      ...currentItem,
      id,
      name,
      branch
    })
  }//eslint-disable-line

  const handleStockChange = (e) => {
    setCurrentItem({ ...currentItem, stock: e.target.value })
  }
  const handleCreateItem = () => {
    dispatch(putStock({ branchId: currentItem.branch, productId: currentItem.id, quantity: currentItem.stock }))
    toast({
      title: 'Stock modificado.',
      description: 'Se modificó el stock del item 😎',
      status: 'success',
      duration: 9000,
      isClosable: true
    })
    setIsEditing(false)
    setIsSearching(false)
  }
  // console.log(inventoryBranchTotal)

  return (
    <>
      <Box>
        <Flex>
          <InventoryStockBranchFilter setIsSearching={setIsSearching} modal={modal} />

        </Flex>

        {!isEditing && <TableContainer>
          <Table variant='striped' colorScheme='blackAlpha'>
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th isNumeric>#</Th>
                <Th isNumeric>ID</Th>
                <Th>Producto</Th>
                <Th>Sucursal</Th>
                <Th isNumeric>Stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isSearching && InventoryItems.length
                ? InventoryItems.map((item, i) => (
                  <Tr key={item.id}>
                    <Td>{i + 1}</Td>
                    <Td>{item.inventory.productId}</Td>
                    <Td maxWidth='2xs' overflowX='hidden' textOverflow='ellipsis'>{item.name}</Td>
                    <Td>{item.inventory.branchId}</Td>
                    <Td>{item.inventory.stock}</Td>

                    <Td>
                      <Tooltip label='Modificar stock'><Button onClick={() => handleEdit(item.inventory.productId, item.name, item.inventory.branchId)} bg='primary' color='white'><FiEdit /></Button></Tooltip>
                    </Td>
                    {/* eslint-disable-next-line */}
                                 </Tr>
                ))
                : !isSearching && inventoryBranchTotal
                    ? inventoryBranchTotal.map((item, i) => (
                      <Tr key={item.id}>
                        <Td>{i + 1}</Td>
                        <Td>{item.inventory.productId}</Td>
                        <Td maxWidth='2xs' overflowX='hidden' textOverflow='ellipsis'>{item.name}</Td>
                        <Td>{item.inventory.branchId}</Td>
                        <Td>{item.inventory.stock}</Td>

                        <Td>
                          <Tooltip label='Modificar stock'><Button onClick={() => handleEdit(item.inventory.productId, item.name, item.inventory.branchId)} bg='primary' color='white'><FiEdit /></Button></Tooltip>
                        </Td>
                        {/* eslint-disable-next-line */}
                               </Tr>
                    ))
                    : isSearching && productsByName.length
                      ? productsByName.map((item, i) => (
                        <Tr key={item.inventory.productId}>
                          <Td>{i + 1}</Td>
                          <Td>{item.inventory.productId}</Td>
                          <Td maxWidth='2xs' overflowX='hidden' textOverflow='ellipsis'>{item.inventory.productId}</Td>
                          <Td>{item.inventory.branchId}</Td>
                          <Td>{item.inventory.stock}</Td>

                          <Td>
                            <Tooltip label='Modificar stock'><Button onClick={() => handleEdit(item.inventory.productId, item.name, item.inventory.branchId)} bg='primary' color='white'><FiEdit /></Button></Tooltip>
                          </Td>
                          {/* eslint-disable-next-line */}
                                     </Tr>
                      ))
                      : <p>No existe el item.</p>}
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
      </Box>
      {!isEditing && <Button mt='2rem' onClick={handleClick} bg='primary' color='white' w='20%'>Agregar nuevo producto</Button>}
      {isEditing && <><TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th isNumeric>Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{currentItem.id}</Td>
              <Td maxWidth='2xs' overflowX='hidden' textOverflow='ellipsis'>{currentItem.name}</Td>
              <Td display='flex' flexDirection='column' isNumeric><Input placeholder='Stock...' onChange={handleStockChange} /></Td>

            </Tr>
          </Tbody>
        </Table>
        {/* eslint-disable-next-line */}
                              </TableContainer>
        <Flex justifyContent='flex-end' mt='1rem'>
          <Button disabled={!/^[0-9]*$/.test(currentItem.stock) || !currentItem.stock.length} bg='success' color='white' w='70px' mr='1rem' onClick={handleCreateItem}><FiCheck /></Button>
          <Button bg='error' color='white' w='70px' onClick={() => setIsEditing(false)}><FiX /></Button>
        </Flex>
        {/* eslint-disable-next-line */}
                            </>}
      <InventoryModal state={modal} setState={setModal} InventoryItems={InventoryItems} />

    </>
  )
}

export default InventoryPanel
