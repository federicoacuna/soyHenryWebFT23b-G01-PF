import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard'
import styles from './index.module.css'

function ProductList () {
  const products = useSelector(state => state.products)

  if (products.message !== undefined) return <div>{products.message}</div>
  if (products.length === 0) return <div>No hay productos</div>

  return (
    <div className={styles['products-container']}>
      {products.map(p => (
        <ProductCard
          key={p.id + p.name}
          product={p}
        />
      ))}

    </div>
  )
}

export default ProductList
