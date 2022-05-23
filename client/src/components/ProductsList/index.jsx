import React from 'react'
import { useSelector } from 'react-redux'
import Pagination from '../Pagination'
import ProductCard from '../ProductCard'
import styles from './index.module.css'

function ProductList () {
  const products = useSelector(state => state.products)
  const token = useSelector(state => state.token)
  const shouldDisplay = !!token
  if (products.message !== undefined) return <div>{products.message}</div>
  if (products.length === 0) return <div>No hay productos</div>

  return (
    <div className={styles.container}>
      <div className={styles['products-container']}>
        {products && products.map(p => (
          <ProductCard
            key={p.id + p.name}
            product={p}
            shouldDisplay={shouldDisplay}
          />
        ))}
      </div>
      <Pagination className={styles.pagination} />
    </div>
  )
}

export default ProductList
