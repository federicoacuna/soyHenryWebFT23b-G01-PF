import { useDispatch } from 'react-redux'
import { setCartProducts } from '../../redux/actions'
import s from './index.module.css'

function CartDeleteAllProducts () {
  const dispatch = useDispatch()
  return (
    <div>
      <button className={s.btn} onClick={() => dispatch(setCartProducts([]))}>Limpiar Carrito</button>
    </div>
  )
}

export default CartDeleteAllProducts
