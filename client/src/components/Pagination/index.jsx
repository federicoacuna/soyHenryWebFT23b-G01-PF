import { useDispatch } from 'react-redux'
import { addFilterParams } from '../../redux/actions/system.actions'
import s from './index.module.css'
export default function Pagination () {
  const dispatch = useDispatch()
let { currentPage, hasNext, hasPrevious } = useSelector(state => state.pagination)// eslint-disable-line

  function handlePages (e) {
    if (e.target.name === 'next' && hasNext) {
      dispatch(addFilterParams({
        name: 'page', 
        value: currentPage + 1
      }))
    } else if (e.target.name === 'back' && hasPrevious) {
      dispatch(addFilterParams({
        name: 'page',
        value: currentPage - 1
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
