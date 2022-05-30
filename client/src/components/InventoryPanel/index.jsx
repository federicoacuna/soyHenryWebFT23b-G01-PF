import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import { EditableInput, EditablePreview, IconButton, ButtonGroup, Editable, useEditableControls, Tooltip, Select, Input, Flex, Button, Box, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react' //eslint-disable-line
import { FiEdit, FiX, FiCheck } from 'react-icons/fi'
import InventoryModal from '../InventoryModal'
import { addProductFilter } from '../../redux/actions/products.actions'
import { useDispatch } from 'react-redux'
const InventoryPanel = () => {
  // const brands = useSelector(state => state.brands.data)
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls()
    return isEditing
      ? (
        <ButtonGroup justifyContent='center' size='sm'>
          <IconButton icon={<FiCheck />} {...getSubmitButtonProps()} />
          <IconButton icon={<FiX />} {...getCancelButtonProps()} />
        </ButtonGroup>
        )
      : (
        <Flex justifyContent='center'>
          <Tooltip label='Modificar stock'><IconButton size='sm' icon={<FiEdit />} {...getEditButtonProps()} /></Tooltip>
        </Flex>
        )
  }

  const dispatch = useDispatch()
  const [modal, setModal] = useState(false) //eslint-disable-line
  const handleClick = (e) => {
    setModal(true)
    dispatch(addProductFilter({
      name: 'page',
      value: parseInt(1)
    }))
  }

  return (
    <>
      <Box>
        <Flex>
          <Input placeholder='Nombre del producto' bg='white' />
          <Select bg='white' placeholder='Filtrar por sucursal' w='40%'>
            <option color='black' value='option1'>Sucursal 1</option>
            <option color='black' value='option2'>Sucursal 2</option>
            <option color='black' value='option3'>Sucursal 3</option>
          </Select>
          <Button bg='primary' color='white' w='20%'>Limpiar filtros</Button>
        </Flex>

        <TableContainer>
          <Table variant='striped'>
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th isNumeric>ID</Th>
                <Th>Producto</Th>
                <Th>Marca</Th>
                <Th>Categoría</Th>
                <Th>Sucursal</Th>
                <Th isNumeric>Stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Portatil 8gb 1tb</Td>
                <Td>ASUS</Td>
                <Td>Laptops</Td>
                <Td>Sucursal 1</Td>
                <Td>
                  <Editable
                    display='flex'
                    flexDirection='row'
                    textAlign='left'
                    defaultValue='24'
                    isPreviewFocusable={false}
                  >
                    <EditablePreview mr='10px' />

                    {/* Here is the custom input */}
                    <Input as={EditableInput} />
                    <EditableControls />
                  </Editable>
                </Td>
              </Tr>
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
      </Box>
      <Button mt='2rem' onClick={handleClick} bg='primary' color='white' w='20%'>Agregar nuevo producto</Button>
      <InventoryModal state={modal} setState={setModal} />

    </>
  )
}

export default InventoryPanel
