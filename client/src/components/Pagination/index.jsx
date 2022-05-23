import { useDispatch, useSelector } from 'react-redux'
import { addFilterParams } from '../../redux/actions'
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'

import s from './index.module.css'
export default function Pagination () {
  const dispatch = useDispatch()
  const { currentPage, hasNext, hasPrevious } = useSelector(state => state.pagination)
  const shouldDisplay = !(parseInt(currentPage) === 1 && !hasNext)
  console.log(shouldDisplay)
  function handlePages (e) {
    if (e === 'next' && hasNext) {
      dispatch(addFilterParams({
        name: 'page',
        value: parseInt(currentPage) + 1
      }))
    } else if (e === 'back' && hasPrevious) {
      dispatch(addFilterParams({
        name: 'page',
        value: parseInt(currentPage) - 1
      }))
    }
  }

  return (
    <>
      {shouldDisplay &&
        <div className={s.container}>
          <div onClick={() => handlePages('back')} name='back' disabled={!hasPrevious}><BsFillArrowLeftSquareFill /></div>
          <span>{currentPage}</span>
          <div onClick={() => handlePages('next')} name='next' disabled={!hasNext}><BsFillArrowRightSquareFill /></div>
        </div>}
    </>
  )
}
