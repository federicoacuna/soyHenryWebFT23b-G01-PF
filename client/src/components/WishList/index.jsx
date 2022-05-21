import { useSelector } from 'react-redux'
import s from './index.module.css'
import WishListCard from '../WishListCard'

export default function WishList () {
  const product = useSelector(state => state.wishlist)
  return (
    <div className={s.container}>
      {(product.length > 0)
        ? product.map((el, i) =>
          <WishListCard id={el.id} image={el.image} price={el.price} name={el.name} key={i} />)
        : 'Aun no tiene Items en su WishList'}
    </div>

  )
}
