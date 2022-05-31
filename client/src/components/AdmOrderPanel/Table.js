import React, { useEffect, useState } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
// A great library for fuzzy filtering/sorting items
import s from './table.module.css'
import { matchSorter } from 'match-sorter'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersList, updateOrder } from '../../redux/actions/orders.actions'
import { BiSearchAlt } from 'react-icons/bi'
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'
import { GrChapterNext, GrChapterPrevious } from 'react-icons/gr'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
  Heading,

  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'

// import makeData from './makeData'

// Define a default UI for filtering

function SliderColumnFilter ({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => { //eslint-disable-line
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = ''
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div className={s.filterNumber}>
      <Input
        border='none'
        padding='0.2rem'
        size='xs'
        width='40%'
        placeholder='Filtrar por orden'
        type='number'
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <Button size='xs' colorScheme='gray' color='black' onClick={() => setFilter(undefined)}>Limpiar</Button>
    </div>
  )
}

function GlobalFilter ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <InputGroup width='min-content' marginY='1rem'>
      <Input
        borderRadius='5px'
        backgroundColor='white'
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        _focus={{ outline: 'none' }}
        width='auto'
        size='md'
        placeholder='Buscar...'
      />
      <InputRightElement pointerEvents='none'><BiSearchAlt size={24} /></InputRightElement>

    </InputGroup>
  )
}

function SelectColumnFilter ({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      style={{ color: 'black' }}
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value=''>All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function fuzzyTextFilterFn (rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function TablaData ({ columns, data }) {
  const [order, setOrder] = useState({})
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      }
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data,
      // defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0 }
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  )

  function handleChange (e) {
    setValues({
      status: e.target.value
    })
  }

  function handleSubmit (orderId, status) {
    try {
      dispatch(updateOrder(orderId, status))
    } catch (error) {
      return error
    }
  }

  function handleClickc (order) {
    setOrder(order)
    onOpen()
  }

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    status: ''
  })

  return (
    <>

      <TableContainer height='45rem'>
        <div className='div1'>
          <div
            colSpan={visibleColumns.length}
            style={{
              textAlign: 'left'
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        </div>

        <Table variant='striped' color='dark' colorScheme='blackAlpha' {...getTableProps()}>
          <Thead bg='primary'>
            {headerGroups.map(headerGroup => (
              <Tr key={Date.now().toString()} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th color='secondary' key={Date.now().toString()} {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* Render the columns filter UI */}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </Th>
                ))}
                <Th color='secondary'>Acciones</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <Tr key={Date.now().toString()} {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <Td key={Date.now().toString()} {...cell.getCellProps()}>{cell.render('Cell')} </Td>
                    )
                  })}
                  <Td><Button onClick={() => handleClickc(row.original)}>Modificar orden</Button></Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <br />
        <div className='pagination'>
          <Button backgroundColor='darkgray' size='xs' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <GrChapterPrevious />
          </Button>{' '}
          <Button size='xs' onClick={() => previousPage()} disabled={!canPreviousPage}>
            <BsFillArrowLeftSquareFill size='25' />
          </Button>{' '}
          <Button size='xs' onClick={() => nextPage()} disabled={!canNextPage}>
            <BsFillArrowRightSquareFill size='25' />
          </Button>{' '}
          <Button backgroundColor='darkgray' size='xs' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <GrChapterNext />
          </Button>{' '}
          <>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </>

          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize} ordenes
              </option>
            ))}
          </select>
        </div>
        {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
        <div />
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Opciones de la orden N°: {order.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as='h4' size='md'>Cambiar estado a</Heading>
            <select
              color='black'
              name='estado'
              value={values.status}
              onChange={e => handleChange(e)}
            >
              <option value=''>Cambiar estado a</option>
              <option value='CREADA'>CREATED</option>
              <option value='EN_PROCESO'>EN PROCESO</option>
              <option value='DESPACHADA'>DESPACHADA</option>
              <option value='ENVIADA'>ENVIADA</option>
              <option value='ENTREGADA'>ENTREGADA</option>
              <option value='REEMBOLSADA'>REEMBOLSADA</option>
              <option value='CANCELADA'>CANCELADA</option>
            </select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => handleSubmit(order.id, values.status)} variant='ghost'>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

// Define a custom filter filter function!
function filterGreaterThan (rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

function App () {
  const dispatch = useDispatch() //eslint-disable-line
  const orders = useSelector(state => state.orders.data)
  const optionsOr = useSelector(state => state.orders.filter)

  useEffect(() => {
    dispatch(getOrdersList(optionsOr))
  }, [optionsOr]) //eslint-disable-line

  const columns = React.useMemo(
    () => [

      {
        Header: 'N° de orden',
        accessor: 'id',
        Filter: SliderColumnFilter,
        filter: 'equals'

      },
      {
        Header: 'Estado',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Total',
        accessor: 'total',
        Filter: () => null
      },
      {
        Header: 'Id de usuario',
        accessor: 'userId',
        Filter: () => null
      },
      {
        Header: 'Metodo de pago',
        accessor: 'userPaymentId',
        Filter: () => null
      }

    ],

    []
  )

  const data = React.useMemo(() => orders || [], [orders])

  if (!Array.isArray(data)) {
    return (
      <Heading>Pronto habra mas ordenes</Heading>
    )
  }
  return (
    <div>
      <TablaData columns={columns} data={data} />
    </div>
  )
}

export default App
