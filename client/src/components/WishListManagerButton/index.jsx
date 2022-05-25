import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlist.actions'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function WishListManagerButton ({ productId }) {
  const dispatch = useDispatch()
  const wishList = useSelector(state => state.wishlist.data)
  const [isInList, setIsInList] = useState(false)

  const handleWishList = (e) => {
    if (e.currentTarget.name === 'add') {
      dispatch(addToWishlist(productId))
    } else if (e.currentTarget.name === 'erase') {
      dispatch(removeFromWishlist(productId))
    }
  }

  useEffect(() => {
    if (Array.isArray(wishList)) {
      setIsInList(!!wishList.find(item => item.id === productId))
    }
  }, [wishList])//eslint-disable-line

  return (
    <button onClick={handleWishList} name={isInList ? 'erase' : 'add'}>{isInList ? <FcLike fontSize='1.7rem' /> : <FcLikePlaceholder fontSize='1.7rem' />}</button>
  )
}
