import { useDispatch, useSelector } from 'react-redux'
import { setCartProducts, setRemoteCartProducts } from '../../redux/actions'
import s from './index.module.css'

function CartDeleteAllProducts () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  function handleClick () {
    if (user & user.id) {
      dispatch(setRemoteCartProducts([]))
    } else {
      dispatch(setCartProducts([]))
    }
  }
  return (
    <div>
      <button className={s.btn} onClick={handleClick}>Limpiar Carrito</button>
    </div>
  )
}

export default CartDeleteAllProducts
