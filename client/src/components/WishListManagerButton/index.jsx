import { addToWishList, deleteFromWishList } from '../../redux/actions'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

export default function WishListManagerButton ({ productId, wishList }) {
  const dispatch = useDispatch()
  const handleWishList = (e) => {
    if (e.currentTarget.name === 'add') {
      dispatch(addToWishList(productId))
    } else if (e.currentTarget.name === 'erase') {
      dispatch(deleteFromWishList(productId))
    }
  }
  const isInList = wishList && wishList.includes(productId)

  return (
    <>
      <button onClick={handleWishList} name={isInList ? 'erase' : 'add'}>{isInList ? <AiFillHeart /> : <AiOutlineHeart />}</button>
    </>
  )
}
