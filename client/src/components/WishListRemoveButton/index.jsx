import { deleteFromWishList } from '../../services/wishList.js'
import { ImCross } from 'react-icons/im'

export default function WishListButton ({ productId }) {
  function handleClose () {
    deleteFromWishList(productId)
  }

  return (
    <div>
      <button onClick={handleClose}><ImCross /></button>
    </div>

  )
}
