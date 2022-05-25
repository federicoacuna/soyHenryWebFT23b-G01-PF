import { useDispatch, useSelector } from 'react-redux'
import { setProductSorting } from '../../redux/actions/products.actions'
import { Box } from '@chakra-ui/react'
import s from './index.module.css'

export default function SortingSelector () {
  const dispatch = useDispatch()
  const sorting = useSelector(state => state.products.filter.sort)

  function handleSelect (e) {
    e.target.value !== 'none' && dispatch(setProductSorting(e.target.value))
  }

  return (
    <Box bg='#333333'>
      <select className={s.select} onChange={(e) => handleSelect(e)} value={sorting || 'none'}>
        <option value='rating,desc'>Mas relevantes</option>
        <option value='price,desc'>Mayor Precio</option>
        <option value='price,asc'>Menor Precio</option>
      </select>
    </Box>

  )
}
