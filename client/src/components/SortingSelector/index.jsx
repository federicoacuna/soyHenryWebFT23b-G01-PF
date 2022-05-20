import { useDispatch } from 'react-redux'
import { setSorting } from '../../redux/actions/index'

export default function SortingSelector () {
  const dispatch = useDispatch()

  function handleSelect (e) {
    dispatch(setSorting(e.target.value))
  }

  return (
    <>
      <label for='selector'>Ordenar por:</label>
      <select onChange={(e) => handleSelect(e)}>
        <option>--Selecciona una opción--</option>
        <option value='rating,desc'>Mas relevantes</option>
        <option value='price,asc'>Mayor Precio</option>
        <option value='price,desc'>Menor Precio</option>

      </select>
    </>

  )
}
