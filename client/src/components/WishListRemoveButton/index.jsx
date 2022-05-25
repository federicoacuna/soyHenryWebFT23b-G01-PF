
import { useDispatch } from 'react-redux'
import { deleteFromWishList } from '../../redux/actions/index.js'
import { Text} from '@chakra-ui/react' //eslint-disable-line

export default function WishListButton ({ productId }) {
  const dispatch = useDispatch()
  async function handleClose () {
    dispatch(deleteFromWishList(productId))
  }

  return (
    <div>
      <Text cursor='pointer' onClick={handleClose}>Eliminar</Text>
    </div>

  )
}
