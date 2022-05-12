import CartButton from '../CartButton'
import styles from './index.module.css'

export default function ProductCard ({ product }) {
  const { name, price, image, category } = product
  console.log(product)
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.productTitle}>{name && name}</h3>
      <img src={image && image[0]} alt='Product' className={styles.productImage} />
      <p className={styles.productInformation}>
        Categoria: {category.name && category.name}
      </p>
      <p className={styles.productInformation}>Precio: {price}</p>
      <CartButton product={product && product} />
    </div>
  )
}
