import { useDispatch } from 'react-redux'
import { setPageNumber } from '../../redux/actions/system.actions'
import s from './index.module.css'
export default function Pagination () {
  const dispatch = useDispatch()
let { currentPage, hasNext, hasPrevious } = useSelector(state => state.pagination)// eslint-disable-line

  function handlePages (e) {
    if (e.target.name === 'next' && hasNext) {
      currentPage += 1
      dispatch(setPageNumber(e.target.name, currentPage))
    } else if (e.target.name === 'back' && hasPrevious) {
      currentPage -= 1
      dispatch(setPageNumber(e.target.name, currentPage))
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
