import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { addProductFilter } from '../../redux/actions/products.actions'
import { getBrandsList } from '../../redux/actions/brands.action'
import { Box, Select } from '@chakra-ui/react'

export default function InventoryBrandFilter () {
  const brands = useSelector(state => state.brands.data)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const handleChange = (e) => setValue(e.target.value)

  useEffect(() => {
    dispatch(getBrandsList())
  }, [])//eslint-disable-line

  if (!brands || brands.length === 0) return <Box>No hay marcas</Box>

  return (
    <Select value={value} onChange={handleChange} onClick={() => dispatch(addProductFilter({ name: 'brand', value }))} color='black' placeholder='Filtrar por marca'>
      {brands.map(brand => (
        <option
          key={brand.id + brand.name}
          value={brand.id}
        >
          {brand.name}
        </option>
      ))}
    </Select>
  )
}

// <Select color='black' placeholder='Filtrar por marca'>
//   {brands && brands.map(brand => <option key={brand.id} color='black' value={brand.name}>{brand.name}</option>)}
// </Select>
