import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { getProductsList } from '../../redux/actions/products.actions'
import ProductsTable from '../ProductsTable'
import { getBrandsList } from '../../redux/actions/brands.action'

function AdminProductPanel () {
  const { data } = useSelector(state => state.products)
  const { data: brands } = useSelector(state => state.brands)
  const dispatch = useDispatch()
  const options = useSelector(state => state.products.filter)

  useEffect(() => {
    dispatch(getProductsList(options))
    dispatch(getBrandsList())
  }, [options, dispatch])

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
