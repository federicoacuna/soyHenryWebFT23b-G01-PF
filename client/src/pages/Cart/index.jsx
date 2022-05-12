import { useSelector } from 'react-redux'
import CartItems from '../../components/CartItems'
import CartDeleteAllProducts from '../../components/CartDeleteAllProducts'

export const Cart = () => {
  const cartProducts = useSelector(state => state.cartProducts)

  return (
    <div>
      <h1>Carrito</h1>
      <CartItems />
      <CartDeleteAllProducts />
      <p>Total: {cartProducts.reduce((acc, p) => acc + (p.quantity * p.price), 0)}</p>
    </div>
  )
}

export default Cart
