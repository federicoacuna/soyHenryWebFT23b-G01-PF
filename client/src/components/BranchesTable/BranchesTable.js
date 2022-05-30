import React, { useEffect, useState, useMemo } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { ModalBranchForm, ModalBranchDelete } from '../ModalBranchForm'

import { matchSorter } from 'match-sorter'
import { useDispatch, useSelector } from 'react-redux'
import { getCountriesList } from '../../redux/actions/countries.actions'
import { getBranchesList } from '../../redux/actions/branches.actions'
import { BiSearchAlt } from 'react-icons/bi'
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
  useDisclosure,
  InputRightElement,
  InputGroup,
  Select
} from '@chakra-ui/react'

export function DefaultColumnFilter ({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length

  return (
    <Input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
      color='white'
      borderRadius='5px'
      w='auto'
      size='sm'
      marginY='0.5rem'

    />
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
    <InputGroup
      w='min-content'
      marginY='1rem'
    >

      <Input
        bg='white'
        borderRadius='5px'
        _focus={{ outline: 'none' }}
        w='auto'
        size='md'
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder='Buscar'

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
    <Select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      _focus={{ outline: 'none' }}
      // bg='white'
      borderRadius='5px'
      w='auto'
      size='xs'
      marginY='0.5rem'
    >
      <option value=''>Todas</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option ? 'Inactivo' : 'Activo'}
        </option>
      ))}
    </Select>
  )
}

function fuzzyTextFilterFn (rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function TablaData ({ columns, data, countries }) {
  const [branch, setBranch] = useState({})
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
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
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
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0 }
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  )
  function handleModalBranchForm (branch = {}) {
    setBranch(branch)
    onOpen()
  }
  function handleModalBranchDelete (branch = {}) {
    setBranch(branch.id)
    onOpenDelete()
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  return (
    <>
      <Button onClick={() => handleModalBranchForm()}>Crear sucursal</Button>
      <ModalBranchForm isOpen={isOpen} onClose={onClose} branch={branch} countries={countries} />
      <ModalBranchDelete isOpen={isOpenDelete} onOpen={onOpenDelete} onClose={onCloseDelete} branch={branch} />

      <TableContainer height='45rem'>

        {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
        <div />
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
                  <Th color='white' key={Date.now().toString()} {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* Render the columns filter UI */}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </Th>
                ))}
                <Th color='secondary' textAlign='center'>Modifiaciones</Th>
                <Th color='secondary' textAlign='center'>Activar/Desactivar</Th>
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
                      <Td key={Date.now().toString()} {...cell.getCellProps()}>{typeof cell.value !== 'boolean' ? cell.render('Cell') : cell.value ? 'Inactivo' : 'Activo'} </Td>
                    )
                  })}
                  <Td><Button onClick={() => handleModalBranchForm(row.original)}>Modificar Sucursal</Button></Td>
                  <Td><Button onClick={() => handleModalBranchDelete(row.original)}>Activar/Desactivar</Button></Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <br />
        <div className='pagination'>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type='number'
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

      </TableContainer>

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

export default function AppT () {
  const dispatch = useDispatch() //eslint-disable-line

  useEffect(() => {
    dispatch(getCountriesList())
    dispatch(getBranchesList())
  }, []) // eslint-disable-line
  // commit

  const branches = useSelector(state => state.branches.data)
  const countries = useSelector(state => state.countries.data)
  const columns = useMemo(
    () => [

      {
        Header: 'ID de Sucursal',
        accessor: 'id',
        Filter: DefaultColumnFilter,
        filter: 'equals'

      },
      {
        Header: 'Estado',
        accessor: 'state',
        Filter: DefaultColumnFilter

      },
      {
        Header: 'Ciudad',
        accessor: 'city',
        Filter: DefaultColumnFilter
      },
      {
        Header: 'Calle',
        accessor: 'streetName',
        Filter: () => null
      },
      {
        Header: 'Numero de Calle',
        accessor: 'houseNumber',
        Filter: () => null
      },
      {
        Header: 'Numero de Telefono',
        accessor: 'phoneNumber',
        Filter: DefaultColumnFilter

      },
      {
        Header: 'Activa/Inactiva',
        accessor: 'deleted',
        Filter: SelectColumnFilter
      }
    ],

    []
  )

  const data = useMemo(() => branches || [], [branches])

  return (
    <div>
      <TablaData columns={columns} data={data} countries={countries} />
    </div>
  )
}
