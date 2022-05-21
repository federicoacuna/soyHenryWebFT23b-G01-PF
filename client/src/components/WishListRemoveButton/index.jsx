
import { ImCross } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { deleteFromWishList } from '../../redux/actions/index.js'

export default function WishListButton ({ productId }) {
  const dispatch = useDispatch()
  async function handleClose () {
    dispatch(deleteFromWishList(productId))
  }

  return (
    <div>
      <button onClick={handleClose}><ImCross /></button>
    </div>

  )
}
