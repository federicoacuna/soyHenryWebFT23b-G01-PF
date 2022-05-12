import CartItemRemove from '../CartItemRemove'
import CartItemQuantity from '../CartItemQuantity'

export default function CartItem ({ product }) {
  const { name, img, price, quantity } = product
  return (
    <div>
      <h2>{name}</h2>
      <img src={img[0]} alt={name} />
      <p>{quantity} x {price} = {quantity * price}</p>
      <CartItemQuantity product={product} />
      <CartItemRemove product={product} />
    </div>
  )
}
