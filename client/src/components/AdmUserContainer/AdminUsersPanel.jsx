import { useEffect, useState, useMemo } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { matchSorter } from 'match-sorter'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersList, adminUpdatesUserData } from '../../redux/actions/users.actions'
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Flex,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { BiSearchAlt } from 'react-icons/bi'
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs' //eslint-disable-line
import { GrChapterNext, GrChapterPrevious } from 'react-icons/gr' //eslint-disable-line

export function DefaultColumnFilter ({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function GlobalFilter ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div>
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
    </div>
  )
}

function SelectIsAdminFilter ({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

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
          {option ? 'Admin' : 'User'}
        </option>
      ))}
    </select>
  )
}

function SelectEnabledFilter ({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

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
          {option ? 'Habilitado' : 'Deshabilitado'}
        </option>
      ))}
    </select>
  )
}

function fuzzyTextFilterFn (rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = val => !val

// El componente Table
function TablaData ({ columns, data }) {
  const [user, setUser] = useState({ isAdmin: '', enabled: '' })
  const toast = useToast()
  const dispatch = useDispatch()
  function handleSubmit () {
    if (user.isAdmin === '' && user.enabled === '') {
      toast({
        description: 'Complete los campos por favor.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } else {
      dispatch(adminUpdatesUserData(user))
      setUser({ isAdmin: '', enabled: '' })
      onClose()
    }
  }
  function handleChange (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  function handleEdit (user) {
    setUser(user)
    onOpen()
  }
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
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
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
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
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 }
    },
    useFilters,
    useGlobalFilter,
    usePagination
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
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
      <Table variant='striped' colorScheme='blackAlpha' {...getTableProps()}>
        <Thead bg='primary'>
          {headerGroups.map(headerGroup => (
            <Tr key={Date.now().toString()} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th color='secondary' key={Date.now().toString()} {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </Th>
              ))}
              <Th color='secondary' textAlign='center'>Acciones</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <Tr key={Date.now().toString()} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td key={Date.now().toString()} {...cell.getCellProps()}>{typeof cell.value !== 'boolean' ? cell.render('Cell') : cell.column.Header === 'Rol' && cell.value ? 'Admin' : cell.column.Header === 'Rol' && !cell.value ? 'User' : cell.column.Header === 'Estado' && cell.value ? 'Habilitado' : cell.column.Header === 'Estado' && !cell.value ? 'Deshabilitado' : null}</Td>
                })}
                <Td><Flex justifyContent='center'><Button onClick={() => handleEdit(row.original)}>Modificar usuario</Button></Flex></Td>
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
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <span />
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize} usuarios
            </option>
          ))}
        </select>
      </div>
      <div />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Selecciona un Rol</FormLabel>
              <Select name='isAdmin' value={user.isAdmin} onChange={(e) => handleChange(e)}>
                <option value=''>---</option>
                <option value='true'>Admin</option>
                <option value='false'>User</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Selecciona el Estado</FormLabel>
              <Select name='enabled' value={user.enabled} onChange={(e) => handleChange(e)}>
                <option value=''>---</option>
                <option value='true'>Habilitado</option>
                <option value='false'>Deshabilitado</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  )
}

function App () {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.data)

  useEffect(() => {
    dispatch(getUsersList())
  }, []) //eslint-disable-line

  const columns = useMemo(
    () => [

      {
        Header: 'E-mail',
        accessor: 'email',
        Filter: () => null
      },
      {
        Header: 'Rol',
        accessor: 'isAdmin',
        Filter: SelectIsAdminFilter
      },
      {
        Header: 'Estado',
        accessor: 'enabled',
        Filter: SelectEnabledFilter
      }

    ],

    []
  )

  return (
    <div>
      <TablaData columns={columns} data={users} />
    </div>
  )
}

export default App
