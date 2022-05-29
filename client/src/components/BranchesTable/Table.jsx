import React, { useState } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { ModalBranchForm, ModalBranchDelete } from '../ModalBranchForm'

import s from './table.module.css'
import { matchSorter } from 'match-sorter'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Input, useDisclosure } from '@chakra-ui/react'

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
    />
  )
}

export function GlobalFilter ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className={s.inputTable}>

      <Input
        className={s.input}
        borderRadius='50px'
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder='Buscar'
        style={{
          fontSize: '1.1rem',
          border: '0'
        }}
      />
    </div>
  )
}
// commit
export function SelectColumnFilter ({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value=''>All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option ? 'true' : 'false'}
        </option>
      ))}
    </select>
  )
}
function fuzzyTextFilterFn (rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = val => !val

export function TablaData ({ columns, data, branches, countries }) {
  const [branch, setBranch] = useState({})
  const filterTypes = React.useMemo(
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
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useGlobalFilter
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

  function handleModalBranchForm (branch = {}) {
    setBranch(branch)
    onOpen()
  }
  function handleModalBranchDelete (branch = {}) {
    setBranch(branch.id)
    onOpenDelete()
  }

  return (

    <div>
      <Button onClick={() => handleModalBranchForm()}>Crear sucursal</Button>
      <ModalBranchForm isOpen={isOpen} onClose={onClose} branch={branch} countries={countries} />
      <ModalBranchDelete isOpen={isOpenDelete} onOpen={onOpenDelete} onClose={onCloseDelete} branch={branch} />
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
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        </div>
        <Table variant='striped' color='dark' colorScheme='telegram' {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr key={Date.now().toString()} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th key={Date.now().toString()} {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* Render the columns filter UI */}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <Tr key={Date.now().toString()} {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <Td key={Date.now().toString()} {...cell.getCellProps()}>{typeof cell.value !== 'boolean' ? cell.render('Cell') : cell.value ? 'Inactivo' : 'Activo'}</Td>
                    // cell.render('Cell')
                  })}
                  <Td><Button onClick={() => handleModalBranchForm(row.original)}>Modificar Sucursal</Button></Td>
                  <Td><Button onClick={() => handleModalBranchDelete(row.original)}>Activar/Desactivar</Button></Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
        <br />
        <div>Showing the first 20 results of {rows.length} rows</div>
        <div />
      </TableContainer>
    </div>
  )
}

function filterGreaterThan (rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}
filterGreaterThan.autoRemove = val => typeof val !== 'number'
