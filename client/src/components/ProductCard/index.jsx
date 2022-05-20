import CartButton from '../CartButton'
import s from './index.module.css'
import { Link } from 'react-router-dom'
import WishListManagerButton from '../WishListManagerButton'
import { useSelector } from 'react-redux'
export default function ProductCard ({ product }) {
  const { id, name, price, image } = product
  const wishList = useSelector(state => state.user.products)
  return (
    <div className={s.cardContainer}>
      <Link className={s.link} to={'/productDetail/' + id}>

        <img src={image[0]} alt='Product' className={s.productImage} />
        <h3 className={s.productTitle}>{name}</h3>
        <p>${price}</p>
      </Link>
      <CartButton product={product} />
      {wishList
        ? <WishListManagerButton productId={id} />
        : ''}
    </div>
  )
}
