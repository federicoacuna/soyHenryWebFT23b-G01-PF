import { useDispatch } from 'react-redux'
import { setCartProducts } from '../../redux/actions'

function CartDeleteAllProducts () {
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(setCartProducts([]))}>Limpiar Carrito</button>
    </div>
  )
}

export default CartDeleteAllProducts
