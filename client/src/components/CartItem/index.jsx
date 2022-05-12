import CartItemRemove from '../CartItemRemove'
import CartItemQuantity from '../CartItemQuantity'
import s from './index.module.css'

export default function CartItem ({ product }) {
  const { name, img, price, quantity } = product
  return (
    <div className={s.container}>
      <img src={img[0]} alt={name} />
      <h2>{name}</h2>
      <CartItemQuantity product={product} />
      <div className={s.priceAndRemove}>
        <p>{quantity} x {price} = {quantity * price}</p>
        <CartItemRemove product={product} />
      </div>

    </div>
  )
}
