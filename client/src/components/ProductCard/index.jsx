import CartButton from '../CartButton'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

export default function ProductCard ({ product }) {
  const { name, price, image, category } = product
  
  return (
    <div className={styles.cardContainer}>
      <Link to='/productDetail'>
        <h3 className={styles.productTitle}>{name}</h3>
        <img src={image[0]} alt='Product' className={styles.productImage} />
        <p className={styles.productInformation}>
          Categoria: {category.name}
        </p>
        <p className={styles.productInformation}>Precio: {price}</p>
      </Link>
      <CartButton product={product} />
    </div>
  )
}
