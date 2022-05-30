import { TablaData, DefaultColumnFilter, SelectColumnFilter } from './Table'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBranchesList } from '../../redux/actions/branches.actions'
import { getCountriesList } from '../../redux/actions/countries.actions'

export default function BranchTable () {
    const dispatch = useDispatch() //eslint-disable-line

  useEffect(() => {
    dispatch(getCountriesList())
    dispatch(getBranchesList())
  }, []) // eslint-disable-line 
  // commit

  const branches = useSelector(state => state.branches.data)
  const countries = useSelector(state => state.countries.data)
  const columns = React.useMemo(
    () => [

      {
        Header: 'Country ID',
        accessor: 'id',
        Filter: DefaultColumnFilter,
        filter: 'equals'

      },
      {
        Header: 'Estado',
        accessor: 'state',
        Filter: DefaultColumnFilter,
        filter: 'includes'
      },
      {
        Header: 'Ciudad',
        Filter: DefaultColumnFilter,
        accessor: 'city'
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
        Filter: () => null

      },
      {
        Header: 'Activa/Inactiva',
        accessor: 'deleted',
        Filter: SelectColumnFilter
      }
    ],

    []
  )

  const data = React.useMemo(() => branches || [], [branches])

  return (
    <div>
      <TablaData columns={columns} data={data} branches={branches} countries={countries} />
    </div>
  )
}
