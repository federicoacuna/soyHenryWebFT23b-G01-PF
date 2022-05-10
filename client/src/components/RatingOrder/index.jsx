import style from './index.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Rating () {
  const dispatch = useDispatch()
  const [orderRating, setOrder] = useState('')
  function handleOrder (e) {
    e.preventDefault()
    dispatch()// aca se despacha la action correspondiente que aun no esta creada
    setOrder(['rating',e.target.value])
  }

  return (
    <div>
      <select value={orderRating} className={style.ratingOrder} onChange={elem => handleOrder(elem)}>
        <option value='---'>-----</option>
        <option value='ASC'> ASCENDING </option>
        <option value='DESC'> DESCENDING </option>
      </select>
    </div>
  )
}
