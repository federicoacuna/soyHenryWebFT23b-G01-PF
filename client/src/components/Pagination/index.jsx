import { useDispatch, useSelector } from 'react-redux'
import { addFilterParams } from '../../redux/actions'
import s from './index.module.css'
export default function Pagination () {
  const dispatch = useDispatch()
  const { currentPage, hasNext, hasPrevious } = useSelector(state => state.pagination)

  function handlePages (e) {
    if (e.target.name === 'next' && hasNext) {
      dispatch(addFilterParams({
        name: 'page',
        value: parseInt(currentPage) + 1
      }))
    } else if (e.target.name === 'back' && hasPrevious) {
      dispatch(addFilterParams({
        name: 'page',
        value: parseInt(currentPage) - 1
      }))
    }
  }

  return (
    <div className={s.container}>
      <button onClick={handlePages} name='back' disabled={!hasPrevious}> Anterior</button>
      <span>{currentPage}</span>
      <button onClick={handlePages} name='next' disabled={!hasNext}>Siguiente </button>
    </div>

  )
}
