import { useState } from 'react'
import { useTable, useGlobalFilter } from 'react-table'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tooltip,
  Box,
  Flex,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { AiFillEdit } from 'react-icons/ai'
import Pagination from '../Pagination'
import SearchBar from '../SearchBar'
import ProductModal from '../ProductModal'

function ProductTable ({ columns, data }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    model: '',
    price: '',
    image: [],
    categoryId: '',
    brandId: ''
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter // useGlobalFilter!
  )

  const handleEdit = (product) => {
    setProduct({ isNew: false, ...product })
    onOpen()
  }

  const handleCreate = () => {
    setProduct({ isNew: true, ...product })
    onOpen()
  }

  const handleClose = () => {
    setProduct({
      name: '',
      description: '',
      model: '',
      price: '',
      image: [],
      images: [],
      category: '',
      brand: ''
    })
    onClose()
  }

  if (!Array.isArray(data)) return null

  return (
    <>
      {isOpen && <ProductModal isOpen={isOpen} onClose={handleClose} product={product} setProduct={setProduct} />}
      <Flex alignItems='center' justifyContent='space-between'>
        <SearchBar />
        <Button type='button' onClick={handleCreate}>Crear</Button>
      </Flex>
      <TableContainer>
        <Table
          variant='striped' colorScheme='blackAlpha'
          {...getTableProps()}
        >
          <Thead bg='primary'>
            {headerGroups.map(headerGroup => (
              <Tr key={Date.now().toString()} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    isNumeric={column.Header === 'Precio'}
                    color='secondary' key={Date.now().toString()} {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                    {/* Render the columns filter UI */}
                    {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  </Th>
                ))}
                <Th textAlign='center' color='secondary'>Acciones</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <Tr
                  key={Date.now().toString()}
                  {...row.getRowProps()}
                >
                  {row.cells.map(cell => {
                    return (
                      <Td
                        maxW='1rem'
                        overflow='hidden'
                        key={Date.now().toString()}
                        {...cell.getCellProps()}
                        isNumeric={cell.column.Header === 'Precio'}
                      >
                        {cell.column.Header === 'Nombre' &&
                          <Tooltip label={cell.value}>
                            <Box
                              as='span' tabIndex={0}
                              display='block'
                              overflow='hidden'
                              whiteSpace='nowrap'
                              textOverflow='ellipsis'
                            >
                              {cell.render('Cell')}
                            </Box>
                          </Tooltip>}
                        {cell.column.Header === 'Precio' && `$${cell.value}`}
                        {cell.column.Header !== 'Nombre' &&
                        cell.column.Header !== 'Precio' && cell.render('Cell')}
                      </Td>
                    )
                  })}
                  <Td>
                    <Flex justifyContent='center' columnGap='2rem'>
                      <Tooltip label='Editar'>
                        <Box as='span' display='block' w='min-content' cursor='pointer'>
                          <Button onClick={() => handleEdit(row.original)}>
                            <AiFillEdit />
                          </Button>
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination />
    </>
  )
}

export default ProductTable
