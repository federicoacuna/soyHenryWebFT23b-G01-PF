import { addProductToCart, removeProductFromCart } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import s from './index.module.css'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'

export default function CartItemQuantity ({ product }) {
  const dispatch = useDispatch()

  return (
    <div className={s.container}>
      <button onClick={() => dispatch(removeProductFromCart(product))}><AiFillMinusCircle size={25} /></button>
      <p>{product.quantity}</p>
      <button onClick={() => dispatch(addProductToCart(product))}><AiFillPlusCircle size={25} /></button>
    </div>
  )
}
