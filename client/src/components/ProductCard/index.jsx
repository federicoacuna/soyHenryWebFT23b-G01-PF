import styles from './index.module.css'
import CartButton from '../CartButton'

export default function ProductCard (props) {
  const { productID, name, description, brand, model, price, img, category } = props

  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.cardContainer}>{name}</h3>
      <img src={img} alt='Product' className={styles.productImage} />
      <p className={styles.productInformation}>Marca: {brand}</p>
      <p className={styles.productInformation}>Modelo: {model}</p>
      <p className={styles.productInformation}>Categoria: {category}</p>
      <p className={styles.productInformation}>{description}</p>
      <p className={styles.productInformation}>Precio: {price}</p>
      <CartButton id={productID} />
    </div>
  )
}
