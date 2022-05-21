import { addToWishList, deleteFromWishList } from '../../redux/actions'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function WishListManagerButton ({ productId }) {
  const dispatch = useDispatch()
  const wishList = useSelector(state => state.wishlist)
  const [isInList, setIsInList] = useState(false)

  const handleWishList = (e) => {
    if (e.currentTarget.name === 'add') {
      dispatch(addToWishList(productId))
    } else if (e.currentTarget.name === 'erase') {
      dispatch(deleteFromWishList(productId))
    }
  }
  useEffect(() => {
    if (wishList) {
      setIsInList(!!wishList.find(item => item.id === productId))
    }
  }, [wishList])//eslint-disable-line

  return (
    <button onClick={handleWishList} name={isInList ? 'erase' : 'add'}>{isInList ? <AiFillHeart /> : <AiOutlineHeart />}</button>
  )
}
