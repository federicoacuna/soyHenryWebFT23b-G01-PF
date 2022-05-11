import styles from './index.module.css'
import CartButton from '../CartButton'

export default function ProductCard ({ product }) {
  const { name, description, brand, model, price, img, category } = product

  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.cardContainer}>{name}</h3>
      <img src={img[0]} alt='Product' className={styles.productImage} />
      <p className={styles.productInformation}>Marca: {brand}</p>
      <p className={styles.productInformation}>Modelo: {model}</p>
      <p className={styles.productInformation}>
        Categoria: {category.name}
      </p>
      <p className={styles.productInformation}>{description}</p>
      <p className={styles.productInformation}>Precio: {price}</p>
      <CartButton product={product} />
    </div>
  )
}
