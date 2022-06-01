import { useRef, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clearProductFilter, getProductsList } from '../../redux/actions/products.actions'
import ProductsTable from '../ProductsTable'
import { getBrandsList } from '../../redux/actions/brands.action'

function AdminProductPanel () {
  const firstRender = useRef(true)
  const { data } = useSelector(state => state.products)
  const { data: brands } = useSelector(state => state.brands)
  const options = useSelector(state => state.products.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearProductFilter())

    return () => dispatch(clearProductFilter())
  }, [])// eslint-disable-line

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    dispatch(getProductsList(options))
    dispatch(getBrandsList())
  }, [options])//eslint-disable-line

  const columns = useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'name'
    },
    {
      Header: 'Precio',
      accessor: 'price'
    },
    {
      Header: 'Categoría',
      accessor: 'category.name'
    },
    {
      id: 'brandId',
      Header: 'Marca',
      accessor: (value) => brands.find(brand => brand.id === value.brandId)?.name
    }
  ], [brands])

  return (
    <>
      <ProductsTable
        data={data}
        columns={columns}
      />
    </>
  )
}

export default AdminProductPanel
