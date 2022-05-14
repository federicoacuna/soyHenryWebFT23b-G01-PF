import { useSelector } from 'react-redux'
import CartItems from '../../components/CartItems'
import CartDeleteAllProducts from '../../components/CartDeleteAllProducts'
import { Link } from 'react-router-dom'
import s from './index.module.css'
import { IoMdArrowRoundBack } from 'react-icons/io'

export const Cart = () => {
  const cartProducts = useSelector(state => state.cartProducts)

  return (
    <div className={s.containerAll}>
      <Link to='/' className={s.arrow}><IoMdArrowRoundBack size={30} _hover={{ bg: 'black' }} /></Link>

      <div className={s.container}>
        <div className={s.btnDelete}>
          {cartProducts.length ? <CartDeleteAllProducts /> : <p />}
        </div>

        <CartItems />
        <p className={s.total}>Total: <span>${cartProducts.reduce((acc, p) => acc + (p.quantity * p.price), 0)}</span> </p>
        {cartProducts.length ? <button className={s.btnCheckout}>Continuar compra</button> : <p />}
      </div>
    </div>

  )
}

export default Cart
