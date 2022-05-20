import { addToWishList, deleteFromWishList } from '../../services/wishList.js'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'

export default function WishListManagerButton ({ productId }) {
  const wishList = useSelector(state => state.user.products).map(el => el.id)
  const handleWishList = (e) => {
    if (e.currentTarget.name === 'add') {
      addToWishList(productId)
    } else if (e.currentTarget.name === 'erase') {
      deleteFromWishList(productId)
    }
  }

  if (wishList.includes(productId)) {
    return (

      <>

        <button onClick={handleWishList} name='erase'><AiOutlineHeart /></button>
      </>
    )
  } else {
    return (
      <>
        <button onClick={(e) => { handleWishList(e) }} name='add' value='add'><AiFillHeart /></button>
      </>

    )
  }
}
