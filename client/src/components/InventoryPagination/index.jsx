import { useDispatch, useSelector } from 'react-redux'
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs'
import { addProductFilter } from '../../redux/actions/products.actions'

import s from './index.module.css'
export default function InventoryPagination () {
  const dispatch = useDispatch()
  const { currentPage, hasNext, hasPrevious } = useSelector(state => state.products.pagination)
  const shouldDisplay = !(parseInt(currentPage) === 1 && !hasNext)

  function handlePages (e) {
    if (e === 'next' && hasNext) {
      dispatch(addProductFilter({
        name: 'page',
        value: parseInt(currentPage) + 1
      }))
    } else if (e === 'back' && hasPrevious) {
      dispatch(addProductFilter({
        name: 'page',
        value: parseInt(currentPage) - 1
      }))
    }
  }

  return (
    <>
      {shouldDisplay &&
        <div className={s.container}>
          <div onClick={() => handlePages('back')} name='back' disabled={!hasPrevious}><BsFillArrowLeftSquareFill color='#333333' fontSize='2rem' /></div>
          <span>{currentPage}</span>
          <div onClick={() => handlePages('next')} name='next' disabled={!hasNext}><BsFillArrowRightSquareFill color='#333333' fontSize='2rem' /></div>
        </div>}
    </>
  )
}
