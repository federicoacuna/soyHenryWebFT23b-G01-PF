import { addToWishList, deleteFromWishList } from '../../services/wishList.js'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export default function WishListManagerButton ({ productId }) {
  const handleWishList = (e) => {
    if (e.currentTarget.name === 'add') {
      addToWishList(productId)
    } else if (e.currentTarget.name === 'erase') {
      console.log('erase')
      deleteFromWishList(productId)
    }
  }
  return (
    <>
      <button onClick={(e) => { handleWishList(e) }} name='add' value='add'><AiFillHeart /></button>
      <button onClick={handleWishList} name='erase'><AiOutlineHeart /></button>
    </>
  )
}
