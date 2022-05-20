import { useDispatch, useSelector } from 'react-redux'
import { setSorting } from '../../redux/actions/index'

export default function SortingSelector () {
  const dispatch = useDispatch()
  const sorting = useSelector(state => state.options.sort)

  function handleSelect (e) {
    e.target.value !== 'none' && dispatch(setSorting(e.target.value))
  }

  return (
    <>
      <label for='selector'>Ordenar por:</label>
      <select onChange={(e) => handleSelect(e)} value={sorting || 'none'}>
        <option value='none'>--Selecciona una opción--</option>
        <option value='rating,desc'>Mas relevantes</option>
        <option value='price,desc'>Mayor Precio</option>
        <option value='price,asc'>Menor Precio</option>
      </select>
    </>

  )
}
