import { useSelector } from 'react-redux'
import CartItems from '../../components/CartItems'
import CartDeleteAllProducts from '../../components/CartDeleteAllProducts'
import s from './index.module.css'

export const Cart = () => {
  const cartProducts = useSelector(state => state.cartProducts)

  return (
    <div className={s.containerAll}>
      <div className={s.container}>
        <h1>Carrito</h1>
        <CartDeleteAllProducts />
        <CartItems />
        <p>Total: {cartProducts.reduce((acc, p) => acc + (p.quantity * p.price), 0)}</p>
        <button>Continuar compra</button>
      </div>
    </div>

  )
}

export default Cart
