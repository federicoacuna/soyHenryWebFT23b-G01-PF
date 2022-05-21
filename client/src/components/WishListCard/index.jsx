import s from './index.module.css'
import WishListRemoveButton from '../WishListRemoveButton'
export function WishListCard ({ image, id, price, name }) {
  return (
    <div className={s.chinchulin}>
      <p>{name}</p>
      <img src={image} alt='product' />
      <p>{price}</p>
      <p className={s.remove}><WishListRemoveButton productId={id} /></p>

    </div>

  )
}
