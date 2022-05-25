
import { useDispatch } from 'react-redux'
import { removeFromWishlist } from '../../redux/actions/wishlist.actions'
import { Text} from '@chakra-ui/react' //eslint-disable-line

export default function WishListButton ({ productId }) {
  const dispatch = useDispatch()
  async function handleClose () {
    dispatch(removeFromWishlist(productId))
  }

  return (
    <div>
      <Text cursor='pointer' onClick={handleClose}>Eliminar</Text>
    </div>
  )
}
