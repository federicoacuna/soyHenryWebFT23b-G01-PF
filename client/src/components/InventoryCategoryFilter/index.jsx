
import { useSelector, useDispatch } from 'react-redux'
import { Select } from '@chakra-ui/react'
import { addProductFilter } from '../../redux/actions/products.actions'
import { useEffect, useState } from 'react'
import { getCategoriesList } from '../../redux/actions/categories.actions'

export const InventoryCategoryFilter = () => {
  const categories = useSelector(state => state.categories.data)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const handleChange = (e) => setValue(e.target.value)

  useEffect(() => {
    dispatch(getCategoriesList())
  }, [])//eslint-disable-line

  return (
    <Select onClick={() => dispatch(addProductFilter({ name: 'category', value }))} value={value} onChange={handleChange} color='black' placeholder='Filtrar por categoria'>
      {Array.isArray(categories)
        ? categories.map(category => (
          <option
            key={category.id + category.name}
            value={category.id}
          >
            {category.name}
          </option>
        ))
        : <option>No hay categorias</option>}
    </Select>
  )
}

export default InventoryCategoryFilter

// <Select color='black' placeholder='Filtrar por categoria'>
//   {categories && categories.map(category => <option key={category.id} color='black' value={category.name}>{category.name}</option>)}
// </Select>
