import { addProductToCart, removeProductFromCart } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export default function CartItemQuantity ({ product }) {
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(removeProductFromCart(product))}>-</button>
      <p>{product.quantity}</p>
      <button onClick={() => dispatch(addProductToCart(product))}>+</button>
    </div>
  )
}
